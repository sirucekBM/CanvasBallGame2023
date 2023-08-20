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
        this.gravity = 0.05;
        this.steper = 0;
        this.maxSteper = 1000;


    }
    initMoveBall(dx,dy){
        this.dx = dx * this.speed;
        this.dy = dy * this.speed;
    }
    draw(ctx){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.updateTempPosition();

        if(this.dy === 0)return 

        if(this.steper > this.maxSteper){
            this.maxSteper = this.maxSteper * 0.8;
            this.steper = 0;
            this.dy = -this.dy;
            return;
        }



        // Detekce kolize s podlahou
        if (this.y  + this.radius > this.canvas.height) {
            this.y = this.canvas.height - this.radius;
            //this.dy *= -0.8; // Odrážení od země
            //this.dx *= 0.5; // osa X
            this.dy = -this.dy;
            //this.dy *= 0.8;
            this.dx *= 0.8;
            //this.speed = this.speed*0.5;
            console.log("dy: " + this.dy + " y: " + this.y);

        }

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



        if(this.x > this.canvas.width-this.radius || this.x < this.radius) {
            this.dx = -this.dx;
            //projectile.velocityY *= -0.8; // Odrážení od země
            //projectile.velocityX *= 0.5; // osa X
            //this.dx = this.dx *0.5;
            //this.dy *= -8;

        }





        this.y += this.gravity;
        this.x += this.dx/10;
        this.y += this.dy/10;

        if(this.dy<0){
            console.log("dy < 0 maxSteper: " + this.maxSteper);
            console.log("dy < 0 steper: " + this.steper);
            this.steper +=1;
            this.dy *= 0.99;
            if(this.steper > this.maxSteper){
                this.maxSteper = this.maxSteper * 0.8;
                this.steper = 0;
                this.dy = -this.dy;
            }
        }
        

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