
export class UI{
    constructor(ball) {
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.fontColor = "black";
        this.ball = ball;
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.fontColor;

        context.fillText('Vzdalenost: ' + this.ball.distance,20,50);
        context.fillText('Vaha: ' + this.ball.gravity,20,90);
        context.fillText('Energie: ' + this.ball.speed,20,130);
        context.restore();
    }
 

}