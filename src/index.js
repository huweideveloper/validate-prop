const {
  isObject,
  isArray,
  isFunction,
  isNull,
  isUndefined,
  isValidString,
  isFalse,
  isValidArray,
} = require("validate-data-type");
const { getString } = require("get-safe-value");
const map = require("./map");

const DEFAULT_ERROR_MESSAGE = "fail";
const TYPE = "type";
const MESSAGE = "message";
const TEST = "test";

function Validate(config) {
  this.config = {};
  if (!isObject(config)){
    throw "The parameters Validate the function must be object";
  }
  if (this instanceof Validate) {
    this.config = config;
  } else {
    return new Validate(config);
  }
}

Validate.prototype.start = async function (model) {
  if (!isObject(model)){
    throw "The parameters start the function must be object";
  }
  const config = this.config;
  return new Promise(async (resolve) => {
    let messages = [];
    const keys = Object.keys(config);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = config[key];
      const message = await this.getMessage(key, item, model);
      if (message) {
        messages.push(message);
      }
    }
    messages = this.getResult(messages);
    resolve(messages);
  });
};

Validate.prototype.getMessage = async function (key, item, model) {
  let result = null;
  if (isObject(item)) {
    const message = await this.getSingleMessage(key, item, model);
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
      const message = await this.getSingleMessage(key, item[i], model);
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

Validate.prototype.getSingleMessage = async function (key, item, model) {
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

Validate.prototype.getResult = async function (messages) {
  let obj = {
    error: null,
    list: messages.length > 0 ? messages : null,
  };
  if (messages.length > 0) {
    const { message } = messages[0];
    obj.error = isValidArray(message) ? message[0] : message;
  }
  return obj;
};

module.exports = Validate;
