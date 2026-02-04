/* --- LOADING LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loadingText = document.getElementById('loading-text');
    
    const phrases = [
        "Checking net height...",
        "Staying out of the kitchen...",
        "Zero, Zero, Two...",
        "Polishing paddles...",
        "Looking for foot faults..."
    ];

    let phraseIndex = 0;
    
    // Cycle text every 1.2 seconds
    const textInterval = setInterval(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        
        // Fade out
        loadingText.style.opacity = 0;
        
        // Change text and fade in after 200ms
        setTimeout(() => {
            loadingText.innerText = phrases[phraseIndex];
            loadingText.style.opacity = 1;
        }, 200);
    }, 1200);

    // Force hide loader after exactly 5 seconds
    setTimeout(() => {
        clearInterval(textInterval); // Stop text cycling
        loader.style.opacity = '0';  // Fade out CSS
        loader.style.visibility = 'hidden'; // Ensure it's unclickable
        
        // Actually remove display after transition finishes
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); 
    }, 5000);
});

/* --- DOM ELEMENTS --- */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menuBtn');
const elScore1 = document.getElementById('score1');
const elScore2 = document.getElementById('score2');
const elServerBtn = document.getElementById('serverNum');
const elCard1 = document.getElementById('team1');
const elCard2 = document.getElementById('team2');
const resetBtn = document.getElementById('resetBtn');

/* --- STATE --- */
let score1 = 0;
let score2 = 0;
let currentServer = 1;

/* --- SIDEBAR LOGIC --- */
function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

menuBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeSidebar();
    }
});

/* --- SCORE LOGIC --- */
function updateScore(team) {
    if (team === 1) {
        score1++;
        elScore1.innerText = score1;
    } else {
        score2++;
        elScore2.innerText = score2;
    }
}

// Add Click Listeners to Cards
elCard1.addEventListener('click', () => updateScore(1));
elCard2.addEventListener('click', () => updateScore(2));


/* --- SERVER LOGIC --- */
function toggleServer() {
    // Toggle between 1 and 2
    currentServer = currentServer === 1 ? 2 : 1;
    elServerBtn.innerText = currentServer;

    // Visual feedback (Green border when clicked)
    elServerBtn.style.borderColor = 'var(--accent-color)';
    elServerBtn.style.color = 'var(--accent-color)';
    
    // Reset color after 300ms for a "flash" effect
    setTimeout(() => {
        elServerBtn.style.borderColor = 'var(--divider)';
        elServerBtn.style.color = 'var(--text-primary)';
    }, 300);
}

elServerBtn.addEventListener('click', toggleServer);

/* --- SERVING TEAM TOGGLE (Context Menu) --- */
function setServingTeam(team) {
    if(team === 1) {
        elCard1.classList.add('serving');
        elCard2.classList.remove('serving');
    } else {
        elCard2.classList.add('serving');
        elCard1.classList.remove('serving');
    }
    // Reset server number to 1 when side switches
    currentServer = 1;
    elServerBtn.innerText = 1;
}

// Prevent default context menu and switch serving team
elCard1.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    setServingTeam(1);
});

elCard2.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    setServingTeam(2);
});

/* --- RESET LOGIC --- */
function resetMatch() {
    score1 = 0;
    score2 = 0;
    currentServer = 1;
    
    elScore1.innerText = 0;
    elScore2.innerText = 0;
    elServerBtn.innerText = 1;
    
    closeSidebar();
}

resetBtn.addEventListener('click', resetMatch);
