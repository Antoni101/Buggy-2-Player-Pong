
//-------------------------LOAD STUFF--------------------//

var ball;
var A; var Ascore = 0;
var B; var Bscore = 0;
var startButton;
var topTxt;
var borderL = 0;
var borderR = 93;
var borderU = 0;
var borderD = 90;
var gameRunning = false;
var playerOn;
var playerOn2;
var playerName = "player1";
var player2Name = "player2";

function load() {
  
}

function start() {
  var controls = document.getElementById("control");
  controls.style.display = "None";
  A = document.getElementById("player1");
  B = document.getElementById("player2");
  ball = document.getElementById("ball");
  startButton = document.getElementById("startBtn");
  topTxt = document.getElementById("topText");

  A.style.display = "Block"; 
  B.style.display = "Block"; 
  ball.style.display = "Block"; 
  startButton.style.display = "None";
  topTxt.style.display = "Block";

  startCountdown();
  
}

//------------------------TIMER--------------------//
var timer;
var countdown = 3;

function startCountdown() {
  
  timer = setInterval(countdownGo, 1000);

}

function countdownGo() {
  if (countdown >= 0) {
    topTxt.innerHTML = "Game starting in: " + countdown;
      countdown -= 1;
    }
  else {
    topTxt.innerHTML = playerName + ": " + Ascore + " / " + player2Name + ": " + Bscore;
    clearInterval(timer)
    play()
  }
}

//------------------BALL--------------------//

var ballmove;
var side;
var goingRight = false;
var goingLeft = false;
var goingUp = false;
var goingDown = false;
var ballXpos = 45;
var ballYpos = 40;
var speed = 5;

function play() {
  gameRunning = true;
  side = Math.random() < 0.5;
  if (side == true) {
    goingRight = true;
    goingUp = true;
  } else { 
    goingLeft = true; 
    goingDown = true;
  }
  playerOn = setInterval(checkHit, 10);
  playerOn2 = setInterval(checkHit2, 10);
  ballmove = setInterval(goball, speed);
}

function goball() {
  if (goingRight == true) {
    if (ballXpos >= borderR) {
      goingRight = false;
      goingLeft = true;
      Ascore += 1;
      topTxt.innerHTML = playerName + ": " + Ascore + " / " + player2Name + ": " + Bscore;
    }
    //if else ()
    else {
      ballXpos += 0.2;
    }
  }
  else if (goingLeft == true) {
    if (ballXpos <= borderL) {
      goingRight = true;
      goingLeft = false;
      Bscore += 1;
      topTxt.innerHTML = playerName + ": " + Ascore + " / " + player2Name + ": " + Bscore;
    }
    else {
      ballXpos -= 0.2;
    }
  }
  
  if (goingUp == true) {
    if (ballYpos <= borderU) {
      goingDown = true;
      goingUp = false;
    }
    else {
      ballYpos -= 0.1;
    }
  }
  else if (goingDown == true) {
    if (ballYpos >= borderD) {
      goingDown = false;
      goingUp = true;
    }
    else {
      ballYpos += 0.1;
    }
  }
  ball.style.left = ballXpos + "%";
  ball.style.top = ballYpos + "%";
}

//--------------------Player1---------------//

var at;
var ab;
var t = 0;
var b = 0;
var playerX = 3;
var playerY = 34.5;

function checkHit() {
  at = document.getElementById("AT");
  ab = document.getElementById("AB");
  t = playerY - 10;
  b = playerY + 28;
  /*console.log("X: "+playerX+" / Y: "+playerY+ " | BT: " + playerYTop + "/ BB: " + playerYBot);*/
  A.style.left = playerX + "%";
  A.style.top = playerY + "%";
  at.style.top = t + "%";
  ab.style.top = b + "%";
  

  if (ballYpos > t && ballYpos < b && ballXpos <= 5) {
    console.log("Poop");
    goingRight = true;
    goingLeft = false;
  }
  
}

document.addEventListener('keydown', function(e){
  if(e.key === 'w')
  playerY -= 2;
  if(e.key === 's')
  playerY += 2;
})


//-------------------Player2----------------//

var bt;
var bb;
var t2 = 0;
var b2 = 0;
var player2X = 90;
var player2Y = 34.5;

function checkHit2() {
  bt = document.getElementById("BT");
  bb = document.getElementById("BB");
  t2 = player2Y - 10;
  b2 = player2Y + 28;
  /*console.log("X: "+playerX+" / Y: "+playerY+ " | BT: " + playerYTop + "/ BB: " + playerYBot);*/
  B.style.left = player2X + "%";
  B.style.top = player2Y + "%";
  bt.style.top = t2 + "%";
  bb.style.top = b2 + "%";
  

  if (ballYpos > t2 && ballYpos < b2 && ballXpos >= 85) {
    console.log("Poop2");
    goingRight = false;
    goingLeft = true;
  }
  
}

document.addEventListener('keydown', function(a){
  if(a.key === 'u')
  player2Y -= 2;
  if(a.key === 'j')
  player2Y += 2;
})
