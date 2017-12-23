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
  _inherits(virwox, _Exchange);

  function virwox() {
    _classCallCheck(this, virwox);

    return _possibleConstructorReturn(this, (virwox.__proto__ || _Object$getPrototypeOf(virwox)).apply(this, arguments));
  }

  _createClass(virwox, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(virwox.prototype.__proto__ || _Object$getPrototypeOf(virwox.prototype), "describe", this).call(this), {
        'id': 'virwox',
        'name': 'VirWoX',
        'countries': ['AT', 'EU'],
        'rateLimit': 1000,
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766894-6da9d360-5eea-11e7-90aa-41f2711b7405.jpg',
          'api': {
            'public': 'http://api.virwox.com/api/json.php',
            'private': 'https://www.virwox.com/api/trading.php'
          },
          'www': 'https://www.virwox.com',
          'doc': 'https://www.virwox.com/developers.php'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': false,
          'login': true,
          'password': true
        },
        'api': {
          'public': {
            'get': ['getInstruments', 'getBestPrices', 'getMarketDepth', 'estimateMarketOrder', 'getTradedPriceVolume', 'getRawTradeData', 'getStatistics', 'getTerminalList', 'getGridList', 'getGridStatistics'],
            'post': ['getInstruments', 'getBestPrices', 'getMarketDepth', 'estimateMarketOrder', 'getTradedPriceVolume', 'getRawTradeData', 'getStatistics', 'getTerminalList', 'getGridList', 'getGridStatistics']
          },
          'private': {
            'get': ['cancelOrder', 'getBalances', 'getCommissionDiscount', 'getOrders', 'getTransactions', 'placeOrder'],
            'post': ['cancelOrder', 'getBalances', 'getCommissionDiscount', 'getOrders', 'getTransactions', 'placeOrder']
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
        var markets, keys, result, p, market, id, symbol, base, quote;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetInstruments();

              case 2:
                markets = _context.sent;
                keys = _Object$keys(markets['result']);
                result = [];

                for (p = 0; p < keys.length; p++) {
                  market = markets['result'][keys[p]];
                  id = market['instrumentID'];
                  symbol = market['symbol'];
                  base = market['longCurrency'];
                  quote = market['shortCurrency'];
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
            b,
            balance,
            currency,
            total,
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
                return this.privatePostGetBalances();

              case 5:
                response = _context2.sent;
                balances = response['result']['accountList'];
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  total = balance['balance'];
                  account = {
                    'free': total,
                    'used': 0.0,
                    'total': total
                  };
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 10:
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
    key: "fetchMarketPrice",
    value: function () {
      var _fetchMarketPrice = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            response,
            result,
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
                return this.publicPostGetBestPrices(this.extend({
                  'symbols': [symbol]
                }, params));

              case 5:
                response = _context3.sent;
                result = response['result'];
                return _context3.abrupt("return", {
                  'bid': this.safeFloat(result[0], 'bestBuyPrice'),
                  'ask': this.safeFloat(result[0], 'bestSellPrice')
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchMarketPrice(_x) {
        return _fetchMarketPrice.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            response,
            orderbook,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                _context4.next = 5;
                return this.publicPostGetMarketDepth(this.extend({
                  'symbols': [symbol],
                  'buyDepth': 100,
                  'sellDepth': 100
                }, params));

              case 5:
                response = _context4.sent;
                orderbook = response['result'][0];
                return _context4.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'price', 'volume'));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOrderBook(_x2) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            end,
            start,
            response,
            marketPrice,
            tickers,
            keys,
            length,
            lastKey,
            ticker,
            timestamp,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                end = this.milliseconds();
                start = end - 86400000;
                _context5.next = 7;
                return this.publicGetTradedPriceVolume(this.extend({
                  'instrument': symbol,
                  'endDate': this.YmdHMS(end),
                  'startDate': this.YmdHMS(start),
                  'HLOC': 1
                }, params));

              case 7:
                response = _context5.sent;
                _context5.next = 10;
                return this.fetchMarketPrice(symbol, params);

              case 10:
                marketPrice = _context5.sent;
                tickers = response['result']['priceVolumeList'];
                keys = _Object$keys(tickers);
                length = keys.length;
                lastKey = keys[length - 1];
                ticker = tickers[lastKey];
                timestamp = this.milliseconds();
                return _context5.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': marketPrice['bid'],
                  'ask': marketPrice['ask'],
                  'vwap': undefined,
                  'open': parseFloat(ticker['open']),
                  'close': parseFloat(ticker['close']),
                  'first': undefined,
                  'last': undefined,
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker['longVolume']),
                  'quoteVolume': parseFloat(ticker['shortVolume']),
                  'info': ticker
                });

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchTicker(_x3) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var since,
            limit,
            params,
            market,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                _context6.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context6.next = 8;
                return this.publicGetRawTradeData(this.extend({
                  'instrument': market['id'],
                  'timespan': 3600
                }, params));

              case 8:
                return _context6.abrupt("return", _context6.sent);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchTrades(_x4) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(market, type, side, amount) {
        var price,
            params,
            order,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                order = {
                  'instrument': this.symbol(market),
                  'orderType': side.toUpperCase(),
                  'amount': amount
                };
                if (type == 'limit') order['price'] = price;
                _context7.next = 8;
                return this.privatePostPlaceOrder(this.extend(order, params));

              case 8:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['orderID'].toString()
                });

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function createOrder(_x5, _x6, _x7, _x8) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(id) {
        var symbol,
            params,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                params = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
                _context8.next = 4;
                return this.privatePostCancelOrder(this.extend({
                  'orderID': id
                }, params));

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function cancelOrder(_x9) {
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
      var url = this.urls['api'][api];
      var auth = {};

      if (api == 'private') {
        this.checkRequiredCredentials();
        auth['key'] = this.apiKey;
        auth['user'] = this.login;
        auth['pass'] = this.password;
      }

      var nonce = this.nonce();

      if (method == 'GET') {
        url += '?' + this.urlencode(this.extend({
          'method': path,
          'id': nonce
        }, auth, params));
      } else {
        headers = {
          'Content-Type': 'application/json'
        };
        body = this.json({
          'method': path,
          'params': this.extend(auth, params),
          'id': nonce
        });
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
      _regeneratorRuntime.mark(function _callee9(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                api = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'public';
                method = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'GET';
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                headers = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                body = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : undefined;
                _context9.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context9.sent;

                if (!('error' in response)) {
                  _context9.next = 11;
                  break;
                }

                if (!response['error']) {
                  _context9.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context9.abrupt("return", response);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return virwox;
}(Exchange);