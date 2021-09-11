function generator(matLen, gr, grEat, a, b,c) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    } for (let i = 0; i < a; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < b; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }for (let i = 0; i < c; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    
    return matrix;
}

let side = 10;

let matrix = generator(40, 30, 10, 30, 10,10);



var grassarr = [];
var grasseaterarr = [];
var eaterarr = [];
var manarr = [];
var stonearr = []

function setup() {

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); 
    background('black');


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassarr.push(new Grass(x, y))
            } else if (matrix[y][x] == 2) {
                grasseaterarr.push(new GrassEater(x, y))
            } else if (matrix[y][x] == 3) {
                eaterarr.push(new Eater(x, y))
            } else if (matrix[y][x] == 4) {
                manarr.push(new Man(x, y))
            } else if (matrix[y][x] == 5) {
                stonearr.push(new Stone(x, y))
            }
        }
    }
}
function draw() {
 


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("white");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("blue");
            } else if (matrix[y][x] == 5) {
                fill("black");
            }            
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassarr) {
        grassarr[i].mul();
    }
    for (var i in grasseaterarr) {
        grasseaterarr[i].mul();
        grasseaterarr[i].eat();
    }
    for (var i in eaterarr) {
        eaterarr[i].mul();
        eaterarr[i].eat();
    }
    for (var i in manarr) {
        manarr[i].eat()

    } 
    for (var i in stonearr) {
       stonearr[i].a();
  

    }

}
