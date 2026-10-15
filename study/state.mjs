export const STORAGE_KEY = 'bayes-study-companion-v1';
export const PROGRESS_STATES = ['not-started', 'introduced', 'needs-review', 'can-explain'];

export function emptyState() {
  return { version: 1, notes: {}, progress: {}, lastRoute: '' };
}

export function readState(storage) {
  let raw = null;
  try {
    raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { state: emptyState(), warning: '' };
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !parsed.notes || typeof parsed.notes !== 'object' || Array.isArray(parsed.notes) || !parsed.progress || typeof parsed.progress !== 'object' || Array.isArray(parsed.progress)) throw new Error('Invalid saved state');
    const state = emptyState();
    for (const [key, note] of Object.entries(parsed.notes)) {
      if (/^(lesson:[a-z0-9-]+|lecture:[1-8]|roadmap)$/.test(key) && note && typeof note === 'object') state.notes[key] = { notes: typeof note.notes === 'string' ? note.notes : '', answer: typeof note.answer === 'string' ? note.answer : '', updatedAt: typeof note.updatedAt === 'string' ? note.updatedAt : '' };
    }
    for (const [key, status] of Object.entries(parsed.progress)) if (/^[a-z0-9-]+$/.test(key) && !['constructor', '__proto__', 'prototype'].includes(key) && PROGRESS_STATES.includes(status)) state.progress[key] = status;
    state.lastRoute = typeof parsed.lastRoute === 'string' ? parsed.lastRoute : '';
    return { state, warning: '' };
  } catch { return { state: emptyState(), blockedWrites: true, recoveryRaw: raw, warning: 'Existing browser data could not be read and has been preserved. New writing is in memory only—export before closing.' }; }
}

export function persistState(storage, state, { blockedWrites = false } = {}) {
  if (blockedWrites) return { saved: false, message: 'Existing saved data is preserved. New writing is in memory only—export before closing.' };
  try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return { saved: true, message: 'Saved in this browser' }; }
  catch { return { saved: false, message: 'Browser storage is unavailable. Notes are in memory only—export them before closing.' }; }
}

export function progressFor(topic, state) {
  return state.progress[topic.id] || (topic.status === 'current' ? 'not-started' : topic.status);
}

export function noteKey(route) {
  if (route.view === 'lesson') return `lesson:${route.lessonId}`;
  if (route.view === 'notes') return `lecture:${route.lectureId}`;
  return 'roadmap';
}

export function parseRoute(hash, catalog) {
  const [view, id, anchor] = hash.replace(/^#/, '').split('/');
  if (view === 'lesson' && catalog.lessons.some(lesson => lesson.id === id)) return { view, lessonId: id };
  if (view === 'notes' && catalog.lectures.some(lecture => lecture.id === Number(id))) return { view, lectureId: Number(id), anchor: /^slide-\d+$/.test(anchor || '') ? anchor : '' };
  if (view === 'roadmap') return { view };
  return { view: 'lesson', lessonId: catalog.currentLesson };
}

// Merge only the fields changed by this tab, not its stale full snapshot.
export function mergeChanges(latest, local, changes) {
  const merged = structuredClone(latest);
  if (changes.noteKey) merged.notes[changes.noteKey] = structuredClone(local.notes[changes.noteKey]);
  if (changes.topicId) merged.progress[changes.topicId] = local.progress[changes.topicId];
  if (changes.route) merged.lastRoute = local.lastRoute;
  return merged;
}

export function noteConflict(latest, baseline, local, key) {
  const encode = state => JSON.stringify(state.notes[key] || null);
  return Boolean(key && encode(latest) !== encode(baseline) && encode(latest) !== encode(local));
}
