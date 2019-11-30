let types={"rect":Rect};

class Canvas{
    constructor(canvas){
        this.canvas=canvas;
        this.gb=canvas.getContext("2d");
        this.children=[];
    }
    creat(type,...args){
        let cls=types[type];
        assert(cls);
        let sprite=new cls(this.canvas,...args);
        this.children.push(sprite);
    }
    render(ctx){
        this.gb.clearRect(0, 0, this.width, this.height);
        this.children.forEach(sprite=>{
            sprite.render(this.gb);
        })
    }
}
