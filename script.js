const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const boyButton = document.getElementById("boyButton");
const girlButton = document.getElementById("girlButton");
const startButton = document.getElementById("startButton");
const gameOverText = document.getElementById("gameOverText");

const images = [
  "./assets/img/apple.jpg",
  "./assets/img/ball.png",
  "./assets/img/bear.png",
  "./assets/img/bush.jpg",
  "./assets/img/cake.png",
  "./assets/img/chair.jpg",
  "./assets/img/potato.png",
  "./assets/img/tomato.png",
];

let isGameRunning = false;
let characterGender = 0;

boyButton.addEventListener("click", () => {
  if (!isGameRunning) {
    characterGender = 0;
    character.style.backgroundImage = "url('./assets/img/boy.jpg')";
  }
});

girlButton.addEventListener("click", () => {
  if (!isGameRunning) {
    characterGender = 1;
    character.style.backgroundImage = "url('./assets/img/girl.jpg')";
  }
});


// Генерируем случайный порядок изображений
let shuffledImages = images.sort(function() {
  return 0.5 - Math.random();
});

// Устанавливаем свойство background-image для #obstacle
let currentImageIndex = 0;

// Отключаем анимацию, пока игра не началась
character.style.animationPlayState = "paused";
obstacle.style.animationPlayState = "paused";

startButton.addEventListener("click", () => {
  if (!isGameRunning) {
    isGameRunning = true;
    startButton.style.display = "none";
        // Включаем анимацию при старте игры
    character.style.animationPlayState = "running";
    obstacle.style.animationPlayState = "running";

    document.addEventListener("keydown", function (event) {
      if (event.key === " ") {
        jump();
      }
    });

    let isAlive = setInterval(function () {
      let characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      let obstacleLeft = parseInt(
        window.getComputedStyle(obstacle).getPropertyValue("left")
      );
      
      // Проверка категорий объектов
      const obstacleCategory = getObstacleCategory(obstacle);
      
      if (obstacleLeft < 80 && obstacleLeft > 0 && characterTop >= 200) {
        // Столкновение с объектом
        if (obstacleCategory === "passThrough") {
          // Проход сквозь объект
          updateObstacleImage();
        } else if (obstacleCategory === "jumpOver") {
          // Объект, который нужно перепрыгнуть
          clearInterval(isAlive);
          gameOverText.style.display = "block";
          character.style.animationPlayState = "paused";
          obstacle.style.animationPlayState = "paused";
        }
      }
    }, 10);
  }
});

function jump() {
  if (character.classList != "jump") {
    character.classList.add("jump");
  }
  setTimeout(function () {
    character.classList.remove("jump");
  }, 300);
}

// Обновляем изображение
function changeImage() {
  obstacle.style.backgroundImage = 'url(' + shuffledImages[currentImageIndex] + ')';
  currentImageIndex++;

  // Если достигнут конец массива, начинаем сначала
  if (currentImageIndex >= shuffledImages.length) {
    currentImageIndex = 0;
  }

   // Задержка перед появлением следующего изображения
   setTimeout(changeImage, 3000);
  }
  
  // Запускаем функцию смены изображений
  changeImage(); 

function getObstacleCategory(obstacle) {
  // Получение категории объекта по его изображению
  const obstacleImage = obstacle.style.backgroundImage;
  if (obstacleImage.includes("./assets/img/apple.jpg") || obstacleImage.includes("./assets/img/cake.png") || obstacleImage.includes("./assets/img/potato.png") || obstacleImage.includes("./assets/img/tomato.png")) {
    return "passThrough";
  } else {
    return "jumpOver"; 
  }
}
