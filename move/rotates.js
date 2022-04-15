import RandomValue from "../random/randomValue.js";


export default class Rotates extends RandomValue{
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

    //Сдвиг влево всех НЕПУСТЫХ полей
    removal() {
        const eBoard = this.emptyBoard();

        this.nowBoard.map((elem, i) => {
            let index = 0; //поиск и замена нулевых значений
            elem.map((el, j) => {
                if (this.nowBoard[i][j] !== 0) {
                    eBoard[i][index] = this.nowBoard[i][j];
                    index++;
                }
            })
        })
        this.nowBoard = eBoard;

        //Если ноль возврат стандарт стиль
        this.isNullCell();
    }

    //Реверсия
    reversion() {
        this.nowBoard.map(el => {
            el.reverse();
        })
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
}