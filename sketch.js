
var monkey , monkey_running;
var banana ,bananaImage, rock, rockImage;
var bananaGroup, rockGroup;
var ground; 
var score;

function preload(){
  
  
  monkey_running =       loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png");
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
 
}

function setup() {
 createCanvas(600, 800);
  var survivalTime=0; 
   monkey=createSprite(100,300,10,10);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1;
  
  ground = createSprite(500,350,1200,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
 // console.log(ground.x)

  bananaGroup = new Group();
  rockGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("white");
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  console.log(monkey.y);
   
    if(keyDown("space") && monkey.y>=314 ) {
      monkey.velocityY = -16;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnBanana();
    spawnRock();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(rockGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        rockGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        rockGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnRock() {
  if(frameCount % 300 === 0) {
    rock = createSprite(800,320,10,40);
    rock.velocityX = -6;   
   
    rock.addImage(rockImage);
    rock.scale=0.15;
    rock.lifetime = 300;
    
    rockGroup.add(rock);
  }
}
