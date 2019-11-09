let defaultOptions={
    method:"get"
}
window.fetch=function(url,options){
    return new Promise((resolve,reject)=>{
        this.options=Object.assign({},defaultOptions,options);

        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==3){
                resolve(new handleResponse(xhr));
            }
        }
        xhr.open(this.options.method,url,true);//第三个参数是否使用异步
        xhr.send(null);
    })
}

class handleResponse{
    constructor(xhr){
        this._data=new Promise((resolve,reject)=>{
            xhr.onreadystatechange=function(){//下一次readyState变化一定是4，所以可以不用判断
                resolve(xhr);
            }
        })
    }
    text(){
        return new Promise((resolve,reject)=>{
            this._data.then(xhr=>{
                resolve(xhr.responseText);
            });
        })
    }
    json(){
        return new Promise((resolve,reject)=>{
            this.text().then(data=>{
                try{
                    resolve(JSON.parse(data));
                }catch(e){
                    reject(e);
                }
            })
        })
    }
}