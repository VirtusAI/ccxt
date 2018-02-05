'use strict'; //  ---------------------------------------------------------------------------

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
    ExchangeError = _require.ExchangeError,
    InsufficientFunds = _require.InsufficientFunds,
    InvalidOrder = _require.InvalidOrder,
    OrderNotFound = _require.OrderNotFound,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitcoincoid, _Exchange);

  function bitcoincoid() {
    _classCallCheck(this, bitcoincoid);

    return _possibleConstructorReturn(this, (bitcoincoid.__proto__ || _Object$getPrototypeOf(bitcoincoid)).apply(this, arguments));
  }

  _createClass(bitcoincoid, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitcoincoid.prototype.__proto__ || _Object$getPrototypeOf(bitcoincoid.prototype), "describe", this).call(this), {
        'id': 'bitcoincoid',
        'name': 'Bitcoin.co.id',
        'countries': 'ID',
        // Indonesia
        'has': {
          'CORS': false,
          'createMarketOrder': false,
          'fetchTickers': false,
          'fetchOHLCV': false,
          'fetchOrder': true,
          'fetchOrders': false,
          'fetchClosedOrders': true,
          'fetchOpenOrders': true,
          'fetchMyTrades': false,
          'fetchCurrencies': false,
          'withdraw': false
        },
        'version': '1.7',
        // as of 6 November 2017
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766138-043c7786-5ecf-11e7-882b-809c14f38b53.jpg',
          'api': {
            'public': 'https://vip.bitcoin.co.id/api',
            'private': 'https://vip.bitcoin.co.id/tapi'
          },
          'www': 'https://www.bitcoin.co.id',
          'doc': ['https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf']
        },
        'api': {
          'public': {
            'get': ['{pair}/ticker', '{pair}/trades', '{pair}/depth']
          },
          'private': {
            'post': ['getInfo', 'transHistory', 'trade', 'tradeHistory', 'getOrder', 'openOrders', 'cancelOrder', 'orderHistory']
          }
        },
        'markets': {
          'BTC/IDR': {
            'id': 'btc_idr',
            'symbol': 'BTC/IDR',
            'base': 'BTC',
            'quote': 'IDR',
            'baseId': 'btc',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.0001,
                'max': undefined
              }
            }
          },
          'BCH/IDR': {
            'id': 'bch_idr',
            'symbol': 'BCH/IDR',
            'base': 'BCH',
            'quote': 'IDR',
            'baseId': 'bch',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.001,
                'max': undefined
              }
            }
          },
          'BTG/IDR': {
            'id': 'btg_idr',
            'symbol': 'BTG/IDR',
            'base': 'BTG',
            'quote': 'IDR',
            'baseId': 'btg',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'ETH/IDR': {
            'id': 'eth_idr',
            'symbol': 'ETH/IDR',
            'base': 'ETH',
            'quote': 'IDR',
            'baseId': 'eth',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'ETC/IDR': {
            'id': 'etc_idr',
            'symbol': 'ETC/IDR',
            'base': 'ETC',
            'quote': 'IDR',
            'baseId': 'etc',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.1,
                'max': undefined
              }
            }
          },
          'IGNIS/IDR': {
            'id': 'ignis_idr',
            'symbol': 'IGNIS/IDR',
            'base': 'IGNIS',
            'quote': 'IDR',
            'baseId': 'ignis',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 1,
                'max': undefined
              }
            }
          },
          'LTC/IDR': {
            'id': 'ltc_idr',
            'symbol': 'LTC/IDR',
            'base': 'LTC',
            'quote': 'IDR',
            'baseId': 'ltc',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'NXT/IDR': {
            'id': 'nxt_idr',
            'symbol': 'NXT/IDR',
            'base': 'NXT',
            'quote': 'IDR',
            'baseId': 'nxt',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 5,
                'max': undefined
              }
            }
          },
          'WAVES/IDR': {
            'id': 'waves_idr',
            'symbol': 'WAVES/IDR',
            'base': 'WAVES',
            'quote': 'IDR',
            'baseId': 'waves',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.1,
                'max': undefined
              }
            }
          },
          'XRP/IDR': {
            'id': 'xrp_idr',
            'symbol': 'XRP/IDR',
            'base': 'XRP',
            'quote': 'IDR',
            'baseId': 'xrp',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 10,
                'max': undefined
              }
            }
          },
          'XZC/IDR': {
            'id': 'xzc_idr',
            'symbol': 'XZC/IDR',
            'base': 'XZC',
            'quote': 'IDR',
            'baseId': 'xzc',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 0.1,
                'max': undefined
              }
            }
          },
          'XLM/IDR': {
            'id': 'str_idr',
            'symbol': 'XLM/IDR',
            'base': 'XLM',
            'quote': 'IDR',
            'baseId': 'str',
            'quoteId': 'idr',
            'limits': {
              'amount': {
                'min': 20,
                'max': undefined
              }
            }
          },
          'BTS/BTC': {
            'id': 'bts_btc',
            'symbol': 'BTS/BTC',
            'base': 'BTS',
            'quote': 'BTC',
            'baseId': 'bts',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'DASH/BTC': {
            'id': 'drk_btc',
            'symbol': 'DASH/BTC',
            'base': 'DASH',
            'quote': 'BTC',
            'baseId': 'drk',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'DOGE/BTC': {
            'id': 'doge_btc',
            'symbol': 'DOGE/BTC',
            'base': 'DOGE',
            'quote': 'BTC',
            'baseId': 'doge',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 1,
                'max': undefined
              }
            }
          },
          'ETH/BTC': {
            'id': 'eth_btc',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'baseId': 'eth',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.001,
                'max': undefined
              }
            }
          },
          'LTC/BTC': {
            'id': 'ltc_btc',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'baseId': 'ltc',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'NXT/BTC': {
            'id': 'nxt_btc',
            'symbol': 'NXT/BTC',
            'base': 'NXT',
            'quote': 'BTC',
            'baseId': 'nxt',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'XLM/BTC': {
            'id': 'str_btc',
            'symbol': 'XLM/BTC',
            'base': 'XLM',
            'quote': 'BTC',
            'baseId': 'str',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          'XEM/BTC': {
            'id': 'nem_btc',
            'symbol': 'XEM/BTC',
            'base': 'XEM',
            'quote': 'BTC',
            'baseId': 'nem',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 1,
                'max': undefined
              }
            }
          },
          'XRP/BTC': {
            'id': 'xrp_btc',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'baseId': 'xrp',
            'quoteId': 'btc',
            'limits': {
              'amount': {
                'min': 0.01,
                'max': undefined
              }
            }
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'maker': 0,
            'taker': 0.3
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
            response,
            balance,
            result,
            codes,
            i,
            code,
            currency,
            lowercase,
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
                return this.privatePostGetInfo();

              case 5:
                response = _context.sent;
                balance = response['return'];
                result = {
                  'info': balance
                };
                codes = _Object$keys(this.currencies);

                for (i = 0; i < codes.length; i++) {
                  code = codes[i];
                  currency = this.currencies[code];
                  lowercase = currency['id'];
                  account = this.account();
                  account['free'] = this.safeFloat(balance['balance'], lowercase, 0.0);
                  account['used'] = this.safeFloat(balance['balance_hold'], lowercase, 0.0);
                  account['total'] = this.sum(account['free'], account['used']);
                  result[code] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 11:
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
        var limit,
            params,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                limit = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : undefined;
                params = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return this.loadMarkets();

              case 4:
                _context2.next = 6;
                return this.publicGetPairDepth(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 6:
                orderbook = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buy', 'sell'));

              case 8:
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
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
            response,
            ticker,
            timestamp,
            baseVolume,
            quoteVolume,
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
                return this.publicGetPairTicker(this.extend({
                  'pair': market['id']
                }, params));

              case 6:
                response = _context3.sent;
                ticker = response['ticker'];
                timestamp = parseFloat(ticker['server_time']) * 1000;
                baseVolume = 'vol_' + market['baseId'].toLowerCase();
                quoteVolume = 'vol_' + market['quoteId'].toLowerCase();
                return _context3.abrupt("return", {
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
                  'baseVolume': parseFloat(ticker[baseVolume]),
                  'quoteVolume': parseFloat(ticker[quoteVolume]),
                  'info': ticker
                });

              case 12:
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
      var timestamp = parseInt(trade['date']) * 1000;
      return {
        'id': trade['tid'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
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
                return this.publicGetPairTrades(this.extend({
                  'pair': market['id']
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = undefined;
      if ('type' in order) side = order['type'];
      var status = this.safeString(order, 'status', 'open');

      if (status === 'filled') {
        status = 'closed';
      } else if (status === 'calcelled') {
        status = 'canceled';
      }

      var symbol = undefined;
      var cost = undefined;
      var price = this.safeFloat(order, 'price');
      var amount = undefined;
      var remaining = undefined;
      var filled = undefined;

      if (market) {
        symbol = market['symbol'];
        var quoteId = market['quoteId'];
        var baseId = market['baseId'];
        if (market['quoteId'] === 'idr' && 'order_rp' in order) quoteId = 'rp';
        if (market['baseId'] === 'idr' && 'remain_rp' in order) baseId = 'rp';
        cost = this.safeFloat(order, 'order_' + quoteId);

        if (cost) {
          amount = cost / price;
          var remainingCost = this.safeFloat(order, 'remain_' + quoteId);

          if (typeof remainingCost !== 'undefined') {
            remaining = remainingCost / price;
            filled = amount - remaining;
          }
        } else {
          amount = this.safeFloat(order, 'order_' + baseId);
          cost = price * amount;
          remaining = this.safeFloat(order, 'remain_' + baseId);
          filled = amount - remaining;
        }
      }

      var average = undefined;
      if (filled) average = cost / filled;
      var timestamp = parseInt(order['submit_time']);
      var fee = undefined;
      var result = {
        'info': order,
        'id': order['order_id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': 'limit',
        'side': side,
        'price': price,
        'cost': cost,
        'average': average,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': fee
      };
      return result;
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(id) {
        var symbol,
            params,
            market,
            response,
            orders,
            order,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbol = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};

                if (symbol) {
                  _context5.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrder requires a symbol');

              case 4:
                _context5.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                _context5.next = 9;
                return this.privatePostGetOrder(this.extend({
                  'pair': market['id'],
                  'order_id': id
                }, params));

              case 9:
                response = _context5.sent;
                orders = response['return'];
                order = this.parseOrder(this.extend({
                  'id': id
                }, orders['order']), market);
                return _context5.abrupt("return", this.extend({
                  'info': response
                }, order));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrder(_x4) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            raw,
            orders,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : undefined;
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                _context6.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                request = {};

                if (symbol) {
                  market = this.market(symbol);
                  request['pair'] = market['id'];
                }

                _context6.next = 11;
                return this.privatePostOpenOrders(this.extend(request, params));

              case 11:
                response = _context6.sent;
                // { success: 1, return: { orders: null }}
                raw = response['return']['orders'];

                if (raw) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return", []);

              case 15:
                orders = this.parseOrders(raw, market, since, limit);
                return _context6.abrupt("return", this.filterOrdersBySymbol(orders, symbol));

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            orders,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : undefined;
                since = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};

                if (symbol) {
                  _context7.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders requires a symbol');

              case 6:
                _context7.next = 8;
                return this.loadMarkets();

              case 8:
                request = {};
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['pair'] = market['id'];
                }

                _context7.next = 13;
                return this.privatePostOrderHistory(this.extend(request, params));

              case 13:
                response = _context7.sent;
                orders = this.parseOrders(response['return']['orders'], market, since, limit);
                orders = this.filterBy(orders, 'status', 'closed');

                if (!symbol) {
                  _context7.next = 18;
                  break;
                }

                return _context7.abrupt("return", this.filterOrdersBySymbol(orders, symbol));

              case 18:
                return _context7.abrupt("return", orders);

              case 19:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
            market,
            order,
            currency,
            result,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                price = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                params = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : {};

                if (!(type !== 'limit')) {
                  _context8.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                _context8.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                order = {
                  'pair': market['id'],
                  'type': side,
                  'price': price
                };
                currency = market['baseId'];

                if (side === 'buy') {
                  order[market['quoteId']] = amount * price;
                } else {
                  order[market['baseId']] = amount;
                }

                order[currency] = amount;
                _context8.next = 13;
                return this.privatePostTrade(this.extend(order, params));

              case 13:
                result = _context8.sent;
                return _context8.abrupt("return", {
                  'info': result,
                  'id': result['return']['order_id'].toString()
                });

              case 15:
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
            side,
            market,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};

                if (!(typeof symbol === 'undefined')) {
                  _context9.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a symbol argument');

              case 4:
                side = this.safeValue(params, 'side');

                if (!(typeof side === 'undefined')) {
                  _context9.next = 7;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires an extra "side" param');

              case 7:
                _context9.next = 9;
                return this.loadMarkets();

              case 9:
                market = this.market(symbol);
                _context9.next = 12;
                return this.privatePostCancelOrder(this.extend({
                  'order_id': id,
                  'pair': market['id'],
                  'type': params['side']
                }, params));

              case 12:
                return _context9.abrupt("return", _context9.sent);

              case 13:
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
      var url = this.urls['api'][api];

      if (api === 'public') {
        url += '/' + this.implodeParams(path, params);
      } else {
        this.checkRequiredCredentials();
        body = this.urlencode(this.extend({
          'method': path,
          'nonce': this.nonce()
        }, params));
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Key': this.apiKey,
          'Sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512')
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
      var response = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
      // { success: 0, error: "invalid order." }
      if (typeof response === 'undefined') if (body[0] === '{') response = JSON.parse(body);
      if (!('success' in response)) return; // no 'success' property on public responses

      if (response['success'] === 1) {
        // { success: 1, return: { orders: [] }}
        if (!('return' in response)) throw new ExchangeError(this.id + ': malformed response: ' + this.json(response));else return;
      }

      var message = response['error'];
      var feedback = this.id + ' ' + this.json(response);

      if (message === 'Insufficient balance.') {
        throw new InsufficientFunds(feedback);
      } else if (message === 'invalid order.') {
        throw new OrderNotFound(feedback); // cancelOrder(1)
      } else if (message.indexOf('Minimum price ') >= 0) {
        throw new InvalidOrder(feedback); // price < limits.price.min, on createLimitBuyOrder ('ETH/BTC', 1, 0)
      } else if (message.indexOf('Minimum order ') >= 0) {
        throw new InvalidOrder(feedback); // cost < limits.cost.min on createLimitBuyOrder ('ETH/BTC', 0, 1)
      } else if (message === 'Invalid credentials. API not found or session has expired.') {
        throw new AuthenticationError(feedback); // on bad apiKey
      } else if (message === 'Invalid credentials. Bad sign.') {
        throw new AuthenticationError(feedback); // on bad secret
      }

      throw new ExchangeError(this.id + ': unknown error: ' + this.json(response));
    }
  }]);

  return bitcoincoid;
}(Exchange);