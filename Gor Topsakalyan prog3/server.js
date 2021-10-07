var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var a = 15

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
eaterArr = [];
manArr = [];
stoneArr = [];
matrix = [];

var n = 50;

weath = "winter";
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Eater = require("./modules/eater.js");
var Man = require("./modules/man.js");
var Stone = require("./modules/stone.js");

function rand(min, max) {
    return Math.random() * (max - min + 1) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = 0//չեմ ուզեցել որ խաղի սկզբում ստեղծվի ժայռը։


    }
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            } else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                eaterArr.push(new Eater(x, y, 3))
            } else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                manArr.push(new Man(x, y, 4))
            } else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                stoneArr.push(new Stone(x, y, 5))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in eaterArr) {
        eaterArr[i].eat();
    }
    for (var i in manArr) {
        manArr[i].eat();
    }
    for (var i in stoneArr) {
        stoneArr[i].boom();
    }
    io.sockets.emit("send matrix", matrix);

    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        eaterCounter: eaterArr.length,
        manCounter: manArr.length,
        stoneCounter: stoneArr.length
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)


function kill() {
    a = 15;
    grassArr = [];
    grassEaterArr = [];
    eaterArr = [];
    manArr = [];
    stoneArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addEater() {
    for (var i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            eaterArr.push(new Eater(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addMan() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            manArr.push(new Man(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addStone() {
    if (a > 0) {
        a -= 5
        for (var i = 0; i < 5; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5
                stoneArr.push(new Stone(x, y, 5))
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
}



///


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);



////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add Eater", addEater);
    socket.on("add Man", addMan);
    socket.on("add Stone", addStone);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.eater = eaterArr.length;
    statistics.man = manArr.length;
    statistics.stone = stoneArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)

