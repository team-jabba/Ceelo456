import store from './localstorage/store.js';

const aboutUsButton = document.getElementById('about-us-button');
const storyLine = document.getElementById('story-line');
const continueButton = document.getElementById('continue');
const rancor = document.getElementById('rancor');
const nightClubMusic = document.getElementById('night-club-music');
// const vizziniWins = document.getElementById('vizzini-wins');
// const mrTLoses = document.getElementById('mr-t-loses');


const playerMoney = store.get('player-money');
let level = store.get('level');


if(level <= 2) {
    document.body.style.backgroundImage = 'url(../assets/img/story-page.png)';
    if(level === 0) {
        if(playerMoney > 0) {
            storyLine.textContent = 'Mr T. might pity the fool but you\'ve proved yourself to be no fool! Now that you have all of Mr T\'s money it\'s time to test your wits because this next boss will challenge your intellect while stealing your money at the same time.';
            continueButton.textContent = 'Continue';
        } else {
            storyLine.textContent = 'I\'ve seen a lot of fools in my day and you might be the biggest fool of them all. I PITY THE FOOL! Go back to school and learn how to not be a fool... ya damn fool.';
            continueButton.textContent = 'Restart';
            continueButton.setAttribute('onclick', "window.location.href = '../index.html'");
            aboutUsButton.classList.remove('hidden');
        }
    } else if(level === 1) {
        if(playerMoney > 0) {
            storyLine.textContent = 'Inconceivable! Looks like Vizzini is drinking bad merlot, he will have to settle for some box wine from the local grocery outlet tonight because you just took all his money. Good thing too because your next opponent is a real shark.... actually we are pretty sure he is a giant worm but either way he smells, he cheats, and he might want to eat you..... Good luck.';
            continueButton.textContent = 'Continue';
        } else {
            storyLine.textContent = 'The only thing worse than a bad merlot is a moron. And you good sir are among the biggest morons I have ever dueled with! They have these things called books, maybe you go home and ask your mom about them, learn how to read one, then throw yourself out a window, you MORON!' ;
            continueButton.textContent = 'Restart';
            continueButton.setAttribute('onclick', "window.location.href = '../index.html'");
            aboutUsButton.classList.remove('hidden');
        }
    } else if(level === 2) {
        if(playerMoney > 0) {
            storyLine.textContent = 'Congrats! You have taken all of Jabba\'s money, I hope you can run fast because he is pissed! Luckily he can\'t run at all. Now that you are rich and have avoided certain death, maybe you should buy your cohort some pizza... nah, let\'s go blow all the money on another game dice!';
            continueButton.textContent = 'Restart';
            nightClubMusic.play();
            document.body.style.backgroundImage = 'url(../assets/img/coruscant-nightlife.jpg)';
            aboutUsButton.classList.remove('hidden');
        } else {
            storyLine.textContent = 'Jabba has taken all of your money and your pants, apparently it was laundry day. He\'s tossed you into the pit and you\'ll soon be the next meal for his pet Rancor, good luck!' ;
            continueButton.textContent = 'Restart';
            continueButton.setAttribute('onclick', "window.location.href = '../index.html'");
            rancor.play();
            document.body.style.backgroundImage = 'url(../assets/img/rancor.jpg)';
            aboutUsButton.classList.remove('hidden');
        }
    }

}

continueButton.addEventListener('click', () => {
    level = level + 1;
    store.save('level', level);
});








// if(bossMoney === 0) {
//     document.body.style.backgroundImage = 'url(../assets/img/coruscant-nightlife.jpg)';
// } else if(playerMoney === 0) {
//     document.body.style.backgroundImage = 'url(../assets/img/rancor.jpg)';
// }