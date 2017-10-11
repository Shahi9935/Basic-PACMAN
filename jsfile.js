// var canvas=document.getElementById('myCanvas');
// var ctx=canvas.getContext("2d");
// ctx.fillText("hello world",10,150);
var canvas = document.createElement("canvas");//creating using js
var score=0;
var gscore=0;
var player={
  x:10,
  y:10,
  pacFace:320,
  pacDir:0,
  psize:32,
  speed:5
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

function checkReady(){
  this.ready=true;
  playgame();
}

function playgame(){
  render();

}

function render(){
  ctx.fillStyle= '#000';
  ctx.fillRect(0,0,600,400);
  ctx.drawImage(mImg,player.pacFace,player.pacDir,32,32,player.x,player.y,player.psize,player.psize);//320,0 specifies cooridnates in pac.png from which we haveto cut a width of 32 by 32 the paste it at 10,10 on canvas with width and height 32 and 32
  ctx.font="20px Comic Sans MS";
  ctx.fillStyle="white";
  ctx.fillText("PACMAN: "+score+" vs Ghost: "+gscore,372,18);
}

document.body.appendChild(canvas);
// ctx.fillText("hello world",10,150);
