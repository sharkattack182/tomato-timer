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



function startTimer(totalSeconds) {
// Write code to start the timer here
  var timerInterval = setInterval(function () {
    totalSeconds--;
    minutesDisplay.textContent = Math.floor(totalSeconds / 60);
    secondsDisplay.textContent = totalSeconds - Math.floor(totalSeconds / 60) * 60

    if (totalSeconds === 0) {
        clearInterval(timerInterval);
        alert("time is up")
    }

// If the timer is running the stop button will clear the timer and reset it
    stopButton.addEventListener("click", function() {
    var min = workMinutesInput.value
    clearInterval(timerInterval);
    minutesDisplay.textContent = min;
    secondsDisplay.textContent = "00"

})
}, 1000);
}

// This code runs the timer when the user hits play
playButton.addEventListener("click", function() {
    var time = workMinutesInput.value * 60;
    console.log(time);
    startTimer(time);
});


