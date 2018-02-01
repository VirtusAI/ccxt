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
    OrderNotFound = _require.OrderNotFound,
    NotSupported = _require.NotSupported; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(btcmarkets, _Exchange);

  function btcmarkets() {
    _classCallCheck(this, btcmarkets);

    return _possibleConstructorReturn(this, (btcmarkets.__proto__ || _Object$getPrototypeOf(btcmarkets)).apply(this, arguments));
  }

  _createClass(btcmarkets, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(btcmarkets.prototype.__proto__ || _Object$getPrototypeOf(btcmarkets.prototype), "describe", this).call(this), {
        'id': 'btcmarkets',
        'name': 'BTC Markets',
        'countries': 'AU',
        // Australia
        'rateLimit': 1000,
        // market data cached for 1 second (trades cached for 2 seconds)
        'has': {
          'CORS': false,
          'fetchOrder': true,
          'fetchOrders': true,
          'fetchClosedOrders': 'emulated',
          'fetchOpenOrders': true,
          'fetchMyTrades': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/29142911-0e1acfc2-7d5c-11e7-98c4-07d9532b29d7.jpg',
          'api': 'https://api.btcmarkets.net',
          'www': 'https://btcmarkets.net/',
          'doc': 'https://github.com/BTCMarkets/API'
        },
        'api': {
          'public': {
            'get': ['market/{id}/tick', 'market/{id}/orderbook', 'market/{id}/trades']
          },
          'private': {
            'get': ['account/balance', 'account/{id}/tradingfee'],
            'post': ['fundtransfer/withdrawCrypto', 'fundtransfer/withdrawEFT', 'order/create', 'order/cancel', 'order/history', 'order/open', 'order/trade/history', 'order/createBatch', // they promise it's coming soon...
            'order/detail']
          }
        },
        'markets': {
          'BTC/AUD': {
            'id': 'BTC/AUD',
            'symbol': 'BTC/AUD',
            'base': 'BTC',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'LTC/AUD': {
            'id': 'LTC/AUD',
            'symbol': 'LTC/AUD',
            'base': 'LTC',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'ETH/AUD': {
            'id': 'ETH/AUD',
            'symbol': 'ETH/AUD',
            'base': 'ETH',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'ETC/AUD': {
            'id': 'ETC/AUD',
            'symbol': 'ETC/AUD',
            'base': 'ETC',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'XRP/AUD': {
            'id': 'XRP/AUD',
            'symbol': 'XRP/AUD',
            'base': 'XRP',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'BCH/AUD': {
            'id': 'BCH/AUD',
            'symbol': 'BCH/AUD',
            'base': 'BCH',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'LTC/BTC': {
            'id': 'LTC/BTC',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'ETH/BTC': {
            'id': 'ETH/BTC',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'ETC/BTC': {
            'id': 'ETC/BTC',
            'symbol': 'ETC/BTC',
            'base': 'ETC',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'XRP/BTC': {
            'id': 'XRP/BTC',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'BCH/BTC': {
            'id': 'BCH/BTC',
            'symbol': 'BCH/BTC',
            'base': 'BCH',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          }
        }
      });
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            balances,
            result,
            b,
            balance,
            currency,
            multiplier,
            total,
            used,
            free,
            account,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.loadMarkets();

              case 3:
                _context.next = 5;
                return this.privateGetAccountBalance();

              case 5:
                balances = _context.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  multiplier = 100000000;
                  total = parseFloat(balance['balance'] / multiplier);
                  used = parseFloat(balance['pendingFunds'] / multiplier);
                  free = total - used;
                  account = {
                    'free': free,
                    'used': used,
                    'total': total
                  };
                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
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
                _context2.next = 6;
                return this.publicGetMarketIdOrderbook(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                orderbook = _context2.sent;
                timestamp = orderbook['timestamp'] * 1000;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, timestamp));

              case 9:
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
      var timestamp = ticker['timestamp'] * 1000;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': undefined,
        'low': undefined,
        'bid': parseFloat(ticker['bestBid']),
        'ask': parseFloat(ticker['bestAsk']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['lastPrice']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['volume24h']),
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
                return this.publicGetMarketIdTick(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                ticker = _context3.sent;
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 8:
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
    value: function parseTrade(trade, market) {
      var timestamp = trade['date'] * 1000;
      return {
        'info': trade,
        'id': trade['tid'].toString(),
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': undefined,
        'price': trade['price'],
        'amount': trade['amount']
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
                _context4.next = 8;
                return this.publicGetMarketIdTrades(this.extend({
                  // 'since': 59868345231,
                  'id': market['id']
                }, params));

              case 8:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            market,
            multiplier,
            orderSide,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                _context5.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                multiplier = 100000000; // for price and volume
                // does BTC Markets support market orders at all?

                orderSide = side == 'buy' ? 'Bid' : 'Ask';
                order = this.ordered({
                  'currency': market['quote']
                });
                order['currency'] = market['quote'];
                order['instrument'] = market['base'];
                order['price'] = parseInt(price * multiplier);
                order['volume'] = parseInt(amount * multiplier);
                order['orderSide'] = orderSide;
                order['ordertype'] = this.capitalize(type);
                order['clientRequestId'] = this.nonce().toString();
                _context5.next = 17;
                return this.privatePostOrderCreate(order);

              case 17:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['id'].toString()
                });

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function createOrder(_x4, _x5, _x6, _x7) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrders",
    value: function () {
      var _cancelOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(ids) {
        var i;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.loadMarkets();

              case 2:
                for (i = 0; i < ids.length; i++) {
                  ids[i] = parseInt(ids[i]);
                }

                _context6.next = 5;
                return this.privatePostOrderCancel({
                  'orderIds': ids
                });

              case 5:
                return _context6.abrupt("return", _context6.sent);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function cancelOrders(_x8) {
        return _cancelOrders.apply(this, arguments);
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
                return this.cancelOrders([id]);

              case 6:
                return _context7.abrupt("return", _context7.sent);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseMyTrade",
    value: function parseMyTrade(trade, market) {
      var multiplier = 100000000;
      var timestamp = trade['creationTime'];
      var side = trade['side'] == 'Bid' ? 'buy' : 'sell'; // BTCMarkets always charge in AUD for AUD-related transactions.

      var currency = market['quote'] == 'AUD' ? market['quote'] : market['base'];
      return {
        'info': trade,
        'id': trade['id'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': side,
        'price': trade['price'] / multiplier,
        'fee': {
          'currency': currency,
          'cost': trade['fee'] / multiplier
        },
        'amount': trade['volume'] / multiplier,
        'order': this.safeString(trade, 'orderId')
      };
    }
  }, {
    key: "parseMyTrades",
    value: function parseMyTrades(trades) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var since = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var result = [];

      for (var i = 0; i < trades.length; i++) {
        var trade = this.parseMyTrade(trades[i], market);
        result.push(trade);
      }

      return result;
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var multiplier = 100000000;
      var side = order['orderSide'] == 'Bid' ? 'buy' : 'sell';
      var type = order['ordertype'] == 'Limit' ? 'limit' : 'market';
      var timestamp = order['creationTime'];

      if (!market) {
        market = this.market(order['instrument'] + "/" + order['currency']);
      }

      var status = 'open';

      if (order['status'] == 'Failed' || order['status'] == 'Cancelled' || order['status'] == 'Partially Cancelled' || order['status'] == 'Error') {
        status = 'canceled';
      } else if (order['status'] == "Fully Matched" || order['status'] == "Partially Matched") {
        status = 'closed';
      }

      var price = this.safeFloat(order, 'price') / multiplier;
      var amount = this.safeFloat(order, 'volume') / multiplier;
      var remaining = this.safeFloat(order, 'openVolume', 0.0) / multiplier;
      var filled = amount - remaining;
      var cost = price * amount;
      var trades = this.parseMyTrades(order['trades'], market);
      var result = {
        'info': order,
        'id': order['id'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': type,
        'side': side,
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'trades': trades,
        'fee': undefined
      };
      return result;
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(id) {
        var symbol,
            params,
            ids,
            response,
            numOrders,
            order,
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
                ids = [parseInt(id)];
                _context8.next = 7;
                return this.privatePostOrderDetail(this.extend({
                  'orderIds': ids
                }, params));

              case 7:
                response = _context8.sent;
                numOrders = response['orders'].length;

                if (!(numOrders < 1)) {
                  _context8.next = 11;
                  break;
                }

                throw new OrderNotFound(this.id + ' No matching order found: ' + id);

              case 11:
                order = response['orders'][0];
                return _context8.abrupt("return", this.parseOrder(order));

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "prepareHistoryRequest",
    value: function () {
      var _prepareHistoryRequest = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(market) {
        var since,
            limit,
            request,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                since = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : undefined;
                request = this.ordered({
                  'currency': market['quote'],
                  'instrument': market['base']
                });
                if (typeof limit !== 'undefined') request['limit'] = limit;else request['limit'] = 100;
                if (typeof since !== 'undefined') request['since'] = since;else request['since'] = 0;
                return _context9.abrupt("return", request);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function prepareHistoryRequest(_x11) {
        return _prepareHistoryRequest.apply(this, arguments);
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
            request,
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

                if (symbol) {
                  _context10.next = 6;
                  break;
                }

                throw new NotSupported(this.id + ': fetchOrders requires a `symbol` parameter.');

              case 6:
                _context10.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = this.prepareHistoryRequest(market, since, limit);
                _context10.next = 12;
                return this.privatePostOrderHistory(this.extend(request, params));

              case 12:
                response = _context10.sent;
                return _context10.abrupt("return", this.parseOrders(response['orders'], market));

              case 14:
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
            market,
            request,
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

                if (symbol) {
                  _context11.next = 6;
                  break;
                }

                throw new NotSupported(this.id + ': fetchOpenOrders requires a `symbol` parameter.');

              case 6:
                _context11.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = this.prepareHistoryRequest(market, since, limit);
                _context11.next = 12;
                return this.privatePostOrderOpen(this.extend(request, params));

              case 12:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrders(response['orders'], market));

              case 14:
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
                _context12.next = 6;
                return this.fetchOrders(symbol, since, limit, params);

              case 6:
                orders = _context12.sent;
                return _context12.abrupt("return", this.filterBy(orders, 'status', 'closed'));

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
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                symbol = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : undefined;
                since = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : undefined;
                limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : undefined;
                params = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};

                if (symbol) {
                  _context13.next = 6;
                  break;
                }

                throw new NotSupported(this.id + ': fetchMyTrades requires a `symbol` parameter.');

              case 6:
                _context13.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = this.prepareHistoryRequest(market, since, limit);
                _context13.next = 12;
                return this.privatePostOrderTradeHistory(this.extend(request, params));

              case 12:
                response = _context13.sent;
                return _context13.abrupt("return", this.parseMyTrades(response['trades'], market));

              case 14:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "nonce",
    value: function nonce() {
      return this.milliseconds();
    }
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var uri = '/' + this.implodeParams(path, params);
      var url = this.urls['api'] + uri;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = uri + "\n" + nonce + "\n";
        headers = {
          'Content-Type': 'application/json',
          'apikey': this.apiKey,
          'timestamp': nonce
        };

        if (method == 'POST') {
          body = this.json(params);
          auth += body;
        }

        var secret = this.base64ToBinary(this.secret);
        var signature = this.hmac(this.encode(auth), secret, 'sha512', 'base64');
        headers['signature'] = this.decode(signature);
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

                if (!(api == 'private')) {
                  _context14.next = 13;
                  break;
                }

                if (!('success' in response)) {
                  _context14.next = 12;
                  break;
                }

                if (response['success']) {
                  _context14.next = 12;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
                return _context14.abrupt("return", response);

              case 13:
                return _context14.abrupt("return", response);

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function request(_x12) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return btcmarkets;
}(Exchange);