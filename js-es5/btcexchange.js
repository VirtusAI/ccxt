"use strict"; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var btcturk = require('./btcturk.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_btcturk) {
  _inherits(btcexchange, _btcturk);

  function btcexchange() {
    _classCallCheck(this, btcexchange);

    return _possibleConstructorReturn(this, (btcexchange.__proto__ || _Object$getPrototypeOf(btcexchange)).apply(this, arguments));
  }

  _createClass(btcexchange, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(btcexchange.prototype.__proto__ || _Object$getPrototypeOf(btcexchange.prototype), "describe", this).call(this), {
        'id': 'btcexchange',
        'name': 'BTCExchange',
        'countries': 'PH',
        // Philippines
        'rateLimit': 1500,
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27993052-4c92911a-64aa-11e7-96d8-ec6ac3435757.jpg',
          'api': 'https://www.btcexchange.ph/api',
          'www': 'https://www.btcexchange.ph',
          'doc': 'https://github.com/BTCTrader/broker-api-docs'
        },
        'markets': {
          'BTC/PHP': {
            'id': 'BTC/PHP',
            'symbol': 'BTC/PHP',
            'base': 'BTC',
            'quote': 'PHP'
          }
        }
      });
    }
  }]);

  return btcexchange;
}(btcturk);