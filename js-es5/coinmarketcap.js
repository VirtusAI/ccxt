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
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(coinmarketcap, _Exchange);

  function coinmarketcap() {
    _classCallCheck(this, coinmarketcap);

    return _possibleConstructorReturn(this, (coinmarketcap.__proto__ || _Object$getPrototypeOf(coinmarketcap)).apply(this, arguments));
  }

  _createClass(coinmarketcap, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coinmarketcap.prototype.__proto__ || _Object$getPrototypeOf(coinmarketcap.prototype), "describe", this).call(this), {
        'id': 'coinmarketcap',
        'name': 'CoinMarketCap',
        'rateLimit': 10000,
        'version': 'v1',
        'countries': 'US',
        'hasCORS': true,
        'hasPrivateAPI': false,
        'hasCreateOrder': false,
        'hasCancelOrder': false,
        'hasFetchBalance': false,
        'hasFetchOrderBook': false,
        'hasFetchTrades': false,
        'hasFetchTickers': true,
        'hasFetchCurrencies': true,
        'has': {
          'fetchCurrencies': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28244244-9be6312a-69ed-11e7-99c1-7c1797275265.jpg',
          'api': 'https://api.coinmarketcap.com',
          'www': 'https://coinmarketcap.com',
          'doc': 'https://coinmarketcap.com/api'
        },
        'requiredCredentials': {
          'apiKey': false,
          'secret': false
        },
        'api': {
          'public': {
            'get': ['ticker/', 'ticker/{id}/', 'global/']
          }
        },
        'currencyCodes': ['AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'IDR', 'INR', 'JPY', 'KRW', 'MXN', 'RUB', 'USD']
      });
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(symbol) {
        var params,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                throw new ExchangeError('Fetching order books is not supported by the API of ' + this.id);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var markets, result, p, market, currencies, i, quote, quoteId, base, baseId, symbol, id;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.publicGetTicker({
                  'limit': 0
                });

              case 2:
                markets = _context2.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  currencies = this.currencyCodes;

                  for (i = 0; i < currencies.length; i++) {
                    quote = currencies[i];
                    quoteId = quote.toLowerCase();
                    base = market['symbol'];
                    baseId = market['id'];
                    symbol = base + '/' + quote;
                    id = baseId + '/' + quote;
                    result.push({
                      'id': id,
                      'symbol': symbol,
                      'base': base,
                      'quote': quote,
                      'baseId': baseId,
                      'quoteId': quoteId,
                      'info': market
                    });
                  }
                }

                return _context2.abrupt("return", result);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchMarkets() {
        return _fetchMarkets.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchGlobal",
    value: function () {
      var _fetchGlobal = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var currency,
            request,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                currency = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 'USD';
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                request = {};
                if (currency) request['convert'] = currency;
                _context3.next = 7;
                return this.publicGetGlobal(request);

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchGlobal() {
        return _fetchGlobal.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.milliseconds();
      if ('last_updated' in ticker) if (ticker['last_updated']) timestamp = parseInt(ticker['last_updated']) * 1000;
      var change = undefined;
      if ('percent_change_24h' in ticker) if (ticker['percent_change_24h']) change = this.safeFloat(ticker, 'percent_change_24h');
      var last = undefined;
      var symbol = undefined;
      var volume = undefined;

      if (market) {
        var priceKey = 'price_' + market['quoteId'];
        if (priceKey in ticker) if (ticker[priceKey]) last = this.safeFloat(ticker, priceKey);
        symbol = market['symbol'];
        var volumeKey = '24h_volume_' + market['quoteId'];
        if (volumeKey in ticker) if (ticker[volumeKey]) volume = this.safeFloat(ticker, volumeKey);
      }

      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': undefined,
        'low': undefined,
        'bid': undefined,
        'ask': undefined,
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': last,
        'change': change,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': undefined,
        'quoteVolume': volume,
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var currency,
            params,
            request,
            response,
            tickers,
            t,
            ticker,
            id,
            symbol,
            market,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                currency = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 'USD';
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                request = {
                  'limit': 10000
                };
                if (currency) request['convert'] = currency;
                _context4.next = 8;
                return this.publicGetTicker(this.extend(request, params));

              case 8:
                response = _context4.sent;
                tickers = {};

                for (t = 0; t < response.length; t++) {
                  ticker = response[t];
                  id = ticker['id'] + '/' + currency;
                  symbol = id;
                  market = undefined;

                  if (id in this.markets_by_id) {
                    market = this.markets_by_id[id];
                    symbol = market['symbol'];
                  }

                  tickers[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", tickers);

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
            request,
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
                request = this.extend({
                  'convert': market['quote'],
                  'id': market['baseId']
                }, params);
                _context5.next = 7;
                return this.publicGetTickerId(request);

              case 7:
                response = _context5.sent;
                ticker = response[0];
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
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var params,
            currencies,
            result,
            i,
            currency,
            id,
            precision,
            code,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                _context6.next = 3;
                return this.publicGetTicker(this.extend({
                  'limit': 0
                }, params));

              case 3:
                currencies = _context6.sent;
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['symbol']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  precision = 8; // default precision, todo: fix "magic constants"

                  code = this.commonCurrencyCode(id);
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['name'],
                    'active': true,
                    'status': 'ok',
                    'fee': undefined,
                    // todo: redesign
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'price': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'cost': {
                        'min': undefined,
                        'max': undefined
                      },
                      'withdraw': {
                        'min': undefined,
                        'max': undefined
                      }
                    }
                  };
                }

                return _context6.abrupt("return", result);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
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
      if (_Object$keys(query).length) url += '?' + this.urlencode(query);
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

                if (!('error' in response)) {
                  _context7.next = 11;
                  break;
                }

                if (!response['error']) {
                  _context7.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context7.abrupt("return", response);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function request(_x3) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return coinmarketcap;
}(Exchange);