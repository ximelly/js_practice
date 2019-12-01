class Triangle extends Sprite{
  constructor(canvas,x,y,w,h){
    super(canvas);
    this._data.x=x;
    this._data.y=y;
    this._data.w=w;
    this._data.h=h;
  }
  render(ctx){
    let x=this._data.x;
    let y=this._data.y;
    let w=this._data.w;
    let h=this._data.h;

    ctx.beginPath();
    ctx.moveTo(x+w/2,y);
    ctx.lineTo(x, y+h); 
    ctx.lineTo(x+w, y+h); 
    ctx.closePath();
    ctx.fillStyle=this._data.bgColor||"#000";
    ctx.fill();
  }
}
