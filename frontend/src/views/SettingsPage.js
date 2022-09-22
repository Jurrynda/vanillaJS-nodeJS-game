/* eslint-disable indent */

/**
 * settings
 */
import defaultGameSettings from '../defaultGameSettings';

/**
 * utils
 */
import { rerenderPage } from '../utils';

/**
 * local storage
 */
import { deleteGameSettings, getGameSettings, saveGameSettings } from '../localStorage';

const SettingsPage = {
  render: () => {
    return `
        <div class="settings-page-container">
        <i id="back" class="fa-solid fa-arrow-left-long cancel-settings"></i>
            <nav>
                <a id="default-link" class="settings-link active">Default</a>
                <span class="middle-border"></span>
                <a id="colors-link" class="settings-link">Colors</a>
            </nav> 
            <div class="default-container">
              <div class="item-container">
                <h4 class="settings-title">Game board size</h4>
                <div class="board-size-container">
                    <label class="board-label" for="small-size">
                        <div class="monitor-img-container">
                            <img class="monitor-img" src="./src/assets/monitor.png">
                        </div>
                        <div>600x600</div>
                        <input id="small-size" value="600x600" type="radio" name="size-input"></input>
                    </label>
                    <label class="board-label" for="normall-size">
                        <div class="monitor-img-container">
                            <img class="monitor-img" src="./src/assets/monitor.png">
                        </div>
                        <div>700x700</div>
                        <input id="normall-size" value="700x700" type="radio" name="size-input"></input>
                    </label>
                    <label class="board-label"  for="big-size">
                        <div class="monitor-img-container">
                            <img class="monitor-img" src="./src/assets/monitor.png">
                        </div>
                        <div>800x800</div>
                        <input id="big-size" value="800x800" type="radio" name="size-input"></input>
                    </label>
                  </div>
                </div>
                <div class="item-container">
                  <h4 class="settings-title">FPS</h4>
                  <div>
                    <input id="fps-input" class="fps-input" type="range" min="5" max="20">
                    <div class="fps"></div>
                  </div>
                </div>
            </div>
            
            <ul class="colors-container">
              <li class="colors-item">
                <h3 class="settings-title">Board</h3>
                <div id="board-color" class="settings-color"></div>
                <div class="color-picker">
                  <div class="color-picker-title">
                    Choose your color
                  </div>
                  <ul class="color-picker-colors-container"></ul>
                </div>
              </li>
              <li class="colors-item">
                <h3 class="settings-title">Grid</h3>
                <div id="grid-color" class="settings-color"></div>
                <div class="color-picker">
                  <div class="color-picker-title">
                    Choose your color
                  </div>
                  <ul class="color-picker-colors-container"></ul>
                </div>
              </li> 
              <li class="colors-item">
                <h3 class="settings-title">Snake head</h3>
                <div id="snake-head-color" class="settings-color"></div>
                <div class="color-picker">
                  <div class="color-picker-title">
                    Choose your color
                  </div>
                  <ul class="color-picker-colors-container"></ul>
                </div>
              </li>
              <li class="colors-item">
                <h3 class="settings-title">Snake body</h3>
                <div id="snake-body-color" class="settings-color"></div>
                <div class="color-picker">
                  <div class="color-picker-title">
                    Choose your color
                  </div>
                  <ul class="color-picker-colors-container"></ul>
                </div>
              </li>
              <li class="colors-item">
                <h3 class="settings-title">Border</h3>
                <div id="border-color" class="settings-color"></div>
                <div class="color-picker">
                  <div class="color-picker-title">
                    Choose your color
                  </div>
                  <ul class="color-picker-colors-container"></ul>
                </div>
              </li>
              <li class="colors-item">
                <h3 class="settings-title">Food</h3>
                <div id="food-color" class="settings-color"></div>
                <div class="color-picker">
                  <div class="color-picker-title">
                    Choose your color
                  </div>
                  <ul class="color-picker-colors-container"></ul>
                </div>
              </li>      
            </ul>
            <div class="settings-btn-container">
              <button id="reset-btn" class="settings-btn">Reset</button>
              <button id="save-btn" class="settings-btn">Save</button>
              <button id="next-btn" class="settings-btn">Next</button>
            </div>
        </div>
    `;
  },
  after_render: () => {
    /**
     * get settings
     */
    const getSettings = () => {
      let settings;
      if (getGameSettings()) settings = getGameSettings();
      else settings = defaultGameSettings;
      return settings;
    };

    const {
      gameHeight,
      fps,
      boardColor,
      borderColor,
      snakeHeadColor,
      snakeBodyColor,
      foodColor,
      gridColor,
    } = getSettings();

    /**
     * size
     */
    const sizeInputs = document.querySelectorAll('input[name="size-input"]');
    const setCheckedSize = () => {
      Array.from(sizeInputs).forEach((input) => {
        const inputValue = +input.value.split('x')[0];
        if (inputValue === gameHeight) {
          input.checked = true;
          input.parentElement.classList.add('active');
        }
      });
    };
    setCheckedSize();

    /**
     * fps
     */
    document.getElementById('fps-input').value = fps;
    document.querySelector('.fps').textContent = fps;

    /**
     * colors
     */
    document.getElementById('board-color').style.backgroundColor = boardColor;
    document.getElementById('grid-color').style.backgroundColor = gridColor;
    document.getElementById('snake-head-color').style.backgroundColor = snakeHeadColor;
    document.getElementById('snake-body-color').style.backgroundColor = snakeBodyColor;
    document.getElementById('border-color').style.backgroundColor = borderColor;
    document.getElementById('food-color').style.backgroundColor = foodColor;

    /**
     * back button
     */
    document.getElementById('back').addEventListener('click', () => {
      document.location.hash = '/';
    });
    /**
     * remove active class from elements
     */
    const removeActive = (elements) => {
      elements.forEach((element) => {
        element.classList.remove('active');
      });
    };

    /**
     * navigation
     */
    const headerLinks = document.querySelectorAll('.settings-link');
    const defaultSettings = document.querySelector('.default-container');
    const colorsSettings = document.querySelector('.colors-container');
    const nextBtn = document.getElementById('next-btn');
    const saveBtn = document.getElementById('save-btn');

    const hideAndShow = (firstElement, secondElement) => {
      firstElement.style.display = 'flex';
      secondElement.style.display = 'none';
    };
    hideAndShow(defaultSettings, colorsSettings);
    hideAndShow(nextBtn, saveBtn);

    document.getElementById('default-link').addEventListener('click', (e) => {
      removeActive(headerLinks);
      e.target.classList.add('active');
      hideAndShow(defaultSettings, colorsSettings);
      hideAndShow(nextBtn, saveBtn);
    });

    document.getElementById('colors-link').addEventListener('click', (e) => {
      removeActive(headerLinks);
      e.target.classList.add('active');
      hideAndShow(colorsSettings, defaultSettings);
      hideAndShow(saveBtn, nextBtn);
    });

    /**
     * DEFAULT
     */

    /**
     * images
     */
    const images = document.getElementsByClassName('monitor-img');
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = `${i + 3}em`;
    }

    /**
     * board size
     */
    const sizesContainers = document.querySelectorAll('.board-label');

    document.querySelectorAll('.board-label input').forEach((label) => {
      label.addEventListener('click', () => {
        removeActive(sizesContainers);
        const parentEl = label.parentElement;
        parentEl.classList.add('active');
      });
    });

    /**
     * fps
     */
    document.querySelector('.fps-input').addEventListener('change', (e) => {
      document.querySelector('.fps').textContent = e.target.value;
    });

    /**
     * COLORS
     */

    /**
     * color picker
     */
    const colors = [
      'red',
      'green',
      'lightgreen',
      'blue',
      'purple',
      'yellow',
      'orange',
      'black',
      'white',
      'brown',
      'lightgray',
      'lightpink',
    ];

    document
      .querySelectorAll('.color-picker-colors-container')
      .forEach((colorsContainer) => {
        for (let i = 0; i < colors.length; i++) {
          const li = document.createElement('li');
          li.classList.add('color-picker-color');
          li.style.backgroundColor = colors[i];
          colorsContainer.appendChild(li);
        }
      });

    const colorPickers = document.querySelectorAll('.color-picker');
    document.querySelectorAll('.settings-color').forEach((color) => {
      color.addEventListener('click', () => {
        const colorPicker = color.nextElementSibling;
        if (colorPicker.classList.contains('active')) {
          colorPicker.classList.remove('active');
        } else {
          removeActive(colorPickers);
          colorPicker.classList.add('active');
        }
      });
    });

    document.querySelectorAll('.color-picker-color').forEach((color) => {
      color.addEventListener('click', () => {
        const colorElement = color.offsetParent.offsetParent.children[1];
        colorElement.style.backgroundColor = color.style.backgroundColor;
        removeActive(colorPickers);
      });
    });

    /**
     * reset btn
     */
    document.getElementById('reset-btn').addEventListener('click', () => {
      deleteGameSettings();
      rerenderPage(SettingsPage);
    });

    /**
     * next btn
     */
    document.getElementById('next-btn').addEventListener('click', () => {
      removeActive(headerLinks);
      document.getElementById('colors-link').classList.add('active');
      hideAndShow(colorsSettings, defaultSettings);
      hideAndShow(saveBtn, nextBtn);
    });

    /**
     * save settings
     */
    const getSizeValue = () => {
      const sizeValue = document
        .querySelector('input[name="size-input"]:checked')
        .value.split('x')[0];
      return Number(sizeValue);
    };

    document.getElementById('save-btn').addEventListener('click', () => {
      saveGameSettings({
        gameHeight: getSizeValue(),
        gameWidth: getSizeValue(),
        fps: document.getElementById('fps-input').value,
        boardColor: document.getElementById('board-color').style.backgroundColor,
        borderColor: document.getElementById('border-color').style.backgroundColor,
        gridColor: document.getElementById('grid-color').style.backgroundColor,
        snakeHeadColor: document.getElementById('snake-head-color').style.backgroundColor,
        snakeBodyColor: document.getElementById('snake-body-color').style.backgroundColor,
        foodColor: document.getElementById('food-color').style.backgroundColor,
      });
      document.location.hash = '/';
    });
  },
};

export default SettingsPage;
