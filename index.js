import Game from './game/game.js'
//Инициализация
const game = new Game();
game.beginBuilder();
game.render();

//Слушаю управление
window.addEventListener("keydown", event => {
    if (event.key == "ArrowLeft") {
        game.moveLeft();
        game.win();
        game.resumeGame();
    }
    else if (event.key == "ArrowRight") {
        game.moveRight();
        game.win();
        game.resumeGame();
    }
    else if (event.key == "ArrowUp") {
        game.moveUp();
        game.win();
        game.resumeGame();
    }
    else if (event.key == "ArrowDown") {
        game.moveDown();
        game.win();
        game.resumeGame();
    }
});

//Слушаю клик по NewGame
window.addEventListener('click', event => {
    const button = document.querySelector('.buttonHed');

    if (event.target.className != 'buttonHed') { return }

    const wrapper = document.querySelector('#wrapper');
    const header = document.querySelector('.header');
    wrapper.removeChild(header)

    const root = document.querySelector('#root');
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => root.removeChild(row))

    game.nowBoard = game.emptyBoard();
    game.score = 0;
    game.beginBuilder();
    game.render();
})

