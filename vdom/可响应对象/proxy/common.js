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
function _getData(options){
    assert(options.data,"options.data is needed");
    assert(typeof options.data=="function","options.data must be function");
    let result=options.data();
    assert(result instanceof Object,"data must be Object");
    return result;
}
function creatCls(obj){
    return new Proxy(obj,{
        construct(cls,args){
            let obj=new cls(...args);
            obj.root=_getRooter(args[0]);
            obj.data=_getData(args[0]);
            obj.render();
            return new Proxy(obj,{
                get(_obj,name){
                    if(name in _obj.data){
                        return _obj.data[name];
                    }else{
                        throw new Error(`${name} is not defined`)
                    }
                },
                set(_obj,name,val){
                    _obj.data[name]=val;
                    _obj.render();
                }
            });
        }
    })
}