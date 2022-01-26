let area = document.getElementById('area')
let html = document.getElementById('html')
let U = document.getElementById('up')
let D = document.getElementById('down')
let L = document.getElementById('left')
let R = document.getElementById('right')
let sc = 10
let score = 0
let hiscore = 0
let i = false //swipe needs fixing
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
      this.track++
      return true;
    } else {
      return false;
    }
  }
  scoring(score) {
    if (score > hiscore) {
      hiscore = score
      sessionStorage.setItem('hiscore', hiscore)
    }
  }
  death() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
        this.scoring()
        let hc = sessionStorage.getItem('hiscore')
        alert(`GAME OVER , your score was : ${score} High score: ${hc}`)
        this.tail = []
        this.track = 0
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
    } else if (this.x < 1) {
      this.x = area.width;
    } else if (this.y < 1) {
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
  //keyboard controls 
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 38 || evt.keyCode == 87) {
      snake.dir(0, -1)
      evt.preventDefault()
    } else if (evt.keyCode == 40 || evt.keyCode == 83) {
      snake.dir(0, 1)
      evt.preventDefault()
    } else if (evt.keyCode == 37 || evt.keyCode == 65) {
      snake.dir(-1, 0)
      evt.preventDefault()
    } else if (evt.keyCode == 39 || evt.keyCode == 68) {
      snake.dir(1, 0)
      evt.preventDefault()
    }
  })
}
area.addEventListener("touchstart", startTouch, false);
area.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
if(i){
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
  
  if (Math.abs(diffX) > Math.abs(diffY) ) {
    if (diffX > 0) {
      snake.dir(-1, 0)
    } else {
      snake.dir(1, 0)
    }
  } else {
    if (diffY > 0) {
      snake.dir(0, -1)
    } else {
      snake.dir(0, 1)
    }
  }
  initialX = null;
  initialY = null;
  e.preventDefault()
};
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
  
}, 17)