/* eslint-disable no-restricted-globals */
/* eslint-disable default-case */

/**
 * utils
 */
import { parseRequestUrl, rerenderPage } from '../utils';

/**
 * api
 */
import { getUser, setNewHighestScore } from '../API';

/**
 * default game settings
 */
import defaultGameSettings from '../defaultGameSettings';

/**
 * local storage
 */
import { getGameSettings } from '../localStorage';

const GamePage = {
  render: () => {
    return `
    <div id="game-container" class="game-container">
      <div class="score-container">
        <div>
          Your best score:
          <span class="score-best"></span>
        </div>
        <div>
          Your current score:
          <span class="score-current">0</span>
        </div>
      </div>
      <canvas class="game"></canvas>
    </div>
    `;
  },
  after_render: async () => {
    const request = parseRequestUrl();
    const { _id, highestScore } = await getUser(request.id);

    /**
     * settings
     */
    const getSettings = () => {
      let settings;
      if (getGameSettings()) settings = getGameSettings();
      else settings = defaultGameSettings;
      return settings;
    };

    const {
      gameHeight,
      gameWidth,
      fps,
      boardColor,
      borderColor,
      snakeHeadColor,
      snakeBodyColor,
      foodColor,
      gridColor,
    } = getSettings();

    /**
     * send best score on page
     */
    document.querySelector('.score-best').textContent = highestScore;

    /**
     * canvas
     */
    const canvas = document.querySelector('.game');
    const ctx = canvas.getContext('2d');
    canvas.style.border = `10px solid ${borderColor}`;

    /**
     * game
     */
    let gameRunning = true;
    let score = 0;
    // const fps = 15;
    // const gameHeight = 800;
    // const gameWidth = 800;
    canvas.height = gameHeight;
    canvas.width = gameWidth;

    /**
     * snake
     */
    const onePartOfSnakeSize = gameHeight / 10;
    let tail = [];
    let snakeLength = 1;

    const snakeSpeed = onePartOfSnakeSize;

    let snakePosX = 0;
    let snakePosY = gameHeight / 2;

    let velocityX = 1;
    let velocityY = 0;

    /**
     * colors
     */
    // const snakeColor = '#fff';
    // const boardColor = '#000';
    // const foodColor = 'red';
    // const gridColor = 'rgb(0, 248, 248)';

    /**
     * food
     */
    const foodSize = onePartOfSnakeSize / 2;

    const maxHeightRange = gameHeight / onePartOfSnakeSize;
    const maxWidthRange = gameHeight / onePartOfSnakeSize;

    let foodPosX;
    let foodPosY;

    /**
     * generate random position for food
     */
    const generateFood = () => {
      foodPosX = onePartOfSnakeSize * Math.floor(Math.random() * maxWidthRange);
      foodPosY = onePartOfSnakeSize * Math.floor(Math.random() * maxHeightRange);
    };
    generateFood();

    /**
     * GAME OVER
     */
    const showMessage = (callback) => {
      const overlayElement = document.getElementById('overlay');
      overlayElement.classList.add('active');
      overlayElement.innerHTML = `
        <div class="play-again-container">
          <div class="play-again-message">
            Do you want to play again?
          </div>
          <div class="play-again-buttons-container">
            <button id="play-again-noBtn">No</button>
            <button id="play-again-yesBtn">Yes</button>
          </div>
        </div>
      `;
      let playAgain;
      document.getElementById('play-again-noBtn').addEventListener('click', () => {
        playAgain = false;
        callback(playAgain);
        overlayElement.classList.remove('active');
      });
      document.getElementById('play-again-yesBtn').addEventListener('click', () => {
        playAgain = true;
        callback(playAgain);
        overlayElement.classList.remove('active');
      });
    };

    const playAgain = (playAgain) => {
      if (playAgain) {
        gameRunning = true;
        rerenderPage(GamePage);
      } else {
        document.location.hash = '/';
      }
    };

    const gameOver = () => {
      gameRunning = false;
      if (score > highestScore) setNewHighestScore(_id, score);
      showMessage(playAgain);
    };

    /**
     * draw stuff
     */
    const drawRectangle = (color, x, y, width, height) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    const drawBackgroundGrid = () => {
      for (let i = 0; i * onePartOfSnakeSize < gameWidth; i++) {
        for (let j = 0; j * onePartOfSnakeSize < gameHeight; j++) {
          drawRectangle(
            boardColor,
            onePartOfSnakeSize * i,
            onePartOfSnakeSize * j,
            onePartOfSnakeSize - 1,
            onePartOfSnakeSize - 1,
          );
        }
      }
    };

    /**
     * controlls
     */
    const snakeControlls = (key) => {
      switch (key) {
        case 'ArrowUp':
          if (velocityY !== 1) {
            velocityY = -1;
            velocityX = 0;
          }
          break;
        case 'ArrowDown':
          if (velocityY !== -1) {
            velocityY = 1;
            velocityX = 0;
          }
          break;
        case 'ArrowLeft':
          if (velocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
          }
          break;
        case 'ArrowRight':
          if (velocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
          }
          break;
      }
    };

    document.addEventListener('keydown', (e) => {
      snakeControlls(e.key);
    });

    /**
     * move stuff
     */
    const moveStuff = () => {
      snakePosX += snakeSpeed * velocityX;
      snakePosY += snakeSpeed * velocityY;

      // border collision
      if (snakePosX > gameWidth - onePartOfSnakeSize) {
        snakePosX = 0;
      } else if (snakePosX < 0) {
        snakePosX = gameWidth;
      } else if (snakePosY > gameHeight - onePartOfSnakeSize) {
        snakePosY = 0;
      } else if (snakePosY < 0) {
        snakePosY = gameHeight;
      }

      // food colision
      if (snakePosX === foodPosX && snakePosY === foodPosY) {
        generateFood();
        document.querySelector('.score-current').textContent = ++score;
        snakeLength++;
      }

      // tail collision
      tail.forEach((tailPart) => {
        if (snakePosX === tailPart.x && snakePosY === tailPart.y) gameOver();
      });
      tail.push({ x: snakePosX, y: snakePosY });
      tail = tail.slice(-1 * snakeLength);
    };

    /**
     * draw stuff
     */
    const drawStuff = () => {
      // background color
      drawRectangle(gridColor, 0, 0, gameWidth, gameHeight);

      // background grid
      drawBackgroundGrid();

      // body
      tail.forEach((tailPart) => {
        drawRectangle(
          snakeBodyColor,
          tailPart.x,
          tailPart.y,
          onePartOfSnakeSize,
          onePartOfSnakeSize,
        );
      });

      // snake
      drawRectangle(
        snakeHeadColor,
        snakePosX,
        snakePosY,
        onePartOfSnakeSize,
        onePartOfSnakeSize,
      );

      // food
      drawRectangle(
        foodColor,
        foodPosX + foodSize / 2,
        foodPosY + foodSize / 2,
        foodSize,
        foodSize,
      );
    };

    /**
     * game loop
     */

    const gameLoop = () => {
      if (gameRunning) {
        drawStuff();
        moveStuff();
        //   requestAnimationFrame(gameLoop);
        setTimeout(gameLoop, 1000 / fps);
      }
    };
    gameLoop();
  },
};
export default GamePage;
