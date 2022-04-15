export default class RandomValue {
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
}