'use strict'; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var liqui = require('./liqui.js');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound,
    DDoSProtection = _require.DDoSProtection; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_liqui) {
  _inherits(wex, _liqui);

  function wex() {
    _classCallCheck(this, wex);

    return _possibleConstructorReturn(this, (wex.__proto__ || _Object$getPrototypeOf(wex)).apply(this, arguments));
  }

  _createClass(wex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(wex.prototype.__proto__ || _Object$getPrototypeOf(wex.prototype), "describe", this).call(this), {
        'id': 'wex',
        'name': 'WEX',
        'countries': 'NZ',
        // New Zealand
        'version': '3',
        'has': {
          'CORS': false,
          'fetchTickers': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30652751-d74ec8f8-9e31-11e7-98c5-71469fcef03e.jpg',
          'api': {
            'public': 'https://wex.nz/api',
            'private': 'https://wex.nz/tapi'
          },
          'www': 'https://wex.nz',
          'doc': ['https://wex.nz/api/3/docs', 'https://wex.nz/tapi/docs'],
          'fees': 'https://wex.nz/fees'
        },
        'api': {
          'public': {
            'get': ['info', 'ticker/{pair}', 'depth/{pair}', 'trades/{pair}']
          },
          'private': {
            'post': ['getInfo', 'Trade', 'ActiveOrders', 'OrderInfo', 'CancelOrder', 'TradeHistory', 'TransHistory', 'CoinDepositAddress', 'WithdrawCoin', 'CreateCoupon', 'RedeemCoupon']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.2 / 100,
            'taker': 0.2 / 100
          },
          'funding': {
            'withdraw': {
              'BTC': 0.001,
              'LTC': 0.001,
              'NMC': 0.1,
              'NVC': 0.1,
              'PPC': 0.1,
              'DASH': 0.001,
              'ETH': 0.003,
              'BCH': 0.001,
              'ZEC': 0.001
            }
          }
        },
        'exceptions': {
          'messages': {
            'bad status': OrderNotFound,
            'Requests too often': DDoSProtection,
            'not available': DDoSProtection,
            'external service unavailable': DDoSProtection
          }
        }
      });
    }
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['updated'] * 1000;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'high'),
        'low': this.safeFloat(ticker, 'low'),
        'bid': this.safeFloat(ticker, 'sell'),
        'ask': this.safeFloat(ticker, 'buy'),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'last'),
        'change': undefined,
        'percentage': undefined,
        'average': this.safeFloat(ticker, 'avg'),
        'baseVolume': this.safeFloat(ticker, 'vol_cur'),
        'quoteVolume': this.safeFloat(ticker, 'vol'),
        'info': ticker
      };
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code === 200) {
        if (body[0] !== '{') {
          // response is not JSON -> resort to default error handler
          return;
        }

        var response = JSON.parse(body);

        if ('success' in response) {
          if (!response['success']) {
            var error = this.safeString(response, 'error');

            if (!error) {
              throw new ExchangeError(this.id + ' returned a malformed error: ' + body);
            }

            if (error === 'no orders') {
              // returned by fetchOpenOrders if no open orders (fix for #489) -> not an error
              return;
            }

            var feedback = this.id + ' ' + this.json(response);
            var messages = this.exceptions.messages;

            if (error in messages) {
              throw new messages[error](feedback);
            }

            if (error.indexOf('It is not enough') >= 0) {
              throw new InsufficientFunds(feedback);
            } else {
              throw new ExchangeError(feedback);
            }
          }
        }
      }
    }
  }]);

  return wex;
}(liqui);