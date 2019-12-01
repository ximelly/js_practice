class Rect extends Sprite{
  constructor(canvas,x,y,w,h){
    super(canvas);
    this._data.x=x;
    this._data.y=y;
    this._data.w=w;
    this._data.h=h;
  }
  render(ctx){
    ctx.fillStyle=this._data.bgColor||"#000";
    ctx.fillRect(this._data.x, this._data.y, this._data.w, this._data.h);
  }
}
