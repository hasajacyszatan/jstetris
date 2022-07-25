canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Block {
	constructor (TetrisTable) {
		this.ctx = TetrisTable.ctx
		this.blocksize = TetrisTable.block
		const blocks = [
			// kwadrat
			{
				name: "Q",
				shapes: [
					[{x: -1,y: 0},{x: 0,y: 0},{x: -1,y: -1},{x: 0,y: -1}]
				],
			},
			{
				name: "I",
				shapes: [
					[{x:0,y:-2},{x:0,y:-1},{x:0,y:0},{x:0,y:1}],
					[{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:0,y:-2}]
				],
			},
			{
				name: "S",
				shapes: [
					[{x:1,y:0,},{x:0,y:0,},{x:0,y:-1,},{x:-1,y:-1,},],
					[{x:0,y:1},{x:0,y:0},{x:1,y:0},{x:1,y:-1}]
				],
			},
			{
				name: "Z",
				shapes: [
					[{x: -1,y: 0,},{x: 0,y: 0,},{x: 0,y: -1,},{x: 1,y: -1}],
					[{x:1,y:1},{x:1,y:0},{x:0,y:0},{x:0,y:-1}]
				]
			},
			{
				name: "L",
				shapes: [
					[{x: -1, y:0}, {x: 0, y:0}, {x:1, y: 0}, {x: -1, y: -1}],
					[{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:1,y:-1}],
					[{x: -1, y:0}, {x: 0, y:0}, {x:1, y: 0}, {x:1,y:1}],
					[{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:-1,y:1}],
				]
			},
			{
				name: "J",
				shapes: [
					[{x: -1, y:0}, {x: 0, y:0}, {x:1, y: 0}, {x: 1, y: -1}],
					[{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:1,y:1}],
					[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:-1,y:1}],
					[{x:0,y:1},{x:0,y:0},{x:0,y:-1},{x:-1,y:-1}],
				]
			},
			{
				name: "T",
				shapes:
					[
						[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:-1}],
						[{x:0,y:1},{x:0,y:0},{x:1,y:0},{x:0,y:-1}],
						[{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1}],
						[{x:-1,y:0},{x:0,y:0},{y:1,x:0},{x:0,y:-1}],
					]
			}
		]
	this.block 				= blocks[getRandomInt(0, blocks.length)]
	this.orientation 	= 1
	this.shape 				= this.block.shapes[0]
	this.position 		= {}
	this.position.x  	= 5
	this.position.y 	= 0
	this.allpositions = []
	this.blacklisted = []
	}
	draw() {
		this.allpositions = []
		for(let i of this.shape){
		 	if(this.ctx.fillStyle == '#ff0000'){this.ctx.fillStyle = 'red'}else{this.ctx.fillStyle = 'blue'}
			let x = (i.x+this.position.x)*this.blocksize.widthpx
			let y = (i.y+this.position.y)*this.blocksize.heightpx
			this.allpositions.push({
				x:i.x+this.position.x,
				y:i.y+this.position.y,
			})
			draw = true
			for(let j of this.blacklisted){
				draw = x+this.position.x == j.x || x+this.position.y == j.y
			}
			if(draw){
				this.ctx.fillStyle = 'purple'
				this.ctx.fillRect(x,y, this.blocksize.widthpx, this.blocksize.heightpx)
			}else{
				console.log("NIE RYSUJE")
			}
		}
		
	}
	down() {
		this.position.y++
		this.draw()
	}
	left() {
		for(let i of this.allpositions){
		if(! i.x == 10 || !i.x == 0){
			this.position.x--
			break;
		}
	}}
	right() {
		for(let i of this.allpositions){
		if(! i.x == 10 || !i.x == 0){
			this.position.x++
			break;
		}}
	}
	rotate() {
		if (this.orientation >= this.block.shapes.length-1) {
			this.orientation = 0
		} else {
			this.orientation = this.orientation + 1
		}
		this.shape = this.block.shapes[this.orientation]
	}
}
class TetrisTable {
	constructor (canvas, ctx) {
		this.ctx = ctx
		this.canvas = ctx
		
		this.table = {}
		this.block = {}
		
		this.table.heightpx = canvas.height
		this.table.widthpx = canvas.width

		this.block.widthpx = canvas.width/10
		this.block.heightpx = canvas.height/20

		this.blocks = []
		this.currentblock = new Block(this)
	}
	draw () {
		for (let i = 0; i < 20; i++) {
			let sumka = 0
			for(let j of this.blocks){
				for(let a of j.allpositions){
					if(a.y == i){
						sumka=sumka+a.x
						if(sumka == 45 && !j.blacklisted.includes(a)){
							j.blacklisted.push(a)
						}
					}
				}
			}
		}
		for(let i of this.blocks){
			i.draw()
		}
		let stop = false
		for(let i of this.blocks){
			for(let j of i.allpositions){
				for(let a of this.currentblock.allpositions){
					if(a.y+1 == j.y && a.x == j.x){
						stop = true
					}
				}
			}
		}

		if(this.currentblock.position.y == 20 || stop == true){
			this.blocks.push(this.currentblock)
			this.currentblock = new Block(pole)
		} else {
			this.currentblock.down()
		}
	}
}

const pole = new TetrisTable(canvas, ctx)
// let mainbloczek = new Block(pole)

function draw() {
	ctx.fillStyle = '#000'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	pole.draw()
}
setInterval(draw, 200)
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        // tu będzie obrót 
        pole.currentblock.rotate()
    }
    else if (e.keyCode == '40') {
        // down arrow
        pole.currentblock.down()
    }
    else if (e.keyCode == '37') {
       // left arrow
      	pole.currentblock.left()
    }
    else if (e.keyCode == '39') {
       // right arrow
       pole.currentblock.right()
    }

}
