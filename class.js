class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 7) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassarr.push(newGrass);
            this.multiply = 0;
        }
    }


}



class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 12;
        this.directions = [];
        this.multiply = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8 && this.energy >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrass = new GrassEater(newX, newY, 1);
            grasseaterarr.push(newGrass);
            this.multiply = 0;
            this.energy -= 3

        }
    }
    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells)
        if (this.energy > 0 && newCell) {

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;

        } else this.die()
    }
    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);

        if (newCell && this.energy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.y = newY;
            this.x = newX;
            this.energy += 1.5
            for (var i in grassarr) {
                if (newX == grassarr[i].x && newY == grassarr[i].y) {
                    grassarr.splice(i, 1);
                    break;
                }
            }
        } else this.move()
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in grasseaterarr) {
            if (this.x == grasseaterarr[i].x && this.y == grasseaterarr[i].y) {
                grasseaterarr.splice(i, 1);
                break;
            }
        }
    }
}

class Eater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 14;
        this.multiply = 0
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 10 && this.energy > 6) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newGrass = new Eater(newX, newY);
            eaterarr.push(newGrass);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy += 2
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grasseaterarr) {
                if (newX == grasseaterarr[i].x && newY == grasseaterarr[i].y) {
                    grasseaterarr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.eat2()
        }
    }
    eat2() {
        var emptyCells = this.chooseCell(4)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in manarr) {
                if (newX == manarr[i].x && newY == manarr[i].y) {
                    manarr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }



    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eaterarr) {
            if (this.x == eaterarr[i].x && this.y == eaterarr[i].y) {
                eaterarr.splice(i, 1);
                break;
            }
        }
    }
}



class Man {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.multiply = 0
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grasseaterarr) {
                if (newX == grasseaterarr[i].x && newY == grasseaterarr[i].y) {
                    grasseaterarr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 1) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 1
            var newGrass1 = new Grass(this.x, this.y);
            grassarr.push(newGrass1);

            this.x = newX
            this.y = newY
        }
        else {

            this.die()

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in manarr) {
            if (this.x == manarr[i].x && this.y == manarr[i].y) {
                manarr.splice(i, 1);
                break;
            }
        }
    }


}

class Stone {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.multiply = 0
        this.directions = [];
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y - 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x + 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell() {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {


                found.push(this.directions[i]);

            }
        }
        return found;
    }
    boom() {


        var Cell = this.chooseCell();

        for (var h = 0; h < Cell.length; h++) {

            if (matrix[Cell[h][1]][Cell[h][0]] == 1) {
                for (var i in grassarr) {
                    matrix[Cell[h][1]][Cell[h][0]] = 0;
                    if (Cell[h][0] == grassarr[i].x && Cell[h][1] == grassarr[i].y) {
                        grassarr.splice(i, 1);
                     
                        break;
                    }
                }
            } else if (matrix[Cell[h][1]][Cell[h][0]] == 2) {
                for (var i in grasseaterarr) {
                    matrix[Cell[h][1]][Cell[h][0]] = 0
                    if (Cell[h][0] == grasseaterarr[i].x && Cell[h][1] == grasseaterarr[i].y) {
                        grasseaterarr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[Cell[h][1]][Cell[h][0]] == 3) {
                for (var i in eaterarr) {
                    matrix[Cell[h][1]][Cell[h][0]] = 0
                    if (Cell[h][0] == eaterarr[i].x && Cell[h][1] == eaterarr[i].y) {
                        eaterarr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[Cell[h][1]][Cell[h][0]] == 4) {
                for (var i in manarr) {
                    matrix[Cell[h][1]][Cell[h][0]] = 0
                    if (Cell[h][0] == manarr[i].x && Cell[h][1] == manarr[i].y) {
                        manarr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    a() {
        this.multiply++
        if (this.multiply > 40) {

            this.boom();
            this.multiply = 0
        }
    }
}