function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    textSize(22);
    text("James Shaw", 250, 350);
    text("My p5.js Portrait", 115, 50);

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
    circle(182, 171, 10);
    circle(222, 171, 10);
    point(182, 170);
    point(222, 170);

    // Beard, eyebrows
    fill(0, 0, 0);
    triangle(175, 210, 200, 250, 225, 210);
    line(170, 150, 185, 145);
    line(185, 145, 195, 150);
    line(205, 150, 215, 145);
    line(215, 145, 230, 150);
}
