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
        this._template=this._root.cloneNode(true);//保存模板
        this._parent=this._root.parentNode;//父元素
        this._methods=options.methods||{};//保存方法

        let _this=this;
        let proxy=new Proxy(this.data,{
                get(data,key){
                    assert(key in data,`${key} is not defined`);
                    return data[key];
                },
                set(data,key,value){
                    console.log(`触发set ${key}`);
                    data[key]=value;
                    _this.render();
                }
            });
        this._proxy=proxy;
        this.render();
        return proxy;//实例就是这个proxy
    }

    render(){
        let root=this._template.cloneNode(true);
        //替换模板中的变量
        [...root.childNodes].forEach(child=>{
            if(child.nodeType==document.ELEMENT_NODE){
                child.innerHTML=this._replace.apply(this,[child.innerHTML,"innerHTML"]);
            }else if(child.nodeType==document.TEXT_NODE){
                child.data=this._replace.apply(this,[child.data,"data"]);
            }
        })

        //查找所有的事件
        Array.from(root.children).forEach((child)=>{
            Array.from(child.attributes).forEach((attr)=>{
                if(attr.name.startsWith("@")){
                    let evName=attr.name.substring(1);
                    child.addEventListener(evName,()=>{
                        //处理事件
                        let arr=[];
                        for(let key in this._methods){
                            arr.push(`let ${key}=this._methods[${JSON.stringify(key)}];`);
                        }
                        arr.push(attr.value+'.call(this._proxy)');
                        eval(arr.join(""));
                    }, false)
                }
            })
        })

        this._parent.replaceChild(root,this._root);
        this._root=root;
    }
    _replace(data,type){
        let newDate=data.replace(/\{\{[^\}]+\}\}/g,(str)=>{
            str=str.substring(2,str.length-2).trim();
            
            //处理运算符
            let arr=[];
            for(let key in this.data){
                arr.push(`let ${key}=${JSON.stringify(this.data[key])};`);
            }
            arr.push(str);
            return eval(arr.join(""));
        })
        return newDate;
    }
}