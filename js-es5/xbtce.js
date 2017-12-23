"use strict"; // ---------------------------------------------------------------------------

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
    NotSupported = _require.NotSupported,
    AuthenticationError = _require.AuthenticationError; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(xbtce, _Exchange);

  function xbtce() {
    _classCallCheck(this, xbtce);

    return _possibleConstructorReturn(this, (xbtce.__proto__ || _Object$getPrototypeOf(xbtce)).apply(this, arguments));
  }

  _createClass(xbtce, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(xbtce.prototype.__proto__ || _Object$getPrototypeOf(xbtce.prototype), "describe", this).call(this), {
        'id': 'xbtce',
        'name': 'xBTCe',
        'countries': 'RU',
        'rateLimit': 2000,
        // responses are cached every 2 seconds
        'version': 'v1',
        'hasPublicAPI': false,
        'hasCORS': false,
        'hasFetchTickers': true,
        'hasFetchOHLCV': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28059414-e235970c-662c-11e7-8c3a-08e31f78684b.jpg',
          'api': 'https://cryptottlivewebapi.xbtce.net:8443/api',
          'www': 'https://www.xbtce.com',
          'doc': ['https://www.xbtce.com/tradeapi', 'https://support.xbtce.info/Knowledgebase/Article/View/52/25/xbtce-exchange-api']
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['currency', 'currency/{filter}', 'level2', 'level2/{filter}', 'quotehistory/{symbol}/{periodicity}/bars/ask', 'quotehistory/{symbol}/{periodicity}/bars/bid', 'quotehistory/{symbol}/level2', 'quotehistory/{symbol}/ticks', 'symbol', 'symbol/{filter}', 'tick', 'tick/{filter}', 'ticker', 'ticker/{filter}', 'tradesession']
          },
          'private': {
            'get': ['tradeserverinfo', 'tradesession', 'currency', 'currency/{filter}', 'level2', 'level2/{filter}', 'symbol', 'symbol/{filter}', 'tick', 'tick/{filter}', 'account', 'asset', 'asset/{id}', 'position', 'position/{id}', 'trade', 'trade/{id}', 'quotehistory/{symbol}/{periodicity}/bars/ask', 'quotehistory/{symbol}/{periodicity}/bars/ask/info', 'quotehistory/{symbol}/{periodicity}/bars/bid', 'quotehistory/{symbol}/{periodicity}/bars/bid/info', 'quotehistory/{symbol}/level2', 'quotehistory/{symbol}/level2/info', 'quotehistory/{symbol}/periodicities', 'quotehistory/{symbol}/ticks', 'quotehistory/{symbol}/ticks/info', 'quotehistory/cache/{symbol}/{periodicity}/bars/ask', 'quotehistory/cache/{symbol}/{periodicity}/bars/bid', 'quotehistory/cache/{symbol}/level2', 'quotehistory/cache/{symbol}/ticks', 'quotehistory/symbols', 'quotehistory/version'],
            'post': ['trade', 'tradehistory'],
            'put': ['trade'],
            'delete': ['trade']
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
        var markets, result, p, market, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.privateGetSymbol();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['Symbol'];
                  base = market['MarginCurrency'];
                  quote = market['ProfitCurrency'];
                  if (base == 'DSH') base = 'DASH';
                  symbol = base + '/' + quote;
                  symbol = market['IsTradeAllowed'] ? symbol : id;
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
                return this.privateGetAsset();

              case 5:
                balances = _context2.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['Currency'];
                  uppercase = currency.toUpperCase(); // xbtce names DASH incorrectly as DSH

                  if (uppercase == 'DSH') uppercase = 'DASH';
                  account = {
                    'free': balance['FreeAmount'],
                    'used': balance['LockedAmount'],
                    'total': balance['Amount']
                  };
                  result[uppercase] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 9:
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
            timestamp,
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
                return this.privateGetLevel2Filter(this.extend({
                  'filter': market['id']
                }, params));

              case 6:
                orderbook = _context3.sent;
                orderbook = orderbook[0];
                timestamp = orderbook['Timestamp'];
                return _context3.abrupt("return", this.parseOrderBook(orderbook, timestamp, 'Bids', 'Asks', 'Price', 'Volume'));

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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = 0;
      var last = undefined;
      if ('LastBuyTimestamp' in ticker) if (timestamp < ticker['LastBuyTimestamp']) {
        timestamp = ticker['LastBuyTimestamp'];
        last = ticker['LastBuyPrice'];
      }
      if ('LastSellTimestamp' in ticker) if (timestamp < ticker['LastSellTimestamp']) {
        timestamp = ticker['LastSellTimestamp'];
        last = ticker['LastSellPrice'];
      }
      if (!timestamp) timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': ticker['DailyBestBuyPrice'],
        'low': ticker['DailyBestSellPrice'],
        'bid': ticker['BestBid'],
        'ask': ticker['BestAsk'],
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': last,
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': ticker['DailyTradedTotalVolume'],
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
            ids,
            result,
            i,
            id,
            market,
            symbol,
            base,
            quote,
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
                tickers = _context4.sent;
                tickers = this.indexBy(tickers, 'Symbol');
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = undefined;
                  symbol = undefined;

                  if (id in this.markets_by_id) {
                    market = this.markets_by_id[id];
                    symbol = market['symbol'];
                  } else {
                    base = id.slice(0, 3);
                    quote = id.slice(3, 6);
                    if (base == 'DSH') base = 'DASH';
                    if (quote == 'DSH') quote = 'DASH';
                    symbol = base + '/' + quote;
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
            tickers,
            length,
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
                return this.publicGetTickerFilter(this.extend({
                  'filter': market['id']
                }, params));

              case 6:
                tickers = _context5.sent;
                length = tickers.length;

                if (!(length < 1)) {
                  _context5.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchTicker returned empty response, xBTCe public API error');

              case 10:
                tickers = this.indexBy(tickers, 'Symbol');
                ticker = tickers[market['id']];
                return _context5.abrupt("return", this.parseTicker(ticker, market));

              case 13:
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
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var since,
            limit,
            params,
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
                _context6.next = 7;
                return this.privateGetTrade(params);

              case 7:
                return _context6.abrupt("return", _context6.sent);

              case 8:
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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv['Timestamp'], ohlcv['Open'], ohlcv['High'], ohlcv['Low'], ohlcv['Close'], ohlcv['Volume']];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var timeframe,
            since,
            limit,
            params,
            minutes,
            periodicity,
            market,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                timeframe = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : '1m';
                since = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                limit = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : undefined;
                params = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : {};
                throw new NotSupported(this.id + ' fetchOHLCV is disabled by the exchange');

              case 9:
                market = this.market(symbol);
                if (!since) since = this.seconds() - 86400 * 7; // last day by defulat

                if (!limit) limit = 1000; // default

                _context7.next = 14;
                return this.privateGetQuotehistorySymbolPeriodicityBarsBid(this.extend({
                  'symbol': market['id'],
                  'periodicity': periodicity,
                  'timestamp': since,
                  'count': limit
                }, params));

              case 14:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseOHLCVs(response['Bars'], market, timeframe, since, limit));

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                price = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                params = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : {};
                _context8.next = 4;
                return this.loadMarkets();

              case 4:
                if (!(type == 'market')) {
                  _context8.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 6:
                _context8.next = 8;
                return this.tapiPostTrade(this.extend({
                  'pair': this.marketId(symbol),
                  'type': side,
                  'amount': amount,
                  'rate': price
                }, params));

              case 8:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['Id'].toString()
                });

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
                _context9.next = 4;
                return this.privateDeleteTrade(this.extend({
                  'Type': 'Cancel',
                  'Id': id
                }, params));

              case 4:
                return _context9.abrupt("return", _context9.sent);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "nonce",
    value: function nonce() {
      return this.milliseconds();
    }
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      if (!this.apiKey) throw new AuthenticationError(this.id + ' requires apiKey for all requests, their public API is always busy');
      if (!this.uid) throw new AuthenticationError(this.id + ' requires uid property for authentication and trading, their public API is always busy');
      var url = this.urls['api'] + '/' + this.version;
      if (api == 'public') url += '/' + api;
      url += '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        headers = {
          'Accept-Encoding': 'gzip, deflate'
        };
        var nonce = this.nonce().toString();

        if (method == 'POST') {
          if (_Object$keys(query).length) {
            headers['Content-Type'] = 'application/json';
            body = this.json(query);
          } else {
            url += '?' + this.urlencode(query);
          }
        }

        var auth = nonce + this.uid + this.apiKey + method + url;
        if (body) auth += body;
        var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha256', 'base64');
        var credentials = this.uid + ':' + this.apiKey + ':' + nonce + ':' + this.binaryToString(signature);
        headers['Authorization'] = 'HMAC ' + credentials;
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }]);

  return xbtce;
}(Exchange);