const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const pages=$$('.page'),dots=$('#pageDots'),prev=$('#prevPage'),next=$('#nextPage'),music=$('#music'),musicBtn=$('#musicBtn'),musicState=$('#musicState');
let current=0, audioStarted=false, musicWanted=true;

/* ---------- loading + music ---------- */
const prelude=$('#prelude'),bar=$('#loOcharBar'),loOcharText=$('#loOcharText');
const loadWords=['memuat kenangan...','menyalakan lampu kecil...','menyiapkan foto...','menulis pesan...','hampir selesai...'];
function tryStartMusic(){
  if(!musicWanted||audioStarted)return;
  const p=music.play();
  if(p&&p.then)p.then(()=>{audioStarted=true;musicBtn.textContent='♫';musicState.textContent='sound on'}).catch(()=>{});
}
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,tryStartMusic,{passive:true}));
function finishPrelude(){
  tryStartMusic();
  $('#app').classList.remove('is-hidden');
  prelude.classList.add('done');
  setTimeout(()=>prelude.remove(),1100);
}
let progress=0;
const loadTimer=setInterval(()=>{
  progress=Math.min(100,progress+Math.random()*9+3);
  bar.style.width=progress+'%';
  loOcharText.textContent=loadWords[Math.min(loadWords.length-1,Math.floor(progress/21))];
  if(progress>=100){clearInterval(loadTimer);setTimeout(finishPrelude,650)}
},90);
$('#preludeHeart').addEventListener('click',()=>{tryStartMusic();bar.style.width='100%';setTimeout(finishPrelude,200)});

/* ---------- page navigation ---------- */
for(let i=0;i<pages.length;i++){const d=document.createElement('i');d.addEventListener('click',()=>go(i));dots.appendChild(d)}
function updateDots(){
  $$('.page-dots i').forEach((d,i)=>d.classList.toggle('active',i===current));
  prev.disabled=current===0;next.disabled=current===pages.length-1;
}
function go(index,dir=1){
  if(index<0||index>=pages.length||index===current)return;
  const old=pages[current],target=pages[index];
  old.classList.remove('active');
  target.classList.add('active');
  current=index;updateDots();
  window.scrollTo({top:0,behavior:'smooth'});
  animatePage(target,dir);
  if(current===6)spawnBalloons();
}
function animatePage(page,dir){
  const els=$$('.reveal',page);els.forEach((el,i)=>{el.style.animation='none';void el.offsetWidth;el.style.animation='';el.style.animationDelay=(i*.08)+'s'});
}
$$('[data-next]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.next),1)));
prev.addEventListener('click',()=>go(current-1,-1));next.addEventListener('click',()=>go(current+1,1));
updateDots();

/* ---------- music UI ---------- */
musicBtn.addEventListener('click',e=>{e.stopPropagation();if(music.paused){musicWanted=true;tryStartMusic()}else{music.pause();musicWanted=false;audioStarted=false;musicBtn.textContent='♪';musicState.textContent='muted'}});

/* ---------- sliders on every photo page ---------- */
$$('[data-slider]').forEach(slider=>{
  const slides=$$('.slide',slider), dotsBox=$('.slider-dots',slider);let idx=0,timer;let startX=0;
  slides.forEach((_,i)=>{const d=document.createElement('i');if(i===0)d.classList.add('active');dotsBox.appendChild(d);d.addEventListener('click',e=>{e.stopPropagation();show(i)})});
  const dotEls=$$('i',dotsBox);
  function show(n){idx=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===idx));dotEls.forEach((d,i)=>d.classList.toggle('active',i===idx));$('.photo-caption span',slider).textContent=String(idx+1).padStart(2,'0')}
  function auto(){clearInterval(timer);timer=setInterval(()=>show(idx+1),4200)}
  slider.addEventListener('pointerdown',e=>{startX=e.clientX;slider.setPointerCapture?.(e.pointerId)});
  slider.addEventListener('pointerup',e=>{const dx=e.clientX-startX;if(Math.abs(dx)>45)show(idx+(dx<0?1:-1));auto()});
  slider.addEventListener('mouseenter',()=>clearInterval(timer));slider.addEventListener('mouseleave',auto);auto();
});

/* ---------- gallery lightbox ---------- */
const lightbox=$('#lightbox'),lightboxImg=$('#lightboxImg');
$$('.gallery-tile').forEach(tile=>tile.addEventListener('click',()=>{lightboxImg.src=$('img',tile).src;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src=''}
$('#lightboxClose').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

/* ---------- little interactions ---------- */
const toast=$('#toast');let toastTimer;
$$('[data-toast]').forEach(b=>b.addEventListener('click',()=>{toast.textContent=b.dataset.toast;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}));
function spawnHeart(x,y){const h=document.createElement('span');h.textContent=['♡','✦','♥','✧'][Math.floor(Math.random()*4)];h.className='click-heart';h.style.left=x+'px';h.style.top=y+'px';document.body.appendChild(h);setTimeout(()=>h.remove(),1100)}
document.addEventListener('click',e=>{if(e.target.closest('button'))return;spawnHeart(e.clientX,e.clientY)});

/* ---------- letter ---------- */
const letterPages=[
  'Ocha... abang mungkin bukan abang yang selalu bisa ada setiap saat. Kita juga cuma bertemu lewat dunia online. Tapi abang benar-benar bersyukur pernah dipertemukan dengan Ocha. 🤍',
  'Semoga bertambahnya umur Ocha bukan cuma sekadar angka. Semoga Ocha semakin kuat, semakin dewasa, semakin bahagia, dan semakin dekat dengan semua impian Ocha. 🌷',
  'Kalau suatu hari nanti kita sudah jarang bermain, jarang ngobrol, atau sibuk dengan kehidupan masing-masing... semoga Ocha tetap ingat kalau pernah ada seseorang di dunia virtual yang menganggap Ocha sebagai Ocha online-nya. Terima kasih sudah menjadi bagian dari cerita kecil ini. 🤍'
];
let letterIndex=0;
function renderLetter(){
  const box=$('#letterText'),text=letterPages[letterIndex];box.innerHTML='';text.split(/(?<=\.|🤍|🌷)\s+/).forEach((line,i)=>{const span=document.createElement('span');span.className='line';span.textContent=line+' ';span.style.animationDelay=i*.1+'s';box.appendChild(span)});
  $('#letterCounter').textContent=String(letterIndex+1).padStart(2,'0')+' / 03';$('#letterProgress').style.width=((letterIndex+1)/3*100)+'%';$('#letterBack').disabled=letterIndex===0;$('#letterNext').textContent=letterIndex===2?'Lihat akhir ✨':'→';
}
$('#letterNext').addEventListener('click',()=>{if(letterIndex<2){letterIndex++;renderLetter()}else go(6)});
$('#letterBack').addEventListener('click',()=>{if(letterIndex>0){letterIndex--;renderLetter()}});renderLetter();

/* ---------- final balloons ---------- */
let balloonsMOcha=false;
function spawnBalloons(){
  if(balloonsMOcha)return;balloonsMOcha=true;const field=$('#balloons');
  for(let i=0;i<24;i++){const b=document.createElement('span');b.className='balloon';b.style.left=Math.random()*100+'%';b.style.setProperty('--size',(38+Math.random()*35)+'px');b.style.setProperty('--hue',Math.floor(Math.random()*360));b.style.setProperty('--duration',(8+Math.random()*7)+'s');b.style.setProperty('--delay',(Math.random()*5)+'s');b.style.setProperty('--drift',(-70+Math.random()*140)+'px');field.appendChild(b)}
}
$('#wishBtn').addEventListener('click',()=>{
  const result=$('#wishResult');result.textContent='✨ Harapan baik sudah dikirim ke langit. Sekarang... senyum dulu. ✨';
  for(let i=0;i<9;i++)setTimeout(()=>spawnHeart(window.innerWidth/2+(Math.random()-.5)*260,window.innerHeight*.58),i*100);
});
$('#restartBtn').addEventListener('click',()=>{letterIndex=0;renderLetter();current=0;pages.forEach((p,i)=>p.classList.toggle('active',i===0));updateDots();window.scrollTo({top:0,behavior:'smooth'});$('#wishResult').textContent='';});

/* ---------- keyboard / wheel ---------- */
document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight')go(current+1,1);if(e.key==='ArrowLeft')go(current-1,-1)});
let wheelLock=false;window.addEventListener('wheel',e=>{if(wheelLock||Math.abs(e.deltaY)<35)return;wheelLock=true;go(current+(e.deltaY>0?1:-1),e.deltaY>0?1:-1);setTimeout(()=>wheelLock=false,850)},{passive:true});

/* click the prelude heart also counts as the first user gesture for audio */





/* =====================================================
   MOBILE-FIRST EXPERIENCE CONTROLLER
===================================================== */

(function initMobileExperience() {

    const music =
        document.getElementById("backgroundMusic");

    const intro =
        document.getElementById("introLoader");

    const introStatus =
        document.getElementById("introStatus");

    let musicStarted = false;

    function startMusic() {

        if (!music || musicStarted) return;

        music.preload = "auto";
        music.loop = true;

        const p = music.play();

        if (p && typeof p.then === "function") {

            p.then(() => {

                musicStarted = true;

            }).catch(() => {

                /* Browser autoplay policy; unlock on first tap. */

            });

        }

    }

    const unlock = () => {

        startMusic();

        if (musicStarted) {

            document.removeEventListener("pointerdown", unlock);

        }

    };

    document.addEventListener(
        "pointerdown",
        unlock,
        { passive: true }
    );

    const statuses = [
        "Menyiapkan cerita...",
        "Mengingat awal kenal...",
        "Reality → Discord → Roblox...",
        "Hampir mulai..."
    ];

    if (introStatus) {

        statuses.forEach((text, i) => {

            window.setTimeout(
                () => {

                    if (introStatus) {
                        introStatus.textContent = text;
                    }

                },
                i * 520
            );

        });

    }

    /*
     * Musik dimulai setelah intro selesai.
     * Jika browser mengizinkan autoplay, ini langsung berbunyi.
     * Jika tidak, tap pertama akan mengaktifkannya.
     */
    window.setTimeout(() => {

        startMusic();

        if (intro) {

            intro.classList.add("is-hidden");

            window.setTimeout(
                () => intro.remove(),
                900
            );

        }

    }, 2300);

    /*
     * Scroll/wheel tidak digunakan sebagai navigasi.
     * Cegah browser menggeser halaman.
     */
    window.addEventListener(
        "wheel",
        event => event.preventDefault(),
        { passive: false }
    );

    window.addEventListener(
        "touchmove",
        event => {

            /*
             * Jangan izinkan gesture scroll vertikal.
             * Swipe horizontal tetap ditangani oleh app jika ada.
             */
            if (Math.abs(event.touches[0]?.clientY || 0) > 0) {
                event.preventDefault();
            }

        },
        { passive: false }
    );

})();


(function initJourneyCards() {

    const cards =
        document.querySelectorAll(".journey-card");

    const texts = {

        reality:
            "Di Reality semuanya bermula. Cuma awalnya belum tahu bakal lanjut sejauh ini wkwk.",

        discord:
            "Dari Reality lanjut ke Discord. Tempat obrolan random mulai bertambah.",

        roblox:
            "Sampai akhirnya Roblox. Dari sini cerita mabar jadi makin banyak."

    };

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const key =
                card.dataset.story;

            const message =
                texts[key];

            if (!message) return;

            const old =
                document.querySelector(".journey-pop");

            if (old) old.remove();

            const pop =
                document.createElement("div");

            pop.className = "journey-pop";

            pop.innerHTML =
                `<b>${key.toUpperCase()}</b><span>${message}</span>`;

            document.body.appendChild(pop);

            requestAnimationFrame(
                () => pop.classList.add("show")
            );

            window.setTimeout(() => {

                pop.classList.remove("show");

                window.setTimeout(
                    () => pop.remove(),
                    300
                );

            }, 2400);

        });

    });

})();
