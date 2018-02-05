'use strict'; //  ---------------------------------------------------------------------------

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
    AuthenticationError = _require.AuthenticationError,
    DDoSProtection = _require.DDoSProtection; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bibox, _Exchange);

  function bibox() {
    _classCallCheck(this, bibox);

    return _possibleConstructorReturn(this, (bibox.__proto__ || _Object$getPrototypeOf(bibox)).apply(this, arguments));
  }

  _createClass(bibox, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bibox.prototype.__proto__ || _Object$getPrototypeOf(bibox.prototype), "describe", this).call(this), {
        'id': 'bibox',
        'name': 'Bibox',
        'countries': ['CN', 'US', 'KR'],
        'version': 'v1',
        'has': {
          'CORS': false,
          'publicAPI': false,
          'fetchBalance': true,
          'fetchCurrencies': true,
          'fetchDepositAddress': true,
          'fetchTickers': true,
          'fetchOrders': true,
          'fetchMyTrades': true,
          'fetchOHLCV': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': '1min',
          '5m': '5min',
          '15m': '15min',
          '30m': '30min',
          '1h': '1hour',
          '8h': '12hour',
          '1d': 'day',
          '1w': 'week'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/34902611-2be8bf1a-f830-11e7-91a2-11b2f292e750.jpg',
          'api': 'https://api.bibox.com',
          'www': 'https://www.bibox.com',
          'doc': ['https://github.com/Biboxcom/api_reference/wiki/home_en', 'https://github.com/Biboxcom/api_reference/wiki/api_reference'],
          'fees': 'https://bibox.zendesk.com/hc/en-us/articles/115004417013-Fee-Structure-on-Bibox'
        },
        'api': {
          'public': {
            'post': [// TODO: rework for full endpoint/cmd paths here
            'mdata'],
            'get': ['mdata']
          },
          'private': {
            'post': ['user', 'orderpending', 'transfer']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'taker': 0.001,
            'maker': 0.0
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {},
            'deposit': 0.0
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
        var params,
            response,
            markets,
            result,
            i,
            market,
            base,
            quote,
            symbol,
            id,
            precision,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.publicGetMdata(this.extend({
                  'cmd': 'marketAll'
                }, params));

              case 3:
                response = _context.sent;
                markets = response['result'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  base = market['coin_symbol'];
                  quote = market['currency_symbol'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  id = base + '_' + quote;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': undefined,
                    'info': market,
                    'lot': Math.pow(10, -precision['amount']),
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': Math.pow(10, -precision['amount']),
                        'max': undefined
                      },
                      'price': {
                        'min': undefined,
                        'max': undefined
                      }
                    }
                  }));
                }

                return _context.abrupt("return", result);

              case 8:
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.safeInteger(ticker, 'timestamp', this.seconds());
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        symbol = ticker['coin_symbol'] + '/' + ticker['currency_symbol'];
      }

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
        'percentage': this.safeString(ticker, 'percent'),
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'vol'),
        'quoteVolume': undefined,
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
            response,
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
                _context2.next = 6;
                return this.publicGetMdata(this.extend({
                  'cmd': 'ticker',
                  'pair': market['id']
                }, params));

              case 6:
                response = _context2.sent;
                return _context2.abrupt("return", this.parseTicker(response['result'], market));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchTicker(_x) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var symbols,
            params,
            response,
            tickers,
            result,
            t,
            ticker,
            symbol,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                symbols = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : undefined;
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 4;
                return this.publicGetMdata(this.extend({
                  'cmd': 'marketAll'
                }, params));

              case 4:
                response = _context3.sent;
                tickers = response['result'];
                result = {};
                t = 0;

              case 8:
                if (!(t < tickers.length)) {
                  _context3.next = 17;
                  break;
                }

                ticker = this.parseTicker(tickers[t]);
                symbol = ticker['symbol'];

                if (!(symbols && !(symbol in symbols))) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("continue", 14);

              case 13:
                result[symbol] = ticker;

              case 14:
                t++;
                _context3.next = 8;
                break;

              case 17:
                return _context3.abrupt("return", result);

              case 18:
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
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = trade['time'];
      var side = trade['side'] === '1' ? 'buy' : 'sell';
      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': 'limit',
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var since,
            limit,
            params,
            market,
            size,
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
                size = limit ? limit : 200;
                _context4.next = 9;
                return this.publicGetMdata(this.extend({
                  'cmd': 'deals',
                  'pair': market['id'],
                  'size': size
                }, params));

              case 9:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response['result'], market, since, limit));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTrades(_x2) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var limit,
            params,
            market,
            request,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                limit = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 200;
                params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                _context5.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                request = {
                  'cmd': 'depth',
                  'pair': market['id']
                };
                request['size'] = limit; // default = 200 ?

                _context5.next = 9;
                return this.publicGetMdata(this.extend(request, params));

              case 9:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseOrderBook(response['result'], this.safeFloat(response['result'], 'update_time'), 'bids', 'asks', 'price', 'volume'));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x3) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv['time'], ohlcv['open'], ohlcv['high'], ohlcv['low'], ohlcv['close'], ohlcv['vol']];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            size,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                timeframe = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : '1m';
                since = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                limit = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : undefined;
                params = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : {};
                _context6.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                size = limit ? limit : 1000;
                _context6.next = 10;
                return this.publicGetMdata(this.extend({
                  'cmd': 'kline',
                  'pair': market['id'],
                  'period': this.timeframes[timeframe],
                  'size': size
                }, params));

              case 10:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseOHLCVs(response['result'], market, timeframe, since, limit));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchOHLCV(_x4) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var params,
            response,
            currencies,
            result,
            i,
            currency,
            id,
            code,
            precision,
            deposit,
            withdraw,
            active,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _context7.next = 3;
                return this.privatePostTransfer({
                  'cmd': 'transfer/coinList',
                  'body': {}
                });

              case 3:
                response = _context7.sent;
                currencies = response['result'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['symbol'];
                  code = this.commonCurrencyCode(id);
                  precision = 8;
                  deposit = currency['enable_deposit'];
                  withdraw = currency['enable_withdraw'];
                  active = deposit && withdraw;
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['name'],
                    'active': active,
                    'status': 'ok',
                    'fee': undefined,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'price': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'cost': {
                        'min': undefined,
                        'max': undefined
                      },
                      'withdraw': {
                        'min': undefined,
                        'max': Math.pow(10, precision)
                      }
                    }
                  };
                }

                return _context7.abrupt("return", result);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var params,
            response,
            balances,
            result,
            indexed,
            keys,
            i,
            id,
            currency,
            account,
            balance,
            used,
            free,
            total,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                _context8.next = 5;
                return this.privatePostTransfer({
                  'cmd': 'transfer/assets',
                  'body': this.extend({
                    'select': 1
                  }, params)
                });

              case 5:
                response = _context8.sent;
                balances = response['result'];
                result = {
                  'info': balances
                };
                indexed = undefined;

                if ('assets_list' in balances) {
                  indexed = this.indexBy(balances['assets_list'], 'coin_symbol');
                } else {
                  indexed = {};
                }

                keys = _Object$keys(indexed);

                for (i = 0; i < keys.length; i++) {
                  id = keys[i];
                  currency = this.commonCurrencyCode(id);
                  account = this.account();
                  balance = indexed[id];
                  used = parseFloat(balance['freeze']);
                  free = parseFloat(balance['balance']);
                  total = this.sum(free, used);
                  account['free'] = free;
                  account['used'] = used;
                  account['total'] = total;
                  result[currency] = account;
                }

                return _context8.abrupt("return", this.parseBalance(result));

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(symbol, type, side, amount) {
        var price,
            params,
            market,
            orderType,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                price = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                params = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : {};
                _context9.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                orderType = type === 'limit' ? 2 : 1;
                _context9.next = 8;
                return this.privatePostOrder({
                  'cmd': 'orderpending/trade',
                  'body': this.extend({
                    'pair': market['id'],
                    'account_type': 0,
                    'order_type': orderType,
                    'order_side': side,
                    'pay_bix': 0,
                    'amount': amount,
                    'price': price
                  }, params)
                });

              case 8:
                response = _context9.sent;
                return _context9.abrupt("return", {
                  'info': response,
                  'id': this.safeString(response, 'result')
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10(id) {
        var symbol,
            params,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                params = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : {};
                _context10.next = 4;
                return this.privatePostCancelOrder({
                  'cmd': 'orderpending/cancelTrade',
                  'body': this.extend({
                    'orders_id': id
                  }, params)
                });

              case 4:
                response = _context10.sent;
                return _context10.abrupt("return", response);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        symbol = order['coin_symbol'] + '/' + order['currency_symbol'];
      }

      var type = order['order_type'] === 1 ? 'market' : 'limit';
      var timestamp = order['createdAt'];
      var price = order['price'];
      var filled = order['amount'];
      var amount = this.safeInteger(order, 'deal_amount');
      var remaining = amount - filled;
      var side = order['order_side'] === 1 ? 'buy' : 'sell';
      var status = undefined;

      if ('status' in order) {
        status = this.parseOrderStatus(order['status']);
      }

      var result = {
        'info': order,
        'id': this.safeString(order, 'id'),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': price,
        'amount': amount,
        'cost': price * filled,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': this.safeFloat(order, 'fee')
      };
      return result;
    }
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      var statuses = {
        '1': 'pending',
        '2': 'open',
        '3': 'closed',
        '4': 'canceled',
        '5': 'canceled',
        '6': 'canceled'
      };
      return this.safeString(statuses, status, status.toLowerCase());
    }
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            market,
            size,
            response,
            orders,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};

                if (symbol) {
                  _context11.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders requires a symbol param');

              case 6:
                _context11.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                size = limit ? limit : 200;
                _context11.next = 12;
                return this.privatePostOrderpending({
                  'cmd': 'orderpending/orderPendingList',
                  'body': this.extend({
                    'pair': market['id'],
                    'account_type': 0,
                    // 0 - regular, 1 - margin
                    'page': 1,
                    'size': size
                  }, params)
                });

              case 12:
                response = _context11.sent;
                orders = 'items' in response ? response['items'] : [];
                return _context11.abrupt("return", this.parseOrders(orders, market, since, limit));

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchOrders() {
        return _fetchOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12() {
        var symbol,
            since,
            limit,
            params,
            market,
            size,
            response,
            orders,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : undefined;
                since = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};

                if (symbol) {
                  _context12.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchMyTrades requires a symbol param');

              case 6:
                _context12.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                size = limit ? limit : 200;
                _context12.next = 12;
                return this.privatePostOrderpending({
                  'cmd': 'orderpending/orderHistoryList',
                  'body': this.extend({
                    'pair': market['id'],
                    'account_type': 0,
                    // 0 - regular, 1 - margin
                    'page': 1,
                    'size': size
                  }, params)
                });

              case 12:
                response = _context12.sent;
                orders = 'items' in response ? response['items'] : [];
                return _context12.abrupt("return", this.parseOrders(orders, market, since, limit));

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(code) {
        var params,
            currency,
            response,
            result,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                params = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
                _context13.next = 3;
                return this.loadMarkets();

              case 3:
                currency = this.currency(code);
                _context13.next = 6;
                return this.privatePostTransfer({
                  'cmd': 'transfer/transferOutInfo',
                  'body': this.extend({
                    'coin_symbol': currency['id']
                  }, params)
                });

              case 6:
                response = _context13.sent;
                result = {
                  'info': response,
                  'address': undefined
                };
                return _context13.abrupt("return", result);

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchDepositAddress(_x10) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(code, amount, address) {
        var tag,
            params,
            currency,
            response,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                tag = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : undefined;
                params = _args14.length > 4 && _args14[4] !== undefined ? _args14[4] : {};
                _context14.next = 4;
                return this.loadMarkets();

              case 4:
                currency = this.currency(code);
                _context14.next = 7;
                return this.privatePostTransfer({
                  'cmd': 'transfer/transferOut',
                  'body': this.extend({
                    'coin_symbol': currency,
                    'amount': amount,
                    'addr': address,
                    'addr_remark': ''
                  }, params)
                });

              case 7:
                response = _context14.sent;
                return _context14.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function withdraw(_x11, _x12, _x13) {
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
      var url = this.urls['api'] + '/' + this.version + '/' + path;
      var cmds = this.json([params]);

      if (api === 'public') {
        if (method === 'GET') {
          if (_Object$keys(params).length) url += '?' + this.urlencode(params);
        } else {
          body = {
            'cmds': cmds
          };
        }
      } else {
        this.checkRequiredCredentials();
        body = {
          'cmds': cmds,
          'apikey': this.apiKey,
          'sign': this.hmac(this.encode(cmds), this.encode(this.secret), 'md5')
        };
      }

      headers = {
        'Content-Type': 'application/json'
      };
      return {
        'url': url,
        'method': method,
        'body': this.json(body),
        'headers': headers
      };
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            message,
            code,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                api = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 'public';
                method = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : 'GET';
                params = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
                headers = _args15.length > 4 && _args15[4] !== undefined ? _args15[4] : undefined;
                body = _args15.length > 5 && _args15[5] !== undefined ? _args15[5] : undefined;
                _context15.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context15.sent;
                message = this.id + ' ' + this.json(response);

                if (!('error' in response)) {
                  _context15.next = 23;
                  break;
                }

                if (!('code' in response['error'])) {
                  _context15.next = 22;
                  break;
                }

                code = response['error']['code'];

                if (!(code === '3012')) {
                  _context15.next = 16;
                  break;
                }

                throw new AuthenticationError(message);

              case 16:
                if (!(code === '3025')) {
                  _context15.next = 20;
                  break;
                }

                throw new AuthenticationError(message);

              case 20:
                if (!(code === '4003')) {
                  _context15.next = 22;
                  break;
                }

                throw new DDoSProtection(message);

              case 22:
                throw new ExchangeError(message);

              case 23:
                if ('result' in response) {
                  _context15.next = 25;
                  break;
                }

                throw new ExchangeError(message);

              case 25:
                if (!(method === 'GET')) {
                  _context15.next = 29;
                  break;
                }

                return _context15.abrupt("return", response);

              case 29:
                return _context15.abrupt("return", response['result'][0]);

              case 30:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function request(_x14) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bibox;
}(Exchange);