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
  isUserName,
} = require('./validate');

const Types = {
  notEmpty: 'notEmpty',
  len: 'length',
  notEqual: 'notEqual',
  isPhone: 'isPhone',
  isEmail: 'isEmail',
  isIDCard: 'isIDCard',
  isURL: 'isURL',
  isUserName: 'isUserName',
}

const isPassValue = null;

const map = {
  [Types.notEmpty]: (value, item) => {
    return isNull(value) || isUndefined(value) || ( isString(value) && !isValidString(value) ) ? getString(item, 'message') : isPassValue; 
  },
  [Types.len]: (value, item) => {
    value = getString(value)
    const message = getString(item, 'message')
    const values = getArray(item, 'value')
    const minLength = getNumber(values, '0')
    const maxLength = getNumber(values, '1')
    if (values.length == 0) {
      return message
    } else if (values.length == 1) {
      return value.length < minLength ? message : isPassValue
    } else {
      return value.length < minLength || value.length > maxLength ? message : isPassValue
    }
  },
  [Types.notEqual]: (value, item) => {
    const values = item['value'];
    return value === values ? isPassValue : getString(item, 'message');
  },
  [Types.isPhone]: (value, item) => {
    return isPhone(value) ? isPassValue :  getString(item, 'message');
  },
  [Types.isEmail]: (value, item) => {
    return isEmail(value) ? isPassValue : getString(item, 'message');
  },
  [Types.isIDCard]: (value, item) => {
    return isIDCard(value) ? isPassValue : getString(item, 'message');
  },
  [Types.isURL]: (value, item) => {
    return isURL(value) ? isPassValue : getString(item, 'message');
  },
  [Types.isUserName]: (value, item) => {
    return isUserName(value) ? isPassValue : getString(item, 'message');
  },
};


module.exports = map