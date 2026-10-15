import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { request } from 'node:http';
import { once } from 'node:events';
import { readFile, mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { buildServer } from '../server.mjs';

let server;
before(async () => {
  server = buildServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
});
after(async () => { await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });

function get(path, { method = 'GET', host = 'localhost', target = server } = {}) {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port: target.address().port, path, method, headers: { Host: host } }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.end();
  });
}

test('local API exposes the five lectures, curated lessons and current revision', async () => {
  const health = await get('/api/health');
  assert.equal(health.status, 200);
  assert.deepEqual(JSON.parse(health.body), { status: 'ok', localOnly: true });
  const catalog = await get('/api/catalog');
  assert.equal(catalog.status, 200);
  const course = JSON.parse(catalog.body);
  assert.deepEqual(course.lectures.map(lecture => lecture.id), [1, 2, 3, 4, 5]);
  for (const lecture of course.lectures) {
    const response = await get(`/api/lectures/${lecture.id}`);
    assert.equal(response.status, 200);
    assert.equal(JSON.parse(response.body).markdown, await readFile(resolve(`BayesLec/${lecture.id}.md`), 'utf8'));
  }
  for (const lesson of course.lessons) {
    const response = await get(`/api/lessons/${lesson.id}`);
    assert.equal(response.status, 200);
    assert.ok(JSON.parse(response.body).markdown.length > 100);
  }
  const current = JSON.parse((await get('/api/current')).body);
  assert.equal(current.id, course.currentLesson);
  assert.match(current.revision, /^[a-f0-9]{64}$/);
});

test('allowlisted static assets and local rendering dependencies have correct types and bytes', async () => {
  const assets = [
    ['/', 'study/index.html', 'text/html'],
    ['/styles.css', 'study/styles.css', 'text/css'],
    ['/app.mjs', 'study/app.mjs', 'text/javascript'],
    ['/render.mjs', 'study/render.mjs', 'text/javascript'],
    ['/state.mjs', 'study/state.mjs', 'text/javascript'],
    ['/lectures/2.md', 'BayesLec/2.md', 'text/plain'],
    ['/lectures/2.pdf', 'BayesLec/2.pdf', 'application/pdf'],
    ['/lecture-assets/lecture-02/page-10.png', 'BayesLec/assets/lecture-02/page-10.png', 'image/png'],
    ['/vendor/marked.mjs', 'node_modules/marked/lib/marked.esm.js', 'text/javascript'],
    ['/vendor/purify.mjs', 'node_modules/dompurify/dist/purify.es.mjs', 'text/javascript'],
    ['/vendor/katex/katex.mjs', 'node_modules/katex/dist/katex.mjs', 'text/javascript'],
    ['/vendor/katex/katex.min.css', 'node_modules/katex/dist/katex.min.css', 'text/css'],
    ['/vendor/katex/fonts/KaTeX_Main-Regular.woff2', 'node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2', 'font/woff2']
  ];
  for (const [url, file, type] of assets) {
    const response = await get(url);
    assert.equal(response.status, 200, url);
    assert.ok(response.headers['content-type'].startsWith(type), url);
    assert.deepEqual(response.body, await readFile(resolve(file)), url);
  }
});

test('HEAD retains GET metadata but never returns a body for static, API or errors', async () => {
  for (const path of ['/', '/api/catalog', '/vendor/katex/katex.min.css', '/missing']) {
    const full = await get(path);
    const head = await get(path, { method: 'HEAD' });
    assert.equal(head.status, full.status, path);
    assert.equal(head.headers['content-type'], full.headers['content-type'], path);
    assert.equal(head.headers['content-length'], full.headers['content-length'], path);
    assert.equal(head.body.length, 0, path);
  }
});

test('responses disable caching and enforce same-origin and embedding protections', async () => {
  for (const path of ['/', '/api/health', '/missing']) {
    const { headers } = await get(path);
    assert.equal(headers['cache-control'], 'no-store');
    assert.equal(headers['x-content-type-options'], 'nosniff');
    assert.equal(headers['referrer-policy'], 'no-referrer');
    assert.match(headers['content-security-policy'], /script-src 'self'/);
    assert.match(headers['content-security-policy'], /frame-ancestors 'none'/);
    assert.match(headers['content-security-policy'], /object-src 'none'/);
  }
});

test('write methods are rejected without changing lecture sources', async () => {
  const before = await readFile(resolve('BayesLec/2.md'));
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
    const response = await get('/api/lectures/2', { method });
    assert.equal(response.status, 405, method);
    assert.equal(response.headers.allow, 'GET, HEAD');
  }
  assert.deepEqual(await readFile(resolve('BayesLec/2.md')), before);
});

test('non-local Host headers and malformed URLs are rejected', async () => {
  assert.equal((await get('/api/health', { host: 'attacker.example' })).status, 403);
  assert.equal((await get('/%invalid')).status, 400);
});

test('private paths, unknown API entries and encoded traversal cannot expose workspace files', async () => {
  const paths = [
    '/package.json', '/package-lock.json', '/server.mjs', '/content.mjs', '/content/course.json',
    '/.omx/state/current.json', '/node_modules/marked/package.json', '/vendor/marked/package.json',
    '/vendor/katex/fonts/../../package.json', '/lectures/README.md', '/lectures/6.md',
    '/api/lectures/6', '/api/lessons/missing', '/lecture-assets/../../package.json',
    '/lecture-assets/%2e%2e%2f%2e%2e%2fpackage.json', '/lecture-assets/..%5c..%5csecret.png',
    '/vendor/katex/fonts/%2e%2e%2fkatex.mjs'
  ];
  for (const path of paths) assert.equal((await get(path)).status, 404, path);
});

test('an image symlink outside the lecture asset root is not served', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'bayes-server-'));
  let isolated;
  try {
    await mkdir(join(dir, 'assets'));
    await writeFile(join(dir, 'private.png'), 'private content');
    await symlink(join(dir, 'private.png'), join(dir, 'assets/escape.png'));
    isolated = buildServer({ lectureDir: dir });
    isolated.listen(0, '127.0.0.1');
    await once(isolated, 'listening');
    const response = await get('/lecture-assets/escape.png', { target: isolated });
    assert.equal(response.status, 404);
    assert.ok(!response.body.includes(Buffer.from('private content')));
  } finally {
    if (isolated?.listening) await new Promise(resolve => isolated.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});
