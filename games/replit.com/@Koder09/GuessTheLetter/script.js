var computerChoices = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z"
];

var guesses = 9
var wins = 0
var losses = 0
var triedletters = []
var letter = computerChoices[Math.floor(Math.random() * computerChoices.length)]


console.log(letter)

document.onkeyup = function (event) {
	var playerletter = event.key

	if (computerChoices.includes(playerletter)) {
		if (playerletter === letter) {
			wins++
			guesses = 9
			triedletters = []
			letter = computerChoices[Math.floor(Math.random() * computerChoices.length)]
			console.log(letter)
			alert("You win")
			console.log("Player Won!")
		}
		else {
			if (triedletters.includes(playerletter)) {
				alert("You allready tried that")
				return
			}
			else {
				guesses--;
				triedletters.push(playerletter)
			}
		}
		if (guesses === 0){
			losses++
			guesses = 9
			triedletters = []
			letter = computerChoices[Math.floor(Math.random() * computerChoices.length)]
			console.log(letter)
			alert("You lose")
		}
	}
	else {
		alert("Invalid Input. Retry.")
		return
	}

	document.getElementById("player-letter").textContent = ' ' + playerletter

	document.getElementById("win-counter").textContent = ' ' + wins

	document.getElementById("loss-counter").textContent = ' ' + losses

	document.getElementById("attempts").textContent = ' ' + triedletters

	document.getElementById("remaining").textContent = ' ' + guesses
	
}