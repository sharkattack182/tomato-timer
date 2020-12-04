var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var status = "Working";

function formatMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft / 60);
    var formattedMinutes;

    if (minutesLeft < 10) {
        formattedMinutes = "0" + minutesLeft;
    } else {
        formattedMinutes = minutesLeft;
    }

    return formattedMinutes;
}

function formatSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;

    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
}

function setTime() {
    var minutes;

    if (status === "Working") {
        minutes = workMinutesInput.value.trim();
    } else {
        minutes = restMinutesInput.value.trim();
    }

    clearInterval(interval);
    totalSeconds = minutes * 60;
}

function renderTime() {
    minutesDisplay.textContent = formatMinutes();
    secondsDisplay.textContent = formatSeconds();

    if (secondsElapsed >= totalSeconds) {
        if (status === "Working") {
            alert("Take a break");
        } else {
            alert("Lets get back to work");
        }

        stopTimer();
    }
}

function startTimer() {
    setTime();
    if(totalSeconds > 0) {
        interval = setInterval(function() {
            secondsElapsed++;
            renderTime();

        }, 1000);
    } else {
        alert("Timer must be more than zero");
    }
}



playButton.addEventListener("click", startTimer);