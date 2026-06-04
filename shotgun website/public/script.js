const startButton = document.getElementById("startButton");
const gunButton = document.getElementById("gunButton");
const loadButton = document.getElementById("loadButton");
const shieldButton = document.getElementById("shieldButton");
const bulletsCounter = document.getElementById("bulletsCounter");
const scoreCounter = document.getElementById("scoreCounter");
const infoText = document.getElementById("infoText");
const socket = io();
const enemyNameText = document.getElementById("enemyName");
const scoreText = document.getElementById("scoreCounter");
var madeChoice = false;
var recievedEnemyChoice = false;
var enemyName = "";
var wantToPlay = false;
var playing = false;
var bullets = 0;
var score = 3;
var enemyScore = 3;
var username = "";
var action = "";
var enemyAction = "";
scoreText.textContent = "Lives: "+score+" - "+enemyScore;

startButton.addEventListener("click", startGameButton);
gunButton.addEventListener("click", gunAction);
loadButton.addEventListener("click", loadAction);
shieldButton.addEventListener("click", shieldAction);
console.log("page loaded");
startButton.disabled = true;
startButton.style.opacity = 0.5;
gunButton.disabled = true;
gunButton.style.opacity = 0.5;
loadButton.disabled = true;
loadButton.style.opacity = 0.5;
shieldButton.disabled = true;
shieldButton.style.opacity = 0.5;



document.getElementById("usernameInput").addEventListener("input", function() {
    startButton.disabled = false;
    startButton.style.opacity = 1;
});

function startGameButton() {
    console.log("Game Started");
    startButton.style.display = "none";
    username = document.getElementById("usernameInput").value.trim().replace(" ", "_");
    const message = username;
        // Emit the message to the server
    socket.emit('start', message);
    wantToPlay = true;
            // Clear the input
    document.getElementById("usernameInput").value = '';

    infoText.textContent = "waiting for opponent as "+username+"...";

}
function startGame() {
    console.log("Game Started");
    startButton.style.display = "none";
    infoText.textContent = "matched against "+enemyName+", make your move";
    enemyNameText.textContent = enemyName;
    playing = true;
    wantToPlay = false;
    startTurn();
}

function endTurn() {
    socket.emit(action,username);
    madeChoice = true;
    gunButton.disabled = true;
    gunButton.style.opacity = 0.5;
    loadButton.disabled = true;
    loadButton.style.opacity = 0.5;
    shieldButton.disabled = true;
    shieldButton.style.opacity = 0.5;
}
function startTurn() {
    if(bullets > 0){
        gunButton.disabled = false;
        gunButton.style.opacity = 1;
    }
    if(bullets < 6) {
        loadButton.disabled = false;
        loadButton.style.opacity = 1;
    }
    shieldButton.disabled = false;
    shieldButton.style.opacity = 1;
}

function handleActions() {
    if(action == "shoot"){
        
    }
    if(enemyAction == "shoot"){
        infoText.textContent = "you both shoot, the bullets collide in mid air";
    }
}

socket.on('shoot', (msg) => {
    if(msg == enemyName){
        console.log("Shoot action received from:", msg);
        enemyAction = "shoot";
        recievedEnemyChoice = true;
        if(madeChoice){
            handleActions();
        }

    }
});
socket.on('load', (msg) => {
    if(msg == enemyName){
        console.log("Load action received from:", msg);
        enemyAction = "load";
        recievedEnemyChoice = true;
        if(madeChoice){
            handleActions();
        }
    }
});
socket.on('shield', (msg) => {
    if(msg == enemyName){
        console.log("Shield action received from:", msg);
        enemyAction = "shield";
        recievedEnemyChoice = true;
        if(madeChoice){
            handleActions();
        }
    }
});

socket.on('start', (msg) => {
    console.log(msg);
    if(msg != username && wantToPlay){
        enemyName = msg;
        socket.emit('confirm', username);
        startGame();
    }
});

socket.on('confirm', (msg) => {
    console.log(msg);
    if(msg != username){
        playing = true;
        enemyName = msg;
        startGame();
    }
});


socket.on('chat message', (msg) => {
    console.log(msg);
});

function gunAction() {
    console.log("Gun Button Clicked");
    bullets--;
    bulletsCounter.textContent = bullets;
    action = "shoot";
    endTurn();
}
function loadAction() {
    console.log("Load Button Clicked");
    bullets++;
    bulletsCounter.textContent = bullets;
    action = "load";
    endTurn();
}
function shieldAction() {
    console.log("Shield Button Clicked");
    action = "shield";
    endTurn();
}