import {parseDom,parseDirective} from "./parse.js";

let result=parseDom(document.getElementById("par"));
let attributes=parseDirective(result.attrs);
console.log(attributes);