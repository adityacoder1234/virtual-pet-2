//Create variables here
var dog,happydogimg,dogimg,database,food,foodstock;
var feed,addfood;
var feedtime,lastfed;
var foodobj;

function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png");
  happydogimg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
 
  foodobj= new vegs();
  
dog=createSprite(800,220,150,150);
dog.addImage(dogimg);
dog.scale = 0.15;

feed = createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addfood=createButton("Add food");
addfood.position(800,95);
addfood.mousePressed(addfoods);
}


function draw() { 
  background("green");

  feedtime= database.ref("Feedtime");
  feedtime.on("value", function(data){
    lastfed = data.val();
  })

 fill(225);
 textSize(20);
 if(lastfed >= 12)
 {
   text("last feed : " + lastfed % 12 +" PM", 350,30);
 }else if(lastfed == 0)
 {
   text("last feed : 12 AM",350, 30);
 }else
 {
   text("last feed : " + lastfed + "AM", 350 , 30);
 }
foodobj.display();
 
 
 

  drawSprites();
  //add styles here
  
}
function readStock(data)
{
  food = data.val();
  foodobj.updateFoodStocks(food);
}
function feedDog()
{
  dog.addImage(happydogimg);
  foodobj.updateFoodStocks(foodobj.getFoodStocks()- 1);
  database.ref('/').update({
    food:foodobj.getFoodStocks(),
    feedtime:hour(),
  })
}

function addfoods()
{
  food++;
  database.ref('/').update({
    Food: food,
  })
}


