// canvas parameters //
const canvas = document.querySelector('canvas');
canvas.style.border = '2px solid pink' 
//canvas.style.backgroundColor = '#E8C1D9'
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let isGameOver = false
let isScore = true
let gameId = 0
let isMovingRight = false
let isMovingLeft = false
let isMovingUp = false
let isMovingDown = false

const gameIntro = document.querySelector('.gameIntro');

// Background
// const background = false;
const backgroundImage = new Image();
backgroundImage.src = "./images/backgroundcartoon.png";
// backgroundImage.onload = function () {
// background = true;
//};
let backgroundImageX = 0;
let backgroundImageY = 0;
const backgroundImageWidth = canvas.width ;
const backgroundImageHeight = canvas.height;
function drawbackground(){
  ctx.drawImage(backgroundImage, backgroundImageX, backgroundImageY, backgroundImageWidth, backgroundImageHeight);
}

//Make Candy
const candy = new Image();
candy.src = './images/cuteCandyM.png';

const blueice= new Image();
blueice.src ='./images/blueIce1.png';

const whitebluecream= new Image();
whitebluecream.src ='./images/whiteblueicecreamM.png';

const lollipop= new Image();
lollipop.src ='./images/lollipop.png';

const roundPink= new Image();
roundPink.src ='./images/pinkRoundCandy3.png';

const pinkGoldCandy= new Image();
pinkGoldCandy.src ='./images/pinkgoldcandyM.png';

const icecream= new Image();
icecream.src ='./images/icecream2.png';

const ourson= new Image();
ourson.src ='./images/oursonM.png';

const candyArr =[
  {x:Math.random()*canvas.width-80, y:-100, img:candy, width:80, height:60},
  {x:Math.random()*canvas.width-80, y:-750, img:blueice, width:80, height:60},
  {x:Math.random()*canvas.width-80, y:-550, img:whitebluecream, width:80, height:70},
  {x:Math.random()*canvas.width-60, y:-350, img:lollipop, width:60, height:70},
  {x:Math.random()*canvas.width-80, y:-650, img:roundPink, width:80, height:70},
  {x:Math.random()*canvas.width-65, y:-950, img:pinkGoldCandy, width:65, height:45},
  {x:Math.random()*canvas.width-80, y:-300, img:icecream, width:80, height:60},
  {x:Math.random()*canvas.width-80, y:-300, img:ourson, width:80, height:60},
];

const carrot= new Image();
carrot.src ='./images/carrot3.png';

const chou= new Image();
chou.src ='./images/chou_cartoonM.png';

const onion= new Image();
onion.src ='./images/onionM.png';

const feuille= new Image();
feuille.src ='./images/feuilleM.png';

const veggiesArr =[
  {x:Math.random()*canvas.width-70, y:-100, img:carrot, width:70, height:70},
  {x:Math.random()*canvas.width-60, y:-750, img:chou, width:60, height:60},
  {x:Math.random()*canvas.width-80, y:-550, img:onion, width:80, height:80},
  {x:Math.random()*canvas.width-70, y:-350, img:feuille, width:70, height:70},
]

/*class makeCandy {
constructor (x, y, image, isLoaded, width, height) {
  this.x = Math.random() * (canvas.width - obstacleWidth)
  this.y = y
  this.image = image;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
  this.angle = 0;
}} */
/*function drawCandy(){
  ctx.drawImage(candy, candyX, candyY, candyWidth, candyHeight);
  } */

//Player1
const player1 = new Image()
player1.src = '../images/Simsim2.png'
let player1X = 0;
let player1Y = 600;
const player1Width = 70;
const player1Height = 90; 

function drawPlayer1() {
  ctx.drawImage(player1, player1X, player1Y, player1Width, player1Height)
}

const animate = () => {
  drawbackground()
  //draw Candies
  for (let i = 0; i < candyArr.length; i += 1){
    let current = candyArr[i];
    ctx.drawImage(current.img, current.x, current.y, current.width, current.height);
    current.y += 3;
      if (current.y > canvas.height) {
        current.y = -300;
  }
  }

//draw Veggies
for (let i = 0; i < veggiesArr.length; i += 1){
  let current = veggiesArr[i];
  ctx.drawImage(current.img, current.x, current.y, current.width, current.height);
  current.y += 2;
    if (current.y > canvas.height) {
      current.y = -300;
}
}

  drawPlayer1()
  // Move Player 1
  if (isMovingRight === true) {
    player1X += 10
  } else if (isMovingLeft === true) {
    player1X -= 10
  }else if (isMovingUp === true) {
    player1Y -= 10
  }else if (isMovingDown === true) {
    player1Y += 10
  }
  if (isGameOver) {
    cancelAnimationFrame(gameId)
  } else {
    // Ask for a new frame
    gameId = requestAnimationFrame(animate)
  }
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    console.log('starting')
    //song.play()
    startGame()
  }
  function startGame() {
    gameIntro.style.display = 'none'
    animate()
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
  })
}

function update(){

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
setInterval(update, 0)
}


