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
  _inherits(quadrigacx, _Exchange);

  function quadrigacx() {
    _classCallCheck(this, quadrigacx);

    return _possibleConstructorReturn(this, (quadrigacx.__proto__ || _Object$getPrototypeOf(quadrigacx)).apply(this, arguments));
  }

  _createClass(quadrigacx, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(quadrigacx.prototype.__proto__ || _Object$getPrototypeOf(quadrigacx.prototype), "describe", this).call(this), {
        'id': 'quadrigacx',
        'name': 'QuadrigaCX',
        'countries': 'CA',
        'rateLimit': 1000,
        'version': 'v2',
        'hasCORS': true,
        // obsolete metainfo interface
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
          'withdraw': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766825-98a6d0de-5ee7-11e7-9fa4-38e11a2c6f52.jpg',
          'api': 'https://api.quadrigacx.com',
          'www': 'https://www.quadrigacx.com',
          'doc': 'https://www.quadrigacx.com/api_info'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['order_book', 'ticker', 'transactions']
          },
          'private': {
            'post': ['balance', 'bitcoin_deposit_address', 'bitcoin_withdrawal', 'buy', 'cancel_order', 'ether_deposit_address', 'ether_withdrawal', 'lookup_order', 'open_orders', 'sell', 'user_transactions']
          }
        },
        'markets': {
          'BTC/CAD': {
            'id': 'btc_cad',
            'symbol': 'BTC/CAD',
            'base': 'BTC',
            'quote': 'CAD',
            'maker': 0.005,
            'taker': 0.005
          },
          'BTC/USD': {
            'id': 'btc_usd',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD',
            'maker': 0.005,
            'taker': 0.005
          },
          'ETH/BTC': {
            'id': 'eth_btc',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'maker': 0.002,
            'taker': 0.002
          },
          'ETH/CAD': {
            'id': 'eth_cad',
            'symbol': 'ETH/CAD',
            'base': 'ETH',
            'quote': 'CAD',
            'maker': 0.005,
            'taker': 0.005
          },
          'LTC/CAD': {
            'id': 'ltc_cad',
            'symbol': 'LTC/CAD',
            'base': 'LTC',
            'quote': 'CAD',
            'maker': 0.005,
            'taker': 0.005
          },
          'BCH/CAD': {
            'id': 'btc_cad',
            'symbol': 'BCH/CAD',
            'base': 'BCH',
            'quote': 'CAD',
            'maker': 0.005,
            'taker': 0.005
          },
          'BTG/CAD': {
            'id': 'btg_cad',
            'symbol': 'BTG/CAD',
            'base': 'BTG',
            'quote': 'CAD',
            'maker': 0.005,
            'taker': 0.005
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
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostBalance();

              case 3:
                balances = _context.sent;
                result = {
                  'info': balances
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = {
                    'free': parseFloat(balances[lowercase + '_available']),
                    'used': parseFloat(balances[lowercase + '_reserved']),
                    'total': parseFloat(balances[lowercase + '_balance'])
                  };
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
            timestamp,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetOrderBook(this.extend({
                  'book': this.marketId(symbol)
                }, params));

              case 3:
                orderbook = _context2.sent;
                timestamp = parseInt(orderbook['timestamp']) * 1000;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, timestamp));

              case 6:
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
                return this.publicGetTicker(this.extend({
                  'book': this.marketId(symbol)
                }, params));

              case 3:
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
                  'open': undefined,
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
      var timestamp = parseInt(trade['date']) * 1000;
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': trade['tid'].toString(),
        'order': undefined,
        'type': undefined,
        'side': trade['side'],
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
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetTransactions(this.extend({
                  'book': market['id']
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
                  'amount': amount,
                  'book': this.marketId(symbol)
                };
                if (type == 'limit') order['price'] = price;
                _context5.next = 7;
                return this[method](this.extend(order, params));

              case 7:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['id'].toString()
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
                return this.privatePostCancelOrder(this.extend({
                  'id': id
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
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(currency) {
        var params,
            method,
            response,
            address,
            status,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                method = 'privatePost' + this.getCurrencyName(currency) + 'DepositAddress';
                _context7.next = 4;
                return this[method](params);

              case 4:
                response = _context7.sent;
                address = undefined;
                status = undefined; // [E|e]rror

                if (response.indexOf('rror') >= 0) {
                  status = 'error';
                } else {
                  address = response;
                  status = 'ok';
                }

                return _context7.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': status,
                  'info': this.last_http_response
                });

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchDepositAddress(_x9) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "getCurrencyName",
    value: function getCurrencyName(currency) {
      if (currency == 'ETH') return 'Ether';
      if (currency == 'BTC') return 'Bitcoin';
    }
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(currency, amount, address) {
        var params,
            request,
            method,
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
                request = {
                  'amount': amount,
                  'address': address
                };
                method = 'privatePost' + this.getCurrencyName(currency) + 'Withdrawal';
                _context8.next = 7;
                return this[method](this.extend(request, params));

              case 7:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 9:
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
      var url = this.urls['api'] + '/' + this.version + '/' + path;

      if (api == 'public') {
        url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var request = [nonce.toString(), this.uid, this.apiKey].join('');
        var signature = this.hmac(this.encode(request), this.encode(this.secret));
        var query = this.extend({
          'key': this.apiKey,
          'nonce': nonce,
          'signature': signature
        }, params);
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

                if (!(typeof response == 'string')) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt("return", response);

              case 10:
                if (!('error' in response)) {
                  _context9.next = 12;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
                return _context9.abrupt("return", response);

              case 13:
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

  return quadrigacx;
}(Exchange);