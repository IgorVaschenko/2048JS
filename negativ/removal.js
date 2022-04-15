class MoveOperation extends Game {
    constructor(){
        super();
    }



    removal = (board) => {
        let eBoard = this.emptyBoard();

        board.map((elem, i) => {
            let index = 0; //поиск и замена нулевых значений
            elem.map((el, j) => {
                if (board[i][j] !== 0) {
                    eBoard[i][index] = board[i][j];
                    index++;
                }
            })
        })
        return eBoard;
    }
}



export default MoveOperation;