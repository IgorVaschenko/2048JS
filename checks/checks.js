import Movies from "../move/movies.js";

export default class Checks extends Movies{
    
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
            setTimeout(() => this.wins.className = 'none', 4000);
        }
        if (this.loser !== null ) {
           
            setTimeout(() => this.loser.className = null , 3000);
        }
    }

    // Нет хода
    noMove() {
        //Демонстрация
        if(this.score === 200) {
            return true;
        }

        if (this.noMoveLeft === true && this.noMoveRight === true && this.noMoveUp === true && this.noMoveDown === true) {
            return true;
        }
    }

    // //Проиграл
    lose() {
        if (this.noMove()) {
            this.loser = document.createElement('div');

            const root = document.querySelector('#root');
            root.prepend(this.loser);
            this.loser.className = 'loser';


            console.log('LOSE')
        }
    }

}