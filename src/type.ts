const isType = (value:any, type: string): boolean => Object.prototype.toString.call(value) === '[object ' + type + ']';

const isNull = (value:any): boolean => isType(value, 'Null');
const isUndefined = (value:any): boolean => isType(value, 'Undefined');

// string
function trim(value: string) {
    if (!!String.prototype.trim) return value.trim();
    return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
const isString = (value:any): boolean => isType(value, 'String');
const isValidString = (value:any): boolean => isString(value) && trim(value).length > 0;
const isEmptyString = (value:any): boolean => isString(value) && trim(value).length === 0;

// boolean
const isBoolean = (value:any): boolean => isType(value, 'Boolean');
const isTrue = (value:any): boolean => isBoolean(value) && value === true;
const isFalse = (value:any): boolean => isBoolean(value) && value === false;

// number
const MaxNumber = Math.pow(2, 53) - 1;
const isNumber = (value:any): boolean => isType(value, 'Number');
const isValidNumber = (value:any): boolean => isNumber(value) && isFinite(value) && value < MaxNumber && value > -MaxNumber;

// function
const isFunction = (value:any): boolean => typeof value === "function";

// array
const isArray = (value:any): boolean => isType(value, 'Array');
const isValidArray = (value:any): boolean => isArray(value) && value.length > 0;
const isEmptyArray = (value:any): boolean => isArray(value) && value.length === 0;

// object
const isObject = (value:any): boolean => isType(value, 'Object');
const isValidObject = (value:any): boolean => isObject(value) && Object.keys(value).length > 0;
const isEmptyObject = (value:any): boolean => isObject(value) && Object.keys(value).length === 0;


export {
    isNull,
    isUndefined,
    isString,
    isValidString,
    isEmptyString,
    isBoolean,
    isFalse,
    isNumber,
    isValidNumber,
    isFunction,
    isArray,
    isValidArray,
    isEmptyArray,
    isObject,
    isValidObject,
    isEmptyObject,
}