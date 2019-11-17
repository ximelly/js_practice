class Rect extends Sprite{
    constructor(x,y,w,h){
        super();
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }
    render(ctx){
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}
