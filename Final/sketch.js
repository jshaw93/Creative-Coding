function setup() {
    createCanvas(600, 600);
    cols = floor(width/size);
    rows = floor(height/size);
    grid = [];
    player = [0, 0];
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
            var cell = new Cell(x, y);
            grid.push(cell);
        }
    }
    currentCell = grid[0];
}

var grid;
var cols, rows;
var size = 30;

var currentCell;

var stack = [];

var doneBool = false;

var player;
var playerTick = 0;
var tickSpeed = 10;

var w = 87; 
var s = 83;
var a = 65;
var d = 68;

function draw() {
    background(0);
    for(let cell = 0; cell < grid.length; cell++) {
        grid[cell].show();
    }
    currentCell.beenVisited = true;
    var neighbour = currentCell.checkNeighbours();
    if(neighbour && !doneBool) {
        neighbour.beenVisited = true;
        currentCell.highlight();
        stack.push(currentCell);
        removeCellWalls(currentCell, neighbour);
        currentCell = neighbour;
    } else if(stack.length > 0 && !doneBool) {
        currentCell = stack.pop();
    } else {
        doneBool = true;
    }
    if(doneBool) {
        fill(18, 201, 0);
        noStroke();
        rect(19*size-size/64, 19*size-size/64, 19*size, 19*size);
        createPlayer(player);
        if(playerTick > tickSpeed) {
            movePlayer();
        }
        tick();
    }
}

function createPlayer(playerVar) {
    fill(25, 21, 255);
    triangle(playerVar[0] * 30, playerVar[1] * 30 + 30, playerVar[0] * 30 + 30, playerVar[1] * 30 + 30, playerVar[0] * 30 + 15, playerVar[1] * 30);
}

function movePlayer() {
    var x = player[0];
    var y = player[1];
    var cell = grid[index(x, y)];
    if(keyIsDown(w) && player[1] != 0) {
        var copy = Object.assign([], player);
        copy[1] -= 1;
        if(!cell.walls[0]) {
            player[1] -= 1;
        }
    } else if(keyIsDown(s) && player[1] != 19) {
        var copy = Object.assign([], player);
        copy[1] += 1;
        if(!cell.walls[2]) {
            player[1] += 1;
        }
    } else if(keyIsDown(a) && player[0] != 0) {
        var copy = Object.assign([], player);
        copy[0] -= 1;
        if(!cell.walls[1]) {
            player[0] -= 1;
        }
    } else if(keyIsDown(d) && player[0] != 19) {
        var copy = Object.assign([], player);
        copy[0] += 1;
        if(!cell.walls[3]) {
            player[0] += 1;
        }
    }
    if(player[0] == 19 && player[1] == 19) {
        alert("You won!");
        doneBool = false;
        setup();
    }
}

function tick() {
    if(playerTick > tickSpeed) {
        playerTick = 0;
    } else {
        playerTick++;
    }
}

function Cell(x, y) {
    //Given a current cell as a parameter -- done
    //Mark the current cell as visited -- done
    //While the current cell has any unvisited neighbour cells:
    //  Choose one of the unvisited neighbours -- done
    //  Remove the wall between the current cell and the chosen cell -- done
    //  Invoke the routine recursively for the chosen cell -- done
    
    this.x = x;
    this.y = y;
    //            top, left, bottom, right
    this.walls = [true, true, true, true];
    this.beenVisited = false;

    this.show = function() {
        var left = this.x*size;
        var top = this.y*size;
        stroke(255);
        // top, left, bottom, right
        if(this.walls[0]) {
            line(left, top, left + size, top);
        }
        if(this.walls[1]) {
            line(left, top, left, top + size);
        }
        if(this.walls[2]) {
            line(left, top + size, left + size, top + size);
        }
        if(this.walls[3]) {
            line(left + size, top + size, left + size, top);
        }
    }

    this.checkNeighbours = function() {
        //above = x, y - 1
        //right = x + 1, y
        //below = x, y + 1
        //left = x - 1, y
        var neighbours = [];
        var top = grid[index(x, y - 1)];
        var right = grid[index(x + 1, y)];
        var bottom = grid[index(x, y + 1)];
        var left = grid[index(x - 1, y)];
        if(top && !top.beenVisited) {
            neighbours.push(top);
        }
        if(right && !right.beenVisited) {
            neighbours.push(right);
        }
        if(bottom && !bottom.beenVisited) {
            neighbours.push(bottom);
        }
        if(left && !left.beenVisited) {
            neighbours.push(left);
        }
        if(neighbours.length > 0) {
            var rand = floor(random(0, neighbours.length));
            return neighbours[rand];
        } else {
            return undefined;
        }
    }

    this.highlight = function() {
        var left = this.x*size;
        var top = this.y*size;
        noStroke();
        fill(0, 0, 255, 100);
        rect(left, top, size, size);
    }
}

function index(x, y) {
    if(x < 0 || y < 0 || x > cols - 1 || y > rows - 1) return -1;
    return x + y * cols;
}

function removeCellWalls(current, next) {
    var diffX = current.x - next.x;
    var diffY = current.y - next.y;
    if(diffX == 1) {
        current.walls[1] = false;
        next.walls[3] = false;
    } else if(diffX == -1) {
        current.walls[3] = false;
        next.walls[1] = false;
    }
    if(diffY == 1) {
        current.walls[0] = false;
        next.walls[2] = false;
    } else if(diffY == -1) {
        current.walls[2] = false;
        next.walls[0] = false;
    }
}
