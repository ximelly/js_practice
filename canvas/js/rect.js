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
  _isIn(x,y){
    let _x=this._data.x,
        _y=this._data.y,
        _w=this._data.w,
        _h=this._data.h;
    return x>_x&&x<_x+_w&&y>_y&&y<_y+_h;
  }
}
