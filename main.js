const mainForm = document.getElementById("main-form");
const numInput = document.getElementById("num-input");
const btnGuess = document.getElementById("btn-guess");
const info = document.getElementById("info");
const trys = document.getElementById("trys");

const nextLevelForm = document.getElementById("next-level");
const rangeOne = document.getElementById("range1");
const rangeTwo = document.getElementById("range2");
const btnRange = document.getElementById("btn-range");
const infoRange = document.getElementById("info-range");

const timer = document.getElementById("timer");
const secondsDisplay = document.getElementById("sec");

// build a function to get a random number between 'a' & 'b'
function getRandomNumberBetween(a, b) {
	// Generate a random number between 0 (inclusive) and 1 (exclusive)
	const random = Math.random();

	// Scale the random number to fit within the range [a, b]
	const range = b - a + 1;
	const scaledRandom = Math.floor(random * range);

	// Add 'a' to the scaled random number to shift it to the desired range
	const result = scaledRandom + a;

	if (a > b) {
		alert("Make the first input smaller than the second.");
	}

	return result;
}

let tries = 0;
let randomNumber = getRandomNumberBetween(0, 5);

function increaseTries() {
	tries++;
	trys.textContent = `Number of tries: ${tries}`;
}

class Timer {
	constructor() {
		this.seconds = 0;
		this.secondsDisplay = secondsDisplay;
		this.timerInterval = null;
	}

	startTimer() {
		if (!this.timerInterval) {
			this.timerInterval = setInterval(() => {
				this.seconds++;
				this.secondsDisplay.innerText = this.seconds;
			}, 1000);
		}
	}

	stopTimer() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerInterval = null;
		}
	}

	resetTimer() {
		this.stopTimer();
		this.seconds = 0;
		this.secondsDisplay.innerText = this.seconds;
	}
}

const myTimer = new Timer();

btnGuess.addEventListener("click", function (e) {
	e.preventDefault();

	if (numInput.value != "") {
		myTimer.startTimer();
		if (numInput.value == randomNumber) {
			myTimer.stopTimer();
			info.textContent = "Correct!!!";
			increaseTries();
			tries = null;
			trys.textContent = "";
			numInput.value = "";
			rangeOne.value = "";
			rangeTwo.value = "";
			infoRange.textContent = "";
			randomNumber = getRandomNumberBetween(0, 5);
			myTimer.secondsDisplay.innerText = myTimer.seconds; // Update the display with the final time
			secondsDisplay.style.color = "green";
			secondsDisplay.style.fontWeight = "bold";
			secondsDisplay.style.fontSize = "1.25em";
			setTimeout(() => {
				info.textContent = "";
			}, 500);
		} else if (numInput.value < randomNumber) {
			info.textContent = "Too Low!";
			increaseTries();
		} else if (numInput.value > randomNumber) {
			info.textContent = "Too High!";
			increaseTries();
		}
	} else {
		console.log(myTimer.seconds);
	}
});

btnRange.addEventListener("click", function (e) {
	randomNumber = getRandomNumberBetween(
		parseInt(rangeOne.value),
		parseInt(rangeTwo.value)
	);

	setTimeout(() => {
		infoRange.textContent = `The pc's random number is now between ${rangeOne.value} and ${rangeTwo.value}`;
	}, 500);
});
