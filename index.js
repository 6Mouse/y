let GrassArr = []
let GrassEaterArr = []
let GrassEater1Arr = []
let GrassEater2Arr = []
let GrassEater3Arr = []
let GrassEater4Arr = []

function setup() {
    createCanvas(1000, 1000);
    background('white');
    frameRate(5)
    let chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, ]
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
                GrassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let ge = new GrassEater(x, y);
                GrassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                let gt1 = new GrassEater1(x, y);
                GrassEater1Arr.push(gt1);
            }
            else if (matrix[y][x] == 4) {
                let gt2 = new GrassEater2(x, y);
                GrassEater2Arr.push(gt2);
            }
            else if (matrix[y][x] == 5) {
                let gt3 = new GrassEater3(x, y);
                GrassEater3Arr.push(gt3);
            }
            else if (matrix[y][x] == 6) {
                let gt4 = new GrassEater4(x, y);
                GrassEater4Arr.push(gt4);
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
                // if (weather == "storm"){
                //     let asd = random(chancer)
                //     if (asd == 3){
                //         fill("red")
                //     }
                //     else if (asd == 2){
                //         GrassEater1Arr.splice(GrassEater1Arr.findIndex(item => item.x == x && item.y == y), 1)
                //         matrix[y][x] = 2
                //         let ge = new GrassEater(x, y)
                //         GrassEaterArr.push(ge)
                //         fill("orange")
                //     }
                // }
                // else {
                    fill("red")
                // }
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
                else if (matrix[y][x] == 4) {
                    fill('#8B0000')
                }
                else if (matrix[y][x] == 5) {
                    fill('#ADD8E6')
                }
                else if (matrix[y][x] == 6) {
                    fill('#CC5500')
                }
        rect(x * 10, y * 10, 10, 10)
    }
}
weather = "none"
for (let i in GrassArr) {
    if (season == "summer") {
        GrassArr[i].mul();
    }
    else if (season == "winter") {
        GrassArr[i].mulwinter();
    }
}
for (let i in GrassEaterArr) {
    GrassEaterArr[i].eat();
}
for (let i in GrassEater1Arr) {
    GrassEater1Arr[i].eat();
}
for (let i in GrassEater2Arr) {
    GrassEater2Arr[i].eat();
}
for (let i in GrassEater3Arr) {
    GrassEater3Arr[i].eat();
}
for (let i in GrassEater4Arr) {
    GrassEater4Arr[i].eat();
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
            GrassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1]);
            GrassArr.push(newGrass);
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
            GrassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1]);
            GrassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            let pomidor = GrassArr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            GrassArr.splice(pomidor, 1);
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
        let pomidor = GrassEaterArr.findIndex((k) => k.x == this.x && k.y == this.y);
        GrassEaterArr.splice(pomidor, 1)
    }
    move() {
        if (this.energy <= -10) {
            this.die()
        }
        else {
            let newCell = random(this.chooseCell(0));
            if (newCell) {
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 2;
                this.getNewCoordinates()
                this.energy--;
            }
            else {
                this.energy -= 0.125;
            }
        }
    }
}
class GrassEater1 extends LivingCreature {
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
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 3 && newCell) {
            let newGrassEater1 = new GrassEater1(newCell[0], newCell[1]);
            GrassEater1Arr.push(newGrassEater1);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrassEater1 = new GrassEater1(newCell[0], newCell[1]);
            GrassEater1Arr.push(newGrassEater1);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            let pomidor = GrassEaterArr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            GrassEaterArr.splice(pomidor, 1);
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
        let pomidor = GrassEater1Arr.findIndex((k) => k.x == this.x && k.y == this.y);
        GrassEater1Arr.splice(pomidor, 1)
    }
    move() {
        if (this.energy <= -10) {
            this.die()
        }
        else {
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
}
class GrassEater2 extends LivingCreature {
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
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 3 && newCell) {
            let newGrassEater2 = new GrassEater2(newCell[0], newCell[1]);
            GrassEater2Arr.push(newGrassEater2);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrassEater2 = new GrassEater2(newCell[0], newCell[1]);
            GrassEater2Arr.push(newGrassEater2);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(3));
        if (newCell) {
            let pomidor = GrassEater1Arr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            GrassEater1Arr.splice(pomidor, 1);
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 4;
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
        let pomidor = GrassEater2Arr.findIndex((k) => k.x == this.x && k.y == this.y);
        GrassEater2Arr.splice(pomidor, 1)
    }
    move() {
        if (this.energy <= -10) {
            this.die()
        }
        else {
            var oneCell = [...this.chooseCell(0), ...this.chooseCell(1)]
            let newCell = random(oneCell);
            if (newCell) {
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 4;
                this.getNewCoordinates()
                this.energy--;
            }
            else {
                this.energy -= 0.125;
            }
        }
    }
}
class GrassEater3 extends LivingCreature {
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
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 3 && newCell) {
            let newGrassEater3 = new GrassEater3(newCell[0], newCell[1]);
            GrassEater3Arr.push(newGrassEater3);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrassEater3 = new GrassEater3(newCell[0], newCell[1]);
            GrassEater3Arr.push(newGrassEater3);
            matrix[newCell[1]][newCell[0]] = 5;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(4));
        if (newCell) {
            let pomidor = GrassEater2Arr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            GrassEater2Arr.splice(pomidor, 1);
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 5;
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
        let pomidor = GrassEater3Arr.findIndex((k) => k.x == this.x && k.y == this.y);
        GrassEater3Arr.splice(pomidor, 1)
        console.log("зомби умер")
    }
    move() {
        if (this.energy <= -10) {
            this.die()
        }
        else {
            var oneCell = [...this.chooseCell(0), ...this.chooseCell(1)]
            let newCell = random(oneCell);
            if (newCell) {
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 5;
                this.getNewCoordinates()
                this.energy--;
            }
            else {
                this.energy -= 0.125;
            }
        }
    }
}
class GrassEater4 extends LivingCreature {
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
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 3 && newCell) {
            let newGrassEater4 = new GrassEater4(newCell[0], newCell[1]);
            GrassEater4Arr.push(newGrassEater4);
            matrix[newCell[1]][newCell[0]] = 6;
            this.energy = 0
        }
    }
    mulwinter() {
        this.multiply += 0.125;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            let newGrassEater4 = new GrassEater4(newCell[0], newCell[1]);
            GrassEater4Arr.push(newGrassEater4);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0
        }
    }
    eat() {
        let newCell = random(this.chooseCell(5));
        if (newCell) {
            let pomidor = GrassEater3Arr.findIndex((k) => k.x == newCell[0] && k.y == newCell[1]);
            GrassEater3Arr.splice(pomidor, 1);
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[this.y][this.x] = 6;
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
        let pomidor = GrassEater4Arr.findIndex((k) => k.x == this.x && k.y == this.y);
        GrassEater4Arr.splice(pomidor, 1)   
        console.log("гриб умер")
    }
    move() {
        if (this.energy <= -10) {
            this.die()
        }
        else {
            var oneCell = [...this.chooseCell(0), ...this.chooseCell(1)]
            let newCell = random(oneCell);
            if (newCell) {
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 6;
                this.getNewCoordinates()
                this.energy--;
            }
            else {
                this.energy -= 0.125;
            }
        }
    }
}
function mouseClicked() {
    if (mouseX < 1000 && mouseY < 1000 && mouseX > 0 && mouseY > 0) {
    console.log(mouseX, mouseY)
    let indexY = parseInt(mouseY / 10)
    let indexX = parseInt(mouseX / 10)
    console.log(indexY, indexX)
        switch (matrix[indexY][indexX]) {
            case "1":
                GrassArr.splice(GrassArr.findIndex(item => item.x === indexX && item.y === indexY), 1);
                break;
            case "2":
                GrassEaterArr.splice(GrassEaterArr.findIndex(item => item.x === indexX && item.y === indexY), 1);
                break;
            case "3":
                GrassEater1Arr.splice(GrassEater1Arr.findIndex(item => item.x === indexX && item.y === indexY), 1);
                break;
            case "4":
                GrassEater2Arr.splice(GrassEater2Arr.findIndex(item => item.x === indexX && item.y === indexY), 1);
                break;
            case "5":
                GrassEater3Arr.splice(GrassEater3Arr.findIndex(item => item.x === indexX && item.y === indexY), 1);
                break;
            case "6":
                GrassEater4Arr.splice(GrassEater4Arr.findIndex(item => item.x === indexX && item.y === indexY), 1);
                break;
        }
        switch (create) {
            case "Grass":
                matrix[indexY][indexX] = 1
                var ge = new Grass(indexX, indexY)
                GrassArr.push(ge)
                break;
            case "Eater":
                matrix[indexY][indexX] = 2
                var ge = new GrassEater(indexX, indexY)
                GrassEaterArr.push(ge)
                break;
            case "Eater1":
                matrix[indexY][indexX] = 3
                var ge = new GrassEater1(indexX, indexY)
                GrassEater1Arr.push(ge)
                break;
            case "Eater2":
                matrix[indexY][indexX] = 4
                var ge = new GrassEater2(indexX, indexY)
                GrassEater2Arr.push(ge)
                break;
            case "Eater3":
                matrix[indexY][indexX] = 5
                var ge = new GrassEater3(indexX, indexY)
                GrassEater3Arr.push(ge)
                break;
            case "Eater4":
                matrix[indexY][indexX] = 6
                var ge = new GrassEater4(indexX, indexY)
                GrassEater4Arr.push(ge)
                break;
            case "kill":
                matrix[indexY][indexX] = 0
                break;
        }
    }
}