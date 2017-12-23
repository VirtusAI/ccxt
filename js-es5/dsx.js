"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var liqui = require('./liqui.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_liqui) {
  _inherits(dsx, _liqui);

  function dsx() {
    _classCallCheck(this, dsx);

    return _possibleConstructorReturn(this, (dsx.__proto__ || _Object$getPrototypeOf(dsx)).apply(this, arguments));
  }

  _createClass(dsx, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(dsx.prototype.__proto__ || _Object$getPrototypeOf(dsx.prototype), "describe", this).call(this), {
        'id': 'dsx',
        'name': 'DSX',
        'countries': 'UK',
        'rateLimit': 1500,
        'hasCORS': false,
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchTickers': true,
        'hasFetchMyTrades': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27990275-1413158a-645a-11e7-931c-94717f7510e3.jpg',
          'api': {
            'public': 'https://dsx.uk/mapi',
            // market data
            'private': 'https://dsx.uk/tapi',
            // trading
            'dwapi': 'https://dsx.uk/dwapi' // deposit/withdraw

          },
          'www': 'https://dsx.uk',
          'doc': ['https://api.dsx.uk', 'https://dsx.uk/api_docs/public', 'https://dsx.uk/api_docs/private', '']
        },
        'api': {
          // market data (public)
          'public': {
            'get': ['barsFromMoment/{id}/{period}/{start}', // empty reply :\
            'depth/{pair}', 'info', 'lastBars/{id}/{period}/{amount}', // period is (m, h or d)
            'periodBars/{id}/{period}/{start}/{end}', 'ticker/{pair}', 'trades/{pair}']
          },
          // trading (private)
          'private': {
            'post': ['getInfo', 'TransHistory', 'TradeHistory', 'OrderHistory', 'ActiveOrders', 'Trade', 'CancelOrder']
          },
          // deposit / withdraw (private)
          'dwapi': {
            'post': ['getCryptoDepositAddress', 'cryptoWithdraw', 'fiatWithdraw', 'getTransactionStatus', 'getTransactions']
          }
        }
      });
    }
  }, {
    key: "getBaseQuoteFromMarketId",
    value: function getBaseQuoteFromMarketId(id) {
      var uppercase = id.toUpperCase();
      var base = uppercase.slice(0, 3);
      var quote = uppercase.slice(3, 6);
      base = this.commonCurrencyCode(base);
      quote = this.commonCurrencyCode(quote);
      return [base, quote];
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            balances,
            result,
            funds,
            currencies,
            c,
            currency,
            uppercase,
            account,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.loadMarkets();

              case 3:
                _context.next = 5;
                return this.privatePostGetInfo();

              case 5:
                response = _context.sent;
                balances = response['return'];
                result = {
                  'info': balances
                };
                funds = balances['funds'];
                currencies = _Object$keys(funds);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  uppercase = currency.toUpperCase();
                  uppercase = this.commonCurrencyCode(uppercase);
                  account = {
                    'free': funds[currency],
                    'used': 0.0,
                    'total': balances['total'][currency]
                  };
                  account['used'] = account['total'] - account['free'];
                  result[uppercase] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchBalance() {
        return _fetchBalance.apply(this, arguments);
      };
    }()
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
        'bid': this.safeFloat(ticker, 'buy'),
        'ask': this.safeFloat(ticker, 'sell'),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'last'),
        'change': undefined,
        'percentage': undefined,
        'average': 1 / this.safeFloat(ticker, 'avg'),
        'baseVolume': this.safeFloat(ticker, 'vol'),
        'quoteVolume': this.safeFloat(ticker, 'vol_cur'),
        'info': ticker
      };
    }
  }, {
    key: "getOrderIdKey",
    value: function getOrderIdKey() {
      return 'orderId';
    }
  }, {
    key: "signBodyWithSecret",
    value: function signBodyWithSecret(body) {
      return this.decode(this.hmac(this.encode(body), this.encode(this.secret), 'sha512', 'base64'));
    }
  }, {
    key: "getVersionString",
    value: function getVersionString() {
      return ''; // they don't prepend version number to public URLs as other BTC-e clones do
    }
  }]);

  return dsx;
}(liqui);