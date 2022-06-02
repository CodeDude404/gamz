// Get the canvas, and get context
var canvas = document.getElementById('player-area');
var ctx = canvas.getContext('2d');

// Set up some important variables
var wWidth = canvas.width; // canvas width
var wHeight = canvas.height; // canvas height

// Track the score
var scoreLeft = 0;
var scoreRight = 0;
// ball size, position, speed
var ballSize = 30;
var bX = wWidth / 2;
var bY = wHeight / 2;
var xVel = 3;
var yVel = 3;

// Paddles
var paddleWidth = 10;
var paddleHeight = 100;
var paddleLeftX = 10;
var paddleLeftY = wHeight / 2;
var paddleRightX = wWidth - 10 - paddleWidth;
var paddleRightY = wHeight / 2;

// Control keys (numbers represent a key)
var upKeyCode = 38;
var downKeyCode = 40;
var wKeyCode = 87;
var sKeyCode = 83;

// Draw some test objects
// draw ball
// draw paddles

// set the program to listen for key pressed
window.onkeydown = handleKeys;

// begin the main gameplay loop
window.requestAnimationFrame(animate);


// main gameplay loop which runs forever
function animate() {
	// update the ball
	updateBall();
	// draw the items
	drawItems()
	// reanimate
	window.requestAnimationFrame(animate);
}


// handle keypresses
function handleKeys(event) {
	switch (event.keyCode) {
		case upKeyCode: { paddleRightY -= 20; break; };
		case downKeyCode: { paddleRightY += 20; break; };
	}

}

// updateBall
function updateBall() {
	// get the boundaries of the ball
	var paddleLeftTop = paddleLeftY;
	var ballLeftBound = bX - ballSize;
	var ballRightBound = bX + ballSize;
	var ballTopBound = bY - ballSize;
	var ballBottomBound = bY + ballSize;
	var paddleLeftBottom = paddleLeftY + paddleHeight;
	var paddleLeftBumper = paddleLeftX + paddleWidth;
	var paddleRightTop = paddleRightY;
	var paddleRightBottom = paddleRightY + paddleHeight;
	var paddleRightBumper = paddleRightX + paddleWidth;

	// handle bouncing on paddles
	// left paddle
	if (ballLeftBound + xVel <= paddleLeftBumper && bY >= paddleLeftTop && bY <= paddleLeftBottom) {
		xVel = xVel * -1;
	}
	// right paddle
	if (ballRightBound + xVel >= paddleRightBumper && bY >= paddleRightTop && bY <= paddleRightBottom) {
		xVel = xVel * -1;
	}
	// right and left bounds
	// Left edge reached
	if (ballLeftBound + xVel <= 0) {
		bX = wWidth / 2;
		bY = wHeight / 2;
		//right player scores
		scoreRight++;
	}
	if (ballRightBound + xVel >= wWidth) {
		bX = wWidth / 2;
		bY = wHeight / 2;
		//left player scores
		scoreLeft++;
	}
	// top and bottom bounds
	if (ballBottomBound +yVel >= wHeight || ballTopBound + yVel <= 0) {
		yVel = yVel * -1
	}
	// update position
	bY += yVel;
	bX += xVel;
}

// draw the game items
function drawItems() {
	// clear canvas
	ctx.clearRect(0, 0, wWidth, wHeight);
	// draw ball

	drawBall(bX, bY, ballSize);
	// draw paddle
	drawPaddle(paddleLeftY, 'left')
	drawPaddle(bY, 'right')
	writeScores();
}

// function to make drawing the ball easier
function drawBall(x, y, radius) {
	var path = new Path2D();
	var startAngle = 0;
	var endAngle = Math.PI * 2;
	var anticlockwise = false;
	path.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	ctx.stroke(path)
	ctx.fillStyle = "red";
	ctx.fill(path);

}

// function to make drawing paddles easier
function drawPaddle(y, side) {
	var x;

	if (side === 'left') {
		x = paddleLeftX;
	} else {
		x = paddleRightX;
	}

	ctx.fillStyle = "blue";
	ctx.fillRect(x, y, paddleWidth, paddleHeight);

}

// function to write the scores into the corners of the game
function writeScores() {
	ctx.fillStyle = "white";
	ctx.textBaseline = "top";
	ctx.font = "32xpx Arial";
	ctx.fillText(scoreLeft, 15,30);
	ctx.fillText(scoreRight, wWidth - 35, 30 );
}
