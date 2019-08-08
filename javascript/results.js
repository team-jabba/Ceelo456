import store from "./localstorage/store.js";

const playerMoney = store.get('player-money');
const bossMoney = store.get('boss-money');

if(bossMoney === 0) {
    document.body.style.backgroundImage = 'url(../assets/img/coruscant-nightlife.jpg)';
} else if(playerMoney === 0) {
    document.body.style.backgroundImage = 'url(../assets/img/rancor.jpg)';
}