/* =====================================================
   HAPPY BIRTHDAY ROSSA MEPARINDA
   FINAL SCRIPT.JS
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loading = document.getElementById("loading");
const loadingProgress = document.getElementById("loadingProgress");

const app = document.getElementById("app");

const opening = document.getElementById("opening");
const greeting = document.getElementById("greeting");
const story = document.getElementById("story");
const virtual = document.getElementById("virtual");
const gallery = document.getElementById("gallery");
const message = document.getElementById("message");
const finalScreen = document.getElementById("final");

const openButton = document.getElementById("openButton");
const greetingNext = document.getElementById("greetingNext");
const storyNext = document.getElementById("storyNext");
const virtualNext = document.getElementById("virtualNext");
const galleryNext = document.getElementById("galleryNext");
const messageNext = document.getElementById("messageNext");
const restartButton = document.getElementById("restartButton");

const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

const stars = document.getElementById("stars");
const particles = document.getElementById("particles");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

const confettiCanvas = document.getElementById("confettiCanvas");


/* =====================================================
   SCREEN SYSTEM
===================================================== */

const allScreens = [
    opening,
    greeting,
    story,
    virtual,
    gallery,
    message,
    finalScreen
];


function showScreen(target) {

    allScreens.forEach(screen => {

        if (!screen) return;

        screen.classList.add("hidden");
        screen.classList.remove("active");

    });


    if (!target) return;


    target.classList.remove("hidden");
    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   LOADING
===================================================== */

let progress = 0;

const loadingInterval = setInterval(() => {

    progress += Math.random() * 8;

    if (progress >= 100) {

        progress = 100;

        clearInterval(loadingInterval);

    }


    if (loadingProgress) {

        loadingProgress.style.width =
            progress + "%";

    }


    if (progress >= 100) {

        setTimeout(() => {

            if (loading) {
                loading.classList.add("hidden");
            }

            if (app) {
                app.classList.remove("hidden");
            }

        }, 500);

    }

}, 100);


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;


function updateMusicButton() {

    if (!musicButton) return;

    musicButton.textContent =
        musicPlaying ? "🔊" : "🎵";

}


function playMusic() {

    if (!bgMusic) return;


    bgMusic.volume = 0.45;


    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch(() => {

            musicPlaying = false;

            updateMusicButton();

        });

}


function pauseMusic() {

    if (!bgMusic) return;


    bgMusic.pause();

    musicPlaying = false;

    updateMusicButton();

}


if (musicButton) {

    musicButton.addEventListener(
        "click",
        () => {

            if (musicPlaying) {

                pauseMusic();

            } else {

                playMusic();

            }

        }
    );

}


/* =====================================================
   OPEN BUTTON
===================================================== */

if (openButton) {

    openButton.addEventListener(
        "click",
        () => {

            showScreen(greeting);

            playMusic();

        }
    );

}


/* =====================================================
   NAVIGATION
===================================================== */

if (greetingNext) {

    greetingNext.addEventListener(
        "click",
        () => {

            showScreen(story);

        }
    );

}


if (storyNext) {

    storyNext.addEventListener(
        "click",
        () => {

            showScreen(virtual);

        }
    );

}


if (virtualNext) {

    virtualNext.addEventListener(
        "click",
        () => {

            showScreen(gallery);

        }
    );

}


if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        () => {

            showScreen(message);

        }
    );

}


/* =====================================================
   MESSAGE → FINAL
===================================================== */

if (messageNext) {

    messageNext.addEventListener(
        "click",
        () => {

            showScreen(finalScreen);

            startConfetti();

        }
    );

}


/* =====================================================
   RESTART
===================================================== */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            stopConfetti();

            showScreen(opening);

        }
    );

}


/* =====================================================
   STARS
===================================================== */

function createStars() {

    if (!stars) return;


    stars.innerHTML = "";


    const amount =
        window.innerWidth < 600
            ? 70
            : 120;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement("span");


        star.className = "star";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        star.style.animationDelay =
            Math.random() * 4 + "s";


        star.style.animationDuration =
            Math.random() * 3 + 2 + "s";


        const size =
            Math.random() * 2 + 1;


        star.style.width =
            size + "px";


        star.style.height =
            size + "px";


        stars.appendChild(star);

    }

}


createStars();


/* =====================================================
   FLOATING PARTICLES
===================================================== */

const particleSymbols = [
    "🤍",
    "✨",
    "🌸",
    "💜",
    "🎀",
    "⭐"
];


function createParticle() {

    if (!particles) return;


    const particle =
        document.createElement("span");


    particle.className =
        "particle";


    particle.textContent =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.fontSize =
        Math.random() * 12 + 12 + "px";


    const duration =
        Math.random() * 7 + 7;


    particle.style.animationDuration =
        duration + "s";


    particles.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, duration * 1000);

}


setInterval(
    createParticle,
    900
);


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


galleryItems.forEach(item => {

    const image =
        item.querySelector("img");


    if (!image) return;


    item.addEventListener(
        "click",
        () => {

            if (!lightbox) return;
            if (!lightboxImage) return;


            lightboxImage.src =
                image.src;


            lightbox.classList.remove(
                "hidden"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


function closeGallery() {

    if (!lightbox) return;


    lightbox.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeGallery
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeGallery();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeGallery();

        }

    }
);


/* =====================================================
   CONFETTI
===================================================== */

let confettiContext = null;

let confettiAnimation = null;

let confettiPieces = [];


if (confettiCanvas) {

    confettiContext =
        confettiCanvas.getContext("2d");

}


function resizeConfetti() {

    if (!confettiCanvas) return;


    confettiCanvas.width =
        window.innerWidth;


    confettiCanvas.height =
        window.innerHeight;

}


resizeConfetti();


window.addEventListener(
    "resize",
    () => {

        resizeConfetti();

        createStars();

    }
);


/* =====================================================
   CREATE CONFETTI
===================================================== */

function createConfetti() {

    if (!confettiCanvas) return;


    confettiPieces = [];


    const amount =
        window.innerWidth < 600
            ? 80
            : 150;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        confettiPieces.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                -Math.random() *
                window.innerHeight,

            size:
                Math.random() * 7 + 4,

            speed:
                Math.random() * 3 + 2,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 6 - 3

        });

    }

}


/* =====================================================
   DRAW CONFETTI
===================================================== */

function drawConfetti() {

    if (
        !confettiCanvas ||
        !confettiContext
    ) {
        return;
    }


    confettiContext.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );


    confettiPieces.forEach(piece => {

        confettiContext.save();


        confettiContext.translate(
            piece.x,
            piece.y
        );


        confettiContext.rotate(
            piece.rotation *
            Math.PI /
            180
        );


        confettiContext.fillStyle =
            [
                "#f9a8d4",
                "#c4b5fd",
                "#ffffff",
                "#f472b6",
                "#a78bfa"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];


        confettiContext.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size * 1.8
        );


        confettiContext.restore();


        piece.y += piece.speed;

        piece.rotation +=
            piece.rotationSpeed;


        if (
            piece.y >
            window.innerHeight + 30
        ) {

            piece.y = -20;

            piece.x =
                Math.random() *
                window.innerWidth;

        }

    });


    confettiAnimation =
        requestAnimationFrame(
            drawConfetti
        );

}


/* =====================================================
   START CONFETTI
===================================================== */

function startConfetti() {

    if (
        !confettiCanvas ||
        !confettiContext
    ) {
        return;
    }


    stopConfetti();


    resizeConfetti();

    createConfetti();

    drawConfetti();


    setTimeout(() => {

        stopConfetti();

    }, 8000);

}


/* =====================================================
   STOP CONFETTI
===================================================== */

function stopConfetti() {

    if (confettiAnimation) {

        cancelAnimationFrame(
            confettiAnimation
        );

        confettiAnimation = null;

    }


    if (
        confettiCanvas &&
        confettiContext
    ) {

        confettiContext.clearRect(
            0,
            0,
            confettiCanvas.width,
            confettiCanvas.height
        );

    }

}


/* =====================================================
   IMAGE DRAG PREVENTION
===================================================== */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    });
