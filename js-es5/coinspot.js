"use strict"; //  ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var Exchange = require('./base/Exchange');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(coinspot, _Exchange);

  function coinspot() {
    _classCallCheck(this, coinspot);

    return _possibleConstructorReturn(this, (coinspot.__proto__ || _Object$getPrototypeOf(coinspot)).apply(this, arguments));
  }

  _createClass(coinspot, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coinspot.prototype.__proto__ || _Object$getPrototypeOf(coinspot.prototype), "describe", this).call(this), {
        'id': 'coinspot',
        'name': 'CoinSpot',
        'countries': 'AU',
        // Australia
        'rateLimit': 1000,
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28208429-3cacdf9a-6896-11e7-854e-4c79a772a30f.jpg',
          'api': {
            'public': 'https://www.coinspot.com.au/pubapi',
            'private': 'https://www.coinspot.com.au/api'
          },
          'www': 'https://www.coinspot.com.au',
          'doc': 'https://www.coinspot.com.au/api'
        },
        'api': {
          'public': {
            'get': ['latest']
          },
          'private': {
            'post': ['orders', 'orders/history', 'my/coin/deposit', 'my/coin/send', 'quote/buy', 'quote/sell', 'my/balances', 'my/orders', 'my/buy', 'my/sell', 'my/buy/cancel', 'my/sell/cancel']
          }
        },
        'markets': {
          'BTC/AUD': {
            'id': 'BTC',
            'symbol': 'BTC/AUD',
            'base': 'BTC',
            'quote': 'AUD'
          },
          'LTC/AUD': {
            'id': 'LTC',
            'symbol': 'LTC/AUD',
            'base': 'LTC',
            'quote': 'AUD'
          },
          'DOGE/AUD': {
            'id': 'DOGE',
            'symbol': 'DOGE/AUD',
            'base': 'DOGE',
            'quote': 'AUD'
          }
        }
      });
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            result,
            balances,
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
                return this.privatePostMyBalances();

              case 3:
                response = _context.sent;
                result = {
                  'info': response
                };

                if ('balance' in response) {
                  balances = response['balance'];
                  currencies = _Object$keys(balances);

                  for (c = 0; c < currencies.length; c++) {
                    currency = currencies[c];
                    uppercase = currency.toUpperCase();
                    account = {
                      'free': balances[currency],
                      'used': 0.0,
                      'total': balances[currency]
                    };
                    if (uppercase == 'DRK') uppercase = 'DASH';
                    result[uppercase] = account;
                  }
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 7:
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
            orderbook,
            result,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                _context2.next = 4;
                return this.privatePostOrders(this.extend({
                  'cointype': market['id']
                }, params));

              case 4:
                orderbook = _context2.sent;
                result = this.parseOrderBook(orderbook, undefined, 'buyorders', 'sellorders', 'rate', 'amount');
                result['bids'] = this.sortBy(result['bids'], 0, true);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context2.abrupt("return", result);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            response,
            id,
            ticker,
            timestamp,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetLatest(params);

              case 3:
                response = _context3.sent;
                id = this.marketId(symbol);
                id = id.toLowerCase();
                ticker = response['prices'][id];
                timestamp = this.milliseconds();
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': undefined,
                  'low': undefined,
                  'bid': parseFloat(ticker['bid']),
                  'ask': parseFloat(ticker['ask']),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTrades",
    value: function fetchTrades(symbol) {
      var since = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.privatePostOrdersHistory(this.extend({
        'cointype': this.marketId(symbol)
      }, params));
    }
  }, {
    key: "createOrder",
    value: function createOrder(market, type, side, amount) {
      var price = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var method = 'privatePostMy' + this.capitalize(side);
      if (type == 'market') throw new ExchangeError(this.id + ' allows limit orders only');
      var order = {
        'cointype': this.marketId(market),
        'amount': amount,
        'rate': price
      };
      return this[method](this.extend(order, params));
    }
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(id) {
        var symbol,
            params,
            method,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                symbol = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                throw new ExchangeError(this.id + ' cancelOrder () is not fully implemented yet');

              case 6:
                return _context4.abrupt("return", _context4.sent);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function cancelOrder(_x3) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      if (!this.apiKey) throw new AuthenticationError(this.id + ' requires apiKey for all requests');
      var url = this.urls['api'][api] + '/' + path;

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.json(this.extend({
          'nonce': nonce
        }, params));
        headers = {
          'Content-Type': 'application/json',
          'key': this.apiKey,
          'sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512')
        };
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }]);

  return coinspot;
}(Exchange);