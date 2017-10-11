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
  psize:32
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
  player.x++;
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
