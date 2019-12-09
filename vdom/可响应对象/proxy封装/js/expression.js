import {assert} from "../../../../js/assert.js"

export default function expr(str,data){
    assert(str,"str cannot be empty");
    assert(data,"data cannot be empty");
    assert(typeof str=="string","str must be String");
    assert(data.constructor===Object,"data must be String");

    function parseOrigion(s,str){
        if((s in window)||keyWords[s]&&!data[s]){//Math、new等排除
            return s;
        }else{
            return str;
        }

    }
    let strArray=parseExpre(str);
    let newArray=strArray.map(item=>{
        if(typeof item=="string"){
            return `'${item}'`;//加上双引号代表字符串
        }else{
            let newS=item.exp.replace(/.?[a-zA-z_\$][a-zA-z0-9_\$]*/ig,(s)=>{ 
            //?:0|1  *:0|n  .:除了回车符和换行符之外的所有字符
                if(/[a-zA-z_\$]/.test(s[0])){//第一个字符没匹配到
                    return parseOrigion(s,"data."+s);
                }else{//第一个字符匹配到了
                    if(s.startsWith(".")){//如果是属性则不加data
                        return s;
                    }else {
                        return s[0]+parseOrigion(s.substring(1),"data."+s.substring(1));
                    }
                }
                
            })
            return newS;
        }
    })
    let result=eval(newArray.join(""));
    return result;
}
let keyWords={
    "new":true,
    "class":true,
    "for":true
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