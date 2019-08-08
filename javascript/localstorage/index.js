import store from './store.js';

const userName = document.getElementById('user-name');
const goButton = document.getElementById('go-button');
const instructionsButton = document.getElementById('instructions-button');
const aboutUsButton = document.getElementById('about-us-button');

localStorage.clear();

goButton.addEventListener('click', () => {
    store.save('username', userName.value);
    store.save('level', 0);
    store.save('player-money', 1000);
    window.location = './html/gameplay.html';

});

instructionsButton.addEventListener('click', () => {
    window.location = './html/instructions.html';
});

aboutUsButton.addEventListener('click', () => {
    window.location = './html/about.html';
});