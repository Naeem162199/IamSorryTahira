const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const progressBar=$('#progressBar');
function progress(){const h=document.documentElement.scrollHeight-innerHeight;progressBar.style.width=(h>0?(scrollY/h)*100:0)+'%'}
addEventListener('scroll',progress,{passive:true});progress();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(e=>observer.observe(e));
const split=$('#splitScene'),left=$('.person-left'),right=$('.person-right'),msg=$('#phaseMessage');
const msgs=['I went quiet<br>when I should have stayed.','My ego spoke<br>louder than my heart.','I needed to understand<br>what I was doing.','I started seeing<br>what really mattered.','And I began moving<br>closer again.'];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function splitUpdate(){if(!split)return;const r=split.getBoundingClientRect(),center=r.top+r.height/2,d= (center-innerHeight/2)/(innerHeight*.75),p=clamp(1-Math.abs(d),0,1),travel=38*(1-p);left.style.transform=`translateX(${-travel*1.15}px)`;right.style.transform=`translateX(${travel*1.15}px)`;const i=Math.min(msgs.length-1,Math.floor(p*msgs.length));if(msg.dataset.i!==String(i)){msg.dataset.i=i;msg.innerHTML=msgs[i]}}}
addEventListener('scroll',splitUpdate,{passive:true});addEventListener('resize',splitUpdate);splitUpdate();
$$('.letter-card').forEach(card=>card.addEventListener('toggle',()=>{if(card.open)$$('.letter-card').forEach(x=>{if(x!==card)x.open=false})}));
const area=$('#choiceArea'),no=$('#noBtn'),yes=$('#yesBtn'),call=$('#callReveal');
function moveNo(){const ar=area.getBoundingClientRect(),b=no.getBoundingClientRect(),mx=Math.max(8,ar.width-b.width-8),my=Math.max(8,ar.height-b.height-8);no.style.position='absolute';no.style.left=(8+Math.random()*Math.max(8,mx-16))+'px';no.style.top=(8+Math.random()*Math.max(8,my-16))+'px'}
['mouseenter','pointerdown','touchstart'].forEach(evt=>no.addEventListener(evt,e=>{e.preventDefault();moveNo()},{passive:false}));no.addEventListener('click',e=>{e.preventDefault();moveNo()});yes.addEventListener('click',()=>call.classList.add('show'));
addEventListener('load',()=>setTimeout(()=>$$('.hero .reveal').forEach((e,i)=>setTimeout(()=>e.classList.add('in-view'),160*i)),100));
