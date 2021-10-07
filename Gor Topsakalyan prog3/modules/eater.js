let LivingCreature = require('./LivingCreature')

module.exports =class Eater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8
    }

    mul() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2
            eaterArr.push(new Eater(newX, newY, 2))
            this.energy = 6;
        }
        // if (weath == "winter") {
        // 	this.energy -= 4;
        // 	this.multiply -= 4;
        // }
        // if (weath == "summer") {
        // 	this.energy += 2;
        // 	this.multiply += 2;
        // }

    }




    move() {
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY
        }

        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }


    }



    eat() {
        var grassCells = super.chooseCell(2);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy += 2;

            if (this.energy >= 10) {
                this.mul();
                this.energy = 6
            }

        }
        else {
            this.eat2();
        }
    }


    eat2() {
        var grassCells = super.chooseCell(4);
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {

            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            for (var i in manArr) {
                if (manArr[i].x == newX && manArr[i].y == newY) {
                    manArr.splice(i, 1)
                }
            }

            this.x = newX;
            this.y = newY;
            this.energy += 2;

            if (this.energy >= 10) {
                this.mul();
                this.energy = 6
            }

        }
        else {
            this.move();
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eaterArr) {
            if (eaterArr[i].x == this.x && eaterArr[i].y == this.y) {
                eaterArr.splice(i, 1)
            }
        }
    }


}