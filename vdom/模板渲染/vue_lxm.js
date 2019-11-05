function _getRooter(options){
    assert(options.root,"root cannot be empty");
    let root;
    if(options.root instanceof HTMLElement){
        root=options.root;
    }else if(typeof options.root=="string"){
        root=document.querySelector(options.root);
    }else{
        assert(false,"root typeError");
    }
    assert(root,"root cannot find");
    return root;
}

function _getData(data){
    assert(data,"options.data is needed");
    assert(typeof data=="function","options.data must be function");
    let result;
    result=data();
    assert(data instanceof Object,"data must be Object");
    return result;
}


class LXM{
    constructor(options={}){
        this._root=_getRooter(options);
        this.data=_getData(options.data);

        this._template=this.root.cloneNode(true);//保存模板
        this._parent=this.root.parentNode;//父元素
        let _this=this;
        let proxy=new Proxy(this.data,{
                get(data,key){
                    assert(key in data,`${key} is not defined`);
                    return data[key];
                },
                set(data,key,value){
                    data[key]=value;
                    _this.render();
                }
            });
        this.render();
        return proxy;//实例就是这个proxy
    }

    render(){
        let root=this._template.cloneNode(true);
        [...root.childNodes].forEach(child=>{
            if(child.nodeType==document.ELEMENT_NODE){
                child.innerHTML=this._replace.apply(this,[child.innerHTML,"innerHTML"]);
            }else if(child.nodeType==document.TEXT_NODE){
                child.data=this._replace.apply(this,[child.data,"data"]);
            }
        })
        this._parent.replaceChild(root,this._root);
        this._root=root;
    }
    _replace(data,type){
        let newDate=data.replace(/\{\{[^\}]+\}\}/g,(str)=>{
            str=str.substring(2,str.length-2).trim();
            return this.data[str];
        })
        return newDate;
    }
}