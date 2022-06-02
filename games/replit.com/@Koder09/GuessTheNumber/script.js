var codeToDisplay = ""
var code = "";
var logs = document.getElementById('logs')
var input = document.getElementById("input")
var one = document.getElementById("1")
var two = document.getElementById("2")
var three = document.getElementById("3")
var four = document.getElementById("4")
var five = document.getElementById("5")
var six = document.getElementById("6")
var seven = document.getElementById("7")
var eight = document.getElementById("8")
var nine = document.getElementById("9")
var zero = document.getElementById("0")

function refresh(){
	if (code.length == 4) {
		input.textContent = codeToDisplay;
		if (code == "1234"){
			logs.innerHTML = "You won <br>" + logs.innerHTML
			code = ''
			codeToDisplay = ''
		} else {
			logs.innerHTML = "You lost <br>" + logs.innerHTML
			code = ''
			codeToDisplay = ''
		}
	} else if (code.length == 3) {
		input.textContent = codeToDisplay + "_";
	} else if (code.length == 2) {
		input.textContent = codeToDisplay + "_ " + "_"; 
	} else if (code.length == 1) {
		input.textContent = codeToDisplay + "_ " + "_ " + "_";
	}
}

function oneClicked() {
	console.log("1 was clicked")
	codeToDisplay = codeToDisplay + "1 ";
	code = code + "1"
	refresh()
}
function twoClicked() {
	console.log("2 was clicked")
	codeToDisplay = codeToDisplay + "2 ";
	code = code + "2"
	refresh()
}
function threeClicked() {
	console.log("3 was clicked")
	codeToDisplay = codeToDisplay + "3 ";
	code = code + "3"
	refresh()
}
function fourClicked() {
	console.log("4 was clicked")
	codeToDisplay = codeToDisplay + "4 ";
	code = code + "4"
	refresh()
}
function fiveClicked() {
	console.log("5 was clicked")
	codeToDisplay = codeToDisplay + "5 ";
	code = code + "5"
	refresh()
}
function sixClicked() {
	console.log("6 was clicked")
	codeToDisplay = codeToDisplay + "6 ";
	code = code + "6"
	refresh()
}
function sevenClicked() {
	console.log("7 was clicked")
	codeToDisplay = codeToDisplay + "7 ";
	code = code + "7"
	refresh()
}
function eightClicked() {
	console.log("8 was clicked")
	codeToDisplay = codeToDisplay + "8 ";
	code = code + "8"
	refresh()
}
function nineClicked() {
	console.log("9 was clicked")
	codeToDisplay = codeToDisplay + "9 ";
	code = code + "9"
	refresh()
}
function zeroClicked() {
	console.log("0 was clicked")
	codeToDisplay = codeToDisplay + "0 ";
	code = code + "0"
	refresh()
}

one.onclick = function() {oneClicked()}
two.onclick = function() {twoClicked()}
three.onclick = function() {threeClicked()}
four.onclick = function() {fourClicked()}
five.onclick = function() {fiveClicked()}
six.onclick = function() {sixClicked()}
seven.onclick = function() {sevenClicked()}
eight.onclick = function() {eightClicked()}
nine.onclick = function() {nineClicked()}
zero.onclick = function() {zeroClicked()}