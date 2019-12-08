function assert(bol,msg){
    if(!bol){
        throw new Error(msg||`${bol}`);
    }
}
export {assert}