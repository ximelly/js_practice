import {parseDom,parseDirective,parseListeners} from "./parse.js";

import expression from "./expression.js"

let result=parseDom(document.getElementById("par"));
let attributes=parseDirective(result.attrs);


let str="Number(c)+a+b+obj.name+obj.students[2]+'字符串'+fn(a,b)+'hello'+Math.max(a,b)+obj.students.indexOf('lucy')+new Date().getTime()",
data={
    a:12,
    b:3,
    c:"99",
    obj:{
        name:"ximelly",
        students:["dusan","lucy","lily"]
    },
    fn:function(a,b){
        return a+b;
    }
}
let expResult=expression(str,data);
console.log(expResult);