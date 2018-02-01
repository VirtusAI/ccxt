'use strict';
/*  ------------------------------------------------------------------------ */

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _require = require('./functions/string'),
    unCamelCase = _require.unCamelCase;

var unCamelCasePropertyNames = function unCamelCasePropertyNames(x) {
  for (var k in x) {
    x[unCamelCase(k)] = x[k];
  } // camel_case_method = camelCaseMethod


  return x;
};
/*  ------------------------------------------------------------------------ */


module.exports = unCamelCasePropertyNames(_Object$assign({}, require('./functions/platform'), require('./functions/generic'), require('./functions/string'), require('./functions/type'), require('./functions/number'), require('./functions/encode'), require('./functions/crypto'), require('./functions/time'), require('./functions/throttle'), require('./functions/misc')));
/*  ------------------------------------------------------------------------ */