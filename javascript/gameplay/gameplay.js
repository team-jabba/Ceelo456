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

const intro = document.getElementById('intro');

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

// this should be in different file, and you load based on level
const bosses = [{
    name: 'Mr. T',
    url: 'url(../assets/img/mr-t.png)',
    bank: 400, // number, not string!
    playerBank: 400,
    wager: 100,
    intro: '../assets/audio/mrtintro.mp3',
    sounds: [
        '../assets/audio/pityfool.mp3'
    ]
},
{ /* vizzini */ },
{ /* jabba */}
];

const playerLevel = store.get('level');

const boss = findBoss(bosses, playerLevel); // or however you lookup level;

intro.src = boss.intro;
main.style.backgroundImage = boss.url;
opponentNameDisplay.textContent = boss.name;
bossBankMoney.textContent = boss.bankStart;
playerBankMoney.textContent = boss.playerBank
let wager = boss.wager;
crumbImg.classList.add('hidden');

boss.intro.play();

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
let bankerPoints = 0;
let nonBankerRoll = [];
let nonBankerPoints = 0;

allInButton.addEventListener('click', () => {
    let bossBank = parseInt(bossBankMoney.textContent);
    let playerBank = parseInt(playerBankMoney.textContent);
    if(bossBank <= playerBank) {
        wager = bossBank;
    } else {
        wager = playerBank;
    }
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

    function showWin() {
        showWinMessage();
        displayMoney(playerBank, bossBank, wager, 'win');
        playOpponentCry();
        playRandomCoinSound();
        checkRoundOver();

    }

    function showLoss() {
        showLossMessage();
        displayMoney(playerBank, bossBank, wager, 'lose');
        playOpponentLaugh();
        checkRoundOver();
    }

    let flag = 0;
    while(flag === 0) {
        bankerRoll = rollDice();
        bankerPoints = getPoints(bankerRoll);

        for(let i = 0; i < bankerRoll.length; i++) {
            const number = bankerRoll[i];
            topArray[i].src = srcArrayRed[number - 1];
        }
        
        const autoResult = checkAutoResult(bankerRoll);
        if(autoResult) {
            if(autoResult === 'win') {
                showLoss();
                return;
            } else {
                showWin();
                return;
            }
        }

        if(bankerPoints) {
            flag = 1;
        }
    }

    flag = 0;
    while(flag === 0) {
        nonBankerRoll = rollDice();
        nonBankerPoints = getPoints(nonBankerRoll);

        playRandomDiceSound();
        for(let i = 0; i < bottomArray.length; i++) {
            bottomArray[i].classList.remove('hidden');
        }

        const autoResult = checkAutoResult(bankerRoll);

        if(autoResult !== false) {
            if(autoResult === 'win') {
                showWin();
                return;
            } else if(checkAutoResult(nonBankerRoll) === 'lose') {
                showLoss();
                return;
            }
        }

        for(let i = 0; i < nonBankerRoll.length; i++) {
            const number = nonBankerRoll[i];
            bottomArray[i].src = srcArrayGreen[number - 1];
        }

        if(nonBankerPoints) {
            flag = 1;
        }
    }

    if(bankerPoints > nonBankerPoints) {
        showLossMessage();
        displayMoney(playerBank, bossBank, wager, 'lose');
        checkRoundOver();
    }
    else if(bankerPoints === nonBankerPoints) {
        showDrawMessage();
        crumbImg.classList.remove('hidden');
        salaciousLaugh.play();
    }
    else if(bankerPoints < nonBankerPoints) {
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
    winLoss.src = '../assets/img/draw.png';
}

function resetWager() {
    wager = boss.wager;
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

// these should be based on "boss" object, not hard coded!

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