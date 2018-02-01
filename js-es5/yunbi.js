'use strict'; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var acx = require('./acx.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_acx) {
  _inherits(yunbi, _acx);

  function yunbi() {
    _classCallCheck(this, yunbi);

    return _possibleConstructorReturn(this, (yunbi.__proto__ || _Object$getPrototypeOf(yunbi)).apply(this, arguments));
  }

  _createClass(yunbi, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(yunbi.prototype.__proto__ || _Object$getPrototypeOf(yunbi.prototype), "describe", this).call(this), {
        'id': 'yunbi',
        'name': 'YUNBI',
        'countries': 'CN',
        'rateLimit': 1000,
        'version': 'v2',
        'has': {
          'CORS': false,
          'fetchTickers': true,
          'fetchOHLCV': true
        },
        'timeframes': {
          '1m': '1',
          '5m': '5',
          '15m': '15',
          '30m': '30',
          '1h': '60',
          '2h': '120',
          '4h': '240',
          '12h': '720',
          '1d': '1440',
          '3d': '4320',
          '1w': '10080'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28570548-4d646c40-7147-11e7-9cf6-839b93e6d622.jpg',
          'extension': '.json',
          // default extension appended to endpoint URLs
          'api': 'https://yunbi.com',
          'www': 'https://yunbi.com',
          'doc': ['https://yunbi.com/documents/api/guide', 'https://yunbi.com/swagger/']
        },
        'api': {
          'public': {
            'get': ['tickers', 'tickers/{market}', 'markets', 'order_book', 'k', 'depth', 'trades', 'k_with_pending_trades', 'timestamp', 'addresses/{address}', 'partners/orders/{id}/trades']
          },
          'private': {
            'get': ['deposits', 'members/me', 'deposit', 'deposit_address', 'order', 'orders', 'trades/my'],
            'post': ['order/delete', 'orders', 'orders/multi', 'orders/clear']
          }
        }
      });
    }
  }]);

  return yunbi;
}(acx);