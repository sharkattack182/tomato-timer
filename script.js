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

function pauseTimer() {
    clearInterval(interval);
    renderTime();
}

function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
}

function toggleStatus(e) {
    var checked = e.target.checked;
    if(checked) {
        status = "Working";
    } else {
        status = "Resting"
    }

    statusSpan.textContent = status;
    secondsElapsed = 0;

    setTime();
    renderTime();
}

function getTimePreferences() {
    var preferences = JSON.parse(localStorage.setItem("preferences"));

    if (preferences) {
        workMinutesInput.value = preferences.workMinutes;
    }
    if(preferences.restMinutes) {
        restMinutesInput.value = preferences.restMinutes;
    }
    
    setTime();
    renderTime();
}

function setTimePreferences() {
    localStorage.setItem(
        "preferences",
        JSON.stringify({
            workMinutes: workMinutesInput.value.trim(),
            restMinutes: restMinutesInput.value.trim()
        })
    );
}

playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);
inputs.addEventListener("change", setTimePreferences);
inputs.addEventListener("keyup", setTimePreferences);