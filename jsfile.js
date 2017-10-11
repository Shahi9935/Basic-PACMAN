// var canvas=document.getElementById('myCanvas');
// var ctx=canvas.getContext("2d");
// ctx.fillText("hello world",10,150);
var canvas = document.createElement("canvas");//creating using js
var ctx = canvas.getContext("2d");
canvas.height=400;
canvas.width=600;
document.body.appendChild(canvas);
ctx.fillText("hello world",10,150);
