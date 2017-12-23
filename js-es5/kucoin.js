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
    InvalidNonce = _require.InvalidNonce,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(kucoin, _Exchange);

  function kucoin() {
    _classCallCheck(this, kucoin);

    return _possibleConstructorReturn(this, (kucoin.__proto__ || _Object$getPrototypeOf(kucoin)).apply(this, arguments));
  }

  _createClass(kucoin, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(kucoin.prototype.__proto__ || _Object$getPrototypeOf(kucoin.prototype), "describe", this).call(this), {
        'id': 'kucoin',
        'name': 'Kucoin',
        'countries': 'HK',
        // Hong Kong
        'version': 'v1',
        'rateLimit': 2000,
        'hasCORS': false,
        'userAgent': this.userAgents['chrome'],
        // obsolete metainfo interface
        'hasFetchTickers': true,
        'hasFetchOHLCV': false,
        // see the method implementation below
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchOpenOrders': true,
        'hasFetchMyTrades': false,
        'hasFetchCurrencies': true,
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
          'fetchTickers': true,
          'fetchOHLCV': true,
          // see the method implementation below
          'fetchOrder': true,
          'fetchOrders': true,
          'fetchClosedOrders': true,
          'fetchOpenOrders': true,
          'fetchMyTrades': false,
          'fetchCurrencies': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': '1',
          '5m': '5',
          '15m': '15',
          '30m': '30',
          '1h': '60',
          '8h': '480',
          '1d': 'D',
          '1w': 'W'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/33795655-b3c46e48-dcf6-11e7-8abe-dc4588ba7901.jpg',
          'api': 'https://api.kucoin.com',
          'www': 'https://kucoin.com',
          'doc': 'https://kucoinapidocs.docs.apiary.io',
          'fees': 'https://news.kucoin.com/en/fee'
        },
        'api': {
          'public': {
            'get': ['open/chart/config', 'open/chart/history', 'open/chart/symbol', 'open/currencies', 'open/deal-orders', 'open/kline', 'open/lang-list', 'open/orders', 'open/orders-buy', 'open/orders-sell', 'open/tick', 'market/open/coin-info', 'market/open/coins', 'market/open/coins-trending', 'market/open/symbols']
          },
          'private': {
            'get': ['account/balance', 'account/{coin}/wallet/address', 'account/{coin}/wallet/records', 'account/{coin}/balance', 'account/promotion/info', 'account/promotion/sum', 'deal-orders', 'order/active', 'order/active-map', 'order/dealt', 'referrer/descendant/count', 'user/info'],
            'post': ['account/{coin}/withdraw/apply', 'account/{coin}/withdraw/cancel', 'cancel-order', 'order', 'user/change-lang']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.0010,
            'taker': 0.0010
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
        var response, markets, result, i, market, id, base, quote, symbol, precision, active;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarketOpenSymbols();

              case 2:
                response = _context.sent;
                markets = response['data'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['symbol'];
                  base = market['coinType'];
                  quote = market['coinTypePair'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  active = market['trading'];
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': active,
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
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
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
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.publicGetMarketOpenCoins(params);

              case 3:
                response = _context2.sent;
                currencies = response['data'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['coin']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  code = this.commonCurrencyCode(id);
                  precision = currency['tradePrecision'];
                  deposit = currency['enableDeposit'];
                  withdraw = currency['enableWithdraw'];
                  active = deposit && withdraw;
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['name'],
                    'active': active,
                    'status': 'ok',
                    'fee': currency['withdrawFeeRate'],
                    // todo: redesign
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
                        'min': currency['withdrawMinAmount'],
                        'max': Math.pow(10, precision)
                      }
                    }
                  };
                }

                return _context2.abrupt("return", result);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      _regeneratorRuntime.mark(function _callee3() {
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
            total,
            used,
            free,
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
                return this.privateGetAccountBalance(this.extend({
                  'limit': 20,
                  // default 12, max 20
                  'page': 1
                }, params));

              case 5:
                response = _context3.sent;
                balances = response['data'];
                result = {
                  'info': balances
                };
                indexed = this.indexBy(balances, 'coinType');
                keys = _Object$keys(indexed);

                for (i = 0; i < keys.length; i++) {
                  id = keys[i];
                  currency = this.commonCurrencyCode(id);
                  account = this.account();
                  balance = indexed[id];
                  total = parseFloat(balance['balance']);
                  used = parseFloat(balance['freezeBalance']);
                  free = total - used;
                  account['free'] = free;
                  account['used'] = used;
                  account['total'] = total;
                  result[currency] = account;
                }

                return _context3.abrupt("return", this.parseBalance(result));

              case 12:
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
            market,
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
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetOpenOrders(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                orderbook = response['data'];
                return _context4.abrupt("return", this.parseOrderBook(orderbook, undefined, 'BUY', 'SELL'));

              case 9:
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        symbol = order['coinType'] + '/' + order['coinTypePair'];
      }

      var timestamp = order['createdAt'];
      var price = this.safeFloat(order, 'price');
      var amount = this.safeFloat(order, 'amount');
      var filled = this.safeFloat(order, 'dealAmount');
      var remaining = this.safeFloat(order, 'pendingAmount');
      var side = order['type'].toLowerCase();
      var result = {
        'info': order,
        'id': this.safeString(order, 'oid'),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': 'limit',
        'side': side,
        'price': price,
        'amount': amount,
        'cost': price * filled,
        'filled': filled,
        'remaining': remaining,
        'status': undefined,
        'fee': this.safeFloat(order, 'fee')
      };
      return result;
    }
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            orders,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbol = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : undefined;
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};

                if (symbol) {
                  _context5.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol param');

              case 6:
                _context5.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                _context5.next = 12;
                return this.privateGetOrderActiveMap(this.extend(request, params));

              case 12:
                response = _context5.sent;
                orders = this.arrayConcat(response['data']['SELL'], response['data']['BUY']);
                return _context5.abrupt("return", this.parseOrders(orders, market, since, limit));

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchClosedOrders",
    value: function () {
      var _fetchClosedOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : undefined;
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                request = {};
                _context6.next = 7;
                return this.loadMarkets();

              case 7:
                market = this.market(symbol);

                if (symbol) {
                  request['symbol'] = market['id'];
                }

                if (since) {
                  request['since'] = since;
                }

                if (limit) {
                  request['limit'] = limit;
                }

                _context6.next = 13;
                return this.privateGetOrderDealt(this.extend(request, params));

              case 13:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseOrders(response['data']['datas'], market, since, limit));

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
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
            market,
            order,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};

                if (!(type != 'limit')) {
                  _context7.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                order = {
                  'symbol': market['id'],
                  'type': side.toUpperCase(),
                  'price': this.priceToPrecision(symbol, price),
                  'amount': this.amountToPrecision(symbol, amount)
                };
                _context7.next = 10;
                return this.privatePostOrder(this.extend(order, params));

              case 10:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': this.safeString(response['data'], 'orderOid')
                });

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function createOrder(_x2, _x3, _x4, _x5) {
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
            market,
            request,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                params = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};

                if (symbol) {
                  _context8.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires symbol argument');

              case 4:
                _context8.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'orderOid': id
                };

                if (!('type' in params)) {
                  _context8.next = 12;
                  break;
                }

                request['type'] = params['type'].toUpperCase();
                _context8.next = 13;
                break;

              case 12:
                throw new ExchangeError(this.id + ' cancelOrder requires type (BUY or SELL) param');

              case 13:
                _context8.next = 15;
                return this.privatePostCancelOrder(this.extend(request, params));

              case 15:
                response = _context8.sent;
                return _context8.abrupt("return", response);

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function cancelOrder(_x6) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['datetime'];
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        symbol = ticker['coinType'] + '/' + ticker['coinTypePair'];
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
        'last': this.safeFloat(ticker, 'lastDealPrice'),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'vol'),
        'quoteVolume': this.safeFloat(ticker, 'volValue'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9() {
        var symbols,
            params,
            response,
            tickers,
            result,
            t,
            ticker,
            symbol,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbols = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : undefined;
                params = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
                _context9.next = 4;
                return this.publicGetMarketOpenSymbols(params);

              case 4:
                response = _context9.sent;
                tickers = response['data'];
                result = {};

                for (t = 0; t < tickers.length; t++) {
                  ticker = this.parseTicker(tickers[t]);
                  symbol = ticker['symbol'];
                  result[symbol] = ticker;
                }

                return _context9.abrupt("return", result);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10(symbol) {
        var params,
            market,
            response,
            ticker,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                params = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
                _context10.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context10.next = 6;
                return this.publicGetOpenTick(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                response = _context10.sent;
                ticker = response['data'];
                return _context10.abrupt("return", this.parseTicker(ticker, market));

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchTicker(_x7) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = trade[0];
      var side = undefined;

      if (trade[1] == 'BUY') {
        side = 'buy';
      } else if (trade[1] == 'SELL') {
        side = 'sell';
      }

      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': 'limit',
        'side': side,
        'price': trade[2],
        'amount': trade[3]
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                _context11.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context11.next = 8;
                return this.publicGetOpenDealOrders(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseTrades(response['data'], market, since, limit));

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchTrades(_x8) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1d';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var timestamp = this.parse8601(ohlcv['T']);
      return [timestamp, ohlcv['O'], ohlcv['H'], ohlcv['L'], ohlcv['C'], ohlcv['V']];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            to,
            request,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                timeframe = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : '1m';
                since = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                limit = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : undefined;
                params = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : {};
                _context12.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                to = this.seconds();
                request = {
                  'symbol': market['id'],
                  'type': this.timeframes[timeframe],
                  'from': to - 86400,
                  'to': to
                };

                if (since) {
                  request['from'] = parseInt(since / 1000);
                } // limit is not documented in api call, and not respected


                if (limit) {
                  request['limit'] = limit;
                }

                _context12.next = 13;
                return this.publicGetOpenChartHistory(this.extend(request, params));

              case 13:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseOHLCVs(response['data'], market, timeframe, since, limit));

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchOHLCV(_x9) {
        return _fetchOHLCV.apply(this, arguments);
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
      var endpoint = '/' + this.version + '/' + this.implodeParams(path, params);
      var url = this.urls['api'] + endpoint;
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials(); // their nonce is always a calibrated synched milliseconds-timestamp

        var nonce = this.milliseconds();
        var queryString = '';
        nonce = nonce.toString();

        if (_Object$keys(query).length) {
          queryString = this.rawencode(this.keysort(query));

          if (method == 'GET') {
            url += '?' + queryString;
          } else {
            body = queryString;
          }
        }

        var auth = endpoint + '/' + nonce + '/' + queryString;
        var payload = this.stringToBase64(this.encode(auth)); // payload should be "encoded" as returned from stringToBase64

        var signature = this.hmac(payload, this.encode(this.secret), 'sha256');
        headers = {
          'KC-API-KEY': this.apiKey,
          'KC-API-NONCE': nonce,
          'KC-API-SIGNATURE': signature
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
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code >= 400) {
        if (body && body[0] == "{") {
          var response = JSON.parse(body);

          if ('success' in response) {
            if (!response['success']) {
              if ('code' in response) {
                if (response['code'] == 'UNAUTH') {
                  var message = this.safeString(response, 'msg');

                  if (message == 'Invalid nonce') {
                    throw new InvalidNonce(this.id + ' ' + message);
                  }

                  throw new AuthenticationError(this.id + ' ' + this.json(response));
                }
              }

              throw new ExchangeError(this.id + ' ' + this.json(response));
            }
          }
        } else {
          throw new ExchangeError(this.id + ' ' + code.toString() + ' ' + reason);
        }
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                api = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 'public';
                method = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 'GET';
                params = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
                headers = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : undefined;
                body = _args13.length > 5 && _args13[5] !== undefined ? _args13[5] : undefined;
                _context13.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context13.sent;
                return _context13.abrupt("return", response);

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return kucoin;
}(Exchange);