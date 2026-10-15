import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Marked } from 'marked';
import katex from 'katex';
import { createMarkdownRenderer } from '../render.mjs';

const render = createMarkdownRenderer(Marked, katex);
// Every source and lesson must render without parse-error fallback markup.
const validateMath = createMarkdownRenderer(Marked, {
  renderToString: (tex, options) => katex.renderToString(tex, { ...options, throwOnError: true })
});

for (const lecture of [1, 2, 3, 4, 5]) {
  test(`lecture ${lecture} renders its source text and equations without KaTeX errors`, async () => {
    const source = await readFile(resolve(`BayesLec/${lecture}.md`), 'utf8');
    assert.doesNotMatch(validateMath(source), /class="katex-error"/);
    const html = render(source);
    assert.match(html, /<h1>/);
    assert.match(html, /Slide 1:/);
    assert.doesNotMatch(html, /class="katex-error"/);
    if (lecture > 1) {
      assert.match(html, /class="katex"/);
      assert.match(html, /<math xmlns="http:\/\/www.w3.org\/1998\/Math\/MathML"/);
    }
  });
}

const course = JSON.parse(await readFile(resolve('study/content/course.json'), 'utf8'));
for (const lesson of course.lessons) {
  test(`${lesson.id} lesson renders text and accessible equations without math errors`, async () => {
    const source = await readFile(resolve('study/content', lesson.file), 'utf8');
    assert.doesNotMatch(validateMath(source), /class="katex-error"/);
    const html = render(source);
    assert.match(html, /<h1>/);
    if (source.includes('$')) {
      assert.match(html, /class="katex"/);
      assert.match(html, /class="katex-mathml"/);
      assert.match(html, /class="katex-html" aria-hidden="true"/);
    }
    assert.doesNotMatch(html, /class="katex-error"/);
  });
}

test('dollar-delimited equations are rendered while inline and fenced code remain literal', () => {
  const html = render('Inline math $x^2$; code `$not_math$`.\n\n```python\nprice = "$5"\nformula = "$$x$$"\n```\n\n$$\n\\Gamma(a) = \\int_0^\\infty t^{a-1}e^{-t}\\,dt\n$$\n');
  assert.equal((html.match(/class="katex"/g) || []).length, 2);
  assert.match(html, /<code>\$not_math\$<\/code>/);
  assert.match(html, /<pre><code class="language-python">price = &quot;\$5&quot;\nformula = &quot;\$\$x\$\$&quot;\n<\/code><\/pre>/);
  assert.match(html, /class="math-block"/);
});

test('escaped dollars and unmatched delimiters stay ordinary text', () => {
  const html = render('An escaped \\$5 and an unfinished $x expression.');
  assert.doesNotMatch(html, /class="katex"/);
  assert.match(html, /An escaped \$5 and an unfinished \$x expression/);
});

test('invalid equations produce a visible error marker rather than breaking the lesson', () => {
  const html = render('Before $\\frac{x}{$ after.');
  assert.match(html, /class="katex-error"/);
  assert.match(html, /Before/);
  assert.match(html, /after/);
  assert.match(render('$\\unknownCommand{x}$'), /class="katex-error"/);
});
