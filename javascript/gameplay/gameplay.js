import { checkAutoResult } from './checkAutoResult.js';
import { getPoints } from './getPoints.js';
import { updateMoney } from './gambling.js';
import { checkBank } from './checkBank.js';
import store from '../localstorage/store.js';


const rollButton = document.getElementById('roll-button');
const topFirst = document.getElementById('top-first');
const topSecond = document.getElementById('top-second');
const topThird = document.getElementById('top-third');
const bottomFirst = document.getElementById('bottom-first');
const bottomSecond = document.getElementById('bottom-second');
const bottomThird = document.getElementById('bottom-third');
const winLoss = document.getElementById('win-loss');
const bossBankMoney = document.getElementById('boss-bank-display');
const playerBankMoney = document.getElementById('player-bank-display');
const jabbaLaugh = document.getElementById('jabba-laugh');
const salaciousLaugh = document.getElementById('salacious-laugh');
const diceSound1 = document.getElementById('dice-sound-1');
const diceSound2 = document.getElementById('dice-sound-2');
const diceSound3 = document.getElementById('dice-sound-3');
const main = document.getElementById('main');
const opponentNameDisplay = document.getElementById('opponent-name');

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

const wagerArray = [
    100,
    200,
    400,
];

const playerLevel = store.get('level');
const playerStartMoney = store.get('player-money');

main.style.backgroundImage = backgroundSrcArray[playerLevel];
opponentNameDisplay.textContent = opponentName[playerLevel];
bossBankMoney.textContent = opponentBankStart[playerLevel];
playerBankMoney.textContent = playerStartMoney;
const wager = wagerArray[playerLevel];


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

rollButton.addEventListener('click', () => {
    winLoss.classList.add('hidden');
    for(let i = 0; i < topArray.length; i++) {
        topArray[i].classList.remove('hidden');
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
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');
                jabbaLaugh.play();
                checkRoundOver();
                return;
            } else {
                showWinMessage();
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
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
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
                checkRoundOver();

            } else {
                showLossMessage();
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
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
        bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
        playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');
        checkRoundOver();
    }
    else if(getPoints(bankerRoll) === getPoints(nonBankerRoll)) {
        showDrawMessage();
        salaciousLaugh.play();
    }
    else {
        showWinMessage();
        bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
        playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
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

function playRandomDiceSound() {
    let number = rollDice()[0] / 2;
    if(number === 1) { diceSound1.play(); }
    else if(number === 2) { diceSound2.play(); }
    else { diceSound3.play(); }
}