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

let audioGreen = document.getElementById('greenClip');
let audioRed = document.getElementById('redClip');
let audioYellow = document.getElementById('yellowClip');
let audioBlue = document.getElementById('blueClip');

// controls
const startButton = document.querySelector('.start__btn');
const strictButton = document.getElementById('mode__switch');
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
        lightPad('greenPad', 'lightgreen', audioGreen);
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
})

redPad.addEventListener('click', (e) => {
    if (playerInputAllowed) {
        playerOrder.push(2);
        lightPad('redPad', 'tomato', audioRed);
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
})

yellowPad.addEventListener('click', (e) => {
    if (playerInputAllowed) {
        playerOrder.push(3);
        lightPad('yellowPad', 'yellow', audioYellow);
        check();
        setTimeout(() => {
            clearPads();
        }, 200);
    }
})

bluePad.addEventListener('click', (e) => {
    if (playerInputAllowed) {
        playerOrder.push(4);
        lightPad('bluePad', 'lightskyblue', audioBlue);
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
                lightPad('greenPad', 'lightgreen', audioGreen);
                break;
            case 2:
                lightPad('redPad', 'tomato', audioRed);
                break;
            case 3:
                lightPad('yellowPad', 'yellow', audioYellow);
                break;
            case 4:
                lightPad('bluePad', 'lightskyblue', audioBlue);
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

function lightPad(selector, color, audioClip) {
    eval(selector).style.backgroundColor = color;
    if (audioClip !== null) {
        audioClip.play();
    }
}

function flashPads() {
    lightPad('greenPad', 'lightgreen', audioGreen);
    setTimeout(lightPad('redPad', 'tomato', audioRed), 1000);
    setTimeout(lightPad('yellowPad', 'yellow', audioYellow), 4000);
    setTimeout(lightPad('bluePad', 'lightskyblue', audioBlue), 7000);
}

function clearPads() {
    lightPad('greenPad', 'darkgreen', null);
    lightPad('redPad', 'darkred', null);
    lightPad('yellowPad', 'goldenrod', null);
    lightPad('bluePad', 'darkblue', null);
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
