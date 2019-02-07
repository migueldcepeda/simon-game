// VARIABLES
let powerOn;
let strict;
let playerInputAllowed;
let playerTurn;
let compTurn;
let compOrder;
let playerOrder;
let round;
let flashNumber;
let intervalId;
let correct;
let win;

// pads
const greenPad = document.querySelector('.pads__top-left');
const redPad = document.querySelector('.pads__top-right');
const yellowPad = document.querySelector('.pads__bottom-left');
const bluePad = document.querySelector('.pads__bottom-right');

// controls
const startButton = document.querySelector('.start__btn');
const strictButton = document.getElementById('mode__btn');
const powerSwitch = document.getElementById('power__switch');
const countScreen = document.querySelector('.count__screen')


// EVENT LISTENERS
powerSwitch.addEventListener('click', (e) => {
    if (powerSwitch.checked) {
        powerOn = true;
        console.log('Power On');
    }
    else {
        powerOn = false;
        console.log('Power Off');
    }
});

strictButton.addEventListener('click', (e) => {
    if (strictButton.checked) {
        strict = true;
    }
    else {
        strict = false;
    }
});

startButton.addEventListener('click', (e) => {
    if(powerOn) {
        runGame();
    }
});

greenPad.addEventListener('click', (e) => {
    playerOrder.push(1);
    check();
})

redPad.addEventListener('click', (e) => {
    playerOrder.push(2);
    check();
})

yellowPad.addEventListener('click', (e) => {
    playerOrder.push(3);
    check();
})

bluePad.addEventListener('click', (e) => {
    playerOrder.push(4);
    check();
})


// FUNCTIONS
function runGame() {
    init();
    reset();
}

function gameRound() {
    console.log(`Round: ${round}`)
    playerInputAllowed = false;

    // Computer's Turn
    if (compTurn) {
        console.log('Computer flashes: ', compOrder[flashNumber]);
        flashNumber++;
    }

    // Player's Turn
    if (flashNumber == round) {
        clearInterval(intervalId);
        compTurn = false;
        playerInputAllowed = true;
    }
}

// check
function check() {
    let currGuess = playerOrder.length - 1;
    // check if current guess is incorrect
    if (playerOrder[currGuess] !== compOrder[currGuess]){
        console.log('That was incorrect');
        strict ? runGame() : reset();
    }
    // if current guess is correct and end of game, YOU WIN!
    else if (playerOrder.length == compOrder.length) {
        console.log('YOU WIN!');
    }
    // if current guess is correct, not end of game, and last guess of round
    else if (round == playerOrder.length) {
        console.log("That's right!");
        round++;
        reset();
    }
}

function init() {
    compOrder = [];
    for (let i = 0; i < 3; i++){
        compOrder.push(Math.floor(Math.random() * 4) + 1);
    }
    round = 1;
    win = false;
    console.log('Computer Order: ', compOrder);
}

function reset() {
    correct = true;
    playerOrder = [];
    flashNumber = 0;
    compTurn = true;
    intervalId = setInterval(gameRound, 800);
}
