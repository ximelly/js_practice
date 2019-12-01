let types={
  "rect":Rect,
  "triangle":Triangle
};

class Canvas{
  constructor(canvas){
    this._canvas=canvas;
    this.gb=this._canvas.getContext("2d");
    this.children=[];
    this._timer=0;
    this._initEvent();
  }
  creat(type,...args){
    let cls=types[type];
    assert(cls);
    let sprite=new cls(this,...args);
    this._addChild(sprite);

    //监听子元素的on事件事，因为子元素只有data，没有事件，所以把事件放在_data
    sprite._data.on=sprite.on.bind(sprite);

    //返回sprite，以便后期需要对sprite进行修改
    //改为返回sprite._data是因为要监听_data的变化
    return sprite._data;
  }
  _addChild(child){
    this.children.push(child);
  }
  _initEvent(){
    this._canvas.onclick=ev=>{
      this.children.forEach(sprite=>{
        if(sprite._data.canClick){
          let x=ev.offsetX,
              y=ev.offsetY;
          if(sprite._isIn(x,y)){
            sprite.emit("click",x,y);
          }
        }
      })
    }
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
