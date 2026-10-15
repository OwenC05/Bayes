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

 assert(document.querySelector('#assessment-select').value!=='can-explain','Opening marked mastery');
 const course=await(await fetch('/api/catalog')).json();
 assert(course.lectures.length===8&&course.lessons.length===72,'Expanded catalog incomplete');
 const range=String(course.lectures[0].id).padStart(2,'0')+'—'+String(course.lectures.at(-1).id).padStart(2,'0');
 assert(document.querySelector('.sidebar-heading span').textContent===range,'Sidebar lecture range does not match catalog');
 for(const lecture of course.lectures){
  const source=await(await fetch('/api/lectures/'+lecture.id)).json();
  assert(!render(el,source.markdown,{lectureId:lecture.id}).mathErrors,'Lecture math failure '+lecture.id);
  assert(el.querySelector('a[href="/lectures/'+lecture.id+'.pdf"]'),'Source PDF link not rewritten '+lecture.id);
  render(el,'[PDF]('+lecture.id+'.pdf) [Notes]('+lecture.id+'.md) [Slide](#slide-2)',{lectureId:lecture.id});
  assert(el.querySelector('a[href="/lectures/'+lecture.id+'.pdf"]')&&el.querySelector('a[href="#notes/'+lecture.id+'"]')&&el.querySelector('a[href="#notes/'+lecture.id+'/slide-2"]'),'Source/deep-link rewrite failure '+lecture.id);
 }
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
 for(const lecture of course.lectures){
  location.hash='#notes/'+lecture.id+'/slide-2';
  await until(()=>document.querySelector('#eyebrow').textContent==='Lecture 0'+lecture.id+' / Original notes'&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(document.querySelector('#lecture-body #slide-2'),'Missing source deep-link heading '+lecture.id);
  assert(document.querySelectorAll('#slide-list a').length===lecture.slides.length,'Source TOC incomplete '+lecture.id);
  assert(document.querySelector('#source-link').getAttribute('href').startsWith('/lectures/'+lecture.id+'.pdf#page='),'Wrong original PDF source link '+lecture.id);
  await until(()=>document.querySelector('#source-image').complete&&document.querySelector('#source-image').naturalWidth>0);
 }
 for(const id of [5,6,7]){
  const last=course.lessons.filter(item=>item.lecture===id).at(-1),next=course.lessons.find(item=>item.id===last.next);
  location.hash='#lesson/'+last.id;await until(()=>document.querySelector('#page-title').textContent===last.title&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  document.querySelector('#next-lesson').click();await until(()=>document.querySelector('#page-title').textContent===next.title&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(location.hash==='#lesson/'+next.id,'Cross-lecture next link failed '+id);
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
 return {markdown:'safe',lectures:course.lectures.length,lessons:course.lessons.length,sourceLinks:'pass',sourceImages:'loaded',crossLectureNext:'pass',lessonNavigation:'pass',failedSaves:'retained',staleRequests:'isolated',skipLink:'pass'};
})()`));
  console.log(await browser('eval', `
(async()=>{
 const until=async predicate=>{const end=Date.now()+6000;while(!predicate()){if(Date.now()>end)throw Error('Persistence UI timed out');await new Promise(r=>setTimeout(r,50))}};
 const course=await(await fetch('/api/catalog')).json();
 const lesson=course.lessons.find(item=>item.lecture===8);
 for(const id of [6,7,8]){
  location.hash='#notes/'+id+'/slide-2';await until(()=>document.querySelector('#eyebrow').textContent==='Lecture 0'+id+' / Original notes'&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  for(const [field,value] of [['personal-notes','Persisted lecture '+id],['teachback-answer','Lecture answer '+id]]){const input=document.getElementById(field);input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}))}
 }
 location.hash='#lesson/'+lesson.id;await until(()=>document.querySelector('#page-title').textContent===lesson.title&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
 for(const [field,value] of [['personal-notes','Persisted new lesson'],['teachback-answer','Persisted new teach-back']]){const input=document.getElementById(field);input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}))}
 location.reload();return {persistence:'written; reloading'};
})()`));
  await browser('wait', '--fn', "document.querySelector('#eyebrow').textContent==='Lecture 08 / Focused lesson' && !document.querySelector('#main-content').hasAttribute('aria-busy')");
  console.log(await browser('eval', `
(async()=>{
 const assert=(condition,message)=>{if(!condition)throw Error(message)};
 const until=async predicate=>{const end=Date.now()+6000;while(!predicate()){if(Date.now()>end)throw Error('Persistence reload timed out');await new Promise(r=>setTimeout(r,50))}};
 assert(document.querySelector('#personal-notes').value==='Persisted new lesson'&&document.querySelector('#teachback-answer').value==='Persisted new teach-back','New lesson writing did not survive reload');
 for(const id of [6,7,8]){
  location.hash='#notes/'+id+'/slide-2';await until(()=>document.querySelector('#eyebrow').textContent==='Lecture 0'+id+' / Original notes'&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(document.querySelector('#personal-notes').value==='Persisted lecture '+id&&document.querySelector('#teachback-answer').value==='Lecture answer '+id,'Lecture writing lost after reload '+id);
 }
 return {newLessonWriting:'reload pass',lectureNotes:'6–8 reload pass'};
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
  console.log(await browser('eval', `
(async()=>{
 const assert=(condition,message)=>{if(!condition)throw Error(message)};
 const until=async predicate=>{const end=Date.now()+6000;while(!predicate()){if(Date.now()>end)throw Error('Mobile UI timed out');await new Promise(r=>setTimeout(r,50))}};
 const course=await(await fetch('/api/catalog')).json();
 for(const lecture of course.lectures){
  location.hash='#notes/'+lecture.id+'/slide-2';await until(()=>document.querySelector('#eyebrow').textContent==='Lecture 0'+lecture.id+' / Original notes'&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(document.documentElement.scrollWidth<=innerWidth,'Mobile source overflow '+lecture.id);
 }
 for(const lesson of course.lessons.filter(item=>item.lecture>=6)){
  location.hash='#lesson/'+lesson.id;await until(()=>document.querySelector('#page-title').textContent===lesson.title&&!document.querySelector('#main-content').hasAttribute('aria-busy'));
  assert(document.documentElement.scrollWidth<=innerWidth,'Mobile lesson overflow '+lesson.id);
 }
 return {mobileWidth:innerWidth,sourcePages:course.lectures.length,newLessons:33,overflow:false};
})()`));
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
