"use strict"; //  ---------------------------------------------------------------------------

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
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(coinmate, _Exchange);

  function coinmate() {
    _classCallCheck(this, coinmate);

    return _possibleConstructorReturn(this, (coinmate.__proto__ || _Object$getPrototypeOf(coinmate)).apply(this, arguments));
  }

  _createClass(coinmate, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coinmate.prototype.__proto__ || _Object$getPrototypeOf(coinmate.prototype), "describe", this).call(this), {
        'id': 'coinmate',
        'name': 'CoinMate',
        'countries': ['GB', 'CZ'],
        // UK, Czech Republic
        'rateLimit': 1000,
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27811229-c1efb510-606c-11e7-9a36-84ba2ce412d8.jpg',
          'api': 'https://coinmate.io/api',
          'www': 'https://coinmate.io',
          'doc': ['http://docs.coinmate.apiary.io', 'https://coinmate.io/developers']
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['orderBook', 'ticker', 'transactions']
          },
          'private': {
            'post': ['balances', 'bitcoinWithdrawal', 'bitcoinDepositAddresses', 'buyInstant', 'buyLimit', 'cancelOrder', 'cancelOrderWithInfo', 'createVoucher', 'openOrders', 'redeemVoucher', 'sellInstant', 'sellLimit', 'transactionHistory', 'unconfirmedBitcoinDeposits']
          }
        },
        'markets': {
          'BTC/EUR': {
            'id': 'BTC_EUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR',
            'precision': {
              'amount': 4,
              'price': 2
            }
          },
          'BTC/CZK': {
            'id': 'BTC_CZK',
            'symbol': 'BTC/CZK',
            'base': 'BTC',
            'quote': 'CZK',
            'precision': {
              'amount': 4,
              'price': 2
            }
          },
          'LTC/BTC': {
            'id': 'LTC_BTC',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'precision': {
              'amount': 4,
              'price': 5
            }
          }
        },
        'fees': {
          'trading': {
            'maker': 0.0005,
            'taker': 0.0035
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
            balances,
            result,
            currencies,
            i,
            currency,
            account,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostBalances();

              case 3:
                response = _context.sent;
                balances = response['data'];
                result = {
                  'info': balances
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();

                  if (currency in balances) {
                    account['free'] = balances[currency]['available'];
                    account['used'] = balances[currency]['reserved'];
                    account['total'] = balances[currency]['balance'];
                  }

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
            response,
            orderbook,
            timestamp,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetOrderBook(this.extend({
                  'currencyPair': this.marketId(symbol),
                  'groupByPriceLimit': 'False'
                }, params));

              case 3:
                response = _context2.sent;
                orderbook = response['data'];
                timestamp = orderbook['timestamp'] * 1000;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'amount'));

              case 7:
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
            ticker,
            timestamp,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetTicker(this.extend({
                  'currencyPair': this.marketId(symbol)
                }, params));

              case 3:
                response = _context3.sent;
                ticker = response['data'];
                timestamp = ticker['timestamp'] * 1000;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(ticker['bid']),
                  'ask': parseFloat(ticker['ask']),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker['amount']),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 7:
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
      if (!market) market = this.markets_by_id[trade['currencyPair']];
      return {
        'id': trade['transactionId'],
        'info': trade,
        'timestamp': trade['timestamp'],
        'datetime': this.iso8601(trade['timestamp']),
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
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetTransactions(this.extend({
                  'currencyPair': market['id'],
                  'minutesIntoHistory': 10
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response['data'], market, since, limit));

              case 8:
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
            method,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                method = 'privatePost' + this.capitalize(side);
                order = {
                  'currencyPair': this.marketId(symbol)
                };

                if (type == 'market') {
                  if (side == 'buy') order['total'] = amount; // amount in fiat
                  else order['amount'] = amount; // amount in fiat

                  method += 'Instant';
                } else {
                  order['amount'] = amount; // amount in crypto

                  order['price'] = price;
                  method += this.capitalize(type);
                }

                _context5.next = 7;
                return this[method](self.extend(order, params));

              case 7:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['data'].toString()
                });

              case 9:
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
                return this.privatePostCancelOrder({
                  'orderId': id
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'] + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = nonce + this.uid + this.apiKey;
        var signature = this.hmac(this.encode(auth), this.encode(this.secret));
        body = this.urlencode(this.extend({
          'clientId': this.uid,
          'nonce': nonce,
          'publicKey': this.apiKey,
          'signature': signature.toUpperCase()
        }, params));
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
      _regeneratorRuntime.mark(function _callee7(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                api = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 'public';
                method = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 'GET';
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                headers = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                body = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : undefined;
                _context7.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context7.sent;

                if (!('error' in response)) {
                  _context7.next = 11;
                  break;
                }

                if (!response['error']) {
                  _context7.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context7.abrupt("return", response);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return coinmate;
}(Exchange);