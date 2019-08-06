import { checkAutoResult } from './checkAutoResult.js';
import { getPoints } from './getPoints.js';
// import { checkForPair } from './checkForPair.js';

const rollButton = document.getElementById('roll-button');
const topFirst = document.getElementById('top-first');
const topSecond = document.getElementById('top-second');
const topThird = document.getElementById('top-third');
const bottomFirst = document.getElementById('bottom-first');
const bottomSecond = document.getElementById('bottom-second');
const bottomThird = document.getElementById('bottom-third');
const winLoss = document.getElementById('win-loss');

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

rollButton.addEventListener('click', () => {
    rollButton.disable = true;

    winLoss.classList.add('hidden');

    let bankerRoll = Array.from({ length: 3 }, () => Math.floor((Math.random() * 6)) + 1);

    for(let i = 0; i < bankerRoll.length; i++) {
        const number = bankerRoll[i];
        topArray[i].src = srcArray[number - 1];
    }

    if(checkAutoResult(bankerRoll)) {
        if(checkAutoResult(bankerRoll) === 'win') {
            winLoss.classList.remove('hidden');
            winLoss.src = '../assets/img/loss.png';
            return;
        } else {
            winLoss.classList.remove('hidden');
            winLoss.src = '../assets/img/win.png';
            return;
        }
    }

    let bankerPoints = getPoints(bankerRoll);

    // const delayInMilliseconds = 2000;

    // setTimeout(function() {
    let nonBankerRoll = Array.from({ length: 3 }, () => Math.floor((Math.random() * 6)) + 1);
    if(checkAutoResult(nonBankerRoll)) {
        if(checkAutoResult(nonBankerRoll) === 'win') {
            winLoss.classList.remove('hidden');
            winLoss.src = '../assets/img/win.png';

        } else {
            winLoss.classList.remove('hidden');
            winLoss.src = '../assets/img/loss.png';

        }
    }

    for(let i = 0; i < nonBankerRoll.length; i++) {
        const number = nonBankerRoll[i];
        bottomArray[i].src = srcArray[number - 1];
    }

    let nonBankerPoints = getPoints(nonBankerRoll);
    return;
    // }, delayInMilliseconds);

    



    // if(bankerPoints > playerPoints){
    //     topWinLoss.classList.remove('hidden');
    //     winLoss.classList.remove('hidden');
    //     topWinLoss.src = '../assets/img/win.png';
    //     bottomWinLoss.src = '../assets/img/loss.png';
    //     return;
    // }




});