
const {
  isObject,
  isArray,
  isFunction,
  isNull,
  isUndefined,
  isString,
  isValidString,
  isFalse,
  isValidArray,
} = require("validate-data-type");
const {
  getString,
} = require("get-safe-value");
const map = require('./map');


function Validation(config) {
  this.defaultErrorMessage = 'fail';
  this.config = {};
  if (!isObject(config)) throw ("The parameters Validation the function must be object");
  if (this instanceof Validation) {
    this.config = config;
  } else {
    return new Validation(config);
  }
}

Validation.prototype.start = async function (model) {
  if (!isObject(model)) throw ("The parameters start the function must be object");
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
    resolve(messages)
  });
}

Validation.prototype.getMessage = async function (key, item, model) {
  let result = null;
  if (isObject(item)) {
    const message = await this.getSingleMessage(key, item, model);
    if (message) result = { key, message };
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
        message: messages
      };
    }
  }
  return result;
}

Validation.prototype.getSingleMessage = async function (key, item, model) {
  const type = getString(item, 'type');
  const message = getString(item, 'message') || this.defaultErrorMessage;
  const test = item['test'];
  const value = model[key];
  if (isFunction(test)) {
    const result = await test(value, key, item);
    if( isNull(result) || isUndefined(result) || isFalse(result) ) return null;
    return isValidString(result) ? result : message;
  }
  if (map.hasOwnProperty(type)) {
    return map[type](value, item);
  }
  return null;
}

Validation.prototype.getResult = async function (messages) {
  let obj = {
    error: null,
    key: null,
    result: messages.length > 0 ? messages : null,
  };
  if (messages.length > 0) {
    const { message, key } = messages[0];
    obj.error = isValidArray(message) ? message[0] : message;
    obj.key = key;
  }
  return obj;
}

module.exports = Validation