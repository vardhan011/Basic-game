// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define car object
const car = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 100,
    speed: 5,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
    color: 'blue'
};

// Create an array to hold obstacles
let obstacles = [];
const obstacleSpeed = 3;

// Control movement of the car
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') car.moveLeft = true;
    if (event.key === 'ArrowRight') car.moveRight = true;
    if (event.key === 'ArrowUp') car.moveUp = true;
    if (event.key === 'ArrowDown') car.moveDown = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') car.moveLeft = false;
    if (event.key === 'ArrowRight') car.moveRight = false;
    if (event.key === 'ArrowUp') car.moveUp = false;
    if (event.key === 'ArrowDown') car.moveDown = false;
});

// Function to generate new obstacles
function createObstacle() {
    const x = Math.random() * (canvas.width - 50);
    obstacles.push({
        x: x,
        y: -100,
        width: 50,
        height: 50,
        color: 'red'
    });
}

// Function to draw the car
function drawCar() {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Function to draw obstacles
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// Function to move obstacles down the screen
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;
    }

    // Remove obstacles that go off the screen
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

// Function to check for collision between car and obstacles
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y) {
            alert("Game Over!");
            resetGame();
        }
    }
}

// Function to move the car based on user input
function moveCar() {
    if (car.moveLeft && car.x > 0) {
        car.x -= car.speed;
    }
    if (car.moveRight && car.x < canvas.width - car.width) {
        car.x += car.speed;
    }
    if (car.moveUp && car.y > 0) {
        car.y -= car.speed;
    }
    if (car.moveDown && car.y < canvas.height - car.height) {
        car.y += car.speed;
    }
}

// Function to reset the game
function resetGame() {
    car.x = canvas.width / 2 - 25;
    car.y = canvas.height - 100;
    obstacles = [];
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveCar();
    drawCar();
    moveObstacles();
    drawObstacles();
    checkCollision();

    if (Math.random() < 0.01) {
        createObstacle();
    }

    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
