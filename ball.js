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
    }
    update(dx,dy){
        this.dx = dx;
        this.dy = dy;
    }
    draw(ctx){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        if(this.x > this.canvas.width-this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }
        if(this.y > this.canvas.height-this.radius || this.y < this.radius) {
            this.dy = -this.dy;
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
                    let leftDistanc = Math.abs((this.x + this.radius + 1) - rec.x);
                    let rightDistanc = Math.abs((this.x - this.radius - 1) - (rec.x + rec.w));
                    let topDistanc = Math.abs((this.y + this.radius + 1) - rec.y);
                    let downDistanc = Math.abs((this.y - this.radius - 1)- (rec.y + rec.h));
                    let minValue = Math.min(leftDistanc, rightDistanc, topDistanc, downDistanc);

                    if (minValue == topDistanc || minValue == downDistanc)
                    {
                        this.dy = -this.dy; 
                        console.log("top or down");
                        rec.x += moveRed;
                        if (minValue == topDistanc){
                            rec.y += movedObj;
                        }else{
                            rec.y -= movedObj;
                        }

                        return;
                    }

                    if (minValue == leftDistanc || minValue == rightDistanc)
                    {
                        this.dx = -this.dx;; 
                        console.log("lft or right");
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
        })}



}