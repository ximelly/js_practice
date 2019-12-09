import {assert} from "../../../../js/assert.js"

function parseDom(dom){
    assert(dom,"obj cannot be empty");
    assert(dom instanceof Node,"dom must be Node");

    if(dom.nodeType==document.ELEMENT_NODE){
        let tagName=dom.tagName.toLowerCase();
        //attribute
        let attrs={};
        Array.from(dom.attributes).forEach(attr=>{
            attrs[attr.name]=attr.value;
        });

        //children
        //使用map更简单 不必forEach+push
        let children=Array.from(dom.childNodes).map(child=>parseDom(child)).filter(child=>child!==undefined);
        //添加tag用来区分<text>slajaslgjk</text> & slajaslgjk
        return {
            type:"element",
            tagName:tagName,
            attrs:attrs,
            children:children,
            //<tag-search>：HTMLElement  <tagSearch>：HTMLUnknownElement
            isHtml:dom.constructor!==HTMLUnknownElement&&dom.constructor!==HTMLElement,
            el:dom
        }
    }else if(dom.nodeType==document.TEXT_NODE){
        let str=dom.data.trim();
        if(str){
            return {
                type:"text",
                data:dom.data.trim(),
                el:dom
            }
        }else{
            return undefined;
        }
    }
    return undefined;//注释标签
}
function parseDirective(attrs){
    assert(attrs,"attrs cannot be empty");
    assert(attrs.constructor==Object,"attrs must be Object");
    let directives=[];

    for(let key in attrs){
        // @xxx=xxxx v-on:xxx=xxx v-bind:xxx=xxx v-if=xxx  v-show=xxx  :xxx=xxx
        let obj;
        if(key.startsWith("v-")){
            let [name,arg]=key.split(":");//[] no {}  split not splite
            obj={name:name.replace(/^v\-/,""),arg:arg}//正则不需要引号
        }else if(key.startsWith("@")){
            obj={name:"on",arg:key.substring(1)}
        }else if(key.startsWith(":")){
            obj={name:"bind",arg:key.substring(1)}
        }
        if(obj){
            //检验参数是否有值 v-bind="wrong"  @="sa"
            assert((obj.name==="bind"&&obj.arg||obj.name!=="bind"),`bind must has args ${key}`);
            assert((obj.name==="on"&&obj.arg||obj.name!=="on"),`on must has args ${key}`);
            obj.value=attrs[key];
            directives.push(obj);
        }
    }
    return directives;
}
function parseListeners(directive){
    assert(directive,"directive cannot be empty");
    assert(directive instanceof Array,"directive cannot be Array");
    let events=directive.filter(item=>item.name=="on");
}
export{parseDom,parseDirective,parseListeners}