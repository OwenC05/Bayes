import test from 'node:test';
import assert from 'node:assert/strict';
import { readState, persistState, emptyState, progressFor, noteKey, parseRoute, STORAGE_KEY } from '../state.mjs';

function memoryStorage() {
  const map = new Map();
  return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) };
}

test('notes and manual progress survive storage round trip', () => {
  const storage = memoryStorage();
  const state = emptyState();
  state.notes['lesson:gamma'] = { notes: 'My explanation', answer: 'A density, not a mass.', updatedAt: '2026-10-14' };
  state.progress.gamma = 'can-explain';
  assert.equal(persistState(storage, state).saved, true);
  assert.deepEqual(readState(storage).state, state);
});

test('storage failures are reported, never falsely labelled saved', () => {
  const storage = { getItem() { throw new Error('disabled'); }, setItem() { throw new Error('full'); } };
  assert.ok(readState(storage).warning);
  assert.equal(persistState(storage, emptyState()).saved, false);
  assert.match(persistState(storage, emptyState()).message, /memory only/);
});

test('corrupt state is recoverable and invalid progress is ignored', () => {
  const storage = memoryStorage();
  storage.setItem(STORAGE_KEY, '{broken');
  assert.ok(readState(storage).warning);
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, notes: {}, progress: { gamma: 'auto-mastered' } }));
  assert.deepEqual(readState(storage).state.progress, {});
});

test('opening a topic does not declare mastery and note scopes do not overlap', () => {
  const state = emptyState();
  assert.equal(progressFor({ id: 'gamma', status: 'current' }, state), 'not-started');
  assert.equal(progressFor({ id: 'gaussian', status: 'introduced' }, state), 'introduced');
  assert.notEqual(noteKey({ view: 'notes', lectureId: 2 }), noteKey({ view: 'lesson', lessonId: 'gamma' }));
});

test('deep links are validated against known content', () => {
  const catalog = { currentLesson: 'gamma', lessons: [{ id: 'gamma' }], lectures: [{ id: 2 }] };
  assert.deepEqual(parseRoute('#notes/2/slide-23', catalog), { view: 'notes', lectureId: 2, anchor: 'slide-23' });
  assert.deepEqual(parseRoute('#lesson/../../secret', catalog), { view: 'lesson', lessonId: 'gamma' });
  assert.deepEqual(parseRoute('#notes/2/anything', catalog).anchor, '');
});

test('unreadable and incompatible data are preserved during automatic saves', () => {
  for (const raw of ['{broken', '{"version":99,"notes":{"important":"work"}}']) {
    const storage = memoryStorage();
    storage.setItem(STORAGE_KEY, raw);
    const loaded = readState(storage);
    assert.equal(loaded.blockedWrites, true);
    assert.equal(loaded.recoveryRaw, raw);
    assert.equal(persistState(storage, loaded.state, loaded).saved, false);
    assert.equal(storage.getItem(STORAGE_KEY), raw);
  }
});

test('tabs merge disjoint notes and progress without replacing stale fields', async () => {
  const { mergeChanges, noteConflict } = await import('../state.mjs');
  const baseline = emptyState();
  const tabA = structuredClone(baseline);
  tabA.notes['lesson:gamma'] = { notes: 'Gamma draft' };
  tabA.progress.gamma = 'introduced';
  const tabB = structuredClone(baseline);
  tabB.notes['lesson:beta'] = { notes: 'Beta draft' };
  let latest = mergeChanges(baseline, tabA, { noteKey: 'lesson:gamma' });
  latest = mergeChanges(latest, tabA, { topicId: 'gamma' });
  assert.equal(noteConflict(latest, baseline, tabB, 'lesson:beta'), false);
  latest = mergeChanges(latest, tabB, { noteKey: 'lesson:beta' });
  assert.equal(latest.notes['lesson:gamma'].notes, 'Gamma draft');
  assert.equal(latest.notes['lesson:beta'].notes, 'Beta draft');
  assert.equal(latest.progress.gamma, 'introduced');
  tabB.notes['lesson:gamma'] = { notes: 'Conflicting draft' };
  assert.equal(noteConflict(latest, baseline, tabB, 'lesson:gamma'), true);
});

test('unsafe storage keys do not reach object prototypes', () => {
  const storage = memoryStorage();
  storage.setItem(STORAGE_KEY, '{"version":1,"notes":{"__proto__":{"notes":"bad"}},"progress":{"__proto__":"introduced","constructor":"introduced"}}');
  const loaded = readState(storage);
  assert.deepEqual(loaded.state.notes, {});
  assert.deepEqual(loaded.state.progress, {});
});
