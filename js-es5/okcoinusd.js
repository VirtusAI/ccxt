"use strict"; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
  _inherits(okcoinusd, _Exchange);

  function okcoinusd() {
    _classCallCheck(this, okcoinusd);

    return _possibleConstructorReturn(this, (okcoinusd.__proto__ || _Object$getPrototypeOf(okcoinusd)).apply(this, arguments));
  }

  _createClass(okcoinusd, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(okcoinusd.prototype.__proto__ || _Object$getPrototypeOf(okcoinusd.prototype), "describe", this).call(this), {
        'id': 'okcoinusd',
        'name': 'OKCoin USD',
        'countries': ['CN', 'US'],
        'hasCORS': false,
        'version': 'v1',
        'rateLimit': 1000,
        // up to 3000 requests per 5 minutes ≈ 600 requests per minute ≈ 10 requests per second ≈ 100 ms
        // obsolete metainfo interface
        'hasFetchOHLCV': true,
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
          'fetchOHLCV': true,
          'fetchOrder': true,
          'fetchOrders': true,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true,
          'withdraw': true
        },
        'extension': '.do',
        // appended to endpoint URL
        'hasFutureMarkets': false,
        'timeframes': {
          '1m': '1min',
          '3m': '3min',
          '5m': '5min',
          '15m': '15min',
          '30m': '30min',
          '1h': '1hour',
          '2h': '2hour',
          '4h': '4hour',
          '6h': '6hour',
          '12h': '12hour',
          '1d': '1day',
          '3d': '3day',
          '1w': '1week'
        },
        'api': {
          'web': {
            'get': ['markets/currencies', 'markets/products']
          },
          'public': {
            'get': ['depth', 'exchange_rate', 'future_depth', 'future_estimated_price', 'future_hold_amount', 'future_index', 'future_kline', 'future_price_limit', 'future_ticker', 'future_trades', 'kline', 'otcs', 'ticker', 'trades']
          },
          'private': {
            'post': ['account_records', 'batch_trade', 'borrow_money', 'borrow_order_info', 'borrows_info', 'cancel_borrow', 'cancel_order', 'cancel_otc_order', 'cancel_withdraw', 'future_batch_trade', 'future_cancel', 'future_devolve', 'future_explosive', 'future_order_info', 'future_orders_info', 'future_position', 'future_position_4fix', 'future_trade', 'future_trades_history', 'future_userinfo', 'future_userinfo_4fix', 'lend_depth', 'order_fee', 'order_history', 'order_info', 'orders_info', 'otc_order_history', 'otc_order_info', 'repayment', 'submit_otc_order', 'trade', 'trade_history', 'trade_otc_order', 'withdraw', 'withdraw_info', 'unrepayments_info', 'userinfo']
          }
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766791-89ffb502-5ee5-11e7-8a5b-c5950b68ac65.jpg',
          'api': {
            'web': 'https://www.okcoin.com/v2',
            'public': 'https://www.okcoin.com/api',
            'private': 'https://www.okcoin.com/api'
          },
          'www': 'https://www.okcoin.com',
          'doc': ['https://www.okcoin.com/rest_getStarted.html', 'https://www.npmjs.com/package/okcoin.com']
        }
      });
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, markets, result, i, id, uppercase, _uppercase$split, _uppercase$split2, base, quote, symbol, precision, lot, market;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.webGetMarketsProducts();

              case 2:
                response = _context.sent;
                markets = response['data'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  id = markets[i]['symbol'];
                  uppercase = id.toUpperCase();
                  _uppercase$split = uppercase.split('_'), _uppercase$split2 = _slicedToArray(_uppercase$split, 2), base = _uppercase$split2[0], quote = _uppercase$split2[1];
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': markets[i]['maxSizeDigit'],
                    'price': markets[i]['maxPriceDigit']
                  };
                  lot = Math.pow(10, -precision['amount']);
                  market = this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': markets[i],
                    'type': 'spot',
                    'spot': true,
                    'future': false,
                    'lot': lot,
                    'active': true,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': markets[i]['minTradeSize'],
                        'max': undefined
                      },
                      'price': {
                        'min': undefined,
                        'max': undefined
                      },
                      'cost': {
                        'min': undefined,
                        'max': undefined
                      }
                    }
                  });
                  result.push(market);

                  if (this.hasFutureMarkets && market['quote'] == 'USDT') {
                    result.push(this.extend(market, {
                      'quote': 'USD',
                      'symbol': market['base'] + '/USD',
                      'id': market['id'].replace('usdt', 'usd'),
                      'type': 'future',
                      'spot': false,
                      'future': true
                    }));
                  }
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
            method,
            request,
            orderbook,
            timestamp,
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
                method = 'publicGet';
                request = {
                  'symbol': market['id']
                };

                if (market['future']) {
                  method += 'Future';
                  request['contract_type'] = 'this_week'; // next_week, quarter
                }

                method += 'Depth';
                _context2.next = 10;
                return this[method](this.extend(request, params));

              case 10:
                orderbook = _context2.sent;
                timestamp = this.milliseconds();
                return _context2.abrupt("return", {
                  'bids': orderbook['bids'],
                  'asks': this.sortBy(orderbook['asks'], 0),
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp)
                });

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
      var timestamp = ticker['timestamp'];
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high']),
        'low': parseFloat(ticker['low']),
        'bid': parseFloat(ticker['buy']),
        'ask': parseFloat(ticker['sell']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['vol']),
        'quoteVolume': undefined,
        'info': ticker
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
            method,
            request,
            response,
            timestamp,
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
                method = 'publicGet';
                request = {
                  'symbol': market['id']
                };

                if (market['future']) {
                  method += 'Future';
                  request['contract_type'] = 'this_week'; // next_week, quarter
                }

                method += 'Ticker';
                _context3.next = 10;
                return this[method](this.extend(request, params));

              case 10:
                response = _context3.sent;
                timestamp = parseInt(response['date']) * 1000;
                ticker = this.extend(response['ticker'], {
                  'timestamp': timestamp
                });
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'info': trade,
        'timestamp': trade['date_ms'],
        'datetime': this.iso8601(trade['date_ms']),
        'symbol': symbol,
        'id': trade['tid'].toString(),
        'order': undefined,
        'type': undefined,
        'side': trade['type'],
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
            method,
            request,
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
                method = 'publicGet';
                request = {
                  'symbol': market['id']
                };

                if (market['future']) {
                  method += 'Future';
                  request['contract_type'] = 'this_week'; // next_week, quarter
                }

                method += 'Trades';
                _context4.next = 12;
                return this[method](this.extend(request, params));

              case 12:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response, market, since, limit));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            method,
            request,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                timeframe = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '1m';
                since = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                limit = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : 1440;
                params = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                _context5.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                method = 'publicGet';
                request = {
                  'symbol': market['id'],
                  'type': this.timeframes[timeframe]
                };

                if (market['future']) {
                  method += 'Future';
                  request['contract_type'] = 'this_week'; // next_week, quarter
                }

                method += 'Kline';
                if (limit) request['size'] = parseInt(limit);

                if (since) {
                  request['since'] = since;
                } else {
                  request['since'] = this.milliseconds() - 86400000; // last 24 hours
                }

                _context5.next = 15;
                return this[method](this.extend(request, params));

              case 15:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6() {
        var params,
            response,
            balances,
            result,
            currencies,
            i,
            currency,
            lowercase,
            account,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                _context6.next = 3;
                return this.loadMarkets();

              case 3:
                _context6.next = 5;
                return this.privatePostUserinfo();

              case 5:
                response = _context6.sent;
                balances = response['info']['funds'];
                result = {
                  'info': response
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = this.account();
                  account['free'] = this.safeFloat(balances['free'], lowercase, 0.0);
                  account['used'] = this.safeFloat(balances['freezed'], lowercase, 0.0);
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context6.abrupt("return", this.parseBalance(result));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
            market,
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
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                method = 'privatePost';
                order = {
                  'symbol': market['id'],
                  'type': side
                };

                if (!market['future']) {
                  _context7.next = 12;
                  break;
                }

                method += 'Future';
                order = this.extend(order, {
                  'contract_type': 'this_week',
                  // next_week, quarter
                  'match_price': 0,
                  // match best counter party price? 0 or 1, ignores price if 1
                  'lever_rate': 10,
                  // leverage rate value: 10 or 20 (10 by default)
                  'price': price,
                  'amount': amount
                });
                _context7.next = 25;
                break;

              case 12:
                if (!(type == 'limit')) {
                  _context7.next = 17;
                  break;
                }

                order['price'] = price;
                order['amount'] = amount;
                _context7.next = 25;
                break;

              case 17:
                order['type'] += '_market';

                if (!(side == 'buy')) {
                  _context7.next = 24;
                  break;
                }

                order['price'] = this.safeFloat(params, 'cost');

                if (order['price']) {
                  _context7.next = 22;
                  break;
                }

                throw new ExchangeError(this.id + ' market buy orders require an additional cost parameter, cost = price * amount');

              case 22:
                _context7.next = 25;
                break;

              case 24:
                order['amount'] = amount;

              case 25:
                params = this.omit(params, 'cost');
                method += 'Trade';
                _context7.next = 29;
                return this[method](this.extend(order, params));

              case 29:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['order_id'].toString()
                });

              case 31:
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
            market,
            request,
            method,
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

                throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');

              case 4:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'order_id': id
                };
                method = 'privatePost';

                if (market['future']) {
                  method += 'FutureCancel';
                  request['contract_type'] = 'this_week'; // next_week, quarter
                } else {
                  method += 'CancelOrder';
                }

                _context8.next = 10;
                return this[method](this.extend(request, params));

              case 10:
                response = _context8.sent;
                return _context8.abrupt("return", response);

              case 12:
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
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      if (status == -1) return 'canceled';
      if (status == 0) return 'open';
      if (status == 1) return 'partial';
      if (status == 2) return 'closed';
      if (status == 4) return 'canceled';
      return status;
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = undefined;
      var type = undefined;

      if ('type' in order) {
        if (order['type'] == 'buy' || order['type'] == 'sell') {
          side = order['type'];
          type = 'limit';
        } else {
          side = order['type'] == 'buy_market' ? 'buy' : 'sell';
          type = 'market';
        }
      }

      var status = this.parseOrderStatus(order['status']);
      var symbol = undefined;

      if (!market) {
        if ('symbol' in order) if (order['symbol'] in this.markets_by_id) market = this.markets_by_id[order['symbol']];
      }

      if (market) symbol = market['symbol'];
      var timestamp = undefined;
      var createDateField = this.getCreateDateField();
      if (createDateField in order) timestamp = order[createDateField];
      var amount = order['amount'];
      var filled = order['deal_amount'];
      var remaining = amount - filled;
      var average = order['avg_price'];
      var cost = average * filled;
      var result = {
        'info': order,
        'id': order['order_id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': order['price'],
        'average': average,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': undefined
      };
      return result;
    }
  }, {
    key: "getCreateDateField",
    value: function getCreateDateField() {
      // needed for derived exchanges
      // allcoin typo create_data instead of create_date
      return 'create_date';
    }
  }, {
    key: "getOrdersField",
    value: function getOrdersField() {
      // needed for derived exchanges
      // allcoin typo order instead of orders (expected based on their API docs)
      return 'orders';
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            market,
            method,
            request,
            response,
            ordersField,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};

                if (symbol) {
                  _context9.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + 'fetchOrders requires a symbol parameter');

              case 4:
                _context9.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                method = 'privatePost';
                request = {
                  'order_id': id,
                  'symbol': market['id'] // 'status': 0, // 0 for unfilled orders, 1 for filled orders
                  // 'current_page': 1, // current page number
                  // 'page_length': 200, // number of orders returned per page, maximum 200

                };

                if (market['future']) {
                  method += 'Future';
                  request['contract_type'] = 'this_week'; // next_week, quarter
                }

                method += 'OrderInfo';
                _context9.next = 13;
                return this[method](this.extend(request, params));

              case 13:
                response = _context9.sent;
                ordersField = this.getOrdersField();
                return _context9.abrupt("return", this.parseOrder(response[ordersField][0]));

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOrder(_x10) {
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
            market,
            method,
            request,
            order_id_in_params,
            status,
            response,
            ordersField,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};

                if (symbol) {
                  _context10.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + 'fetchOrders requires a symbol parameter');

              case 6:
                _context10.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                method = 'privatePost';
                request = {
                  'symbol': market['id']
                };
                order_id_in_params = 'order_id' in params;

                if (!market['future']) {
                  _context10.next = 19;
                  break;
                }

                method += 'FutureOrdersInfo';
                request['contract_type'] = 'this_week'; // next_week, quarter

                if (order_id_in_params) {
                  _context10.next = 17;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders() requires order_id param for futures market ' + symbol + ' (a string of one or more order ids, comma-separated)');

              case 17:
                _context10.next = 33;
                break;

              case 19:
                status = undefined;

                if (!('type' in params)) {
                  _context10.next = 24;
                  break;
                }

                status = params['type'];
                _context10.next = 29;
                break;

              case 24:
                if (!('status' in params)) {
                  _context10.next = 28;
                  break;
                }

                status = params['status'];
                _context10.next = 29;
                break;

              case 28:
                throw new ExchangeError(this.id + ' fetchOrders() requires type param or status param for spot market ' + symbol + ' (0 or "open" for unfilled orders, 1 or "closed" for filled orders)');

              case 29:
                if (status == 'open') status = 0;
                if (status == 'closed') status = 1;

                if (order_id_in_params) {
                  method += 'OrdersInfo';
                  request = this.extend(request, {
                    'type': status
                  });
                } else {
                  method += 'OrderHistory';
                  request = this.extend(request, {
                    'status': status,
                    'current_page': 1,
                    // current page number
                    'page_length': 200 // number of orders returned per page, maximum 200

                  });
                }

                params = this.omit(params, ['type', 'status']);

              case 33:
                _context10.next = 35;
                return this[method](this.extend(request, params));

              case 35:
                response = _context10.sent;
                ordersField = this.getOrdersField();
                return _context10.abrupt("return", this.parseOrders(response[ordersField], market, since, limit));

              case 38:
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
            open,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                open = 0; // 0 for unfilled orders, 1 for filled orders

                _context11.next = 7;
                return this.fetchOrders(symbol, undefined, undefined, this.extend({
                  'status': open
                }, params));

              case 7:
                return _context11.abrupt("return", _context11.sent);

              case 8:
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
            closed,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : undefined;
                since = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
                closed = 1; // 0 for unfilled orders, 1 for filled orders

                _context12.next = 7;
                return this.fetchOrders(symbol, undefined, undefined, this.extend({
                  'status': closed
                }, params));

              case 7:
                return _context12.abrupt("return", _context12.sent);

              case 8:
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
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(currency, amount, address) {
        var params,
            lowercase,
            request,
            query,
            password,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                params = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
                _context13.next = 3;
                return this.loadMarkets();

              case 3:
                lowercase = currency.toLowerCase() + '_usd'; // if (amount < 0.01)
                //     throw new ExchangeError (this.id + ' withdraw() requires amount > 0.01');

                request = {
                  'symbol': lowercase,
                  'withdraw_address': address,
                  'withdraw_amount': amount,
                  'target': 'address' // or okcn, okcom, okex

                };
                query = params;

                if (!('chargefee' in query)) {
                  _context13.next = 11;
                  break;
                }

                request['chargefee'] = query['chargefee'];
                query = this.omit(query, 'chargefee');
                _context13.next = 12;
                break;

              case 11:
                throw new ExchangeError(this.id + ' withdraw() requires a `chargefee` parameter');

              case 12:
                password = undefined;

                if (this.password) {
                  request['trade_pwd'] = this.password;
                  password = this.password;
                } else if ('password' in query) {
                  request['trade_pwd'] = query['password'];
                  query = this.omit(query, 'password');
                } else if ('trade_pwd' in query) {
                  request['trade_pwd'] = query['trade_pwd'];
                  query = this.omit(query, 'trade_pwd');
                }

                if (password) {
                  _context13.next = 16;
                  break;
                }

                throw new ExchangeError(this.id + ' withdraw() requires this.password set on the exchange instance or a password / trade_pwd parameter');

              case 16:
                _context13.next = 18;
                return this.privatePostWithdraw(this.extend(request, query));

              case 18:
                response = _context13.sent;
                return _context13.abrupt("return", {
                  'info': response,
                  'id': this.safeString(response, 'withdraw_id')
                });

              case 20:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
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
      var url = '/';
      if (api != 'web') url += this.version + '/';
      url += path + this.extension;

      if (api == 'private') {
        this.checkRequiredCredentials();
        var query = this.keysort(this.extend({
          'api_key': this.apiKey
        }, params)); // secret key must be at the end of query

        var queryString = this.rawencode(query) + '&secret_key=' + this.secret;
        query['sign'] = this.hash(this.encode(queryString)).toUpperCase();
        body = this.urlencode(query);
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      } else {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      }

      url = this.urls['api'][api] + url;
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
      _regeneratorRuntime.mark(function _callee14(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                api = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 'public';
                method = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 'GET';
                params = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
                headers = _args14.length > 4 && _args14[4] !== undefined ? _args14[4] : undefined;
                body = _args14.length > 5 && _args14[5] !== undefined ? _args14[5] : undefined;
                _context14.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context14.sent;

                if (!('result' in response)) {
                  _context14.next = 11;
                  break;
                }

                if (response['result']) {
                  _context14.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                if (!('error_code' in response)) {
                  _context14.next = 13;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 13:
                return _context14.abrupt("return", response);

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function request(_x14) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return okcoinusd;
}(Exchange);