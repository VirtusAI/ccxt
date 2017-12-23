"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var Exchange = require('./base/Exchange'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(vaultoro, _Exchange);

  function vaultoro() {
    _classCallCheck(this, vaultoro);

    return _possibleConstructorReturn(this, (vaultoro.__proto__ || _Object$getPrototypeOf(vaultoro)).apply(this, arguments));
  }

  _createClass(vaultoro, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(vaultoro.prototype.__proto__ || _Object$getPrototypeOf(vaultoro.prototype), "describe", this).call(this), {
        'id': 'vaultoro',
        'name': 'Vaultoro',
        'countries': 'CH',
        'rateLimit': 1000,
        'version': '1',
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766880-f205e870-5ee9-11e7-8fe2-0d5b15880752.jpg',
          'api': 'https://api.vaultoro.com',
          'www': 'https://www.vaultoro.com',
          'doc': 'https://api.vaultoro.com'
        },
        'api': {
          'public': {
            'get': ['bidandask', 'buyorders', 'latest', 'latesttrades', 'markets', 'orderbook', 'sellorders', 'transactions/day', 'transactions/hour', 'transactions/month']
          },
          'private': {
            'get': ['balance', 'mytrades', 'orders'],
            'post': ['buy/{symbol}/{type}', 'cancel/{id}', 'sell/{symbol}/{type}', 'withdraw']
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
        var result, markets, market, base, quote, symbol, baseId, quoteId, id;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = [];
                _context.next = 3;
                return this.publicGetMarkets();

              case 3:
                markets = _context.sent;
                market = markets['data'];
                base = market['BaseCurrency'];
                quote = market['MarketCurrency'];
                symbol = base + '/' + quote;
                baseId = base;
                quoteId = quote;
                id = market['MarketName'];
                result.push({
                  'id': id,
                  'symbol': symbol,
                  'base': base,
                  'quote': quote,
                  'baseId': baseId,
                  'quoteId': quoteId,
                  'info': market
                });
                return _context.abrupt("return", result);

              case 13:
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
            uppercase,
            free,
            used,
            total,
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
                return this.privateGetBalance();

              case 5:
                response = _context2.sent;
                balances = response['data'];
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency_code'];
                  uppercase = currency.toUpperCase();
                  free = balance['cash'];
                  used = balance['reserved'];
                  total = this.sum(free, used);
                  account = {
                    'free': free,
                    'used': used,
                    'total': total
                  };
                  result[uppercase] = account;
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
            response,
            orderbook,
            result,
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
                return this.publicGetOrderbook(params);

              case 5:
                response = _context3.sent;
                orderbook = {
                  'bids': response['data'][0]['b'],
                  'asks': response['data'][1]['s']
                };
                result = this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'Gold_Price', 'Gold_Amount');
                result['bids'] = this.sortBy(result['bids'], 0, true);
                return _context3.abrupt("return", result);

              case 10:
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
            quote,
            bidsLength,
            bid,
            ask,
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
                return this.loadMarkets();

              case 3:
                _context4.next = 5;
                return this.publicGetBidandask(params);

              case 5:
                quote = _context4.sent;
                bidsLength = quote['bids'].length;
                bid = quote['bids'][bidsLength - 1];
                ask = quote['asks'][0];
                _context4.next = 11;
                return this.publicGetMarkets(params);

              case 11:
                response = _context4.sent;
                ticker = response['data'];
                timestamp = this.milliseconds();
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['24hHigh']),
                  'low': parseFloat(ticker['24hLow']),
                  'bid': bid[0],
                  'ask': ask[0],
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['LastPrice']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': parseFloat(ticker['24hVolume']),
                  'info': ticker
                });

              case 15:
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
      var timestamp = this.parse8601(trade['Time']);
      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': undefined,
        'type': undefined,
        'side': undefined,
        'price': trade['Gold_Price'],
        'amount': trade['Gold_Amount']
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
                return this.publicGetTransactionsDay(params);

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
            market,
            method,
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
                market = this.market(symbol);
                method = 'privatePost' + this.capitalize(side) + 'SymbolType';
                _context6.next = 8;
                return this[method](this.extend({
                  'symbol': market['quoteId'].toLowerCase(),
                  'type': type,
                  'gld': amount,
                  'price': price || 1
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['data']['Order_ID']
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
                _context7.next = 6;
                return this.privatePostCancelId(this.extend({
                  'id': id
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'] + '/';

      if (api == 'public') {
        url += path;
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        url += this.version + '/' + this.implodeParams(path, params);
        var query = this.extend({
          'nonce': nonce,
          'apikey': this.apiKey
        }, this.omit(params, this.extractParams(path)));
        url += '?' + this.urlencode(query);
        headers = {
          'Content-Type': 'application/json',
          'X-Signature': this.hmac(this.encode(url), this.encode(this.secret))
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

  return vaultoro;
}(Exchange);