let area = document.getElementById('area')
let html = document.getElementById('html')

let U = document.getElementById('up')
let D = document.getElementById('down')
let L = document.getElementById('left')
let R = document.getElementById('right')

let sc = 10
let score = 0


area.style = "background:#556479;"
area.height = html.getBoundingClientRect().width / 2
area.width = html.getBoundingClientRect().width / 2

if (window.innerHeight < window.innerWidth) {
  area.width = html.getBoundingClientRect().height / 2
  area.height = html.getBoundingClientRect().height / 2
}
let ctx = area.getContext('2d')

let RandomNum = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandom(Array) {
  let random = Math.floor(Math.random() * Array.length)
  return Array[random]
}

function dist(x, y, posx, posy) {
  return Math.sqrt(Math.pow(x - posx, 2) + Math.pow(y - posy, 2))
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}


function loc(npos) {
  npos.x = Math.floor(RandomNum(area.width, 10))
  npos.y = Math.floor(RandomNum(area.height, 10))
}


 class Snake {
  constructor(x, y , color) {
    this.x = x
    this.y = y
    this.xsp = sc
    this.ysp = 0
    this.tail = []
    this.track = 3
    this.color = color
  }
  eat(pos) {
    let a = dist(this.x, this.y, pos.x, pos.y)
    if (a<= 10) {
      this.track++
      return true;
    } else {
      return false;
    }
  }
  scoring(score) {
    
  }
  death() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
        this.scoring(score)
        let hc = sessionStorage.getItem('hiscore')
        alert(`GAME OVER , your score was : ${score} High score: ${hc}`)
        this.tail = []
        this.track = 3
        score = 0
        this.x = area.width / 2
        this.y = area.height / 2
        loc(food)
      }
    }
  }
  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }
    this.tail[this.track - 1] = { x: this.x , y: this.y }

    this.x += this.xsp
    this.y += this.ysp 
  }
  dir(x, y) {
    this.xsp = x
    this.ysp = y
  }
  show() {
    ctx.fillStyle = this.color
    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, 10, 10)
    }
    ctx.beginPath()
    ctx.rect(snake.x, snake.y, 10, 10)
    ctx.fill();
  }
  limit() {
    if (this.x > area.width) {
      this.x = 0;
    } else if (this.y > area.height) {
      this.y = 0;
    } else if (this.x <= 0) {
      this.x = area.width;
    } else if (this.y <= 0 ) {
      this.y = area.height;
    }
  }
}

class Food {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  limit() {
    food.x = clamp(this.x, 0, area.width - sc)
    food.y = clamp(this.y, 0, area.height - sc)
  }
  show() {
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.rect(this.x, this.y, sc , 10)
    ctx.fill();
  }
}


    let colors = ["#3C77B8" , "#224467" , "#8D1021" , "7EA36F" , "9F8DC6","#FC0118" , "#FCF101", "#96FD01" , "#00FE26" , "#01FEE8" , "#02ADFE" , "#OCO1FA", "#CCO1FA", "#FB02A4"]
    let x = generateRandom(colors)
    
let snake = new Snake(area.width / 2, area.height / 2 , x)

let food = new Food(Math.floor(RandomNum(area.width, 10)), Math.floor(RandomNum(area.height, 10)))



let Clear = () => {
  ctx.clearRect(0, 0, area.width, area.height)
}


function controls() {
  //mobiles
  U.addEventListener("click", () => {
    snake.dir(0, -1 * sc)
  })
  D.addEventListener("click", () => {
    snake.dir(0, sc)
  })
  L.addEventListener("click", () => {
    snake.dir(-1 * sc, 0)
  })
  R.addEventListener("click", () => {
    snake.dir(sc, 0)
  })
  //keyboard controls 
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 38 || evt.keyCode == 87) {
      snake.dir(0, -1 * sc)
      evt.preventDefault()
    } else if (evt.keyCode == 40 || evt.keyCode == 83) {
      snake.dir(0, sc)
      evt.preventDefault()
    } else if (evt.keyCode == 37 || evt.keyCode == 65) {
      snake.dir(-1 * sc, 0)
      evt.preventDefault()
    } else if (evt.keyCode == 39 || evt.keyCode == 68) {
      snake.dir(sc, 0)
      evt.preventDefault()
    }
  })
}

setInterval(() => {
  Clear()
  controls()

  snake.update()
  snake.show()
  snake.limit()
  snake.death()
  snake.scoring(score)
  
  food.show()
  food.limit()

  if (snake.eat(food)) {
    score++
    loc(food)
  }
  
}, 150 )
