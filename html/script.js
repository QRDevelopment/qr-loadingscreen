let currentTip = 0;
let progress = 0;

const loadingTips = [
    "Welcome to QR Development...",
    "Preparing your experience...",
    "Loading resources...",
    "Initializing world...",
    "Synchronizing data...",
    "Almost there..."
];

const videoElement = document.getElementById('backgroundVideo');
const progressElement = document.querySelector('.progress');
const progressNumber = document.getElementById('progress-number');
const loadingTip = document.querySelector('.loading-tip');

// Cycle through loading tips with fade effect
const updateTip = () => {
    loadingTip.style.opacity = '0';
    setTimeout(() => {
        currentTip = (currentTip + 1) % loadingTips.length;
        loadingTip.textContent = loadingTips[currentTip];
        loadingTip.style.opacity = '1';
    }, 500);
};

setInterval(updateTip, 3000);

// Simulate loading progress with smooth animation
const updateProgress = () => {
    if (progress >= 100) return;
    
    progress += Math.random() * 1.5;
    if (progress > 100) progress = 100;
    
    progressElement.style.width = `${progress}%`;
    progressNumber.textContent = Math.round(progress);
    
    if (progress < 100) {
        requestAnimationFrame(updateProgress);
    }
};

setTimeout(updateProgress, 1000);

// Listen for NUI messages from the game
window.addEventListener('message', (event) => {
    const data = event.data;
    
    if (data.type === 'setProgress') {
        progress = data.progress;
        progressElement.style.width = `${progress}%`;
        progressNumber.textContent = Math.round(progress);
    }
});

// Ensure video loops smoothly
videoElement.addEventListener('ended', () => {
    videoElement.currentTime = 0;
    videoElement.play().catch(error => console.log("Video replay failed:", error));
});