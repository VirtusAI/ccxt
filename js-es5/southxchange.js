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

var Exchange = require('./base/Exchange'); //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(southxchange, _Exchange);

  function southxchange() {
    _classCallCheck(this, southxchange);

    return _possibleConstructorReturn(this, (southxchange.__proto__ || _Object$getPrototypeOf(southxchange)).apply(this, arguments));
  }

  _createClass(southxchange, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(southxchange.prototype.__proto__ || _Object$getPrototypeOf(southxchange.prototype), "describe", this).call(this), {
        'id': 'southxchange',
        'name': 'SouthXchange',
        'countries': 'AR',
        // Argentina
        'rateLimit': 1000,
        'hasFetchTickers': true,
        'hasCORS': false,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27838912-4f94ec8a-60f6-11e7-9e5d-bbf9bd50a559.jpg',
          'api': 'https://www.southxchange.com/api',
          'www': 'https://www.southxchange.com',
          'doc': 'https://www.southxchange.com/Home/Api'
        },
        'api': {
          'public': {
            'get': ['markets', 'price/{symbol}', 'prices', 'book/{symbol}', 'trades/{symbol}']
          },
          'private': {
            'post': ['cancelMarketOrders', 'cancelOrder', 'generatenewaddress', 'listOrders', 'listBalances', 'placeOrder', 'withdraw']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
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
        var markets, result, p, market, base, quote, symbol, id;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarkets();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  base = market[0];
                  quote = market[1];
                  symbol = base + '/' + quote;
                  id = symbol;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
                  });
                }

                return _context.abrupt("return", result);

              case 6:
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
                return this.privatePostListBalances();

              case 5:
                balances = _context2.sent;

                if (balances) {
                  _context2.next = 8;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchBalance got an unrecognized response');

              case 8:
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['Currency'];
                  uppercase = currency.toUpperCase();
                  free = parseFloat(balance['Available']);
                  used = parseFloat(balance['Unconfirmed']);
                  total = this.sum(free, used);
                  account = {
                    'free': free,
                    'used': used,
                    'total': total
                  };
                  result[uppercase] = account;
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
                return this.publicGetBookSymbol(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'BuyOrders', 'SellOrders', 'Price', 'Amount'));

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
        'bid': this.safeFloat(ticker, 'Bid'),
        'ask': this.safeFloat(ticker, 'Ask'),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'Last'),
        'change': this.safeFloat(ticker, 'Variation24Hr'),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'Volume24Hr'),
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
            response,
            tickers,
            ids,
            result,
            i,
            id,
            symbol,
            market,
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
                return this.publicGetPrices(params);

              case 6:
                response = _context4.sent;
                tickers = this.indexBy(response, 'Market');
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  symbol = id;
                  market = undefined;

                  if (id in this.markets_by_id) {
                    market = this.markets_by_id[id];
                    symbol = market['symbol'];
                  }

                  ticker = tickers[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 12:
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
                return this.publicGetPriceSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                ticker = _context5.sent;
                return _context5.abrupt("return", this.parseTicker(ticker, market));

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
      var timestamp = trade['At'] * 1000;
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': undefined,
        'order': undefined,
        'type': undefined,
        'side': trade['Type'],
        'price': trade['Price'],
        'amount': trade['Amount']
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
                return this.publicGetTradesSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response, market, since, limit));

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
            market,
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
                market = this.market(symbol);
                order = {
                  'listingCurrency': market['base'],
                  'referenceCurrency': market['quote'],
                  'type': side,
                  'amount': amount
                };
                if (type == 'limit') order['limitPrice'] = price;
                _context7.next = 9;
                return this.privatePostPlaceOrder(this.extend(order, params));

              case 9:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response.toString()
                });

              case 11:
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
                return this.privatePostCancelOrder(this.extend({
                  'orderCode': id
                }, params));

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
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 3;
                return this.privatePostWithdraw(this.extend({
                  'currency': currency,
                  'address': address,
                  'amount': amount
                }, params));

              case 3:
                response = _context9.sent;
                return _context9.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 5:
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
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        query = this.extend({
          'key': this.apiKey,
          'nonce': nonce
        }, query);
        body = this.json(query);
        headers = {
          'Content-Type': 'application/json',
          'Hash': this.hmac(this.encode(body), this.encode(this.secret), 'sha512')
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
                return _context10.abrupt("return", response);

              case 9:
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

  return southxchange;
}(Exchange);