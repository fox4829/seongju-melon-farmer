'use strict';
const $ = id => document.getElementById(id);
const stages = [
  {name:'시설·토양 준비',from:-999,to:-1,desc:'토양검정 결과 확인, 시설·관수장치 점검, 이전 작기 병해충 이력 정리'},
  {name:'정식·활착 점검',from:0,to:14,desc:'활착 상태, 온습도, 토양 수분 및 잎 상태를 관찰하고 기록'},
  {name:'초기 생육 관리',from:15,to:34,desc:'줄기·잎 생육상태와 하우스 통풍·결로를 점검'},
  {name:'착과·과실 생육 점검',from:35,to:64,desc:'수정·착과 기록, 과실 상태, 생리장해·병해충 발생 여부를 관찰'},
  {name:'수확 및 이후 관리',from:65,to:99999,desc:'실제 수확 적기와 품질을 확인하고 출하·작업 내역을 기록'}
];
// 단계별 일수는 앱 기능을 보여주는 예시 구간이며, 농업기술 지도 기준이나 방제 시기를 뜻하지 않습니다.
const STORE_DATE='melon_plant_date_v1', STORE_MEMO='melon_memo_v1';
function localToday(){const d=new Date();return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function parseDate(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return null;const [y,m,d]=s.split('-').map(Number);const x=new Date(y,m-1,d);return x.getFullYear()===y&&x.getMonth()===m-1&&x.getDate()===d?x:null;}
function diffDays(a,b){return Math.round((Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())-Date.UTC(b.getFullYear(),b.getMonth(),b.getDate()))/86400000);}
function render(){const saved=localStorage.getItem(STORE_DATE)||'';const planted=parseDate(saved);$('plantDate').value=planted?saved:'';const days=planted?diffDays(localToday(),planted):null;
  $('heroTitle').textContent=planted?(days>=0?`정식 후 ${days}일째`:`정식 예정일까지 ${-days}일`):'정식일을 등록해 주세요';
  $('heroText').textContent=planted?'재배 일정은 참고용입니다. 실제 생육과 농업기술 지도를 우선하세요.':'정식일을 저장하면 경과일과 재배 일정 참고정보를 확인할 수 있습니다.';
  $('savedInfo').textContent=planted?`저장된 정식일: ${saved}`:'정식일이 아직 저장되지 않았습니다.';
  const list=$('stageList');list.replaceChildren();stages.forEach((s,i)=>{const active=days!==null&&days>=s.from&&days<=s.to;const item=document.createElement('article');item.className='stage'+(active?' current':'');const title=document.createElement('b');title.textContent=`${i+1}. ${s.name}${active?' · 현재 참고 단계':''}`;const info=document.createElement('small');info.textContent=i===0?'정식 전 준비':i===4?'정식 후 65일 이후 (예시)':'정식 후 '+s.from+'~'+s.to+'일 (예시)';const p=document.createElement('p');p.textContent=s.desc;item.append(title,info,p);list.append(item);});
  $('memo').value=localStorage.getItem(STORE_MEMO)||'';
}
function go(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));window.scrollTo({top:0,behavior:'instant'});}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
$('saveDate').addEventListener('click',()=>{const v=$('plantDate').value;if(!parseDate(v)){$('savedInfo').textContent='올바른 정식일을 선택해 주세요.';return;}try{localStorage.setItem(STORE_DATE,v);render();}catch(e){$('savedInfo').textContent='저장할 수 없습니다. 브라우저 저장공간 설정을 확인하세요.';}});
$('saveMemo').addEventListener('click',()=>{try{localStorage.setItem(STORE_MEMO,$('memo').value);$('memoStatus').textContent='이 기기에 메모를 저장했습니다.';}catch(e){$('memoStatus').textContent='메모 저장에 실패했습니다.';}});
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('installBtn').hidden=false;});$('installBtn').addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('installBtn').hidden=true;});window.addEventListener('appinstalled',()=>{$('installBtn').hidden=true;});
if('serviceWorker'in navigator && (location.protocol==='https:'||location.hostname==='localhost'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
