class Rect extends Sprite{
    constructor(canvas,x,y,w,h){
        super(canvas);
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        console.log(this);
    }
    render(ctx){
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
