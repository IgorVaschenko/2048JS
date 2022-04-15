// import MoveOperation from "./removal";


class Game {
    nowBoard = this.emptyBoard()
    score = 0;
    
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

    counter() {
        
    }

    render() {

        let cells = document.querySelectorAll('.cell');

        let num = 0;

        this.nowBoard.forEach((elem) => {
            elem.forEach((el) => {
                cells[num].textContent = el;
                cells[num].classList.add(`cell-${el}`) //добавление класса по значению
                if( el === 0 ) {cells[num].className = `cell`}
                num++;
            })
        });

        return cells
    }
    random() {

        let [ row, cell ] = this.randomPosition();

        this.nowBoard.forEach((elem) => {
            elem.forEach((el) => {
                if (this.nowBoard[row][cell] === 0) {
                    this.nowBoard[row][cell] = (Math.random() > 0.8) ? 4 : 2;
                }
            })
        })
    }

    randomPosition(){
        const row = Math.floor(Math.random() * 4);
        const cell = Math.floor(Math.random() * 4);

        return[ row, cell ];
    }

    
    removal () {
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
    }
                
    moveLeft() {

        // //cмещение влево
        this.removal( this.nowBoard );

        //ссхлопывание

        this.nowBoard.map((elem, i) => {
            elem.map((el, j) => {
                if (this.nowBoard[i][j] !== 0 && this.nowBoard[i][j] === this.nowBoard[i][j + 1]) {
                    this.nowBoard[i][j] *= 2;
                    this.nowBoard[i][j + 1] = 0;
                    // this.score += this.nowBoard[i][j]*2
                }
            })
        })

        //cмещение влево

        this.removal( this.nowBoard );

        this.random()
        this.render()

        return this.nowBoard

    }
    
    
    reversion(){
        this.nowBoard.map((el, i) => {
            el.reverse();
        })
    }
    
    moveRight() {
        //зеркало
        this.reversion(this.nowBoard)
        
        //работа лево
        this.moveLeft();
        
        //зеркало
        this.reversion(this.nowBoard)

        this.random()
        this.render()
    }
    
    
    turnLeft(){
        const turnBoard = this.emptyBoard();

        this.nowBoard.map((elem, i) => {
            elem.map((el,j) =>{
                turnBoard[i][j] = this.nowBoard[j][this.nowBoard[i].length - i - 1];
            });
        });
        this.nowBoard = turnBoard;
    }

    turnRight(){
        const turnBoard = this.emptyBoard();

        this.nowBoard.map((elem, i) => {
            elem.map((el,j) =>{
                turnBoard[i][j] = this.nowBoard[this.nowBoard[i].length - j - 1][i];
            });
        });
        this.nowBoard = turnBoard;
    }

    moveUp() {

        //left to 90
        this.turnLeft(this.nowBoard);

        this.moveLeft();

        //right to 90
        this.turnRight(this.nowBoard)

        this.random()
        this.render()
    }
    
    moveDown() {
        //right to 90
        this.turnRight(this.nowBoard)
        
        this.moveLeft();
        
        //left to 90
        this.turnLeft(this.nowBoard);

        this.random()
        this.render()
    }

    win() {
        this.nowBoard.forEach(elem => {
            elem.forEach( el => {
                if (el === 2048) {
                    console.log('WIN');
                }
            })
        })
    }

    another(board, nextBoard) {
        board.forEach(( elem, i ) => {
            elem.forEach(( el, j ) => {
                if( board[i][j] !== nextBoard[i][j] ){
                    return true;
                }
            })
        })
        return false;
    }

    noMove() {
        if( this.another( this.nowBoard, this.moveLeft(this.nowBoard) )){
            return false;
        }
        if( this.another( this.nowBoard, this.moveRight(this.nowBoard) )){
            return false;
        }
        if( this.another( this.nowBoard, this.moveUp(this.nowBoard) )){
            return false;
        }
        if( this.another( this.nowBoard, this.moveDown(this.nowBoard) )){
            return false;
        }
        
        return true;
    }

    lose() {
        if( this.noMove ){
            console.log('LOSE')
        }
    }
}


let game = new Game();
game.random();
game.render();



window.addEventListener("keydown", event => {
    console.log(game.score)
    if(event.key=="ArrowLeft"){
        game.moveLeft();
        game.win();
        game.lose();
        // game.random();
    }
    else if(event.key=="ArrowRight"){
        game.moveRight();
        game.win();
        game.lose();
    }
    else if(event.key=="ArrowUp"){
        game.moveUp();
        game.win();
        game.lose();
    }
    else if(event.key=="ArrowDown"){
        game.moveDown();
        game.win();
        game.lose();
    }
    

})