/**
 * Created by LuFaLiu on 22/6/29.
 */

 import _ from "lodash";

/**
 * i18n
 * @param {Array} arr 
 * @returns 
 */
export function filteri18n(arr) {
    var str = "";
    for (var i of arr) {
        str += this.$t(i);
    }
    return str;
}

/**
 * window resize
 * @param {string} mainClass 
 * @param {string} orderClass 
 * @param {number} orderNum 
 * @returns {number}
 */
export function resizeObserver(mainClass,orderClass,orderNum) {
    var mainHeight = document.getElementsByClassName(mainClass).length > 0 && document.getElementsByClassName(mainClass)[0].clientHeight;
    var reduceHeight = 0;
    orderClass.filter(v=>{
        reduceHeight += document.getElementsByClassName(v).length > 0 && document.getElementsByClassName(v)[0].clientHeight;
    })
    return mainHeight - reduceHeight - parseInt(orderNum);
}

/**
 * Reset obj
 * @param {object} obj 
 * @returns 
 */
export function resetObj(obj) {
    return _.mapValues(obj, function(val,key) {
      if(_.isArray(val)){
        return val = [];
      }else if(_.isObject(val)){
        return val = {};
      }else {
        return val = '';
      }
    });
}
  
/**
 * Object key
 * @param {object} obj 
 * @param {string} val 
 * @returns 
 */
export function deepObject(obj,val) {
    const currentObj = _.find(obj, val);
    return currentObj ? currentObj[val] : obj[val];
}

/**
 * Array key
 * @param {Array|object} val 
 * @param {string} param 
 * @param {object} searchKey 
 * @returns 
 */
export function deepArray(val,param,searchKey = '') {
    if(_.isArray(val)){
        _.forEach(val,function (childrenVal) {
            if(_.isObject(childrenVal)){
                searchKey = deepObject(childrenVal,param);
            }
        });
    }else if(_.isObject(val)) {
        searchKey = deepObject(val,param);
    }
    return searchKey;
}

/**
 * Array-SpecifiedObject-Array
 * @param {VueComponent} _this 
 * @param {Array} list 
 * @param {string} paramName 
 * @param {object|string} paramVal 
 * @param {string} paramKey 
 * @param {function} callback 
 */
export function filterCondition(_this,list,paramName,paramVal,paramKey,callback) {
    _.forEach(_.filter(list,_.matches({[paramName]:paramVal})), function(value, key) {
        _.filter(value.childrenNode,function (item) {
            if(paramKey.indexOf(item.attributeName) > -1){
                callback(item);
            }
        })
    });
}

/**
 * VueComponent
 * @param {object} obj 
 * @param {string} path 
 * @param {string} path2 
 * @param {string} refName 
 * @param {VueComponent} result 
 * @returns 
 */
export function getVueComponent(obj,path,path2,refName,result = {}){
    var val = _.get(obj,path);
    if((_.isPlainObject(result)) && _.isArray(val)){
        _.filter(val,function (o) {
            if(_.includes(_.keys(o[path2]), refName)){
                
                result = o[path2][refName]; 
                console.log("result");
                console.log(result);
            }else {
                result = getVueComponent(o,path,path2,refName,result,result);
            }
        });
    }
    return result;
}

/**
 * dynamic v-model
 * @param {object} obj 
 * @param {string} str 
 * @param {object} val 
 * @param {string} type 
 * @returns 
 */
export function dynamicvModel(obj,str,val,type) {
    let parentObj = obj;
    str = str.replace(/\[(\w+)\]/g, ".$1"); // handler arr index
    let arr = str.split(".");
    for (let i in arr) {
        obj = obj[arr[i]] || ''; //obj[arr[i]]为0时默认会被转为false所以不能在后面加(或条件)
        if(type == 'set' && Object.keys(obj).indexOf(arr[arr.length - 1])>-1){ //key
            obj[arr[arr.length - 1]] = val; //set obj value
        }else if(type == 'set' && arr.length == 1){
            parentObj[arr[arr.length - 1]] = val; 
        }
    }
    return obj;
}
  