const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];

const music=$("#music");
const loader=$("#loader");
const loadText=$("#loadText");
const musicBtn=$("#musicBtn");

let musicUnlocked=false;
let musicPlaying=false;

function startMusic(){
  if(!music || musicPlaying) return;
  music.volume=.55;
  const p=music.play();
  if(p && p.then){
    p.then(()=>{musicPlaying=true;musicUnlocked=true;musicBtn.textContent="♫";})
     .catch(()=>{musicUnlocked=false;});
  }
}

["Menyiapkan cerita...","Mengingat awal kenal...","Reality → Discord → Roblox...","Sebentar lagi..."].forEach((t,i)=>{
  setTimeout(()=>{if(loadText)loadText.textContent=t},i*500);
});

setTimeout(()=>{
  startMusic();
  loader.classList.add("hide");
},2400);

document.addEventListener("pointerdown",()=>{
  if(!musicPlaying) startMusic();
},{once:false,passive:true});

musicBtn.addEventListener("click",()=>{
  if(music.paused){
    music.play().then(()=>{musicPlaying=true;musicBtn.textContent="♫";});
  }else{
    music.pause();musicPlaying=false;musicBtn.textContent="◼";
  }
});

function toast(msg){
  const el=$("#toast");
  el.textContent=msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t=setTimeout(()=>el.classList.remove("show"),2300);
}

function spark(x,y,char="✦"){
  const s=document.createElement("span");
  s.className="spark";s.textContent=char;
  s.style.left=x+"px";s.style.top=y+"px";
  document.body.appendChild(s);
  setTimeout(()=>s.remove(),900);
}

document.addEventListener("click",e=>{
  if(e.target.closest("button")){
    for(let i=0;i<3;i++)setTimeout(()=>spark(e.clientX+(Math.random()*20-10),e.clientY+(Math.random()*20-10),i%2?"✦":"♡"),i*45);
  }
});

$$(".next-btn").forEach(b=>b.addEventListener("click",()=>{
  document.querySelector(".chapter").scrollIntoView({behavior:"smooth"});
}));

$$(".interaction-card").forEach(card=>{
  card.addEventListener("click",()=>toast(card.dataset.message));
});

const slider=$("[data-slider]");
const slides=$$(".slide",slider);
const dots=$(".dots",slider);
let current=0;

slides.forEach((_,i)=>{
  const d=document.createElement("button");
  d.className="dot"+(i===0?" active":"");
  d.setAttribute("aria-label","Foto "+(i+1));
  d.addEventListener("click",()=>showSlide(i));
  dots.appendChild(d);
});
const dotEls=$$(".dot",dots);

function showSlide(i){
  current=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle("active",n===current));
  dotEls.forEach((d,n)=>d.classList.toggle("active",n===current));
}
$(".prev",slider).addEventListener("click",()=>showSlide(current-1));
$(".next",slider).addEventListener("click",()=>showSlide(current+1));

let swipeStartX=0;
let swipeStartY=0;
let swipeActive=false;

slider.addEventListener("pointerdown",e=>{
  swipeStartX=e.clientX;
  swipeStartY=e.clientY;
  swipeActive=true;
  slider.setPointerCapture?.(e.pointerId);
});
slider.addEventListener("pointerup",e=>{
  if(!swipeActive) return;
  swipeActive=false;
  const deltaX=e.clientX-swipeStartX;
  const deltaY=e.clientY-swipeStartY;
  if(Math.abs(deltaX)>45 && Math.abs(deltaX)>Math.abs(deltaY)){
    showSlide(current+(deltaX<0?1:-1));
  }
});
slider.addEventListener("pointercancel",()=>{swipeActive=false});

/* Auto slideshow is deliberately paused while the user is interacting with it.
   It resumes gently after 4 seconds. */
let autoTimer=setInterval(()=>showSlide(current+1),5200);
slider.addEventListener("mouseenter",()=>clearInterval(autoTimer));
slider.addEventListener("mouseleave",()=>{clearInterval(autoTimer);autoTimer=setInterval(()=>showSlide(current+1),5200)});

$("#wishBtn").addEventListener("click",()=>{
  toast("Wish sent! Semoga yang baik-baik datang satu-satu ✨");
  for(let i=0;i<18;i++){
    setTimeout(()=>{
      const x=window.innerWidth/2+(Math.random()-.5)*window.innerWidth*.75;
      const y=window.innerHeight*.55+(Math.random()-.5)*120;
      spark(x,y,i%3?"✦":"♡");
    },i*45);
  }
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      $$(".reveal",entry.target).forEach((el,i)=>setTimeout(()=>el.classList.add("visible"),i*70));
    }
  });
},{threshold:.12});
$$(".section").forEach(s=>observer.observe(s));

