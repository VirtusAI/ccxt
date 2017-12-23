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
  _inherits(btctradeua, _Exchange);

  function btctradeua() {
    _classCallCheck(this, btctradeua);

    return _possibleConstructorReturn(this, (btctradeua.__proto__ || _Object$getPrototypeOf(btctradeua)).apply(this, arguments));
  }

  _createClass(btctradeua, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(btctradeua.prototype.__proto__ || _Object$getPrototypeOf(btctradeua.prototype), "describe", this).call(this), {
        'id': 'btctradeua',
        'name': 'BTC Trade UA',
        'countries': 'UA',
        // Ukraine,
        'rateLimit': 3000,
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27941483-79fc7350-62d9-11e7-9f61-ac47f28fcd96.jpg',
          'api': 'https://btc-trade.com.ua/api',
          'www': 'https://btc-trade.com.ua',
          'doc': 'https://docs.google.com/document/d/1ocYA0yMy_RXd561sfG3qEPZ80kyll36HUxvCRe5GbhE/edit'
        },
        'api': {
          'public': {
            'get': ['deals/{symbol}', 'trades/sell/{symbol}', 'trades/buy/{symbol}', 'japan_stat/high/{symbol}']
          },
          'private': {
            'post': ['auth', 'ask/{symbol}', 'balance', 'bid/{symbol}', 'buy/{symbol}', 'my_orders/{symbol}', 'order/status/{id}', 'remove/order/{id}', 'sell/{symbol}']
          }
        },
        'markets': {
          'BTC/UAH': {
            'id': 'btc_uah',
            'symbol': 'BTC/UAH',
            'base': 'BTC',
            'quote': 'UAH',
            'precision': {
              'price': 1
            },
            'limits': {
              'amount': {
                'min': 0.0000000001
              }
            }
          },
          'ETH/UAH': {
            'id': 'eth_uah',
            'symbol': 'ETH/UAH',
            'base': 'ETH',
            'quote': 'UAH'
          },
          'LTC/UAH': {
            'id': 'ltc_uah',
            'symbol': 'LTC/UAH',
            'base': 'LTC',
            'quote': 'UAH'
          },
          'DOGE/UAH': {
            'id': 'doge_uah',
            'symbol': 'DOGE/UAH',
            'base': 'DOGE',
            'quote': 'UAH'
          },
          'DASH/UAH': {
            'id': 'dash_uah',
            'symbol': 'DASH/UAH',
            'base': 'DASH',
            'quote': 'UAH'
          },
          'SIB/UAH': {
            'id': 'sib_uah',
            'symbol': 'SIB/UAH',
            'base': 'SIB',
            'quote': 'UAH'
          },
          'KRB/UAH': {
            'id': 'krb_uah',
            'symbol': 'KRB/UAH',
            'base': 'KRB',
            'quote': 'UAH'
          },
          'NVC/UAH': {
            'id': 'nvc_uah',
            'symbol': 'NVC/UAH',
            'base': 'NVC',
            'quote': 'UAH'
          },
          'LTC/BTC': {
            'id': 'ltc_btc',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC'
          },
          'NVC/BTC': {
            'id': 'nvc_btc',
            'symbol': 'NVC/BTC',
            'base': 'NVC',
            'quote': 'BTC'
          },
          'ITI/UAH': {
            'id': 'iti_uah',
            'symbol': 'ITI/UAH',
            'base': 'ITI',
            'quote': 'UAH'
          },
          'DOGE/BTC': {
            'id': 'doge_btc',
            'symbol': 'DOGE/BTC',
            'base': 'DOGE',
            'quote': 'BTC'
          },
          'DASH/BTC': {
            'id': 'dash_btc',
            'symbol': 'DASH/BTC',
            'base': 'DASH',
            'quote': 'BTC'
          }
        },
        'fees': {
          'trading': {
            'maker': 0.1 / 100,
            'taker': 0.1 / 100
          }
        }
      });
    }
  }, {
    key: "signIn",
    value: function signIn() {
      return this.privatePostAuth();
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            result,
            accounts,
            b,
            account,
            currency,
            balance,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostBalance();

              case 3:
                response = _context.sent;
                result = {
                  'info': response
                };

                if ('accounts' in response) {
                  accounts = response['accounts'];

                  for (b = 0; b < accounts.length; b++) {
                    account = accounts[b];
                    currency = account['currency'];
                    balance = parseFloat(account['balance']);
                    result[currency] = {
                      'free': balance,
                      'used': 0.0,
                      'total': balance
                    };
                  }
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 7:
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
            bids,
            asks,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                _context2.next = 4;
                return this.publicGetTradesBuySymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 4:
                bids = _context2.sent;
                _context2.next = 7;
                return this.publicGetTradesSellSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 7:
                asks = _context2.sent;
                orderbook = {
                  'bids': [],
                  'asks': []
                };

                if (bids) {
                  if ('list' in bids) orderbook['bids'] = bids['list'];
                }

                if (asks) {
                  if ('list' in asks) orderbook['asks'] = asks['list'];
                }

                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'currency_trade'));

              case 12:
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
            response,
            orderbook,
            bid,
            numBids,
            ask,
            numAsks,
            ticker,
            timestamp,
            result,
            tickerLength,
            start,
            t,
            candle,
            last,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetJapanStatHighSymbol(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 3:
                response = _context3.sent;
                _context3.next = 6;
                return this.fetchOrderBook(symbol);

              case 6:
                orderbook = _context3.sent;
                bid = undefined;
                numBids = orderbook['bids'].length;
                if (numBids > 0) bid = orderbook['bids'][0][0];
                ask = undefined;
                numAsks = orderbook['asks'].length;
                if (numAsks > 0) ask = orderbook['asks'][0][0];
                ticker = response['trades'];
                timestamp = this.milliseconds();
                result = {
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
                  'last': undefined,
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': undefined,
                  'info': ticker
                };
                tickerLength = ticker.length;

                if (tickerLength > 0) {
                  start = Math.max(tickerLength - 48, 0);

                  for (t = start; t < ticker.length; t++) {
                    candle = ticker[t];
                    if (typeof result['open'] == 'undefined') result['open'] = candle[1];
                    if (typeof result['high'] == 'undefined' || result['high'] < candle[2]) result['high'] = candle[2];
                    if (typeof result['low'] == 'undefined' || result['low'] > candle[3]) result['low'] = candle[3];
                    if (typeof result['baseVolume'] == 'undefined') result['baseVolume'] = -candle[5];else result['baseVolume'] -= candle[5];
                  }

                  last = tickerLength - 1;
                  result['close'] = ticker[last][4];
                  result['baseVolume'] = -1 * result['baseVolume'];
                }

                return _context3.abrupt("return", result);

              case 19:
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
    key: "convertCyrillicMonthNameToString",
    value: function convertCyrillicMonthNameToString(cyrillic) {
      var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      var month = undefined;

      for (var i = 0; i < months.length; i++) {
        if (cyrillic == months[i]) {
          month = i + 1;
          month = month.toString();
          if (i < 9) month = '0' + month;
        }
      }

      return month;
    }
  }, {
    key: "parseCyrillicDatetime",
    value: function parseCyrillicDatetime(cyrillic) {
      var parts = cyrillic.split(' ');
      var day = parts[0];
      var month = this.convertCyrillicMonthNameToString(parts[1]);
      if (!month) throw new ExchangeError(this.id + ' parseTrade() undefined month name: ' + cyrillic);
      var year = parts[2];
      var hms = parts[4];
      var hmsLength = hms.length;

      if (hmsLength == 7) {
        hms = '0' + hms;
      }

      var ymd = [year, month, day].join('-');
      var ymdhms = ymd + 'T' + hms;
      var timestamp = this.parse8601(ymdhms);
      timestamp = timestamp - 10800000; // server reports local GMT+3 time, adjust to UTC

      return timestamp;
    }
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = this.parseCyrillicDatetime(trade['pub_date']);
      return {
        'id': trade['id'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': undefined,
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['amnt_trade'])
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
            trades,
            i,
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
                return this.publicGetDealsSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                trades = [];

                for (i = 0; i < response.length; i++) {
                  if (response[i]['id'] % 2) {
                    trades.push(response[i]);
                  }
                }

                return _context4.abrupt("return", this.parseTrades(trades, market, since, limit));

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
            method,
            order,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};

                if (!(type == 'market')) {
                  _context5.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                market = this.market(symbol);
                method = 'privatePost' + this.capitalize(side) + 'Id';
                order = {
                  'count': amount,
                  'currency1': market['quote'],
                  'currency': market['base'],
                  'price': price
                };
                return _context5.abrupt("return", this[method](this.extend(order, params)));

              case 8:
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
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(id) {
        var symbol,
            params,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                _context6.next = 4;
                return this.privatePostRemoveOrderId({
                  'id': id
                });

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(trade, market) {
      var timestamp = this.milliseconds;
      return {
        'id': trade['id'],
        'timestamp': timestamp,
        // until they fix their timestamp
        'datetime': this.iso8601(timestamp),
        'status': 'open',
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['type'],
        'price': trade['price'],
        'amount': trade['amnt_trade'],
        'filled': 0,
        'remaining': trade['amnt_trade'],
        'trades': undefined,
        'info': trade
      };
    }
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var symbol,
            since,
            limit,
            params,
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

                throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol param');

              case 6:
                market = this.market(symbol);
                _context7.next = 9;
                return this.privatePostMyOrdersSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 9:
                response = _context7.sent;
                orders = response['your_open_orders'];
                return _context7.abrupt("return", this.parseOrders(orders, market, since, limit));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
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
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += this.implodeParams(path, query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'out_order_id': nonce,
          'nonce': nonce
        }, query));
        var auth = body + this.secret;
        headers = {
          'public-key': this.apiKey,
          'api-sign': this.hash(this.encode(auth), 'sha256'),
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
  }]);

  return btctradeua;
}(Exchange);