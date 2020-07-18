
let isNotNull = (value)=>{return value != null && value != undefined};

let isBubbleListNull = (list)=>{
	let isNull = !isNotNull(list);
	try{
		list.length();
	}catch(err){
		if(err.message == "e.length is not a function") isNull = true;
	}
	return isNull;
};

let isPrimitive = (value)=>{return (typeof value !== "object");}

let isBubbleListPrimitive = (list)=>{
	if(isBubbleListNull(list)) return false;
	return isPrimitive(list[0]);
};

let isBubbleOptionSet = (value)=>{
	if(typeof value.get != "function") return false;

	let isOptionSet = false;
	try{
		value.get("_id");
	}catch(err){
		isOptionSet = true;
	}
	return isOptionSet;
}

let isBubbleOptionSetList = (list)=>{
	if(!Array.isArray(list)) return false;
	if(isPrimitive(list) || isBubbleListNull(list)) return false;
	return isOptionSet(list[0]);
};

let loadBubbleList = function(list, start, length){
	return list.get(start,length);
};

let loadAllBubbleList = function(list){
	if(isBubbleListNull(list)) return {};
	return loadList(list, 0, list.length());
};	

let getConfig = function(values){
    let config = {};
    for(key in values){
        if(!isNotNull(values[key])) continue;
        let fKey = key;
        let obj = config;
        for(let i = 0;i < fKey.length-1;i++){
            if(fKey.charAt(i) == '$'){
                let aux = fKey.substring(0, i);
                obj[aux] = isNotNull(obj[aux]) ? obj[aux] : {};
                obj = obj[aux];
                fKey = fKey.substring(i + 1, fKey.length);
                i = 0;
            }
        }
        obj[fKey] = values[key];
    }
    return  config;
};

function clone(src) {
	function mixin(dest, source, copyFunc) {
		var name, s, i, empty = {};
		for(name in source){
			s = source[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}
		return dest;
	}

	if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
		return src;	
	}

	if(src.nodeType && "cloneNode" in src){
		return src.cloneNode(true);
	}

	if(src instanceof Date){
		return new Date(src.getTime());	
	}
	if(src instanceof RegExp){
		return new RegExp(src); 
	}
	var r, i, l;
	if(src instanceof Array){
		r = [];
		for(i = 0, l = src.length; i < l; ++i){
			if(i in src){
				r.push(clone(src[i]));
			}
		}
	}else{
		r = src.constructor ? new src.constructor() : {};
	}
	return mixin(r, src, clone);
}


function rgba2hex(orig){
	var a, isPercent,
	rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
	alpha = (rgb && rgb[4] || "").trim(),
	hex = rgb ?
	(rgb[1] | 1 << 8).toString(16).slice(1) +
	(rgb[2] | 1 << 8).toString(16).slice(1) +
	(rgb[3] | 1 << 8).toString(16).slice(1) : orig;

	if (alpha !== "") {
		a = alpha;
	} else {
		a = 01;
	}
	a = ((a * 255) | 1 << 8).toString(16).slice(1)
	hex = hex + a;
	return "#"+ hex;
}