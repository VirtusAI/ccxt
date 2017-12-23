"use strict"; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Math$log = require("@babel/runtime/core-js/math/log10");

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
    InvalidOrder = _require.InvalidOrder; //  ---------------------------------------------------------------------------


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
        'countries': 'CN',
        // China
        'rateLimit': 500,
        'hasCORS': false,
        // obsolete metainfo interface
        'hasFetchTickers': true,
        'hasFetchOHLCV': true,
        'hasFetchMyTrades': true,
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchOpenOrders': true,
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
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
            'private': 'https://api.binance.com/api/v3'
          },
          'www': 'https://www.binance.com',
          'doc': 'https://www.binance.com/restapipub.html',
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
          'public': {
            'get': ['exchangeInfo', 'ping', 'time', 'depth', 'aggTrades', 'klines', 'ticker/24hr', 'ticker/allPrices', 'ticker/allBookTickers']
          },
          'private': {
            'get': ['order', 'openOrders', 'allOrders', 'account', 'myTrades'],
            'post': ['order', 'order/test', 'userDataStream'],
            'put': ['userDataStream'],
            'delete': ['order', 'userDataStream']
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
              'BNB': 1.0,
              'BTC': 0.0005,
              'ETH': 0.005,
              'LTC': 0.001,
              'NEO': 0.0,
              'QTUM': 0.01,
              'SNT': 50.0,
              'BNT': 0.6,
              'EOS': 2.0,
              'BCH': 0.0005,
              'GAS': 0.0,
              'USDT': 5.0,
              'OAX': 2.0,
              'DNT': 30.0,
              'MCO': 0.15,
              'ICN': 0.5,
              'WTC': 0.2,
              'OMG': 0.1,
              'ZRX': 5.0,
              'STRAT': 0.1,
              'SNGLS': 8.0,
              'BQX': 2.0,
              'KNC': 1.0,
              'FUN': 50.0,
              'SNM': 10.0,
              'LINK': 5.0,
              'XVG': 0.1,
              'CTR': 1.0,
              'SALT': 0.3,
              'IOTA': 0.0,
              'MDA': 0.5,
              'MTL': 0.15,
              'SUB': 10.0,
              'ETC': 0.01,
              'MTH': 10.0,
              'ENG': 2.0,
              'AST': 4.0,
              'BTG': undefined,
              'DASH': 0.002,
              'EVX': 1.0,
              'REQ': 30.0,
              'LRC': 7.0,
              'VIB': 7.0,
              'HSR': 0.0001,
              'TRX': 500.0,
              'POWR': 15.0,
              'ARK': 0.1,
              'YOYO': 30.0,
              'XRP': 0.15,
              'MOD': 1.0,
              'ENJ': 1.0,
              'STORJ': 2.0
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
        }
      });
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, markets, result, i, market, id, base, quote, symbol, filters, precision, active, lot, entry, filter, _filter;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetExchangeInfo();

              case 2:
                response = _context.sent;
                markets = response['symbols'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['symbol'];
                  base = this.commonCurrencyCode(market['baseAsset']);
                  quote = this.commonCurrencyCode(market['quoteAsset']);
                  symbol = base + '/' + quote;
                  filters = this.indexBy(market['filters'], 'filterType');
                  precision = {
                    'base': market['baseAssetPrecision'],
                    'quote': market['quotePrecision'],
                    'amount': market['baseAssetPrecision'],
                    'price': market['quotePrecision']
                  };
                  active = market['status'] == 'TRADING';
                  lot = -1 * _Math$log(precision['amount']);
                  entry = this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
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
    key: "calculateFee",
    value: function calculateFee(symbol, type, side, amount, price) {
      var takerOrMaker = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'taker';
      var params = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var market = this.markets[symbol];
      var key = 'quote';
      var rate = market[takerOrMaker];
      var cost = parseFloat(this.costToPrecision(symbol, amount * rate));

      if (side == 'sell') {
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
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            response,
            result,
            balances,
            i,
            balance,
            asset,
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
                return this.privateGetAccount(params);

              case 5:
                response = _context2.sent;
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
                return this.publicGetDepth(this.extend({
                  'symbol': market['id'],
                  'limit': 100 // default = maximum = 100

                }, params));

              case 6:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook));

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
      var timestamp = this.safeInteger(ticker, 'closeTime');
      if (typeof timestamp == 'undefined') timestamp = this.milliseconds();
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
        'ask': this.safeFloat(ticker, 'askPrice'),
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            market,
            response,
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
                return this.publicGetTicker24hr(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTicker(response, market));

              case 8:
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
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var symbols,
            params,
            rawTickers,
            tickers,
            i,
            tickersBySymbol,
            result,
            _i,
            symbol,
            _args5 = arguments;

        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbols = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : undefined;
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 4;
                return this.loadMarkets();

              case 4:
                _context5.next = 6;
                return this.publicGetTicker24hr(params);

              case 6:
                rawTickers = _context5.sent;
                tickers = [];

                for (i = 0; i < rawTickers.length; i++) {
                  tickers.push(this.parseTicker(rawTickers[i]));
                }

                tickersBySymbol = this.indexBy(tickers, 'symbol'); // return all of them if no symbols were passed in the first argument

                if (symbols) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt("return", tickersBySymbol);

              case 12:
                // otherwise filter by symbol
                result = {};

                for (_i = 0; _i < symbols.length; _i++) {
                  symbol = symbols[_i];
                  if (symbol in tickersBySymbol) result[symbol] = tickersBySymbol[symbol];
                }

                return _context5.abrupt("return", result);

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                timeframe = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : '1m';
                since = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                limit = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : undefined;
                params = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : {};
                _context6.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'interval': this.timeframes[timeframe]
                };
                request['limit'] = limit ? limit : 500; // default == max == 500

                if (since) request['startTime'] = since;
                _context6.next = 12;
                return this.publicGetKlines(this.extend(request, params));

              case 12:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var since,
            limit,
            params,
            market,
            request,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                since = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                _context7.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };

                if (since) {
                  request['startTime'] = since;
                  request['endTime'] = since + 86400000;
                }

                if (limit) request['limit'] = limit; // 'fromId': 123,    // ID to get aggregate trades from INCLUSIVE.
                // 'startTime': 456, // Timestamp in ms to get aggregate trades from INCLUSIVE.
                // 'endTime': 789,   // Timestamp in ms to get aggregate trades until INCLUSIVE.
                // 'limit': 500,     // default = maximum = 500

                _context7.next = 11;
                return this.publicGetAggTrades(this.extend(request, params));

              case 11:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseTrades(response, market, since, limit));

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchTrades(_x4) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      if (status == 'NEW') return 'open';
      if (status == 'PARTIALLY_FILLED') return 'open';
      if (status == 'FILLED') return 'closed';
      if (status == 'CANCELED') return 'canceled';
      return status.toLowerCase();
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var status = this.parseOrderStatus(order['status']);
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

      var timestamp = order['time'];
      var price = parseFloat(order['price']);
      var amount = parseFloat(order['origQty']);
      var filled = this.safeFloat(order, 'executedQty', 0.0);
      var remaining = Math.max(amount - filled, 0.0);
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
        'cost': price * amount,
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
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
            market,
            order,
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
                market = this.market(symbol);
                order = {
                  'symbol': market['id'],
                  'quantity': this.amountToPrecision(symbol, amount),
                  'type': type.toUpperCase(),
                  'side': side.toUpperCase()
                };

                if (type == 'limit') {
                  order = this.extend(order, {
                    'price': this.priceToPrecision(symbol, price),
                    'timeInForce': 'GTC' // 'GTC' = Good To Cancel (default), 'IOC' = Immediate Or Cancel

                  });
                }

                _context8.next = 9;
                return this.privatePostOrder(this.extend(order, params));

              case 9:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['orderId'].toString()
                });

              case 11:
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
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            market,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};

                if (symbol) {
                  _context9.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrder requires a symbol param');

              case 4:
                _context9.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                _context9.next = 9;
                return this.privateGetOrder(this.extend({
                  'symbol': market['id'],
                  'orderId': parseInt(id)
                }, params));

              case 9:
                response = _context9.sent;
                return _context9.abrupt("return", this.parseOrder(response, market));

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};

                if (symbol) {
                  _context10.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders requires a symbol param');

              case 6:
                _context10.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (limit) request['limit'] = limit;
                _context10.next = 13;
                return this.privateGetAllOrders(this.extend(request, params));

              case 13:
                response = _context10.sent;
                return _context10.abrupt("return", this.parseOrders(response, market, since, limit));

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            market,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};

                if (symbol) {
                  _context11.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol param');

              case 6:
                _context11.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                _context11.next = 11;
                return this.privateGetOpenOrders(this.extend({
                  'symbol': market['id']
                }, params));

              case 11:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrders(response, market, since, limit));

              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(id) {
        var symbol,
            params,
            market,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                params = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};

                if (symbol) {
                  _context12.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a symbol param');

              case 4:
                _context12.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                response = undefined;
                _context12.prev = 8;
                _context12.next = 11;
                return this.privateDeleteOrder(this.extend({
                  'symbol': market['id'],
                  'orderId': parseInt(id) // 'origClientOrderId': id,

                }, params));

              case 11:
                response = _context12.sent;
                _context12.next = 19;
                break;

              case 14:
                _context12.prev = 14;
                _context12.t0 = _context12["catch"](8);

                if (!(this.last_http_response.indexOf('UNKNOWN_ORDER') >= 0)) {
                  _context12.next = 18;
                  break;
                }

                throw new OrderNotFound(this.id + ' cancelOrder() error: ' + this.last_http_response);

              case 18:
                throw _context12.t0;

              case 19:
                return _context12.abrupt("return", response);

              case 20:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[8, 14]]);
      }));

      return function cancelOrder(_x10) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "nonce",
    value: function nonce() {
      return this.milliseconds();
    }
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
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

                if (symbol) {
                  _context13.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchMyTrades requires a symbol');

              case 6:
                _context13.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (limit) request['limit'] = limit;
                _context13.next = 13;
                return this.privateGetMyTrades(this.extend(request, params));

              case 13:
                response = _context13.sent;
                return _context13.abrupt("return", this.parseTrades(response, market, since, limit));

              case 15:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (currency == 'BCC') return 'BCH';
      return currency;
    }
  }, {
    key: "currencyId",
    value: function currencyId(currency) {
      if (currency == 'BCH') return 'BCC';
      return currency;
    }
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(currency) {
        var params,
            response,
            address,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                params = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
                _context14.next = 3;
                return this.wapiGetDepositAddress(this.extend({
                  'asset': this.currencyId(currency),
                  'recvWindow': 10000000
                }, params));

              case 3:
                response = _context14.sent;

                if (!('success' in response)) {
                  _context14.next = 8;
                  break;
                }

                if (!response['success']) {
                  _context14.next = 8;
                  break;
                }

                address = this.safeString(response, 'address');
                return _context14.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 8:
                throw new ExchangeError(this.id + ' fetchDepositAddress failed: ' + this.last_http_response);

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
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
      _regeneratorRuntime.mark(function _callee15(currency, amount, address) {
        var params,
            response,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                params = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
                _context15.next = 3;
                return this.wapiPostWithdraw(this.extend({
                  'asset': this.currencyId(currency),
                  'address': address,
                  'amount': parseFloat(amount),
                  'recvWindow': 10000000
                }, params));

              case 3:
                response = _context15.sent;
                return _context15.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      if (api == 'wapi') url += '.html';

      if (api == 'private' || api == 'wapi') {
        this.checkRequiredCredentials();
        var nonce = this.milliseconds();
        var query = this.urlencode(this.extend({
          'timestamp': nonce
        }, params));
        var signature = this.hmac(this.encode(query), this.encode(this.secret));
        query += '&' + 'signature=' + signature;
        headers = {
          'X-MBX-APIKEY': this.apiKey
        };

        if (method == 'GET' || api == 'wapi') {
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
        if (body.indexOf('MIN_NOTIONAL') >= 0) throw new InvalidOrder(this.id + ' order cost = amount * price should be > 0.001 BTC ' + body);
        if (body.indexOf('LOT_SIZE') >= 0) throw new InvalidOrder(this.id + ' order amount should be evenly divisible by lot size, use this.amountToLots (symbol, amount) ' + body);
        if (body.indexOf('PRICE_FILTER') >= 0) throw new InvalidOrder(this.id + ' order price exceeds allowed price precision or invalid, use this.priceToPrecision (symbol, amount) ' + body);
        if (body.indexOf('Order does not exist') >= 0) throw new OrderNotFound(this.id + ' ' + body);
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                api = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 'public';
                method = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : 'GET';
                params = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
                headers = _args16.length > 4 && _args16[4] !== undefined ? _args16[4] : undefined;
                body = _args16.length > 5 && _args16[5] !== undefined ? _args16[5] : undefined;
                _context16.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context16.sent;

                if (!('code' in response)) {
                  _context16.next = 15;
                  break;
                }

                if (!(response['code'] < 0)) {
                  _context16.next = 15;
                  break;
                }

                if (!(response['code'] == -2010)) {
                  _context16.next = 12;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 12:
                if (!(response['code'] == -2011)) {
                  _context16.next = 14;
                  break;
                }

                throw new OrderNotFound(this.id + ' ' + this.json(response));

              case 14:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 15:
                return _context16.abrupt("return", response);

              case 16:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function request(_x15) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return binance;
}(Exchange);