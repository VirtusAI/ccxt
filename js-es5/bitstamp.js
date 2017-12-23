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
    ExchangeError = _require.ExchangeError,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitstamp, _Exchange);

  function bitstamp() {
    _classCallCheck(this, bitstamp);

    return _possibleConstructorReturn(this, (bitstamp.__proto__ || _Object$getPrototypeOf(bitstamp)).apply(this, arguments));
  }

  _createClass(bitstamp, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitstamp.prototype.__proto__ || _Object$getPrototypeOf(bitstamp.prototype), "describe", this).call(this), {
        'id': 'bitstamp',
        'name': 'Bitstamp',
        'countries': 'GB',
        'rateLimit': 1000,
        'version': 'v2',
        'hasCORS': false,
        'hasFetchOrder': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27786377-8c8ab57e-5fe9-11e7-8ea4-2b05b6bcceec.jpg',
          'api': 'https://www.bitstamp.net/api',
          'www': 'https://www.bitstamp.net',
          'doc': 'https://www.bitstamp.net/api'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['order_book/{pair}/', 'ticker_hour/{pair}/', 'ticker/{pair}/', 'transactions/{pair}/', 'trading-pairs-info/']
          },
          'private': {
            'post': ['balance/', 'balance/{pair}/', 'user_transactions/', 'user_transactions/{pair}/', 'open_orders/all/', 'open_orders/{pair}', 'order_status/', 'cancel_order/', 'buy/{pair}/', 'buy/market/{pair}/', 'sell/{pair}/', 'sell/market/{pair}/', 'ltc_withdrawal/', 'ltc_address/', 'eth_withdrawal/', 'eth_address/', 'transfer-to-main/', 'transfer-from-main/', 'xrp_withdrawal/', 'xrp_address/', 'withdrawal/open/', 'withdrawal/status/', 'withdrawal/cancel/', 'liquidation_address/new/', 'liquidation_address/info/']
          },
          'v1': {
            'post': ['bitcoin_deposit_address/', 'unconfirmed_btc/', 'bitcoin_withdrawal/']
          }
        },
        'fees': {
          'trading': {
            'tierBased': true,
            'percentage': true,
            'taker': 0.25 / 100,
            'maker': 0.25 / 100,
            'tiers': {
              'taker': [[0, 0.25 / 100], [20000, 0.24 / 100], [100000, 0.22 / 100], [400000, 0.20 / 100], [600000, 0.15 / 100], [1000000, 0.14 / 100], [2000000, 0.13 / 100], [4000000, 0.12 / 100], [20000000, 0.11 / 100], [20000001, 0.10 / 100]],
              'maker': [[0, 0.25 / 100], [20000, 0.24 / 100], [100000, 0.22 / 100], [400000, 0.20 / 100], [600000, 0.15 / 100], [1000000, 0.14 / 100], [2000000, 0.13 / 100], [4000000, 0.12 / 100], [20000000, 0.11 / 100], [20000001, 0.10 / 100]]
            }
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0,
              'LTC': 0,
              'ETH': 0,
              'XRP': 0,
              'USD': 25,
              'EUR': 0.90
            },
            'deposit': {
              'BTC': 0,
              'LTC': 0,
              'ETH': 0,
              'XRP': 0,
              'USD': 25,
              'EUR': 0
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
        var markets, result, i, market, symbol, _symbol$split, _symbol$split2, base, quote, id, precision, _market$minimum_order, _market$minimum_order2, cost, currency, active, lot;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetTradingPairsInfo();

              case 2:
                markets = _context.sent;
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  symbol = market['name'];
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  id = market['url_symbol'];
                  precision = {
                    'amount': market['base_decimals'],
                    'price': market['counter_decimals']
                  };
                  _market$minimum_order = market['minimum_order'].split(' '), _market$minimum_order2 = _slicedToArray(_market$minimum_order, 2), cost = _market$minimum_order2[0], currency = _market$minimum_order2[1];
                  active = market['trading'] == 'Enabled';
                  lot = Math.pow(10, -precision['amount']);
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market,
                    'lot': lot,
                    'active': active,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': lot,
                        'max': undefined
                      },
                      'price': {
                        'min': Math.pow(10, -precision['price']),
                        'max': undefined
                      },
                      'cost': {
                        'min': parseFloat(cost),
                        'max': undefined
                      }
                    }
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
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
                _context2.next = 5;
                return this.publicGetOrderBookPair(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context2.sent;
                timestamp = parseInt(orderbook['timestamp']) * 1000;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, timestamp));

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
            ticker,
            timestamp,
            vwap,
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
                _context3.next = 5;
                return this.publicGetTickerPair(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                ticker = _context3.sent;
                timestamp = parseInt(ticker['timestamp']) * 1000;
                vwap = parseFloat(ticker['vwap']);
                baseVolume = parseFloat(ticker['volume']);
                quoteVolume = baseVolume * vwap;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(ticker['bid']),
                  'ask': parseFloat(ticker['ask']),
                  'vwap': vwap,
                  'open': parseFloat(ticker['open']),
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': baseVolume,
                  'quoteVolume': quoteVolume,
                  'info': ticker
                });

              case 11:
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
      var timestamp = undefined;

      if ('date' in trade) {
        timestamp = parseInt(trade['date']) * 1000;
      } else if ('datetime' in trade) {
        // timestamp = this.parse8601 (trade['datetime']);
        timestamp = parseInt(trade['datetime']) * 1000;
      }

      var side = trade['type'] == 0 ? 'buy' : 'sell';
      var order = undefined;
      if ('order_id' in trade) order = trade['order_id'].toString();

      if ('currency_pair' in trade) {
        if (trade['currency_pair'] in this.markets_by_id) market = this.markets_by_id[trade['currency_pair']];
      }

      return {
        'id': trade['tid'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': order,
        'type': undefined,
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
                return this.publicGetTransactionsPair(this.extend({
                  'pair': market['id'],
                  'time': 'minute'
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var params,
            balance,
            result,
            currencies,
            i,
            currency,
            lowercase,
            total,
            free,
            used,
            account,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.privatePostBalance();

              case 5:
                balance = _context5.sent;
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  total = lowercase + '_balance';
                  free = lowercase + '_available';
                  used = lowercase + '_reserved';
                  account = this.account();
                  if (free in balance) account['free'] = parseFloat(balance[free]);
                  if (used in balance) account['used'] = parseFloat(balance[used]);
                  if (total in balance) account['total'] = parseFloat(balance[total]);
                  result[currency] = account;
                }

                return _context5.abrupt("return", this.parseBalance(result));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            method,
            order,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                price = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                params = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};
                _context6.next = 4;
                return this.loadMarkets();

              case 4:
                method = 'privatePost' + this.capitalize(side);
                order = {
                  'pair': this.marketId(symbol),
                  'amount': amount
                };
                if (type == 'market') method += 'Market';else order['price'] = price;
                method += 'Pair';
                _context6.next = 10;
                return this[method](this.extend(order, params));

              case 10:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
                return this.privatePostCancelOrder({
                  'id': id
                });

              case 6:
                return _context7.abrupt("return", _context7.sent);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(order) {
      if (order['status'] == 'Queue' || order['status'] == 'Open') return 'open';
      if (order['status'] == 'Finished') return 'closed';
      return order['status'];
    }
  }, {
    key: "fetchOrderStatus",
    value: function () {
      var _fetchOrderStatus = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(id) {
        var symbol,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                _context8.next = 5;
                return this.privatePostOrderStatus({
                  'id': id
                });

              case 5:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseOrderStatus(response));

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchOrderStatus(_x9) {
        return _fetchOrderStatus.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9() {
        var symbol,
            since,
            limit,
            params,
            market,
            pair,
            request,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : undefined;
                since = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : undefined;
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                if (symbol) market = this.market(symbol);
                pair = market ? market['id'] : 'all';
                request = this.extend({
                  'pair': pair
                }, params);
                _context9.next = 12;
                return this.privatePostOpenOrdersPair(request);

              case 12:
                response = _context9.sent;
                return _context9.abrupt("return", this.parseTrades(response, market, since, limit));

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(id) {
        var symbol,
            params,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                params = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : {};
                _context10.next = 4;
                return this.loadMarkets();

              case 4:
                _context10.next = 6;
                return this.privatePostOrderStatus({
                  'id': id
                });

              case 6:
                return _context10.abrupt("return", _context10.sent);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
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
      var url = this.urls['api'] + '/';
      if (api != 'v1') url += this.version + '/';
      url += this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = nonce + this.uid + this.apiKey;
        var signature = this.encode(this.hmac(this.encode(auth), this.encode(this.secret)));
        query = this.extend({
          'key': this.apiKey,
          'signature': signature.toUpperCase(),
          'nonce': nonce
        }, query);
        body = this.urlencode(query);
        headers = {
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
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                api = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 'public';
                method = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 'GET';
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                headers = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : undefined;
                body = _args11.length > 5 && _args11[5] !== undefined ? _args11[5] : undefined;
                _context11.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context11.sent;

                if (!('status' in response)) {
                  _context11.next = 11;
                  break;
                }

                if (!(response['status'] == 'error')) {
                  _context11.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context11.abrupt("return", response);

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function request(_x11) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bitstamp;
}(Exchange);