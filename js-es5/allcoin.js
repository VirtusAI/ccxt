'use strict'; //  ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var okcoinusd = require('./okcoinusd.js'); //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_okcoinusd) {
  _inherits(allcoin, _okcoinusd);

  function allcoin() {
    _classCallCheck(this, allcoin);

    return _possibleConstructorReturn(this, (allcoin.__proto__ || _Object$getPrototypeOf(allcoin)).apply(this, arguments));
  }

  _createClass(allcoin, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(allcoin.prototype.__proto__ || _Object$getPrototypeOf(allcoin.prototype), "describe", this).call(this), {
        'id': 'allcoin',
        'name': 'Allcoin',
        'countries': 'CA',
        'has': {
          'CORS': false
        },
        'extension': '',
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/31561809-c316b37c-b061-11e7-8d5a-b547b4d730eb.jpg',
          'api': {
            'web': 'https://www.allcoin.com',
            'public': 'https://api.allcoin.com/api',
            'private': 'https://api.allcoin.com/api'
          },
          'www': 'https://www.allcoin.com',
          'doc': 'https://www.allcoin.com/About/APIReference'
        },
        'api': {
          'web': {
            'get': ['Home/MarketOverViewDetail/']
          },
          'public': {
            'get': ['depth', 'kline', 'ticker', 'trades']
          },
          'private': {
            'post': ['batch_trade', 'cancel_order', 'order_history', 'order_info', 'orders_info', 'repayment', 'trade', 'trade_history', 'userinfo']
          }
        },
        'markets': undefined
      });
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var result, response, coins, j, markets, k, market, base, quote, id, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = [];
                _context.next = 3;
                return this.webGetHomeMarketOverViewDetail();

              case 3:
                response = _context.sent;
                coins = response['marketCoins'];

                for (j = 0; j < coins.length; j++) {
                  markets = coins[j]['Markets'];

                  for (k = 0; k < markets.length; k++) {
                    market = markets[k]['Market'];
                    base = market['Primary'];
                    quote = market['Secondary'];
                    id = base.toLowerCase() + '_' + quote.toLowerCase();
                    symbol = base + '/' + quote;
                    result.push({
                      'id': id,
                      'symbol': symbol,
                      'base': base,
                      'quote': quote,
                      'type': 'spot',
                      'spot': true,
                      'future': false,
                      'info': market
                    });
                  }
                }

                return _context.abrupt("return", result);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchMarkets() {
        return _fetchMarkets.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      if (status === -1) return 'canceled';
      if (status === 0) return 'open';
      if (status === 1) return 'open'; // partially filled

      if (status === 2) return 'closed';
      if (status === 10) return 'canceled';
      return status;
    }
  }, {
    key: "getCreateDateField",
    value: function getCreateDateField() {
      // allcoin typo create_data instead of create_date
      return 'create_data';
    }
  }, {
    key: "getOrdersField",
    value: function getOrdersField() {
      // allcoin typo order instead of orders (expected based on their API docs)
      return 'order';
    }
  }]);

  return allcoin;
}(okcoinusd);