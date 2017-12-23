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
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(mixcoins, _Exchange);

  function mixcoins() {
    _classCallCheck(this, mixcoins);

    return _possibleConstructorReturn(this, (mixcoins.__proto__ || _Object$getPrototypeOf(mixcoins)).apply(this, arguments));
  }

  _createClass(mixcoins, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(mixcoins.prototype.__proto__ || _Object$getPrototypeOf(mixcoins.prototype), "describe", this).call(this), {
        'id': 'mixcoins',
        'name': 'MixCoins',
        'countries': ['GB', 'HK'],
        'rateLimit': 1500,
        'version': 'v1',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30237212-ed29303c-9535-11e7-8af8-fcd381cfa20c.jpg',
          'api': 'https://mixcoins.com/api',
          'www': 'https://mixcoins.com',
          'doc': 'https://mixcoins.com/help/api/'
        },
        'api': {
          'public': {
            'get': ['ticker', 'trades', 'depth']
          },
          'private': {
            'post': ['cancel', 'info', 'orders', 'order', 'transactions', 'trade']
          }
        },
        'markets': {
          'BTC/USD': {
            'id': 'btc_usd',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD',
            'maker': 0.0015,
            'taker': 0.0025
          },
          'ETH/BTC': {
            'id': 'eth_btc',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'maker': 0.001,
            'taker': 0.0015
          },
          'BCH/BTC': {
            'id': 'bcc_btc',
            'symbol': 'BCH/BTC',
            'base': 'BCH',
            'quote': 'BTC',
            'maker': 0.001,
            'taker': 0.0015
          },
          'LSK/BTC': {
            'id': 'lsk_btc',
            'symbol': 'LSK/BTC',
            'base': 'LSK',
            'quote': 'BTC',
            'maker': 0.0015,
            'taker': 0.0025
          },
          'BCH/USD': {
            'id': 'bcc_usd',
            'symbol': 'BCH/USD',
            'base': 'BCH',
            'quote': 'USD',
            'maker': 0.001,
            'taker': 0.0015
          },
          'ETH/USD': {
            'id': 'eth_usd',
            'symbol': 'ETH/USD',
            'base': 'ETH',
            'quote': 'USD',
            'maker': 0.001,
            'taker': 0.0015
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
            balance,
            result,
            currencies,
            i,
            currency,
            lowercase,
            account,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostInfo();

              case 3:
                response = _context.sent;
                balance = response['result']['wallet'];
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = this.account();

                  if (lowercase in balance) {
                    account['free'] = parseFloat(balance[lowercase]['avail']);
                    account['used'] = parseFloat(balance[lowercase]['lock']);
                    account['total'] = this.sum(account['free'], account['used']);
                  }

                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 9:
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
            response,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetDepth(this.extend({
                  'market': this.marketId(symbol)
                }, params));

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(response['result']));

              case 5:
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
            ticker,
            timestamp,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetTicker(this.extend({
                  'market': this.marketId(symbol)
                }, params));

              case 3:
                response = _context3.sent;
                ticker = response['result'];
                timestamp = this.milliseconds();
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(ticker['buy']),
                  'ask': parseFloat(ticker['sell']),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker['vol']),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 7:
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
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = parseInt(trade['date']) * 1000;
      return {
        'id': trade['id'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': undefined,
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['amount'])
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                since = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : undefined;
                params = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetTrades(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response['result'], market, since, limit));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                order = {
                  'market': this.marketId(symbol),
                  'op': side,
                  'amount': amount
                };

                if (type == 'market') {
                  order['order_type'] = 1;
                  order['price'] = price;
                } else {
                  order['order_type'] = 0;
                }

                _context5.next = 6;
                return this.privatePostTrade(this.extend(order, params));

              case 6:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['result']['id'].toString()
                });

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function createOrder(_x4, _x5, _x6, _x7) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(id) {
        var symbol,
            params,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                _context6.next = 4;
                return this.privatePostCancel({
                  'id': id
                });

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function cancelOrder(_x8) {
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
      var url = this.urls['api'] + '/' + this.version + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'nonce': nonce
        }, params));
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Key': this.apiKey,
          'Sign': this.hmac(this.encode(body), this.secret, 'sha512')
        };
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                api = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 'public';
                method = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 'GET';
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                headers = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                body = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : undefined;
                _context7.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context7.sent;

                if (!('status' in response)) {
                  _context7.next = 11;
                  break;
                }

                if (!(response['status'] == 200)) {
                  _context7.next = 11;
                  break;
                }

                return _context7.abrupt("return", response);

              case 11:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return mixcoins;
}(Exchange);