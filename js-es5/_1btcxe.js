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
        'hasCORS': true,
        'hasFetchOHLCV': true,
        'hasWithdraw': true,
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
        },
        'markets': {
          'BTC/USD': {
            'id': 'USD',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD'
          },
          'BTC/EUR': {
            'id': 'EUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR'
          },
          'BTC/CNY': {
            'id': 'CNY',
            'symbol': 'BTC/CNY',
            'base': 'BTC',
            'quote': 'CNY'
          },
          'BTC/RUB': {
            'id': 'RUB',
            'symbol': 'BTC/RUB',
            'base': 'BTC',
            'quote': 'RUB'
          },
          'BTC/CHF': {
            'id': 'CHF',
            'symbol': 'BTC/CHF',
            'base': 'BTC',
            'quote': 'CHF'
          },
          'BTC/JPY': {
            'id': 'JPY',
            'symbol': 'BTC/JPY',
            'base': 'BTC',
            'quote': 'JPY'
          },
          'BTC/GBP': {
            'id': 'GBP',
            'symbol': 'BTC/GBP',
            'base': 'BTC',
            'quote': 'GBP'
          },
          'BTC/CAD': {
            'id': 'CAD',
            'symbol': 'BTC/CAD',
            'base': 'BTC',
            'quote': 'CAD'
          },
          'BTC/AUD': {
            'id': 'AUD',
            'symbol': 'BTC/AUD',
            'base': 'BTC',
            'quote': 'AUD'
          },
          'BTC/AED': {
            'id': 'AED',
            'symbol': 'BTC/AED',
            'base': 'BTC',
            'quote': 'AED'
          },
          'BTC/BGN': {
            'id': 'BGN',
            'symbol': 'BTC/BGN',
            'base': 'BTC',
            'quote': 'BGN'
          },
          'BTC/CZK': {
            'id': 'CZK',
            'symbol': 'BTC/CZK',
            'base': 'BTC',
            'quote': 'CZK'
          },
          'BTC/DKK': {
            'id': 'DKK',
            'symbol': 'BTC/DKK',
            'base': 'BTC',
            'quote': 'DKK'
          },
          'BTC/HKD': {
            'id': 'HKD',
            'symbol': 'BTC/HKD',
            'base': 'BTC',
            'quote': 'HKD'
          },
          'BTC/HRK': {
            'id': 'HRK',
            'symbol': 'BTC/HRK',
            'base': 'BTC',
            'quote': 'HRK'
          },
          'BTC/HUF': {
            'id': 'HUF',
            'symbol': 'BTC/HUF',
            'base': 'BTC',
            'quote': 'HUF'
          },
          'BTC/ILS': {
            'id': 'ILS',
            'symbol': 'BTC/ILS',
            'base': 'BTC',
            'quote': 'ILS'
          },
          'BTC/INR': {
            'id': 'INR',
            'symbol': 'BTC/INR',
            'base': 'BTC',
            'quote': 'INR'
          },
          'BTC/MUR': {
            'id': 'MUR',
            'symbol': 'BTC/MUR',
            'base': 'BTC',
            'quote': 'MUR'
          },
          'BTC/MXN': {
            'id': 'MXN',
            'symbol': 'BTC/MXN',
            'base': 'BTC',
            'quote': 'MXN'
          },
          'BTC/NOK': {
            'id': 'NOK',
            'symbol': 'BTC/NOK',
            'base': 'BTC',
            'quote': 'NOK'
          },
          'BTC/NZD': {
            'id': 'NZD',
            'symbol': 'BTC/NZD',
            'base': 'BTC',
            'quote': 'NZD'
          },
          'BTC/PLN': {
            'id': 'PLN',
            'symbol': 'BTC/PLN',
            'base': 'BTC',
            'quote': 'PLN'
          },
          'BTC/RON': {
            'id': 'RON',
            'symbol': 'BTC/RON',
            'base': 'BTC',
            'quote': 'RON'
          },
          'BTC/SEK': {
            'id': 'SEK',
            'symbol': 'BTC/SEK',
            'base': 'BTC',
            'quote': 'SEK'
          },
          'BTC/SGD': {
            'id': 'SGD',
            'symbol': 'BTC/SGD',
            'base': 'BTC',
            'quote': 'SGD'
          },
          'BTC/THB': {
            'id': 'THB',
            'symbol': 'BTC/THB',
            'base': 'BTC',
            'quote': 'THB'
          },
          'BTC/TRY': {
            'id': 'TRY',
            'symbol': 'BTC/TRY',
            'base': 'BTC',
            'quote': 'TRY'
          },
          'BTC/ZAR': {
            'id': 'ZAR',
            'symbol': 'BTC/ZAR',
            'base': 'BTC',
            'quote': 'ZAR'
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
                return this.privatePostBalancesAndInfo();

              case 3:
                response = _context.sent;
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
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetOrderBook(this.extend({
                  'currency': this.marketId(symbol)
                }, params));

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(response['order-book'], undefined, 'bid', 'ask', 'price', 'order_amount'));

              case 5:
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
                return this.publicGetStats(this.extend({
                  'currency': this.marketId(symbol)
                }, params));

              case 3:
                response = _context3.sent;
                ticker = response['stats'];
                timestamp = this.milliseconds();
                return _context3.abrupt("return", {
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            response,
            ohlcvs,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                timeframe = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : '1d';
                since = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : undefined;
                limit = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : undefined;
                params = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : {};
                market = this.market(symbol);
                _context4.next = 7;
                return this.publicGetHistoricalPrices(this.extend({
                  'currency': market['id'],
                  'timeframe': this.timeframes[timeframe]
                }, params));

              case 7:
                response = _context4.sent;
                ohlcvs = this.omit(response['historical-prices'], 'request_currency');
                return _context4.abrupt("return", this.parseOHLCVs(ohlcvs, market, timeframe, since, limit));

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            trades,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                market = this.market(symbol);
                _context5.next = 6;
                return this.publicGetTransactions(this.extend({
                  'currency': market['id']
                }, params));

              case 6:
                response = _context5.sent;
                trades = this.omit(response['transactions'], 'request_currency');
                return _context5.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
                order = {
                  'side': side,
                  'type': type,
                  'currency': this.marketId(symbol),
                  'amount': amount
                };
                if (type == 'limit') order['limit_price'] = price;
                _context6.next = 6;
                return this.privatePostOrdersNew(this.extend(order, params));

              case 6:
                result = _context6.sent;
                return _context6.abrupt("return", {
                  'info': result,
                  'id': result
                });

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
                return this.privatePostOrdersCancel({
                  'id': id
                });

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 5:
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
                return this.privatePostWithdrawalsNew(this.extend({
                  'currency': currency,
                  'amount': parseFloat(amount),
                  'address': address
                }, params));

              case 5:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['result']['uuid']
                });

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      if (this.id == 'cryptocapital') throw new ExchangeError(this.id + ' is an abstract base API for _1btcxe');
      var url = this.urls['api'] + '/' + path;

      if (api == 'public') {
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
      _regeneratorRuntime.mark(function _callee9(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            errors,
            e,
            error,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                api = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'public';
                method = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'GET';
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                headers = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                body = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : undefined;
                _context9.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context9.sent;

                if (!('errors' in response)) {
                  _context9.next = 13;
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
                return _context9.abrupt("return", response);

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function request(_x13) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return _1btcxe;
}(Exchange);