const get = (id) => document.getElementById(id);

const character = get("character");
const obstacle = get("obstacle");
const boyButton = get("boyButton");
const girlButton = get("girlButton");
const startButton = get("startButton");
const gameOverText = get("gameOverText");

const images = [
  "./assets/img/apple.jpg",
  "./assets/img/ball.png",
  "./assets/img/bear.png",
  "./assets/img/bush.jpg",
  "./assets/img/cupcake.jpg",
  "./assets/img/chair.jpg",
  "./assets/img/pepper.png",
  "./assets/img/burger.png",
];


let isGameRunning = false;
let characterGender = 0;

const setCharacterGender = (gender) => {
  if (!isGameRunning) {
    characterGender = gender;
    character.style.backgroundImage = `url('./assets/img/${gender === 0 ? "boy" : "girl"}.jpg')`;
  }
};

boyButton.addEventListener("click", () => setCharacterGender(0));
girlButton.addEventListener("click", () => setCharacterGender(1));


let shuffledImages = images.slice().sort(() => 0.5 - Math.random());

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
  if (obstacleImage.includes("./assets/img/apple.jpg") || obstacleImage.includes("./assets/img/cupcake.jpg") || obstacleImage.includes("./assets/img/pepper.png") || obstacleImage.includes("./assets/img/burger.png")) {
    return "passThrough";
  } else {
    return "jumpOver"; 
  }
}
