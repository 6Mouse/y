let grassArr = []
let grassEaterArr = []
let grassEaterEaterArr = []

function setup() {
    createCanvas(1000, 1000);
    background('white');
    frameRate(5)
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3]
    matrix = []
    for (let y = 0; y < 100; y++) {
        let abob = []
        for (let x = 0; x < 100; x++) {
            abob.push(random(chance))
        }
        matrix.push(abob)
    }
    console.log(matrix)
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let ge = new GrassEater(x, y);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                let gt = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(gt);
            }
        }
    }
}
function draw() {
    fill(0, 255, 0);
    let chancer = [2, 3]
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 3) {
                if (weather == "storm"){
                    let asd = random(chancer)
                    if (asd == 3){
                        fill("red")
                    }
                    else if (asd == 2){
                        grassEaterEaterArr.splice(grassEaterArr.findIndex(item => item.x == x && item.y == y), 2)
                        matrix[y][x] = 2
                        let ge = new GrassEater(x, y)
                        grassEaterArr.push(ge)
                        fill("orange")
                    }
                }
                else {
                    fill("red")
                }
            }
            if (matrix[y][x] == 0) {
                if (weather == "storm"){
                    let asd = random(chancer)
                    if (asd == 3){
                        fill("blue")
                    }
                else if (asd == 2){
                    fill('#acacac')
                }
            }
            else {
                fill("#acacac")
            }
            }
                else if (matrix[y][x] == 1) {
                    if (season == "summer") {
                        if (weather == "storm"){
                            let asd = random(chancer)
                            if (asd == 3){
                                fill("#0d98ba")
                            }
                        else if (asd == 2){
                            fill('green')
                        }
                    }
                    else {
                        fill("green")
                    }
                    }
                    if (season == "winter") {
                        if (weather == "storm"){
                            let asd = random(chancer)
                            if (asd == 3){
                                fill("#dbdbff")
                            }
                        else if (asd == 2){
                            fill('white')
                        }
                    }
                    else {
                        fill("white")
                    }
                    }
                }
                else if (matrix[y][x] == 2) {
                    fill('orange')
                }
        rect(x * 10, y * 10, 10, 10)
    }
}
weather = "none"
for (let i in grassArr) {
    if (season == "summer") {
        grassArr[i].mul();
    }
    else if (season == "winter") {
        grassArr[i].mulwinter();
    }
}
for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
}
for (let i in grassEaterEaterArr) {
    grassEaterEaterArr[i].eat();
}
}
class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    }
}
class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y)
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
        ]
    }
    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0
        }
    }

}
class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
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
        ]
    }
    mul() {
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 5 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1]);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            let pomidor = grassArr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            grassArr.splice(pomidor, 1);
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.getNewCoordinates();
            this.energy++;
            this.mul()
        } else {
            this.energy--;
            if (this.energy <= 5) {
                this.die()
            } else {
                this.move()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        let pomidor = grassEaterArr.findIndex((k) => k.x == this.x && k.y == this.y);
        grassEaterArr.splice(pomidor, 1)
    }
    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 2;
            this.getNewCoordinates()
        }
    }
}
class GrassEaterEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.x = x; this.y = y;
        this.energy = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
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
        ]
    }
    mul() {
        let newCell = random(this.chooseCell(2));
        if (this.energy >= 3 && newCell) {
            let newGrassEaterEater = new GrassEaterEater(newCell[0], newCell[1]);
            grassEaterEaterArr.push(newGrassEaterEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            let pomidor = grassEaterArr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            grassEaterArr.splice(pomidor, 1);
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.getNewCoordinates();
            this.energy++;
            this.mul()
        } else {

            if (this.energy <= -10) {
                this.die()
            }
            else {
                this.move()
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        let pomidor = grassEaterEaterArr.findIndex((k) => k.x == this.x && k.y == this.y);
        grassEaterEaterArr.splice(pomidor, 1)
    }
    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 3;
            this.getNewCoordinates()
            this.energy--;
        }
        else {
            this.energy -= 0.125;
        }
    }
}