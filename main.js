let area = document.getElementById('area')
let html = document.getElementById('html')
let U = document.getElementById('up')
let D = document.getElementById('down')
let L = document.getElementById('left')
let R = document.getElementById('right')
let sc = 15
let score = 0
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

let snake = {
  x: area.width / 2,
  y: area.height / 2,
  xsp: 1,
  ysp: 0,
  dir: (x, y) => {
    snake.xsp = x
    snake.ysp = y
  },
  eat: (pos) => {
    let a = dist(snake.x , snake.y , pos.x , pos.y)
    if(a <= 10){
      return true;
    }
    else{
      return false;
    }
  }
}

  let food = {
    x: Math.floor(RandomNum(area.width , 0)),
    y: Math.floor(RandomNum(area.height , 0))
  }
function loc(npos){
    npos.x = Math.floor(RandomNum(area.width , 0)),
    npos.y = Math.floor(RandomNum(area.height , 0))
}
/* Canvas as a plane*/
// ↑ -Y
// ↓ +Y
// → +X
// ← -X

let Draw = () => {
  ctx.clearRect(0, 0, area.width, area.height)
  ctx.fillStyle = "#fff"
  ctx.beginPath()
  ctx.rect(snake.x, snake.y, 10, 10)
  ctx.fill()

  ctx.fillStyle = "red"
  ctx.beginPath()
  ctx.rect(food.x, food.y, 10, 10)
  ctx.fill()
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
setInterval(() => { //things happen here
if(snake.eat(food)){
  loc(food)
}
  Draw()
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
 

  snake.x += snake.xsp
  snake.y += snake.ysp
  snake.x = clamp(snake.x, 0, area.width - sc)
  snake.y = clamp(snake.y, 0, area.height - sc)
}, 17)