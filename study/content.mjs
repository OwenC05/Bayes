import { readFile, realpath } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';

export async function confinedFile(root, relative) {
  if (typeof relative !== 'string' || relative.includes('\\') || relative.includes('\0')) throw new Error('Invalid path');
  const base = await realpath(root);
  const candidate = resolve(base, relative);
  if (!candidate.startsWith(base + sep)) throw new Error('Invalid path');
  const actual = await realpath(candidate);
  if (!actual.startsWith(base + sep)) throw new Error('Invalid path');
  return actual;
}

export function parseSlides(markdown) {
  let page = 1;
  const slides = [];
  for (const line of markdown.split(/\r?\n/)) {
    const pageHeading = line.match(/^## Page (\d+)\s*$/);
    if (pageHeading) page = Number(pageHeading[1]);
    const slide = line.match(/^### Slide (\d+):\s*(.+)$/);
    if (slide) slides.push({ number: Number(slide[1]), title: slide[2], page, anchor: `slide-${slide[1]}` });
  }
  return slides;
}

export function pageCount(markdown) {
  return Math.max(1, ...[...markdown.matchAll(/^## Page (\d+)\s*$/gm)].map(match => Number(match[1])));
}

export function validateCourse(course) {
  if (!course || !Array.isArray(course.lectures) || !Array.isArray(course.lessons)) throw new Error('Invalid course index');
  const lectureIds = new Set();
  const topicIds = new Set();
  const topicLectures = new Map();
  for (const lecture of course.lectures) {
    if (!Number.isInteger(lecture.id) || lecture.id < 1 || lecture.id > 10 || lectureIds.has(lecture.id)) throw new Error('Invalid lecture ID');
    lectureIds.add(lecture.id);
    if (!Array.isArray(lecture.topics)) throw new Error('Missing lecture topics');
    for (const topic of lecture.topics) {
      if (!topic.id || topicIds.has(topic.id)) throw new Error('Invalid topic ID');
      if (!['introduced', 'current', 'not-started'].includes(topic.status)) throw new Error('Invalid topic status');
      topicIds.add(topic.id);
      topicLectures.set(topic.id, lecture.id);
    }
  }
  const lessonIds = new Set();
  for (const lesson of course.lessons) {
    if (!/^[a-z0-9-]+$/.test(lesson.id) || lessonIds.has(lesson.id)) throw new Error('Invalid lesson ID');
    if (!lectureIds.has(lesson.lecture) || topicLectures.get(lesson.topicId) !== lesson.lecture) throw new Error('Invalid lesson reference');
    if (!/^lessons\/[a-z0-9-]+\.md$/.test(lesson.file)) throw new Error('Invalid lesson file');
    if (!Number.isInteger(lesson.slide) || lesson.slide < 1 || !Number.isInteger(lesson.page) || lesson.page < 1) throw new Error('Invalid lesson source');
    if (lesson.sourceSlides && (!Array.isArray(lesson.sourceSlides) || !lesson.sourceSlides.length || new Set(lesson.sourceSlides).size !== lesson.sourceSlides.length || lesson.sourceSlides.some(slide => !Number.isInteger(slide) || slide < 1) || lesson.sourceSlides[0] !== lesson.slide)) throw new Error('Invalid lesson slide coverage');
    if (!Array.isArray(lesson.prerequisites) || lesson.prerequisites.some(item => typeof item.title !== 'string' || typeof item.detail !== 'string') || typeof lesson.teachback !== 'string') throw new Error('Invalid lesson teaching metadata');
    lessonIds.add(lesson.id);
  }
  if (!lessonIds.has(course.currentLesson)) throw new Error('Missing current lesson');
  for (const lesson of course.lessons) if (lesson.next && !lessonIds.has(lesson.next)) throw new Error('Invalid next lesson');
  return course;
}

export function createContentStore({ contentDir, lectureDir }) {
  async function course() {
    return validateCourse(JSON.parse(await readFile(resolve(contentDir, 'course.json'), 'utf8')));
  }
  async function lecture(id) {
    const index = await course();
    const metadata = index.lectures.find(item => item.id === Number(id));
    if (!metadata) return null;
    const markdown = await readFile(await confinedFile(lectureDir, `${metadata.id}.md`), 'utf8');
    return { ...metadata, markdown, slides: parseSlides(markdown), pages: pageCount(markdown) };
  }
  async function catalog() {
    const index = await course();
    const lectures = await Promise.all(index.lectures.map(async item => {
      const markdown = await readFile(await confinedFile(lectureDir, `${item.id}.md`), 'utf8');
      return { ...item, slides: parseSlides(markdown), pages: pageCount(markdown) };
    }));
    return { ...index, lectures };
  }
  async function lesson(id) {
    const index = await course();
    const metadata = index.lessons.find(item => item.id === id);
    if (!metadata) return null;
    const markdown = await readFile(await confinedFile(contentDir, metadata.file), 'utf8');
    return { ...metadata, markdown };
  }
  async function current() {
    const index = await course();
    const active = await lesson(index.currentLesson);
    return { id: active.id, revision: createHash('sha256').update(JSON.stringify(index)).update(active.markdown).digest('hex') };
  }
  return { course, catalog, lecture, lesson, current };
}
