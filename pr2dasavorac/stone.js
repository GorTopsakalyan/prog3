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