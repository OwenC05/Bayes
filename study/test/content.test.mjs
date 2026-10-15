import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { parseSlides, validateCourse, confinedFile, createContentStore } from '../content.mjs';

test('slide parsing tracks page continuations and math titles without inventing slides', () => {
  const slides = parseSlides('## Page 1\n### Slide 1: Intro\ntext\n## Page 2\ncontinued\n### Slide 2: Gamma $x$\n');
  assert.deepEqual(slides, [{ number: 1, title: 'Intro', page: 1, anchor: 'slide-1' }, { number: 2, title: 'Gamma $x$', page: 2, anchor: 'slide-2' }]);
});

test('course index rejects traversal and dangling references', () => {
  const base = { currentLesson: 'gamma', lectures: [{ id: 2, topics: [{ id: 'gamma', status: 'current' }] }], lessons: [{ id: 'gamma', lecture: 2, topicId: 'gamma', file: 'lessons/gamma.md', slide: 23, page: 10, prerequisites: [], teachback: 'Explain Gamma.' }] };
  assert.equal(validateCourse(base), base);
  assert.throws(() => validateCourse({ ...base, currentLesson: 'missing' }));
  assert.throws(() => validateCourse({ ...base, lessons: [{ ...base.lessons[0], file: '../secret.md' }] }));
  assert.throws(() => validateCourse({ ...base, lessons: [{ ...base.lessons[0], topicId: 'missing' }] }));
  assert.throws(() => validateCourse({ ...base, lessons: [{ ...base.lessons[0], sourceSlides: [] }] }));
  assert.throws(() => validateCourse({ ...base, lessons: [{ ...base.lessons[0], sourceSlides: [22] }] }));
  assert.throws(() => validateCourse({ ...base, lectures: [...base.lectures, { id: 3, topics: [] }], lessons: [{ ...base.lessons[0], lecture: 3 }] }));
});

test('file containment rejects traversal and symlink escape', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'bayes-containment-'));
  try {
    await mkdir(join(dir, 'allowed'));
    await writeFile(join(dir, 'allowed', 'ok.md'), 'ok');
    await writeFile(join(dir, 'secret.md'), 'secret');
    await symlink(join(dir, 'secret.md'), join(dir, 'allowed', 'escape.md'));
    assert.equal(await confinedFile(join(dir, 'allowed'), 'ok.md'), join(dir, 'allowed', 'ok.md'));
    await assert.rejects(confinedFile(join(dir, 'allowed'), '../secret.md'));
    await assert.rejects(confinedFile(join(dir, 'allowed'), 'escape.md'));
    await assert.rejects(confinedFile(join(dir, 'allowed'), '..\\secret.md'));
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('real course contains all eight lectures, original slides and linked current lesson', async () => {
  const store = createContentStore({ contentDir: resolve('study/content'), lectureDir: resolve('BayesLec') });
  const catalog = await store.catalog();
  assert.deepEqual(catalog.lectures.map(item => item.id), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(catalog.lectures.map(item => item.slides.length), [23, 28, 23, 25, 23, 28, 20, 26]);
  assert.deepEqual(catalog.lectures.map(item => item.pages), [20, 13, 17, 11, 15, 21, 12, 27]);
  for (const metadata of catalog.lessons) assert.ok((await store.lesson(metadata.id)).markdown.length > 100);
  assert.equal((await store.current()).id, catalog.currentLesson);
  assert.ok(catalog.lessons.find(item => item.id === catalog.currentLesson));
  assert.ok(catalog.sourceWarnings.some(item => item.lecture === 2 && item.slide === 28));
  assert.equal(await store.lesson('missing'), null);
});

test('every slide and roadmap topic in Lectures 3–8 has a substantial linked lesson', async () => {
  const store = createContentStore({ contentDir: resolve('study/content'), lectureDir: resolve('BayesLec') });
  const catalog = await store.catalog();
  for (const lecture of catalog.lectures.filter(item => item.id >= 3)) {
    const lessons = catalog.lessons.filter(item => item.lecture === lecture.id);
    assert.ok(lessons.length > 1, `Lecture ${lecture.id} needs a lesson sequence`);
    const covered = new Set();
    for (const metadata of lessons) {
      assert.ok(metadata.sourceSlides?.length, `${metadata.id}: missing source coverage`);
      assert.equal(metadata.sourceSlides[0], metadata.slide, metadata.id);
      assert.equal(metadata.page, lecture.slides.find(slide => slide.number === metadata.slide)?.page, `${metadata.id}: incorrect first page`);
      for (const number of metadata.sourceSlides) {
        assert.ok(lecture.slides.some(slide => slide.number === number), `${metadata.id}: unknown slide ${number}`);
        covered.add(number);
      }
      const lesson = await store.lesson(metadata.id);
      assert.ok(lesson.markdown.length > 1000, `${metadata.id}: lesson is a stub`);
      assert.ok(metadata.teachback.trim().length > 20, `${metadata.id}: missing teach-back`);
      assert.ok(metadata.prerequisites.length, `${metadata.id}: no prerequisite bridge`);
    }
    assert.deepEqual([...covered].sort((a,b) => a-b), lecture.slides.map(slide => slide.number), `Lecture ${lecture.id}: incomplete slide coverage`);
    for (const topic of lecture.topics) assert.ok(lessons.some(lesson => lesson.topicId === topic.id), `${topic.id}: no lesson linked from roadmap`);
  }
});

test('lesson navigation is a complete ordered chain and embedded source images exist', async () => {
  const { access } = await import('node:fs/promises');
  const store = createContentStore({ contentDir: resolve('study/content'), lectureDir: resolve('BayesLec') });
  const catalog = await store.catalog();
  for (let index = 0; index < catalog.lessons.length; index++) {
    const metadata = catalog.lessons[index];
    assert.equal(metadata.next, catalog.lessons[index + 1]?.id, `${metadata.id}: broken next link`);
    const { markdown } = await store.lesson(metadata.id);
    for (const match of markdown.matchAll(/!\[[^\]]*\]\((assets\/[^)]+)\)/g)) await access(await confinedFile(resolve('BayesLec'), match[1]));
  }
});

test('course validation accepts lecture 6–8 and rejects lecture 9', () => {
  const base = { currentLesson: 'example', lectures: [6, 7, 8].map(id => ({ id, topics: [] })), lessons: [{ id: 'example', lecture: 6, topicId: 'example', file: 'lessons/example.md', slide: 1, page: 1, prerequisites: [], teachback: 'Explain the model.' }] };
  base.lectures[0].topics.push({ id: 'example', status: 'not-started' });
  assert.equal(validateCourse(base), base);
  assert.throws(() => validateCourse({ ...base, lectures: [...base.lectures, { id: 9, topics: [] }] }), /Invalid lecture ID/);
});

test('new curriculum has substantive teaching checks, untouched progress defaults and preserved resume point', async () => {
  const store = createContentStore({ contentDir: resolve('study/content'), lectureDir: resolve('BayesLec') });
  const catalog = await store.catalog();
  assert.equal(catalog.currentLesson, 'l3-bayesian-workflow');
  assert.equal(catalog.lessons.length, 72);
  assert.deepEqual([6, 7, 8].map(id => catalog.lessons.filter(lesson => lesson.lecture === id).length), [13, 9, 11]);
  for (const lecture of catalog.lectures.filter(item => item.id >= 6)) {
    assert.ok(lecture.topics.every(topic => topic.status === 'not-started'), `Lecture ${lecture.id}: prepared must not mean learned`);
    const lessons = catalog.lessons.filter(item => item.lecture === lecture.id);
    const bodies = [];
    for (const metadata of lessons) {
      assert.ok(metadata.prerequisites.every(item => item.title.trim().length > 0 && item.detail.trim().length > 20), `${metadata.id}: thin prerequisite bridge`);
      const { markdown } = await store.lesson(metadata.id);
      assert.match(markdown, /^## Checkpoint$/m, metadata.id);
      assert.match(markdown, /<details>\s*<summary>Answer and (?:explanation|reasoning)<\/summary>[\s\S]+?<\/details>/, metadata.id);
      assert.match(markdown, /\bA\.\s/); assert.match(markdown, /\bB\.\s/);
      assert.match(markdown, /^## Teach-back$/m, metadata.id);
      assert.match(markdown, /Source(?: boundary)?:.*Lecture [678]/, metadata.id);
      bodies.push(markdown);
    }
    assert.match(bodies.join('\n'), /worked|numerical (?:example|contrast)|supporting .*calculation/i, `Lecture ${lecture.id}: no worked explanations`);
  }
});

test('all lecture sources have ordered unique slides, page expanders and readable original assets', async () => {
  const { readFile } = await import('node:fs/promises');
  const store = createContentStore({ contentDir: resolve('study/content'), lectureDir: resolve('BayesLec') });
  const catalog = await store.catalog();
  for (const metadata of catalog.lectures) {
    const lecture = await store.lecture(metadata.id);
    assert.deepEqual(lecture.slides.map(slide => slide.number), Array.from({ length: lecture.slides.length }, (_, index) => index + 1));
    assert.deepEqual([...lecture.markdown.matchAll(/^## Page (\d+)$/gm)].map(match => Number(match[1])), Array.from({ length: lecture.pages }, (_, index) => index + 1));
    assert.equal((lecture.markdown.match(/<summary>Original page /g) || []).length, lecture.pages);
    for (let page = 1; page <= lecture.pages; page++) {
      const path = `assets/lecture-${String(metadata.id).padStart(2, '0')}/page-${String(page).padStart(2, '0')}.png`;
      assert.ok(lecture.markdown.includes(`](${path})`), `${metadata.id}: page ${page} not embedded`);
      const png = await readFile(await confinedFile(resolve('BayesLec'), path));
      assert.equal(png.subarray(1, 4).toString(), 'PNG');
      assert.ok(png.readUInt32BE(16) >= 900 && png.readUInt32BE(20) >= 1100, `${path}: unreadable dimensions`);
    }
  }
});
