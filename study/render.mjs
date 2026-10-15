export function createMarkdownRenderer(Marked, katex) {
  const parser = new Marked({ gfm: true, breaks: false });
  function math(token) {
    try {
      return katex.renderToString(token.tex, { displayMode: token.display, output: 'htmlAndMathml', trust: false, throwOnError: true, strict: 'ignore', maxExpand: 1000, maxSize: 20 });
    } catch {
      const escaped = token.tex.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
      return `<span class="katex-error">${escaped}</span>`;
    }
  }
  parser.use({ extensions: [
    {
      name: 'displayMath', level: 'block',
      start: source => source.indexOf('$$'),
      tokenizer(source) {
        const match = /^\$\$([\s\S]+?)\$\$(?:[ \t]*(?:\n|$))/.exec(source);
        if (match) return { type: 'displayMath', raw: match[0], tex: match[1].trim(), display: true };
      },
      renderer: token => `<div class="math-block">${math(token)}</div>\n`
    },
    {
      name: 'inlineMath', level: 'inline',
      start: source => source.indexOf('$'),
      tokenizer(source) {
        const match = /^\$(?!\$)((?:\\.|[^$\\\n])+?)\$(?!\$)/.exec(source);
        if (match) return { type: 'inlineMath', raw: match[0], tex: match[1], display: false };
      },
      renderer: math
    }
  ] });
  return markdown => parser.parse(markdown);
}

export async function loadRenderer() {
  const [{ Marked }, { default: katex }, { default: purify }] = await Promise.all([
    import('/vendor/marked.mjs'), import('/vendor/katex/katex.mjs'), import('/vendor/purify.mjs')
  ]);
  const render = createMarkdownRenderer(Marked, katex);
  return function renderInto(element, markdown, { lectureId, removeTitle = false } = {}) {
    const html = render(markdown);
    element.innerHTML = purify.sanitize(html, {
      USE_PROFILES: { html: true, mathMl: true, svg: true },
      FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['srcset'], SANITIZE_NAMED_PROPS: true
    });
    if (removeTitle) element.querySelector('h1')?.remove();
    // Wide formulas, tables and code must be scrollable with a keyboard too.
    for (const block of element.querySelectorAll('.katex-display, table, pre')) {
      block.tabIndex = 0;
      if (block.tagName !== 'TABLE') {
        block.setAttribute('role', 'group');
        block.setAttribute('aria-label', block.matches('.katex-display') ? 'Equation; scroll horizontally if needed' : 'Code; scroll horizontally if needed');
      }
    }
    for (const heading of element.querySelectorAll('h3')) {
      const match = heading.textContent.match(/^Slide (\d+):/);
      if (match) { heading.id = `slide-${match[1]}`; heading.tabIndex = -1; }
    }
    for (const image of element.querySelectorAll('img')) {
      const source = image.getAttribute('src') || '';
      if (source.startsWith('assets/')) image.src = `/lecture-assets/${source.slice(7)}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `Enlarge: ${image.alt || 'lecture image'}`);
    }
    for (const link of element.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (/^[1-8]\.pdf$/.test(href)) link.href = `/lectures/${href}`;
      else if (/^[1-8]\.md$/.test(href)) link.href = `#notes/${href[0]}`;
      else if (/^https?:\/\//.test(href)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      else if (href.startsWith('#slide-') && lectureId) link.href = `#notes/${lectureId}/${href.slice(1)}`;
    }
    return { mathErrors: element.querySelectorAll('.katex-error').length };
  };
}
