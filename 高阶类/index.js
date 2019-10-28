class Store{
    constructor(){
        this.state={};
    }
    get(key){
        if(key in this.state){
            return this.state[key];
        }else{
            throw new Error(`${key} is not defined`);
        }
    }
    set(key,value){
        this.state[key]=value;
    }
    connect(cls){
        let store=this;
        return class extends cls{
            constructor(...args){
                super(...args);
                this.get=store.get.bind(store);
                this.set=store.set.bind(store);
            }
        }
    }
}

let store=new Store();