/* =====================================================
   HAPPY BIRTHDAY ROSSA MEPARINDA
   SCRIPT.JS
   Part 4 — Final & Confetti
===================================================== */


/* =====================================================
   CONFETTI CANVAS
===================================================== */

const confettiCanvas =
    document.getElementById("confettiCanvas");

const confettiContext =
    confettiCanvas
        ? confettiCanvas.getContext("2d")
        : null;

let confettiPieces = [];

let confettiAnimation = null;


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


/* =====================================================
   CONFETTI COLORS
===================================================== */

const confettiColors = [
    "#f9a8d4",
    "#c4b5fd",
    "#ffffff",
    "#f472b6",
    "#a78bfa"
];


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
                Math.random() * 6 - 3,

            color:
                confettiColors[
                    Math.floor(
                        Math.random() *
                        confettiColors.length
                    )
                ]

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


            confettiContext.fillStyle =
                piece.color;


            confettiContext.fillRect(
                -piece.size / 2,
                -piece.size / 2,
                piece.size,
                piece.size * 1.8
            );


            confettiContext.restore();


            piece.y +=
                piece.speed;


            piece.rotation +=
                piece.rotationSpeed;


            if (
                piece.y >
                window.innerHeight + 30
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
    ) {
        return;
    }


    resizeConfettiCanvas();

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
        8000
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
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        resizeConfettiCanvas();

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

resizeConfettiCanvas();


/* =====================================================
   RESTART BUTTON
===================================================== */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            stopConfetti();

            showScreen(
                "opening"
            );

        }
    );

}
