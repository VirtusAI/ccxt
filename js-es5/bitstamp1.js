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
    ExchangeError = _require.ExchangeError,
    NotSupported = _require.NotSupported,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitstamp1, _Exchange);

  function bitstamp1() {
    _classCallCheck(this, bitstamp1);

    return _possibleConstructorReturn(this, (bitstamp1.__proto__ || _Object$getPrototypeOf(bitstamp1)).apply(this, arguments));
  }

  _createClass(bitstamp1, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitstamp1.prototype.__proto__ || _Object$getPrototypeOf(bitstamp1.prototype), "describe", this).call(this), {
        'id': 'bitstamp1',
        'name': 'Bitstamp v1',
        'countries': 'GB',
        'rateLimit': 1000,
        'version': 'v1',
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27786377-8c8ab57e-5fe9-11e7-8ea4-2b05b6bcceec.jpg',
          'api': 'https://www.bitstamp.net/api',
          'www': 'https://www.bitstamp.net',
          'doc': 'https://www.bitstamp.net/api'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['ticker', 'ticker_hour', 'order_book', 'transactions', 'eur_usd']
          },
          'private': {
            'post': ['balance', 'user_transactions', 'open_orders', 'order_status', 'cancel_order', 'cancel_all_orders', 'buy', 'sell', 'bitcoin_deposit_address', 'unconfirmed_btc', 'ripple_withdrawal', 'ripple_address', 'withdrawal_requests', 'bitcoin_withdrawal']
          }
        },
        'markets': {
          'BTC/USD': {
            'id': 'btcusd',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'BTC/EUR': {
            'id': 'btceur',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'EUR/USD': {
            'id': 'eurusd',
            'symbol': 'EUR/USD',
            'base': 'EUR',
            'quote': 'USD',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'XRP/USD': {
            'id': 'xrpusd',
            'symbol': 'XRP/USD',
            'base': 'XRP',
            'quote': 'USD',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'XRP/EUR': {
            'id': 'xrpeur',
            'symbol': 'XRP/EUR',
            'base': 'XRP',
            'quote': 'EUR',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'XRP/BTC': {
            'id': 'xrpbtc',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'LTC/USD': {
            'id': 'ltcusd',
            'symbol': 'LTC/USD',
            'base': 'LTC',
            'quote': 'USD',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'LTC/EUR': {
            'id': 'ltceur',
            'symbol': 'LTC/EUR',
            'base': 'LTC',
            'quote': 'EUR',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'LTC/BTC': {
            'id': 'ltcbtc',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'ETH/USD': {
            'id': 'ethusd',
            'symbol': 'ETH/USD',
            'base': 'ETH',
            'quote': 'USD',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'ETH/EUR': {
            'id': 'etheur',
            'symbol': 'ETH/EUR',
            'base': 'ETH',
            'quote': 'EUR',
            'maker': 0.0025,
            'taker': 0.0025
          },
          'ETH/BTC': {
            'id': 'ethbtc',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'maker': 0.0025,
            'taker': 0.0025
          }
        }
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
            timestamp,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                if (!(symbol != 'BTC/USD')) {
                  _context.next = 3;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.version + " fetchOrderBook doesn't support " + symbol + ', use it for BTC/USD only');

              case 3:
                _context.next = 5;
                return this.publicGetOrderBook(params);

              case 5:
                orderbook = _context.sent;
                timestamp = parseInt(orderbook['timestamp']) * 1000;
                return _context.abrupt("return", this.parseOrderBook(orderbook, timestamp));

              case 8:
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
            ticker,
            timestamp,
            vwap,
            baseVolume,
            quoteVolume,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

                if (!(symbol != 'BTC/USD')) {
                  _context2.next = 3;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.version + " fetchTicker doesn't support " + symbol + ', use it for BTC/USD only');

              case 3:
                _context2.next = 5;
                return this.publicGetTicker(params);

              case 5:
                ticker = _context2.sent;
                timestamp = parseInt(ticker['timestamp']) * 1000;
                vwap = parseFloat(ticker['vwap']);
                baseVolume = parseFloat(ticker['volume']);
                quoteVolume = baseVolume * vwap;
                return _context2.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(ticker['bid']),
                  'ask': parseFloat(ticker['ask']),
                  'vwap': vwap,
                  'open': parseFloat(ticker['open']),
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': baseVolume,
                  'quoteVolume': quoteVolume,
                  'info': ticker
                });

              case 11:
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
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = undefined;

      if ('date' in trade) {
        timestamp = parseInt(trade['date']) * 1000;
      } else if ('datetime' in trade) {
        // timestamp = this.parse8601 (trade['datetime']);
        timestamp = parseInt(trade['datetime']) * 1000;
      }

      var side = trade['type'] == 0 ? 'buy' : 'sell';
      var order = undefined;
      if ('order_id' in trade) order = trade['order_id'].toString();

      if ('currency_pair' in trade) {
        if (trade['currency_pair'] in this.markets_by_id) market = this.markets_by_id[trade['currency_pair']];
      }

      return {
        'id': trade['tid'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': order,
        'type': undefined,
        'side': side,
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

                if (!(symbol != 'BTC/USD')) {
                  _context3.next = 5;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.version + " fetchTrades doesn't support " + symbol + ', use it for BTC/USD only');

              case 5:
                market = this.market(symbol);
                _context3.next = 8;
                return this.publicGetTransactions(this.extend({
                  'time': 'minute'
                }, params));

              case 8:
                response = _context3.sent;
                return _context3.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var params,
            balance,
            result,
            currencies,
            i,
            currency,
            lowercase,
            total,
            free,
            used,
            account,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.next = 3;
                return this.privatePostBalance();

              case 3:
                balance = _context4.sent;
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  total = lowercase + '_balance';
                  free = lowercase + '_available';
                  used = lowercase + '_reserved';
                  account = this.account();
                  account['free'] = this.safeFloat(balance, free, 0.0);
                  account['used'] = this.safeFloat(balance, used, 0.0);
                  account['total'] = this.safeFloat(balance, total, 0.0);
                  result[currency] = account;
                }

                return _context4.abrupt("return", this.parseBalance(result));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            method,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};

                if (!(type != 'limit')) {
                  _context5.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.version + ' accepts limit orders only');

              case 4:
                if (!(symbol != 'BTC/USD')) {
                  _context5.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' v1 supports BTC/USD orders only');

              case 6:
                method = 'privatePost' + this.capitalize(side);
                order = {
                  'amount': amount,
                  'price': price
                };
                _context5.next = 10;
                return this[method](this.extend(order, params));

              case 10:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 12:
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
                return this.privatePostCancelOrder({
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
    key: "parseOrderStatus",
    value: function parseOrderStatus(order) {
      if (order['status'] == 'Queue' || order['status'] == 'Open') return 'open';
      if (order['status'] == 'Finished') return 'closed';
      return order['status'];
    }
  }, {
    key: "fetchOrderStatus",
    value: function () {
      var _fetchOrderStatus = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(id) {
        var symbol,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                _context7.next = 3;
                return this.loadMarkets();

              case 3:
                _context7.next = 5;
                return this.privatePostOrderStatus({
                  'id': id
                });

              case 5:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseOrderStatus(response));

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchOrderStatus(_x9) {
        return _fetchOrderStatus.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var symbol,
            since,
            limit,
            params,
            market,
            pair,
            request,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : undefined;
                since = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : undefined;
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                if (symbol) market = this.market(symbol);
                pair = market ? market['id'] : 'all';
                request = this.extend({
                  'id': pair
                }, params);
                _context8.next = 12;
                return this.privatePostOpenOrdersId(request);

              case 12:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseTrades(response, market, since, limit));

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
                throw new NotSupported(this.id + ' fetchOrder is not implemented yet');

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
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
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = nonce + this.uid + this.apiKey;
        var signature = this.encode(this.hmac(this.encode(auth), this.encode(this.secret)));
        query = this.extend({
          'key': this.apiKey,
          'signature': signature.toUpperCase(),
          'nonce': nonce
        }, query);
        body = this.urlencode(query);
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
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
      _regeneratorRuntime.mark(function _callee10(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                api = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 'public';
                method = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 'GET';
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                headers = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : undefined;
                body = _args10.length > 5 && _args10[5] !== undefined ? _args10[5] : undefined;
                _context10.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context10.sent;

                if (!('status' in response)) {
                  _context10.next = 11;
                  break;
                }

                if (!(response['status'] == 'error')) {
                  _context10.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context10.abrupt("return", response);

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function request(_x11) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bitstamp1;
}(Exchange);