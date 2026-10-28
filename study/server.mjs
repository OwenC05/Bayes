import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createContentStore, confinedFile } from './content.mjs';

const appDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(appDir, '..');
const mime = { '.html': 'text/html; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const files = new Set(['index.html', 'styles.css', 'app.mjs', 'render.mjs', 'state.mjs']);
const csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'";

export function buildServer(options = {}) {
  const paths = { appDir, contentDir: resolve(appDir, 'content'), lectureDir: resolve(projectDir, 'BayesLec'), vendorDir: resolve(projectDir, 'node_modules'), ...options };
  const content = createContentStore(paths);
  return createServer(async (req, res) => {
    res.setHeader('Content-Security-Policy', csp);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-store');
    function send(status, body, type = 'application/json; charset=utf-8') {
      const buffer = Buffer.from(type.startsWith('application/json') ? JSON.stringify(body) : body);
      res.writeHead(status, { 'Content-Type': type, 'Content-Length': buffer.length });
      res.end(req.method === 'HEAD' ? undefined : buffer);
    }
    async function serve(root, relative) {
      let file;
      try {
        file = await confinedFile(root, relative);
        if (!(await stat(file)).isFile()) throw new Error('Not a file');
      } catch { send(404, { error: 'File not found.' }); return; }
      send(200, await readFile(file), mime[extname(file)] || 'application/octet-stream');
    }
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) { send(403, { error: 'This companion is available on localhost only.' }); return; }
      if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD'); send(405, { error: 'The study server is read-only.' }); return; }
      let path;
      try { path = decodeURIComponent(url.pathname); } catch { send(400, { error: 'Invalid URL.' }); return; }
      if (path === '/api/health') { send(200, { status: 'ok', localOnly: true }); return; }
      if (path === '/api/catalog') { send(200, await content.catalog()); return; }
      if (path === '/api/current') { send(200, await content.current()); return; }
      const lectureMatch = path.match(/^\/api\/lectures\/([1-9]|10)$/);
      if (lectureMatch) {
        const lecture = await content.lecture(Number(lectureMatch[1]));
        send(lecture ? 200 : 404, lecture || { error: 'Lecture not found.' }); return;
      }
      const lessonMatch = path.match(/^\/api\/lessons\/([a-z0-9-]+)$/);
      if (lessonMatch) {
        const lesson = await content.lesson(lessonMatch[1]);
        send(lesson ? 200 : 404, lesson || { error: 'Lesson not found.' }); return;
      }
      if (path === '/' || files.has(path.slice(1))) { await serve(paths.appDir, path === '/' ? 'index.html' : path.slice(1)); return; }
      if (/^\/lectures\/(?:[1-9]|10)\.(pdf|md)$/.test(path)) { await serve(paths.lectureDir, path.slice('/lectures/'.length)); return; }
      if (path.startsWith('/lecture-assets/') && /\.png$/.test(path)) { await serve(resolve(paths.lectureDir, 'assets'), path.slice('/lecture-assets/'.length)); return; }
      const vendors = { '/vendor/marked.mjs': ['marked', 'lib/marked.esm.js'], '/vendor/purify.mjs': ['dompurify', 'dist/purify.es.mjs'], '/vendor/katex/katex.mjs': ['katex', 'dist/katex.mjs'], '/vendor/katex/katex.min.css': ['katex', 'dist/katex.min.css'] };
      if (vendors[path]) { const [packageName, file] = vendors[path]; await serve(resolve(paths.vendorDir, packageName), file); return; }
      if (/^\/vendor\/katex\/fonts\/[a-zA-Z0-9_-]+\.(woff2?|ttf)$/.test(path)) { await serve(resolve(paths.vendorDir, 'katex/dist'), path.slice('/vendor/katex/'.length)); return; }
      send(404, { error: 'Page not found.' });
    } catch (error) {
      if (error instanceof TypeError && error.code === 'ERR_INVALID_URL') send(400, { error: 'Invalid URL.' });
      else {
        console.error('Study server:', error.message);
        if (!res.headersSent) send(500, { error: 'Could not load the study files. Check the local server terminal and try again.' });
        else res.end();
      }
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 8765);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be an integer between 1 and 65535.');
  const server = buildServer();
  server.on('error', error => { console.error(`Could not start the study companion: ${error.message}`); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`Bayes study companion\nLocal: http://127.0.0.1:${port}\nRead-only lecture sources · Personal notes stay in your browser\nPress Ctrl+C to stop.`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.close(() => process.exit()));
}
