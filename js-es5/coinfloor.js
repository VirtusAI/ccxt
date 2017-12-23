"use strict"; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

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
  _inherits(coinfloor, _Exchange);

  function coinfloor() {
    _classCallCheck(this, coinfloor);

    return _possibleConstructorReturn(this, (coinfloor.__proto__ || _Object$getPrototypeOf(coinfloor)).apply(this, arguments));
  }

  _createClass(coinfloor, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coinfloor.prototype.__proto__ || _Object$getPrototypeOf(coinfloor.prototype), "describe", this).call(this), {
        'id': 'coinfloor',
        'name': 'coinfloor',
        'rateLimit': 1000,
        'countries': 'UK',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28246081-623fc164-6a1c-11e7-913f-bac0d5576c90.jpg',
          'api': 'https://webapi.coinfloor.co.uk:8090/bist',
          'www': 'https://www.coinfloor.co.uk',
          'doc': ['https://github.com/coinfloor/api', 'https://www.coinfloor.co.uk/api']
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['{id}/ticker/', '{id}/order_book/', '{id}/transactions/']
          },
          'private': {
            'post': ['{id}/balance/', '{id}/user_transactions/', '{id}/open_orders/', '{id}/cancel_order/', '{id}/buy/', '{id}/sell/', '{id}/buy_market/', '{id}/sell_market/', '{id}/estimate_sell_market/', '{id}/estimate_buy_market/']
          }
        },
        'markets': {
          'BTC/GBP': {
            'id': 'XBT/GBP',
            'symbol': 'BTC/GBP',
            'base': 'BTC',
            'quote': 'GBP'
          },
          'BTC/EUR': {
            'id': 'XBT/EUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR'
          },
          'BTC/USD': {
            'id': 'XBT/USD',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD'
          },
          'BTC/PLN': {
            'id': 'XBT/PLN',
            'symbol': 'BTC/PLN',
            'base': 'BTC',
            'quote': 'PLN'
          },
          'BCH/GBP': {
            'id': 'BCH/GBP',
            'symbol': 'BCH/GBP',
            'base': 'BCH',
            'quote': 'GBP'
          }
        }
      });
    }
  }, {
    key: "fetchBalance",
    value: function fetchBalance() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var symbol = undefined;
      if ('symbol' in params) symbol = params['symbol'];
      if ('id' in params) symbol = params['id'];
      if (!symbol) throw new ExchangeError(this.id + ' fetchBalance requires a symbol param'); // todo parse balance

      return this.privatePostIdBalance({
        'id': this.marketId(symbol)
      });
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(symbol) {
        var params,
            orderbook,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                _context.next = 3;
                return this.publicGetIdOrderBook(this.extend({
                  'id': this.marketId(symbol)
                }, params));

              case 3:
                orderbook = _context.sent;
                return _context.abrupt("return", this.parseOrderBook(orderbook));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      // rewrite to get the timestamp from HTTP headers
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var vwap = this.safeFloat(ticker, 'vwap');
      var baseVolume = parseFloat(ticker['volume']);
      var quoteVolume = undefined;

      if (typeof vwap != 'undefined') {
        quoteVolume = baseVolume * vwap;
      }

      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high']),
        'low': parseFloat(ticker['low']),
        'bid': parseFloat(ticker['bid']),
        'ask': parseFloat(ticker['ask']),
        'vwap': vwap,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': baseVolume,
        'quoteVolume': quoteVolume,
        'info': ticker
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
            ticker,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                _context2.next = 4;
                return this.publicGetIdTicker(this.extend({
                  'id': market['id']
                }, params));

              case 4:
                ticker = _context2.sent;
                return _context2.abrupt("return", this.parseTicker(ticker, market));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = trade['date'] * 1000;
      return {
        'info': trade,
        'id': trade['tid'].toString(),
        'order': undefined,
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
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                since = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : undefined;
                limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : undefined;
                params = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetIdTransactions(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                response = _context3.sent;
                return _context3.abrupt("return", this.parseTrades(response, market, since, limit));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4(symbol, type, side, amount) {
        var price,
            params,
            order,
            method,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                price = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : undefined;
                params = _args4.length > 5 && _args4[5] !== undefined ? _args4[5] : {};
                order = {
                  'id': this.marketId(symbol)
                };
                method = 'privatePostId' + this.capitalize(side);

                if (type == 'market') {
                  order['quantity'] = amount;
                  method += 'Market';
                } else {
                  order['price'] = price;
                  order['amount'] = amount;
                }

                return _context4.abrupt("return", this[method](this.extend(order, params)));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      _regeneratorRuntime.mark(function _callee5(id) {
        var symbol,
            params,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbol = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                _context5.next = 4;
                return this.privatePostIdCancelOrder({
                  'id': id
                });

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      // curl -k -u '[User ID]/[API key]:[Passphrase]' https://webapi.coinfloor.co.uk:8090/bist/XBT/GBP/balance/
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'nonce': nonce
        }, query));
        var auth = this.uid + '/' + this.apiKey + ':' + this.password;
        var signature = this.stringToBase64(auth);
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + signature
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

  return coinfloor;
}(Exchange);