let isRunning = false;
let lapCount = 1;
let interval;
let startTime;
let lapTime;
let lapList = [];

const startStopButton = document.getElementById("startStop");
const lapResetButton = document.getElementById("lapReset");

// Initial button styles
lapResetButton.style.backgroundColor = "#f1c40f";
startStopButton.style.backgroundColor = "green";

// Add hover effect for Start/Stop button
// Hover Over
startStopButton.addEventListener("mouseover", function () {
  if (isRunning){
    startStopButton.style.backgroundColor = "#dc3545"; // shade of Red
  } 
  else{
    if(startStopButton.textContent === "Continue"){
      startStopButton.style.backgroundColor = "#007bff"; // shade of Blue
    }
    else {
      startStopButton.style.backgroundColor = "#28a745"; // shade of Green
    }
  }
});

// Hover Out
startStopButton.addEventListener("mouseout", function () {
  if (isRunning){
    startStopButton.style.backgroundColor = "red"; // Red
  }
  else{
    if(startStopButton.textContent === "Continue"){
      startStopButton.style.backgroundColor = "blue"; // Blue
    }
    else {
      startStopButton.style.backgroundColor = "green"; // Green
    }
  }
});

// Add hover effect for Lap/Reset button
// Hover Over
lapResetButton.addEventListener("mouseover", function () {
  if (lapResetButton.textContent === "Lap") {
    lapResetButton.style.backgroundColor = "#f7dc6f"; // Yellow
  }
  else {
    lapResetButton.style.backgroundColor = "#e9ecef"; // shade of Gray
  }
});

// Hover Out
lapResetButton.addEventListener("mouseout", function () {
  if (lapResetButton.textContent === "Lap") {
    lapResetButton.style.backgroundColor = "#f1c40f"; // Yellow
  }
  else {
    lapResetButton.style.backgroundColor = "#ced4da"; // Gray
  }
});

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    startStopButton.textContent = "Continue";
    startStopButton.style.backgroundColor = "blue";
    lapResetButton.textContent = "Reset";
    lapResetButton.style.backgroundColor = "#ced4da";
    lapResetButton.disabled = false;
  } else {
    startTime = Date.now() - (lapTime || 0);
    interval = setInterval(updateStopwatch, 10);
    startStopButton.textContent = "Stop";
    startStopButton.style.backgroundColor = "red";
    lapResetButton.textContent = "Lap";
    lapResetButton.style.backgroundColor = "#f1c40f";
    lapResetButton.disabled = false;
  }

  isRunning = !isRunning;
}

function updateStopwatch() {
  const currentTime = Date.now();
  lapTime = currentTime - startTime;
  displayTime(lapTime);
}

function displayTime(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor(time % 1000)).padStart(3, "0");

  document.getElementById("stopwatch").textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function lapReset() {
  const lapResetButton = document.getElementById("lapReset");
  if (isRunning) {
    const lapTimeDisplay = lapTime;
    lapList.push(lapTimeDisplay);
    displayLaps();
  } else {
    clearInterval(interval);
    startStopButton.textContent = "Start";
    startStopButton.style.backgroundColor = "green";
    lapResetButton.textContent = "Lap";
    lapResetButton.style.backgroundColor = "#f1c40f";
    lapResetButton.disabled = true;
    displayTime(0);
    lapCount = 1;
    lapList = [];
    displayLaps();
  }
}

function displayLaps() {
  const lapListDiv = document.getElementById("lapList");
  lapListDiv.innerHTML = "";

  lapList.forEach((lapTime, index) => {
    const lapDisplay = document.createElement("div");
    lapDisplay.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
    lapListDiv.appendChild(lapDisplay);
  });

  // Height of the main-container based on the number of lap elements
  const mainContainer = document.getElementById("main-container");
  const lapElementsCount = lapList.length;
  const updatedHeight = 40 + lapElementsCount * 2;
  mainContainer.style.height = `${updatedHeight}vh`;
}

function formatTime(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor(time % 1000)).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
