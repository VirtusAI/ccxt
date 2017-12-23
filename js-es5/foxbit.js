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
  _inherits(foxbit, _Exchange);

  function foxbit() {
    _classCallCheck(this, foxbit);

    return _possibleConstructorReturn(this, (foxbit.__proto__ || _Object$getPrototypeOf(foxbit)).apply(this, arguments));
  }

  _createClass(foxbit, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(foxbit.prototype.__proto__ || _Object$getPrototypeOf(foxbit.prototype), "describe", this).call(this), {
        'id': 'foxbit',
        'name': 'FoxBit',
        'countries': 'BR',
        'hasCORS': false,
        'rateLimit': 1000,
        'version': 'v1',
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27991413-11b40d42-647f-11e7-91ee-78ced874dd09.jpg',
          'api': {
            'public': 'https://api.blinktrade.com/api',
            'private': 'https://api.blinktrade.com/tapi'
          },
          'www': 'https://foxbit.exchange',
          'doc': 'https://blinktrade.com/docs'
        },
        'comment': 'Blinktrade API',
        'api': {
          'public': {
            'get': ['{currency}/ticker', // ?crypto_currency=BTC
            '{currency}/orderbook', // ?crypto_currency=BTC
            '{currency}/trades']
          },
          'private': {
            'post': ['D', // order
            'F', // cancel order
            'U2', // balance
            'U4', // my orders
            'U6', // withdraw
            'U18', // deposit
            'U24', // confirm withdrawal
            'U26', // list withdrawals
            'U30', // list deposits
            'U34', // ledger
            'U70']
          }
        },
        'markets': {
          'BTC/VEF': {
            'id': 'BTCVEF',
            'symbol': 'BTC/VEF',
            'base': 'BTC',
            'quote': 'VEF',
            'brokerId': 1,
            'broker': 'SurBitcoin'
          },
          'BTC/VND': {
            'id': 'BTCVND',
            'symbol': 'BTC/VND',
            'base': 'BTC',
            'quote': 'VND',
            'brokerId': 3,
            'broker': 'VBTC'
          },
          'BTC/BRL': {
            'id': 'BTCBRL',
            'symbol': 'BTC/BRL',
            'base': 'BTC',
            'quote': 'BRL',
            'brokerId': 4,
            'broker': 'FoxBit'
          },
          'BTC/PKR': {
            'id': 'BTCPKR',
            'symbol': 'BTC/PKR',
            'base': 'BTC',
            'quote': 'PKR',
            'brokerId': 8,
            'broker': 'UrduBit'
          },
          'BTC/CLP': {
            'id': 'BTCCLP',
            'symbol': 'BTC/CLP',
            'base': 'BTC',
            'quote': 'CLP',
            'brokerId': 9,
            'broker': 'ChileBit'
          }
        }
      });
    }
  }, {
    key: "fetchBalance",
    value: function fetchBalance() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // todo parse balance
      return this.privatePostU2({
        'BalanceReqID': this.nonce()
      });
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(symbol) {
        var params,
            market,
            orderbook,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                market = this.market(symbol);
                _context.next = 4;
                return this.publicGetCurrencyOrderbook(this.extend({
                  'currency': market['quote'],
                  'crypto_currency': market['base']
                }, params));

              case 4:
                orderbook = _context.sent;
                return _context.abrupt("return", this.parseOrderBook(orderbook));

              case 6:
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
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
            ticker,
            timestamp,
            lowercaseQuote,
            quoteVolume,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                _context2.next = 4;
                return this.publicGetCurrencyTicker(this.extend({
                  'currency': market['quote'],
                  'crypto_currency': market['base']
                }, params));

              case 4:
                ticker = _context2.sent;
                timestamp = this.milliseconds();
                lowercaseQuote = market['quote'].toLowerCase();
                quoteVolume = 'vol_' + lowercaseQuote;
                return _context2.abrupt("return", {
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
                  'quoteVolume': parseFloat(ticker[quoteVolume]),
                  'info': ticker
                });

              case 9:
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
        'id': trade['tid'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['side'],
        'price': trade['price'],
        'amount': trade['amount']
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
                return this.publicGetCurrencyTrades(this.extend({
                  'currency': market['quote'],
                  'crypto_currency': market['base']
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
            market,
            orderSide,
            order,
            response,
            indexed,
            execution,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                price = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : undefined;
                params = _args4.length > 5 && _args4[5] !== undefined ? _args4[5] : {};

                if (!(type == 'market')) {
                  _context4.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                market = this.market(symbol);
                orderSide = side == 'buy' ? '1' : '2';
                order = {
                  'ClOrdID': this.nonce(),
                  'Symbol': market['id'],
                  'Side': orderSide,
                  'OrdType': '2',
                  'Price': price,
                  'OrderQty': amount,
                  'BrokerID': market['brokerId']
                };
                _context4.next = 9;
                return this.privatePostD(this.extend(order, params));

              case 9:
                response = _context4.sent;
                indexed = this.indexBy(response['Responses'], 'MsgType');
                execution = indexed['8'];
                return _context4.abrupt("return", {
                  'info': response,
                  'id': execution['OrderID']
                });

              case 13:
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
                return this.privatePostF(this.extend({
                  'ClOrdID': id
                }, params));

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
      var url = this.urls['api'][api] + '/' + this.version + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var request = this.extend({
          'MsgType': path
        }, query);
        body = this.json(request);
        headers = {
          'APIKey': this.apiKey,
          'Nonce': nonce,
          'Signature': this.hmac(this.encode(nonce), this.encode(this.secret)),
          'Content-Type': 'application/json'
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
      _regeneratorRuntime.mark(function _callee6(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                api = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 'public';
                method = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 'GET';
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                headers = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                body = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : undefined;
                _context6.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context6.sent;

                if (!('Status' in response)) {
                  _context6.next = 11;
                  break;
                }

                if (!(response['Status'] != 200)) {
                  _context6.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context6.abrupt("return", response);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return foxbit;
}(Exchange);