const canvas = document.getElementById("gameboard-path");
const startBtn = document.getElementById("start-btn-path");
const ctx = canvas.getContext("2d");

const ORIGIN = 0;
const TOP_LINE_HEIGHT = 20;
const TOP_LINE_WIDTH = 550;
const GAP = 50;

const BALL_RADIUS = GAP / 2.7;

ctx.lineWidth = 3;
ctx.lineJoin = "bevel";
ctx.strokeStyle = "green";

let isMoving = false;
let win = false;
let gameOver = false;
let mouseOffsetTop = null;
let mouseOffsetLeft = null;

const ball = {
  x: 25,
  y: 45,
  radius: BALL_RADIUS,
};

const checkCollision = () => {
  if (ball.y - ball.radius <= TOP_LINE_HEIGHT + ctx.lineWidth / 2) {
    gameOver = true;
  }
  if (ball.x + ball.radius >= TOP_LINE_WIDTH - ctx.lineWidth / 2) {
    gameOver = true;
  }
  if (
    ball.y + ball.radius > TOP_LINE_HEIGHT + GAP &&
    ball.x - ball.radius < TOP_LINE_WIDTH - GAP &&
    ball.x + ball.radius < TOP_LINE_WIDTH
  ) {
    gameOver = true;
  }
};
//* SI la balle la balle est entre la ligne la plus a droite et la ligne de gauche => elle peut descendre
const drawBall = () => {
  ctx.moveTo(ball.x + ball.radius, ball.y);
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
};

const drawPath = () => {
  ctx.beginPath();
  ctx.moveTo(ORIGIN, TOP_LINE_HEIGHT);
  ctx.lineTo(TOP_LINE_WIDTH, TOP_LINE_HEIGHT);
  ctx.lineTo(TOP_LINE_WIDTH, canvas.height);
  ctx.moveTo(TOP_LINE_WIDTH - GAP, canvas.height);
  ctx.lineTo(TOP_LINE_WIDTH - GAP, TOP_LINE_HEIGHT + GAP);
  ctx.lineTo(ORIGIN, TOP_LINE_HEIGHT + GAP);
};

const drawVictory = () => {
  ctx.fillStyle = "green";
  ctx.font = "25px sans-serif";
  ctx.fillText("VICTORY", 200, 200);
};
const drawLoose = () => {
  ctx.fillStyle = "green";
  ctx.font = "25px sans-serif";
  ctx.fillText("DEFEAT", 200, 200);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath();
  drawBall();
  ctx.stroke();
};

const play = () => {
  draw();
  checkCollision();
};

canvas.addEventListener("mousedown", (event) => {
  if (
    ball.x - ball.radius < event.offsetX &&
    event.offsetX < ball.x + ball.radius &&
    ball.y - ball.radius < event.offsetY - canvas.offsetTop &&
    event.offsetY - canvas.offsetLeft < ball.y + ball.radius
  ) {
    isMoving = true;
    mouseOffsetTop = ball.x - event.offsetX + event.target.offsetTop;
    mouseOffsetLeft = ball.y - event.offsetY + event.target.offsetWidth;
    ball.x = event.offsetX - event.target.offsetTop + mouseOffsetTop;
    ball.y = event.offsetY - event.target.offsetWidth + mouseOffsetLeft;
    if (!win && !gameOver) {
      play();
    }
  }
});

window.addEventListener("mouseup", (event) => {
  isMoving = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (isMoving) {

    ball.x = event.offsetX - event.target.offsetTop + mouseOffsetTop;
    ball.y = event.offsetY - event.target.offsetWidth + mouseOffsetLeft;

    if (ball.y + ball.radius > canvas.height) {
      win = true;
    }
    if (gameOver) {
      drawLoose();
    }
    if (win) {
      drawVictory();
    }
    if (!win && !gameOver) {
      play();
    }
  }
});

draw();

startBtn.addEventListener("click", (event) => {
  isMoving = false;
  win = false;
  gameOver = false;
  mouseOffsetTop = null;
  mouseOffsetLeft = null;
  ball.x = 25;
  ball.y = 45;
  draw();
});
