import Rotates from "./rotates.js";

export default class Movies extends Rotates{
    //Нажатие влево
    moveLeft() {
        const oldScore = this.score;//старое значение очков

        this.moveToLeft();

        this.render();

        this.noMoveLeft = (this.score === oldScore)
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
}