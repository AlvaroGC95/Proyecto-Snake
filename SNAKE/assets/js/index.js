// Obtener el elemento canvas y su contexto
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Definir la configuración del juego
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

// Variables del juego
let snake = [
  { x: gridSize * 5, y: gridSize * 5 },
  { x: gridSize * 4, y: gridSize * 5 },
  { x: gridSize * 3, y: gridSize * 5 }
];
let direction = "right";
let food = { x: 0, y: 0 };
let score = 0;
let gameLoop;

// Función para iniciar el juego
function startGame() {
  // Reiniciar las variables del juego
  snake = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
    { x: gridSize * 3, y: gridSize * 5 }
  ];
  direction = "right";
  score = 0;

  // Generar la comida inicial
  generateFood();

  // Limpiar el canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Iniciar el bucle del juego
  gameLoop = setInterval(updateGame, 100);
}

// Función para generar comida en una posición aleatoria
function generateFood() {
  food.x = Math.floor(Math.random() * gridWidth) * gridSize;
  food.y = Math.floor(Math.random() * gridHeight) * gridSize;

  // Verificar que la comida no esté en la misma posición que la serpiente
  for (let i = 0; i < snake.length; i++) {
    if (food.x === snake[i].x && food.y === snake[i].y) {
      generateFood();
      break;
    }
  }
}

// Función para actualizar el juego en cada iteración
function updateGame() {
  // Actualizar la posición de la serpiente según la dirección
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y -= gridSize;
      break;
    case "down":
      head.y += gridSize;
      break;
    case "left":
      head.x -= gridSize;
      break;
    case "right":
      head.x += gridSize;
      break;
  }

  // Verificar si la serpiente choca consigo misma o con las paredes
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    checkCollision(head, snake)
  ) {
    // Finalizar el juego
    clearInterval(gameLoop);
    alert("Game Over! Your score: " + score);
    location.canvas;
    return;
  }
  

  // Agregar la nueva posición de la cabeza de la serpiente
  snake.unshift(head);

  // Verificar si la serpiente come la comida
  if (head.x === food.x && head.y === food.y) {
    // Incrementar el marcador de puntos
    score++;

    // Generar nueva comida
    generateFood();
  } else {
    // Eliminar la última posición de la serpiente si no come
    snake.pop();
  }

  // Dibujar el juego en el canvas
  drawGame();
}

// Función para dibujar el juego en el canvas
function drawGame() {
  // Limpiar el canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la serpiente
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "#000";
    context.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }

  // Dibujar la comida
  context.fillStyle = "#f00";
  context.fillRect(food.x, food.y, gridSize, gridSize);

  // Mostrar el marcador de puntos
  context.fillStyle = "#000" ;
  context.font = "20px Arial";
  context.border = "50px";
  context.fillText("Score: " + score, 10, 20);
}

// Función para verificar si la serpiente colisiona consigo misma
function checkCollision(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Evento de clic para el botón de inicio
document.getElementById("startButton").addEventListener("click", function() {
  startGame();
});

// Eventos de teclado para controlar la dirección de la serpiente
document.addEventListener("keydown", function(event) {
  const key = event.keyCode;
  let newDirection;

  switch (key) {
    case 37: // Izquierda
      newDirection = "left";
      break;
    case 38: // Arriba
      newDirection = "up";
      break;
    case 39: // Derecha
      newDirection = "right";
      break;
    case 40: // Abajo
      newDirection = "down";
      break;
    default:
      return;
  }

  // Evitar cambios de dirección opuestos
  if (
    (direction === "left" && newDirection !== "right") ||
    (direction === "up" && newDirection !== "down") ||
    (direction === "right" && newDirection !== "left") ||
    (direction === "down" && newDirection !== "up")
  ) {
    direction = newDirection;
  }
}


)
