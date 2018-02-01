'use strict'; // ----------------------------------------------------------------------------

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
    InsufficientFunds = _require.InsufficientFunds,
    ExchangeError = _require.ExchangeError,
    InvalidOrder = _require.InvalidOrder,
    AuthenticationError = _require.AuthenticationError,
    NotSupported = _require.NotSupported; // ----------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(gdax, _Exchange);

  function gdax() {
    _classCallCheck(this, gdax);

    return _possibleConstructorReturn(this, (gdax.__proto__ || _Object$getPrototypeOf(gdax)).apply(this, arguments));
  }

  _createClass(gdax, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(gdax.prototype.__proto__ || _Object$getPrototypeOf(gdax.prototype), "describe", this).call(this), {
        'id': 'gdax',
        'name': 'GDAX',
        'countries': 'US',
        'rateLimit': 1000,
        'userAgent': this.userAgents['chrome'],
        'has': {
          'CORS': true,
          'fetchOHLCV': true,
          'deposit': true,
          'withdraw': true,
          'fetchOrder': true,
          'fetchOrders': true,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true,
          'fetchMyTrades': true
        },
        'timeframes': {
          '1m': 60,
          '5m': 300,
          '15m': 900,
          '30m': 1800,
          '1h': 3600,
          '2h': 7200,
          '4h': 14400,
          '12h': 43200,
          '1d': 86400,
          '1w': 604800,
          '1M': 2592000,
          '1y': 31536000
        },
        'urls': {
          'test': 'https://api-public.sandbox.gdax.com',
          'logo': 'https://user-images.githubusercontent.com/1294454/27766527-b1be41c6-5edb-11e7-95f6-5b496c469e2c.jpg',
          'api': 'https://api.gdax.com',
          'www': 'https://www.gdax.com',
          'doc': 'https://docs.gdax.com',
          'fees': ['https://www.gdax.com/fees', 'https://support.gdax.com/customer/en/portal/topics/939402-depositing-and-withdrawing-funds/articles']
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'password': true
        },
        'api': {
          'public': {
            'get': ['currencies', 'products', 'products/{id}/book', 'products/{id}/candles', 'products/{id}/stats', 'products/{id}/ticker', 'products/{id}/trades', 'time']
          },
          'private': {
            'get': ['accounts', 'accounts/{id}', 'accounts/{id}/holds', 'accounts/{id}/ledger', 'accounts/{id}/transfers', 'coinbase-accounts', 'fills', 'funding', 'orders', 'orders/{id}', 'payment-methods', 'position', 'reports/{id}', 'users/self/trailing-volume'],
            'post': ['deposits/coinbase-account', 'deposits/payment-method', 'funding/repay', 'orders', 'position/close', 'profiles/margin-transfer', 'reports', 'withdrawals/coinbase', 'withdrawals/crypto', 'withdrawals/payment-method'],
            'delete': ['orders', 'orders/{id}']
          }
        },
        'fees': {
          'trading': {
            'tierBased': true,
            // complicated tier system per coin
            'percentage': true,
            'maker': 0.0,
            'taker': 0.25 / 100 // Fee is 0.25%, 0.3% for ETH/LTC pairs

          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BCH': 0,
              'BTC': 0,
              'LTC': 0,
              'ETH': 0,
              'EUR': 0.15,
              'USD': 25
            },
            'deposit': {
              'BCH': 0,
              'BTC': 0,
              'LTC': 0,
              'ETH': 0,
              'EUR': 0.15,
              'USD': 10
            }
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
        var markets, result, p, market, id, base, quote, symbol, priceLimits, precision, taker, active;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetProducts();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['id'];
                  base = market['base_currency'];
                  quote = market['quote_currency'];
                  symbol = base + '/' + quote;
                  priceLimits = {
                    'min': this.safeFloat(market, 'quote_increment'),
                    'max': undefined
                  };
                  precision = {
                    'amount': 8,
                    'price': this.precisionFromString(this.safeString(market, 'quote_increment'))
                  };
                  taker = this.fees['trading']['taker'];

                  if (base === 'ETH' || base === 'LTC') {
                    taker = 0.003;
                  }

                  active = market['status'] === 'online';
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': this.safeFloat(market, 'base_min_size'),
                        'max': this.safeFloat(market, 'base_max_size')
                      },
                      'price': priceLimits,
                      'cost': {
                        'min': this.safeFloat(market, 'min_market_funds'),
                        'max': this.safeFloat(market, 'max_market_funds')
                      }
                    },
                    'taker': taker,
                    'active': active,
                    'info': market
                  }));
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
            balances,
            result,
            b,
            balance,
            currency,
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
                return this.privateGetAccounts();

              case 5:
                balances = _context2.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  account = {
                    'free': this.safeFloat(balance, 'available'),
                    'used': this.safeFloat(balance, 'hold'),
                    'total': this.safeFloat(balance, 'balance')
                  };
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 9:
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
                return this.publicGetProductsIdBook(this.extend({
                  'id': this.marketId(symbol),
                  'level': 2 // 1 best bidask, 2 aggregated, 3 full

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
            request,
            ticker,
            timestamp,
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
                market = this.market(symbol);
                request = this.extend({
                  'id': market['id']
                }, params);
                _context4.next = 7;
                return this.publicGetProductsIdTicker(request);

              case 7:
                ticker = _context4.sent;
                timestamp = this.parse8601(ticker['time']);
                bid = undefined;
                ask = undefined;
                if ('bid' in ticker) bid = this.safeFloat(ticker, 'bid');
                if ('ask' in ticker) ask = this.safeFloat(ticker, 'ask');
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': undefined,
                  'low': undefined,
                  'bid': bid,
                  'ask': ask,
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': this.safeFloat(ticker, 'price'),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': this.safeFloat(ticker, 'volume'),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 14:
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
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = undefined;

      if ('time' in trade) {
        timestamp = this.parse8601(trade['time']);
      } else if ('created_at' in trade) {
        timestamp = this.parse8601(trade['created_at']);
      }

      var iso8601 = undefined;
      if (typeof timestamp !== 'undefined') iso8601 = this.iso8601(timestamp);
      var side = trade['side'] === 'buy' ? 'sell' : 'buy';
      var symbol = undefined;

      if (!market) {
        if ('product_id' in trade) {
          var marketId = trade['product_id'];
          if (marketId in this.markets_by_id) market = this.markets_by_id[marketId];
        }
      }

      if (market) symbol = market['symbol'];
      var feeRate = undefined;
      var feeCurrency = undefined;

      if (market) {
        feeCurrency = market['quote'];

        if ('liquidity' in trade) {
          var rateType = trade['liquidity'] === 'T' ? 'taker' : 'maker';
          feeRate = market[rateType];
        }
      }

      var feeCost = this.safeFloat(trade, 'fill_fees');
      if (typeof feeCost === 'undefined') feeCost = this.safeFloat(trade, 'fee');
      var fee = {
        'cost': feeCost,
        'currency': feeCurrency,
        'rate': feeRate
      };
      var type = undefined;
      var id = this.safeString(trade, 'trade_id');
      var orderId = this.safeString(trade, 'order_id');
      return {
        'id': id,
        'order': orderId,
        'info': trade,
        'timestamp': timestamp,
        'datetime': iso8601,
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': this.safeFloat(trade, 'price'),
        'amount': this.safeFloat(trade, 'size'),
        'fee': fee
      };
    }
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbol = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : undefined;
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                _context5.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                request = {};

                if (typeof symbol !== 'undefined') {
                  market = this.market(symbol);
                  request['product_id'] = market['id'];
                }

                if (typeof limit !== 'undefined') request['limit'] = limit;
                _context5.next = 12;
                return this.privateGetFills(this.extend(request, params));

              case 12:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
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
                return this.publicGetProductsIdTrades(this.extend({
                  'id': market['id'] // fixes issue #2

                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response, market, since, limit));

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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv[0] * 1000, ohlcv[3], ohlcv[2], ohlcv[1], ohlcv[4], ohlcv[5]];
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
            granularity,
            request,
            response,
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
                granularity = this.timeframes[timeframe];
                request = {
                  'id': market['id'],
                  'granularity': granularity
                };

                if (typeof since !== 'undefined') {
                  request['start'] = this.YmdHMS(since);

                  if (typeof limit === 'undefined') {
                    // https://docs.gdax.com/#get-historic-rates
                    limit = 350; // max = 350
                  }

                  request['end'] = this.YmdHMS(this.sum(limit * granularity * 1000, since));
                }

                _context7.next = 12;
                return this.publicGetProductsIdCandles(this.extend(request, params));

              case 12:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

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
    key: "fetchTime",
    value: function () {
      var _fetchTime = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var response;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.publicGetTime();

              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", this.parse8601(response['iso']));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchTime() {
        return _fetchTime.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      var statuses = {
        'pending': 'open',
        'active': 'open',
        'open': 'open',
        'done': 'closed',
        'canceled': 'canceled'
      };
      return this.safeString(statuses, status, status);
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.parse8601(order['created_at']);
      var symbol = undefined;

      if (!market) {
        if (order['product_id'] in this.markets_by_id) market = this.markets_by_id[order['product_id']];
      }

      var status = this.parseOrderStatus(order['status']);
      var price = this.safeFloat(order, 'price');
      var amount = this.safeFloat(order, 'size');
      if (typeof amount === 'undefined') amount = this.safeFloat(order, 'funds');
      if (typeof amount === 'undefined') amount = this.safeFloat(order, 'specified_funds');
      var filled = this.safeFloat(order, 'filled_size');
      var remaining = undefined;
      if (typeof amount !== 'undefined') if (typeof filled !== 'undefined') remaining = amount - filled;
      var cost = this.safeFloat(order, 'executed_value');
      var fee = {
        'cost': this.safeFloat(order, 'fill_fees'),
        'currency': undefined,
        'rate': undefined
      };
      if (market) symbol = market['symbol'];
      return {
        'id': order['id'],
        'info': order,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'status': status,
        'symbol': symbol,
        'type': order['type'],
        'side': order['side'],
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'fee': fee
      };
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            response,
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
                return this.privateGetOrdersId(this.extend({
                  'id': id
                }, params));

              case 6:
                response = _context9.sent;
                return _context9.abrupt("return", this.parseOrder(response));

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOrder(_x5) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.next = 6;
                return this.loadMarkets();

              case 6:
                request = {
                  'status': 'all'
                };
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['product_id'] = market['id'];
                }

                _context10.next = 11;
                return this.privateGetOrders(this.extend(request, params));

              case 11:
                response = _context10.sent;
                return _context10.abrupt("return", this.parseOrders(response, market, since, limit));

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchOrders() {
        return _fetchOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                _context11.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['product_id'] = market['id'];
                }

                _context11.next = 11;
                return this.privateGetOrders(this.extend(request, params));

              case 11:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrders(response, market, since, limit));

              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : undefined;
                since = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
                _context12.next = 6;
                return this.loadMarkets();

              case 6:
                request = {
                  'status': 'done'
                };
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['product_id'] = market['id'];
                }

                _context12.next = 11;
                return this.privateGetOrders(this.extend(request, params));

              case 11:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseOrders(response, market, since, limit));

              case 13:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
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
      _regeneratorRuntime.mark(function _callee13(market, type, side, amount) {
        var price,
            params,
            order,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                price = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : undefined;
                params = _args13.length > 5 && _args13[5] !== undefined ? _args13[5] : {};
                _context13.next = 4;
                return this.loadMarkets();

              case 4:
                // let oid = this.nonce ().toString ();
                order = {
                  'product_id': this.marketId(market),
                  'side': side,
                  'size': amount,
                  'type': type
                };
                if (type === 'limit') order['price'] = price;
                _context13.next = 8;
                return this.privatePostOrders(this.extend(order, params));

              case 8:
                response = _context13.sent;
                return _context13.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function createOrder(_x6, _x7, _x8, _x9) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(id) {
        var symbol,
            params,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                symbol = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : undefined;
                params = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : {};
                _context14.next = 4;
                return this.loadMarkets();

              case 4:
                _context14.next = 6;
                return this.privateDeleteOrdersId({
                  'id': id
                });

              case 6:
                return _context14.abrupt("return", _context14.sent);

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function cancelOrder(_x10) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "getPaymentMethods",
    value: function () {
      var _getPaymentMethods = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15() {
        var response;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this.privateGetPaymentMethods();

              case 2:
                response = _context15.sent;
                return _context15.abrupt("return", response);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function getPaymentMethods() {
        return _getPaymentMethods.apply(this, arguments);
      };
    }()
  }, {
    key: "deposit",
    value: function () {
      var _deposit = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(currency, amount, address) {
        var params,
            request,
            method,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                params = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
                _context16.next = 3;
                return this.loadMarkets();

              case 3:
                request = {
                  'currency': currency,
                  'amount': amount
                };
                method = 'privatePostDeposits';

                if (!('payment_method_id' in params)) {
                  _context16.next = 9;
                  break;
                }

                // deposit from a payment_method, like a bank account
                method += 'PaymentMethod';
                _context16.next = 14;
                break;

              case 9:
                if (!('coinbase_account_id' in params)) {
                  _context16.next = 13;
                  break;
                }

                // deposit into GDAX account from a Coinbase account
                method += 'CoinbaseAccount';
                _context16.next = 14;
                break;

              case 13:
                throw new NotSupported(this.id + ' deposit() requires one of `coinbase_account_id` or `payment_method_id` extra params');

              case 14:
                _context16.next = 16;
                return this[method](this.extend(request, params));

              case 16:
                response = _context16.sent;

                if (response) {
                  _context16.next = 19;
                  break;
                }

                throw new ExchangeError(this.id + ' deposit() error: ' + this.json(response));

              case 19:
                return _context16.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 20:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function deposit(_x11, _x12, _x13) {
        return _deposit.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee17(currency, amount, address) {
        var tag,
            params,
            request,
            method,
            response,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                tag = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : undefined;
                params = _args17.length > 4 && _args17[4] !== undefined ? _args17[4] : {};
                _context17.next = 4;
                return this.loadMarkets();

              case 4:
                request = {
                  'currency': currency,
                  'amount': amount
                };
                method = 'privatePostWithdrawals';

                if ('payment_method_id' in params) {
                  method += 'PaymentMethod';
                } else if ('coinbase_account_id' in params) {
                  method += 'CoinbaseAccount';
                } else {
                  method += 'Crypto';
                  request['crypto_address'] = address;
                }

                _context17.next = 9;
                return this[method](this.extend(request, params));

              case 9:
                response = _context17.sent;

                if (response) {
                  _context17.next = 12;
                  break;
                }

                throw new ExchangeError(this.id + ' withdraw() error: ' + this.json(response));

              case 12:
                return _context17.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 13:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function withdraw(_x14, _x15, _x16) {
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
      var request = '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (method === 'GET') {
        if (_Object$keys(query).length) request += '?' + this.urlencode(query);
      }

      var url = this.urls['api'] + request;

      if (api === 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var payload = '';

        if (method !== 'GET') {
          if (_Object$keys(query).length) {
            body = this.json(query);
            payload = body;
          }
        } // let payload = (body) ? body : '';


        var what = nonce + method + request + payload;
        var secret = this.base64ToBinary(this.secret);
        var signature = this.hmac(this.encode(what), secret, 'sha256', 'base64');
        headers = {
          'CB-ACCESS-KEY': this.apiKey,
          'CB-ACCESS-SIGN': this.decode(signature),
          'CB-ACCESS-TIMESTAMP': nonce,
          'CB-ACCESS-PASSPHRASE': this.password,
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
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code === 400) {
        if (body[0] === '{') {
          var response = JSON.parse(body);
          var message = response['message'];
          var error = this.id + ' ' + message;

          if (message.indexOf('price too small') >= 0) {
            throw new InvalidOrder(error);
          } else if (message.indexOf('price too precise') >= 0) {
            throw new InvalidOrder(error);
          } else if (message === 'Insufficient funds') {
            throw new InsufficientFunds(error);
          } else if (message === 'Invalid API Key') {
            throw new AuthenticationError(error);
          }

          throw new ExchangeError(this.id + ' ' + message);
        }

        throw new ExchangeError(this.id + ' ' + body);
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee18(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args18 = arguments;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                api = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : 'public';
                method = _args18.length > 2 && _args18[2] !== undefined ? _args18[2] : 'GET';
                params = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : {};
                headers = _args18.length > 4 && _args18[4] !== undefined ? _args18[4] : undefined;
                body = _args18.length > 5 && _args18[5] !== undefined ? _args18[5] : undefined;
                _context18.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context18.sent;

                if (!('message' in response)) {
                  _context18.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context18.abrupt("return", response);

              case 11:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function request(_x17) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return gdax;
}(Exchange);