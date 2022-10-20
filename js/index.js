// canvas parameters //
const canvas = document.querySelector('canvas');
canvas.style.border = '2px solid pink'

const ctx = canvas.getContext('2d');

const gameIntro = document.querySelector('.gameIntro');
const startBtn = document.querySelector('#start-button');
const restartFrame = document.querySelector('.restartFrame');
const restartBtn = document.querySelector('#restart-button');
const gameOver = document.querySelector('#gameOverFrame');
const WinFrame = document.querySelector('#WinFrame');


canvas.width = window.innerWidth
canvas.height = window.innerHeight

let isGameOver = false
let health = 50
let gameId = 0
let isMovingRight = false
let isMovingLeft = false
let isMovingUp = false
let isMovingDown = false

// Background 
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
  { x: Math.random() * canvas.width - 70, y: 850, img: ourson, width: 70, height: 80, points: 10 },
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
poivronrouge.src = './images/poivron1-modified.png';

let veggiesArr = [
  { x: Math.random() * canvas.width - 80, y: 250, img: citrouille, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 130, img: carot, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 700, img: onion, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 150, img: patato, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 60, img: tomato, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 10, img: poivron, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 550, img: choufleur, width: 80, height: 90, points: 10 },
  { x: Math.random() * canvas.width - 90, y: 850, img: poivronrouge, width: 80, height: 90, points: 10 },
]

//Create Player1
const player1 = new Image()
player1.src = './images/manna2.png'
let player1X = 0;
let player1Y = 600;
const player1Width = 70;
const player1Height = 90;

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
      console.log("Too late!")
      isGameOver = true;
    }
  }
}

//ANIMATE THE GAME !!
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawbackground()
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
      health -= currentCandy.points;
      currentCandy.y = -300
      currentCandy.x = Math.random() * canvas.width - currentCandy.width
      console.log(health);
    }
    return currentCandy
  })

  veggiesArr = veggiesArr.map((currentVeggies) => {
    if (player1X < currentVeggies.x + currentVeggies.width &&
      player1X + player1Width > currentVeggies.x &&
      player1Y < currentVeggies.y + currentVeggies.height &&
      player1Y + player1Height > currentVeggies.y
    ) {
      health += currentVeggies.points;
      currentVeggies.y = -300
      currentVeggies.x = Math.random() * canvas.width - currentVeggies.width
      console.log(health);
    }
    return currentVeggies
  })


  if (isGameOver) {
    if (health >= 150) {
      WinFrame.style.display = 'flex'
    } else {
      gameOver.style.display = 'flex'
    }
    cancelAnimationFrame(gameId)
    canvas.style.display = 'none'
    restartBtn.style.display = 'block'
  } else if (health <= 0) {
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
  //checkHealth()
  //Check if the moving variables are true and then move the player1 accordingly
  //movement of the player1
  document.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight') {
      console.log('We are going right!')
      isMovingRight = true
    } else if (event.code === 'ArrowLeft') {
      console.log('We are going left!')
      isMovingLeft = true
    } else if (event.code === 'ArrowUp') {
      console.log('We are going Up!')
      isMovingUp = true
    } else if (event.code === 'ArrowDown') {
      console.log('We are going down!')
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
    canvas.style.display = 'block'
    gameIntro.style.display = 'none'
    restartBtn.style.display = 'none'
    startGame()
  }
}

document.getElementById('restart-button').onclick = () => {
  location.reload()
}

/*
function checkHealth() {
    if (health <= 0){
    gameOver.style.display = 'block'
    restartBtn.style.display = 'block'
    stopIfLost()
      //isGameOver = true;
      //console.log ("Game Over!");
      //cancelAnimationFrame(gameId)
      //scoreOnGameOer.innerHTML = score;
    } else if (health === 200){
    console.log ("You win!");
    cancelAnimationFrame(gameId)
    restartBtn.style.display = 'block'
  } 
} */

/*
function stopIfLost() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  cancelAnimationFrame(gameId)

  ctx.beginPath()
  ctx.font = 'bold 48px Gill Sans MT'
  ctx.fillStyle = '#f15a42'
  ctx.fillText('GAME-OVER', canvas.width / 3, canvas.height / 2)
  ctx.closePath()

  ctx.beginPath()
  ctx.font = 'bold 48px Gill Sans MT'
  ctx.fillStyle = '#F584B5'
  ctx.fillText(health, canvas.width / 3 + 60, canvas.height / 2 + 60)
  ctx.closePath()
}
 */


