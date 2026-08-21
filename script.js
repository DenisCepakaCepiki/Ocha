/* =====================================================
   HAPPY BIRTHDAY ROSSA MEPARINDA
   SCRIPT.JS
   Part 1 — Core Navigation & Loading
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loading =
    document.getElementById("loading");

const loadingProgress =
    document.getElementById("loadingProgress");

const app =
    document.getElementById("app");

const screens = {

    opening:
        document.getElementById("opening"),

    greeting:
        document.getElementById("greeting"),

    story:
        document.getElementById("story"),

    virtual:
        document.getElementById("virtual"),

    gallery:
        document.getElementById("gallery"),

    message:
        document.getElementById("message"),

    final:
        document.getElementById("final")

};


/* =====================================================
   BUTTONS
===================================================== */

const openButton =
    document.getElementById("openButton");

const greetingNext =
    document.getElementById("greetingNext");

const storyNext =
    document.getElementById("storyNext");

const virtualNext =
    document.getElementById("virtualNext");

const galleryNext =
    document.getElementById("galleryNext");

const messageNext =
    document.getElementById("messageNext");

const restartButton =
    document.getElementById("restartButton");


/* =====================================================
   CURRENT SCREEN
===================================================== */

let currentScreen = "opening";


/* =====================================================
   SHOW SCREEN
===================================================== */

function showScreen(screenName) {

    const target =
        screens[screenName];

    if (!target) return;


    /* Hide semua screen */

    Object.values(screens).forEach(
        screen => {

            screen.classList.add("hidden");

            screen.classList.remove("active");

        }
    );


    /* Tampilkan screen tujuan */

    target.classList.remove("hidden");

    target.classList.add("active");


    currentScreen =
        screenName;


    /* Scroll ke atas */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   LOADING SYSTEM
===================================================== */

let loadingValue = 0;


const loadingInterval =
    setInterval(() => {

        loadingValue +=
            Math.random() * 8;


        if (loadingValue >= 100) {

            loadingValue = 100;

        }


        loadingProgress.style.width =
            loadingValue + "%";


        if (loadingValue >= 100) {

            clearInterval(
                loadingInterval
            );


            setTimeout(() => {

                loading.classList.add(
                    "hidden"
                );

                app.classList.remove(
                    "hidden"
                );

            }, 500);

        }

    }, 120);


/* =====================================================
   OPEN WEBSITE
===================================================== */

openButton.addEventListener(
    "click",
    () => {

        showScreen("greeting");

    }
);


/* =====================================================
   GREETING → STORY
===================================================== */

greetingNext.addEventListener(
    "click",
    () => {

        showScreen("story");

    }
);


/* =====================================================
   STORY → VIRTUAL
===================================================== */

storyNext.addEventListener(
    "click",
    () => {

        showScreen("virtual");

    }
);


/* =====================================================
   VIRTUAL → GALLERY
===================================================== */

virtualNext.addEventListener(
    "click",
    () => {

        showScreen("gallery");

    }
);


/* =====================================================
   GALLERY → MESSAGE
===================================================== */

galleryNext.addEventListener(
    "click",
    () => {

        showScreen("message");

    }
);


/* =====================================================
   MESSAGE → FINAL
===================================================== */

messageNext.addEventListener(
    "click",
    () => {

        showScreen("final");

        startConfetti();

    }
);


/* =====================================================
   RESTART
===================================================== */

restartButton.addEventListener(
    "click",
    () => {

        showScreen("opening");

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);
/* =====================================================
   HAPPY BIRTHDAY ROSSA MEPARINDA
   SCRIPT.JS
   Part 2 — Music, Stars & Floating Particles
===================================================== */


/* =====================================================
   MUSIC
===================================================== */

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


let musicPlaying = false;


/* =====================================================
   PLAY MUSIC
===================================================== */

function playMusic() {

    if (!bgMusic) return;


    bgMusic.volume = 0.45;


    const playPromise =
        bgMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            })
            .catch(() => {

                musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* =====================================================
   PAUSE MUSIC
===================================================== */

function pauseMusic() {

    if (!bgMusic) return;


    bgMusic.pause();

    musicPlaying = false;

    updateMusicButton();

}


/* =====================================================
   MUSIC BUTTON
===================================================== */

function updateMusicButton() {

    if (!musicButton) return;


    musicButton.textContent =
        musicPlaying
            ? "🔊"
            : "🎵";

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
   START MUSIC AFTER USER INTERACTION
===================================================== */

if (openButton) {

    openButton.addEventListener(
        "click",
        () => {

            playMusic();

        }
    );

}


/* =====================================================
   CREATE STARS
===================================================== */

const starsContainer =
    document.getElementById("stars");


function createStars() {

    if (!starsContainer) return;


    starsContainer.innerHTML = "";


    const starCount =
        window.innerWidth < 600
            ? 70
            : 120;


    for (
        let i = 0;
        i < starCount;
        i++
    ) {

        const star =
            document.createElement("span");


        star.className =
            "star";


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


        starsContainer.appendChild(
            star
        );

    }

}


/* =====================================================
   CREATE FLOATING PARTICLE
===================================================== */

const particlesContainer =
    document.getElementById("particles");


const particleSymbols = [

    "🤍",
    "✨",
    "🌸",
    "💜",
    "🎀",
    "⭐"

];


function createParticle() {

    if (!particlesContainer) return;


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


    particlesContainer.appendChild(
        particle
    );


    setTimeout(
        () => {

            particle.remove();

        },
        duration * 1000
    );

}


/* =====================================================
   PARTICLE LOOP
===================================================== */

function startParticles() {

    setInterval(
        () => {

            createParticle();

        },
        900
    );

}


/* =====================================================
   INITIALIZE BACKGROUND
===================================================== */

createStars();

startParticles();


/* =====================================================
   RECREATE STARS WHEN RESIZING
===================================================== */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    createStars();

                },
                300
            );

    }
);
/* =====================================================
   HAPPY BIRTHDAY ROSSA MEPARINDA
   SCRIPT.JS
   Part 3 — Gallery Lightbox
===================================================== */


/* =====================================================
   GALLERY ELEMENTS
===================================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(imageSource) {

    if (!lightbox) return;

    if (!lightboxImage) return;


    lightboxImage.src =
        imageSource;


    lightbox.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightboxWindow() {

    if (!lightbox) return;


    lightbox.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   GALLERY CLICK
===================================================== */

galleryItems.forEach(
    item => {

        const image =
            item.querySelector(
                "img"
            );


        if (!image) return;


        item.addEventListener(
            "click",
            () => {

                openLightbox(
                    image.src
                );

            }
        );

    }
);


/* =====================================================
   CLOSE BUTTON
===================================================== */

if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        () => {

            closeLightboxWindow();

        }
    );

}


/* =====================================================
   CLICK OUTSIDE IMAGE
===================================================== */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightboxWindow();

            }

        }
    );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (
                lightbox &&
                !lightbox.classList.contains(
                    "hidden"
                )
            ) {

                closeLightboxWindow();

            }

        }

    }
);


/* =====================================================
   PREVENT IMAGE DRAG
===================================================== */

document
    .querySelectorAll(
        "img"
    )
    .forEach(
        image => {

            image.addEventListener(
                "dragstart",
                event => {

                    event.preventDefault();

                }
            );

        }
    );
/* =====================================================
   HAPPY BIRTHDAY ROSSA MEPARINDA
   SCRIPT.JS
   Part 4 — Confetti, Final Effects & Initialization
===================================================== */


/* =====================================================
   CONFETTI CANVAS
===================================================== */

const confettiCanvas =
    document.getElementById(
        "confettiCanvas"
    );


const confettiContext =
    confettiCanvas
        ? confettiCanvas.getContext("2d")
        : null;


let confettiPieces = [];

let confettiAnimation;


/* =====================================================
   RESIZE CANVAS
===================================================== */

function resizeConfettiCanvas() {

    if (!confettiCanvas) return;


    confettiCanvas.width =
        window.innerWidth;


    confettiCanvas.height =
        window.innerHeight;

}


resizeConfettiCanvas();


window.addEventListener(
    "resize",
    resizeConfettiCanvas
);


/* =====================================================
   CREATE CONFETTI
===================================================== */

function createConfetti() {

    confettiPieces = [];


    const amount =
        window.innerWidth < 600
            ? 100
            : 180;


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

            width:
                Math.random() * 8 + 4,

            height:
                Math.random() * 12 + 6,

            speed:
                Math.random() * 4 + 3,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                Math.random() * 8 - 4,

            opacity:
                Math.random() * .5 + .5,

            symbol:
                Math.random() > .5
                    ? "♥"
                    : "✦"

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
    ) return;


    confettiContext.clearRect(
        0,
        0,
        confettiCanvas.width,
        confettiCanvas.height
    );


    confettiPieces.forEach(
        piece => {

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


            confettiContext.globalAlpha =
                piece.opacity;


            confettiContext.font =
                `${piece.height}px Poppins, sans-serif`;


            confettiContext.fillStyle =
                Math.random() > .5
                    ? "#f9a8d4"
                    : "#c4b5fd";


            confettiContext.fillText(
                piece.symbol,
                0,
                0
            );


            confettiContext.restore();


            piece.y +=
                piece.speed;


            piece.rotation +=
                piece.rotationSpeed;


            if (
                piece.y >
                window.innerHeight + 50
            ) {

                piece.y =
                    -20;

                piece.x =
                    Math.random() *
                    window.innerWidth;

            }

        }
    );


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
    ) return;


    createConfetti();


    if (confettiAnimation) {

        cancelAnimationFrame(
            confettiAnimation
        );

    }


    drawConfetti();


    setTimeout(
        () => {

            stopConfetti();

        },
        9000
    );

}


/* =====================================================
   STOP CONFETTI
===================================================== */

function stopConfetti() {

    if (confettiAnimation) {

        cancelAnimationFrame(
            confettiAnimation
        );

        confettiAnimation =
            null;

    }


    if (
        confettiContext &&
        confettiCanvas
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
   FINAL SCREEN EFFECT
===================================================== */

function finalScreenEffect() {

    const finalScreen =
        document.getElementById(
            "final"
        );


    if (!finalScreen) return;


    finalScreen.classList.add(
        "final-active"
    );


    setTimeout(
        () => {

            finalScreen.classList.remove(
                "final-active"
            );

        },
        3000
    );

}


/* =====================================================
   WATCH FINAL SCREEN
===================================================== */

const finalObserver =
    new MutationObserver(
        mutations => {

            mutations.forEach(
                mutation => {

                    if (
                        mutation.target.id !==
                        "final"
                    ) return;


                    if (
                        !mutation.target.classList.contains(
                            "hidden"
                        )
                    ) {

                        finalScreenEffect();

                    }

                }
            );

        }
    );


if (screens.final) {

    finalObserver.observe(
        screens.final,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

}


/* =====================================================
   RESTART CLEANUP
===================================================== */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            stopConfetti();

            closeLightboxWindow();

        }
    );

}


/* =====================================================
   PAGE VISIBILITY
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!bgMusic) return;


        if (
            document.hidden
        ) {

            bgMusic.pause();

            musicPlaying =
                false;

            updateMusicButton();

        }

    }
);


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        createStars();

        resizeConfettiCanvas();

    }
);


/* =====================================================
   PREVENT ACCIDENTAL DOUBLE CLICK
===================================================== */

let buttonLocked = false;


function lockButton(
    button,
    callback
) {

    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            if (buttonLocked)
                return;


            buttonLocked = true;


            callback();


            setTimeout(
                () => {

                    buttonLocked =
                        false;

                },
                500
            );

        }
    );

}
