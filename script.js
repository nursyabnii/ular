// === DOM ELEMENTS ===
const board = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const pauseBtn = document.getElementById('pause-btn');
const homeBtn = document.getElementById('home-btn'); // BARU: Ambil tombol home
const levelSelectionPanel = document.getElementById('level-selection');
const instructionsPanel = document.getElementById('instructions');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreDisplay = document.getElementById('final-score');
const highScoreDisplay = document.getElementById('high-score-display');
const levelDisplayElement = document.getElementById('level-display');

// === AUDIO ELEMENTS ===
const eatSound = document.getElementById('eat-sound');
const loseSound = document.getElementById('lose-sound');
const clickSound = document.getElementById('click-sound');

// ... (sisa variabel game tetap sama) ...
const gridSize = 20;
let snake = [];
let food = {};
let obstacles = [];
let direction = { x: 0, y: 0 };
let score = 0;
let currentLevel = 1;
let isPaused = false;
let gameLoop;
let highScore = localStorage.getItem('snakeHighScore') || 0;

// === EVENT LISTENERS (tetap sama) ===
document.addEventListener('keydown', handleKeyPress);
pauseBtn.addEventListener('click', togglePause);
document.getElementById('up-btn').addEventListener('click', () => setDirection({ x: 0, y: -1 }));
document.getElementById('down-btn').addEventListener('click', () => setDirection({ x: 0, y: 1 }));
document.getElementById('left-btn').addEventListener('click', () => setDirection({ x: -1, y: 0 }));
document.getElementById('right-btn').addEventListener('click', () => setDirection({ x: 1, y: 0 }));

// === GAME FUNCTIONS ===

function startGame(level) {
    clickSound.play();
    clearInterval(gameLoop);
    resetGame();
    currentLevel = level;
    levelDisplayElement.textContent = `Level: ${currentLevel}`;

    // UI Updates
    levelSelectionPanel.classList.add('hidden');
    instructionsPanel.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    homeBtn.classList.remove('hidden'); // BARU: Tampilkan tombol home
    pauseBtn.textContent = 'Pause';

    if (currentLevel === 3) {
        generateObstacles(5);
    }

    draw();
    gameLoop = setInterval(main, 150);
}

function handleGameOver() {
    loseSound.play();
    clearInterval(gameLoop);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
    }

    finalScoreDisplay.textContent = score;
    highScoreDisplay.textContent = highScore;
    gameOverScreen.classList.remove('hidden');
    levelSelectionPanel.classList.remove('hidden'); // Biarkan user pilih level lagi
    instructionsPanel.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    homeBtn.classList.add('hidden'); // BARU: Sembunyikan tombol home
    levelDisplayElement.textContent = 'Level: -';
}


// ... (SISA KODE JAVASCRIPT LAINNYA TIDAK PERLU DIUBAH) ...
// Salin sisa fungsi Anda yang lain (resetGame, main, draw, dll.) di sini.
// Untuk singkatnya, saya tidak menuliskannya lagi karena tidak ada perubahan di sana.

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomGridPosition();
    obstacles = [];
    direction = { x: 0, y: 0 };
    score = 0;
    isPaused = false;
    scoreElement.textContent = `Skor: ${score}`;
    levelDisplayElement.textContent = 'Level: -';
    board.innerHTML = '';
}

function main() {
    if (isPaused) return;
    moveSnake();
    if (checkCollision()) {
        return handleGameOver();
    }
    draw();
}

function draw() {
    board.innerHTML = '';
    drawOnBoard(snake, 'snake');
    drawOnBoard([food], 'food');
    if (currentLevel === 3) {
        drawOnBoard(obstacles, 'obstacle');
    }
}

function drawOnBoard(elements, className) {
    elements.forEach(el => {
        const div = document.createElement('div');
        div.style.gridRowStart = el.y;
        div.style.gridColumnStart = el.x;
        div.classList.add(className);
        board.appendChild(div);
    });
}

function moveSnake() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (currentLevel === 1) {
        if (head.x > gridSize) head.x = 1;
        if (head.x < 1) head.x = gridSize;
        if (head.y > gridSize) head.y = 1;
        if (head.y < 1) head.y = gridSize;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        eatSound.play();
        score++;
        scoreElement.textContent = `Skor: ${score}`;
        food = getRandomGridPosition();
        if (currentLevel === 3) {
            obstacles.push(getRandomGridPosition());
        }
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (currentLevel > 1) {
        if (head.x > gridSize || head.x < 1 || head.y > gridSize || head.y < 1) {
            return true;
        }
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    if (currentLevel === 3) {
        for (const obstacle of obstacles) {
            if (head.x === obstacle.x && head.y === obstacle.y) {
                return true;
            }
        }
    }

    return false;
}

function getRandomGridPosition() {
    let newPosition;
    while (newPosition == null || onElement(newPosition)) {
        newPosition = {
            x: Math.floor(Math.random() * gridSize) + 1,
            y: Math.floor(Math.random() * gridSize) + 1
        };
    }
    return newPosition;
}

function onElement(position) {
    const onSnake = snake.some(s => s.x === position.x && s.y === position.y);
    const onFood = food.x === position.x && food.y === position.y;
    const onObstacle = obstacles.some(o => o.x === position.x && o.y === position.y);
    return onSnake || onFood || onObstacle;
}

function generateObstacles(count) {
    for (let i = 0; i < count; i++) {
        obstacles.push(getRandomGridPosition());
    }
}

function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function setDirection(newDirection) {
    if (direction.x === -newDirection.x && direction.x !== 0) return;
    if (direction.y === -newDirection.y && direction.y !== 0) return;
    direction = newDirection;
}

function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowUp': setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': setDirection({ x: 1, y: 0 }); break;
    }
}

// === INISIALISASI GAME ===
resetGame();
draw();