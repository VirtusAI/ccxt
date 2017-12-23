"use strict"; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var fybse = require('./fybse.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_fybse) {
  _inherits(fybsg, _fybse);

  function fybsg() {
    _classCallCheck(this, fybsg);

    return _possibleConstructorReturn(this, (fybsg.__proto__ || _Object$getPrototypeOf(fybsg)).apply(this, arguments));
  }

  _createClass(fybsg, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(fybsg.prototype.__proto__ || _Object$getPrototypeOf(fybsg.prototype), "describe", this).call(this), {
        'id': 'fybsg',
        'name': 'FYB-SG',
        'countries': 'SG',
        // Singapore
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766513-3364d56a-5edb-11e7-9e6b-d5898bb89c81.jpg',
          'api': 'https://www.fybsg.com/api/SGD',
          'www': 'https://www.fybsg.com',
          'doc': 'http://docs.fyb.apiary.io'
        },
        'markets': {
          'BTC/SGD': {
            'id': 'SGD',
            'symbol': 'BTC/SGD',
            'base': 'BTC',
            'quote': 'SGD'
          }
        }
      });
    }
  }]);

  return fybsg;
}(fybse);