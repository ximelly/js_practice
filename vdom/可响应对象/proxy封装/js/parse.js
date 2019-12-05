function parse(dom){
    assert(dom,"obj cannot be empty");
    assert(dom instanceof Node,"dom must be Node");

    let tagName=dom.tagName;

    if(dom.nodeType==document.ELEMENT_NODE){
        
        //attribute
        let attrs={};
        Array.from(dom.attributes).forEach(attr=>{
            attrs[attr.name]=attr.value;
        });

        //children
        //使用map更简单 不必forEach+push
        let children=Array.from(dom.childNodes).map(child=>parse(child)).filter(child=>child!==undefined);
        return {
            tagName:tagName,
            attrs:attrs,
            children:children
        }
    }else if(dom.nodeType==document.TEXT_NODE){
        let str=dom.data.trim();
        if(str){
            return {
                tagName:"text",
                data:dom.data.trim()
            }
        }else{
            return undefined;
        }
    }

}