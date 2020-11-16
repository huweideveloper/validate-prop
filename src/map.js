const {
  getString,
  getNumber,
  getArray,
} = require("get-safe-value");
const {
  isNull,
  isUndefined,
  isString,
  isValidString,
} = require("validate-data-type");
const {
  isPhone,
  isEmail,
  isIDCard,
  isURL,
} = require('./validate');

const Types = {
  notEmpty: 'notEmpty',
  len: 'length',
  notEqual: 'notEqual',
  enum: 'enum',
  phone: 'phone',
  email: 'email',
  IDCard: 'IDCard',
  URL: 'URL',
}

const isPassValue = null;
const defaultErrorMessage = 'fail';
const getMessage = item => getString(item, 'message') || defaultErrorMessage;

const map = {
  [Types.notEmpty]: (value, item) => {
    return isNull(value) || isUndefined(value) || ( isString(value) && !isValidString(value) ) ? getMessage(item) : isPassValue; 
  },
  [Types.len]: (value, item) => {
    const message = getMessage(item);
    const values = getArray(item, 'value')
    const minLength = getNumber(values, '0', null)
    const maxLength = getNumber(values, '1', null)
    if (values.length == 0 || isNull(minLength) ) return message
    if (values.length == 1) {
      return value.length < minLength ? message : isPassValue
    } else {
      if( isNull(maxLength) ) return message;
      return value.length < minLength || value.length > maxLength ? message : isPassValue
    }
  },
  [Types.notEqual]: (value, item) => {
    const values = item['value'];
    return value === values ? isPassValue : getMessage(item);
  },
  [Types.enum]: (value, item) => {
    const values = item['value'] || {};
    const i = Object.keys(values).findIndex(key=> values[key] === value )
    return i > -1 ? isPassValue : getMessage(item);
  },
  [Types.phone]: (value, item) => {
    return isPhone(value) ? isPassValue :  getMessage(item);
  },
  [Types.email]: (value, item) => {
    return isEmail(value) ? isPassValue : getMessage(item);
  },
  [Types.IDCard]: (value, item) => {
    return isIDCard(value) ? isPassValue : getMessage(item);
  },
  [Types.URL]: (value, item) => {
    return isURL(value) ? isPassValue : getMessage(item);
  },
};


module.exports = map