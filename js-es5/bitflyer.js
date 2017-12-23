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

var Exchange = require('./base/Exchange'); //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitflyer, _Exchange);

  function bitflyer() {
    _classCallCheck(this, bitflyer);

    return _possibleConstructorReturn(this, (bitflyer.__proto__ || _Object$getPrototypeOf(bitflyer)).apply(this, arguments));
  }

  _createClass(bitflyer, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitflyer.prototype.__proto__ || _Object$getPrototypeOf(bitflyer.prototype), "describe", this).call(this), {
        'id': 'bitflyer',
        'name': 'bitFlyer',
        'countries': 'JP',
        'version': 'v1',
        'rateLimit': 500,
        'hasCORS': false,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28051642-56154182-660e-11e7-9b0d-6042d1e6edd8.jpg',
          'api': 'https://api.bitflyer.jp',
          'www': 'https://bitflyer.jp',
          'doc': 'https://bitflyer.jp/API'
        },
        'api': {
          'public': {
            'get': ['getmarkets', // or 'markets'
            'getboard', // or 'board'
            'getticker', // or 'ticker'
            'getexecutions', // or 'executions'
            'gethealth', 'getchats']
          },
          'private': {
            'get': ['getpermissions', 'getbalance', 'getcollateral', 'getcollateralaccounts', 'getaddresses', 'getcoinins', 'getcoinouts', 'getbankaccounts', 'getdeposits', 'getwithdrawals', 'getchildorders', 'getparentorders', 'getparentorder', 'getexecutions', 'getpositions', 'gettradingcommission'],
            'post': ['sendcoin', 'withdraw', 'sendchildorder', 'cancelchildorder', 'sendparentorder', 'cancelparentorder', 'cancelallchildorders']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.25 / 100,
            'taker': 0.25 / 100
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
        var markets, result, p, market, id, currencies, base, quote, symbol, numCurrencies;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarkets();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['product_code'];
                  currencies = id.split('_');
                  base = undefined;
                  quote = undefined;
                  symbol = id;
                  numCurrencies = currencies.length;

                  if (numCurrencies == 1) {
                    base = symbol.slice(0, 3);
                    quote = symbol.slice(3, 6);
                  } else if (numCurrencies == 2) {
                    base = currencies[0];
                    quote = currencies[1];
                    symbol = base + '/' + quote;
                  } else {
                    base = currencies[1];
                    quote = currencies[2];
                  }

                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            response,
            balances,
            b,
            account,
            currency,
            result,
            currencies,
            i,
            _currency,
            _account,
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
                return this.privateGetBalance();

              case 5:
                response = _context2.sent;
                balances = {};

                for (b = 0; b < response.length; b++) {
                  account = response[b];
                  currency = account['currency_code'];
                  balances[currency] = account;
                }

                result = {
                  'info': response
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  _currency = currencies[i];
                  _account = this.account();

                  if (_currency in balances) {
                    _account['total'] = balances[_currency]['amount'];
                    _account['free'] = balances[_currency]['available'];
                    _account['used'] = _account['total'] - _account['free'];
                  }

                  result[_currency] = _account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 12:
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
                return this.publicGetBoard(this.extend({
                  'product_code': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'size'));

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
            ticker,
            timestamp,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                _context4.next = 5;
                return this.publicGetTicker(this.extend({
                  'product_code': this.marketId(symbol)
                }, params));

              case 5:
                ticker = _context4.sent;
                timestamp = this.parse8601(ticker['timestamp']);
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': undefined,
                  'low': undefined,
                  'bid': parseFloat(ticker['best_bid']),
                  'ask': parseFloat(ticker['best_ask']),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['ltp']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker['volume_by_product']),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 8:
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
      var side = undefined;
      var order = undefined;
      if ('side' in trade) if (trade['side']) {
        side = trade['side'].toLowerCase();
        var id = side + '_child_order_acceptance_id';
        if (id in trade) order = trade[id];
      }
      var timestamp = this.parse8601(trade['exec_date']);
      return {
        'id': trade['id'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': order,
        'type': undefined,
        'side': side,
        'price': trade['price'],
        'amount': trade['size']
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                _context5.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context5.next = 8;
                return this.publicGetExecutions(this.extend({
                  'product_code': market['id']
                }, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            order,
            result,
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
                order = {
                  'product_code': this.marketId(symbol),
                  'child_order_type': type.toUpperCase(),
                  'side': side.toUpperCase(),
                  'price': price,
                  'size': amount
                };
                _context6.next = 7;
                return this.privatePostSendchildorder(this.extend(order, params));

              case 7:
                result = _context6.sent;
                return _context6.abrupt("return", {
                  'info': result,
                  'id': result['child_order_acceptance_id']
                });

              case 9:
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
                return this.privatePostCancelchildorder(this.extend({
                  'parent_order_id': id
                }, params));

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
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(currency, amount, address) {
        var params,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                _context8.next = 5;
                return this.privatePostWithdraw(this.extend({
                  'currency_code': currency,
                  'amount': amount // 'bank_account_id': 1234,

                }, params));

              case 5:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['message_id']
                });

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function withdraw(_x9, _x10, _x11) {
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
      var request = '/' + this.version + '/';
      if (api == 'private') request += 'me/';
      request += path;

      if (method == 'GET') {
        if (_Object$keys(params).length) request += '?' + this.urlencode(params);
      }

      var url = this.urls['api'] + request;

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        body = this.json(params);
        var auth = [nonce, method, request, body].join('');
        headers = {
          'ACCESS-KEY': this.apiKey,
          'ACCESS-TIMESTAMP': nonce,
          'ACCESS-SIGN': this.hmac(this.encode(auth), this.encode(this.secret)),
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
  }]);

  return bitflyer;
}(Exchange);