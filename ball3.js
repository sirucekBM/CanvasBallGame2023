export class Ball{
    constructor(canvas,x,y,radius,color,speed,energy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.energy = energy;
        this.dx = 0;
        this.dy = 0;
        this.canvas = canvas;
        this.previousX = x;
        this.previousY = y;
        this.vectorY = 0;
        this.vectorX = 0;
        this.gravity = 0.3;
        this.steper = 0;
        this.vx = 0.5;
        this.vy = 1;
        this.bounce = 0.7;
        this.xFriction = 0.3;

    }
    initMoveBall(dx,dy){
        this.dx = dx*25;// * this.speed;
        this.dy = dy*25;// * this.speed;
        this.vy = this.dy;
        this.vx = this.dx;
    }
    draw(ctx){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        if(this.dx != 0){
            this.ballMovement();
        }
        

/*


        // detekce ve smeru ze zdola na horu
        if (this.y < this.radius) {
            this.y = this.y + this.radius;
            //this.dy *= -0.8; // Odrážení od země
            //this.dx *= 0.5; // osa X
            this.dy = -this.dy;
            this.maxSteper = this.steper*0.8;
            this.steper = 0;
            console.log("max steper: " + this.maxSteper);
        }

        */

    }


   ballMovement(){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        
        //If either wall is hit, change direction on x axis
        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0){
            this.vx *= -1;
        } 
        
          // Ball hits the floor
        if (this.y + this.radius > this.canvas.height){// ||
          
            // Re-positioning on the base
           this.y = this.canvas.height - this.radius;
            //bounce the ball
            this.vy *= -this.bounce;
            //do this otherwise, ball never stops bouncing
              if(this.vy<0 && this.vy>-2.1)
              this.vy=0;
            //do this otherwise ball never stops on xaxis
             if(Math.abs(this.vx)<1.1)
             this.vx=0;
       
             this.xF();
        }

        //detekce vrchni hrany
        if (this.y < this.radius) {
            this.y = this.y + this.radius+3;
            this.dy = -this.dy;
            this.vy *= -1;
            //alert(this.dy);
            this.xF();
        }


        
        
    }
    
    xF(){
             if(this.vx>0)
             this.vx = this.vx - this.xFriction;
             if(this.vx<0)
             this.vx = this.vx + this.xFriction;
    }








    detectBallObj(rxArr){
        let moveRed = 0;
        let movedObj = 10;
        rxArr.forEach(rec => {


            if(rec.color == "red"){
                moveRed = 0;
            }

            if(this.y + this.radius >= rec.y && this.y - this.radius <= rec.y  + rec.h)
            {
                if(this.x + this.radius >= rec.x && this.x - this.radius <= rec.x  + rec.w)
                {

                        let leftDistanc = Math.abs((this.x + this.radius + 1) - rec.x);
                        let rightDistanc = Math.abs((this.x - this.radius - 1) - (rec.x + rec.w));
                        let topDistanc = Math.abs((this.y + this.radius + 1) - rec.y);
                        let downDistanc = Math.abs((this.y - this.radius - 1)- (rec.y + rec.h));
                        let minValue = Math.min(leftDistanc, rightDistanc, topDistanc, downDistanc);
                }

            }
        })}

        updateTempPosition() {
            if(this.previousX < this.x){
                this.vectorX = 1;
            }else{
                this.vectorX = -1;
            }

            if(this.previousY < this.y){
                this.vectorY = 1;
            }else{
                this.vectorY = -1;
            }

            this.previousX = this.x;
            this.previousY =this.y;

        }



}