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
    if (playerInputAllowed) {
        playerOrder.push(1);
        lightPad('greenPad', 'lightgreen');
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
})

redPad.addEventListener('click', (e) => {
    if (playerInputAllowed) {
        playerOrder.push(2);
        lightPad('redPad', 'tomato');
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
})

yellowPad.addEventListener('click', (e) => {
    if (playerInputAllowed) {
        playerOrder.push(3);
        lightPad('yellowPad', 'yellow');
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
})

bluePad.addEventListener('click', (e) => {
    if (playerInputAllowed) {
        playerOrder.push(4);
        lightPad('bluePad', 'lightskyblue');
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
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
        // console.log('Computer flashes: ', compOrder[flashNumber]);
        switch (compOrder[flashNumber]) {
            case 1:
                lightPad('greenPad', 'lightgreen');
                break;
            case 2:
                lightPad('redPad', 'tomato');
                break;
            case 3:
                lightPad('yellowPad', 'yellow');
                break;
            case 4:
                lightPad('bluePad', 'lightskyblue');
        }
        flashNumber++;
        setTimeout(() => {
            clearPads();
        }, 300);
    }

    // Player's Turn
    if (flashNumber == round) {
        clearInterval(intervalId);
        // clearPads();
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
        win = true;
        playerInputAllowed = false;
        flashPads();
        // alert('YOU WIN!');
    }
    // if current guess is correct, not end of game, and last guess of round
    else if (round == playerOrder.length) {
        console.log("That's right!");
        round++;
        reset();
    }
}

function lightPad(selector, color) {
    eval(selector).style.backgroundColor = color;
}

function flashPads() {
    lightPad('greenPad', 'lightgreen');
    lightPad('redPad', 'tomato');
    lightPad('yellowPad', 'yellow');
    lightPad('bluePad', 'lightskyblue');
}

function clearPads() {
    lightPad('greenPad', 'darkgreen');
    lightPad('redPad', 'darkred');
    lightPad('yellowPad', 'goldenrod');
    lightPad('bluePad', 'darkblue');
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
