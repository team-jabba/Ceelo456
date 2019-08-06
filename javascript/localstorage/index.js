import store from './store.js';

const userName = document.getElementById('user-name');
const goButton = document.getElementById('go-button');

goButton.addEventListener('click', () => {
    store.save('username', userName.value);

});