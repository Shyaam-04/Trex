var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trexAnim;
var ground, groundImage;
var iGround;
var cloud, cloudImage;
var rand;
var score = 0;
var cloudsGroup, obstaclesGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var trexCollide;
var gameOver,restart,gameoverImage,restartImage;
var highScore = 0;
//var message = "this is message";
//console.log(message);

function preload() {
  trexAnim = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trexCollide = loadImage("trex_collided.png");
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart image.jpg");
  //jumpSound = loadSound("jump.mp3");
  //dieSound = loadSound("die.mp3");
  //checkpointSound = loadSound("checkpoint.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  //var message = "this is message";
  //console.log(message);
  trex = createSprite(150, 250, 10, 40);
  trex.addAnimation("t1", trexAnim);
  trex.scale = 0.5;
  ground = createSprite(300, 250, 600, 10);
  ground.addImage("g1", groundImage);
  ground.velocityX = -5;
  iGround = createSprite(30, 260, 600, 10);
  iGround.visible = false;
  rand = Math.round(random(1, 100));
  //console.log(rand);
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  trex.addAnimation("collided",trexCollide);
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5;
  restart = createSprite(300,150);
  restart.addImage(restartImage);
  restart.scale = 0.1;
}

function draw() {
  background("black");
  trex.setCollider("circle",0,0,40);
  //console.log(gameState);
  trex.debug = false;
  //displaying score
  text("Score: "+ score, 500,50);
  text("high score:"+highScore,300,50);
  
  
  
  if(gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
    //move the ground
    ground.velocityX = -(4+score/100);
    //console.log(ground.velocityX);
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
       trex.velocityY = -13;
      //jumpSound.play();
    }
    //if(score%100 == 0 && score>0) {
      //checkpointSound.play();
    //}
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      //trex.velocityY = -13;
        gameState = END;
      
      //dieSound.play();
    }
  }
   else if (gameState === END) {
     gameover.visible = true;
     restart.visible = true;
      ground.velocityX = 0;
     trex.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     if(mousePressedOver(restart)){
       reset();
     }
     cloudsGroup.setVelocityXEach(0);
     
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     trex.changeAnimation("collided",trexCollide);
   }
  
 
  //stop trex from falling down
  trex.collide(iGround);
  
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running",trexAnim);
  cloudsGroup.destroyEach();
  //score = 0;
  if(highScore<score){
    highScore = score;
  }
  score = 0;
  console.log(highScore);
  
}



  function spawnObstacles() {
    if (frameCount % 60 === 0) {
      obstacle = createSprite(500, 230);
      obstacle.velocityX = -(4+score/100);
      //console.log(obstacle.velocityX);
      obstacle.scale = 0.5;
      var r = Math.round(random(1, 6));
      switch (r) {
        case 1:
          obstacle.addImage("o1", obstacle1);
          break;
        case 2:
          obstacle.addImage("o2", obstacle2);
          break;
        case 3:
          obstacle.addImage("o3", obstacle3);
          break;
        case 4:
          obstacle.addImage("o4", obstacle4);
          break;
        case 5:
          obstacle.addImage("o5", obstacle5);
          break;
        case 6:
          obstacle.addImage("o6", obstacle6);
          break;
        default:
          break;
      }
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);

    }
  }




  function spawnClouds() {
    if (frameCount % 60 === 0) {
      cloud = createSprite(300, 150, 60, 10);
      cloud.addImage("c1", cloudImage);
      cloud.y = Math.round(random(10, 60));
      cloud.scale = 0.3;
      cloud.velocityX = -3;
      trex.depth = cloud.depth;
      trex.depth = trex.depth + 1;
      cloud.lifetime = 200;


    }
  }

