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

var Exchange = require('./base/Exchange');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(flowbtc, _Exchange);

  function flowbtc() {
    _classCallCheck(this, flowbtc);

    return _possibleConstructorReturn(this, (flowbtc.__proto__ || _Object$getPrototypeOf(flowbtc)).apply(this, arguments));
  }

  _createClass(flowbtc, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(flowbtc.prototype.__proto__ || _Object$getPrototypeOf(flowbtc.prototype), "describe", this).call(this), {
        'id': 'flowbtc',
        'name': 'flowBTC',
        'countries': 'BR',
        // Brazil
        'version': 'v1',
        'rateLimit': 1000,
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28162465-cd815d4c-67cf-11e7-8e57-438bea0523a2.jpg',
          'api': 'https://api.flowbtc.com:8400/ajax',
          'www': 'https://trader.flowbtc.com',
          'doc': 'http://www.flowbtc.com.br/api/'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'post': ['GetTicker', 'GetTrades', 'GetTradesByDate', 'GetOrderBook', 'GetProductPairs', 'GetProducts']
          },
          'private': {
            'post': ['CreateAccount', 'GetUserInfo', 'SetUserInfo', 'GetAccountInfo', 'GetAccountTrades', 'GetDepositAddresses', 'Withdraw', 'CreateOrder', 'ModifyOrder', 'CancelOrder', 'CancelAllOrders', 'GetAccountOpenOrders', 'GetOrderFee']
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
        var response, markets, result, p, market, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicPostGetProductPairs();

              case 2:
                response = _context.sent;
                markets = response['productPairs'];
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['name'];
                  base = market['product1Label'];
                  quote = market['product2Label'];
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
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
            balances,
            result,
            b,
            balance,
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
                return this.privatePostGetAccountInfo();

              case 5:
                response = _context2.sent;
                balances = response['currencies'];
                result = {
                  'info': response
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['name'];
                  account = {
                    'free': balance['balance'],
                    'used': balance['hold'],
                    'total': 0.0
                  };
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
                return this.publicPostGetOrderBook(this.extend({
                  'productPair': market['id']
                }, params));

              case 6:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'px', 'qty'));

              case 8:
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
            market,
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
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicPostGetTicker(this.extend({
                  'productPair': market['id']
                }, params));

              case 6:
                ticker = _context4.sent;
                timestamp = this.milliseconds();
                return _context4.abrupt("return", {
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
                  'baseVolume': parseFloat(ticker['volume24hr']),
                  'quoteVolume': parseFloat(ticker['volume24hrProduct2']),
                  'info': ticker
                });

              case 9:
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
    value: function parseTrade(trade, market) {
      var timestamp = trade['unixtime'] * 1000;
      var side = trade['incomingOrderSide'] == 0 ? 'buy' : 'sell';
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': trade['tid'].toString(),
        'order': undefined,
        'type': undefined,
        'side': side,
        'price': trade['px'],
        'amount': trade['qty']
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
                return this.publicPostGetTrades(this.extend({
                  'ins': market['id'],
                  'startIndex': -1
                }, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response['trades'], market, since, limit));

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
            orderType,
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
                orderType = type == 'market' ? 1 : 0;
                order = {
                  'ins': this.marketId(symbol),
                  'side': side,
                  'orderType': orderType,
                  'qty': amount,
                  'px': price
                };
                _context6.next = 8;
                return this.privatePostCreateOrder(this.extend(order, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['serverOrderId']
                });

              case 10:
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
                if (!('ins' in params)) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 7;
                return this.privatePostCancelOrder(this.extend({
                  'serverOrderId': id
                }, params));

              case 7:
                return _context7.abrupt("return", _context7.sent);

              case 8:
                throw new ExchangeError(this.id + ' requires `ins` symbol parameter for cancelling an order');

              case 9:
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'] + '/' + this.version + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) {
          body = this.json(params);
        }
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var auth = nonce.toString() + this.uid + this.apiKey;
        var signature = this.hmac(this.encode(auth), this.encode(this.secret));
        body = this.json(this.extend({
          'apiKey': this.apiKey,
          'apiNonce': nonce,
          'apiSig': signature.toUpperCase()
        }, params));
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
                api = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 'public';
                method = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 'GET';
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                headers = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                body = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : undefined;
                _context8.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context8.sent;

                if (!('isAccepted' in response)) {
                  _context8.next = 11;
                  break;
                }

                if (!response['isAccepted']) {
                  _context8.next = 11;
                  break;
                }

                return _context8.abrupt("return", response);

              case 11:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return flowbtc;
}(Exchange);