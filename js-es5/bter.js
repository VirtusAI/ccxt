"use strict"; //  ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
  _inherits(bter, _Exchange);

  function bter() {
    _classCallCheck(this, bter);

    return _possibleConstructorReturn(this, (bter.__proto__ || _Object$getPrototypeOf(bter)).apply(this, arguments));
  }

  _createClass(bter, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bter.prototype.__proto__ || _Object$getPrototypeOf(bter.prototype), "describe", this).call(this), {
        'id': 'bter',
        'name': 'Bter',
        'countries': ['VG', 'CN'],
        // British Virgin Islands, China
        'version': '2',
        'hasCORS': false,
        'hasFetchTickers': true,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27980479-cfa3188c-6387-11e7-8191-93fc4184ba5c.jpg',
          'api': {
            'public': 'https://data.bter.com/api',
            'private': 'https://api.bter.com/api'
          },
          'www': 'https://bter.com',
          'doc': 'https://bter.com/api2'
        },
        'api': {
          'public': {
            'get': ['pairs', 'marketinfo', 'marketlist', 'tickers', 'ticker/{id}', 'orderBook/{id}', 'trade/{id}', 'tradeHistory/{id}', 'tradeHistory/{id}/{tid}']
          },
          'private': {
            'post': ['balances', 'depositAddress', 'newAddress', 'depositsWithdrawals', 'buy', 'sell', 'cancelOrder', 'cancelAllOrders', 'getOrder', 'openOrders', 'tradeHistory', 'withdraw']
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
        var response, markets, result, i, market, keys, id, details, _id$split, _id$split2, base, quote, symbol, precision, amountLimits, priceLimits, limits;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarketinfo();

              case 2:
                response = _context.sent;
                markets = this.safeValue(response, 'pairs');

                if (markets) {
                  _context.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchMarkets got an unrecognized response');

              case 6:
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  keys = _Object$keys(market);
                  id = keys[0];
                  details = market[id];
                  _id$split = id.split('_'), _id$split2 = _slicedToArray(_id$split, 2), base = _id$split2[0], quote = _id$split2[1];
                  base = base.toUpperCase();
                  quote = quote.toUpperCase();
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': details['decimal_places'],
                    'price': details['decimal_places']
                  };
                  amountLimits = {
                    'min': details['min_amount'],
                    'max': undefined
                  };
                  priceLimits = {
                    'min': undefined,
                    'max': undefined
                  };
                  limits = {
                    'amount': amountLimits,
                    'price': priceLimits
                  };
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market,
                    'maker': details['fee'] / 100,
                    'taker': details['fee'] / 100,
                    'precision': precision,
                    'limits': limits
                  });
                }

                return _context.abrupt("return", result);

              case 9:
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
            balance,
            result,
            currencies,
            i,
            currency,
            code,
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
                return this.privatePostBalances();

              case 5:
                balance = _context2.sent;
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  code = this.commonCurrencyCode(currency);
                  account = this.account();

                  if ('available' in balance) {
                    if (currency in balance['available']) {
                      account['free'] = parseFloat(balance['available'][currency]);
                    }
                  }

                  if ('locked' in balance) {
                    if (currency in balance['locked']) {
                      account['used'] = parseFloat(balance['locked'][currency]);
                    }
                  }

                  account['total'] = this.sum(account['free'], account['used']);
                  result[code] = account;
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            orderbook,
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
                return this.publicGetOrderBookId(this.extend({
                  'id': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                result = this.parseOrderBook(orderbook);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context3.abrupt("return", result);

              case 9:
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
        'high': parseFloat(ticker['high24hr']),
        'low': parseFloat(ticker['low24hr']),
        'bid': parseFloat(ticker['highestBid']),
        'ask': parseFloat(ticker['lowestAsk']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last']),
        'change': parseFloat(ticker['percentChange']),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['quoteVolume']),
        'quoteVolume': parseFloat(ticker['baseVolume']),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            tickers,
            result,
            ids,
            i,
            id,
            _id$split3,
            _id$split4,
            baseId,
            quoteId,
            base,
            quote,
            symbol,
            ticker,
            market,
            _args4 = arguments;

        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                symbols = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : undefined;
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                _context4.next = 6;
                return this.publicGetTickers(params);

              case 6:
                tickers = _context4.sent;
                result = {};
                ids = _Object$keys(tickers);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  _id$split3 = id.split('_'), _id$split4 = _slicedToArray(_id$split3, 2), baseId = _id$split4[0], quoteId = _id$split4[1];
                  base = baseId.toUpperCase();
                  quote = quoteId.toUpperCase();
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  ticker = tickers[id];
                  market = undefined;
                  if (symbol in this.markets) market = this.markets[symbol];
                  if (id in this.markets_by_id) market = this.markets_by_id[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            market,
            ticker,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context5.next = 6;
                return this.publicGetTickerId(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                ticker = _context5.sent;
                return _context5.abrupt("return", this.parseTicker(ticker, market));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = this.parse8601(trade['date']);
      return {
        'id': trade['tradeID'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['type'],
        'price': trade['rate'],
        'amount': this.safeFloat(trade, 'amount')
      };
    }
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
            response,
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
                return this.publicGetTradeHistoryId(this.extend({
                  'id': market['id']
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['data'], market, since, limit));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
            method,
            order,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};

                if (!(type == 'market')) {
                  _context7.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                method = 'privatePost' + this.capitalize(side);
                order = {
                  'currencyPair': this.marketId(symbol),
                  'rate': price,
                  'amount': amount
                };
                _context7.next = 10;
                return this[method](this.extend(order, params));

              case 10:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['orderNumber']
                });

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
                return this.loadMarkets();

              case 4:
                _context8.next = 6;
                return this.privatePostCancelOrder({
                  'orderNumber': id
                });

              case 6:
                return _context8.abrupt("return", _context8.sent);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(currency, amount, address) {
        var params,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 3;
                return this.loadMarkets();

              case 3:
                _context9.next = 5;
                return this.privatePostWithdraw(this.extend({
                  'currency': currency.toLowerCase(),
                  'amount': amount,
                  'address': address // Address must exist in you AddressBook in security settings

                }, params));

              case 5:
                response = _context9.sent;
                return _context9.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function withdraw(_x9, _x10, _x11) {
        return _withdraw.apply(this, arguments);
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
      var prefix = api == 'private' ? api + '/' : '';
      var url = this.urls['api'][api] + this.version + '/1/' + prefix + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var request = {
          'nonce': nonce
        };
        body = this.urlencode(this.extend(request, query));
        var signature = this.hmac(this.encode(body), this.encode(this.secret), 'sha512');
        headers = {
          'Key': this.apiKey,
          'Sign': signature,
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

                if (!('result' in response)) {
                  _context10.next = 11;
                  break;
                }

                if (!(response['result'] != 'true')) {
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

      return function request(_x12) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bter;
}(Exchange);