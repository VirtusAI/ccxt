'use strict'; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _Math$log = require("@babel/runtime/core-js/math/log10");

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
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound,
    InvalidOrder = _require.InvalidOrder,
    DDoSProtection = _require.DDoSProtection; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(binance, _Exchange);

  function binance() {
    _classCallCheck(this, binance);

    return _possibleConstructorReturn(this, (binance.__proto__ || _Object$getPrototypeOf(binance)).apply(this, arguments));
  }

  _createClass(binance, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(binance.prototype.__proto__ || _Object$getPrototypeOf(binance.prototype), "describe", this).call(this), {
        'id': 'binance',
        'name': 'Binance',
        'countries': 'JP',
        // Japan
        'rateLimit': 500,
        // new metainfo interface
        'has': {
          'fetchDepositAddress': true,
          'CORS': false,
          'fetchBidsAsks': true,
          'fetchTickers': true,
          'fetchOHLCV': true,
          'fetchMyTrades': true,
          'fetchOrder': true,
          'fetchOrders': true,
          'fetchOpenOrders': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': '1m',
          '3m': '3m',
          '5m': '5m',
          '15m': '15m',
          '30m': '30m',
          '1h': '1h',
          '2h': '2h',
          '4h': '4h',
          '6h': '6h',
          '8h': '8h',
          '12h': '12h',
          '1d': '1d',
          '3d': '3d',
          '1w': '1w',
          '1M': '1M'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/29604020-d5483cdc-87ee-11e7-94c7-d1a8d9169293.jpg',
          'api': {
            'web': 'https://www.binance.com',
            'wapi': 'https://api.binance.com/wapi/v3',
            'public': 'https://api.binance.com/api/v1',
            'private': 'https://api.binance.com/api/v3',
            'v3': 'https://api.binance.com/api/v3',
            'v1': 'https://api.binance.com/api/v1'
          },
          'www': 'https://www.binance.com',
          'doc': 'https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md',
          'fees': ['https://binance.zendesk.com/hc/en-us/articles/115000429332', 'https://support.binance.com/hc/en-us/articles/115000583311']
        },
        'api': {
          'web': {
            'get': ['exchange/public/product']
          },
          'wapi': {
            'post': ['withdraw'],
            'get': ['depositHistory', 'withdrawHistory', 'depositAddress']
          },
          'v3': {
            'get': ['ticker/price', 'ticker/bookTicker']
          },
          'public': {
            'get': ['exchangeInfo', 'ping', 'time', 'depth', 'aggTrades', 'klines', 'ticker/24hr', 'ticker/allPrices', 'ticker/allBookTickers', 'ticker/price', 'ticker/bookTicker']
          },
          'private': {
            'get': ['order', 'openOrders', 'allOrders', 'account', 'myTrades'],
            'post': ['order', 'order/test'],
            'delete': ['order']
          },
          'v1': {
            'put': ['userDataStream'],
            'post': ['userDataStream'],
            'delete': ['userDataStream']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'taker': 0.001,
            'maker': 0.001
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BNB': 0.7,
              'BTC': 0.001,
              'NEO': 0.0,
              'ETH': 0.01,
              'LTC': 0.01,
              'QTUM': 0.01,
              'EOS': 1.0,
              'SNT': 32.0,
              'BNT': 1.5,
              'GAS': 0,
              'BCH': 0.001,
              'BTM': 5.0,
              'USDT': 23.0,
              'HCC': 0.0005,
              'HSR': 0.0001,
              'OAX': 8.3,
              'DNT': 51.0,
              'MCO': 0.86,
              'ICN': 3.5,
              'ZRX': 5.7,
              'OMG': 0.57,
              'WTC': 0.5,
              'LRC': 9.1,
              'LLT': 54.0,
              'YOYO': 39.0,
              'TRX': 129.0,
              'STRAT': 0.1,
              'SNGLS': 42,
              'BQX': 1.6,
              'KNC': 2.6,
              'SNM': 29.0,
              'FUN': 85.0,
              'LINK': 12.8,
              'XVG': 0.1,
              'CTR': 5.4,
              'SALT': 1.3,
              'MDA': 4.7,
              'IOTA': 0.5,
              'SUB': 7.4,
              'ETC': 0.01,
              'MTL': 1.9,
              'MTH': 34.0,
              'ENG': 2.1,
              'AST': 10.0,
              'DASH': 0.002,
              'BTG': 0.001,
              'EVX': 2.5,
              'REQ': 18.1,
              'VIB': 28.0,
              'POWR': 8.6,
              'ARK': 0.1,
              'XRP': 0.25,
              'MOD': 2.0,
              'ENJ': 42.0,
              'STORJ': 5.9,
              'VEN': 1.8,
              'KMD': 0.002,
              'RCN': 35.0,
              'NULS': 2.1,
              'RDN': 2.2,
              'XMR': 0.04,
              'DLT': 11.7,
              'AMB': 11.4,
              'BAT': 18.0,
              'ZEC': 0.005,
              'BCPT': 10.2,
              'ARN': 3.1,
              'GVT': 0.53,
              'CDT': 67.0,
              'GXS': 0.3,
              'POE': 88.0,
              'QSP': 21.0,
              'BTS': 1.0,
              'XZC': 0.02,
              'LSK': 0.1,
              'TNT': 47.0,
              'FUEL': 45.0,
              'MANA': 74.0,
              'BCD': 1.0,
              'DGD': 0.06,
              'ADX': 4.7,
              'ADA': 1.0,
              'PPT': 0.25,
              'CMT': 37.0,
              'XLM': 0.01,
              'CND': 47.0,
              'LEND': 54.0,
              'WABI': 3.5,
              'SBTC': 1.0,
              'BCX': 1.0,
              'WAVES': 0.002,
              'TNB': 82.0,
              'GTO': 20.0,
              'ICX': 1.3,
              'OST': 17.0,
              'ELF': 6.5,
              'AION': 1.9,
              'ETF': 1.0,
              'BRD': 6.4,
              'NEBL': 0.01,
              'VIBE': 7.2,
              'LUN': 0.29,
              'RLC': 4.1,
              'INS': 1.5,
              'EDO': 2.5,
              'WINGS': 9.3,
              'NAV': 0.2,
              'TRIG': 6.7,
              'APPC': 6.5
            },
            'deposit': {
              'BNB': 0,
              'BTC': 0,
              'ETH': 0,
              'LTC': 0,
              'NEO': 0,
              'QTUM': 0,
              'SNT': 0,
              'BNT': 0,
              'EOS': 0,
              'BCH': 0,
              'GAS': 0,
              'USDT': 0,
              'OAX': 0,
              'DNT': 0,
              'MCO': 0,
              'ICN': 0,
              'WTC': 0,
              'OMG': 0,
              'ZRX': 0,
              'STRAT': 0,
              'SNGLS': 0,
              'BQX': 0,
              'KNC': 0,
              'FUN': 0,
              'SNM': 0,
              'LINK': 0,
              'XVG': 0,
              'CTR': 0,
              'SALT': 0,
              'IOTA': 0,
              'MDA': 0,
              'MTL': 0,
              'SUB': 0,
              'ETC': 0,
              'MTH': 0,
              'ENG': 0,
              'AST': 0,
              'BTG': 0,
              'DASH': 0,
              'EVX': 0,
              'REQ': 0,
              'LRC': 0,
              'VIB': 0,
              'HSR': 0,
              'TRX': 0,
              'POWR': 0,
              'ARK': 0,
              'YOYO': 0,
              'XRP': 0,
              'MOD': 0,
              'ENJ': 0,
              'STORJ': 0
            }
          }
        },
        // exchange-specific options
        'options': {
          'recvWindow': 5 * 1000,
          // 5 sec, binance default
          'timeDifference': 0,
          // the difference between system clock and Binance clock
          'adjustForTimeDifference': false // controls the adjustment logic upon instantiation

        }
      });
    }
  }, {
    key: "milliseconds",
    value: function milliseconds() {
      return _get(binance.prototype.__proto__ || _Object$getPrototypeOf(binance.prototype), "milliseconds", this).call(this) - this.options['timeDifference'];
    }
  }, {
    key: "loadTimeDifference",
    value: function () {
      var _loadTimeDifference = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var before, response, after;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                before = this.milliseconds();
                _context.next = 3;
                return this.publicGetTime();

              case 3:
                response = _context.sent;
                after = this.milliseconds();
                this.options['timeDifference'] = parseInt((before + after) / 2 - response['serverTime']);
                return _context.abrupt("return", this.options['timeDifference']);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function loadTimeDifference() {
        return _loadTimeDifference.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var response, markets, result, i, market, id, baseId, quoteId, base, quote, symbol, filters, precision, active, lot, entry, filter, _filter;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.publicGetExchangeInfo();

              case 2:
                response = _context2.sent;

                if (!this.options['adjustForTimeDifference']) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return this.loadTimeDifference();

              case 6:
                markets = response['symbols'];
                result = [];
                i = 0;

              case 9:
                if (!(i < markets.length)) {
                  _context2.next = 31;
                  break;
                }

                market = markets[i];
                id = market['symbol'];

                if (!(id === '123456')) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("continue", 28);

              case 14:
                baseId = market['baseAsset'];
                quoteId = market['quoteAsset'];
                base = this.commonCurrencyCode(baseId);
                quote = this.commonCurrencyCode(quoteId);
                symbol = base + '/' + quote;
                filters = this.indexBy(market['filters'], 'filterType');
                precision = {
                  'base': market['baseAssetPrecision'],
                  'quote': market['quotePrecision'],
                  'amount': market['baseAssetPrecision'],
                  'price': market['quotePrecision']
                };
                active = market['status'] === 'TRADING';
                lot = -1 * _Math$log(precision['amount']);
                entry = this.extend(this.fees['trading'], {
                  'id': id,
                  'symbol': symbol,
                  'base': base,
                  'quote': quote,
                  'baseId': baseId,
                  'quoteId': quoteId,
                  'info': market,
                  'lot': lot,
                  'active': active,
                  'precision': precision,
                  'limits': {
                    'amount': {
                      'min': lot,
                      'max': undefined
                    },
                    'price': {
                      'min': -1 * _Math$log(precision['price']),
                      'max': undefined
                    },
                    'cost': {
                      'min': lot,
                      'max': undefined
                    }
                  }
                });

                if ('PRICE_FILTER' in filters) {
                  filter = filters['PRICE_FILTER'];
                  entry['precision']['price'] = this.precisionFromString(filter['tickSize']);
                  entry['limits']['price'] = {
                    'min': parseFloat(filter['minPrice']),
                    'max': parseFloat(filter['maxPrice'])
                  };
                }

                if ('LOT_SIZE' in filters) {
                  _filter = filters['LOT_SIZE'];
                  entry['precision']['amount'] = this.precisionFromString(_filter['stepSize']);
                  entry['lot'] = parseFloat(_filter['stepSize']);
                  entry['limits']['amount'] = {
                    'min': parseFloat(_filter['minQty']),
                    'max': parseFloat(_filter['maxQty'])
                  };
                }

                if ('MIN_NOTIONAL' in filters) {
                  entry['limits']['cost']['min'] = parseFloat(filters['MIN_NOTIONAL']['minNotional']);
                }

                result.push(entry);

              case 28:
                i++;
                _context2.next = 9;
                break;

              case 31:
                return _context2.abrupt("return", result);

              case 32:
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
    key: "calculateFee",
    value: function calculateFee(symbol, type, side, amount, price) {
      var takerOrMaker = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'taker';
      var params = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var market = this.markets[symbol];
      var key = 'quote';
      var rate = market[takerOrMaker];
      var cost = parseFloat(this.costToPrecision(symbol, amount * rate));

      if (side === 'sell') {
        cost *= price;
      } else {
        key = 'base';
      }

      return {
        'type': takerOrMaker,
        'currency': market[key],
        'rate': rate,
        'cost': parseFloat(this.feeToPrecision(symbol, cost))
      };
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var params,
            response,
            result,
            balances,
            i,
            balance,
            asset,
            currency,
            account,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                _context3.next = 5;
                return this.privateGetAccount(params);

              case 5:
                response = _context3.sent;
                result = {
                  'info': response
                };
                balances = response['balances'];

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];
                  asset = balance['asset'];
                  currency = this.commonCurrencyCode(asset);
                  account = {
                    'free': parseFloat(balance['free']),
                    'used': parseFloat(balance['locked']),
                    'total': 0.0
                  };
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context3.abrupt("return", this.parseBalance(result));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var limit,
            params,
            market,
            request,
            orderbook,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                limit = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (typeof limit !== 'undefined') request['limit'] = limit; // default = maximum = 100

                _context4.next = 9;
                return this.publicGetDepth(this.extend(request, params));

              case 9:
                orderbook = _context4.sent;
                return _context4.abrupt("return", this.parseOrderBook(orderbook));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.safeInteger(ticker, 'closeTime');
      if (typeof timestamp === 'undefined') timestamp = this.milliseconds();
      var symbol = ticker['symbol'];

      if (!market) {
        if (symbol in this.markets_by_id) {
          market = this.markets_by_id[symbol];
        }
      }

      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'highPrice'),
        'low': this.safeFloat(ticker, 'lowPrice'),
        'bid': this.safeFloat(ticker, 'bidPrice'),
        'bidVolume': this.safeFloat(ticker, 'bidQty'),
        'ask': this.safeFloat(ticker, 'askPrice'),
        'askVolume': this.safeFloat(ticker, 'askQty'),
        'vwap': this.safeFloat(ticker, 'weightedAvgPrice'),
        'open': this.safeFloat(ticker, 'openPrice'),
        'close': this.safeFloat(ticker, 'prevClosePrice'),
        'first': undefined,
        'last': this.safeFloat(ticker, 'lastPrice'),
        'change': this.safeFloat(ticker, 'priceChangePercent'),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'volume'),
        'quoteVolume': this.safeFloat(ticker, 'quoteVolume'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            market,
            response,
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
                return this.publicGetTicker24hr(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTicker(response, market));

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
    key: "parseTickers",
    value: function parseTickers(rawTickers) {
      var symbols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var tickers = [];

      for (var i = 0; i < rawTickers.length; i++) {
        tickers.push(this.parseTicker(rawTickers[i]));
      }

      var tickersBySymbol = this.indexBy(tickers, 'symbol'); // return all of them if no symbols were passed in the first argument

      if (typeof symbols === 'undefined') return tickersBySymbol; // otherwise filter by symbol

      var result = {};

      for (var _i = 0; _i < symbols.length; _i++) {
        var symbol = symbols[_i];
        if (symbol in tickersBySymbol) result[symbol] = tickersBySymbol[symbol];
      }

      return result;
    }
  }, {
    key: "fetchBidAsks",
    value: function () {
      var _fetchBidAsks = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbols,
            params,
            rawTickers,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbols = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : undefined;
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 4;
                return this.loadMarkets();

              case 4:
                _context6.next = 6;
                return this.publicGetTickerBookTicker(params);

              case 6:
                rawTickers = _context6.sent;
                return _context6.abrupt("return", this.parseTickers(rawTickers, symbols));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchBidAsks() {
        return _fetchBidAsks.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var symbols,
            params,
            rawTickers,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbols = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : undefined;
                params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                _context7.next = 6;
                return this.publicGetTicker24hr(params);

              case 6:
                rawTickers = _context7.sent;
                return _context7.abrupt("return", this.parseTickers(rawTickers, symbols));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv[0], parseFloat(ohlcv[1]), parseFloat(ohlcv[2]), parseFloat(ohlcv[3]), parseFloat(ohlcv[4]), parseFloat(ohlcv[5])];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                timeframe = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : '1m';
                since = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : undefined;
                limit = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : undefined;
                params = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : {};
                _context8.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'interval': this.timeframes[timeframe]
                };
                request['limit'] = limit ? limit : 500; // default == max == 500

                if (typeof since !== 'undefined') request['startTime'] = since;
                _context8.next = 12;
                return this.publicGetKlines(this.extend(request, params));

              case 12:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchOHLCV(_x3) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestampField = 'T' in trade ? 'T' : 'time';
      var timestamp = trade[timestampField];
      var priceField = 'p' in trade ? 'p' : 'price';
      var price = parseFloat(trade[priceField]);
      var amountField = 'q' in trade ? 'q' : 'qty';
      var amount = parseFloat(trade[amountField]);
      var idField = 'a' in trade ? 'a' : 'id';
      var id = trade[idField].toString();
      var side = undefined;
      var order = undefined;
      if ('orderId' in trade) order = trade['orderId'].toString();

      if ('m' in trade) {
        side = trade['m'] ? 'sell' : 'buy'; // this is reversed intentionally
      } else {
        side = trade['isBuyer'] ? 'buy' : 'sell'; // this is a true side
      }

      var fee = undefined;

      if ('commission' in trade) {
        fee = {
          'cost': parseFloat(trade['commission']),
          'currency': this.commonCurrencyCode(trade['commissionAsset'])
        };
      }

      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': id,
        'order': order,
        'type': undefined,
        'side': side,
        'price': price,
        'cost': price * amount,
        'amount': amount,
        'fee': fee
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(symbol) {
        var since,
            limit,
            params,
            market,
            request,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                since = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : undefined;
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };

                if (typeof since !== 'undefined') {
                  request['startTime'] = since;
                  request['endTime'] = since + 3600000;
                }

                if (typeof limit !== 'undefined') request['limit'] = limit; // 'fromId': 123,    // ID to get aggregate trades from INCLUSIVE.
                // 'startTime': 456, // Timestamp in ms to get aggregate trades from INCLUSIVE.
                // 'endTime': 789,   // Timestamp in ms to get aggregate trades until INCLUSIVE.
                // 'limit': 500,     // default = maximum = 500

                _context9.next = 11;
                return this.publicGetAggTrades(this.extend(request, params));

              case 11:
                response = _context9.sent;
                return _context9.abrupt("return", this.parseTrades(response, market, since, limit));

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchTrades(_x4) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      if (status === 'NEW') return 'open';
      if (status === 'PARTIALLY_FILLED') return 'open';
      if (status === 'FILLED') return 'closed';
      if (status === 'CANCELED') return 'canceled';
      return status.toLowerCase();
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var status = this.safeValue(order, 'status');
      if (typeof status !== 'undefined') status = this.parseOrderStatus(status);
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        var id = order['symbol'];

        if (id in this.markets_by_id) {
          market = this.markets_by_id[id];
          symbol = market['symbol'];
        }
      }

      var timestamp = undefined;
      if ('time' in order) timestamp = order['time'];else if ('transactTime' in order) timestamp = order['transactTime'];else throw new ExchangeError(this.id + ' malformed order: ' + this.json(order));
      var price = parseFloat(order['price']);
      var amount = parseFloat(order['origQty']);
      var filled = this.safeFloat(order, 'executedQty', 0.0);
      var remaining = Math.max(amount - filled, 0.0);
      var cost = undefined;
      if (typeof price !== 'undefined') if (typeof filled !== 'undefined') cost = price * filled;
      var result = {
        'info': order,
        'id': order['orderId'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': order['type'].toLowerCase(),
        'side': order['side'].toLowerCase(),
        'price': price,
        'amount': amount,
        'cost': cost,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': undefined
      };
      return result;
    }
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(symbol, type, side, amount) {
        var price,
            params,
            market,
            order,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                price = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : undefined;
                params = _args10.length > 5 && _args10[5] !== undefined ? _args10[5] : {};
                _context10.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                order = {
                  'symbol': market['id'],
                  'quantity': this.amountToString(symbol, amount),
                  'type': type.toUpperCase(),
                  'side': side.toUpperCase()
                };

                if (type === 'limit') {
                  order = this.extend(order, {
                    'price': this.priceToPrecision(symbol, price),
                    'timeInForce': 'GTC' // 'GTC' = Good To Cancel (default), 'IOC' = Immediate Or Cancel

                  });
                }

                _context10.next = 9;
                return this.privatePostOrder(this.extend(order, params));

              case 9:
                response = _context10.sent;
                return _context10.abrupt("return", this.parseOrder(response));

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function createOrder(_x5, _x6, _x7, _x8) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11(id) {
        var symbol,
            params,
            market,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                params = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};

                if (symbol) {
                  _context11.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrder requires a symbol param');

              case 4:
                _context11.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                _context11.next = 9;
                return this.privateGetOrder(this.extend({
                  'symbol': market['id'],
                  'orderId': parseInt(id)
                }, params));

              case 9:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrder(response, market));

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : undefined;
                since = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};

                if (symbol) {
                  _context12.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders requires a symbol param');

              case 6:
                _context12.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (limit) request['limit'] = limit;
                _context12.next = 13;
                return this.privateGetAllOrders(this.extend(request, params));

              case 13:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseOrders(response, market, since, limit));

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchOrders() {
        return _fetchOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                symbol = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : undefined;
                since = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : undefined;
                limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : undefined;
                params = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
                _context13.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                request = {};

                if (typeof symbol !== 'undefined') {
                  market = this.market(symbol);
                  request['symbol'] = market['id'];
                }

                _context13.next = 11;
                return this.privateGetOpenOrders(this.extend(request, params));

              case 11:
                response = _context13.sent;
                return _context13.abrupt("return", this.parseOrders(response, market, since, limit));

              case 13:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchClosedOrders",
    value: function () {
      var _fetchClosedOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14() {
        var symbol,
            since,
            limit,
            params,
            orders,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                symbol = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : undefined;
                since = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : undefined;
                limit = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : undefined;
                params = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
                _context14.next = 6;
                return this.fetchOrders(symbol, since, limit, params);

              case 6:
                orders = _context14.sent;
                return _context14.abrupt("return", this.filterBy(orders, 'status', 'closed'));

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(id) {
        var symbol,
            params,
            market,
            response,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                symbol = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : undefined;
                params = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : {};

                if (symbol) {
                  _context15.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a symbol argument');

              case 4:
                _context15.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                response = undefined;
                _context15.prev = 8;
                _context15.next = 11;
                return this.privateDeleteOrder(this.extend({
                  'symbol': market['id'],
                  'orderId': parseInt(id) // 'origClientOrderId': id,

                }, params));

              case 11:
                response = _context15.sent;
                _context15.next = 19;
                break;

              case 14:
                _context15.prev = 14;
                _context15.t0 = _context15["catch"](8);

                if (!(this.last_http_response.indexOf('UNKNOWN_ORDER') >= 0)) {
                  _context15.next = 18;
                  break;
                }

                throw new OrderNotFound(this.id + ' cancelOrder() error: ' + this.last_http_response);

              case 18:
                throw _context15.t0;

              case 19:
                return _context15.abrupt("return", response);

              case 20:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[8, 14]]);
      }));

      return function cancelOrder(_x10) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                symbol = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : undefined;
                since = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : undefined;
                limit = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : undefined;
                params = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};

                if (symbol) {
                  _context16.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchMyTrades requires a symbol argument');

              case 6:
                _context16.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (limit) request['limit'] = limit;
                _context16.next = 13;
                return this.privateGetMyTrades(this.extend(request, params));

              case 13:
                response = _context16.sent;
                return _context16.abrupt("return", this.parseTrades(response, market, since, limit));

              case 15:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (currency === 'BCC') return 'BCH';
      return currency;
    }
  }, {
    key: "currencyId",
    value: function currencyId(currency) {
      if (currency === 'BCH') return 'BCC';
      return currency;
    }
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee17(currency) {
        var params,
            response,
            address,
            tag,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                params = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};
                _context17.next = 3;
                return this.wapiGetDepositAddress(this.extend({
                  'asset': this.currencyId(currency)
                }, params));

              case 3:
                response = _context17.sent;

                if (!('success' in response)) {
                  _context17.next = 9;
                  break;
                }

                if (!response['success']) {
                  _context17.next = 9;
                  break;
                }

                address = this.safeString(response, 'address');
                tag = this.safeString(response, 'addressTag');
                return _context17.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'tag': tag,
                  'status': 'ok',
                  'info': response
                });

              case 9:
                throw new ExchangeError(this.id + ' fetchDepositAddress failed: ' + this.last_http_response);

              case 10:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function fetchDepositAddress(_x11) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee18(currency, amount, address) {
        var tag,
            params,
            name,
            request,
            response,
            _args18 = arguments;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                tag = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : undefined;
                params = _args18.length > 4 && _args18[4] !== undefined ? _args18[4] : {};
                name = address.slice(0, 20);
                request = {
                  'asset': this.currencyId(currency),
                  'address': address,
                  'amount': parseFloat(amount),
                  'name': name
                };
                if (tag) request['addressTag'] = tag;
                _context18.next = 7;
                return this.wapiPostWithdraw(this.extend(request, params));

              case 7:
                response = _context18.sent;
                return _context18.abrupt("return", {
                  'info': response,
                  'id': this.safeString(response, 'id')
                });

              case 9:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function withdraw(_x12, _x13, _x14) {
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
      var url = this.urls['api'][api];
      url += '/' + path;
      if (api === 'wapi') url += '.html'; // v1 special case for userDataStream

      if (path === 'userDataStream') {
        body = this.urlencode(params);
        headers = {
          'X-MBX-APIKEY': this.apiKey,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      } else if (api === 'private' || api === 'wapi') {
        this.checkRequiredCredentials();
        var query = this.urlencode(this.extend({
          'timestamp': this.milliseconds(),
          'recvWindow': this.options['recvWindow']
        }, params));
        var signature = this.hmac(this.encode(query), this.encode(this.secret));
        query += '&' + 'signature=' + signature;
        headers = {
          'X-MBX-APIKEY': this.apiKey
        };

        if (method === 'GET' || api === 'wapi') {
          url += '?' + query;
        } else {
          body = query;
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
      } else {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
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
      if (code >= 400) {
        if (code === 418 || code === 429) throw new DDoSProtection(this.id + ' ' + code.toString() + ' ' + reason + ' ' + body);
        if (body.indexOf('Price * QTY is zero or less') >= 0) throw new InvalidOrder(this.id + ' order cost = amount * price is zero or less ' + body);
        if (body.indexOf('MIN_NOTIONAL') >= 0) throw new InvalidOrder(this.id + ' order cost = amount * price is too small ' + body);
        if (body.indexOf('LOT_SIZE') >= 0) throw new InvalidOrder(this.id + ' order amount should be evenly divisible by lot size, use this.amountToLots (symbol, amount) ' + body);
        if (body.indexOf('PRICE_FILTER') >= 0) throw new InvalidOrder(this.id + ' order price exceeds allowed price precision or invalid, use this.priceToPrecision (symbol, amount) ' + body);
        if (body.indexOf('Order does not exist') >= 0) throw new OrderNotFound(this.id + ' ' + body);
      }

      if (typeof body === 'string') {
        if (body.length > 0) {
          if (body[0] === '{') {
            var response = JSON.parse(body);
            var error = this.safeValue(response, 'code');

            if (typeof error !== 'undefined') {
              if (error === -2010) {
                throw new InsufficientFunds(this.id + ' ' + this.json(response));
              } else if (error === -2011) {
                throw new OrderNotFound(this.id + ' ' + this.json(response));
              } else if (error === -1013) {
                // Invalid quantity
                throw new InvalidOrder(this.id + ' ' + this.json(response));
              }
            }
          }
        }
      }
    }
  }]);

  return binance;
}(Exchange);