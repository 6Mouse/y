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
				let gr = new GrassEater(x, y);
				grassEaterArr.push(gr);
			}
            else if (matrix[y][x] == 3) {
                let gr = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(gr);
            }
			break;
		}
		break;
	}
}

function draw() {
	fill(0, 255, 0);
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				fill('green')
			} else if (matrix[y][x] == 2) {
				fill('orange')
			} else if (matrix[y][x] == 3) {
				fill('red')
			} else {
				fill('#acacac')
			}
			rect(x * 10, y * 10, 10, 10)
			break;
		}
		break;
	}
	for (let i in grassArr) {
		grassArr[i].mul();
		break;
	}
	for (let i in grassEaterArr) {
		grassEaterArr[i].eat();
		break;
	}	
	for (let i in grassEaterEaterArr) {
		grassEaterEaterArr[i].eat();
		break;
	}
}
class LivingCreature {
	constructor(x,y) {
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
			break;
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

}
class GrassEater extends LivingCreature{
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