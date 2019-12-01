let types={"rect":Rect};

class Canvas{
  constructor(canvas){
    this._canvas=canvas;
    this.gb=this._canvas.getContext("2d");
    this.children=[];
    this._timer=0;
  }
  creat(type,...args){
    let cls=types[type];
    assert(cls);
    let sprite=new cls(this,...args);
    this._addChild(sprite);
    //返回sprite，以便后期需要对sprite进行修改
    return sprite._data;
  }
  _addChild(child){
    this.children.push(child);
  }
  needUpdate(){
    clearTimeout(this._timer);
    this._timer=setTimeout(()=>{
      this.render();
    },0)
  }
  render(ctx){
    this.gb.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.children.forEach(sprite=>{
        sprite.render(this.gb);
    })
  }
}
