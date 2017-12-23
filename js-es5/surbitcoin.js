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
  _inherits(surbitcoin, _foxbit);

  function surbitcoin() {
    _classCallCheck(this, surbitcoin);

    return _possibleConstructorReturn(this, (surbitcoin.__proto__ || _Object$getPrototypeOf(surbitcoin)).apply(this, arguments));
  }

  _createClass(surbitcoin, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(surbitcoin.prototype.__proto__ || _Object$getPrototypeOf(surbitcoin.prototype), "describe", this).call(this), {
        'id': 'surbitcoin',
        'name': 'SurBitcoin',
        'countries': 'VE',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27991511-f0a50194-6481-11e7-99b5-8f02932424cc.jpg',
          'api': {
            'public': 'https://api.blinktrade.com/api',
            'private': 'https://api.blinktrade.com/tapi'
          },
          'www': 'https://surbitcoin.com',
          'doc': 'https://blinktrade.com/docs'
        }
      });
    }
  }]);

  return surbitcoin;
}(foxbit);