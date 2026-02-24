//Variables


const searchbar = document.querySelector('.searchbar-container');
const profilecontainer = document.querySelector('.profile-container');
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = 'https://api.github.com/users/';
const noresults = get('no-results')
const btnmode = get('btn-mode')
const modetext = get('mode-text')
const modeicon = get('mode-icon')
const flame = get('flame')

const themeToggle = document.getElementById('theme-toggle');

function darkModeProperties() {
    root.setProperty('--lm-bg', '#111822')
    root.setProperty('--lm-bg-content', '#1B2533')
    root.setProperty('--lm-text', '#F3F4F6')
    root.setProperty('--lm-text-alt', '#9CA3AF')
    root.setProperty('--lm-shadow-xl', 'rgba(70,88,109,0.15)')

    if (modetext) modetext.innerText = "LIGHT";
    if (modeicon) modeicon.src = "./assets/icon-sun.svg"
    if (flame) flame.src = "icons/flameWhite.png";

    root.setProperty('--lm-icon-bg', 'brightness(1000%)')
    localStorage.setItem('darkModeSet', 'true')

    // Force sync the UI toggle state
    if (themeToggle) themeToggle.checked = true;
}

function lightModeProperties() {
    root.setProperty('--lm-bg', '#F6F8FF')
    root.setProperty('--lm-bg-content', '#e4eaff')
    root.setProperty('--lm-text', '#000')
    root.setProperty('--lm-text-alt', '#000')
    root.setProperty('--lm-shadow-xl', 'rgba(70, 88, 109, 0.25)')

    if (modetext) modetext.innerText = "DARK";
    if (modeicon) modeicon.src = "./assets/icon-moon.svg"
    if (flame) flame.src = "icons/flame.png";

    root.setProperty('--lm-icon-bg', 'brightness(100%)')
    localStorage.setItem('darkModeSet', 'false')

    // Force sync the UI toggle state
    if (themeToggle) themeToggle.checked = false;
}

// Initialize Theme on Load
let savedTheme = localStorage.getItem('darkModeSet');
if (savedTheme === 'false') {
    lightModeProperties();
} else {
    darkModeProperties(); // Default to dark mode
}

// Event listener for toggle interaction
if (themeToggle) {
    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            darkModeProperties()
        } else {
            lightModeProperties()
        }
    });
}

// First-Time User Tutorial Setup
function startTutorial() {
    introJs().setOptions({
        showProgress: false,
        showBullets: false,
        scrollToElement: false,
        tooltipClass: 'custom-intro',
        nextLabel: 'Next',
        prevLabel: 'Back',
        doneLabel: 'Got it!'
    }).oncomplete(function () {
        // Mark tutorial as completed so it doesn't auto-play again
        localStorage.setItem('tutorialCompleted', 'true');
    }).onexit(function () {
        // Also mark as completed if they exit early
        localStorage.setItem('tutorialCompleted', 'true');
    }).start();
}

// Auto-play tutorial on very first initial load
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('tutorialCompleted')) {
        // Small delay to ensure DOM and fonts have settled
        setTimeout(startTutorial, 500);
    }
});
