module.exports = class Stone {
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
        this.multiply++
        if (this.multiply > 20) {
            var Cell = this.chooseCell();

            for (var h = 0; h < Cell.length; h++) {

                if (matrix[Cell[h][1]][Cell[h][0]] == 1) {
                    for (var i in grassArr) {
                        matrix[Cell[h][1]][Cell[h][0]] = 0;
                        if (Cell[h][0] == grassArr[i].x && Cell[h][1] == grassArr[i].y) {
                            grassArr.splice(i, 1);

                            break;
                        }
                    }
                } else if (matrix[Cell[h][1]][Cell[h][0]] == 2) {
                    for (var i in grassEaterArr) {
                        matrix[Cell[h][1]][Cell[h][0]] = 0
                        if (Cell[h][0] == grassEaterArr[i].x && Cell[h][1] == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                            break;
                        }
                    }
                } else if (matrix[Cell[h][1]][Cell[h][0]] == 3) {
                    for (var i in eaterArr) {
                        matrix[Cell[h][1]][Cell[h][0]] = 0
                        if (Cell[h][0] == eaterArr[i].x && Cell[h][1] == eaterArr[i].y) {
                            eaterArr.splice(i, 1);
                            break;
                        }
                    }
                } else if (matrix[Cell[h][1]][Cell[h][0]] == 4) {
                    for (var i in manArr) {
                        matrix[Cell[h][1]][Cell[h][0]] = 0
                        if (Cell[h][0] == manArr[i].x && Cell[h][1] == manArr[i].y) {
                            manArr.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            this.multiply = 0
        }
    }

}