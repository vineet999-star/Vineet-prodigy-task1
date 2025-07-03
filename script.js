let [seconds, minutes, hours] = [0, 0, 0];
let timerDisplay = document.getElementById("display");
let timer = null;
let isRunning = false;


function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.innerText = `${h}:${m}:${s}`;
}

function startTimer() {
  if (!isRunning) {
    togglePauseResume(); // Starts the timer
  }
}

function togglePauseResume() {
  const btn = document.getElementById("pause-resume");

  if (!isRunning) {
    // Resume the timer
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      updateDisplay();
    }, 1000);
    isRunning = true;
    btn.innerText = "Pause";
  } else {
    // Pause the timer
    clearInterval(timer);
    timer = null;
    isRunning = false;
    btn.innerText = "Resume";
  }
}

function resetTimer() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  timer = null;
  isRunning = false;
  document.getElementById("pause-resume").innerText = "Pause"; // Reset button label
  document.getElementById("laps").innerHTML = "";
}

function lapTime() {
  const lapContainer = document.getElementById("laps");
  const lapBox = document.createElement("div");
  const lapNumber = lapContainer.children.length + 1;

  lapBox.className = "lap";
  lapBox.innerText = `Lap ${lapNumber}: ${timerDisplay.innerText}`;

  lapContainer.appendChild(lapBox);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause-resume").addEventListener("click", togglePauseResume);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", lapTime);

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = minutes * 6 + seconds * 0.1; // smooth move
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  document.getElementById("second-hand").style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById("minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById("hour-hand").style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // initial call

