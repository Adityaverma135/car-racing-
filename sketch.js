var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var refresh;
var passedfinish;

var form, player, game;
var finished=0
var cars, car1, car2, car3, car4;
var badge1img,badge2img,badge3img

function preload(){
  carimg=loadImage("images/car1.png")
  carimg2=loadImage("images/car2.png")
  carimg3=loadImage("images/car3.png")
  carimg4=loadImage("images/car4.png")
  groundimg=loadImage("images/ground.png")
  trackimg=loadImage("images/track.jpg")
  badge1img=loadImage("images/badge1.png")
  badge2img=loadImage("images/badge2.png")
  badge3img=loadImage("images/badge3.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(255)
  if(playerCount === 4 && finished===0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if (finished===4){
    gameState=2;
    game.update(2);
  }
  if (gameState===2 && finished===4){
    game.displayrank();
  }
}
function reset(){
   location.reload
}
