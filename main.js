let area = document.getElementById('area')
let html = document.getElementById('html')
area.style = "background:#556479;"
area.height = html.getBoundingClientRect().width/2 
area.width = html.getBoundingClientRect().width /2
let ctx = area.getContext('2d')

let snake = {
  x : area.width/2,
  y : area.height/2,
  xsp : 0,
  ysp : 0
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
    ctx.rect(snake.x,snake.y , 10, 10)
    ctx.fill()
    
    ctx.fillStyle ="red"
    ctx.beginPath()
    ctx.rect(snake.x , snake.y + 11, 10 , 10)
    ctx.fill()
}
setInterval(() => {  //things happen here
  Draw()
   snake.x += snake.xsp
   snake.y += snake.ysp
 
},17)
