import { checkAutoResult } from './checkAutoResult.js';
import { getPoints } from './getPoints.js';
import { updateMoney } from './gambling.js';
import { checkBank } from './checkBank.js';

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
let bankerRoll = [];
let nonBankerRoll = [];
let wager = 200;

// onclick = "window.location.href = 'results.html';"

rollButton.addEventListener('click', () => {
    winLoss.classList.add('hidden');
    for(let i = 0; i < bottomArray.length; i++) {
        bottomArray[i].classList.add('hidden');
    }

    let bossBank = checkBank(bossBankMoney);
    let playerBank = checkBank(playerBankMoney);
    let flag = 0;
    while(flag === 0) {

        bankerRoll = Array.from({ length: 3 }, () => Math.floor((Math.random() * 6)) + 1);
        for(let i = 0; i < bankerRoll.length; i++) {
            const number = bankerRoll[i];
            topArray[i].src = srcArray[number - 1];
        }

        if(checkAutoResult(bankerRoll)) {
            if(checkAutoResult(bankerRoll) === 'win') {
                winLoss.classList.remove('hidden');
                winLoss.src = '../assets/img/loss.png';
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');

                return;
            } else {
                winLoss.classList.remove('hidden');
                winLoss.src = '../assets/img/win.png';
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
                
                return;
            }
        }
        if(getPoints(bankerRoll)) {
            flag = 1;
        }
    }
    flag = 0;
    while(flag === 0) {
        nonBankerRoll = Array.from({ length: 3 }, () => Math.floor((Math.random() * 6)) + 1);
        for(let i = 0; i < bottomArray.length; i++) {
            bottomArray[i].classList.remove('hidden');
        }
        if(checkAutoResult(nonBankerRoll)) {
            if(checkAutoResult(nonBankerRoll) === 'win') {
                winLoss.classList.remove('hidden');
                winLoss.src = '../assets/img/win.png';
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
                ////
            } else {
                winLoss.classList.remove('hidden');
                winLoss.src = '../assets/img/loss.png';
                playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');
                bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
                /////
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
        winLoss.classList.remove('hidden');
        winLoss.src = '../assets/img/loss.png';
        bossBankMoney.textContent = updateMoney(bossBank, wager, 'win');
        playerBankMoney.textContent = updateMoney(playerBank, wager, 'lose');
        ////

    }
    else if(getPoints(bankerRoll) === getPoints(nonBankerRoll)) {
        winLoss.classList.remove('hidden');
        winLoss.src = '';
    }
    else {
        winLoss.classList.remove('hidden');
        winLoss.src = '../assets/img/win.png';
        bossBankMoney.textContent = updateMoney(bossBank, wager, 'lose');
        playerBankMoney.textContent = updateMoney(playerBank, wager, 'win');
        ////
    }
});