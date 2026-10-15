// Optional browser regression suite; requires the agent-browser CLI and Chromium.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { once } from 'node:events';
import { buildServer } from '../server.mjs';

const run = promisify(execFile);
const session = `bayes-study-qa-${Date.now()}`;
const server = buildServer();
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const url = `http://127.0.0.1:${server.address().port}`;
async function browser(...args) {
  const result = await run('agent-browser', ['--session', session, ...args], { timeout: 45000, maxBuffer: 2_000_000, windowsHide: true });
  return result.stdout.trim();
}
const ready = "document.querySelector('#page-title').textContent==='The Gamma function and Gamma distribution' && !document.querySelector('#main-content').hasAttribute('aria-busy')";
try {
  await browser('open', `${url}/#lesson/gamma`);
  await browser('wait', '--fn', ready);
  console.log(await browser('eval', `
(async()=>{
 const assert=(condition,message)=>{if(!condition)throw Error(message)};
 const until=async predicate=>{const end=Date.now()+6000;while(!predicate()){if(Date.now()>end)throw Error('UI condition timed out');await new Promise(r=>setTimeout(r,50))}};
 const {loadRenderer}=await import('/render.mjs');const render=await loadRenderer();const el=document.createElement('div');
 render(el,'<script>window.__bad=true</script><img src=x onerror="window.__bad=true"><a href="javascript:alert(1)">bad</a>\\n\\n$x^2$ and \`$literal$\`');
 assert(!el.querySelector('script,[onerror],[href^="javascript:"]')&&!window.__bad,'Unsafe Markdown survived');
 assert(el.querySelector('math')&&el.querySelector('code').textContent==='$literal$','Accessible math/code regression');
 for(let id=1;id<=5;id++){const source=await(await fetch('/api/lectures/'+id)).json();assert(!render(el,source.markdown,{lectureId:id}).mathErrors,'Lecture math failure '+id)}
 assert(document.querySelector('#assessment-select').value!=='can-explain','Opening marked mastery');
 const course=await(await fetch('/api/catalog')).json();
 assert(document.querySelectorAll('#lesson-select option').length===course.lessons.length,'Lesson picker incomplete');
 for(const lesson of course.lessons){const body=await(await fetch('/api/lessons/'+lesson.id)).json();assert(!render(el,body.markdown,{lectureId:lesson.lecture}).mathErrors,'Lesson render failure '+lesson.id);assert([...el.querySelectorAll('.katex-display,table,pre')].every(block=>block.tabIndex===0),'Scrollable content lacks keyboard access '+lesson.id)}
 for(const lecture of course.lectures.filter(item=>item.id>=3)){
  document.querySelector('[data-lecture="'+lecture.id+'"]').click();
  await until(()=>document.querySelector('#eyebrow').textContent.startsWith('Lecture 0'+lecture.id)&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(location.hash.startsWith('#lesson/l'+lecture.id+'-'),'Lecture navigation did not open lessons');
  const last=course.lessons.filter(item=>item.lecture===lecture.id).at(-1);
  const picker=document.querySelector('#lesson-select');picker.value=last.id;picker.dispatchEvent(new Event('change',{bubbles:true}));
  await until(()=>document.querySelector('#page-title').textContent===last.title&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(document.querySelector('#lesson-select').value===last.id,'Lesson picker route mismatch');
  assert(document.querySelector('#lesson-meta a').getAttribute('href')==='#notes/'+lecture.id+'/slide-'+last.slide,'Wrong source link');
 }
 location.hash='#lesson/gamma';await until(()=>document.querySelector('#page-title').textContent==='The Gamma function and Gamma distribution'&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
 const original=Storage.prototype.setItem;let failures=0;
 Storage.prototype.setItem=function(...args){if(failures++<2)throw Error('temporary quota failure');return original.apply(this,args)};
 try{
  const note=document.querySelector('#personal-notes');note.value='Draft retained after failed save';note.dispatchEvent(new Event('input',{bubbles:true}));
  const select=document.querySelector('#assessment-select');select.value='introduced';select.dispatchEvent(new Event('change',{bubbles:true}));
  assert(document.querySelector('#save-status').textContent.includes('memory only'),'Storage failure not reported');
  location.hash='#lesson/beta';await until(()=>document.querySelector('#page-title').textContent==='The Beta distribution');
  const saved=JSON.parse(localStorage.getItem('bayes-study-companion-v1'));
  assert(saved.notes['lesson:gamma'].notes==='Draft retained after failed save','Failed note save lost on navigation');
  assert(saved.progress['gamma']==='introduced','Failed progress save lost on navigation');
 }finally{Storage.prototype.setItem=original}
 const originalFetch=window.fetch;
 window.fetch=(path,...args)=>path==='/api/lessons/gamma'?new Promise((_,reject)=>setTimeout(()=>reject(Error('old request failure')),500)):originalFetch(path,...args);
 try{
  location.hash='#lesson/gamma';await until(()=>document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(document.querySelector('#assessment-select').disabled,'Stale assessment editable');
  location.hash='#notes/2/slide-23';await until(()=>document.querySelector('#lecture-body #slide-23'));
  await new Promise(r=>setTimeout(r,650));assert(document.querySelector('#app-error').hidden,'Stale failure contaminated route');
  document.querySelector('.skip-link').click();assert(location.hash==='#notes/2/slide-23'&&document.activeElement.id==='main-content','Skip link changed route');
 }finally{window.fetch=originalFetch}
 return {markdown:'safe',lectures:5,lessons:course.lessons.length,lessonNavigation:'pass',failedSaves:'retained',staleRequests:'isolated',skipLink:'pass'};
})()`));
  await browser('eval', "localStorage.setItem('bayes-study-companion-v1','{important-unreadable-data');location.reload()");
  await browser('wait', '--fn', "document.querySelector('#save-status').textContent.includes('preserved')");
  console.log(await browser('eval', `
(async()=>{
 const assert=(condition,message)=>{if(!condition)throw Error(message)};
 const raw='{important-unreadable-data',key='bayes-study-companion-v1';
 assert(localStorage.getItem(key)===raw,'Unreadable state overwritten at startup');
 const note=document.querySelector('#personal-notes');note.value='Recovery draft';note.dispatchEvent(new Event('input',{bubbles:true}));
 assert(localStorage.getItem(key)===raw,'Unreadable state overwritten by input');
 const create=URL.createObjectURL,click=HTMLAnchorElement.prototype.click;let exported;
 try{URL.createObjectURL=blob=>{exported=blob;return 'blob:test'};HTMLAnchorElement.prototype.click=function(){};document.querySelector('#export-notes').click();
 const data=JSON.parse(await exported.text());assert(data.preservedStorageRaw===raw&&Object.values(data.notes).some(item=>item.notes==='Recovery draft'),'Recovery export incomplete');
 }finally{URL.createObjectURL=create;HTMLAnchorElement.prototype.click=click}
 return {unreadableState:'preserved',recoveryExport:'both versions'};
})()`));
  await browser('set', 'viewport', '375', '812');
  console.log(await browser('eval', "({mobileOverflow:document.documentElement.scrollWidth>innerWidth})"));
  const overflow = await browser('eval', 'document.documentElement.scrollWidth>innerWidth');
  if (overflow !== 'false') throw Error('Mobile page overflow');
  console.log('Browser regressions passed.');
} catch (error) {
  console.error(error.stderr || error.message);
  process.exitCode = 1;
} finally {
  await browser('close').catch(() => {});
  await new Promise(resolve => server.close(resolve));
}
