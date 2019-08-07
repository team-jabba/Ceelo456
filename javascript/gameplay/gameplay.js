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

const playerName = document.getElementById('player-name');

const srcArray = [
    '../assets/img/dice1.png',
    '../assets/img/dice2.png',
    '../assets/img/dice3.png',
    '../assets/img/dice4.png',
    '../assets/img/dice5.png',
    '../assets/img/dice6.png',
];

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
let wager = 200;

rollButton.addEventListener('click', () => {
    winLoss.classList.add('hidden');
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
            topArray[i].src = srcArray[number - 1];
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
            bottomArray[i].src = srcArray[number - 1];
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
    if(checkBank(bossBankMoney) === 0 || checkBank(playerBankMoney) === 0) {
        rollButton.setAttribute('onclick', "window.location.href = 'results.html';");
        rollButton.textContent = 'Meet Your Fate...';
    }
}

function rollDice(){
    return Array.from({ length: 3 }, () => Math.floor((Math.random() * 6)) + 1);
}

function showLossMessage(){
    winLoss.classList.remove('hidden');
    winLoss.src = '../assets/img/loss.png';
}

function showWinMessage(){
    winLoss.classList.remove('hidden');
    winLoss.src = '../assets/img/win.png';
}

function showDrawMessage(){
    winLoss.classList.remove('hidden');
    winLoss.src = '../assets/img/draw!.png';
}
