"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var acx = require('./acx.js');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_acx) {
  _inherits(kuna, _acx);

  function kuna() {
    _classCallCheck(this, kuna);

    return _possibleConstructorReturn(this, (kuna.__proto__ || _Object$getPrototypeOf(kuna)).apply(this, arguments));
  }

  _createClass(kuna, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(kuna.prototype.__proto__ || _Object$getPrototypeOf(kuna.prototype), "describe", this).call(this), {
        'id': 'kuna',
        'name': 'Kuna',
        'countries': 'UA',
        'rateLimit': 1000,
        'version': 'v2',
        'hasCORS': false,
        'hasFetchTickers': false,
        'hasFetchOHLCV': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/31697638-912824fa-b3c1-11e7-8c36-cf9606eb94ac.jpg',
          'api': 'https://kuna.io',
          'www': 'https://kuna.io',
          'doc': 'https://kuna.io/documents/api'
        },
        'api': {
          'public': {
            'get': ['tickers/{market}', 'order_book', 'order_book/{market}', 'trades', 'trades/{market}', 'timestamp']
          },
          'private': {
            'get': ['members/me', 'orders', 'trades/my'],
            'post': ['orders', 'order/delete']
          }
        },
        'markets': {
          'BTC/UAH': {
            'id': 'btcuah',
            'symbol': 'BTC/UAH',
            'base': 'BTC',
            'quote': 'UAH',
            'precision': {
              'amount': 6,
              'price': 0
            },
            'lot': 0.000001,
            'limits': {
              'amount': {
                'min': 0.000001,
                'max': undefined
              },
              'price': {
                'min': 1,
                'max': undefined
              }
            }
          },
          'ETH/UAH': {
            'id': 'ethuah',
            'symbol': 'ETH/UAH',
            'base': 'ETH',
            'quote': 'UAH',
            'precision': {
              'amount': 6,
              'price': 0
            },
            'lot': 0.000001,
            'limits': {
              'amount': {
                'min': 0.000001,
                'max': undefined
              },
              'price': {
                'min': 1,
                'max': undefined
              }
            }
          },
          'GBG/UAH': {
            'id': 'gbguah',
            'symbol': 'GBG/UAH',
            'base': 'GBG',
            'quote': 'UAH',
            'precision': {
              'amount': 3,
              'price': 2
            },
            'lot': 0.001,
            'limits': {
              'amount': {
                'min': 0.000001,
                'max': undefined
              },
              'price': {
                'min': 0.01,
                'max': undefined
              }
            }
          },
          // Golos Gold (GBG != GOLOS)
          'KUN/BTC': {
            'id': 'kunbtc',
            'symbol': 'KUN/BTC',
            'base': 'KUN',
            'quote': 'BTC',
            'precision': {
              'amount': 6,
              'price': 6
            },
            'lot': 0.000001,
            'limits': {
              'amount': {
                'min': 0.000001,
                'max': undefined
              },
              'price': {
                'min': 0.000001,
                'max': undefined
              }
            }
          },
          'BCH/BTC': {
            'id': 'bchbtc',
            'symbol': 'BCH/BTC',
            'base': 'BCH',
            'quote': 'BTC',
            'precision': {
              'amount': 6,
              'price': 6
            },
            'lot': 0.000001,
            'limits': {
              'amount': {
                'min': 0.000001,
                'max': undefined
              },
              'price': {
                'min': 0.000001,
                'max': undefined
              }
            }
          },
          'WAVES/UAH': {
            'id': 'wavesuah',
            'symbol': 'WAVES/UAH',
            'base': 'WAVES',
            'quote': 'UAH',
            'precision': {
              'amount': 6,
              'price': 0
            },
            'lot': 0.000001,
            'limits': {
              'amount': {
                'min': 0.000001,
                'max': undefined
              },
              'price': {
                'min': 1,
                'max': undefined
              }
            }
          }
        },
        'fees': {
          'trading': {
            'taker': 0.25 / 100,
            'maker': 0.25 / 100
          }
        }
      });
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code == 400) {
        var data = JSON.parse(body);
        var error = data['error'];
        var errorCode = error['code'];

        if (errorCode == 2002) {
          throw new InsufficientFunds([this.id, method, url, code, reason, body].join(' '));
        } else if (errorCode == 2003) {
          throw new OrderNotFound([this.id, method, url, code, reason, body].join(' '));
        }
      }
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(symbol) {
        var params,
            market,
            orderBook,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                market = this.market(symbol);
                _context.next = 4;
                return this.publicGetOrderBook(this.extend({
                  'market': market['id']
                }, params));

              case 4:
                orderBook = _context.sent;
                return _context.abrupt("return", this.parseOrderBook(orderBook, undefined, 'bids', 'asks', 'price', 'remaining_volume'));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchL3OrderBook",
    value: function () {
      var _fetchL3OrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol, params) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.fetchOrderBook(symbol, params));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchL3OrderBook(_x2, _x3) {
        return _fetchL3OrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var symbol,
            since,
            limit,
            params,
            market,
            orders,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                symbol = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : undefined;
                since = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : undefined;
                limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : undefined;
                params = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};

                if (symbol) {
                  _context3.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol argument');

              case 6:
                market = this.market(symbol);
                _context3.next = 9;
                return this.privateGetOrders(this.extend({
                  'market': market['id']
                }, params));

              case 9:
                orders = _context3.sent;
                return _context3.abrupt("return", this.parseOrders(orders, market, since, limit));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.parse8601(trade['created_at']);
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'id': trade['id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': undefined,
        'side': undefined,
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['volume']),
        'info': trade
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
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetTrades(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response, market, since, limit));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTrades(_x4) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseMyTrade",
    value: function parseMyTrade(trade, market) {
      var timestamp = this.parse8601(trade['created_at']);
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'id': trade['id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'price': trade['price'],
        'amount': trade['volume'],
        'cost': trade['funds'],
        'symbol': symbol,
        'side': trade['side'],
        'order': trade['order_id']
      };
    }
  }, {
    key: "parseMyTrades",
    value: function parseMyTrades(trades) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var parsedTrades = [];

      for (var i = 0; i < trades.length; i++) {
        var trade = trades[i];
        var parsedTrade = this.parseMyTrade(trade, market);
        parsedTrades.push(parsedTrade);
      }

      return parsedTrades;
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

                if (symbol) {
                  _context5.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol argument');

              case 6:
                market = this.market(symbol);
                _context5.next = 9;
                return this.privateGetTradesMy({
                  'market': market['id']
                });

              case 9:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseMyTrades(response, market));

              case 11:
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
  }]);

  return kuna;
}(acx);