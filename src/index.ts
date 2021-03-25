import {
  isObject,
  isArray,
  isFunction,
  isNull,
  isUndefined,
  isValidString,
  isFalse,
  isValidArray,
} from './type'


import { getString } from "get-safe-value";
import map  from "./map";

const DEFAULT_ERROR_MESSAGE = "fail";
const TYPE = "type";
const MESSAGE = "message";
const TEST = "test";



async function validate(config: any, model: any): Promise<any> {
  if (!isObject(config) || !isObject(model) ){
    throw "The parameters validate the function must be object";
  }
  return new Promise( async resolve=>{
    const message = await start(config, model);
    resolve(message);
  }) 
}

async function start(config: any, model: any) {
  return new Promise(async resolve => {
    let messages: any[] = [];
    const keys = Object.keys(config);
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i];
      const item = config[key];
      const message = await getMessage(key, item, model);
      if (message) {
        messages.push(message);
      }
    }
    const result = getResult(messages);
    resolve(result);
  });
};

async function getMessage(key:string, item: any, model: any) {
  let result = null;
  if (isObject(item)) {
    const message = await getSingleMessage(key, item, model);
    if (message) {
      result = {
        key,
        message: [message],
      };
    }
  }
  if (isArray(item)) {
    let messages = [];
    for (let i = 0; i < item.length; i++) {
      const message = await getSingleMessage(key, item[i], model);
      if (message) messages.push(message);
    }
    if (messages.length > 0) {
      result = {
        key,
        message: messages,
      };
    }
  }
  return result;
};

async function getSingleMessage (key:string, item: any, model: any) {
  const type = getString(item, TYPE);
  const message = getString(item, MESSAGE) || DEFAULT_ERROR_MESSAGE;
  const test = item[TEST];
  const value = model[key];
  if (isFunction(test)) {
    const result = await test(value, key, item);
    if (isNull(result) || isUndefined(result) || isFalse(result)) return null;
    return isValidString(result) ? result : message;
  }
  if (map.hasOwnProperty(type)) {
    return map[type](value, item);
  }
  return null;
};


interface Result {
  error: string,
  list: any[],
}

function getResult(messages: any[]): Result {
  let result: Result = {
    error: "",
    list: messages.length > 0 ? messages : null,
  };
  if (messages.length > 0) {
    const { message } = messages[0];
    result.error = isValidArray(message) ? message[0] : message;
  }
  return result;
};

export default validate;
