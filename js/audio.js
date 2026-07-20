/* ==========================================================
   Happy New Year AR
   audio.js
   Version 2
========================================================== */

"use strict";

/* ==========================================================
   Audio
========================================================== */

let kiranSound;
let kotsuzumiSound;
let kadomatsuSound;
let taikoSound;
let voiceSound;

/* ==========================================================
   Initialize
========================================================== */

window.addEventListener("DOMContentLoaded", () => {

    kiranSound = document.querySelector("#kiranSound");

    kotsuzumiSound = document.querySelector("#kotsuzumiSound");

    kadomatsuSound = document.querySelector("#kadomatsuSound");

    taikoSound = document.querySelector("#taikoSound");

    voiceSound = document.querySelector("#voiceSound");

    initializeAudio();

});

/* ==========================================================
   Initialize Volume
========================================================== */

function initializeAudio() {

    if (kiranSound) {

        kiranSound.volume = 0.75;

    }

    if (kotsuzumiSound) {

        kotsuzumiSound.volume = 0.85;

    }

    if (kadomatsuSound) {

        kadomatsuSound.volume = 0.90;

    }

    if (taikoSound) {

        taikoSound.volume = 1.00;

    }

    if (voiceSound) {

        voiceSound.volume = 0.95;

    }

}

/* ==========================================================
   Common
========================================================== */

function playAudio(audio) {

    if (!audio) {

        console.warn("Audio Not Found");

        return;

    }

    audio.pause();

    audio.currentTime = 0;

    const promise = audio.play();

    if (promise !== undefined) {

        promise.catch(error => {

            console.warn(error);

        });

    }

}

/* ==========================================================
   キラッ
========================================================== */

function playKiran() {

    playAudio(kiranSound);

}

/* ==========================================================
   小鼓
========================================================== */

function playKotsuzumi() {

    playAudio(kotsuzumiSound);

}

/* ==========================================================
   門松
========================================================== */

function playKadomatsu() {

    playAudio(kadomatsuSound);

}

/* ==========================================================
   和太鼓
========================================================== */

function playTaiko() {

    playAudio(taikoSound);

}

/* ==========================================================
   音声ナレーション(Happy New Year!)
========================================================== */

function playVoice() {

    playAudio(voiceSound);

}


/* ==========================================================
   Stop
========================================================== */

function stopAllAudio() {

    const list = [

        kiranSound,

        kotsuzumiSound,

        kadomatsuSound,

        taikoSound,

        voiceSound

    ];

    list.forEach(audio => {

        if (!audio) {

            return;

        }

        audio.pause();

        audio.currentTime = 0;

    });

}

/* ==========================================================
   Future
========================================================== */

/*

Version 3

・BGM追加

・フェードイン

・フェードアウト

・SEキュー管理

・同時再生管理

・AudioContext対応

・空間オーディオ対応

*/