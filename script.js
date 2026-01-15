const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

const timeDisplay = document.getElementById('time');
const customTimeInput = document.getElementById('custom-minutes');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Setup SVG Ring
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = 0;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Audio Context for Beep
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // Slide up to A5

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
}

// Timer Logic
let totalTime = 25 * 60;
let timeLeft = totalTime;
let timerId = null;
let isRunning = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = formatTime(timeLeft);

    const percent = Math.max(0, (timeLeft / totalTime) * 100);
    setProgress(percent);

    if (timeLeft <= 0) {
        clearInterval(timerId);
        timerId = null;
        isRunning = false;
        timeLeft = 0;
        setProgress(0);
        playBeep();
        startBtn.hidden = false;
        pauseBtn.hidden = true;
    }
}

function setCustomTime() {
    if (isRunning) return; // Don't change while running

    let mins = parseInt(customTimeInput.value);
    if (isNaN(mins) || mins < 1) mins = 1;
    if (mins > 120) mins = 120; // Cap at 2 hours for sanity

    totalTime = mins * 60;
    timeLeft = totalTime;
    timeDisplay.textContent = formatTime(timeLeft);
    setProgress(100);
}

function startTimer() {
    if (isRunning) return;

    // Resume audio context if needed (browsers block auto-audio)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    isRunning = true;
    startBtn.hidden = true;
    pauseBtn.hidden = false;
    customTimeInput.disabled = true; // Disable input while running

    timerId = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(timerId);
    startBtn.hidden = false;
    pauseBtn.hidden = true;
    customTimeInput.disabled = false;
}

function resetTimer() {
    pauseTimer();
    setCustomTime(); // Resets to whatever is in the input
    customTimeInput.disabled = false;
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
customTimeInput.addEventListener('change', setCustomTime);

// Initial Render
setCustomTime();
