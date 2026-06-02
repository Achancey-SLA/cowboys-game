const startButton = document.getElementById("startButton");
const gunButton = document.getElementById("gunButton");
const loadButton = document.getElementById("loadButton");
const shieldButton = document.getElementById("shieldButton");
const bulletsCounter = document.getElementById("bulletsCounter");
const scoreCounter = document.getElementById("scoreCounter");
const socket = io();
var bullets = 0;
var score = 0;
var enemyScore = 2;

startButton.addEventListener("click", startGame);
gunButton.addEventListener("click", gunAction);
loadButton.addEventListener("click", loadAction);
console.log("page loaded");
gunButton.disabled = true;
gunButton.style.opacity = 0.5;
loadButton.disabled = true;
loadButton.style.opacity = 0.5;
shieldButton.disabled = true;
shieldButton.style.opacity = 0.5;


function startGame() {
    console.log("Game Started");
    startButton.style.display = "none";
    loadButton.disabled = false;
    loadButton.style.opacity = 1;
    shieldButton.disabled = false;
    shieldButton.style.opacity = 1;
        const message = document.getElementById("usernameInput").value.trim();
    if (message) {
        // Emit the message to the server
        socket.emit('chat message', message);
            // Clear the input
             document.getElementById("usernameInput").value = '';
         }

}
function gunAction() {
    console.log("Gun Button Clicked");
    bullets--;
    bulletsCounter.textContent = bullets;
    if (bullets == 0) {
        gunButton.disabled = true;
        gunButton.style.opacity = 0.5;
    }
    if(bullets < 6) {
        loadButton.disabled = false;
        loadButton.style.opacity = 1;
    }
}
function loadAction() {
    console.log("Load Button Clicked");
    bullets++;
    bulletsCounter.textContent = bullets;
    if (bullets > 0) {
        gunButton.disabled = false;
        gunButton.style.opacity = 1;
    }
    if (bullets >5) {
        loadButton.disabled = true;
        loadButton.style.opacity = 0.5;

    }
}