const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
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
];

let isGameRunning = false; //игра не запускается сразу же при запуске игры
let character = 0; // 0 - мальчик, 1 - девочка

boyButton.addEventListener("click", () => {
  if (!isGameRunning) {
    character = 0;
    dino.style.backgroundImage = "url('./assets/img/boy.webp')";
  }
});

girlButton.addEventListener("click", () => {
  if (!isGameRunning) {
    character = 1;
    dino.style.backgroundImage = "url('./assets/img/girl.jpg')";
  }
});

// Функция для случайного выбора изображения
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Отключаем анимацию, пока игра не началась
dino.style.animationPlayState = "paused";
cactus.style.animationPlayState = "paused";

startButton.addEventListener("click", () => {
  if (!isGameRunning) {
    isGameRunning = true;
    startButton.style.display = "none";

     // Включаем анимацию при старте игры
     dino.style.animationPlayState = "running";
     cactus.style.animationPlayState = "running";

    document.addEventListener("keydown", function (event) {
      if (event.key === " ") {
        jump();
      }
    });

    let isAlive = setInterval(function () {
        let dinoTop = parseInt(
          window.getComputedStyle(dino).getPropertyValue("top")
        );
        let cactusLeft = parseInt(
          window.getComputedStyle(cactus).getPropertyValue("left")
        );

        if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
          clearInterval(isAlive);
          gameOverText.style.display = "block";

// Останавливаем анимацию при окончании игры
dino.style.animationPlayState = "paused";
cactus.style.animationPlayState = "paused";
        }
    }, 10);
  }
});


function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
  }
  setTimeout(function () {
    dino.classList.remove("jump");
  }, 300);
}

// Обновите изображение как часть анимации куста
function updateCactusImage() {
  const randomImage = getRandomImage();
  cactus.style.backgroundImage = `url('${randomImage}')`;
}

// Добавьте вызов функции обновления изображения куста
setInterval(updateCactusImage, 5000);





