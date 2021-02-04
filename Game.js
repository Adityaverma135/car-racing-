class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(carimg)
    car2 = createSprite(300,200);
    car2.addImage(carimg2)
    car3 = createSprite(500,200);
    car3.addImage(carimg3)
    car4 = createSprite(700,200);
    car4.addImage(carimg4)
    cars = [car1, car2, car3, car4];
    passedfinish=false
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getfinished();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      
      background(146,126,111)
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 195;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 230;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y

        if (index === player.index){
          stroke(10)
          fill("red")
          ellipse(x,y,70,70)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          
        }
        stroke(0)
        fill(0)
        textAlign(CENTER)
        textSize(15);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+70)
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedfinish!==true){
      player.distance +=10
      player.update();
    }

    if (player.distance>=500 && passedfinish===false){
      //gameState=2
      Player.updatefinished();
      player.rank=finished
      player.update();
      passedfinish=true;
    }

    drawSprites();
    
  }
  
  displayrank(){
    camera.position.x=0
    camera.position.y=0

    Player.getPlayerInfo();

    imageMode(CENTER);
    image(badge1img,0,-100,250,300)
    image(badge2img,displayWidth/4,-100+displayHeight/10,225,270)
    image(badge3img,displayWidth/-4,-100+displayHeight/9,200,240)

    textAlign(CENTER)
    textSize(50)
    for (var x in allPlayers){
      if (allPlayers[x].rank===1){
        text("1st: "+allPlayers[x].name,0,85)
      }
      else if (allPlayers[x].rank===2){
        text("2nd: "+allPlayers[x].name,displayWidth/4,displayHeight/9+73)
      }
      else if (allPlayers[x].rank===3){
        text("3rd: "+allPlayers[x].name,displayWidth/-4,displayHeight/10+76)
      }
      else{
        textSize(30)
        text("Better luck next time: "+allPlayers[x].name,0,255)
      }
    }
  }
}
