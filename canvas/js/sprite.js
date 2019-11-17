class Sprite{
    constructor(){
        this.x=0;
        this.y=0;
        this.w=0;
        this.h=0;
    }
    render(){
        throw new Error("子类未定义render方法");
    }
}