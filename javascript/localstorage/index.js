import store from './store.js';

const userName = document.getElementById('user-name');
const goButton = document.getElementById('go-button');
const instructionsButton = document.getElementById('instructions-button');
const aboutUsButton = document.getElementById('about-us-button');

goButton.addEventListener('click', () => {
    store.save('username', userName.value);
    window.location = './html/gameplay.html';
});

instructionsButton.addEventListener('click', () => {
    window.location = './html/instructions.html';
});

aboutUsButton.addEventListener('click', () => {
    window.location = './html/about.html';
});