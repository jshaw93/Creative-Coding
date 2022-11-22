function setup() {
    createCanvas(600, 600);
    for(let i = 0; i < 5; i++) {
        enemies.push([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    }
}

var enemies = [];
var obstacles = [];
var tickCount = 0;
var tickCount1 = 0;
var player = [0, 0];
var playerTick = 0;
var lives = 5;

var w = 87; 
var s = 83;
var a = 65;
var d = 68;

var winBool = false;

function draw() {
    background(220);
    for(let j = 0; j < 20; j++) {
        for(let i = 0; i < 20; i++) {
            if(j == 10 && i == 19) {
                fill(18, 201, 0);
                createBoard(i, j);
            } else {
                fill(255, 255, 255);
                createBoard(i, j);
            }
            createPlayer(player);
            createObstacles(obstacles);
            if(playerTick > 4000) {
                movePlayer();
            }
            moveEnemies();
            fill(255, 255, 255);
            tick();
        }
    }
}

function mouseClicked() {
    if(!(Math.floor(mouseX / 30) == 19 && Math.floor(mouseY / 30) == 10)) {
        obstacles.push([Math.floor(mouseX / 30), Math.floor(mouseY / 30)]);
    }
}

function checkObstacle(obstacleArr, obstacle) {
    var a = JSON.stringify(obstacleArr);
    var b = JSON.stringify(obstacle);
    var c = a.indexOf(b);
    if(c != -1) {
        return true;
    }
    return false;
}

function createPlayer(playerVar) {
    fill(25, 21, 255);
    triangle(playerVar[0] * 30, playerVar[1] * 30 + 30, playerVar[0] * 30 + 30, playerVar[1] * 30 + 30, playerVar[0] * 30 + 15, playerVar[1] * 30);
}

function createBoard(x, y) {
    rect(x * 30, y * 30, 30, 30);
}

function createObstacles(obstacleList) {
    fill(255, 255, 255);
    for(let obstacle in obstacleList) {
        fill(0, 0, 0);
        rect(obstacleList[obstacle][0] * 30, obstacleList[obstacle][1] * 30, 30, 30);
    }
}

function movePlayer() {
    if(keyIsDown(w) && player[1] != 0) {
        var copy = Object.assign([], player);
        copy[1] -= 1;
        if(!checkObstacle(obstacles, copy)) {
            player[1] -= 1;
        }
    } else if(keyIsDown(s) && player[1] != 19) {
        var copy = Object.assign([], player);
        copy[1] += 1;
        if(!checkObstacle(obstacles, copy)) {
            player[1] += 1;
        }
    } else if(keyIsDown(a) && player[0] != 0) {
        var copy = Object.assign([], player);
        copy[0] -= 1;
        if(!checkObstacle(obstacles, copy)) {
            player[0] -= 1;
        }
    } else if(keyIsDown(d) && player[0] != 19) {
        var copy = Object.assign([], player);
        copy[0] += 1;
        if(!checkObstacle(obstacles, copy)) {
            player[0] += 1;
        }
    }
    if(player[0] == 19 && player[1] == 10 && lives > 0 && !winBool) {
        doWin(true);
    }
}

function moveEnemies() {
    for(let enemy in enemies) {
        if(i == enemies[enemy][0] && j == enemies[enemy][1]) {
            if(enemy % 2 == 0) {
                fill(255, 0, 0);
                rect(i * 30 + 2.5, j * 30 + 2.5, 25, 25);
            } else {
                fill(255, 150, 0);
                circle(i * 30 + 15, j * 30 + 15, 30);
            }
        }
        if(tickCount > 5000 && enemy % 2 == 0) {
            if(enemies[enemy][0] == player[0] && enemies[enemy][1] == player[1]) {
                player = [0, 0];
                lives -= 1;
                if(lives == 0) {
                    doWin(false);
                }
            }
            var rand1 = Math.floor(Math.random() * 4);
            switch(rand1) {
                case 0:
                    enemies[enemy][1] -= 1;
                    if(enemies[enemy][[1]] < 0) {
                        enemies[enemy][1] = 19;
                    }
                case 1:
                    enemies[enemy][0] += 1;
                    if(enemies[enemy][[0]] > 19) {
                        enemies[enemy][0] = 0;
                    }
                case 2:
                    enemies[enemy][1] += 1;
                    if(enemies[enemy][[1]] > 19) {
                        enemies[enemy][1] = 0;
                    }
                case 3:
                    enemies[enemy][0] -= 1;
                    if(enemies[enemy][[0]] < 0) {
                        enemies[enemy][0] = 19;
                    }
            }
        } else if(tickCount1 > 3200 && enemy % 2 != 0) {
            if(enemies[enemy][0] == player[0] && enemies[enemy][1] == player[1]) {
                player = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
            }
            var rand1 = Math.floor(Math.random() * 4);
            switch(rand1) {
                case 0:
                    enemies[enemy][1] -= 1;
                    if(enemies[enemy][[1]] < 0) {
                        enemies[enemy][1] = 19;
                    }
                case 1:
                    enemies[enemy][0] += 1;
                    if(enemies[enemy][[0]] > 19) {
                        enemies[enemy][0] = 0;
                    }
                case 2:
                    enemies[enemy][1] += 1;
                    if(enemies[enemy][[1]] > 19) {
                        enemies[enemy][1] = 0;
                    }
                case 3:
                    enemies[enemy][0] -= 1;
                    if(enemies[enemy][[0]] < 0) {
                        enemies[enemy][0] = 19;
                    }
            }
        }
    }
}

function tick() {
    if(tickCount > 5000) {
        tickCount = 0;
    } else {
        tickCount++;
    }
    if(tickCount1 > 3200) {
        tickCount1 = 0;
    } else {
        tickCount1++;
    }
    if(playerTick > 4000) {
        playerTick = 0;
    } else {
        playerTick++;
    }a
}

function doWin(playerWin) {
    if(playerWin) {
        alert("You win!");
        winBool = true;
    } else {
        alert("You lose!");
    }
}
