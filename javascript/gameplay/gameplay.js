import { checkAutoResult } from './checkAutoResult.js';
import { getPoints } from './getPoints.js';
import { updateMoney } from './gambling.js';
import { checkBank } from './checkBank.js';
import store from '../localstorage/store.js';


const rollButton = document.getElementById('roll-button');
const allInButton = document.getElementById('all-in-button');
const topFirst = document.getElementById('top-first');
const topSecond = document.getElementById('top-second');
const topThird = document.getElementById('top-third');
const bottomFirst = document.getElementById('bottom-first');
const bottomSecond = document.getElementById('bottom-second');
const bottomThird = document.getElementById('bottom-third');
const winLoss = document.getElementById('win-loss');
const bossBankMoney = document.getElementById('boss-bank-display');
const playerBankMoney = document.getElementById('player-bank-display');
const salaciousLaugh = document.getElementById('salacious-laugh');
const crumbImg = document.getElementById('crumb');
const main = document.getElementById('main');
const opponentNameDisplay = document.getElementById('opponent-name');
const diceSound1 = document.getElementById('dice-sound-1');
const diceSound2 = document.getElementById('dice-sound-2');
const diceSound3 = document.getElementById('dice-sound-3');
const jabbaLaugh1 = document.getElementById('jabba-laugh-1');
const jabbaLaugh2 = document.getElementById('jabba-laugh-2');
const jabbaLaugh3 = document.getElementById('jabba-laugh-3');
const inconcievable1 = document.getElementById('inconcievable-1');
const inconcievable2 = document.getElementById('inconcievable-2');
const inconcievable3 = document.getElementById('inconcievable-3');
const coinSound1 = document.getElementById('coin-sound-1');
const coinSound2 = document.getElementById('coin-sound-2');
const coinSound3 = document.getElementById('coin-sound-3');
const pityTheFool = document.getElementById('mr-t-pity');

const playerName = document.getElementById('player-name');

const srcArrayGreen = [
    '../assets/img/green-one.png',
    '../assets/img/green-two.png',
    '../assets/img/green-three.png',
    '../assets/img/green-four.png',
    '../assets/img/green-five.png',
    '../assets/img/green-six.png',
];

const srcArrayRed = [
    '../assets/img/red-one.png',
    '../assets/img/red-two.png',
    '../assets/img/red-three.png',
    '../assets/img/red-four.png',
    '../assets/img/red-five.png',
    '../assets/img/red-six.png',
];

const backgroundSrcArray = [
    'url(../assets/img/mr-t.png)',
    'url(../assets/img/vizzini.png)',
    'url(../assets/img/jabba.jpeg)',
];

const opponentName = [
    'Mr. T',
    'Vizzini',
    'Jabba',
];

const opponentBankStart = [
    '400',
    '1400',
    '3200',
];

const playerBankStart = [
    '1000',
    '1400',
    '3000',
];

const wagerArray = [
    100,
    200,
    400,
];

const playerLevel = store.get('level');

main.style.backgroundImage = backgroundSrcArray[playerLevel];
opponentNameDisplay.textContent = opponentName[playerLevel];
bossBankMoney.textContent = opponentBankStart[playerLevel];
playerBankMoney.textContent = playerBankStart[playerLevel];
let wager = wagerArray[playerLevel];
crumbImg.classList.add('hidden');

const topArray = [
    topFirst,
    topSecond,
    topThird
];

const bottomArray = [
    bottomFirst,
    bottomSecond,
    bottomThird
];

playerName.textContent = store.get('username');

let bankerRoll = [];
let nonBankerRoll = [];

allInButton.addEventListener('click', () => {
    let bossBank = checkBank(bossBankMoney);
    let playerBank = checkBank(playerBankMoney);
    if(bossBank <= playerBank) {
        wager = bossBank;
    } else { wager = playerBank; }
});

rollButton.addEventListener('click', () => {
    crumbImg.classList.add('hidden');
    winLoss.classList.add('hidden');
    for(let i = 0; i < topArray.length; i++) {
        topArray[i].classList.remove('hidden');
    }
    for(let i = 0; i < bottomArray.length; i++) {
        bottomArray[i].classList.add('hidden');
    }
    let bossBank = checkBank(bossBankMoney);
    let playerBank = checkBank(playerBankMoney);
    let flag = 0;
    while(flag === 0) {
        bankerRoll = rollDice();
        for(let i = 0; i < bankerRoll.length; i++) {
            const number = bankerRoll[i];
            topArray[i].src = srcArrayRed[number - 1];
        }

        if(checkAutoResult(bankerRoll)) {
            if(checkAutoResult(bankerRoll) === 'win') {
                showLossMessage();
                displayMoney(playerBank, bossBank, wager, 'lose');
                playOpponentLaugh();
                checkRoundOver();
                return;
            } else {
                showWinMessage();
                displayMoney(playerBank, bossBank, wager, 'win');
                playOpponentCry();
                playRandomCoinSound();
                checkRoundOver();
                return;
            }
        }
        if(getPoints(bankerRoll)) {
            flag = 1;
        }
    }

    flag = 0;
    while(flag === 0) {
        nonBankerRoll = rollDice();
        playRandomDiceSound();
        for(let i = 0; i < bottomArray.length; i++) {
            bottomArray[i].classList.remove('hidden');
        }


        if(checkAutoResult(nonBankerRoll)) {
            if(checkAutoResult(nonBankerRoll) === 'win') {
                showWinMessage();
                displayMoney(playerBank, bossBank, wager, 'win');
                playRandomCoinSound();
                checkRoundOver();

            } else {
                showLossMessage();
                displayMoney(playerBank, bossBank, wager, 'lose');
                checkRoundOver();
            }
        }

        for(let i = 0; i < nonBankerRoll.length; i++) {
            const number = nonBankerRoll[i];
            bottomArray[i].src = srcArrayGreen[number - 1];
        }

        if(getPoints(nonBankerRoll)) {
            flag = 1;
        }
    }
    if(getPoints(bankerRoll) > getPoints(nonBankerRoll)) {
        showLossMessage();
        displayMoney(playerBank, bossBank, wager, 'lose');
        checkRoundOver();
    }
    else if(getPoints(bankerRoll) === getPoints(nonBankerRoll)) {
        showDrawMessage();
        crumbImg.classList.remove('hidden');
        salaciousLaugh.play();
    }
    else if(getPoints(bankerRoll) < getPoints(nonBankerRoll)) {
        showWinMessage();
        displayMoney(playerBank, bossBank, wager, 'win');
        checkRoundOver();
    }
});

function checkRoundOver() {
    if(checkBank(bossBankMoney) <= 0 || checkBank(playerBankMoney) <= 0) {
        rollButton.setAttribute('onclick', "window.location.href = 'results.html';");
        rollButton.textContent = 'Meet Your Fate...';
        store.save('boss-money', checkBank(bossBankMoney));
        store.save('player-money', checkBank(playerBankMoney));
    }
    resetWager();
}

function rollDice() {
    return Array.from({ length: 3 }, () => Math.floor((Math.random() * 6)) + 1);
}

function showLossMessage() {
    winLoss.classList.remove('hidden');
    winLoss.src = '../assets/img/loss.png';
}

function showWinMessage() {
    winLoss.classList.remove('hidden');
    winLoss.src = '../assets/img/win.png';
}

function showDrawMessage() {
    winLoss.classList.remove('hidden');
    winLoss.src = '../assets/img/draw!.png';
}

function resetWager() {
    wager = wagerArray[playerLevel];
}

function playRandomDiceSound() {
    let number = rollDice()[0] / 2;
    if(number === 1) { diceSound1.play(); }
    else if(number === 2) { diceSound2.play(); }
    else { diceSound3.play(); }
}

function playRandomCoinSound() {
    let number = rollDice()[0] / 2;
    if(number === 1) { coinSound1.play(); }
    else if(number === 2) { coinSound2.play(); }
    else { coinSound3.play(); }
}

function playRandomJabbaLaugh() {
    let number = rollDice()[0] / 2;
    if(number === 1) { jabbaLaugh1.play(); }
    else if(number === 2) { jabbaLaugh2.play(); }
    else { jabbaLaugh3.play(); }
}

function playRandomInconcievable() {
    let number = rollDice()[0] / 2;
    if(number === 1) { inconcievable1.play(); }
    else if(number === 2) { inconcievable2.play(); }
    else { inconcievable3.play(); }
}

function playOpponentLaugh() {
    if(opponentName[playerLevel] === 'Jabba') {
        playRandomJabbaLaugh();
    } else if(opponentName[playerLevel] === 'Mr. T') {
        pityTheFool.play();
    }
}

function playOpponentCry() {
    if(opponentName[playerLevel] === 'Vizzini') {
        playRandomInconcievable();
    }
}

function displayMoney(playerBank, bossBank, wager, result) {
    if(result === 'win') {
        playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
        bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
    } else if(result === 'lose') {
        playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');
        bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
    }
}