import {
  getNumber,
  getObject,
  getString,
  getArray
 } from "get-safe-value";

import {
  isNull,
  isUndefined,
  isString,
  isValidString,
} from "./type";

import {
  isPhone,
  isEmail,
  isIDCard,
  isURL,
} from './validate';

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

const isPassValue: string = "";
const defaultErrorMessage: string = 'fail';
const getMessage = (item: any) => getString(item, 'message') || defaultErrorMessage;

const map = {
  [Types.notEmpty]: (value: any, item: any) => {
    return isNull(value) || isUndefined(value) || ( isString(value) && !isValidString(value) ) ? getMessage(item) : isPassValue; 
  },
  [Types.len]: (value: any, item: any) => {
    const message = getMessage(item);
    const values = getArray(item, 'value')
    const minLength = getNumber(values, '0') || null;
    const maxLength = getNumber(values, '1') || null;
    if (values.length == 0 || isNull(minLength) ) return message
    if (values.length == 1) {
      return value.length < minLength ? message : isPassValue
    } else {
      if( isNull(maxLength) ) return message;
      return value.length < minLength || value.length > maxLength ? message : isPassValue
    }
  },
  [Types.notEqual]: (value: any, item: any) => {
    const values = item['value'];
    return value === values ? isPassValue : getMessage(item);
  },
  [Types.enum]: (value: any, item: any) => {
    const values = item['value'] || {};
    const i = Object.keys(values).findIndex(key=> values[key] === value )
    return i > -1 ? isPassValue : getMessage(item);
  },
  [Types.phone]: (value: any, item: any) => {
    return isPhone(value) ? isPassValue :  getMessage(item);
  },
  [Types.email]: (value: any, item: any) => {
    return isEmail(value) ? isPassValue : getMessage(item);
  },
  [Types.IDCard]: (value: any, item: any) => {
    return isIDCard(value) ? isPassValue : getMessage(item);
  },
  [Types.URL]: (value: any, item: any) => {
    return isURL(value) ? isPassValue : getMessage(item);
  },
};

export default map