
var socket = io()
var side = 10;
var weath = 'summer'

function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");

    matrix = []
    socket.on("weather", function (data) {
        weath = data;
    })
    socket.on("data", nkarel)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let eaterCountElement = document.getElementById('eaterCount');
    let manCountElement = document.getElementById('manCount');
    let stoneCountElement = document.getElementById('stoneCount');
    function nkarel(data) {

        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        eaterCountElement.innerText = data.eaterCounter;
        manCountElement.innerText = data.manCounter;
        stoneCountElement.innerText = data.stoneCounter;
        matrix = data.matrix
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                var obj = matrix[y][x];
                if (obj == 1) {
                    if (weath == "summer") {
                        fill("green");
                    } else if (weath == "autumn") {
                        fill("#333300");
                    } else if (weath == "winter") {
                        fill("#b1e3cb");
                    } else if (weath == "spring") {
                        fill("#4dffa6");
                    }
                } else if (obj == 2) {
                    fill("yellow");
                }
                else if (obj == 3) {
                    fill("red");
                } else if (obj == 4) {
                    fill("blue");
                } else if (obj == 5) {
                    fill("black");
                } else if (obj == 0) {
                    fill("grey")
                }
                rect(x * side, y * side, side, side);
            }
        }
    }

}



function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addEater() {
    socket.emit("add Eater")
}
function addMan() {
    socket.emit("add Man")
}
function addStone() {
    socket.emit("add Stone")
}
