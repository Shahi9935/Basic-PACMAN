// var canvas=document.getElementById('myCanvas');
// var ctx=canvas.getContext("2d");
// ctx.fillText("hello world",10,150);
var canvas = document.createElement("canvas");//creating using js
var score=0;
var Ghost = false;
var gscore=0;
var player={
  x:10,
  y:10,
  pacFace:320,
  pacDir:0,
  psize:32,
  speed:5
}
var ghost={
  x:150,
  y:150,
  pacFace:32,
  moving:0,
  speed:5,
  psize:32,
  dirx:0,
  diry:0,
  flash:0
}
var powerdot={
  x:10,
  y:10,
  powerup:false,
  countdown:0,
  ghostNum:0,
  ghosteat:false
}
var ctx = canvas.getContext("2d");
canvas.height=400;
canvas.width=600;
mImg=new Image();
mImg.ready = false;
mImg.onload=checkReady;
mImg.src="pac.png";

var keyclick={};
document.addEventListener("keydown",function(event){
  keyclick[event.keyCode]=true;
  move(keyclick)
},false);
document.addEventListener("keyup",function(event){
  delete keyclick[event.keyCode];
},false);

function move(keyclick){
  if(37 in keyclick){
    player.x = player.x-player.speed;
    player.pacDir=64;
  }
  if(38 in keyclick){
    player.y = player.y-player.speed;
    player.pacDir=96;
  }
  if(39 in keyclick){
    player.x = player.x+player.speed;
    player.pacDir=0;
  }
  if(40 in keyclick){
    player.y = player.y+player.speed;
    player.pacDir=32;
  }
  if(player.x>=(568)){
    player.x=0;
  }
  if(player.y>=(368)){
    player.y=0;
  }
  if(player.x<0){
    player.x=568;
  }
  if(player.y<0){
    player.y=368;
  }
  if(player.pacFace==320){
    player.pacFace=352;
  }
  else{
    player.pacFace=320;
  }

  render();
}

function myRandom(n){
  return Math.floor(Math.random()*n);
}

function checkReady(){
  this.ready=true;
  playgame();
}

function playgame(){
  render();
  requestAnimationFrame(playgame);

}

function render(){
  ctx.fillStyle= '#000';
  ctx.fillRect(0,0,600,400);

  if(!powerdot.powerup&&powerdot.countdown<5){
    powerdot.powerup=true;
    powerdot.x=myRandom(520)+30;
    powerdot.y=myRandom(320)+30;
  }

  if(!Ghost){
    ghost.ghostNum=myRandom(5);
    ghost.pacFace=ghost.ghostNum*64;
    ghost.x=myRandom(550);
    ghost.y=myRandom(320)+30;
    Ghost=true;
  }
  if(ghost.moving<0){
    ghost.moving = (myRandom(40))+myRandom(1);
    ghost.speed = myRandom(1)+1;
    ghost.dirx=0;
    ghost.diry=0;
    if(powerdot.ghosteat){
      ghost.speed=ghost.speed*-1;
    }
    if(ghost.moving%2==0){
      if(player.x<ghost.x){
        ghost.dirx =-ghost.speed;
      }else{
        ghost.dirx=ghost.speed;
      }}else{
      if(player.y<ghost.y){
        ghost.diry =-ghost.speed;
      }else{
        ghost.diry=ghost.speed;
      }
    }}
    ghost.moving--;
    ghost.x=ghost.x+ghost.dirx;
    ghost.y=ghost.y+ghost.diry;
    if(ghost.x>=(568)){
      ghost.x=0;
    }
    if(ghost.y>=(368)){
      ghost.y=0;
    }
    if(ghost.x<0){
    ghost.x=568;
    }
    if(ghost.y<0){
      ghost.y=368;
    }

    //Checking collision ghost
    if((player.x<=ghost.x+29)&&(ghost.x<=(player.x+28))&&(player.y<=ghost.y+31)&&(ghost.y<=(player.y+31))){
if(powerdot.ghosteat){//Player scores
score++;
}
else{//Enemy scores
gscore++;
}
player.x=10;player.y=10;
ghost.x=300;
ghost.y=200;
powerdot.countdown=0;
    }

    //Checking collision powerball
    if((player.x<=powerdot.x+9)&&(powerdot.x<=(player.x+32))&&(player.y<=powerdot.y+9)&&(powerdot.y<=(player.y+32))){
      powerdot.powerup=false;
      powerdot.countdown=500;
      powerdot.ghostNum=ghost.pacFace;
      ghost.pacFace=384;
      powerdot.x=0;
      powerdot.y=0;
      powerdot.ghosteat=true;
      // console.log("Now");
    }
if(powerdot.ghosteat==true&&powerdot.countdown<=500 ){
  // console.log("Inside powerup");
  powerdot.countdown--;
  if(ghost.flash==0){
  ghost.flash=32;
  }
  else{
    ghost.flash=0;
  }
    if(powerdot.countdown<0){
      powerdot.ghosteat=false;
      ghost.pacFace=powerdot.ghostNum;
      ghost.flash=0;
    }

  }

    if(powerdot.powerup==true){
      // console.log("abhi");
      ctx.fillStyle="#00ffff";
      ctx.beginPath();
      ctx.arc(powerdot.x,powerdot.y,10,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fill();
    }


  ctx.drawImage(mImg,ghost.pacFace,ghost.flash,32,32,ghost.x,ghost.y,ghost.psize,ghost.psize);
  ctx.drawImage(mImg,player.pacFace,player.pacDir,32,32,player.x,player.y,player.psize,player.psize);//320,0 specifies cooridnates in pac.png from which we haveto cut a width of 32 by 32 the paste it at 10,10 on canvas with width and height 32 and 32
  ctx.font="20px Comic Sans MS";
  ctx.fillStyle="white";
  ctx.fillText("PACMAN: "+score+" vs Ghost: "+gscore,352,18);
}

document.body.appendChild(canvas);
// ctx.fillText("hello world",10,150);
