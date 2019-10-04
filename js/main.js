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

let interval;



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

function draw()
{
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    drawBall();
    drawPaddle();

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
            alert("GAME OVER!");
            document.location.reload();
            clearInterval(interval);
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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


document.addEventListener("DOMContentLoaded", function(event)
{
    theCanvas = document.getElementById("myCanvas");
    ctx = theCanvas.getContext("2d");

    paddleX = (theCanvas.width-paddleWidth)/2;
    
    x = theCanvas.width / 2;
    y = theCanvas.height - 30;
    interval = setInterval(draw, 10);

});