let area = document.getElementById('area')
let html = document.getElementById('html')
let U = document.getElementById('up')
let D = document.getElementById('down')
let L = document.getElementById('left')
let R = document.getElementById('right')
let scor = document.getElementById("sco")
let sc = 10
let score = 1
area.style = "background:#556479;"
area.height = html.getBoundingClientRect().width / 2
area.width = html.getBoundingClientRect().width / 2
let ctx = area.getContext('2d')


let RandomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dist(x, y, posx, posy) {
  return Math.sqrt(Math.pow(x - posx, 2) + Math.pow(y - posy, 2))
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loc(npos) {
  npos.x = Math.floor(RandomNum(area.width, 10))
  npos.y = Math.floor(RandomNum(area.height, 10))
}


class Snake {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.xsp = 1
    this.ysp = 0
    this.tail = []
    this.track = 0
  }
  eat(pos) {
    let a = dist(this.x, this.y, pos.x, pos.y)
    if (a <= 10) {
      this.track += 10
      return true;
    } else {
      return false;
    }
  }
  death(){
    for(let i = 0; i < this.tail.length; i++){
      if(this.x == this.tail[i].x && this.y == this.tail[i].y){
        alert(`GAME OVER , your score was : ${score}`)
        this.tail = []
        this.track = 0
        score = 0
        this.x = area.width/2
        this.y = area.height/2 
      }
    }
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1]
    }
    this.tail[this.track - 1] = { x: this.x, y: this.y }

    this.x += this.xsp
    this.y += this.ysp
  }
  dir(x, y) {
    this.xsp = x
    this.ysp = y
  }
  show() {
    ctx.fillStyle = "#fff"
    for (let i = 0; i < this.tail.length; i++){
      ctx.fillRect(this.tail[i].x, this.tail[i].y, 10 , 10)
    }
    ctx.beginPath()
    ctx.rect(snake.x, snake.y, 10, 10)
    ctx.fill();
  }
  limit() {
    this.x = clamp(snake.x, 0, area.width - sc)
    this.y = clamp(snake.y, 0, area.height - sc)
  }
}

class Food {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  limit() {
    food.x = clamp(food.x, 0, area.width - sc)
    food.y = clamp(food.y, 0, area.height - sc)
  }
  show() {
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.rect(this.x, this.y, 10, 10)
    ctx.fill();

  }
}


let snake = new Snake(area.width / 2, area.height / 2)

let food = new Food(Math.floor(RandomNum(area.width, 10)), Math.floor(RandomNum(area.height, 10)))



let Clear = () => {
  ctx.clearRect(0, 0, area.width, area.height)
}


function controls() {
  //mobiles
  U.addEventListener("click", () => {
    snake.dir(0, -1)
  })
  D.addEventListener("click", () => {
    snake.dir(0, 1)
  })
  L.addEventListener("click", () => {
    snake.dir(-1, 0)
  })
  R.addEventListener("click", () => {
    snake.dir(1, 0)
  })

  window.addEventListener("keydown", (e) => {
    console.log(evt)
  })

}

setInterval(() => {
  Clear()
  controls()

  snake.update()
  snake.show()
  snake.limit()
  snake.death()
  
  food.show()
  food.limit()
  
  
  if (snake.eat(food)) {
    score++
    loc(food)
  }

}, 17)

//Canvas as a plane
// ↑ -Y
// ↓ +Y
// → +X
// ← -X