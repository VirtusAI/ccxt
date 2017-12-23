"use strict"; //  ---------------------------------------------------------------------------

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
  _inherits(ccex, _Exchange);

  function ccex() {
    _classCallCheck(this, ccex);

    return _possibleConstructorReturn(this, (ccex.__proto__ || _Object$getPrototypeOf(ccex)).apply(this, arguments));
  }

  _createClass(ccex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(ccex.prototype.__proto__ || _Object$getPrototypeOf(ccex.prototype), "describe", this).call(this), {
        'id': 'ccex',
        'name': 'C-CEX',
        'countries': ['DE', 'EU'],
        'rateLimit': 1500,
        'hasCORS': false,
        'hasFetchTickers': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766433-16881f90-5ed8-11e7-92f8-3d92cc747a6c.jpg',
          'api': {
            'tickers': 'https://c-cex.com/t',
            'public': 'https://c-cex.com/t/api_pub.html',
            'private': 'https://c-cex.com/t/api.html'
          },
          'www': 'https://c-cex.com',
          'doc': 'https://c-cex.com/?id=api'
        },
        'api': {
          'tickers': {
            'get': ['coinnames', '{market}', 'pairs', 'prices', 'volume_{coin}']
          },
          'public': {
            'get': ['balancedistribution', 'markethistory', 'markets', 'marketsummaries', 'orderbook']
          },
          'private': {
            'get': ['buylimit', 'cancel', 'getbalance', 'getbalances', 'getopenorders', 'getorder', 'getorderhistory', 'mytrades', 'selllimit']
          }
        },
        'fees': {
          'trading': {
            'taker': 0.2 / 100,
            'maker': 0.2 / 100
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (currency == 'IOT') return 'IoTcoin';
      if (currency == 'BLC') return 'Cryptobullcoin';
      if (currency == 'XID') return 'InternationalDiamond';
      return currency;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, result, p, market, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarkets();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets['result'].length; p++) {
                  market = markets['result'][p];
                  id = market['MarketName'];
                  base = market['MarketCurrency'];
                  quote = market['BaseCurrency'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
                  }));
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
            response,
            balances,
            result,
            b,
            balance,
            code,
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
                return this.privateGetBalances();

              case 5:
                response = _context2.sent;
                balances = response['result'];
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  code = balance['Currency'];
                  currency = this.commonCurrencyCode(code);
                  account = {
                    'free': balance['Available'],
                    'used': balance['Pending'],
                    'total': balance['Balance']
                  };
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
                _context3.next = 5;
                return this.publicGetOrderbook(this.extend({
                  'market': this.marketId(symbol),
                  'type': 'both',
                  'depth': 100
                }, params));

              case 5:
                response = _context3.sent;
                orderbook = response['result'];
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'Rate', 'Quantity'));

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
        'bid': parseFloat(ticker['buy']),
        'ask': parseFloat(ticker['sell']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['lastprice']),
        'change': undefined,
        'percentage': undefined,
        'average': parseFloat(ticker['avg']),
        'baseVolume': undefined,
        'quoteVolume': this.safeFloat(ticker, 'buysupport'),
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
            uppercase,
            market,
            symbol,
            _uppercase$split,
            _uppercase$split2,
            base,
            quote,
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
                return this.tickersGetPrices(params);

              case 6:
                tickers = _context4.sent;
                result = {
                  'info': tickers
                };
                ids = _Object$keys(tickers);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  ticker = tickers[id];
                  uppercase = id.toUpperCase();
                  market = undefined;
                  symbol = undefined;

                  if (uppercase in this.markets_by_id) {
                    market = this.markets_by_id[uppercase];
                    symbol = market['symbol'];
                  } else {
                    _uppercase$split = uppercase.split('-'), _uppercase$split2 = _slicedToArray(_uppercase$split, 2), base = _uppercase$split2[0], quote = _uppercase$split2[1];
                    base = this.commonCurrencyCode(base);
                    quote = this.commonCurrencyCode(quote);
                    symbol = base + '/' + quote;
                  }

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
            response,
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
                return this.tickersGetMarket(this.extend({
                  'market': market['id'].toLowerCase()
                }, params));

              case 6:
                response = _context5.sent;
                ticker = response['ticker'];
                return _context5.abrupt("return", this.parseTicker(ticker, market));

              case 9:
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
      var timestamp = this.parse8601(trade['TimeStamp']);
      return {
        'id': trade['Id'],
        'info': trade,
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['OrderType'].toLowerCase(),
        'price': trade['Price'],
        'amount': trade['Quantity']
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
                return this.publicGetMarkethistory(this.extend({
                  'market': market['id'],
                  'type': 'both',
                  'depth': 100
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['result'], market, since, limit));

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
            method,
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
                method = 'privateGet' + this.capitalize(side) + type;
                _context7.next = 7;
                return this[method](this.extend({
                  'market': this.marketId(symbol),
                  'quantity': amount,
                  'rate': price
                }, params));

              case 7:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['result']['uuid']
                });

              case 9:
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
                return this.privateGetCancel({
                  'uuid': id
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'][api];

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var query = this.keysort(this.extend({
          'a': path,
          'apikey': this.apiKey,
          'nonce': nonce
        }, params));
        url += '?' + this.urlencode(query);
        headers = {
          'apisign': this.hmac(this.encode(url), this.encode(this.secret), 'sha512')
        };
      } else if (api == 'public') {
        url += '?' + this.urlencode(this.extend({
          'a': 'get' + path
        }, params));
      } else {
        url += '/' + this.implodeParams(path, params) + '.json';
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

                if (!(api == 'tickers')) {
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

  return ccex;
}(Exchange);