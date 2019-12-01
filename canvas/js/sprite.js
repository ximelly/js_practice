class Sprite{
  constructor(canvas){
    assert(canvas);
    assert(canvas instanceof Canvas);
    this.canvas=canvas;
    let _this=this;
    this._data=new Proxy({
      x:0,y:0,
      w:0,h:0
    },{
      get(data,name){
        assert(data[name]!=undefined);
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
}