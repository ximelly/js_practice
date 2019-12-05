function parse(dom){
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
        let children=Array.from(dom.childNodes).map(child=>parse(child)).filter(child=>child!==undefined);
        //添加tag用来区分<text>slajaslgjk</text> & slajaslgjk
        return {
            type:"element",
            tagName:tagName,
            attrs:attrs,
            children:children,
            //<tag-search>：HTMLElement  <tagSearch>：HTMLUnknownElement
            isHtml:dom.constructor!==HTMLUnknownElement&&dom.constructor!==HTMLElement,
            constructor:dom.constructor
        }
    }else if(dom.nodeType==document.TEXT_NODE){
        let str=dom.data.trim();
        if(str){
            return {
                type:"text",
                data:dom.data.trim()
            }
        }else{
            return undefined;
        }
    }
    return undefined;//注释标签
}