import {parseDom,parseDirective,parseListeners} from "./parse.js";

import expression from "./expression.js"

let result=parseDom(document.getElementById("par"));
let attributes=parseDirective(result.attrs);


expression();