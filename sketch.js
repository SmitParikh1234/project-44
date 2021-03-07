  
var  playerScore = 0
var paddle
var  ball
var  bricks
var  gameState
var gameoverImg;
var gameEnd;

function preload(){
    
}

function setup() {
  createCanvas(800, 600)

  let colors = createColors()
  gameState = 'play'
  paddle = new Paddle()
  ball = new Ball(paddle)

  bricks = createBricks(colors)


}

function createColors() {
  var colors = []
  colors.push(color(265, 165, 0))
  colors.push(color(175, 206, 250))
  colors.push(color(147, 112, 219))
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)))
  }
  return colors
}

function createBricks(colors) {
  const bricks = []
  const rows = 10
  const bricksPerRow = 10
  const brickWidth = width / bricksPerRow
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))])
      bricks.push(brick) 
    }
  }
  return bricks
}

function draw() {
  if(gameState === 'play') {
    background("blue");

    ball.bounceEdge()
    ball.bouncePaddle()
    
    ball.update()

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left')
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right')
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i]
      if (brick.isColliding(ball)) {
        ball.reverse('y')
        bricks.splice(i, 1)
        playerScore += brick.points
      } else {
        brick.display()
      }
    }

    paddle.display()
    ball.display()

    textSize(32)
    fill(255)
    text("YOUR SCORE - ",playerScore, width - 150, 50)

    if (ball.belowBottom()) {
      gameState = 'Lose'
     
    }

    if (bricks.length === 0) {
      gameState = 'Win'
    }
  } else {
    textSize(100)
    gameState === 'Lose' ? fill(255, 0, 255) : fill(255)
    text(`You ${gameState}!!!`, width / 2 - 220, height / 2)
  }
}




