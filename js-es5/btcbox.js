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
  _inherits(btcbox, _Exchange);

  function btcbox() {
    _classCallCheck(this, btcbox);

    return _possibleConstructorReturn(this, (btcbox.__proto__ || _Object$getPrototypeOf(btcbox)).apply(this, arguments));
  }

  _createClass(btcbox, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(btcbox.prototype.__proto__ || _Object$getPrototypeOf(btcbox.prototype), "describe", this).call(this), {
        'id': 'btcbox',
        'name': 'BtcBox',
        'countries': 'JP',
        'rateLimit': 1000,
        'version': 'v1',
        'hasCORS': false,
        'hasFetchOHLCV': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/31275803-4df755a8-aaa1-11e7-9abb-11ec2fad9f2d.jpg',
          'api': 'https://www.btcbox.co.jp/api',
          'www': 'https://www.btcbox.co.jp/',
          'doc': 'https://www.btcbox.co.jp/help/asm'
        },
        'api': {
          'public': {
            'get': ['depth', 'orders', 'ticker', 'allticker']
          },
          'private': {
            'post': ['balance', 'trade_add', 'trade_cancel', 'trade_list', 'trade_view', 'wallet']
          }
        },
        'markets': {
          'BTC/JPY': {
            'id': 'BTC/JPY',
            'symbol': 'BTC/JPY',
            'base': 'BTC',
            'quote': 'JPY'
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
            balances,
            result,
            currencies,
            i,
            currency,
            lowercase,
            account,
            free,
            used,
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
                return this.privatePostBalance();

              case 5:
                balances = _context.sent;
                result = {
                  'info': balances
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  if (lowercase == 'dash') lowercase = 'drk';
                  account = this.account();
                  free = lowercase + '_balance';
                  used = lowercase + '_lock';
                  if (free in balances) account['free'] = parseFloat(balances[free]);
                  if (used in balances) account['used'] = parseFloat(balances[used]);
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 10:
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
            request,
            numSymbols,
            orderbook,
            result,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                request = {};
                numSymbols = this.symbols.length;
                if (numSymbols > 1) request['coin'] = market['id'];
                _context2.next = 9;
                return this.publicGetDepth(this.extend(request, params));

              case 9:
                orderbook = _context2.sent;
                result = this.parseOrderBook(orderbook);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context2.abrupt("return", result);

              case 13:
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.milliseconds();
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
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'vol'),
        'quoteVolume': this.safeFloat(ticker, 'volume'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var symbols,
            params,
            tickers,
            ids,
            result,
            i,
            id,
            market,
            symbol,
            ticker,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                symbols = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : undefined;
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 4;
                return this.loadMarkets();

              case 4:
                _context3.next = 6;
                return this.publicGetAllticker(params);

              case 6:
                tickers = _context3.sent;
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = tickers[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context3.abrupt("return", result);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            market,
            request,
            numSymbols,
            ticker,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                request = {};
                numSymbols = this.symbols.length;
                if (numSymbols > 1) request['coin'] = market['id'];
                _context4.next = 9;
                return this.publicGetTicker(this.extend(request, params));

              case 9:
                ticker = _context4.sent;
                return _context4.abrupt("return", this.parseTicker(ticker, market));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
        'info': trade,
        'id': trade['tid'],
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['type'],
        'price': trade['price'],
        'amount': trade['amount']
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var since,
            limit,
            params,
            market,
            request,
            numSymbols,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                _context5.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                request = {};
                numSymbols = this.symbols.length;
                if (numSymbols > 1) request['coin'] = market['id'];
                _context5.next = 11;
                return this.publicGetOrders(this.extend(request, params));

              case 11:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            market,
            request,
            numSymbols,
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
                market = this.market(symbol);
                request = {
                  'amount': amount,
                  'price': price,
                  'type': side
                };
                numSymbols = this.symbols.length;
                if (numSymbols > 1) request['coin'] = market['id'];
                _context6.next = 10;
                return this.privatePostTradeAdd(this.extend(request, params));

              case 10:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['id']
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
                return this.privatePostTradeCancel(this.extend({
                  'id': id
                }, params));

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
      var url = this.urls['api'] + '/' + this.version + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var query = this.extend({
          'key': this.apiKey,
          'nonce': nonce
        }, params);
        var request = this.urlencode(query);
        var secret = this.hash(this.encode(this.secret));
        query['signature'] = this.hmac(this.encode(request), this.encode(secret));
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

                if (response['result']) {
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

  return btcbox;
}(Exchange);