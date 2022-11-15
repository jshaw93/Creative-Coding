function setup() {
    createCanvas(600, 600);
    for(let i = 0; i < 5; i++) {
        enemies.push([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    }
}

var enemies = [];
var obstacles = [];
var tickCount = 0;

function draw() {
    background(220);
    for(let j = 0; j < 20; j++) {
        for(let i = 0; i < 20; i++) {
            if(j == 10 && i == 19) {
                fill(18, 201, 0);
            } else {
                fill(255, 255, 255);
            }
            rect(i * 30, j * 30, 30, 30);
            for(let enemy in enemies) {
                if(i == enemies[enemy][0] && j == enemies[enemy][1]) {
                    fill(255, 0, 0);
                    circle(i * 30 + 15, j * 30 + 15, 30, 30);
                }
                if(tickCount > 5000) {
                    var rand1 = Math.floor(Math.random() * 10) % 4;
                    switch(rand1) {
                        case 0:
                            enemies[enemy][1] += 1;
                            if(enemies[enemy][[1]] >= 19) {
                                enemies[enemy][1] = 0;
                            }
                        case 1:
                            enemies[enemy][0] += 1;
                            if(enemies[enemy][[0]] >= 19) {
                                enemies[enemy][0] = 0;
                            }
                        case 2:
                            enemies[enemy][1] -= 1;
                            if(enemies[enemy][[1]] <= 0) {
                                enemies[enemy][1] = 19;
                            }
                        case 3:
                            enemies[enemy][0] -= 1;
                            if(enemies[enemy][[0]] <= 0) {
                                enemies[enemy][0] = 19;
                            }
                    }
                }
            }
            fill(255, 255, 255);
            if(tickCount > 5000) {
                tickCount = 0;
            } else {
                tickCount++;
            }
        }
    }
}
