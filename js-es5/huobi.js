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
  _inherits(huobi, _Exchange);

  function huobi() {
    _classCallCheck(this, huobi);

    return _possibleConstructorReturn(this, (huobi.__proto__ || _Object$getPrototypeOf(huobi)).apply(this, arguments));
  }

  _createClass(huobi, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(huobi.prototype.__proto__ || _Object$getPrototypeOf(huobi.prototype), "describe", this).call(this), {
        'id': 'huobi',
        'name': 'Huobi',
        'countries': 'CN',
        'rateLimit': 2000,
        'version': 'v3',
        'hasCORS': false,
        'hasFetchOHLCV': true,
        'timeframes': {
          '1m': '001',
          '5m': '005',
          '15m': '015',
          '30m': '030',
          '1h': '060',
          '1d': '100',
          '1w': '200',
          '1M': '300',
          '1y': '400'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766569-15aa7b9a-5edd-11e7-9e7f-44791f4ee49c.jpg',
          'api': 'http://api.huobi.com',
          'www': 'https://www.huobi.com',
          'doc': 'https://github.com/huobiapi/API_Docs_en/wiki'
        },
        'api': {
          'staticmarket': {
            'get': ['{id}_kline_{period}', 'ticker_{id}', 'depth_{id}', 'depth_{id}_{length}', 'detail_{id}']
          },
          'usdmarket': {
            'get': ['{id}_kline_{period}', 'ticker_{id}', 'depth_{id}', 'depth_{id}_{length}', 'detail_{id}']
          },
          'trade': {
            'post': ['get_account_info', 'get_orders', 'order_info', 'buy', 'sell', 'buy_market', 'sell_market', 'cancel_order', 'get_new_deal_orders', 'get_order_id_by_trade_id', 'withdraw_coin', 'cancel_withdraw_coin', 'get_withdraw_coin_result', 'transfer', 'loan', 'repayment', 'get_loan_available', 'get_loans']
          }
        },
        'markets': {
          'BTC/CNY': {
            'id': 'btc',
            'symbol': 'BTC/CNY',
            'base': 'BTC',
            'quote': 'CNY',
            'type': 'staticmarket',
            'coinType': 1
          },
          'LTC/CNY': {
            'id': 'ltc',
            'symbol': 'LTC/CNY',
            'base': 'LTC',
            'quote': 'CNY',
            'type': 'staticmarket',
            'coinType': 2
          } // 'BTC/USD': { 'id': 'btc', 'symbol': 'BTC/USD', 'base': 'BTC', 'quote': 'USD', 'type': 'usdmarket',    'coinType': 1 },

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
            currencies,
            i,
            currency,
            lowercase,
            account,
            available,
            frozen,
            loan,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.tradePostGetAccountInfo();

              case 3:
                balances = _context.sent;
                result = {
                  'info': balances
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = this.account();
                  available = 'available_' + lowercase + '_display';
                  frozen = 'frozen_' + lowercase + '_display';
                  loan = 'loan_' + lowercase + '_display';
                  if (available in balances) account['free'] = parseFloat(balances[available]);
                  if (frozen in balances) account['used'] = parseFloat(balances[frozen]);
                  if (loan in balances) account['used'] = this.sum(account['used'], parseFloat(balances[loan]));
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 8:
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
            method,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                method = market['type'] + 'GetDepthId';
                _context2.next = 5;
                return this[method](this.extend({
                  'id': market['id']
                }, params));

              case 5:
                orderbook = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(orderbook));

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
            market,
            method,
            response,
            ticker,
            timestamp,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                market = this.market(symbol);
                method = market['type'] + 'GetTickerId';
                _context3.next = 5;
                return this[method](this.extend({
                  'id': market['id']
                }, params));

              case 5:
                response = _context3.sent;
                ticker = response['ticker'];
                timestamp = parseInt(response['time']) * 1000;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': this.safeFloat(ticker, 'high'),
                  'low': this.safeFloat(ticker, 'low'),
                  'bid': this.safeFloat(ticker, 'buy'),
                  'ask': this.safeFloat(ticker, 'sell'),
                  'vwap': undefined,
                  'open': this.safeFloat(ticker, 'open'),
                  'close': undefined,
                  'first': undefined,
                  'last': this.safeFloat(ticker, 'last'),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': this.safeFloat(ticker, 'vol'),
                  'info': ticker
                });

              case 9:
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
      var timestamp = trade['ts'];
      return {
        'info': trade,
        'id': trade['id'].toString(),
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['direction'],
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
            method,
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
                method = market['type'] + 'GetDetailId';
                _context4.next = 7;
                return this[method](this.extend({
                  'id': market['id']
                }, params));

              case 7:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response['trades'], market, since, limit));

              case 9:
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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      // not implemented yet
      return [ohlcv[0], ohlcv[1], ohlcv[2], ohlcv[3], ohlcv[4], ohlcv[6]];
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
            method,
            ohlcvs,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                timeframe = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '1m';
                since = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                limit = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : undefined;
                params = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                market = this.market(symbol);
                method = market['type'] + 'GetIdKlinePeriod';
                _context5.next = 8;
                return this[method](this.extend({
                  'id': market['id'],
                  'period': this.timeframes[timeframe]
                }, params));

              case 8:
                ohlcvs = _context5.sent;
                return _context5.abrupt("return", ohlcvs);

              case 10:
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            market,
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
                market = this.market(symbol);
                method = 'tradePost' + this.capitalize(side);
                order = {
                  'coin_type': market['coinType'],
                  'amount': amount,
                  'market': market['quote'].toLowerCase()
                };
                if (type == 'limit') order['price'] = price;else method += this.capitalize(type);
                response = this[method](this.extend(order, params));
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['id']
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
                return this.tradePostCancelOrder({
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'];

      if (api == 'trade') {
        this.checkRequiredCredentials();
        url += '/api' + this.version;
        var query = this.keysort(this.extend({
          'method': path,
          'access_key': this.apiKey,
          'created': this.nonce()
        }, params));
        var queryString = this.urlencode(this.omit(query, 'market')); // secret key must be appended to the query before signing

        queryString += '&secret_key=' + this.secret;
        query['sign'] = this.hash(this.encode(queryString));
        body = this.urlencode(query);
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      } else {
        url += '/' + api + '/' + this.implodeParams(path, params) + '_json.js';

        var _query = this.omit(params, this.extractParams(path));

        if (_Object$keys(_query).length) url += '?' + this.urlencode(_query);
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
      _regeneratorRuntime.mark(function _callee8(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                api = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 'trade';
                method = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 'GET';
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                headers = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                body = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : undefined;
                _context8.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context8.sent;

                if (!('status' in response)) {
                  _context8.next = 11;
                  break;
                }

                if (!(response['status'] == 'error')) {
                  _context8.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                if (!('code' in response)) {
                  _context8.next = 13;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 13:
                return _context8.abrupt("return", response);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return huobi;
}(Exchange);