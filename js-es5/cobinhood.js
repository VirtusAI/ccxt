'use strict'; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
  _inherits(cobinhood, _Exchange);

  function cobinhood() {
    _classCallCheck(this, cobinhood);

    return _possibleConstructorReturn(this, (cobinhood.__proto__ || _Object$getPrototypeOf(cobinhood)).apply(this, arguments));
  }

  _createClass(cobinhood, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(cobinhood.prototype.__proto__ || _Object$getPrototypeOf(cobinhood.prototype), "describe", this).call(this), {
        'id': 'cobinhood',
        'name': 'COBINHOOD',
        'countries': 'TW',
        'rateLimit': 1000 / 10,
        'has': {
          'fetchTickers': true,
          'fetchOHLCV': true,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true
        },
        'timeframes': {
          // the first two don't seem to work at all
          // '1m': '1m',
          // '5m': '5m',
          '15m': '15m',
          '30m': '30m',
          '1h': '1h',
          '3h': '3h',
          '6h': '6h',
          '12h': '12h',
          '1d': '1D',
          '7d': '7D',
          '14d': '14D',
          '1M': '1M'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/35755576-dee02e5c-0878-11e8-989f-1595d80ba47f.jpg',
          'api': {
            'web': 'https://api.cobinhood.com/v1',
            'ws': 'wss://feed.cobinhood.com'
          },
          'test': {
            'web': 'https://sandbox-api.cobinhood.com',
            'ws': 'wss://sandbox-feed.cobinhood.com'
          },
          'www': 'https://cobinhood.com',
          'doc': 'https://cobinhood.github.io/api-public'
        },
        'api': {
          'system': {
            'get': ['info', 'time', 'messages', 'messages/{message_id}']
          },
          'admin': {
            'get': ['system/messages', 'system/messages/{message_id}'],
            'post': ['system/messages'],
            'patch': ['system/messages/{message_id}'],
            'delete': ['system/messages/{message_id}']
          },
          'public': {
            'get': ['market/currencies', 'market/trading_pairs', 'market/orderbooks/{trading_pair_id}', 'market/stats', 'market/tickers/{trading_pair_id}', 'market/trades/{trading_pair_id}', 'chart/candles/{trading_pair_id}']
          },
          'private': {
            'get': ['trading/orders/{order_id}', 'trading/orders/{order_id}/trades', 'trading/orders', 'trading/order_history', 'trading/trades/{trade_id}', 'wallet/balances', 'wallet/ledger', 'wallet/deposit_addresses', 'wallet/withdrawal_addresses', 'wallet/withdrawals/{withdrawal_id}', 'wallet/withdrawals', 'wallet/deposits/{deposit_id}', 'wallet/deposits'],
            'post': ['trading/orders', 'wallet/deposit_addresses', 'wallet/withdrawal_addresses', 'wallet/withdrawals'],
            'delete': ['trading/orders/{order_id}']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.0,
            'taker': 0.0
          }
        },
        'precision': {
          'amount': 8,
          'price': 8
        }
      });
    }
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            currencies,
            result,
            i,
            currency,
            id,
            code,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.publicGetMarketCurrencies(params);

              case 3:
                response = _context.sent;
                currencies = response['result'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['currency'];
                  code = this.commonCurrencyCode(id);
                  result[code] = {
                    'id': id,
                    'code': code,
                    'name': currency['name'],
                    'active': true,
                    'status': 'ok',
                    'fiat': false,
                    'lot': parseFloat(currency['min_unit']),
                    'precision': 8,
                    'funding': {
                      'withdraw': {
                        'active': true,
                        'fee': parseFloat(currency['withdrawal_fee'])
                      },
                      'deposit': {
                        'active': true,
                        'fee': parseFloat(currency['deposit_fee'])
                      }
                    },
                    'info': currency
                  };
                }

                return _context.abrupt("return", result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var response, markets, result, i, market, id, _id$split, _id$split2, base, quote, symbol;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.publicGetMarketTradingPairs();

              case 2:
                response = _context2.sent;
                markets = response['result']['trading_pairs'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['id'];
                  _id$split = id.split('-'), _id$split2 = _slicedToArray(_id$split, 2), base = _id$split2[0], quote = _id$split2[1];
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': this.commonCurrencyCode(base),
                    'quote': this.commonCurrencyCode(quote),
                    'active': true,
                    'lot': parseFloat(market['quote_increment']),
                    'limits': {
                      'amount': {
                        'min': parseFloat(market['base_min_size']),
                        'max': parseFloat(market['base_max_size'])
                      }
                    },
                    'info': market
                  });
                }

                return _context2.abrupt("return", result);

              case 7:
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = market['symbol'];
      var timestamp = undefined;

      if ('timestamp' in ticker) {
        timestamp = ticker['timestamp'];
      } else {
        timestamp = this.milliseconds();
      }

      var info = ticker; // from fetchTicker

      if ('info' in ticker) info = ticker['info'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high_24hr']),
        'low': parseFloat(ticker['low_24hr']),
        'bid': parseFloat(ticker['highest_bid']),
        'ask': parseFloat(ticker['lowest_ask']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'last_price'),
        'change': this.safeFloat(ticker, 'percentChanged24hr'),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['base_volume']),
        'quoteVolume': this.safeFloat(ticker, 'quote_volume'),
        'info': info
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
            response,
            ticker,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetMarketTickersTradingPairId(this.extend({
                  'trading_pair_id': market['id']
                }, params));

              case 6:
                response = _context3.sent;
                ticker = response['result']['ticker'];
                ticker = {
                  'last_price': ticker['last_trade_price'],
                  'highest_bid': ticker['highest_bid'],
                  'lowest_ask': ticker['lowest_ask'],
                  'base_volume': ticker['24h_volume'],
                  'high_24hr': ticker['24h_high'],
                  'low_24hr': ticker['24h_low'],
                  'timestamp': ticker['timestamp'],
                  'info': response
                };
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4() {
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
                return this.publicGetMarketStats(params);

              case 6:
                response = _context4.sent;
                tickers = response['result'];
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = tickers[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 12:
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var limit,
            params,
            request,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                limit = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                _context5.next = 4;
                return this.loadMarkets();

              case 4:
                request = {
                  'trading_pair_id': this.marketId(symbol)
                };
                if (typeof limit !== 'undefined') request['limit'] = limit; // 100

                _context5.next = 8;
                return this.publicGetMarketOrderbooksTradingPairId(this.extend(request, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseOrderBook(response['result']['orderbook']));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x2) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var timestamp = trade['timestamp'];
      var price = parseFloat(trade['price']);
      var amount = parseFloat(trade['size']);
      var cost = parseFloat(this.costToPrecision(symbol, price * amount));
      var side = trade['maker_side'] === 'bid' ? 'sell' : 'buy';
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'id': trade['id'],
        'order': undefined,
        'type': undefined,
        'side': side,
        'price': price,
        'amount': amount,
        'cost': cost,
        'fee': undefined
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
            trades,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 50;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                _context6.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context6.next = 8;
                return this.publicGetMarketTradesTradingPairId(this.extend({
                  'trading_pair_id': market['id'],
                  'limit': limit // default 20, but that seems too little

                }, params));

              case 8:
                response = _context6.sent;
                trades = response['result']['trades'];
                return _context6.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 11:
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
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '5m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [// they say that timestamps are Unix Timestamps in seconds, but in fact those are milliseconds
      ohlcv['timestamp'], parseFloat(ohlcv['open']), parseFloat(ohlcv['high']), parseFloat(ohlcv['low']), parseFloat(ohlcv['close']), parseFloat(ohlcv['volume'])];
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
            query,
            response,
            ohlcv,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                timeframe = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : '15m';
                since = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                limit = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : undefined;
                params = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : {};
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                query = {
                  'trading_pair_id': market['id'],
                  'timeframe': this.timeframes[timeframe],
                  // they say in their docs that end_time defaults to current server time
                  // but if you don't specify it, their range limits does not allow you to query anything
                  'end_time': this.milliseconds()
                };

                if (since) {
                  // in their docs they say that start_time defaults to 0, but, obviously it does not
                  query['start_time'] = since;
                }

                _context7.next = 11;
                return this.publicGetChartCandlesTradingPairId(this.extend(query, params));

              case 11:
                response = _context7.sent;
                ohlcv = response['result']['candles'];
                return _context7.abrupt("return", this.parseOHLCVs(ohlcv, market, timeframe, since, limit));

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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var params,
            response,
            result,
            balances,
            i,
            balance,
            id,
            currency,
            account,
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
                return this.privateGetWalletBalances(params);

              case 5:
                response = _context8.sent;
                result = {
                  'info': response
                };
                balances = response['result']['balances'];

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];
                  id = balance['currency'];
                  currency = this.commonCurrencyCode(id);
                  account = {
                    'free': parseFloat(balance['total']),
                    'used': parseFloat(balance['on_order']),
                    'total': 0.0
                  };
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context8.abrupt("return", this.parseBalance(result));

              case 10:
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (!market) {
        var marketId = order['trading_pair'];
        market = this.markets_by_id[marketId];
      }

      if (market) symbol = market['symbol'];
      var timestamp = order['timestamp'];
      var price = parseFloat(order['price']);
      var amount = parseFloat(order['size']);
      var filled = parseFloat(order['filled']);
      var remaining = this.amountToPrecision(symbol, amount - filled); // new, queued, open, partially_filled, filled, cancelled

      var status = order['state'];

      if (status === 'filled') {
        status = 'closed';
      } else if (status === 'cancelled') {
        status = 'canceled';
      } else {
        status = 'open';
      }

      var side = order['side'] === 'bid' ? 'buy' : 'sell';
      return {
        'id': order['id'],
        'datetime': this.iso8601(timestamp),
        'timestamp': timestamp,
        'status': status,
        'symbol': symbol,
        // market, limit, stop, stop_limit, trailing_stop, fill_or_kill
        'type': order['type'],
        'side': side,
        'price': price,
        'cost': price * amount,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'trades': undefined,
        'fee': undefined,
        'info': order
      };
    }
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(symbol, type, side, amount) {
        var price,
            params,
            market,
            request,
            response,
            order,
            id,
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
                side = side === 'sell' ? 'ask' : 'bid';
                request = {
                  'trading_pair_id': market['id'],
                  // market, limit, stop, stop_limit
                  'type': type,
                  'side': side,
                  'size': this.amountToPrecision(symbol, amount)
                };
                if (type !== 'market') request['price'] = this.priceToPrecision(symbol, price);
                _context9.next = 10;
                return this.privatePostTradingOrders(this.extend(request, params));

              case 10:
                response = _context9.sent;
                order = this.parseOrder(response['result']['order'], market);
                id = order['id'];
                this.orders[id] = order;
                return _context9.abrupt("return", order);

              case 15:
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
                return this.privateDeleteTradingOrdersOrderId(this.extend({
                  'order_id': id
                }, params));

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
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11(id) {
        var symbol,
            params,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                params = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
                _context11.next = 4;
                return this.loadMarkets();

              case 4:
                _context11.next = 6;
                return this.privateGetTradingOrdersOrderId(this.extend({
                  'order_id': id.toString()
                }, params));

              case 6:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrder(response['result']['order']));

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderTrades",
    value: function () {
      var _fetchOrderTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(id) {
        var symbol,
            params,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                params = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};
                _context12.next = 4;
                return this.loadMarkets();

              case 4:
                _context12.next = 6;
                return this.privateGetTradingOrdersOrderIdTrades(this.extend({
                  'order_id': id
                }, params));

              case 6:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseTrades(response['result']));

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchOrderTrades(_x11) {
        return _fetchOrderTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "createDepositAddress",
    value: function () {
      var _createDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(code) {
        var params,
            currency,
            response,
            address,
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
                return this.privatePostWalletDepositAddresses({
                  'currency': currency['id']
                });

              case 6:
                response = _context13.sent;
                address = this.safeString(response['result']['deposit_address'], 'address');

                if (address) {
                  _context13.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' createDepositAddress failed: ' + this.last_http_response);

              case 10:
                return _context13.abrupt("return", {
                  'currency': code,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 11:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function createDepositAddress(_x12) {
        return _createDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(code) {
        var params,
            currency,
            response,
            address,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                params = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
                _context14.next = 3;
                return this.loadMarkets();

              case 3:
                currency = this.currency(code);
                _context14.next = 6;
                return this.privateGetWalletDepositAddresses(this.extend({
                  'currency': currency['id']
                }, params));

              case 6:
                response = _context14.sent;
                address = this.safeString(response['result']['deposit_addresses'], 'address');

                if (address) {
                  _context14.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchDepositAddress failed: ' + this.last_http_response);

              case 10:
                return _context14.abrupt("return", {
                  'currency': code,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 11:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function fetchDepositAddress(_x13) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(code, amount, address) {
        var params,
            currency,
            response,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                params = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
                _context15.next = 3;
                return this.loadMarkets();

              case 3:
                currency = this.currency(code);
                _context15.next = 6;
                return this.privatePostWalletWithdrawals(this.extend({
                  'currency': currency['id'],
                  'amount': amount,
                  'address': address
                }, params));

              case 6:
                response = _context15.sent;
                return _context15.abrupt("return", {
                  'id': response['result']['withdrawal_id'],
                  'info': response
                });

              case 8:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      var url = this.urls['api']['web'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));
      headers = {};

      if (api === 'private') {
        this.checkRequiredCredentials();
        headers['device_id'] = this.apiKey;
        headers['nonce'] = this.nonce();
        headers['Authorization'] = this.jwt(query, this.secret);
      }

      if (method === 'GET') {
        query = this.urlencode(query);
        if (query.length) url += '?' + query;
      } else {
        headers['Content-type'] = 'application/json; charset=UTF-8';
        body = this.json(query);
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
      if (code < 400 || code >= 600) {
        return;
      }

      if (body[0] !== '{') {
        throw new ExchangeError(this.id + ' ' + body);
      }

      var response = this.unjson(body);
      var message = this.safeValue(response['error'], 'error_code');
      throw new ExchangeError(this.id + ' ' + message);
    }
  }]);

  return cobinhood;
}(Exchange);