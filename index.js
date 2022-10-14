const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const gameIntro = document.querySelector('.game-intro');

const background = new Image()
background.src = '../images/test2bis.png'

const candy1 = new Image()
candy1.src = '../images/blueIce1.png'

const candy2 = new Image()
candy2.src = '../images/icecream2.png'

const player1 = new Image()
player1.src = '../images/Simsim2.png'

let player1X = 200
let player1Y = 500
const player1Width = 100
const player1Height = 100


ctx.drawImage(player1, 0, 0, player1Width, player1Height)
 // Move the player1
 if (isMovingRight === true) {
    player1 += 2
  } else if (isMovingLeft === true) {
    player1 -= 2
  }

const animate = () => {
    ctx.drawImage(player1, 0, 0, player1Width, player1Height)
    ctx.drawImage(background, 0, 0, 700, 500)
}


window.onload = () => {
document.getElementById('start-button').onclick = () => {
    startGame()
    }
    function startGame() {
        gameIntro.style.display = 'none';
        canvas.style.backgroundColor = '#71C0BA';
        canvas.style.border = '2px solid pink';
        animate()
}
}
