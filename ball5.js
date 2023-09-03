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

            // Detekce kolize s podlahou
        if (this.y  + this.radius > this.canvas.height || this.y < this.radius) {
            //this.y = this.canvas.height - this.radius;
            //this.dy *= -0.8; // Odrážení od země
            //this.dx *= 0.5; // osa X
            this.dy = -this.dy;
        }


        if(this.x > this.canvas.width-this.radius || this.x < this.radius) {
            this.dx = -this.dx;
            //projectile.velocityY *= -0.8; // Odrážení od země
            //projectile.velocityX *= 0.5; // osa X
            //this.dx = this.dx *0.5;
            //this.dy *= -8;

        }

        
        this.x += this.dx/10;
        this.y += this.dy/10;

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
                    
                    this.energy *= 0.9; 

                    if (this.energy < 0.6){
                        this.dx = 0;
                    }
                    this.updateTempPosition();
                    console.log("vektorX: " + this.vectorX + " vektorY: " + this.vectorY);
                    if(this.vectorY == -1 && this.dx == 0){
                        this.dy *= 1; 
                    }

                    this.dx *= this.energy;
                    this.dy *= this.energy;
                    console.log("energie: " + this.energy);
                    if(this.dx == 0 && this.vectorY == 1 ){
                        //this.dy = 0;
                        console.log("pada dolu: " + this.vectorY);
                        return; 
                    }

                        let leftDistanc = Math.abs((this.x + this.radius + 1) - rec.x);
                        let rightDistanc = Math.abs((this.x - this.radius - 1) - (rec.x + rec.w));
                        let topDistanc = Math.abs((this.y + this.radius + 1) - rec.y);
                        let downDistanc = Math.abs((this.y - this.radius - 1)- (rec.y + rec.h));
                        let minValue = Math.min(leftDistanc, rightDistanc, topDistanc, downDistanc);
                    
                    if (minValue == topDistanc || minValue == downDistanc)
                    {

                        this.dy = -this.dy; 
                        console.log("top or down");
                        if(this.dx != 0){
                            rec.x += moveRed;
                            if (minValue == topDistanc){
                                rec.y += movedObj;
                            }else{
                                rec.y -= movedObj;
                            }
                            return;
                        }
                    }

                    if (minValue == leftDistanc || minValue == rightDistanc)
                    {
                        
                        if(this.dx ==0){
                            this.y += 10;
                        }
                        
                        this.dx = -this.dx;; 
                        console.log("lft or right");

                        if(this.dx != 0){
                            rec.x += moveRed;
                            if (minValue == leftDistanc){
                                rec.x += movedObj;
                            }else{
                                rec.x -= movedObj;
                            }
                            return;
                        }
                    }
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