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
  _inherits(paymium, _Exchange);

  function paymium() {
    _classCallCheck(this, paymium);

    return _possibleConstructorReturn(this, (paymium.__proto__ || _Object$getPrototypeOf(paymium)).apply(this, arguments));
  }

  _createClass(paymium, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(paymium.prototype.__proto__ || _Object$getPrototypeOf(paymium.prototype), "describe", this).call(this), {
        'id': 'paymium',
        'name': 'Paymium',
        'countries': ['FR', 'EU'],
        'rateLimit': 2000,
        'version': 'v1',
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27790564-a945a9d4-5ff9-11e7-9d2d-b635763f2f24.jpg',
          'api': 'https://paymium.com/api',
          'www': 'https://www.paymium.com',
          'doc': ['https://github.com/Paymium/api-documentation', 'https://www.paymium.com/page/developers']
        },
        'api': {
          'public': {
            'get': ['countries', 'data/{id}/ticker', 'data/{id}/trades', 'data/{id}/depth', 'bitcoin_charts/{id}/trades', 'bitcoin_charts/{id}/depth']
          },
          'private': {
            'get': ['merchant/get_payment/{UUID}', 'user', 'user/addresses', 'user/addresses/{btc_address}', 'user/orders', 'user/orders/{UUID}', 'user/price_alerts'],
            'post': ['user/orders', 'user/addresses', 'user/payment_requests', 'user/price_alerts', 'merchant/create_payment'],
            'delete': ['user/orders/{UUID}/cancel', 'user/price_alerts/{id}']
          }
        },
        'markets': {
          'BTC/EUR': {
            'id': 'eur',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR'
          }
        },
        'fees': {
          'trading': {
            'maker': 0.0059,
            'taker': 0.0059
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
            balances,
            result,
            currencies,
            i,
            currency,
            lowercase,
            account,
            balance,
            locked,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privateGetUser();

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
                  balance = 'balance_' + lowercase;
                  locked = 'locked_' + lowercase;
                  if (balance in balances) account['free'] = balances[balance];
                  if (locked in balances) account['used'] = balances[locked];
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
            orderbook,
            result,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetDataIdDepth(this.extend({
                  'id': this.marketId(symbol)
                }, params));

              case 3:
                orderbook = _context2.sent;
                result = this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount');
                result['bids'] = this.sortBy(result['bids'], 0, true);
                return _context2.abrupt("return", result);

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
                return this.publicGetDataIdTicker(this.extend({
                  'id': this.marketId(symbol)
                }, params));

              case 3:
                ticker = _context3.sent;
                timestamp = ticker['at'] * 1000;
                vwap = parseFloat(ticker['vwap']);
                baseVolume = parseFloat(ticker['volume']);
                quoteVolume = baseVolume * vwap;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': this.safeFloat(ticker, 'high'),
                  'low': this.safeFloat(ticker, 'low'),
                  'bid': this.safeFloat(ticker, 'bid'),
                  'ask': this.safeFloat(ticker, 'ask'),
                  'vwap': vwap,
                  'open': this.safeFloat(ticker, 'open'),
                  'close': undefined,
                  'first': undefined,
                  'last': this.safeFloat(ticker, 'price'),
                  'change': undefined,
                  'percentage': this.safeFloat(ticker, 'variation'),
                  'average': undefined,
                  'baseVolume': baseVolume,
                  'quoteVolume': quoteVolume,
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
      var timestamp = parseInt(trade['created_at_int']) * 1000;
      var volume = 'traded_' + market['base'].toLowerCase();
      return {
        'info': trade,
        'id': trade['uuid'],
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['side'],
        'price': trade['price'],
        'amount': trade[volume]
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
                return this.publicGetDataIdTrades(this.extend({
                  'id': market['id']
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

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(market, type, side, amount) {
        var price,
            params,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                order = {
                  'type': this.capitalize(type) + 'Order',
                  'currency': this.marketId(market),
                  'direction': side,
                  'amount': amount
                };
                if (type == 'market') order['price'] = price;
                _context5.next = 6;
                return this.privatePostUserOrders(this.extend(order, params));

              case 6:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['uuid']
                });

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
                return this.privatePostCancelOrder(this.extend({
                  'orderNumber': id
                }, params));

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
      var url = this.urls['api'] + '/' + this.version + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        body = this.json(params);
        var nonce = this.nonce().toString();
        var auth = nonce + url + body;
        headers = {
          'Api-Key': this.apiKey,
          'Api-Signature': this.hmac(this.encode(auth), this.secret),
          'Api-Nonce': nonce,
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

                if (!('errors' in response)) {
                  _context7.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context7.abrupt("return", response);

              case 11:
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

  return paymium;
}(Exchange);