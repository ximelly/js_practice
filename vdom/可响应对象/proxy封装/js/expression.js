import {assert} from "../../../../js/assert.js"

export default function expr(str,data){
    str="a+b+obj.name+obj.students[2]+'字符串'+fn(a,b)+'hello'";
    data={
        a:12,
        b:3,
        fn:function(a,b){
            return a+b;
        }
    }
    assert(str,"str cannot be empty");
    assert(data,"data cannot be empty");
    assert(typeof str=="string","str must be String");
    assert(data.constructor===Object,"data must be String");

    let strArry=parseExpre(str);
    console.log(strArry);
    return strArry;
}

function parseExpre(str){
    let arr=[];
    while(str){
        let n=str.search(/'|"/);//first '||";
        if(n==-1){
            arr.push({exp:str});
            break;
        }
        let m=n+1;
        while(str){
            m=str.indexOf(str[n],m);//找到第一个引号后，继续往后面找第二个引号
            if(m==-1){
                throw new Error("引号未配对~");
                break;
            }
            if(str[m-1]=="\\"){
                continue;
            }else{
                break;
            }
            
        }
        if(n>0){
            arr.push({exp:str.substring(0, n)});
        }
        arr.push(str.substring(n+1, m));
        str=str.substring(m+1);
    }
    return arr;
}