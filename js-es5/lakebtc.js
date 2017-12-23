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
  _inherits(lakebtc, _Exchange);

  function lakebtc() {
    _classCallCheck(this, lakebtc);

    return _possibleConstructorReturn(this, (lakebtc.__proto__ || _Object$getPrototypeOf(lakebtc)).apply(this, arguments));
  }

  _createClass(lakebtc, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(lakebtc.prototype.__proto__ || _Object$getPrototypeOf(lakebtc.prototype), "describe", this).call(this), {
        'id': 'lakebtc',
        'name': 'LakeBTC',
        'countries': 'US',
        'version': 'api_v2',
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28074120-72b7c38a-6660-11e7-92d9-d9027502281d.jpg',
          'api': 'https://api.lakebtc.com',
          'www': 'https://www.lakebtc.com',
          'doc': ['https://www.lakebtc.com/s/api_v2', 'https://www.lakebtc.com/s/api']
        },
        'api': {
          'public': {
            'get': ['bcorderbook', 'bctrades', 'ticker']
          },
          'private': {
            'post': ['buyOrder', 'cancelOrders', 'getAccountInfo', 'getExternalAccounts', 'getOrders', 'getTrades', 'openOrders', 'sellOrder']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.15 / 100,
            'taker': 0.2 / 100
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
        var markets, result, keys, k, id, market, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetTicker();

              case 2:
                markets = _context.sent;
                result = [];
                keys = _Object$keys(markets);

                for (k = 0; k < keys.length; k++) {
                  id = keys[k];
                  market = markets[id];
                  base = id.slice(0, 3);
                  quote = id.slice(3, 6);
                  base = base.toUpperCase();
                  quote = quote.toUpperCase();
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
                  });
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            response,
            balances,
            result,
            currencies,
            c,
            currency,
            balance,
            account,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.loadMarkets();

              case 3:
                _context2.next = 5;
                return this.privatePostGetAccountInfo();

              case 5:
                response = _context2.sent;
                balances = response['balance'];
                result = {
                  'info': response
                };
                currencies = _Object$keys(balances);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  balance = parseFloat(balances[currency]);
                  account = {
                    'free': balance,
                    'used': 0.0,
                    'total': balance
                  };
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            orderbook,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                _context3.next = 5;
                return this.publicGetBcorderbook(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            market,
            tickers,
            ticker,
            timestamp,
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
                _context4.next = 6;
                return this.publicGetTicker(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                tickers = _context4.sent;
                ticker = tickers[market['id']];
                timestamp = this.milliseconds();
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': this.safeFloat(ticker, 'high'),
                  'low': this.safeFloat(ticker, 'low'),
                  'bid': this.safeFloat(ticker, 'bid'),
                  'ask': this.safeFloat(ticker, 'ask'),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': this.safeFloat(ticker, 'last'),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': this.safeFloat(ticker, 'volume'),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 10:
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
      var timestamp = trade['date'] * 1000;
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': trade['tid'].toString(),
        'order': undefined,
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
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var since,
            limit,
            params,
            market,
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
                _context5.next = 8;
                return this.publicGetBctrades(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
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
      _regeneratorRuntime.mark(function _callee6(market, type, side, amount) {
        var price,
            params,
            method,
            marketId,
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
                method = 'privatePost' + this.capitalize(side) + 'Order';
                marketId = this.marketId(market);
                order = {
                  'params': [price, amount, marketId]
                };
                _context6.next = 11;
                return this[method](this.extend(order, params));

              case 11:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['id'].toString()
                });

              case 13:
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
                  'params': id
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
    key: "nonce",
    value: function nonce() {
      return this.microseconds();
    }
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'] + '/' + this.version;

      if (api == 'public') {
        url += '/' + path;
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        if (_Object$keys(params).length) params = params.join(',');else params = '';
        var query = this.urlencode({
          'tonce': nonce,
          'accesskey': this.apiKey,
          'requestmethod': method.toLowerCase(),
          'id': nonce,
          'method': path,
          'params': params
        });
        body = this.json({
          'method': path,
          'params': params,
          'id': nonce
        });
        var signature = this.hmac(this.encode(query), this.encode(this.secret), 'sha1');
        var auth = this.encode(this.apiKey + ':' + signature);
        headers = {
          'Json-Rpc-Tonce': nonce,
          'Authorization': "Basic " + this.decode(this.stringToBase64(auth)),
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

                if (!('error' in response)) {
                  _context8.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context8.abrupt("return", response);

              case 11:
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

  return lakebtc;
}(Exchange);