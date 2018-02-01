"use strict";
/*  ------------------------------------------------------------------------ */

var _typeof = require("@babel/runtime/helpers/typeof");

var _Number$isFinite = require("@babel/runtime/core-js/number/is-finite");

var isNumber = _Number$isFinite,
    isArray = Array.isArray,
    isString = function isString(s) {
  return typeof s === 'string';
},
    isObject = function isObject(o) {
  return o !== null && _typeof(o) === 'object';
},
    isDictionary = function isDictionary(o) {
  return isObject(o) && !isArray(o);
},
    isStringCoercible = function isStringCoercible(x) {
  return hasProps(x) && x.toString || isNumber(x);
};
/*  .............................................   */


var hasProps = function hasProps(o) {
  return o !== undefined && o !== null;
},
    prop = function prop(o, k) {
  return isObject(o) ? o[k] : undefined;
};
/*  .............................................   */


var asFloat = function asFloat(x) {
  return isNumber(x) || isString(x) ? parseFloat(x) : NaN;
},
    asInteger = function asInteger(x) {
  return isNumber(x) || isString(x) ? parseInt(x, 10) : NaN;
};
/*  .............................................   */


module.exports = {
  isNumber: isNumber,
  isArray: isArray,
  isObject: isObject,
  isString: isString,
  isStringCoercible: isStringCoercible,
  isDictionary: isDictionary,
  hasProps: hasProps,
  prop: prop,
  asFloat: asFloat,
  asInteger: asInteger,
  safeFloat: function safeFloat(o, k, $default) {
    var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : asFloat(prop(o, k));
    return isNumber(n) ? n : $default;
  },
  safeInteger: function safeInteger(o, k, $default) {
    var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : asInteger(prop(o, k));
    return isNumber(n) ? n : $default;
  },
  safeValue: function safeValue(o, k, $default) {
    var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : prop(o, k);
    return hasProps(x) ? x : $default;
  },
  safeString: function safeString(o, k, $default) {
    var x = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : prop(o, k);
    return isStringCoercible(x) ? String(x) : $default;
  }
  /*  ------------------------------------------------------------------------ */

};