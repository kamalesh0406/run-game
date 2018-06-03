var canvas = document.getElementById("my_canvas");
var ctx = canvas.getContext('2d');

canvas.width = 1250;
canvas.height = 650;

var obstacles = [];
var flag =1;
var mouseX =0;
var mouseY =0;
var first = true;

var score =0;

function Obstacle(Xpos,Ypos,width,height){
	this.X = Xpos;
	this.Y = Ypos;

	this.height = height;
	this.width = width;

}
Obstacle.prototype.draw = function(){
	ctx.beginPath();
	ctx.rect(this.X,this.Y,this.width,this.height);
	ctx.fillStyle = "rgb(160, 38, 107)";
	ctx.fill();
	ctx.closePath();
}
Obstacle.prototype.updatePos = function(){
	this.X-= 3;
}
function setupObstacles(){
	var initialX = 100;

	for(i=0;i<8;i++){
		var Xpos = initialX;
		width = 30;
		var height = Math.round(200+Math.random()*400);
		if(flag==1){
			var Ypos = 0;
		}
		if(flag==-1){
			var Ypos = 650;
			height*=-1;
		}


		var obstacle = new Obstacle(Xpos,Ypos,width,height);

		obstacles.push(obstacle);

		flag*=-1;
		initialX+=150;

	}
	draw();
}
function newObstacle(){
	if(canvas.width-obstacles[obstacles.length-1].X>149 && canvas.width-obstacles[obstacles.length-1].X<152){
		var Xpos = canvas.width;
		var width = 30;
		var height = Math.round(200+Math.random()*400);
		if(flag==1){
			var Ypos = 0;
		}
		if(flag==-1){
			var Ypos = 650;
			height*=-1;
		}
		var obstacle = new Obstacle(Xpos,Ypos,width,height);
		obstacles.push(obstacle);

		flag*=-1;
		/*if(obstacles.length==10){
			obstacles.shift();
		}*/
	}

}
function collisionDetection(){
	for(i=0;i<obstacles.length;i++){
		var wallX = obstacles[i].X;
		var wallY = obstacles[i].Y;
		var wallHeight = obstacles[i].height;
		if(mouseX>wallX && mouseX<wallX+width){
			
			if (wallHeight>0){
				if(mouseY<wallY+wallHeight){
					alert("Game Over");
					window.location.reload(true);

				}
			}
			else{
				wallHeight*=-1;
				if(mouseY>wallY-wallHeight){
					alert("Game Over");
					window.location.reload(true)				;
				}
			}
		}
		if(mouseX>wallX+width){
			score++;
		}

	}
}
function drawMan(){
	ctx.beginPath();
	ctx.arc(mouseX,mouseY,10,0,Math.PI*2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	score=0;
	for(i=0;i<obstacles.length;i++){
		obstacles[i].draw();
		obstacles[i].updatePos();
	}
	newObstacle();
	drawMan();
	collisionDetection();

	ctx.beginPath()
	ctx.font ="30px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score "+score,10,30);
	ctx.closePath();

	if (!first){
	requestAnimationFrame(draw);
	}
}
function posupdate(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}
function start(){
	first = false;
	draw();
}
setupObstacles();
canvas.addEventListener("mousemove",posupdate);
canvas.addEventListener("click",start)

