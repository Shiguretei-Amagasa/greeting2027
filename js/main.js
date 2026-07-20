/* ==========================================================
   Happy New Year AR
   main.js
   Version 2
========================================================== */

"use strict";

/* ==========================================================
   Global
========================================================== */

let animationStarted = false;


/* ==========================================================
   Initialize
========================================================== */

window.addEventListener("DOMContentLoaded", () => {

    const marker = document.querySelector("#hiroMarker");

    if (!marker) {

        console.error("Marker Not Found");

        return;

    }

    //------------------------------------------------------
    // Marker Found
    //------------------------------------------------------

    marker.addEventListener("markerFound", () => {

        if (animationStarted) {

            return;

        }

        animationStarted = true;

        console.log("Marker Found");

        startAnimation();

    });

    //------------------------------------------------------
    // Marker Lost
    //------------------------------------------------------

    marker.addEventListener("markerLost", () => {

        console.log("Marker Lost");

    });

});


/* ==========================================================
   Animation Sequence
========================================================== */

async function startAnimation() {

    console.log("Animation Start");

    //------------------------------------------------------
    // STEP 1
    // 光
    //------------------------------------------------------

    playKiran();

    playLight();

    await wait(1000);

    //------------------------------------------------------
    // STEP 2
    // Happy
    //------------------------------------------------------

    showHappy();

    playKotsuzumi();

    await wait(900);

    //------------------------------------------------------
    // STEP 3
    // New
    //------------------------------------------------------

    showNew();

    playKotsuzumi();

    await wait(900);

    //------------------------------------------------------
    // STEP 4
    // Year!
    //------------------------------------------------------

    showYear();

    playKotsuzumi();

    await wait(1200);

    //------------------------------------------------------
    // STEP 5
    // 和太鼓
    //------------------------------------------------------

    playTaiko();

    await wait(300);

    //------------------------------------------------------
    // STEP 6
    // 紙吹雪
    //------------------------------------------------------

    startConfetti();

    await wait(400);

    //------------------------------------------------------
    // STEP 7
    // 門松
    //------------------------------------------------------

    playKadomatsu();

    showKadomatsu();

    await wait(1200);

    //------------------------------------------------------
    // STEP 8
    // 将来
    //------------------------------------------------------

    if (typeof showPerson === "function") {

        showPerson();

    }

}


/* ==========================================================
   Kadomatsu
========================================================== */

function showKadomatsu() {

    const left = document.querySelector("#kadomatsuLeft");

    const right = document.querySelector("#kadomatsuRight");

    if (!left || !right) {

        return;

    }

    left.setAttribute("visible", true);

    right.setAttribute("visible", true);

    left.object3D.scale.set(0,0,0);

    right.object3D.scale.set(0,0,0);

    anime({

        targets:left.object3D.scale,

        x:0.12,

        y:0.12,

        z:0.12,

        duration:500,

        easing:"easeOutElastic(1,.6)"

    });

    anime({

        targets:right.object3D.scale,

        x:0.12,

        y:0.12,

        z:0.12,

        duration:500,

        easing:"easeOutElastic(1,.6)"

    });

}


/* ==========================================================
   Utility
========================================================== */

function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}