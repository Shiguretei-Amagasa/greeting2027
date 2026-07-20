/* ==========================================================
   Happy New Year AR
   text.js
   Version 2
   Part 1
========================================================== */

"use strict";

/* ==========================================================
   Global
========================================================== */

let textRoot = null;

let font = null;

const textGroups = {

    happy: null,

    new: null,

    year: null

};

const textMeshes = [];

const TEXT_COLOR = 0xf5d46b;

const TEXT_METALNESS = 1.0;

const TEXT_ROUGHNESS = 0.22;

const TEXT_DEPTH = 0.18;

const TEXT_SIZE = 0.22;

const LETTER_SPACING = 0.17;

const LINE_SPACING = 0.42;


/* ==========================================================
   Material
========================================================== */

const textMaterial = new THREE.MeshStandardMaterial({

    color: TEXT_COLOR,

    metalness: TEXT_METALNESS,

    roughness: TEXT_ROUGHNESS,

    envMapIntensity: 1.6,

    emissive: 0x3d2d00,

    emissiveIntensity: 0.12

});


/* ==========================================================
   Initialize
========================================================== */

window.addEventListener("DOMContentLoaded", async () => {

    textRoot = document.querySelector("#textRoot");

    if (!textRoot) {

        console.error("textRoot Not Found");

        return;

    }

    await loadFont();

    buildAllText();

});


/* ==========================================================
   Font Loader
========================================================== */

async function loadFont() {

    return new Promise((resolve, reject) => {

        opentype.load(

            "fonts/oshigo.otf",

            function(error, loadedFont) {

                if (error) {

                    console.error(error);

                    reject(error);

                    return;

                }

                font = loadedFont;

                console.log("Font Loaded");

                resolve();

            }

        );

    });

}


/* ==========================================================
   Build All
========================================================== */

function buildAllText() {

    textGroups.happy = buildWord(

        "Happy",

        0.0

    );

    textGroups.new = buildWord(

        "New",

        -LINE_SPACING

    );

    textGroups.year = buildWord(

        "Year!",

        -LINE_SPACING * 2

    );

}


/* ==========================================================
   Build Word
========================================================== */

function buildWord(

    word,

    y

){

    const group = new THREE.Group();

    group.visible = false;

    group.position.set(

        0,

        y,

        0

    );

    let offset = 0;

    for(const ch of word){

        const mesh = createLetter(

            ch

        );

        mesh.position.x = offset;

        offset += LETTER_SPACING;

        group.add(mesh);

        textMeshes.push(mesh);

    }

    const width = offset - LETTER_SPACING;

    group.position.x =

        -(width / 2);

    textRoot.object3D.add(group);

    return group;

}
/* ==========================================================
   Create Letter
========================================================== */

function createLetter(character) {

    if (!font) {

        console.error("Font Not Loaded");

        return new THREE.Group();

    }

    //------------------------------------------------------
    // フォントパス取得
    //------------------------------------------------------

    const path = font.getPath(

        character,

        0,

        0,

        TEXT_SIZE * 100

    );

    //------------------------------------------------------
    // Shape生成
    //------------------------------------------------------

    const shapes = path.toShapes(true);

    //------------------------------------------------------
    // Geometry生成
    //------------------------------------------------------

    const geometry = new THREE.ExtrudeGeometry(

        shapes,

        {

            depth: TEXT_DEPTH,

            bevelEnabled: true,

            bevelThickness: 0.015,

            bevelSize: 0.010,

            bevelOffset: 0,

            bevelSegments: 6,

            curveSegments: 18

        }

    );

    //------------------------------------------------------
    // 中央揃え
    //------------------------------------------------------

    geometry.computeBoundingBox();

    geometry.center();

    //------------------------------------------------------
    // 法線
    //------------------------------------------------------

    geometry.computeVertexNormals();

    //------------------------------------------------------
    // Mesh
    //------------------------------------------------------

    const mesh = new THREE.Mesh(

        geometry,

        textMaterial

    );

    mesh.castShadow = true;

    mesh.receiveShadow = true;

    //------------------------------------------------------
    // 初期状態
    //------------------------------------------------------

    mesh.scale.set(

        0,

        0,

        0

    );

    mesh.rotation.x = THREE.MathUtils.degToRad(-90);

    mesh.rotation.z = THREE.MathUtils.degToRad(180);

    return mesh;

}


/* ==========================================================
   Utility
========================================================== */

function resetWord(group){

    if(!group){

        return;

    }

    group.visible = false;

    group.children.forEach(mesh=>{

        mesh.scale.set(

            0,

            0,

            0

        );

    });

}


/* ==========================================================
   Reset All
========================================================== */

function resetText(){

    resetWord(textGroups.happy);

    resetWord(textGroups.new);

    resetWord(textGroups.year);

}

/* ==========================================================
   Animation Setting
========================================================== */

const BOUNCE_DURATION = 650;

const LETTER_DELAY = 80;


/* ==========================================================
   Public Functions
========================================================== */

function showHappy(){

    animateWord(

        textGroups.happy

    );

}


function showNew(){

    animateWord(

        textGroups.new

    );

}


function showYear(){

    animateWord(

        textGroups.year

    );

}


/* ==========================================================
   Animate Word
========================================================== */

function animateWord(group){

    if(!group){

        return;

    }

    group.visible = true;

    group.children.forEach((mesh,index)=>{

        popLetter(

            mesh,

            index

        );

    });

}


/* ==========================================================
   Letter Animation
========================================================== */

function popLetter(

    mesh,

    index

){

    //------------------------------------------------------
    // 初期状態
    //------------------------------------------------------

    mesh.scale.set(

        0,

        0,

        0

    );

    mesh.position.z =

        -0.08;

    mesh.rotation.x =

        THREE.MathUtils.degToRad(

            -105

        );

    //------------------------------------------------------
    // ボヨヨン
    //------------------------------------------------------

    anime({

        targets:mesh.scale,

        x:[

            0,

            1.35,

            0.88,

            1.08,

            1

        ],

        y:[

            0,

            1.35,

            0.88,

            1.08,

            1

        ],

        z:[

            0,

            1.35,

            0.88,

            1.08,

            1

        ],

        delay:index*LETTER_DELAY,

        duration:BOUNCE_DURATION,

        easing:"easeOutElastic(1,.65)"

    });

    //------------------------------------------------------
    // 少し前へ
    //------------------------------------------------------

    anime({

        targets:mesh.position,

        z:[

            -0.08,

            0.03,

            0

        ],

        delay:index*LETTER_DELAY,

        duration:420,

        easing:"easeOutBack"

    });

    //------------------------------------------------------
    // 起き上がる
    //------------------------------------------------------

    anime({

        targets:mesh.rotation,

        x:[

            THREE.MathUtils.degToRad(

                -105

            ),

            THREE.MathUtils.degToRad(

                -84

            ),

            THREE.MathUtils.degToRad(

                -90

            )

        ],

        delay:index*LETTER_DELAY,

        duration:600,

        easing:"easeOutBack"

    });

    //------------------------------------------------------
    // 少し光る
    //------------------------------------------------------

    anime({

        targets:textMaterial,

        emissiveIntensity:[

            0.12,

            0.65,

            0.12

        ],

        delay:index*LETTER_DELAY,

        duration:450,

        easing:"easeOutQuad"

    });

}


/* ==========================================================
   Hide
========================================================== */

function hideAllText(){

    resetText();

}
/* ==========================================================
   Layout Utility
========================================================== */

function updateWordLayout(group){

    if(!group){

        return;

    }

    let width = 0;

    group.children.forEach(mesh=>{

        mesh.geometry.computeBoundingBox();

        const box = mesh.geometry.boundingBox;

        const w = box.max.x - box.min.x;

        mesh.position.x = width;

        width += w * 0.010 + LETTER_SPACING;

    });

    group.position.x = -(width * 0.5);

}


/* ==========================================================
   Update All Layout
========================================================== */

function updateLayout(){

    updateWordLayout(textGroups.happy);

    updateWordLayout(textGroups.new);

    updateWordLayout(textGroups.year);

}


/* ==========================================================
   Marker Lost
========================================================== */

function resetAnimation(){

    hideAllText();

}


/* ==========================================================
   Dispose
========================================================== */

function disposeText(){

    Object.values(textGroups).forEach(group=>{

        if(!group){

            return;

        }

        while(group.children.length>0){

            const mesh = group.children[0];

            if(mesh.geometry){

                mesh.geometry.dispose();

            }

            group.remove(mesh);

        }

        if(group.parent){

            group.parent.remove(group);

        }

    });

}


/* ==========================================================
   Rebuild
========================================================== */

function rebuildText(){

    disposeText();

    textGroups.happy = buildWord(

        "Happy",

        0

    );

    textGroups.new = buildWord(

        "New",

        -LINE_SPACING

    );

    textGroups.year = buildWord(

        "Year!",

        -LINE_SPACING*2

    );

    updateLayout();

}


/* ==========================================================
   Public
========================================================== */

window.showHappy = showHappy;

window.showNew = showNew;

window.showYear = showYear;

window.hideAllText = hideAllText;

window.resetAnimation = resetAnimation;

window.rebuildText = rebuildText;


/* ==========================================================
   Auto Layout
========================================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        updateLayout();

    },300);

});


/* ==========================================================
   Future Extension
========================================================== */

/*

Version3

〇 日本語対応

「あ」

「け」

「ま」

「し」

「て」

など一文字ずつ生成


〇 金箔マテリアル

HDRI

Environment Map


〇 Outline

縁取り


〇 Bloom

文字が少し発光


〇 Spark

文字出現時に金色パーティクル


〇 Reflection

床への映り込み


〇 Motion Blur


〇 Year!のみ金色を強く


〇 Letterごとに色変更


〇 Happy

↓

New

↓

Year!

↓

全体を少し拡大


〇 和太鼓と同期して

Year!が少し揺れる

*/
