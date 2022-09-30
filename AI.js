/* 
todo:
get distance of food from the snake's head
*/
let dx = 0
let dy = 0
let distance = (x1 ,y1 , x2 , y2) => {
    dx = Math.round(Math.sqrt((x1 - x2)**2))
    dy = Math.round(Math.sqrt((y1 - y2)**2))

    let dh = Math.sqrt(dy**2 + dy**2)

    return Math.round(dh)
}

let di = distance(food.x , food.y , snake.x , snake.y)

console.log(di)

if (snake.eat(food)) {
    di = distance(food.x , food.y , snake.x , snake.y)
  }
