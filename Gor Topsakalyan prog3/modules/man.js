
let LivingCreature = require('./LivingCreature')
let Grass = require('./Grass')
module.exports = class Man extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 40
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
            this.energy++;



        }
        else {
            this.move();
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

            grassArr.push(new Grass(newX, newY, 1))


            this.x = newX
            this.y = newY
        }
        else {

            this.die()

        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in manArr) {
            if (manArr[i].x == this.x && manArr[i].y == this.y) {
                manArr.splice(i, 1)
            }
        }
    }




}