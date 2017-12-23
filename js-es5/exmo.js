"use strict"; //  ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
  _inherits(exmo, _Exchange);

  function exmo() {
    _classCallCheck(this, exmo);

    return _possibleConstructorReturn(this, (exmo.__proto__ || _Object$getPrototypeOf(exmo)).apply(this, arguments));
  }

  _createClass(exmo, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(exmo.prototype.__proto__ || _Object$getPrototypeOf(exmo.prototype), "describe", this).call(this), {
        'id': 'exmo',
        'name': 'EXMO',
        'countries': ['ES', 'RU'],
        // Spain, Russia
        'rateLimit': 1000,
        // once every 350 ms ≈ 180 requests per minute ≈ 3 requests per second
        'version': 'v1',
        'hasCORS': false,
        'hasFetchTickers': true,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766491-1b0ea956-5eda-11e7-9225-40d67b481b8d.jpg',
          'api': 'https://api.exmo.com',
          'www': 'https://exmo.me',
          'doc': ['https://exmo.me/en/api_doc', 'https://github.com/exmo-dev/exmo_api_lib/tree/master/nodejs']
        },
        'api': {
          'public': {
            'get': ['currency', 'order_book', 'pair_settings', 'ticker', 'trades']
          },
          'private': {
            'post': ['user_info', 'order_create', 'order_cancel', 'user_open_orders', 'user_trades', 'user_cancelled_orders', 'order_trades', 'required_amount', 'deposit_address', 'withdraw_crypt', 'withdraw_get_txid', 'excode_create', 'excode_load', 'wallet_history']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.2 / 100,
            'taker': 0.2 / 100
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
        var markets, keys, result, p, id, market, symbol, _symbol$split, _symbol$split2, base, quote;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetPairSettings();

              case 2:
                markets = _context.sent;
                keys = _Object$keys(markets);
                result = [];

                for (p = 0; p < keys.length; p++) {
                  id = keys[p];
                  market = markets[id];
                  symbol = id.replace('_', '/');
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'limits': {
                      'amount': {
                        'min': market['min_quantity'],
                        'max': market['max_quantity']
                      },
                      'price': {
                        'min': market['min_price'],
                        'max': market['max_price']
                      },
                      'cost': {
                        'min': market['min_amount'],
                        'max': market['max_amount']
                      }
                    },
                    'precision': {
                      'amount': 8,
                      'price': 8
                    },
                    'info': market
                  });
                }

                return _context.abrupt("return", result);

              case 7:
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
                return this.loadMarkets();

              case 3:
                _context2.next = 5;
                return this.privatePostUserInfo();

              case 5:
                response = _context2.sent;
                result = {
                  'info': response
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();
                  if (currency in response['balances']) account['free'] = parseFloat(response['balances'][currency]);
                  if (currency in response['reserved']) account['used'] = parseFloat(response['reserved'][currency]);
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 10:
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
            market,
            response,
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
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetOrderBook(this.extend({
                  'pair': market['id']
                }, params));

              case 6:
                response = _context3.sent;
                orderbook = response[market['id']];
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bid', 'ask'));

              case 9:
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['updated'] * 1000;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high']),
        'low': parseFloat(ticker['low']),
        'bid': parseFloat(ticker['buy_price']),
        'ask': parseFloat(ticker['sell_price']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last_trade']),
        'change': undefined,
        'percentage': undefined,
        'average': parseFloat(ticker['avg']),
        'baseVolume': parseFloat(ticker['vol']),
        'quoteVolume': parseFloat(ticker['vol_curr']),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            response,
            result,
            ids,
            i,
            id,
            market,
            symbol,
            ticker,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                symbols = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : undefined;
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                _context4.next = 6;
                return this.publicGetTicker(params);

              case 6:
                response = _context4.sent;
                result = {};
                ids = _Object$keys(response);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = response[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            response,
            market,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.publicGetTicker(params);

              case 5:
                response = _context5.sent;
                market = this.market(symbol);
                return _context5.abrupt("return", this.parseTicker(response[market['id']], market));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
        'id': trade['trade_id'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': undefined,
        'type': undefined,
        'side': trade['type'],
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['quantity'])
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
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                _context6.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context6.next = 8;
                return this.publicGetTrades(this.extend({
                  'pair': market['id']
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response[market['id']], market, since, limit));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
            prefix,
            order,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                prefix = '';
                if (type == 'market') prefix = 'market_';
                if (typeof price == 'undefined') price = 0;
                order = {
                  'pair': this.marketId(symbol),
                  'quantity': amount,
                  'price': price,
                  'type': prefix + side
                };
                _context7.next = 10;
                return this.privatePostOrderCreate(this.extend(order, params));

              case 10:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['order_id'].toString()
                });

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
                return this.loadMarkets();

              case 4:
                _context8.next = 6;
                return this.privatePostOrderCancel({
                  'order_id': id
                });

              case 6:
                return _context8.abrupt("return", _context8.sent);

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(currency, amount, address) {
        var params,
            result,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 3;
                return this.loadMarkets();

              case 3:
                _context9.next = 5;
                return this.privatePostWithdrawCrypt(this.extend({
                  'amount': amount,
                  'currency': currency,
                  'address': address
                }, params));

              case 5:
                result = _context9.sent;
                return _context9.abrupt("return", {
                  'info': result,
                  'id': result['task_id']
                });

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      var url = this.urls['api'] + '/' + this.version + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'nonce': nonce
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

                if (!('result' in response)) {
                  _context10.next = 12;
                  break;
                }

                if (!response['result']) {
                  _context10.next = 11;
                  break;
                }

                return _context10.abrupt("return", response);

              case 11:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
                return _context10.abrupt("return", response);

              case 13:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function request(_x12) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return exmo;
}(Exchange);