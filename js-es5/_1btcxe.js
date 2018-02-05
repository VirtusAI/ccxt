'use strict'; //  ---------------------------------------------------------------------------

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
  _inherits(_1btcxe, _Exchange);

  function _1btcxe() {
    _classCallCheck(this, _1btcxe);

    return _possibleConstructorReturn(this, (_1btcxe.__proto__ || _Object$getPrototypeOf(_1btcxe)).apply(this, arguments));
  }

  _createClass(_1btcxe, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(_1btcxe.prototype.__proto__ || _Object$getPrototypeOf(_1btcxe.prototype), "describe", this).call(this), {
        'id': '_1btcxe',
        'name': '1BTCXE',
        'countries': 'PA',
        // Panama
        'comment': 'Crypto Capital API',
        'has': {
          'CORS': true,
          'withdraw': true
        },
        'timeframes': {
          '1d': '1year'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766049-2b294408-5ecc-11e7-85cc-adaff013dc1a.jpg',
          'api': 'https://1btcxe.com/api',
          'www': 'https://1btcxe.com',
          'doc': 'https://1btcxe.com/api-docs.php'
        },
        'api': {
          'public': {
            'get': ['stats', 'historical-prices', 'order-book', 'transactions']
          },
          'private': {
            'post': ['balances-and-info', 'open-orders', 'user-transactions', 'btc-deposit-address/get', 'btc-deposit-address/new', 'deposits/get', 'withdrawals/get', 'orders/new', 'orders/edit', 'orders/cancel', 'orders/status', 'withdrawals/new']
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
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", [{
                  'id': 'USD',
                  'symbol': 'BTC/USD',
                  'base': 'BTC',
                  'quote': 'USD'
                }, {
                  'id': 'EUR',
                  'symbol': 'BTC/EUR',
                  'base': 'BTC',
                  'quote': 'EUR'
                }, {
                  'id': 'CNY',
                  'symbol': 'BTC/CNY',
                  'base': 'BTC',
                  'quote': 'CNY'
                }, {
                  'id': 'RUB',
                  'symbol': 'BTC/RUB',
                  'base': 'BTC',
                  'quote': 'RUB'
                }, {
                  'id': 'CHF',
                  'symbol': 'BTC/CHF',
                  'base': 'BTC',
                  'quote': 'CHF'
                }, {
                  'id': 'JPY',
                  'symbol': 'BTC/JPY',
                  'base': 'BTC',
                  'quote': 'JPY'
                }, {
                  'id': 'GBP',
                  'symbol': 'BTC/GBP',
                  'base': 'BTC',
                  'quote': 'GBP'
                }, {
                  'id': 'CAD',
                  'symbol': 'BTC/CAD',
                  'base': 'BTC',
                  'quote': 'CAD'
                }, {
                  'id': 'AUD',
                  'symbol': 'BTC/AUD',
                  'base': 'BTC',
                  'quote': 'AUD'
                }, {
                  'id': 'AED',
                  'symbol': 'BTC/AED',
                  'base': 'BTC',
                  'quote': 'AED'
                }, {
                  'id': 'BGN',
                  'symbol': 'BTC/BGN',
                  'base': 'BTC',
                  'quote': 'BGN'
                }, {
                  'id': 'CZK',
                  'symbol': 'BTC/CZK',
                  'base': 'BTC',
                  'quote': 'CZK'
                }, {
                  'id': 'DKK',
                  'symbol': 'BTC/DKK',
                  'base': 'BTC',
                  'quote': 'DKK'
                }, {
                  'id': 'HKD',
                  'symbol': 'BTC/HKD',
                  'base': 'BTC',
                  'quote': 'HKD'
                }, {
                  'id': 'HRK',
                  'symbol': 'BTC/HRK',
                  'base': 'BTC',
                  'quote': 'HRK'
                }, {
                  'id': 'HUF',
                  'symbol': 'BTC/HUF',
                  'base': 'BTC',
                  'quote': 'HUF'
                }, {
                  'id': 'ILS',
                  'symbol': 'BTC/ILS',
                  'base': 'BTC',
                  'quote': 'ILS'
                }, {
                  'id': 'INR',
                  'symbol': 'BTC/INR',
                  'base': 'BTC',
                  'quote': 'INR'
                }, {
                  'id': 'MUR',
                  'symbol': 'BTC/MUR',
                  'base': 'BTC',
                  'quote': 'MUR'
                }, {
                  'id': 'MXN',
                  'symbol': 'BTC/MXN',
                  'base': 'BTC',
                  'quote': 'MXN'
                }, {
                  'id': 'NOK',
                  'symbol': 'BTC/NOK',
                  'base': 'BTC',
                  'quote': 'NOK'
                }, {
                  'id': 'NZD',
                  'symbol': 'BTC/NZD',
                  'base': 'BTC',
                  'quote': 'NZD'
                }, {
                  'id': 'PLN',
                  'symbol': 'BTC/PLN',
                  'base': 'BTC',
                  'quote': 'PLN'
                }, {
                  'id': 'RON',
                  'symbol': 'BTC/RON',
                  'base': 'BTC',
                  'quote': 'RON'
                }, {
                  'id': 'SEK',
                  'symbol': 'BTC/SEK',
                  'base': 'BTC',
                  'quote': 'SEK'
                }, {
                  'id': 'SGD',
                  'symbol': 'BTC/SGD',
                  'base': 'BTC',
                  'quote': 'SGD'
                }, {
                  'id': 'THB',
                  'symbol': 'BTC/THB',
                  'base': 'BTC',
                  'quote': 'THB'
                }, {
                  'id': 'TRY',
                  'symbol': 'BTC/TRY',
                  'base': 'BTC',
                  'quote': 'TRY'
                }, {
                  'id': 'ZAR',
                  'symbol': 'BTC/ZAR',
                  'base': 'BTC',
                  'quote': 'ZAR'
                }]);

              case 1:
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
            balance,
            result,
            currencies,
            i,
            currency,
            account,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.privatePostBalancesAndInfo();

              case 3:
                response = _context2.sent;
                balance = response['balances-and-info'];
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();
                  account['free'] = this.safeFloat(balance['available'], currency, 0.0);
                  account['used'] = this.safeFloat(balance['on_hold'], currency, 0.0);
                  account['total'] = this.sum(account['free'], account['used']);
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
        var limit,
            params,
            response,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                limit = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : undefined;
                params = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                _context3.next = 4;
                return this.publicGetOrderBook(this.extend({
                  'currency': this.marketId(symbol)
                }, params));

              case 4:
                response = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(response['order-book'], undefined, 'bid', 'ask', 'price', 'order_amount'));

              case 6:
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
            response,
            ticker,
            timestamp,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return this.publicGetStats(this.extend({
                  'currency': this.marketId(symbol)
                }, params));

              case 3:
                response = _context4.sent;
                ticker = response['stats'];
                timestamp = this.milliseconds();
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['max']),
                  'low': parseFloat(ticker['min']),
                  'bid': parseFloat(ticker['bid']),
                  'ask': parseFloat(ticker['ask']),
                  'vwap': undefined,
                  'open': parseFloat(ticker['open']),
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last_price']),
                  'change': parseFloat(ticker['daily_change']),
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': parseFloat(ticker['total_btc_traded'])
                });

              case 7:
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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1d';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [this.parse8601(ohlcv['date'] + ' 00:00:00'), undefined, undefined, undefined, parseFloat(ohlcv['price']), undefined];
    }
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
            response,
            ohlcvs,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                timeframe = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '1d';
                since = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                limit = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : undefined;
                params = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                market = this.market(symbol);
                _context5.next = 7;
                return this.publicGetHistoricalPrices(this.extend({
                  'currency': market['id'],
                  'timeframe': this.timeframes[timeframe]
                }, params));

              case 7:
                response = _context5.sent;
                ohlcvs = this.omit(response['historical-prices'], 'request_currency');
                return _context5.abrupt("return", this.parseOHLCVs(ohlcvs, market, timeframe, since, limit));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOHLCV(_x3) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = parseInt(trade['timestamp']) * 1000;
      return {
        'id': trade['id'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': undefined,
        'type': undefined,
        'side': trade['maker_type'],
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['amount'])
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
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                market = this.market(symbol);
                _context6.next = 6;
                return this.publicGetTransactions(this.extend({
                  'currency': market['id']
                }, params));

              case 6:
                response = _context6.sent;
                trades = this.omit(response['transactions'], 'request_currency');
                return _context6.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchTrades(_x4) {
        return _fetchTrades.apply(this, arguments);
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
            order,
            result,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};
                order = {
                  'side': side,
                  'type': type,
                  'currency': this.marketId(symbol),
                  'amount': amount
                };
                if (type === 'limit') order['limit_price'] = price;
                _context7.next = 6;
                return this.privatePostOrdersNew(this.extend(order, params));

              case 6:
                result = _context7.sent;
                return _context7.abrupt("return", {
                  'info': result,
                  'id': result
                });

              case 8:
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
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                params = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
                _context8.next = 4;
                return this.privatePostOrdersCancel({
                  'id': id
                });

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 5:
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
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(currency, amount, address) {
        var tag,
            params,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                tag = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : undefined;
                params = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : {};
                _context9.next = 4;
                return this.loadMarkets();

              case 4:
                _context9.next = 6;
                return this.privatePostWithdrawalsNew(this.extend({
                  'currency': currency,
                  'amount': parseFloat(amount),
                  'address': address
                }, params));

              case 6:
                response = _context9.sent;
                return _context9.abrupt("return", {
                  'info': response,
                  'id': response['result']['uuid']
                });

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function withdraw(_x10, _x11, _x12) {
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
      if (this.id === 'cryptocapital') throw new ExchangeError(this.id + ' is an abstract base API for _1btcxe');
      var url = this.urls['api'] + '/' + path;

      if (api === 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var query = this.extend({
          'api_key': this.apiKey,
          'nonce': this.nonce()
        }, params);
        var request = this.json(query);
        query['signature'] = this.hmac(this.encode(request), this.encode(this.secret));
        body = this.json(query);
        headers = {
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
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            errors,
            e,
            error,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                api = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 'public';
                method = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 'GET';
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                headers = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : undefined;
                body = _args10.length > 5 && _args10[5] !== undefined ? _args10[5] : undefined;
                _context10.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context10.sent;

                if (!('errors' in response)) {
                  _context10.next = 13;
                  break;
                }

                errors = [];

                for (e = 0; e < response['errors'].length; e++) {
                  error = response['errors'][e];
                  errors.push(error['code'] + ': ' + error['message']);
                }

                errors = errors.join(' ');
                throw new ExchangeError(this.id + ' ' + errors);

              case 13:
                return _context10.abrupt("return", response);

              case 14:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function request(_x13) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return _1btcxe;
}(Exchange);