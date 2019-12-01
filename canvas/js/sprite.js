class Sprite extends EventQueue{
  constructor(canvas){
    assert(canvas);
    assert(canvas instanceof Canvas);
    super(canvas);
    this.canvas=canvas;
    let _this=this;
    this._data=new Proxy({
      x:0,y:0,
      w:0,h:0,
      canClick:false
    },{
      get(data,name){
        return data[name];
      },
      set(data,name,val){
        data[name]=val;
        _this.canvas.needUpdate();
        return true;
      }
    })
  }
  render(){
    throw new Error("子类未定义render方法");
  }
  _isIn(){
    throw new Error("no isin method");
  }
  on(type,...args){
    super.on(type,...args);
    this._data.canClick=type=="click"?true:false;
  }
}