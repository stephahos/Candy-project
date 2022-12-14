// canvas parameters //
const canvas = document.querySelector('canvas');
canvas.style.border = '2px solid pink'
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

//Selectors
const gameIntro = document.querySelector('.gameIntro');
const startBtn = document.querySelector('#start-button');
const restartFrame = document.querySelector('.restartFrame');
const restartBtn = document.querySelector('#restart-button');
const gameOver = document.querySelector('#gameOverFrame');
const WinFrame = document.querySelector('#WinFrame');
const soundBtn = document.querySelector('.sound');
const displayScore = document.querySelector('#score');
const displayGameOverScore = document.getElementById('gameOverscore');


//SOUNDS
const gameIntroMusic = new Audio('./sound/candygameintro.mp3');
gameIntroMusic.volume = 0.1;

const touchCandyMusic = new Audio('./sound/Nonono.wav');
touchCandyMusic.volume = 0.1;

const congratYouWinMusic = new Audio('./sound/Celebration.mp3');
congratYouWinMusic.volume = 0.1;

const GameOverMusic = new Audio('./sound/LevelFailed.mp3');
GameOverMusic.volume = 0.1;

const CrackVeggieMusic = new Audio('./sound/Crack.mp3');
CrackVeggieMusic.volume = 0.1;


let isGameOver = false
let health = 50
//let score = 0
let gameId = 0
let isMovingRight = false
let isMovingLeft = false
let isMovingUp = false
let isMovingDown = false

// Background 

const olaf = new Image();
olaf.src = './images/Olaf_1.png';
let olafX = 1200;
let olafY = 500;
const olafWidth = 100;
const olafHeight = 200;
ctx.drawImage(olaf, olafX, olafY, olafWidth, olafHeight);


const backgroundImage = new Image();
backgroundImage.src = "./images/backgroundcartoon.png";
let backgroundImageX = 0;
let backgroundImageY = 0;
const backgroundImageWidth = canvas.width;
const backgroundImageHeight = canvas.height;

function drawbackground() {
  ctx.drawImage(backgroundImage, backgroundImageX, backgroundImageY, backgroundImageWidth, backgroundImageHeight);
}

//Make Candy
const candy = new Image();
candy.src = './images/cuteCandyM.png';

const blueice = new Image();
blueice.src = './images/blueIce1.png';

const whitebluecream = new Image();
whitebluecream.src = './images/whiteblueicecreamM.png';

const lollipop = new Image();
lollipop.src = './images/lollipop.png';

const roundPink = new Image();
roundPink.src = './images/pinkRoundCandy3.png';

const pinkGoldCandy = new Image();
pinkGoldCandy.src = './images/pinkgoldcandyM.png';

const icecream = new Image();
icecream.src = './images/icecream2.png';

const ourson = new Image();
ourson.src = './images/oursonM.png';

let candyArr = [
  { x: Math.random() * canvas.width - 70, y: 300, img: candy, width: 70, height: 80, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 50, img: blueice, width: 70, height: 80, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 320, img: whitebluecream, width: 70, height: 80, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 120, img: lollipop, width: 70, height: 80, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 480, img: roundPink, width: 70, height: 80, points: 10 },
  { x: Math.random() * canvas.width - 45, y: 690, img: pinkGoldCandy, width: 45, height: 55, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 780, img: icecream, width: 70, height: 80, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 950, img: ourson, width: 70, height: 80, points: 10 },
];

//Make Veggies
const citrouille = new Image();
citrouille.src = './images/citrouille_1.png';

const carot = new Image();
carot.src = './images/bestcarrot1.png';

const onion = new Image();
onion.src = './images/onionM.png';

const patato = new Image();
patato.src = './images/patato1.png';

const tomato = new Image();
tomato.src = './images/tomate_1.png';

const poivron = new Image();
poivron.src = './images/poivron_1.png';

const choufleur = new Image();
choufleur.src = './images/choufleurM1.png';

const poivronrouge = new Image();
poivronrouge.src = './images/courgette_1.png';

const courgette = new Image();
courgette.src = './images/courgette_1.png';

let veggiesArr = [
  { x: Math.random() * canvas.width - 80, y: 250, img: citrouille, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 130, img: carot, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 700, img: onion, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 150, img: patato, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 60, img: tomato, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 10, img: poivron, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 550, img: choufleur, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 850, img: poivronrouge, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 70, y: 90, img: poivronrouge, width: 70, height: 90, points: 10 },
]

//Create Player1
const player1 = new Image()
player1.src = './images/MannaSven2_rev.png'
let player1X = 0;
let player1Y = 600;
const player1Width = 130;
const player1Height = 280;

function drawPlayer1() {
  ctx.drawImage(player1, player1X, player1Y, player1Width, player1Height)
}

//Draw Player1 Health
const drawHealth = () => {
  ctx.beginPath()
  ctx.font = 'bold 48px Gill Sans MT'
  ctx.fillStyle = '#fac92c'
  ctx.fillText(`Health:${health}`, 10, 50)
  ctx.closePath()
}

let startTime = 30;
const drawTimer = () => {
  ctx.beginPath();
  ctx.font = 'bold 48px Gill Sans MT';
  ctx.fillStyle = '#F584B5';
  ctx.fillText(`Timer: ${startTime}`, canvas.width - 250, 50);
  ctx.closePath();
  if (gameId % 60 === 0) {
    if (startTime > 0) {
      startTime -= 1;
    } else if (startTime === 0) {
      isGameOver = true;
      displayScore.innerHTML= `You have ${health} points of health`
    }
  }
}

//ANIMATE THE GAME !!
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawbackground()
  ctx.drawImage(olaf, olafX, olafY, olafWidth, olafHeight);
  drawTimer()

  //Move Candies
  candyArr.forEach((currentCandy) => {
    ctx.drawImage(currentCandy.img, currentCandy.x, currentCandy.y, currentCandy.width, currentCandy.height);
    currentCandy.y += 3;
    if (currentCandy.y > canvas.height) {
      currentCandy.y = -300
      currentCandy.x = Math.random() * canvas.width;
    }
  })

  //Move Veggies
  veggiesArr.forEach((currentVeggies) => {
    ctx.drawImage(currentVeggies.img, currentVeggies.x, currentVeggies.y, currentVeggies.width, currentVeggies.height);
    currentVeggies.y += 3;
    if (currentVeggies.y > canvas.height) {
      currentVeggies.y = -300
      currentVeggies.x = Math.random() * canvas.width;
    }
  })

  drawHealth()

  drawPlayer1()

  // Move Player 1
  if (isMovingRight === true) {
    player1X += 10
  } else if (isMovingLeft === true) {
    player1X -= 10
  } else if (isMovingUp === true) {
    player1Y -= 10
  } else if (isMovingDown === true) {
    player1Y += 10
  }

  candyArr = candyArr.map((currentCandy) => {
    if (player1X < currentCandy.x + currentCandy.width &&
      player1X + player1Width > currentCandy.x &&
      player1Y < currentCandy.y + currentCandy.height &&
      player1Y + player1Height > currentCandy.y
    ) {
      touchCandyMusic.play();
      health -= currentCandy.points;
     // displayScore.innerHTML= health
      currentCandy.y = -300
      currentCandy.x = Math.random() * canvas.width - currentCandy.width
    }
    return currentCandy
  })

  veggiesArr = veggiesArr.map((currentVeggies) => {
    if (player1X < currentVeggies.x + currentVeggies.width &&
      player1X + player1Width > currentVeggies.x &&
      player1Y < currentVeggies.y + currentVeggies.height &&
      player1Y + player1Height > currentVeggies.y
    ) {
      CrackVeggieMusic.play();
      health += currentVeggies.points;
   //   displayScore.innerHTML = health
      currentVeggies.y = -300
      currentVeggies.x = Math.random() * canvas.width - currentVeggies.width
    }
    return currentVeggies
  })

  if (isGameOver) {
    if (health >= 150) {
      displayScore.innerHTML= `You have ${health} points of health`
      congratYouWinMusic.play();
      //gameIntroMusic.pause()
      WinFrame.style.display = 'flex'
      restartBtn.style.display = 'block'
    } else {
      //GameOverMusic.play();
      //gameIntroMusic.pause()
      gameOver.style.display = 'flex'
    }
    cancelAnimationFrame(gameId)
    //gameIntroMusic.pause()
    GameOverMusic.play();
    displayGameOverScore.innerHTML = `You have ${health} points of health`
    canvas.style.display = 'none'
    restartBtn.style.display = 'block'
  } else if (health <= 0) {
   // gameIntroMusic.pause()
    displayGameOverScore.innerHTML = `You have ${health} points of health`
    GameOverMusic.play();
    gameOver.style.display = 'flex'
    cancelAnimationFrame(gameId)
    canvas.style.display = 'none'
    restartBtn.style.display = 'block'
  }
  else {
    gameId = requestAnimationFrame(animate)
  }
}

function startGame() {
  canvas.style.display = 'block';
  gameIntro.style.display = 'none';
  gameOver.style.display = 'none';
  animate()
  //Check if the moving variables are true and then move the player1 accordingly
  //movement of the player1
  document.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight') {
      isMovingRight = true
    } else if (event.code === 'ArrowLeft') {
      isMovingLeft = true
    } else if (event.code === 'ArrowUp') {
      isMovingUp = true
    } else if (event.code === 'ArrowDown') {
      isMovingDown = true
    }
    //stop the player1 from moving
    document.addEventListener('keyup', () => {
      isMovingRight = false
      isMovingLeft = false
      isMovingUp = false
      isMovingDown = false
    })
  }
  )
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    gameIntroMusic.play();
    canvas.style.display = 'block'
    gameIntro.style.display = 'none'
    restartBtn.style.display = 'none'
    startGame()
    soundBtn.addEventListener("click", () => {
      if (soundBtn.innerHTML = "Play Music") {
        gameIntroMusic.play()
      } else {
        soundBtn.innerHTML = "Stop Music";
       // soundBtn.innerHTML = "Play Music";
        gameIntroMusic.pause()
      }
    })
  }
}

 
document.getElementById('restart-button').onclick = () => {
  location.reload()
}






