function create(obj,cb){
    assert(obj,"obj cannot be empty");
    assert(cb,"cb cannot be empty");
    assert(typeof cb=="function","cb must be function");

    let res;
    if(obj instanceof Array){
        res=[];
        for(let i=0,len=obj.length;i<len;i++){
            res[i]=create(obj[i],cb);
        }
    }else{
        res={};
        for(let key in obj){
            if(obj[key] instanceof Object){
                res[key]=create(obj[key],cb);
            }else{
                res[key]=obj[key];
            }
            
        }
    }

    return new Proxy(res,{
        has(data,name){
            if(name in data){
                return true;
            }else{
                return false;
            }
        },
        get(data,name){
            if(name in data){
                return data[name];
            }else{
                throw new Error(`${name} is not defined`)
            }
        },
        set(data,name,val){
            data[name]=val;
            cb(name);
            return true;
        },
        deleteProperty(data,name){
            if(name in data){
                cb();
                return delete data[name];
            }else{
                throw new Error(`${name} is not defined`)
            }
        }
    })
}