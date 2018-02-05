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
  _inherits(coinsecure, _Exchange);

  function coinsecure() {
    _classCallCheck(this, coinsecure);

    return _possibleConstructorReturn(this, (coinsecure.__proto__ || _Object$getPrototypeOf(coinsecure)).apply(this, arguments));
  }

  _createClass(coinsecure, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coinsecure.prototype.__proto__ || _Object$getPrototypeOf(coinsecure.prototype), "describe", this).call(this), {
        'id': 'coinsecure',
        'name': 'Coinsecure',
        'countries': 'IN',
        // India
        'rateLimit': 1000,
        'version': 'v1',
        'has': {
          'CORS': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766472-9cbd200a-5ed9-11e7-9551-2267ad7bac08.jpg',
          'api': 'https://api.coinsecure.in',
          'www': 'https://coinsecure.in',
          'doc': ['https://api.coinsecure.in', 'https://github.com/coinsecure/plugins']
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': false
        },
        'api': {
          'public': {
            'get': ['bitcoin/search/confirmation/{txid}', 'exchange/ask/low', 'exchange/ask/orders', 'exchange/bid/high', 'exchange/bid/orders', 'exchange/lastTrade', 'exchange/max24Hr', 'exchange/min24Hr', 'exchange/ticker', 'exchange/trades']
          },
          'private': {
            'get': ['mfa/authy/call', 'mfa/authy/sms', 'netki/search/{netkiName}', 'user/bank/otp/{number}', 'user/kyc/otp/{number}', 'user/profile/phone/otp/{number}', 'user/wallet/coin/address/{id}', 'user/wallet/coin/deposit/confirmed/all', 'user/wallet/coin/deposit/confirmed/{id}', 'user/wallet/coin/deposit/unconfirmed/all', 'user/wallet/coin/deposit/unconfirmed/{id}', 'user/wallet/coin/wallets', 'user/exchange/bank/fiat/accounts', 'user/exchange/bank/fiat/balance/available', 'user/exchange/bank/fiat/balance/pending', 'user/exchange/bank/fiat/balance/total', 'user/exchange/bank/fiat/deposit/cancelled', 'user/exchange/bank/fiat/deposit/unverified', 'user/exchange/bank/fiat/deposit/verified', 'user/exchange/bank/fiat/withdraw/cancelled', 'user/exchange/bank/fiat/withdraw/completed', 'user/exchange/bank/fiat/withdraw/unverified', 'user/exchange/bank/fiat/withdraw/verified', 'user/exchange/ask/cancelled', 'user/exchange/ask/completed', 'user/exchange/ask/pending', 'user/exchange/bid/cancelled', 'user/exchange/bid/completed', 'user/exchange/bid/pending', 'user/exchange/bank/coin/addresses', 'user/exchange/bank/coin/balance/available', 'user/exchange/bank/coin/balance/pending', 'user/exchange/bank/coin/balance/total', 'user/exchange/bank/coin/deposit/cancelled', 'user/exchange/bank/coin/deposit/unverified', 'user/exchange/bank/coin/deposit/verified', 'user/exchange/bank/coin/withdraw/cancelled', 'user/exchange/bank/coin/withdraw/completed', 'user/exchange/bank/coin/withdraw/unverified', 'user/exchange/bank/coin/withdraw/verified', 'user/exchange/bank/summary', 'user/exchange/coin/fee', 'user/exchange/fiat/fee', 'user/exchange/kycs', 'user/exchange/referral/coin/paid', 'user/exchange/referral/coin/successful', 'user/exchange/referral/fiat/paid', 'user/exchange/referrals', 'user/exchange/trade/summary', 'user/login/token/{token}', 'user/summary', 'user/wallet/summary', 'wallet/coin/withdraw/cancelled', 'wallet/coin/withdraw/completed', 'wallet/coin/withdraw/unverified', 'wallet/coin/withdraw/verified'],
            'post': ['login', 'login/initiate', 'login/password/forgot', 'mfa/authy/initiate', 'mfa/ga/initiate', 'signup', 'user/netki/update', 'user/profile/image/update', 'user/exchange/bank/coin/withdraw/initiate', 'user/exchange/bank/coin/withdraw/newVerifycode', 'user/exchange/bank/fiat/withdraw/initiate', 'user/exchange/bank/fiat/withdraw/newVerifycode', 'user/password/change', 'user/password/reset', 'user/wallet/coin/withdraw/initiate', 'wallet/coin/withdraw/newVerifycode'],
            'put': ['signup/verify/{token}', 'user/exchange/kyc', 'user/exchange/bank/fiat/deposit/new', 'user/exchange/ask/new', 'user/exchange/bid/new', 'user/exchange/instant/buy', 'user/exchange/instant/sell', 'user/exchange/bank/coin/withdraw/verify', 'user/exchange/bank/fiat/account/new', 'user/exchange/bank/fiat/withdraw/verify', 'user/mfa/authy/initiate/enable', 'user/mfa/ga/initiate/enable', 'user/netki/create', 'user/profile/phone/new', 'user/wallet/coin/address/new', 'user/wallet/coin/new', 'user/wallet/coin/withdraw/sendToExchange', 'user/wallet/coin/withdraw/verify'],
            'delete': ['user/gcm/{code}', 'user/logout', 'user/exchange/bank/coin/withdraw/unverified/cancel/{withdrawID}', 'user/exchange/bank/fiat/deposit/cancel/{depositID}', 'user/exchange/ask/cancel/{orderID}', 'user/exchange/bid/cancel/{orderID}', 'user/exchange/bank/fiat/withdraw/unverified/cancel/{withdrawID}', 'user/mfa/authy/disable/{code}', 'user/mfa/ga/disable/{code}', 'user/profile/phone/delete', 'user/profile/image/delete/{netkiName}', 'user/wallet/coin/withdraw/unverified/cancel/{withdrawID}']
          }
        },
        'markets': {
          'BTC/INR': {
            'id': 'BTC/INR',
            'symbol': 'BTC/INR',
            'base': 'BTC',
            'quote': 'INR'
          }
        },
        'fees': {
          'trading': {
            'maker': 0.4 / 100,
            'taker': 0.4 / 100
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
            coin,
            fiat,
            result,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privateGetUserExchangeBankSummary();

              case 3:
                response = _context.sent;
                balance = response['message'];
                coin = {
                  'free': balance['availableCoinBalance'],
                  'used': balance['pendingCoinBalance'],
                  'total': balance['totalCoinBalance']
                };
                fiat = {
                  'free': balance['availableFiatBalance'],
                  'used': balance['pendingFiatBalance'],
                  'total': balance['totalFiatBalance']
                };
                result = {
                  'info': balance,
                  'BTC': coin,
                  'INR': fiat
                };
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
        var limit,
            params,
            bids,
            asks,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                limit = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : undefined;
                params = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return this.publicGetExchangeBidOrders(params);

              case 4:
                bids = _context2.sent;
                _context2.next = 7;
                return this.publicGetExchangeAskOrders(params);

              case 7:
                asks = _context2.sent;
                orderbook = {
                  'bids': bids['message'],
                  'asks': asks['message']
                };
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'rate', 'vol'));

              case 10:
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
            baseVolume,
            satoshi,
            quoteVolume,
            vwap,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetExchangeTicker(params);

              case 3:
                response = _context3.sent;
                ticker = response['message'];
                timestamp = ticker['timestamp'];
                baseVolume = parseFloat(ticker['coinvolume']);

                if (symbol === 'BTC/INR') {
                  satoshi = 0.00000001;
                  baseVolume = baseVolume * satoshi;
                }

                quoteVolume = parseFloat(ticker['fiatvolume']) / 100;
                vwap = quoteVolume / baseVolume;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']) / 100,
                  'low': parseFloat(ticker['low']) / 100,
                  'bid': parseFloat(ticker['bid']) / 100,
                  'ask': parseFloat(ticker['ask']) / 100,
                  'vwap': vwap,
                  'open': parseFloat(ticker['open']) / 100,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['lastPrice']) / 100,
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
      var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = trade['time'];
      var side = trade['ordType'] === 'bid' ? 'buy' : 'sell';
      return {
        'id': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'order': undefined,
        'symbol': symbol,
        'type': undefined,
        'side': side,
        'price': this.safeFloat(trade, 'rate') / 100,
        'amount': this.safeFloat(trade, 'vol') / 100000000,
        'fee': undefined,
        'info': trade
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
            result,
            trades,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                since = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : undefined;
                params = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                _context4.next = 5;
                return this.publicGetExchangeTrades(params);

              case 5:
                result = _context4.sent;

                if (!('message' in result)) {
                  _context4.next = 9;
                  break;
                }

                trades = result['message'];
                return _context4.abrupt("return", this.parseTrades(trades, symbol));

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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(market, type, side, amount) {
        var price,
            params,
            method,
            order,
            direction,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                method = 'privatePutUserExchange';
                order = {};

                if (type === 'market') {
                  method += 'Instant' + this.capitalize(side);
                  if (side === 'buy') order['maxFiat'] = amount;else order['maxVol'] = amount;
                } else {
                  direction = side === 'buy' ? 'Bid' : 'Ask';
                  method += direction + 'New';
                  order['rate'] = price;
                  order['vol'] = amount;
                }

                _context5.next = 7;
                return this[method](this.extend(order, params));

              case 7:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['message']['orderID']
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
                throw new ExchangeError(this.id + ' cancelOrder () is not fully implemented yet');

              case 3:
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

      if (api === 'private') {
        this.checkRequiredCredentials();
        headers = {
          'Authorization': this.apiKey
        };

        if (_Object$keys(query).length) {
          body = this.json(query);
          headers['Content-Type'] = 'application/json';
        }
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code === 200) {
        if (body[0] === '{' || body[0] === '[') {
          var response = JSON.parse(body);

          if ('success' in response) {
            var success = response['success'];

            if (!success) {
              throw new ExchangeError(this.id + ' error returned: ' + body);
            }

            if (!('message' in response)) {
              throw new ExchangeError(this.id + ' malformed response: no "message" in response: ' + body);
            }
          } else {
            throw new ExchangeError(this.id + ' malformed response: no "success" in response: ' + body);
          }
        } else {
          // if not a JSON response
          throw new ExchangeError(this.id + ' returned a non-JSON reply: ' + body);
        }
      }
    }
  }]);

  return coinsecure;
}(Exchange);