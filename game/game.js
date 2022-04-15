import Checks from "../checks/checks.js";

export default class Game  extends Checks{
    nowBoard = this.emptyBoard()
    score = 0;
    wins = null;
    loser = null;
    beforeWinner = null;
    noMoveLeft = null;
    noMoveRight = null;
    noMoveUp = null;
    noMoveDown = null;

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
}