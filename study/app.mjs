import { loadRenderer } from './render.mjs';
import { readState, persistState, progressFor, noteKey, parseRoute, PROGRESS_STATES, STORAGE_KEY, mergeChanges, noteConflict } from './state.mjs';

const $ = id => document.getElementById(id);
const labels = { 'not-started': 'Not started', introduced: 'Introduced', current: 'Up next', 'needs-review': 'Needs review', 'can-explain': 'Can explain' };
let storage;
try { storage = window.localStorage; } catch { storage = { getItem() { throw new Error('unavailable'); }, setItem() { throw new Error('unavailable'); } }; }
const loaded = readState(storage);
const state = loaded.state;
let baseline = structuredClone(state);
let blockedWrites = Boolean(loaded.blockedWrites);
let recoveryRaw = loaded.recoveryRaw;
const pendingNotes = new Set();
const pendingTopics = new Set();
let pendingRoute = false;
let pendingCurrent = '';
let sourceLecture = 2;
let sourcePage = 1;
let catalog;
let route;
let renderInto;
let activeLesson;
let selectedLecture = 2;
let renderToken = 0;
let noteScope = '';
let currentRevision = '';
let knownCurrent = '';
let polling = false;
let zoomTrigger;

function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

async function fetchJSON(path) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || `Could not load ${path}`);
  return response.json();
}

function mergePending(latest) {
  let merged = structuredClone(latest);
  for (const noteKey of pendingNotes) merged = mergeChanges(merged, state, { noteKey });
  for (const topicId of pendingTopics) merged = mergeChanges(merged, state, { topicId });
  if (pendingRoute) merged.lastRoute = state.lastRoute;
  return merged;
}

function save(changes = {}) {
  if (changes.noteKey) pendingNotes.add(changes.noteKey);
  if (changes.topicId) pendingTopics.add(changes.topicId);
  pendingRoute ||= Boolean(changes.route);
  let result;
  if (!blockedWrites) {
    const latest = readState(storage);
    if (latest.blockedWrites || [...pendingNotes].some(key => noteConflict(latest.state, baseline, state, key))) {
      blockedWrites = true;
      recoveryRaw = latest.recoveryRaw ?? JSON.stringify(latest.state);
    } else {
      const merged = mergePending(latest.state);
      result = persistState(storage, merged);
      if (result.saved) {
        Object.assign(state, merged);
        baseline = structuredClone(merged);
        pendingNotes.clear();
        pendingTopics.clear();
        pendingRoute = false;
      }
    }
  }
  result ||= persistState(storage, state, { blockedWrites });
  $('save-status').textContent = result.message;
  $('save-status').classList.toggle('error', !result.saved);
}

function captureWriting() {
  if (!noteScope) return;
  const old = state.notes[noteScope];
  if ((old?.notes || '') === $('personal-notes').value && (old?.answer || '') === $('teachback-answer').value) return;
  state.notes[noteScope] = { notes: $('personal-notes').value, answer: $('teachback-answer').value, updatedAt: new Date().toISOString() };
  save({ noteKey: noteScope });
}

function loadWriting() {
  noteScope = noteKey(route);
  const writing = state.notes[noteScope] || {};
  $('personal-notes').value = writing.notes || '';
  $('teachback-answer').value = writing.answer || '';
}

function navigate(hash) {
  captureWriting();
  closeNavigation();
  if (location.hash === hash) showRoute();
  else location.hash = hash;
}

function closeNavigation() {
  document.body.classList.remove('nav-open');
  $('nav-toggle').setAttribute('aria-expanded', 'false');
}

function titleText(title) {
  return title.replace(/\$/g, '').replace(/\\infty/g, '∞').replace(/\\lambda/g, 'λ').replace(/\\[{}]/g, match => match.slice(1));
}

function updateNavigation() {
  $('course-nav').replaceChildren(...catalog.lectures.map(lecture => {
    const button = node('button', undefined, `lecture-button${lecture.id === selectedLecture ? ' active' : ''}`);
    button.type = 'button';
    button.dataset.lecture = lecture.id;
    if (lecture.id === selectedLecture) button.setAttribute('aria-current', 'page');
    const number = node('span', String(lecture.id).padStart(2, '0'), 'lecture-number');
    const copy = node('span');
    const lessons = catalog.lessons.filter(item => item.lecture === lecture.id);
    copy.append(node('strong', lecture.shortTitle), node('small', `${lecture.slides.length} slides${lessons.length ? ` · ${lessons.length} lessons` : ''}`));
    button.append(number, copy);
    return button;
  }));
  const topics = catalog.lectures.flatMap(lecture => lecture.topics);
  const explained = topics.filter(topic => progressFor(topic, state) === 'can-explain').length;
  const introduced = topics.filter(topic => progressFor(topic, state) === 'introduced').length;
  $('course-summary').replaceChildren(node('p', `${introduced} topics introduced`), node('p', `${explained} of ${topics.length} self-assessed as explainable`));
}

function setSource(lecture, page, slide) {
  sourceLecture = lecture;
  sourcePage = page;
  const pages = catalog.lectures.find(item => item.id === lecture)?.pages || page;
  $('source-previous').disabled = page <= 1;
  $('source-next').disabled = page >= pages;
  $('source-page-status').textContent = `Page ${page} of ${pages}`;
  const caption = `Lecture ${lecture} · ${slide ? `slide ${slide} · ` : ''}original page ${page}`;
  $('source-caption').textContent = caption;
  $('zoom-source').hidden = false;
  $('source-empty').hidden = true;
  $('source-image').alt = caption;
  $('source-image').src = `/lecture-assets/lecture-${String(lecture).padStart(2, '0')}/page-${String(page).padStart(2, '0')}.png`;
  $('source-link').href = `/lectures/${lecture}.pdf#page=${page}`;
  $('source-link').target = '_blank';
  $('source-link').rel = 'noopener noreferrer';
  $('source-link').hidden = false;
}

function sourceChip(text, hash) {
  const chip = node('a', text, 'source-chip');
  chip.href = hash;
  return chip;
}

function warningsFor(lecture) {
  const warnings = catalog.sourceWarnings.filter(warning => warning.lecture === lecture);
  if (!warnings.length) return null;
  const details = node('details', undefined, 'source-warnings');
  details.append(node('summary', 'Source notes & limitations'));
  for (const warning of warnings) details.append(node('p', `Slide ${warning.slide}: ${warning.text}`));
  return details;
}

function lessonForLecture(lectureId) {
  const current = catalog.lessons.find(item => item.id === catalog.currentLesson && item.lecture === lectureId);
  return current || catalog.lessons.find(item => item.lecture === lectureId);
}

function updateLessonPicker(lesson) {
  const groups = catalog.lectures.flatMap(lecture => {
    const lessons = catalog.lessons.filter(item => item.lecture === lecture.id);
    if (!lessons.length) return [];
    const group = node('optgroup');
    group.label = `Lecture ${lecture.id} · ${lecture.shortTitle}`;
    group.append(...lessons.map((item, index) => {
      const option = node('option', `${index + 1}. ${item.title}`);
      option.value = item.id;
      return option;
    }));
    return [group];
  });
  $('lesson-select').replaceChildren(...groups);
  $('lesson-select').value = lesson.id;
  $('lesson-select').disabled = false;
  const lessons = catalog.lessons.filter(item => item.lecture === lesson.lecture);
  const index = lessons.findIndex(item => item.id === lesson.id);
  $('lesson-position').textContent = `Lecture ${lesson.lecture} · Lesson ${index + 1} of ${lessons.length}. Progress is self-assessed for the linked roadmap topic.`;
}

async function showLesson(token) {
  const lesson = await fetchJSON(`/api/lessons/${route.lessonId}`);
  if (token !== renderToken) return;
  activeLesson = lesson;
  selectedLecture = lesson.lecture;
  $('eyebrow').textContent = `Lecture ${String(lesson.lecture).padStart(2, '0')} / Focused lesson`;
  $('page-title').textContent = lesson.title;
  $('page-description').textContent = lesson.deck;
  updateLessonPicker(lesson);
  $('lesson-meta').replaceChildren(...(lesson.sourceSlides || [lesson.slide]).map(slide => sourceChip(`L${lesson.lecture} · Slide ${slide}`, `#notes/${lesson.lecture}/slide-${slide}`)), node('span', 'Tutor explanation · Original sources alongside'));
  $('prerequisites').replaceChildren(...lesson.prerequisites.map(prerequisite => {
    const details = node('details', undefined, 'prerequisite');
    details.append(node('summary', prerequisite.title), node('p', prerequisite.detail));
    return details;
  }));
  const result = renderInto($('lesson-body'), lesson.markdown, { lectureId: lesson.lecture, removeTitle: true });
  if (result.mathErrors) $('lesson-meta').append(node('span', 'Some notation could not render; consult the source.', 'render-warning'));
  const topic = catalog.lectures.flatMap(lecture => lecture.topics).find(item => item.id === lesson.topicId);
  $('assessment-select').value = progressFor(topic, state);
  $('assessment-select').disabled = false;
  $('teachback-prompt').textContent = lesson.teachback;
  setSource(lesson.lecture, lesson.page, lesson.slide);
  const index = catalog.lessons.findIndex(item => item.id === lesson.id);
  $('previous-lesson').disabled = index === 0;
  $('previous-lesson').dataset.lesson = catalog.lessons[index - 1]?.id || '';
  $('next-lesson').disabled = !lesson.next;
  $('next-lesson').dataset.lesson = lesson.next || '';
  $('next-lesson').textContent = lesson.next ? 'Next idea →' : 'Continue with your tutor';
}

async function showNotes(token) {
  const lecture = await fetchJSON(`/api/lectures/${route.lectureId}`);
  if (token !== renderToken) return;
  selectedLecture = lecture.id;
  $('eyebrow').textContent = `Lecture ${String(lecture.id).padStart(2, '0')} / Original notes`;
  $('page-title').textContent = lecture.shortTitle;
  $('page-description').textContent = lecture.description;
  $('slide-list').replaceChildren(...lecture.slides.map(slide => sourceChip(`${slide.number}. ${titleText(slide.title)}`, `#notes/${lecture.id}/${slide.anchor}`)));
  for (const link of $('slide-list').children) link.className = 'slide-link';
  const result = renderInto($('lecture-body'), lecture.markdown, { lectureId: lecture.id, removeTitle: true });
  const warnings = warningsFor(lecture.id);
  if (warnings) $('lecture-body').prepend(warnings);
  if (result.mathErrors) $('lecture-body').prepend(node('p', `${result.mathErrors} formula(s) need the original page for verification.`, 'render-warning'));
  const slide = lecture.slides.find(item => item.anchor === route.anchor);
  setSource(lecture.id, slide?.page || 1, slide?.number);
  $('teachback-prompt').textContent = 'Choose a slide and explain its main idea, every symbol, and its assumptions in your own words. Use the original-page expander to check the diagrams.';
  if (route.anchor) requestAnimationFrame(() => {
    if (token !== renderToken) return;
    const heading = $(route.anchor);
    heading?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
}

function makeAssessment(topic) {
  const select = node('select');
  select.dataset.topic = topic.id;
  select.setAttribute('aria-label', `Understanding: ${topic.title}`);
  for (const value of PROGRESS_STATES) {
    const option = node('option', labels[value]);
    option.value = value;
    select.append(option);
  }
  select.value = progressFor(topic, state);
  return select;
}

function showRoadmap() {
  $('eyebrow').textContent = 'Lectures 01–08 / Learning roadmap';
  $('page-title').textContent = 'From understanding to explaining.';
  $('page-description').textContent = 'Finish the probability toolkit, revisit the motivation, then work through inference, decisions and regression. Prerequisites appear where they are needed.';
  $('roadmap-body').replaceChildren(...catalog.lectures.map(lecture => {
    const section = node('section', undefined, 'roadmap-lecture');
    const heading = node('h3');
    heading.append(sourceChip(`0${lecture.id} · ${lecture.shortTitle}`, `#notes/${lecture.id}`));
    section.append(heading, node('p', lecture.description));
    for (const topic of lecture.topics) {
      const row = node('div', undefined, 'topic-row');
      const copy = node('div');
      const lessons = catalog.lessons.filter(item => item.topicId === topic.id);
      const lesson = lessons[0];
      const title = node('a', topic.title);
      title.href = lesson ? `#lesson/${lesson.id}` : `#notes/${lecture.id}/slide-${Number(topic.slides.match(/\d+/)?.[0]) || 1}`;
      copy.append(title, node('small', `Slides ${topic.slides}`));
      if (lessons.length > 1) {
        const links = node('nav', undefined, 'topic-lessons');
        links.setAttribute('aria-label', `Lessons: ${topic.title}`);
        for (const item of lessons) {
          const link = node('a', item.title);
          link.href = `#lesson/${item.id}`;
          links.append(link);
        }
        copy.append(links);
      }
      if (topic.prerequisites?.length) copy.append(node('p', `Bridge: ${topic.prerequisites.join(' · ')}`, 'topic-prerequisites'));
      if (topic.status === 'current') copy.append(node('span', 'Current teaching point', 'status-badge current'));
      row.append(copy, makeAssessment(topic));
      section.append(row);
    }
    const warnings = warningsFor(lecture.id);
    if (warnings) section.append(warnings);
    return section;
  }));
  $('teachback-prompt').textContent = 'Which concepts can you explain without looking? Record any gaps here. Opening a topic does not mark it learned.';
  setSource(selectedLecture, 1);
}

async function showRoute() {
  if (!catalog || !renderInto) return;
  const token = ++renderToken;
  captureWriting();
  route = parseRoute(location.hash || state.lastRoute, catalog);
  state.lastRoute = route.view === 'lesson' ? `#lesson/${route.lessonId}` : route.view === 'notes' ? `#notes/${route.lectureId}${route.anchor ? `/${route.anchor}` : ''}` : '#roadmap';
  $('app-error').hidden = true;
  $('main-content').setAttribute('aria-busy', 'true');
  activeLesson = null;
  $('assessment-select').disabled = true;
  $('previous-lesson').disabled = true;
  $('next-lesson').disabled = true;
  for (const tab of document.querySelectorAll('[data-view]')) {
    const active = tab.dataset.view === route.view;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    $(`${tab.dataset.view}-view`).hidden = !active;
  }
  loadWriting();
  try {
    if (route.view === 'lesson') await showLesson(token);
    else if (route.view === 'notes') await showNotes(token);
    else showRoadmap();
    if (token !== renderToken) return;
    updateNavigation();
    const lecture = catalog.lectures.find(item => item.id === selectedLecture);
    $('breadcrumb').textContent = `Bayesian machine learning / ${route.view === 'roadmap' ? 'Roadmap' : `Lecture ${selectedLecture} · ${lecture.shortTitle}`}`;
    document.title = `${$('page-title').textContent} · Bayes`;
    save({ route: true });
  } catch (error) { if (token === renderToken) showError(error.message); }
  finally { if (token === renderToken) $('main-content').removeAttribute('aria-busy'); }
}

function showError(message) {
  $('app-error').hidden = false;
  $('app-error').querySelector('p').textContent = message;
}

function openImage(image, trigger) {
  zoomTrigger = trigger;
  $('dialog-image').src = image.src;
  $('dialog-image').alt = image.alt;
  $('dialog-caption').textContent = image.alt || 'Original lecture image';
  $('image-dialog').showModal();
}

async function pollCurrent() {
  if (document.hidden || polling || !catalog) return;
  polling = true;
  try {
    const current = await fetchJSON('/api/current');
    if (!pendingCurrent) $('connection-status').textContent = 'Local files · up to date';
    if (currentRevision && currentRevision !== current.revision) {
      catalog = await fetchJSON('/api/catalog');
      const followingTutor = route?.view === 'lesson' && route.lessonId === knownCurrent;
      knownCurrent = current.id;
      if (followingTutor) {
        if (route.lessonId !== current.id) navigate(`#lesson/${current.id}`);
        else await showRoute();
      } else {
        pendingCurrent = current.id;
        const button = node('button', 'Updated tutor lesson →', 'text-button');
        button.addEventListener('click', () => { pendingCurrent = ''; navigate(`#lesson/${current.id}`); });
        $('connection-status').replaceChildren(button);
      }
    }
    if (pendingCurrent && !$('connection-status').querySelector('button')) {
      const button = node('button', 'Updated tutor lesson →', 'text-button');
      button.addEventListener('click', () => { const id = pendingCurrent; pendingCurrent = ''; navigate(`#lesson/${id}`); });
      $('connection-status').replaceChildren(button);
    }
    currentRevision = current.revision;
    knownCurrent ||= current.id;
  } catch { $('connection-status').textContent = 'Local server unavailable · your writing is retained'; }
  finally { polling = false; }
}

async function start() {
  try {
    [catalog, renderInto] = await Promise.all([fetchJSON('/api/catalog'), loadRenderer()]);
    knownCurrent = catalog.currentLesson;
    const current = await fetchJSON('/api/current');
    currentRevision = current.revision;
    $('connection-status').textContent = 'Local files · up to date';
    await showRoute();
    if (loaded.warning) { $('save-status').textContent = loaded.warning; $('save-status').classList.add('error'); }
  } catch (error) { showError(`${error.message}. If rendering libraries are missing, complete the approved local installation.`); }
}

$('lesson-select').addEventListener('change', () => {
  if (catalog?.lessons.some(item => item.id === $('lesson-select').value)) navigate(`#lesson/${$('lesson-select').value}`);
});
$('course-nav').addEventListener('click', event => {
  const lecture = event.target.closest('[data-lecture]');
  if (lecture) {
    const id = Number(lecture.dataset.lecture);
    const lesson = lessonForLecture(id);
    navigate(lesson ? `#lesson/${lesson.id}` : `#notes/${id}`);
  }
});
for (const tab of document.querySelectorAll('[data-view]')) tab.addEventListener('click', () => {
  if (!catalog) return;
  const view = tab.dataset.view;
  navigate(view === 'lesson' ? `#lesson/${activeLesson?.id || lessonForLecture(selectedLecture)?.id || catalog.currentLesson}` : view === 'notes' ? `#notes/${selectedLecture}` : '#roadmap');
});
document.querySelector('[role=tablist]').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...document.querySelectorAll('[data-view]')];
  const index = tabs.indexOf(document.activeElement);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus(); tabs[next].click();
});
$('nav-toggle').addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  $('nav-toggle').setAttribute('aria-expanded', String(open));
  if (open) $('course-nav').querySelector('button')?.focus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('nav-open')) { closeNavigation(); $('nav-toggle').focus(); }
});
document.addEventListener('click', event => {
  const image = event.target.closest('.prose img');
  if (image) openImage(image, image);
  if (document.body.classList.contains('nav-open') && !event.target.closest('#sidebar, #nav-toggle')) closeNavigation();
});
document.addEventListener('keydown', event => {
  if (['Enter', ' '].includes(event.key) && event.target.matches('.prose img')) { event.preventDefault(); openImage(event.target, event.target); }
});
for (const id of ['previous-lesson', 'next-lesson']) $(id).addEventListener('click', () => {
  if ($(id).dataset.lesson) { navigate(`#lesson/${$(id).dataset.lesson}`); window.scrollTo({ top: 0, behavior: 'instant' }); }
});
$('assessment-select').addEventListener('change', () => {
  if (!activeLesson || $('assessment-select').disabled || route.view !== 'lesson' || route.lessonId !== activeLesson.id) return;
  state.progress[activeLesson.topicId] = $('assessment-select').value;
  save({ topicId: activeLesson.topicId }); updateNavigation();
});
$('roadmap-body').addEventListener('change', event => {
  if (!event.target.dataset.topic || !PROGRESS_STATES.includes(event.target.value)) return;
  state.progress[event.target.dataset.topic] = event.target.value;
  save({ topicId: event.target.dataset.topic }); updateNavigation();
});
for (const id of ['personal-notes', 'teachback-answer']) $(id).addEventListener('input', captureWriting);
$('export-notes').addEventListener('click', () => {
  captureWriting();
  const blob = new Blob([JSON.stringify({ ...state, ...(recoveryRaw != null ? { preservedStorageRaw: recoveryRaw } : {}), exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = node('a'); link.href = url; link.download = 'bayes-study-notes.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector('.skip-link').addEventListener('click', event => { event.preventDefault(); $('main-content').focus(); });
$('source-previous').addEventListener('click', () => setSource(sourceLecture, sourcePage - 1));
$('source-next').addEventListener('click', () => setSource(sourceLecture, sourcePage + 1));
$('zoom-source').addEventListener('click', () => openImage($('source-image'), $('zoom-source')));
$('source-image').addEventListener('error', () => {
  $('zoom-source').hidden = true; $('source-empty').hidden = false;
  $('source-empty').textContent = 'This source image could not load. The original PDF link is still available.';
});
$('close-image').addEventListener('click', () => $('image-dialog').close());
$('image-dialog').addEventListener('close', () => zoomTrigger?.focus());
$('retry-load').addEventListener('click', start);
window.addEventListener('hashchange', () => { showRoute(); closeNavigation(); });
window.addEventListener('beforeunload', captureWriting);
window.addEventListener('storage', event => {
  if (event.key !== STORAGE_KEY || blockedWrites) return;
  const latest = readState(storage);
  const editing = ['personal-notes', 'teachback-answer'].includes(document.activeElement?.id);
  if (latest.blockedWrites || [...pendingNotes].some(key => noteConflict(latest.state, baseline, state, key)) || (editing && JSON.stringify(latest.state.notes[noteScope]) !== JSON.stringify(baseline.notes[noteScope]))) {
    blockedWrites = true;
    recoveryRaw = event.newValue;
    $('save-status').textContent = 'Another tab changed this writing. Both versions are preserved: export before closing, then reload to use the saved version.';
    $('save-status').classList.add('error');
    return;
  }
  Object.assign(state, mergePending(latest.state));
  baseline = structuredClone(latest.state);
  if (!catalog || !route) return;
  loadWriting();
  updateNavigation();
  if (route.view === 'roadmap') showRoadmap();
  if (activeLesson) {
    const topic = catalog.lectures.flatMap(item => item.topics).find(item => item.id === activeLesson.topicId);
    $('assessment-select').value = progressFor(topic, state);
  }
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) pollCurrent(); });
setInterval(pollCurrent, 3000);
start();
