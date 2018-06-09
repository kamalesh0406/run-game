var canvas = document.getElementById("my_canvas");
var ctx = canvas.getContext('2d');

canvas.width = 1250;
canvas.height = 650;


var shift =0;
var frameWidth = 79;
var frameHeight = 83;
var frame = 1;
var totalFrame = 3;
var time=0;

enemieslist = [];

var obstacles = [];
var flag =1;
var mouseX =0;
var mouseY =0;
var first = true;
var touching = false;
var bottom = false;
var heightofObstacle = 0;
var score = 0;
var clickCount =0;


function Obstacle(Xpos,Ypos,width,height){
	this.X = Xpos;
	this.Y = Ypos;

	this.height = height;
	this.width = width;

	this.shift = 1;
	this.frame = 1;
	this.time = 0;
	this.hit = false;

	this.enemies = new Image();
	this.enemies.src = "blue_ninja_0.png";
	
}
Obstacle.prototype.draw = function(){
	ctx.beginPath();
	ctx.rect(this.X,this.Y,this.width,this.height);
	if(!this.hit){
	if(this.height>0){
	if(this.time>=0 && this.time<=30){
		ctx.drawImage(this.enemies,this.shift,0,frameWidth,frameHeight,this.X,this.Y+this.height,frameWidth,frameHeight);
		
		if(this.time==30){
			this.shift+=frameWidth;
			this.frame+=1;
			this.time=0
		}
		if(this.frame==4){
			this.frame=1;
			this.shift=0;
		}
		
	}
}
}
	ctx.fillStyle = "rgb(160, 38, 107)";
	ctx.fill();
	ctx.closePath();
}
Obstacle.prototype.updatePos = function(){
	this.X-= 3;
	this.time+=1;
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
	}

}
function collisionDetection(){
	for(i=0;i<obstacles.length;i++){
		var wallX = obstacles[i].X;
		var wallY = obstacles[i].Y;
		var wallHeight = obstacles[i].height;
		if(!touching){
			if (wallHeight>0){
				if(mouseY<wallHeight && mouseX>wallX-5 && mouseX<=wallX){
					
					mouseX = obstacles[i].X;
					heightofObstacle = wallHeight;
					touching = true;
				}
			}
			if (wallHeight<0){
				
				if(mouseY>wallY+wallHeight && mouseX>wallX-5 && mouseX<=wallX){
					mouseX = obstacles[i].X;
					heightofObstacle = wallY+wallHeight;
					touching = true;
					bottom = true;
				}
			}
		}
		if(mouseX>wallX+width){
			score++;
		}
		if(wallHeight>0){
			if(mouseX>wallX+frameWidth && mouseY > wallHeight){
				if(obstacles[i].hit==false){
					alert("Game Over")
					window.location.reload(true);
				}
			}

		}

	}
	if(mouseX<0){
		alert("Game Over");
		window.location.reload(true);
	}
}
function checkEnemies(mouseX,mouseY){

	for(i=0;i<obstacles.length;i++){
		var X = obstacles[i].X;
		var y =  obstacles[i].Y;
		var height = obstacles[i].height;
		if(height>0){
		if(mouseX > X && mouseX < X+frameWidth && mouseY > height && mouseY<height+frameHeight){
			obstacles[i].hit = true;
		}
	}
	}

}
function drawMan(){
	if (touching){

		mouseX-=3;
	}
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
	if(!touching){

	mouseX = e.clientX;}
	mouseY = e.clientY;
	if(bottom == false && mouseY>heightofObstacle){
		touching = false;
	}
	if(bottom == true && mouseY<heightofObstacle){
		e.clientX = mouseX;
		touching = false;
		bottom = false;
	}
}
function start(e){
	clickCount++;
	if(clickCount>2){
		checkEnemies(e.clientX,e.clientY);
	}
	if(clickCount==2){
		first = false;
		draw();

	}
}
setupObstacles();
canvas.addEventListener("mousemove",posupdate);
canvas.addEventListener("click",start)

