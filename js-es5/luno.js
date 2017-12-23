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
  _inherits(luno, _Exchange);

  function luno() {
    _classCallCheck(this, luno);

    return _possibleConstructorReturn(this, (luno.__proto__ || _Object$getPrototypeOf(luno)).apply(this, arguments));
  }

  _createClass(luno, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(luno.prototype.__proto__ || _Object$getPrototypeOf(luno.prototype), "describe", this).call(this), {
        'id': 'luno',
        'name': 'luno',
        'countries': ['GB', 'SG', 'ZA'],
        'rateLimit': 10000,
        'version': '1',
        'hasCORS': false,
        'hasFetchTickers': true,
        'hasFetchOrder': true,
        'has': {
          'fetchTickers': true,
          'fetchOrder': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766607-8c1a69d8-5ede-11e7-930c-540b5eb9be24.jpg',
          'api': 'https://api.mybitx.com/api',
          'www': 'https://www.luno.com',
          'doc': ['https://www.luno.com/en/api', 'https://npmjs.org/package/bitx', 'https://github.com/bausmeier/node-bitx']
        },
        'api': {
          'public': {
            'get': ['orderbook', 'ticker', 'tickers', 'trades']
          },
          'private': {
            'get': ['accounts/{id}/pending', 'accounts/{id}/transactions', 'balance', 'fee_info', 'funding_address', 'listorders', 'listtrades', 'orders/{id}', 'quotes/{id}', 'withdrawals', 'withdrawals/{id}'],
            'post': ['accounts', 'postorder', 'marketorder', 'stoporder', 'funding_address', 'withdrawals', 'send', 'quotes', 'oauth2/grant'],
            'put': ['quotes/{id}'],
            'delete': ['quotes/{id}', 'withdrawals/{id}']
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
        var markets, result, p, market, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetTickers();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets['tickers'].length; p++) {
                  market = markets['tickers'][p];
                  id = market['pair'];
                  base = id.slice(0, 3);
                  quote = id.slice(3, 6);
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
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
            reserved,
            unconfirmed,
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
                return this.privateGetBalance();

              case 5:
                response = _context2.sent;
                balances = response['balance'];
                result = {
                  'info': response
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = this.commonCurrencyCode(balance['asset']);
                  reserved = parseFloat(balance['reserved']);
                  unconfirmed = parseFloat(balance['unconfirmed']);
                  account = {
                    'free': parseFloat(balance['balance']),
                    'used': this.sum(reserved, unconfirmed),
                    'total': 0.0
                  };
                  account['total'] = this.sum(account['free'], account['used']);
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            orderbook,
            timestamp,
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
                return this.publicGetOrderbook(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                timestamp = orderbook['timestamp'];
                return _context3.abrupt("return", this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'volume'));

              case 8:
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = order['creation_timestamp'];
      var status = order['state'] == 'PENDING' ? 'open' : 'closed';
      var side = order['type'] == 'ASK' ? 'sell' : 'buy';
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var price = this.safeFloat(order, 'limit_price');
      var amount = this.safeFloat(order, 'limit_volume');
      var quoteFee = this.safeFloat(order, 'fee_counter');
      var baseFee = this.safeFloat(order, 'fee_base');
      var fee = {
        'currency': undefined
      };

      if (quoteFee) {
        fee['side'] = 'quote';
        fee['cost'] = quoteFee;
      } else {
        fee['side'] = 'base';
        fee['cost'] = baseFee;
      }

      return {
        'id': order['order_id'],
        'datetime': this.iso8601(timestamp),
        'timestamp': timestamp,
        'status': status,
        'symbol': symbol,
        'type': undefined,
        'side': side,
        'price': price,
        'amount': amount,
        'filled': undefined,
        'remaining': undefined,
        'trades': undefined,
        'fee': fee,
        'info': order
      };
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(id) {
        var symbol,
            params,
            response,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                symbol = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                _context4.next = 6;
                return this.privateGetOrders(this.extend({
                  'id': id.toString()
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseOrder(response));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOrder(_x2) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['timestamp'];
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
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
        'last': parseFloat(ticker['last_trade']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['rolling_24_hour_volume']),
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var symbols,
            params,
            response,
            tickers,
            ids,
            result,
            i,
            id,
            market,
            symbol,
            ticker,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbols = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : undefined;
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 4;
                return this.loadMarkets();

              case 4:
                _context5.next = 6;
                return this.publicGetTickers(params);

              case 6:
                response = _context5.sent;
                tickers = this.indexBy(response['tickers'], 'pair');
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = tickers[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context5.abrupt("return", result);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var params,
            market,
            ticker,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context6.next = 6;
                return this.publicGetTicker(this.extend({
                  'pair': market['id']
                }, params));

              case 6:
                ticker = _context6.sent;
                return _context6.abrupt("return", this.parseTicker(ticker, market));

              case 8:
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
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var side = trade['is_buy'] ? 'buy' : 'sell';
      return {
        'info': trade,
        'id': undefined,
        'order': undefined,
        'timestamp': trade['timestamp'],
        'datetime': this.iso8601(trade['timestamp']),
        'symbol': market['symbol'],
        'type': undefined,
        'side': side,
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['volume'])
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                since = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                _context7.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context7.next = 8;
                return this.publicGetTrades(this.extend({
                  'pair': market['id']
                }, params));

              case 8:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseTrades(response['trades'], market, since, limit));

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8(market, type, side, amount) {
        var price,
            params,
            method,
            order,
            response,
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
                method = 'privatePost';
                order = {
                  'pair': this.marketId(market)
                };

                if (type == 'market') {
                  method += 'Marketorder';
                  order['type'] = side.toUpperCase();
                  if (side == 'buy') order['counter_volume'] = amount;else order['base_volume'] = amount;
                } else {
                  method += 'Order';
                  order['volume'] = amount;
                  order['price'] = price;
                  if (side == 'buy') order['type'] = 'BID';else order['type'] = 'ASK';
                }

                _context8.next = 9;
                return this[method](this.extend(order, params));

              case 9:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['order_id']
                });

              case 11:
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
                return this.privatePostStoporder({
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
      var url = this.urls['api'] + '/' + this.version + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));
      if (_Object$keys(query).length) url += '?' + this.urlencode(query);

      if (api == 'private') {
        this.checkRequiredCredentials();
        var auth = this.encode(this.apiKey + ':' + this.secret);
        auth = this.stringToBase64(auth);
        headers = {
          'Authorization': 'Basic ' + this.decode(auth)
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

                if (!('error' in response)) {
                  _context10.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context10.abrupt("return", response);

              case 11:
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

  return luno;
}(Exchange);