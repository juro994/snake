import Snake from './actors/snake.js';

class Renderer {

    static AREA_WIDTH = 1000;
    static AREA_HEIGHT = 800;

    static renderCanvas() {
        let canvas = document.createElement('canvas');
        canvas.id = 'myCanvas';
        canvas.width = Renderer.AREA_WIDTH;
        canvas.height = Renderer.AREA_HEIGHT;
        document.body.appendChild(canvas);
    }

    static clearCanvas() {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
    }

    static renderFood(food) {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.fillStyle = "#101810";
        ctx.fillRect(food.getPosition().x, food.getPosition().y, Snake.SNAKE_ELEMENT_SIZE, Snake.SNAKE_ELEMENT_SIZE);
        ctx.strokeStyle = "#99bd9d";
        ctx.strokeRect(food.getPosition().x, food.getPosition().y, Snake.SNAKE_ELEMENT_SIZE, Snake.SNAKE_ELEMENT_SIZE);
    }

    static renderSnake(snake) {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        snake.getSegments().forEach((segment) => {
            ctx.fillStyle = "#101810";
            ctx.fillRect(segment.x, segment.y, Snake.SNAKE_ELEMENT_SIZE, Snake.SNAKE_ELEMENT_SIZE);
            ctx.strokeStyle = "#99bd9d";
            ctx.strokeRect(segment.x, segment.y, Snake.SNAKE_ELEMENT_SIZE, Snake.SNAKE_ELEMENT_SIZE);
        });
    }

    static renderScore(score) {
        let scoreText = document.getElementById('score');
        scoreText.innerHTML = score;
    }

    static renderEndGameScreen() {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.font = "100px Impact";
        ctx.fillStyle = "#101810";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", c.width / 2, c.height / 2);
    }

}

export default Renderer;