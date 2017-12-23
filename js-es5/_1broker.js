"use strict"; // ---------------------------------------------------------------------------

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
    AuthenticationError = _require.AuthenticationError; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(_1broker, _Exchange);

  function _1broker() {
    _classCallCheck(this, _1broker);

    return _possibleConstructorReturn(this, (_1broker.__proto__ || _Object$getPrototypeOf(_1broker)).apply(this, arguments));
  }

  _createClass(_1broker, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(_1broker.prototype.__proto__ || _Object$getPrototypeOf(_1broker.prototype), "describe", this).call(this), {
        'id': '_1broker',
        'name': '1Broker',
        'countries': 'US',
        'rateLimit': 1500,
        'version': 'v2',
        'hasPublicAPI': false,
        'hasCORS': true,
        'hasFetchTrades': false,
        'hasFetchOHLCV': true,
        'timeframes': {
          '1m': '60',
          '15m': '900',
          '1h': '3600',
          '1d': '86400'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766021-420bd9fc-5ecb-11e7-8ed6-56d0081efed2.jpg',
          'api': 'https://1broker.com/api',
          'www': 'https://1broker.com',
          'doc': 'https://1broker.com/?c=en/content/api-documentation'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': false
        },
        'api': {
          'private': {
            'get': ['market/bars', 'market/categories', 'market/details', 'market/list', 'market/quotes', 'market/ticks', 'order/cancel', 'order/create', 'order/open', 'position/close', 'position/close_cancel', 'position/edit', 'position/history', 'position/open', 'position/shared/get', 'social/profile_statistics', 'social/profile_trades', 'user/bitcoin_deposit_address', 'user/details', 'user/overview', 'user/quota_status', 'user/transaction_log']
          }
        }
      });
    }
  }, {
    key: "fetchCategories",
    value: function () {
      var _fetchCategories = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, categories, result, i;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.privateGetMarketCategories();

              case 2:
                response = _context.sent;
                // they return an empty string among their categories, wtf?
                categories = response['response'];
                result = [];

                for (i = 0; i < categories.length; i++) {
                  if (categories[i]) result.push(categories[i]);
                }

                return _context.abrupt("return", result);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchCategories() {
        return _fetchCategories.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var this_, categories, result, c, category, markets, p, market, id, symbol, base, quote, parts;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this_ = this; // workaround for Babel bug (not passing `this` to _recursive() call)

                _context2.next = 3;
                return this.fetchCategories();

              case 3:
                categories = _context2.sent;
                result = [];
                c = 0;

              case 6:
                if (!(c < categories.length)) {
                  _context2.next = 15;
                  break;
                }

                category = categories[c];
                _context2.next = 10;
                return this_.privateGetMarketList({
                  'category': category.toLowerCase()
                });

              case 10:
                markets = _context2.sent;

                for (p = 0; p < markets['response'].length; p++) {
                  market = markets['response'][p];
                  id = market['symbol'];
                  symbol = undefined;
                  base = undefined;
                  quote = undefined;

                  if (category == 'FOREX' || category == 'CRYPTO') {
                    symbol = market['name'];
                    parts = symbol.split('/');
                    base = parts[0];
                    quote = parts[1];
                  } else {
                    base = id;
                    quote = 'USD';
                    symbol = base + '/' + quote;
                  }

                  base = this_.commonCurrencyCode(base);
                  quote = this_.commonCurrencyCode(quote);
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
                  });
                }

              case 12:
                c++;
                _context2.next = 6;
                break;

              case 15:
                return _context2.abrupt("return", result);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      _regeneratorRuntime.mark(function _callee3() {
        var params,
            balance,
            response,
            result,
            currencies,
            c,
            currency,
            total,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                _context3.next = 5;
                return this.privateGetUserOverview();

              case 5:
                balance = _context3.sent;
                response = balance['response'];
                result = {
                  'info': response
                };
                currencies = _Object$keys(this.currencies);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  result[currency] = this.account();
                }

                total = parseFloat(response['balance']);
                result['BTC']['free'] = total;
                result['BTC']['total'] = total;
                return _context3.abrupt("return", this.parseBalance(result));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            response,
            orderbook,
            timestamp,
            bidPrice,
            askPrice,
            bid,
            ask,
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
                return this.privateGetMarketQuotes(this.extend({
                  'symbols': this.marketId(symbol)
                }, params));

              case 5:
                response = _context4.sent;
                orderbook = response['response'][0];
                timestamp = this.parse8601(orderbook['updated']);
                bidPrice = parseFloat(orderbook['bid']);
                askPrice = parseFloat(orderbook['ask']);
                bid = [bidPrice, undefined];
                ask = [askPrice, undefined];
                return _context4.abrupt("return", {
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'bids': [bid],
                  'asks': [ask]
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                throw new ExchangeError(this.id + ' fetchTrades () method not implemented yet');

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchTrades(_x2) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var params,
            result,
            orderbook,
            ticker,
            timestamp,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 3;
                return this.loadMarkets();

              case 3:
                _context6.next = 5;
                return this.privateGetMarketBars(this.extend({
                  'symbol': this.marketId(symbol),
                  'resolution': 60,
                  'limit': 1
                }, params));

              case 5:
                result = _context6.sent;
                _context6.next = 8;
                return this.fetchOrderBook(symbol);

              case 8:
                orderbook = _context6.sent;
                ticker = result['response'][0];
                timestamp = this.parse8601(ticker['date']);
                return _context6.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['h']),
                  'low': parseFloat(ticker['l']),
                  'bid': orderbook['bids'][0][0],
                  'ask': orderbook['asks'][0][0],
                  'vwap': undefined,
                  'open': parseFloat(ticker['o']),
                  'close': parseFloat(ticker['c']),
                  'first': undefined,
                  'last': undefined,
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchTicker(_x3) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [this.parse8601(ohlcv['date']), parseFloat(ohlcv['o']), parseFloat(ohlcv['h']), parseFloat(ohlcv['l']), parseFloat(ohlcv['c']), undefined];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            request,
            result,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                timeframe = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : '1m';
                since = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                limit = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : undefined;
                params = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : {};
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'resolution': this.timeframes[timeframe]
                };
                if (since) request['date_start'] = this.iso8601(since); // they also support date_end

                if (limit) request['limit'] = limit;
                _context7.next = 12;
                return this.privateGetMarketBars(this.extend(request, params));

              case 12:
                result = _context7.sent;
                return _context7.abrupt("return", this.parseOHLCVs(result['response'], market, timeframe, since, limit));

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchOHLCV(_x4) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
            order,
            result,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                price = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                params = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : {};
                _context8.next = 4;
                return this.loadMarkets();

              case 4:
                order = {
                  'symbol': this.marketId(symbol),
                  'margin': amount,
                  'direction': side == 'sell' ? 'short' : 'long',
                  'leverage': 1,
                  'type': side
                };
                if (type == 'limit') order['price'] = price;else order['type'] += '_market';
                _context8.next = 8;
                return this.privateGetOrderCreate(this.extend(order, params));

              case 8:
                result = _context8.sent;
                return _context8.abrupt("return", {
                  'info': result,
                  'id': result['response']['order_id']
                });

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
                _context9.next = 4;
                return this.loadMarkets();

              case 4:
                _context9.next = 6;
                return this.privatePostOrderCancel({
                  'order_id': id
                });

              case 6:
                return _context9.abrupt("return", _context9.sent);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      this.checkRequiredCredentials();
      var url = this.urls['api'] + '/' + this.version + '/' + path + '.php';
      var query = this.extend({
        'token': this.apiKey
      }, params);
      url += '?' + this.urlencode(query);
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

                if (!('warning' in response)) {
                  _context10.next = 11;
                  break;
                }

                if (!response['warning']) {
                  _context10.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                if (!('error' in response)) {
                  _context10.next = 14;
                  break;
                }

                if (!response['error']) {
                  _context10.next = 14;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 14:
                return _context10.abrupt("return", response);

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return _1broker;
}(Exchange);