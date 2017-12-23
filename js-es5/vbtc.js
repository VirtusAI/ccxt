"use strict"; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var foxbit = require('./foxbit.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_foxbit) {
  _inherits(vbtc, _foxbit);

  function vbtc() {
    _classCallCheck(this, vbtc);

    return _possibleConstructorReturn(this, (vbtc.__proto__ || _Object$getPrototypeOf(vbtc)).apply(this, arguments));
  }

  _createClass(vbtc, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(vbtc.prototype.__proto__ || _Object$getPrototypeOf(vbtc.prototype), "describe", this).call(this), {
        'id': 'vbtc',
        'name': 'VBTC',
        'countries': 'VN',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27991481-1f53d1d8-6481-11e7-884e-21d17e7939db.jpg',
          'api': {
            'public': 'https://api.blinktrade.com/api',
            'private': 'https://api.blinktrade.com/tapi'
          },
          'www': 'https://vbtc.exchange',
          'doc': 'https://blinktrade.com/docs'
        }
      });
    }
  }]);

  return vbtc;
}(foxbit);