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
  _inherits(bxinth, _Exchange);

  function bxinth() {
    _classCallCheck(this, bxinth);

    return _possibleConstructorReturn(this, (bxinth.__proto__ || _Object$getPrototypeOf(bxinth)).apply(this, arguments));
  }

  _createClass(bxinth, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bxinth.prototype.__proto__ || _Object$getPrototypeOf(bxinth.prototype), "describe", this).call(this), {
        'id': 'bxinth',
        'name': 'BX.in.th',
        'countries': 'TH',
        // Thailand
        'rateLimit': 1500,
        'hasCORS': false,
        'hasFetchTickers': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766412-567b1eb4-5ed7-11e7-94a8-ff6a3884f6c5.jpg',
          'api': 'https://bx.in.th/api',
          'www': 'https://bx.in.th',
          'doc': 'https://bx.in.th/info/api'
        },
        'api': {
          'public': {
            'get': ['', // ticker
            'options', 'optionbook', 'orderbook', 'pairing', 'trade', 'tradehistory']
          },
          'private': {
            'post': ['balance', 'biller', 'billgroup', 'billpay', 'cancel', 'deposit', 'getorders', 'history', 'option-issue', 'option-bid', 'option-sell', 'option-myissue', 'option-mybid', 'option-myoptions', 'option-exercise', 'option-cancel', 'option-history', 'order', 'withdrawal', 'withdrawal-history']
          }
        },
        'fees': {
          'trading': {
            'taker': 0.25 / 100,
            'maker': 0.25 / 100
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
        var markets, keys, result, p, market, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetPairing();

              case 2:
                markets = _context.sent;
                keys = _Object$keys(markets);
                result = [];

                for (p = 0; p < keys.length; p++) {
                  market = markets[keys[p]];
                  id = market['pairing_id'].toString();
                  base = market['secondary_currency'];
                  quote = market['primary_currency'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
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
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      // why would they use three letters instead of four for currency codes
      if (currency == 'DAS') return 'DASH';
      if (currency == 'DOG') return 'DOGE';
      return currency;
    }
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
            c,
            currency,
            code,
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
                return this.privatePostBalance();

              case 5:
                response = _context2.sent;
                balance = response['balance'];
                result = {
                  'info': balance
                };
                currencies = _Object$keys(balance);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  code = this.commonCurrencyCode(currency);
                  account = {
                    'free': parseFloat(balance[currency]['available']),
                    'used': 0.0,
                    'total': parseFloat(balance[currency]['total'])
                  };
                  account['used'] = account['total'] - account['free'];
                  result[code] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 11:
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
                _context3.next = 5;
                return this.publicGetOrderbook(this.extend({
                  'pairing': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook));

              case 7:
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
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': undefined,
        'low': undefined,
        'bid': parseFloat(ticker['orderbook']['bids']['highbid']),
        'ask': parseFloat(ticker['orderbook']['asks']['highbid']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last_price']),
        'change': parseFloat(ticker['change']),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['volume_24hours']),
        'quoteVolume': undefined,
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
            tickers,
            result,
            ids,
            i,
            id,
            ticker,
            market,
            symbol,
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
                return this.publicGet(params);

              case 6:
                tickers = _context4.sent;
                result = {};
                ids = _Object$keys(tickers);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  ticker = tickers[id];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
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
            market,
            tickers,
            id,
            ticker,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context5.next = 6;
                return this.publicGet(this.extend({
                  'pairing': market['id']
                }, params));

              case 6:
                tickers = _context5.sent;
                id = market['id'].toString();
                ticker = tickers[id];
                return _context5.abrupt("return", this.parseTicker(ticker, market));

              case 10:
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
      var timestamp = this.parse8601(trade['trade_date']);
      return {
        'id': trade['trade_id'],
        'info': trade,
        'order': trade['order_id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['trade_type'],
        'price': parseFloat(trade['rate']),
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
                return this.publicGetTrade(this.extend({
                  'pairing': market['id']
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['trades'], market, since, limit));

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
                _context7.next = 6;
                return this.privatePostOrder(this.extend({
                  'pairing': this.marketId(symbol),
                  'type': side,
                  'amount': amount,
                  'rate': price
                }, params));

              case 6:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['order_id'].toString()
                });

              case 8:
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
            pairing,
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
                pairing = undefined; // TODO fixme

                _context8.next = 7;
                return this.privatePostCancel({
                  'order_id': id,
                  'pairing': pairing
                });

              case 7:
                return _context8.abrupt("return", _context8.sent);

              case 8:
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'] + '/';
      if (path) url += path + '/';
      if (_Object$keys(params).length) url += '?' + this.urlencode(params);

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var auth = this.apiKey + nonce.toString() + this.secret;
        var signature = this.hash(this.encode(auth), 'sha256');
        body = this.urlencode(this.extend({
          'key': this.apiKey,
          'nonce': nonce,
          'signature': signature // twofa: this.twofa,

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

                if (!(api == 'public')) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt("return", response);

              case 10:
                if (!('success' in response)) {
                  _context9.next = 13;
                  break;
                }

                if (!response['success']) {
                  _context9.next = 13;
                  break;
                }

                return _context9.abrupt("return", response);

              case 13:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bxinth;
}(Exchange);