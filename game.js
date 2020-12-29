import Snake from './actors/snake.js';
import Food from './actors/food.js';
import Renderer from './renderer.js';

const play = () => {

    let snake = null;
    let food = null;

    let score = 0;

    let dx = Snake.SNAKE_ELEMENT_SIZE;
    let dy = 0;
    let dontCutTail = false;

    let gameLoopInterval = null;

    const init = () => {
        Renderer.renderCanvas();
        Renderer.renderScore(0);

        snake = new Snake({ x: 0, y: 0 });
        document.addEventListener("keypress", function onEvent(event) {
            if (event.key === "w") {
                dx = 0;
                dy = -Snake.SNAKE_ELEMENT_SIZE;
            } else if (event.key === "s") {
                dx = 0;
                dy = Snake.SNAKE_ELEMENT_SIZE;
            } else if (event.key === "a") {
                dx = -Snake.SNAKE_ELEMENT_SIZE;
                dy = 0;
            } else if (event.key === "d") {
                dx = Snake.SNAKE_ELEMENT_SIZE;
                dy = 0;
            }
        });
    }

    const createRandomFood = () => {
        if (!food) {
            let randomX = Math.floor(Math.random() * 20) * Snake.SNAKE_ELEMENT_SIZE;
            let randomY = Math.floor(Math.random() * 18) * Snake.SNAKE_ELEMENT_SIZE;
            food = new Food({ x: randomX, y: randomY });
        }
    }

    const moveSnake = () => {
        snake.setPosition({ x: snake.getPosition().x + dx, y: snake.getPosition().y + dy });
        if (!dontCutTail) {
            snake.cutTailSegment();
        } else {
            food = null;
            dontCutTail = false;
        }
    }

    const collidedWithWall = () => {
        return (snake.getPosition().x < 0 || snake.getPosition().x > Renderer.AREA_WIDTH) || (snake.getPosition().y < 0 || snake.getPosition().y > Renderer.AREA_HEIGHT);
    }

    const collidedWithItself = () => {
        return snake.getSegmentsWithoutHead().filter(segment => segment.x === snake.getPosition().x && segment.y === snake.getPosition().y).length > 0;
    }

    const snakeHeadIntersectsFood = () => {
        return (snake.getPosition().x === food.getPosition().x && snake.getPosition().y === food.getPosition().y);
    }

    const updateScore = () => {
        score+=Food.FOOD_NUTRITIONAL_VALUE;
        Renderer.renderScore(score);
    }

    const gameLoop = () => {
        Renderer.clearCanvas();
        moveSnake();
        Renderer.renderSnake(snake);
        createRandomFood();
        Renderer.renderFood(food);
        if (collidedWithWall() || collidedWithItself()) {
            clearInterval(gameLoopInterval);
            Renderer.renderEndGameScreen();
        }
        if (snakeHeadIntersectsFood()) {
            updateScore();
            dontCutTail = true;
        }
    }

    init();

    gameLoopInterval = setInterval(gameLoop, 120);
};

export default play;