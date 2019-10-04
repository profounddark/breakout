let theCanvas;
let ctx;

let x;
let y;

let dx = 2;
let dy = -2;
const ballRadius = 10;

const paddleWidth = 75;
const paddleHeight = 10;
let paddleX;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let interval;

let bricks = [];
let score = 0;
let lives = 3;


function drawLives()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, theCanvas.width-65, 20);
}

function drawScore()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, theCanvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks()
{
    for(let c=0; c<brickColumnCount; c++)
    {
        for(let r=0; r<brickRowCount; r++)
        {
            if (bricks[c][r].status == 1)
            {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw()
{
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > theCanvas.width-ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }

    if (y + dy < ballRadius)
    {
        dy = -dy;
    }
    else if (y + dy > theCanvas.height-ballRadius)
    {
        if (x > paddleX && x < paddleX + paddleWidth)
        {
            dy = -dy;
        }
        else
        {
            lives--;
            if(!lives)
            {
                alert("GAME OVER!");
                document.location.reload();
                clearInterval(interval);
            }
            else
            {
                x = theCanvas.width / 2;
                y = theCanvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (theCanvas.width - paddleWidth)/2;
            }
            
        }
  
    }

    if (rightPressed)
    {
        paddleX += 7;
        if (paddleX + paddleWidth > theCanvas.width)
        {
            paddleX = theCanvas.width - paddleWidth;
        }
    }
    else if (leftPressed)
    {
        paddleX -= 7;
        if (paddleX < 0)
        {
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;

}

function keyDownHandler(e)
{
    if(e.key == "Right" || e.key == "ArrowRight")
    {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft")
    {
        leftPressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.key == "Right" || e.key == "ArrowRight")
    {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft")
    {
        leftPressed = false;
    }
}

function collisionDetection()
{
    for (let c=0; c<brickColumnCount; c++)
    {
        for (let r=0; r<brickRowCount; r++)
        {
            let b = bricks[c][r];
            if (b.status == 1)
            {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
                {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score==brickRowCount*brickColumnCount)
                    {
                        alert("YOU WIN! Congratulations!");
                        document.location.reload();
                        clearInterval(interval);

                    }
                }
            }

        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


document.addEventListener("DOMContentLoaded", function(event)
{
    theCanvas = document.getElementById("myCanvas");
    ctx = theCanvas.getContext("2d");

    paddleX = (theCanvas.width-paddleWidth)/2;
    
    for (let c=0; c<brickColumnCount; c++)
    {
        bricks[c] = [];
        for (let r=0; r<brickRowCount; r++)
        {
            bricks[c][r] = { x:0, y:0, status:1 };
        }
    }
    
    x = theCanvas.width / 2;
    y = theCanvas.height - 30;
    interval = setInterval(draw, 10);

});