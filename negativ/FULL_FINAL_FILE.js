export default class Game  extends IsNullCell{
    nowBoard = this.emptyBoard()
    score = 0;
    wins = null;
    beforeWinner = null;
    noMoveLeft = null;
    noMoveRight = null;
    noMoveUp = null;
    noMoveDown = null;

    //Если ноль возврат стандарт стиль
    isNullCell() {
        const eBoard = this.emptyBoard();
        let cells = document.querySelectorAll('.cell');
        let num = 0;

        this.nowBoard.map((elem, i) => {
            elem.map((el, j) => {
                if (this.nowBoard[i][j] === 0) {
                    cells[num].className = `cell`;
                }
                num++;
            })
        })
    }

    //Построение игровой площадки с хедером
    beginBuilder() {

        const wrapper = document.querySelector('#wrapper');

        const header = document.createElement('div');
        header.className = 'header';

        const title = document.createElement('h1');
        title.textContent = '2048';
        header.append(title);

        const pharag = document.createElement('p');
        pharag.textContent = 'Join the number and get to the 2048 tile!';
        header.append(pharag);

        const divScore = document.createElement('div');
        divScore.className = 'score';
        divScore.textContent = `SCORE : ${this.score}`;
        header.append(divScore);

        const button = document.createElement('button');
        button.className = 'buttonHed';
        button.textContent = 'New Game'
        header.append(button);

        wrapper.prepend(header);


        let fragment = new DocumentFragment();
        const root = document.querySelector('#root');

        for (let i = 0; i < 4; i++) {
            const row = document.createElement('div');
            row.className = 'row'
            row.id = i

            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = '' + i + j;
                row.append(cell);
            }

            fragment.append(row)
        }

        root.append(fragment)
    }

    //Пустая матрица для дальнейшей синхронизации
    emptyBoard() {
        return (
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        )
    }

    //Отрисовка изменений игрового поля
    render() {
        this.random();
        let cells = document.querySelectorAll('.cell');
        let num = 0;

        this.nowBoard.forEach((elem) => {
            elem.forEach((el) => {
                cells[num].textContent = el;
                if (cells[num].classList.length === 2) {
                    cells[num].classList.add(`cell-${el}`);//добавление класса по значению
                } else {
                    cells[num].className = `cell`;
                    cells[num].classList.add(`cell-${el}`);
                }

                if (cells[num].textContent === 0) { cells[num].className = `cell` }
                num++;
            })
        });
        this.lose();
    }

    //Заполнение рандомной клетки
    random() {
        let bool;

        while (1) {
            let [row, cell] = this.randomPosition();
            if (this.nowBoard[row][cell] === 0) {
                this.nowBoard[row][cell] = (Math.random() > 0.8) ? 4 : 2;
                break;
            };

            this.nowBoard.forEach(el => {
                bool = !el.includes(0)
            });

            if (bool) {
                break;
            }
        }
    }
    //Позиция рандомной клетки
    randomPosition() {
        const row = Math.floor(Math.random() * 4);
        const cell = Math.floor(Math.random() * 4);

        return [row, cell];
    }

    //Сдвиг влево всех НЕПУСТЫХ полей
    removal() {
        const eBoard = this.emptyBoard();
        // let cells = document.querySelectorAll('.cell');
        // let num = 0;


        this.nowBoard.map((elem, i) => {
            let index = 0; //поиск и замена нулевых значений
            elem.map((el, j) => {
                if (this.nowBoard[i][j] !== 0) {
                    eBoard[i][index] = this.nowBoard[i][j];
                    index++;
                }
                // if( this.nowBoard[i][j]  === 0 ) {
                //     cells[num].className = `cell`;
                // }
                // num++;
            })
        })
        this.nowBoard = eBoard;

        //Если ноль возврат стандарт стиль
        this.isNullCell();
    }

    //Движение влево без рендера (пригодится для остальных направлений) + здесь очки
    moveToLeft() {
        this.removal();

        //схлопывание
        this.nowBoard.forEach((elem, i) => {
            elem.forEach((el, j) => {
                if (this.nowBoard[i][j] !== 0 && this.nowBoard[i][j] === this.nowBoard[i][j + 1]) {
                    this.nowBoard[i][j] *= 2;
                    this.nowBoard[i][j + 1] = 0;
                    this.score = this.score + this.nowBoard[i][j];   // количество заработанных очков
                }
            })
        });

        const divScore = document.querySelector('.score');
        divScore.textContent = `SCORE ${this.score}`;


        this.removal(this.nowBoard);
    }

    //Нажатие влево
    moveLeft() {
        const oldScore = this.score;//старое значение очков

        this.moveToLeft();

        this.render();

        this.noMoveLeft = (this.score === oldScore)
    }

    //Реверсия
    reversion() {
        this.nowBoard.map(el => {
            el.reverse();
        })
    }

    //Нажатие вправо
    moveRight() {
        const oldScore = this.score;//старое значение очков

        //зеркало
        this.reversion(this.nowBoard)

        //работа лево
        this.moveToLeft();

        //зеркало
        this.reversion(this.nowBoard)

        //Если ноль возврат стандарт стиль
        this.isNullCell();

        this.render()

        this.noMoveRight = (this.score === oldScore)
    }

    //Поворот на 90 градусов влево
    turnLeft() {
        const turnBoard = this.emptyBoard();

        this.nowBoard.map((elem, i) => {
            elem.map((el, j) => {
                turnBoard[i][j] = this.nowBoard[j][this.nowBoard[i].length - i - 1];
            });
        });
        this.nowBoard = turnBoard;
    }

    //Поворот на 90 градусов вправо
    turnRight() {
        const turnBoard = this.emptyBoard();

        this.nowBoard.map((elem, i) => {
            elem.map((el, j) => {
                turnBoard[i][j] = this.nowBoard[this.nowBoard[i].length - j - 1][i];
            });
        });
        this.nowBoard = turnBoard;
    }

    //Нажатие вверх
    moveUp() {
        const oldScore = this.score;//старое значение очков

        //left to 90
        this.turnLeft(this.nowBoard);

        this.moveToLeft();

        //right to 90
        this.turnRight(this.nowBoard)

        //Если ноль возврат стандарт стиль
        this.isNullCell();

        this.render()

        this.noMoveUp = (this.score === oldScore)
    }

    //Нажатие вниз
    moveDown() {
        const oldScore = this.score;//старое значение очков

        //right to 90
        this.turnRight(this.nowBoard)

        this.moveToLeft();

        //left to 90
        this.turnLeft(this.nowBoard);

        //Если ноль возврат стандарт стиль
        this.isNullCell();

        this.render()

        this.noMoveDown = (this.score === oldScore)
    }

    //Выиграл
    win() {
        this.nowBoard.forEach(elem => {
            elem.forEach(el => {
                if (el === 2048 && this.wins === null) {
                    this.beforeWinner = document.querySelector('#root');
                    this.wins = document.createElement('div');

                    const root = document.querySelector('#root');
                    root.prepend(this.wins);
                    this.wins.className = 'winner';
                    console.log('WIN');
                }

            })
        })
    }

    //Продолжение после выигрыша
    resumeGame() {
        if (this.wins !== null) {
            setTimeout(() => this.wins.className = 'none', 4000)
        }
    }

    //Нет хода
    noMove() {
        if (this.noMoveLeft && this.noMoveRight && this.noMoveUp && this.noMoveDown) {
            return true;
        }
    }

    //Проиграл
    lose() {
        if (this.noMove()) {
            console.log('LOSE')
        }
    }
}


//Инициализация
const game = new Game();
game.beginBuilder();
game.render();

//Слушаю управление
window.addEventListener("keydown", event => {
    if (event.key == "ArrowLeft") {
        game.moveLeft();
        game.win();
        game.resumeGame()
    }
    else if (event.key == "ArrowRight") {
        game.moveRight();
        game.win();
        game.resumeGame()
    }
    else if (event.key == "ArrowUp") {
        game.moveUp();
        game.win();
        game.resumeGame()
    }
    else if (event.key == "ArrowDown") {
        game.moveDown();
        game.win();
        game.resumeGame()
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

