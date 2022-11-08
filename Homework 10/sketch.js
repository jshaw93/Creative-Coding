function setup() {
    createCanvas(400, 400);
}

var leftEye = [182, 171];
var rightEye = [222, 171];
var leftTranslate = false;
var eyeSpeed = Math.floor(Math.random() * 10) + 1;

var leftBrow = [170, 150, 185, 145, 185, 145, 195, 150];
var rightBrow = [205, 150, 215, 145, 215, 145, 230, 150];
var browTranslate = false;
var browSpeed = Math.floor(Math.random() * 10) + 1;

var beard = [175, 210, 200, 250, 225, 210];
var beardTranslate = false;
var beardSpeed = Math.floor(Math.random() * 10) + 1;

var titleSize = 22;
var titleTranslate = false;

function draw() {
    background(220);
    textSize(22);
    text("James Shaw", 250, 350);
    textSize(titleSize);
    text("My p5.js Portrait", 115, 50);
    if(titleSize >= 27 && !titleTranslate) {
        titleTranslate = true;
    } else if(titleSize <= 17 && titleTranslate) {
        titleTranslate = false;
    }
    if(titleTranslate) {
        titleSize -= 1;
    } else {
        titleSize += 1;
    }

    // Hair
    fill(0, 0, 0);
    square(150, 150, 100);
    circle(200, 170, 110);

    // Shirt
    rect(160, 240, 80, 100);

    // Face and neck
    fill(255, 232, 150);
    rect(180, 200, 40, 50);
    circle(200, 180, 100);

    // Eyes
    fill(255, 255, 255);
    circle(180, 170, 30);
    circle(220, 170, 30);
    fill(35, 55, 255);
    circle(leftEye[0], leftEye[1], 10);
    circle(rightEye[0], rightEye[1], 10);
    translateEyes(leftEye, rightEye);
    fill(0, 0, 0);
    point(182, 170);
    point(222, 170);

    // Beard, eyebrows
    fill(0, 0, 0);
    triangle(beard[0], beard[1], beard[2], beard[3], beard[4], beard[5]);
    translateBeard(beard);
    line(leftBrow[0], leftBrow[1], leftBrow[2], leftBrow[3]);
    line(leftBrow[4], leftBrow[5], leftBrow[6], leftBrow[7]);
    line(rightBrow[0], rightBrow[1], rightBrow[2], rightBrow[3]);
    line(rightBrow[4], rightBrow[5], rightBrow[6], rightBrow[7]);
    translateEyebrows(leftBrow, rightBrow);
}

function translateEyes(left, right) {
    if((left[0] >= 185 || right[0] >= 225) && !leftTranslate) {
        leftTranslate = true;
    } else if((left[0] <= 179 || right[0] <= 219) && leftTranslate) {
        leftTranslate = false;
    }
    if(leftTranslate) {
        leftEye[0] -= eyeSpeed;
        rightEye[0] -= eyeSpeed;
    } else {
        leftEye[0] += eyeSpeed;
        rightEye[0] += eyeSpeed;
    }
}

function translateEyebrows(left, right) {
    if((left[1] >= 153 || right[1] >= 153) && !browTranslate) {
        browTranslate = true;
    } else if((left[1] <= 147 || right[1] <= 147) && browTranslate) {
        browTranslate = false;
    }
    if(browTranslate) {
        leftBrow[1] -= browSpeed;
        leftBrow[3] -= browSpeed;
        leftBrow[5] -= browSpeed;
        leftBrow[7] -= browSpeed;
        rightBrow[1] -= browSpeed;
        rightBrow[3] -= browSpeed;
        rightBrow[5] -= browSpeed;
        rightBrow[7] -= browSpeed;
    } else {
        leftBrow[1] += browSpeed;
        leftBrow[3] += browSpeed;
        leftBrow[5] += browSpeed;
        leftBrow[7] += browSpeed;
        rightBrow[1] += browSpeed;
        rightBrow[3] += browSpeed;
        rightBrow[5] += browSpeed;
        rightBrow[7] += browSpeed;
    }
}

function translateBeard(beardVar) {
    // 175, 210, 200, 250, 225, 210
    if((beardVar[0] >= 179 || beardVar[2] >= 204) && !beardTranslate) {
        beardTranslate = true;
    } else if((beardVar[0] <= 171 || beardVar[2] <= 196) && beardTranslate) {
        beardTranslate = false;
    }
    if(beardTranslate) {
        for(let index = 0; index < beardVar.length; index++) {
            beard[index] -= beardSpeed;
        }
    } else {
        for(let index = 0; index < beardVar.length; index++) {
            beard[index] += beardSpeed;
        }
    }
}
