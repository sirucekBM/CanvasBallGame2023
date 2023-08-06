
import { Ball } from './ball.js';


window.addEventListener('load',function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 500;
    const rect = canvas.getBoundingClientRect();
    canvas.addEventListener("mousemove", connectPath, false);
    canvas.addEventListener("click", onClick, false);
    var posXcircle = 10;
    var posYcircle = canvas.height -20;
    var mouseX = posXcircle;
    var mouseY = posYcircle;
    var dX = 0;
    var dY = 0;
    var rxArr=[];
    var maxSpeed = 20;
    var attraction = 0.5; 
    var mX = posXcircle;
    var mY  = posYcircle;
    var boolClick = false;
    var ball = new Ball(canvas,20,50,10,"red",10,50);

    function connectPath(e){
        mX = e.clientX - rect.left;
        mY = e.clientY - rect.top;

    }

    function drawConnect(){
        if(!boolClick)
        {
            let opacityValue =1;
            ctx.strokeStyle ='rgb(140,85,31,' + opacityValue + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(posXcircle, posYcircle);
            ctx.lineTo(mX, mY);
            ctx.stroke();
        }
    }



    function onClick(e) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        dX = (mouseX) - ball.x;
        dY = (mouseY) - ball.y;
        var distance = Math.sqrt(dX*dX + dY*dY);
        var speed = distance * attraction;
        console.log("speed : " +speed);
        if (speed > maxSpeed || speed < maxSpeed) speed = maxSpeed;

        console.log("speed2 : " +speed);
        console.log(dX + " : " +dY);

        dX = (dX/distance) * speed;
        dY = (dY/distance) * speed;

        console.log(dX + " : " +dY);
        console.log(distance);
        boolClick = true;
        ball.update(dX,dY);

    }
    
    class RectangleXY{
        constructor(x,y,w,h,colorX,name){
            this.x= x;
            this.y = y;
            this.w=w;
            this.h=h;
            this.color = colorX;
            this.name = name;
        };
        draw(context){
            context.beginPath();
            context.rect(this.x, this.y, this.w, this.h);
            context.fillStyle = this.color;
            context.strokeStyle  = this.color;
            context.fill();
        }
    }

    function darawRandomRectangle(){
        rxArr.forEach(rx =>{
            rx.draw(ctx);
        });

    }



      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnect();
        darawRandomRectangle();

        ball.draw(ctx);
        ball.detectBallObj(rxArr);

        requestAnimationFrame(animate);
      }

      let colorX = 'green';
      const rx1 = new RectangleXY(102,120,150,90,colorX,"Ga");
      const rx2 = new RectangleXY(402,270,170,90,colorX,"Gb");
      const rx3 = new RectangleXY(202,250,10,110,colorX,"Gc");
      const rx4 = new RectangleXY(300,300,50,50,colorX,"Gd");
      const rx5 = new RectangleXY(480,150,50,50,colorX,"Ge");
      colorX = 'red';
      const rxObject = new RectangleXY(202,50,10,50,colorX,"Ra");
      const rxObject2 = new RectangleXY(602,150,10,80,colorX,"Rb")
      const rxObject3 = new RectangleXY(502,380,10,50,colorX,"Rc");
      rxArr.push(rx1);
      rxArr.push(rx2);
      rxArr.push(rx3);
      rxArr.push(rx4);
      rxArr.push(rx5);
      rxArr.push(rxObject);
      rxArr.push(rxObject2);
      rxArr.push(rxObject3);



      animate();
 
})