let turns = 0
turn.innerText = turns;
const gameContainer = document.getElementById("game");
const animalGifs = ['/Photos/1.gif','/Photos/2.gif','/Photos/3.gif','/Photos/4.gif','/Photos/5.gif','/Photos/6.gif','/Photos/7.gif','/Photos/8.gif','/Photos/9.gif','/Photos/10.gif','/Photos/11.gif','/Photos/12.gif'];
const bestbtn = document.querySelector('.bestbtn');
const start = document.querySelector('button');
const score = document.querySelector('#score');
const record = document.querySelector('#best');
const startForm = document.querySelector('form');
const letsGo = document.querySelector('form button');
const playerNum = document.querySelector('#playerInput');
const cardNum = document.querySelector('#numInput');
const matchNum = cardNum.value/2;
const cardType = document.querySelector('select');
let best = parseInt(localStorage.getItem('bestScore'));
getBestScore()

function getBestScore() {
    if (localStorage.getItem('bestScore') === null) {
        record.innerText = ''
    }
    else {
        record.innerText = best;
    }
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

function arrayBuilder() {
    if(cardType === 'color'){
        for (let i = 0; i < cardNum.value; i++) {
            let color = randomColor();
            arr.push(color);
            arr.push(color);
        }
    }
    else if(cardType.value === 'animal'){
        let animals = shuffle(animalGifs);
        for(let i = 0; i < cardNum.value; i++){
            arr.push(animals[i]);
            arr.push(animals[i]);
        }
    }
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function createDivsForArr(colorArray) {
    for (let i = 0; i < colorArray.length; i++) {
        const newDiv = document.createElement("article");
        newDiv.classList.add(colorArray[i]);
        newDiv.id = `a${i}`;
        newDiv.title = 'Inactive'
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

function createImgsForAnimals(array){
    for (let i = 0; i < array.length; i++) {
        const newImg = document.createElement("img");
        newImg.classList.add(array[i]);
        newImg.id = `a${i}`;
        newImg.title = 'Inactive'
        newImg.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

function handleCardClick(e) {
    let mClick = matchClick(e);
    if (mClick === true) {
        return
    }
    let second = secondCheck();
    if (second.secondCard === true) {
        let first = document.querySelector(`#${second.firstCard}`);
        if (e.target.id === first.id) {
            return
        }
        let match = matchCheck(e, second);
        isSecond(e, first, match);
    }
    else {
        isFirst(e);
    }
}

//checks to see if click is second of turn
function secondCheck() {
    let second = {
        secondCard: false
    }
    for (let i = 0; i < arr.length; i++) {
        let color = document.querySelector(`#a${i}`);
        if (color.title === 'Active') {
            second = {
                secondCard: true,
                firstCard: color.id
            }
            break
        }
    }
    return second
}

//checks for matching class names
function matchCheck(e, obj) {
    let match = false;
    if (e.target.className === document.querySelector(`#${obj.firstCard}`).className) {
        match = true
    }
    return match
}

//Turns card,changes div title to "Active" 
function isFirst(e) {
    e.target.style.backgroundColor = e.target.className;
    e.target.title = 'Active';
}


function isSecond(e, first, match) {
    first.title = 'Inactive';
    turns += 1;
    document.querySelector('#turn').innerText = turns;
    if (match) {
        e.target.style.backgroundColor = e.target.className;
        e.target.title = 'match';
        first.title = 'match';
        let message = document.createElement('h2');
        message.innerText = 'MATCH';
        gameContainer.appendChild(message);
        setTimeout(function () {
            message.remove()
        }, 1500);
    }
    else {
        e.target.style.backgroundColor = e.target.className;
        setTimeout(function () {
            e.target.style.backgroundColor = null;
            first.style.backgroundColor = null;

        }, 1000)
    }
    for (let i = 0; i < arr.length; i++) {
        let color = document.querySelector(`#a${i}`);
        if (color.title !== 'match') {
            return
        }
    }
    setTimeout(function () {
        gameOver();
    }, 1700)
}

function gameOver() {
    let winner = document.createElement('h2');
    let bestScore = JSON.parse(localStorage.getItem('bestScore'))
    if (bestScore === null || turns < bestScore) {
        localStorage.setItem('bestScore', JSON.stringify(turns));
        record.innerText = turns;
        best = turns;
        winner.innerText = `New Best: ${turns} Turns!`
    }
    else {
        winner.innerText = `You Won in ${turns} Turns!`;
    }
    gameContainer.appendChild(winner);
}


start.addEventListener('click', function () {
    startForm.classList.toggle('gone')
})

startForm.addEventListener('submit', function(e){
    e.preventDefault();
    startForm.classList.toggle('gone');
    startGame()
})

function smoothTransition() {
    turns = 0
    turn.innerText = turns;
    let oldGame = document.querySelectorAll('article');
    for (let card of oldGame) {
        card.style.backgroundColor = 'lightskyblue';
        setTimeout(function () {
            card.remove()
        }, 750);
    }
    arrayBuilder();
    let shuffledArr = shuffle(arr);
    createDivsForArr(shuffledArr);
}

//checks if there is currently a game in progress
function gameInProgress() {
    let currentGame = document.querySelectorAll('article');
    for (let card of currentGame) {
        if (card.title !== 'match') {
            return true
        }
    }
    return false
}

function matchClick(e) {
    if (e.target.title === 'match') {
        return true
    }
    return false
}

bestbtn.addEventListener('click', function () {
    localStorage.clear();
    best = '';
    record.innerText = best;
})

bestbtn.addEventListener('mouseover', function (e) {
    e.target.className = 'resetbtn';
    e.target.innerText = 'Reset';
})

bestbtn.addEventListener('mouseout', function (e) {
    e.target.className = 'bestbtn';
    e.target.innerText = 'Best Score';
})



// old start button function

function startGame() {
    document.querySelector("h1").className = 'gone';
    arr = [];

    getBestScore()
    let current = gameInProgress();
    let winMessage = document.querySelector('h2');
    if (current && turns > 0) {
        if (confirm('Whoa there, partner! If you start a new game, progress in current game will be lost. Continue anyway?')) {
            smoothTransition();
        }
    }
    else {
        if (winMessage !== null) {
            winMessage.remove();
        }
        smoothTransition();
    }
}