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
  _inherits(gemini, _Exchange);

  function gemini() {
    _classCallCheck(this, gemini);

    return _possibleConstructorReturn(this, (gemini.__proto__ || _Object$getPrototypeOf(gemini)).apply(this, arguments));
  }

  _createClass(gemini, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(gemini.prototype.__proto__ || _Object$getPrototypeOf(gemini.prototype), "describe", this).call(this), {
        'id': 'gemini',
        'name': 'Gemini',
        'countries': 'US',
        'rateLimit': 1500,
        // 200 for private API
        'version': 'v1',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27816857-ce7be644-6096-11e7-82d6-3c257263229c.jpg',
          'api': 'https://api.gemini.com',
          'www': 'https://gemini.com',
          'doc': 'https://docs.gemini.com/rest-api'
        },
        'api': {
          'public': {
            'get': ['symbols', 'pubticker/{symbol}', 'book/{symbol}', 'trades/{symbol}', 'auction/{symbol}', 'auction/{symbol}/history']
          },
          'private': {
            'post': ['order/new', 'order/cancel', 'order/cancel/session', 'order/cancel/all', 'order/status', 'orders', 'mytrades', 'tradevolume', 'balances', 'deposit/{currency}/newAddress', 'withdraw/{currency}', 'heartbeat']
          }
        }
      });
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, result, p, id, market, uppercase, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetSymbols();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  id = markets[p];
                  market = id;
                  uppercase = market.toUpperCase();
                  base = uppercase.slice(0, 3);
                  quote = uppercase.slice(3, 6);
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market,
                    'taker': 0.0025
                  });
                }

                return _context.abrupt("return", result);

              case 6:
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.loadMarkets();

              case 3:
                _context2.next = 5;
                return this.publicGetBookSymbol(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount'));

              case 7:
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
            market,
            ticker,
            timestamp,
            baseVolume,
            quoteVolume,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetPubtickerSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                ticker = _context3.sent;
                timestamp = ticker['volume']['timestamp'];
                baseVolume = market['base'];
                quoteVolume = market['quote'];
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
                  'baseVolume': parseFloat(ticker['volume'][baseVolume]),
                  'quoteVolume': parseFloat(ticker['volume'][quoteVolume]),
                  'info': ticker
                });

              case 11:
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
      var timestamp = trade['timestampms'];
      return {
        'id': trade['tid'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['type'],
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
                _context4.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context4.next = 8;
                return this.publicGetTradesSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var params,
            balances,
            result,
            b,
            balance,
            currency,
            account,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.privatePostBalances();

              case 5:
                balances = _context5.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  account = {
                    'free': parseFloat(balance['available']),
                    'used': 0.0,
                    'total': parseFloat(balance['amount'])
                  };
                  account['used'] = account['total'] - account['free'];
                  result[currency] = account;
                }

                return _context5.abrupt("return", this.parseBalance(result));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchBalance() {
        return _fetchBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            nonce,
            order,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                price = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                params = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};
                _context6.next = 4;
                return this.loadMarkets();

              case 4:
                if (!(type == 'market')) {
                  _context6.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 6:
                nonce = this.nonce();
                order = {
                  'client_order_id': nonce.toString(),
                  'symbol': this.marketId(symbol),
                  'amount': amount.toString(),
                  'price': price.toString(),
                  'side': side,
                  'type': 'exchange limit' // gemini allows limit orders only

                };
                _context6.next = 10;
                return this.privatePostOrderNew(this.extend(order, params));

              case 10:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['order_id']
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(id) {
        var symbol,
            params,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                _context7.next = 6;
                return this.privatePostCancelOrder({
                  'order_id': id
                });

              case 6:
                return _context7.abrupt("return", _context7.sent);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      var url = '/' + this.version + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var request = this.extend({
          'request': url,
          'nonce': nonce
        }, query);
        var payload = this.json(request);
        payload = this.stringToBase64(this.encode(payload));
        var signature = this.hmac(payload, this.encode(this.secret), 'sha384');
        headers = {
          'Content-Type': 'text/plain',
          'X-GEMINI-APIKEY': this.apiKey,
          'X-GEMINI-PAYLOAD': this.decode(payload),
          'X-GEMINI-SIGNATURE': signature
        };
      }

      url = this.urls['api'] + url;
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
      _regeneratorRuntime.mark(function _callee8(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                api = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 'public';
                method = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 'GET';
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                headers = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                body = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : undefined;
                _context8.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context8.sent;

                if (!('result' in response)) {
                  _context8.next = 11;
                  break;
                }

                if (!(response['result'] == 'error')) {
                  _context8.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context8.abrupt("return", response);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return gemini;
}(Exchange);