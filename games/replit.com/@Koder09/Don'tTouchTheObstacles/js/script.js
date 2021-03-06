class converter {
	toBinaryfromNum(number) {
		number = parseInt(number)

		// convert to binary
		return number.toString(2)

	}

	fromBinarytoNum(bin) {
		return parseInt(bin, 2)
	}
}

function validate(data){
	if (data == "NaN"){
		return false
	} else if ( data == "Null") {
		return false
	} else {
		return true
	}
}
//Initalize
var PLAYER_SIZE = 20;
var CANVAS = document.getElementById("myCanvas");

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight - 50;


var CTX = CANVAS.getContext("2d");
var GROUND_LEVEL = CANVAS.height - 50;
var SCORE = 0;
var OBSTICLES;
var SCROLL_SPEED;
var PLAYER;
var GameOVER;
var OBSTICLE_COOLDOWN_TIME = 40;
var OBSTICLE_SPAWNER = OBSTICLE_COOLDOWN_TIME;
var obs = [];
var high = 0;
var not_paused_speed = 0
var paused = false;
var PLAYERcolor = "white";
var immortal = false;
var gold = 0;
var unicornEnabled = false;
var currentPlayerY = 0;
var yelocity = 0;
var menu = document.getElementById("pauseMenu")
var scoreTxt = document.getElementById("score")
var highTXT = document.getElementById("high")
var logs = document.getElementById("logs")
var convert = new converter;

var goldPer5 = parseInt(localStorage.koder09ObsGP5);

if (isNaN(goldPer5)){
	goldPer5 = 5;
}


class cube {
	constructor(color, cost) {
		this.color = color
		this.cost = cost
	}
	activate() {
		window.PLAYERcolor = this.color
	}
	buy() {
		if (window.gold >= this.cost) {
			if (typeof (Storage) !== "undefined") {
				gold = gold - this.cost
				// console.log(this.cost)
				// console.log(gold)
				localStorage.setItem("gold", gold)
				// Store
				localStorage.setItem(this.color + "Cube", "owned");
				// Retrieve
				logs.innerHTML = ">> Bought " + this.color + " Cube <br>" + window.logs.innerHTML
			}

			document.getElementById(this.color + "Cube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes." + this.color + ".activate()\">Equip</button>"
		} else {
			window.logs.innerHTML = ">> Insufficient recources <br>" + window.logs.innerHTML
		}
	}
}
// gp5
class goldUpgrades{
	upgrade(){
		if (window.gold >= 10 || window.goldPer5 > 100){
			window.goldPer5 += 1
			window.gold -= 10
			
			gold = Number(gold) + Number(Math.round(SCORE / goldPer5))
			if (isNaN(gold) == true){
				gold = 0;
			}
			Save()
			document.getElementById("goldCounter").innerHTML = "<i class=\"fas fa-coins fa-2x\"></i> <b>" + gold + "</b>"

			document.getElementById("gp5").style = 'width: ' + window.goldPer5 + '%'
			console.log(goldPer5)
			localStorage.koder09ObsGP5 = window.goldPer5

		} else {
			window.logs.innerHTML = ">> Insufficient recources or upgrade at max. <br>" + window.logs.innerHTML
		}
	}
}

var cubes = {
	"white": new cube("white", 0),
	"red": new cube("red", 10),
	"orange": new cube("orange", 20),
	"yellow": new cube("yellow", 30),
	"green": new cube("green", 40),
	"blue": new cube("blue", 50),
	"purple": new cube("purple", 60),
	"black": new cube("black", 70),
}
var goldgrades = new goldUpgrades()

//Game Functions
//Initlaizer function
function setUpNewGame() {
	OBSTICLES = [];
	SCROLL_SPEED = 2;
	GameOVER = true;

	SCORE = 0; //make the score 0

	PLAYER = {
		x: CANVAS.width / 4, //Set the player x corrodnate to the canvas width 	divided by 4
		y: GROUND_LEVEL - PLAYER_SIZE, //Set the player y corrodnate of the	ground minus the size of the player so that the player is not in the 	ground
		y_velocity: 0 //Set the up and down speed to 0
	};
}

//make a function to update the frame
function frameUpdate() {
	if (GameOVER === false) {
		updateGameState();
	}

	else { }

	drawGame();
	if (immortal == true) {
		gold = 0
	}
}

//make a function to draw the game
function drawGame() {
	drawBackground();
	drawPlayer();

	CTX.fillStyle = "orange"
	DRAW_OBSTICLES()


	if (high < SCORE) {
		high = SCORE
	}
	//check if the game is over an if so display a gamover message
	if (GameOVER) {
		CTX.font = "30px Arial";
		CTX.fillStyle = "orange"
		CTX.fillText("Press space or tap the screen to begin", 50, 60);
		CTX.font = "20px Arial";
		CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
		CTX.fillText("Score: " + SCORE + " High: " + high + " Speed: " + Math.round((SCROLL_SPEED + Number.EPSILON) * 100) / 100, 10, 30)

	}

	else {
		CTX.font = "20px Arial";
		CTX.fillStyle = "orange"
		if (immortal == true) {
			CTX.fillText("IMMORTAL CHEAT")
			CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
		} else {
			CTX.fillText("Score: " + SCORE + " High: " + high + " Speed: " + Math.round((SCROLL_SPEED + Number.EPSILON) * 100) / 100, 10, 30)
			CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
		}
	}
}

function drawBackground() {
	//sky
	CTX.beginPath();
	CTX.rect(0, 0, CANVAS.width, CANVAS.height);
	CTX.fillStyle = "blue";
	CTX.fill();
	//ground
	CTX.beginPath();
	CTX.rect(0, GROUND_LEVEL, CANVAS.width, CANVAS.height - GROUND_LEVEL);
	CTX.fillStyle = "green";
	CTX.fill();
}

function drawPlayer() {

	if (unicornEnabled === false) {
		CTX.beginPath();
		CTX.rect(PLAYER.x, PLAYER.y, PLAYER_SIZE, PLAYER_SIZE);
		CTX.fillStyle = PLAYERcolor;
		CTX.fill();
	} else if (unicornEnabled == true) {
		var grd = CTX.createLinearGradient(0, 0, 20, 0);
		grd.addColorStop(0, "red");
		grd.addColorStop(0.01, "orange");
		grd.addColorStop(0.02, "yellow");
		grd.addColorStop(0.03, "green");
		grd.addColorStop(0.04, "blue");
		grd.addColorStop(0.05, "purple");
		grd.addColorStop(0.06, "pink");
		CTX.fillStyle = grd;
		CTX.fillRect(PLAYER.x, PLAYER.y, PLAYER_SIZE, PLAYER_SIZE);
	}
}

function spawnObs() {
	var obs = {
		x: CANVAS.width, //CANVAS.width
		y: Math.random() * GROUND_LEVEL,
		height: Math.random() * 100 + PLAYER_SIZE
	};

	if (obs.x in OBSTICLES) {
		spawnObs()
		return
	} if (obs.y in OBSTICLES) {
		spawnObs()
		return
	} else {
		OBSTICLES.push(obs);
	}
}


function updateGameState() {
	PLAYER.y += PLAYER.y_velocity;


	if (PLAYER.y >= GROUND_LEVEL - PLAYER_SIZE) {
		PLAYER.y = GROUND_LEVEL - PLAYER_SIZE;
		PLAYER.y_velocity = 0;
	}

	else if (PLAYER.y <= 0) {
		PLAYER.y_velocity = 0.1;
		PLAYER.y = 0;
	}

	else {
		PLAYER.y_velocity += 0.1;
	}

	OBSTICLE_SPAWNER -= 1;

	if (OBSTICLE_SPAWNER < 1) {
		OBSTICLE_SPAWNER = (OBSTICLE_COOLDOWN_TIME + (Math.floor(Math.random() * 50))) //mabye add math.floor
		spawnObs()
	}
	//update obs postition and check for collision
	var length = OBSTICLES.length;

	while (length--) {
		var obs = OBSTICLES[length];
		obs.x -= SCROLL_SPEED;

		if (Math.abs(obs.x - PLAYER.x) < PLAYER_SIZE && PLAYER.y + PLAYER_SIZE > obs.y && PLAYER.y < obs.height + obs.y && paused == false && immortal == false) {
			GameOVER = true

			gold = Number(gold) + Number(Math.round(SCORE / goldPer5))
			if (isNaN(gold) == true){
				gold = 0;
			}
			Save()
			document.getElementById("goldCounter").innerHTML = "<i class=\"fas fa-coins fa-2x\"></i> <b>" + gold + "</b>"

		}

		if (obs.x < 0) {
			SCORE++;
			OBSTICLES.splice(length, 1);
			SCROLL_SPEED += Math.random() / 7;
		}
	}


}

function ActivateCode() {
	var codeInput = document.getElementById("code").value;

	if (codeInput === "2*dJG5^dAR") {
		immortal = true
		logs.innerHTML = ">> Used a code to make player immortal!" + logs.innerHTML
	} else if (codeInput === "!qgHVG64z%") {
		PLAYERcolor = "#ff2e69";
		logs.innerHTML = ">> Used a code to make player color #ff2e69." + logs.innerHTML
	}
}


function DRAW_OBSTICLES() {
	var length = OBSTICLES.length;

	while (length--) {
		var obs = OBSTICLES[length]
		CTX.beginPath()
		CTX.rect(obs.x, obs.y, PLAYER_SIZE, obs.height);
		CTX.fillStyle = "brown";
		CTX.fill()
	}

}

//event listener
document.addEventListener("keydown", function (event) {
	if (event.code == "Space") {
		console.log("Space key pressed.");

		if (paused === false) {
			if (GameOVER) {
				setUpNewGame();
				GameOVER = false;
			}

			else {
				PLAYER.y_velocity = -4;
			}
		} else { }
	}

	else {
		console.log("Space key not pressed.");
	}
}

);




function Save() {
	if (typeof (Storage) !== "undefined") {
		// Store
		localStorage.setItem("score", SCORE);
		localStorage.setItem("highscore", high)
		localStorage.setItem("gold", gold)
		// Retrieve
		logs.innerHTML = ">> Save sucessful <br>" + logs.innerHTML
	} else {
		logs.innerHTML = ">> Save unsupported <br>" + logs.innerHTML
	}
}


function Load() {
	if (typeof (Storage) !== "undefined") {
		// Retrieve
		SCORE = localStorage.getItem("score");
		high = localStorage.getItem("highscore")
		gold = Number(localStorage.getItem("gold"))
		if (isNaN(gold) === true) {
			gold = 0;
		}

		if (isNaN(high) == true) {
			high = 0;
		}
		highTXT.innerHTML = "High-score: " + high;
		scoreTxt.innerHTML = "Score: " + SCORE;

		if (localStorage.getItem("redCube") === "owned") {
			document.getElementById("redCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.red.activate()\">Equip</button>"
		}

		if (localStorage.getItem("orangeCube") === "owned") {
			document.getElementById("orangeCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.orange.activate()\">Equip</button>"
		}

		if (localStorage.getItem("yellowCube") === "owned") {
			document.getElementById("yellowCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.yellow.activate()\">Equip</button>"
		}

		if (localStorage.getItem("greenCube") === "owned") {
			document.getElementById("greenCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.green.activate()\">Equip</button>"
		}

		if (localStorage.getItem("blueCube") === "owned") {
			document.getElementById("blueCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.blue.activate()\">Equip</button>"
		}
		if (localStorage.getItem("purpleCube") === "owned") {
			document.getElementById("purpleCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.purple.activate()\">Equip</button>"
		}
		if (localStorage.getItem("blackCube") === "owned") {
			document.getElementById("blackCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:cubes.black.activate()\">Equip</button>"
		}
		logs.innerHTML = ">> Load sucessful <br>" + logs.innerHTML
	} else {
		logs.innerHTML = ">> Load unsupported <br>" + logs.innerHTML
	}
}


function RESET() {
	var con = confirm("Reset your game progress (this cannot be undone)")

	if (con === true) {
		localStorage.clear();
		console.log("cleared")
	}
}

function equipWhite() {
	PLAYERcolor = "white"
	logs.innerHTML = ">> Equipped White Cube <br>" + logs.innerHTML
}

function equipRed() {
	PLAYERcolor = "red"
	logs.innerHTML = ">> Equipped Red Cube <br>" + logs.innerHTML
}

function equipOrange() {
	PLAYERcolor = "orange"
	logs.innerHTML = ">> Equipped Orange Cube <br>" + logs.innerHTML
}

function equipYellow() {
	PLAYERcolor = "yellow"
	logs.innerHTML = ">> Equipped Yellow Cube <br>" + logs.innerHTML
}

function equipGreen() {
	PLAYERcolor = "green"
	logs.innerHTML = ">> Equipped Green Cube <br>" + logs.innerHTML
}

function equipBlue() {
	PLAYERcolor = "blue"
	logs.innerHTML = ">> Equipped Blue Cube <br>" + logs.innerHTML
}

function equipPurple() {
	PLAYERcolor = "purple"
	logs.innerHTML = ">> Equipped Purple Cube <br>" + logs.innerHTML
}

function equipBlack() {
	PLAYERcolor = "black"
	logs.innerHTML = ">> Equipped Black Cube <br>" + logs.innerHTML
}

function PausePlay() {

	if (paused === false) {
		not_paused_speed = SCROLL_SPEED;
		SCROLL_SPEED = 0;
		currentPlayerY = PLAYER.y

		paused = true
		menu.className = "container"
		CANVAS.style.display = "none"
		scoreTxt.innerHTML = "Score: " + SCORE;
		highTXT.innerHTML = "High-score: " + high;
		spawnObsOri = spawnObs;
		spawnObs = function () { }
	} else {
		SCROLL_SPEED = not_paused_speed;
		PLAYER.y = currentPlayerY;
		yelocity = PLAYER.y_velocity
		PLAYER.y_velocity = 0
		spawnObs = spawnObsOri;

		paused = false
		CANVAS.style.display = ""
		menu.className = "container hidden"
	}

}


function game() {
	GameOVER = true;
}


var el = document.getElementById('myCanvas')
var clickHandler = function () {
	if (paused === false) {
		if (GameOVER) {
			setUpNewGame();
			GameOVER = false;
		}

		else {
			PLAYER.y_velocity = -4;
		}
	} else { }
}




el.addEventListener('click', clickHandler)



//Run the game
//start a new game
Load()
document.getElementById("goldCounter").innerHTML = "<i class=\"fas fa-coins fa-2x\"></i> <b>" + gold + "</b>"

setUpNewGame();

//set the interval to update the frame
setInterval(frameUpdate, 10);