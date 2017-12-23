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
    ExchangeError = _require.ExchangeError,
    InvalidOrder = _require.InvalidOrder,
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bittrex, _Exchange);

  function bittrex() {
    _classCallCheck(this, bittrex);

    return _possibleConstructorReturn(this, (bittrex.__proto__ || _Object$getPrototypeOf(bittrex)).apply(this, arguments));
  }

  _createClass(bittrex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bittrex.prototype.__proto__ || _Object$getPrototypeOf(bittrex.prototype), "describe", this).call(this), {
        'id': 'bittrex',
        'name': 'Bittrex',
        'countries': 'US',
        'version': 'v1.1',
        'rateLimit': 1500,
        'hasCORS': false,
        // obsolete metainfo interface
        'hasFetchTickers': true,
        'hasFetchOHLCV': true,
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchOpenOrders': true,
        'hasFetchMyTrades': false,
        'hasFetchCurrencies': true,
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
          'fetchTickers': true,
          'fetchOHLCV': true,
          'fetchOrder': true,
          'fetchOrders': true,
          'fetchClosedOrders': 'emulated',
          'fetchOpenOrders': true,
          'fetchMyTrades': false,
          'fetchCurrencies': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': 'oneMin',
          '5m': 'fiveMin',
          '30m': 'thirtyMin',
          '1h': 'hour',
          '1d': 'day'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766352-cf0b3c26-5ed5-11e7-82b7-f3826b7a97d8.jpg',
          'api': {
            'public': 'https://bittrex.com/api',
            'account': 'https://bittrex.com/api',
            'market': 'https://bittrex.com/api',
            'v2': 'https://bittrex.com/api/v2.0/pub'
          },
          'www': 'https://bittrex.com',
          'doc': ['https://bittrex.com/Home/Api', 'https://www.npmjs.org/package/node.bittrex.api'],
          'fees': ['https://bittrex.com/Fees', 'https://support.bittrex.com/hc/en-us/articles/115000199651-What-fees-does-Bittrex-charge-']
        },
        'api': {
          'v2': {
            'get': ['currencies/GetBTCPrice', 'market/GetTicks', 'market/GetLatestTick', 'Markets/GetMarketSummaries', 'market/GetLatestTick']
          },
          'public': {
            'get': ['currencies', 'markethistory', 'markets', 'marketsummaries', 'marketsummary', 'orderbook', 'ticker']
          },
          'account': {
            'get': ['balance', 'balances', 'depositaddress', 'deposithistory', 'order', 'orderhistory', 'withdrawalhistory', 'withdraw']
          },
          'market': {
            'get': ['buylimit', 'buymarket', 'cancel', 'openorders', 'selllimit', 'sellmarket']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'maker': 0.0025,
            'taker': 0.0025
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.001,
              'LTC': 0.01,
              'DOGE': 2,
              'VTC': 0.02,
              'PPC': 0.02,
              'FTC': 0.2,
              'RDD': 2,
              'NXT': 2,
              'DASH': 0.002,
              'POT': 0.002
            },
            'deposit': {
              'BTC': 0,
              'LTC': 0,
              'DOGE': 0,
              'VTC': 0,
              'PPC': 0,
              'FTC': 0,
              'RDD': 0,
              'NXT': 0,
              'DASH': 0,
              'POT': 0
            }
          }
        }
      });
    }
  }, {
    key: "costToPrecision",
    value: function costToPrecision(symbol, cost) {
      return this.truncate(parseFloat(cost), this.markets[symbol]['precision']['price']);
    }
  }, {
    key: "feeToPrecision",
    value: function feeToPrecision(symbol, fee) {
      return this.truncate(parseFloat(fee), this.markets[symbol]['precision']['price']);
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, result, i, market, id, base, quote, symbol, precision, active;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.v2GetMarketsGetMarketSummaries();

              case 2:
                response = _context.sent;
                result = [];

                for (i = 0; i < response['result'].length; i++) {
                  market = response['result'][i]['Market'];
                  id = market['MarketName'];
                  base = market['MarketCurrency'];
                  quote = market['BaseCurrency'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  active = market['IsActive'];
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': active,
                    'info': market,
                    'lot': Math.pow(10, -precision['amount']),
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': market['MinTradeSize'],
                        'max': undefined
                      },
                      'price': {
                        'min': undefined,
                        'max': undefined
                      }
                    }
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
            indexed,
            keys,
            i,
            id,
            currency,
            account,
            balance,
            free,
            total,
            used,
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
                return this.accountGetBalances();

              case 5:
                response = _context2.sent;
                balances = response['result'];
                result = {
                  'info': balances
                };
                indexed = this.indexBy(balances, 'Currency');
                keys = _Object$keys(indexed);

                for (i = 0; i < keys.length; i++) {
                  id = keys[i];
                  currency = this.commonCurrencyCode(id);
                  account = this.account();
                  balance = indexed[id];
                  free = parseFloat(balance['Available']);
                  total = parseFloat(balance['Balance']);
                  used = total - free;
                  account['free'] = free;
                  account['used'] = used;
                  account['total'] = total;
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 12:
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
                  'type': 'both'
                }, params));

              case 5:
                response = _context3.sent;
                orderbook = response['result'];

                if ('type' in params) {
                  if (params['type'] == 'buy') {
                    orderbook = {
                      'buy': response['result'],
                      'sell': []
                    };
                  } else if (params['type'] == 'sell') {
                    orderbook = {
                      'buy': [],
                      'sell': response['result']
                    };
                  }
                }

                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'Rate', 'Quantity'));

              case 9:
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
      var timestamp = this.parse8601(ticker['TimeStamp']);
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'High'),
        'low': this.safeFloat(ticker, 'Low'),
        'bid': this.safeFloat(ticker, 'Bid'),
        'ask': this.safeFloat(ticker, 'Ask'),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'Last'),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'Volume'),
        'quoteVolume': this.safeFloat(ticker, 'BaseVolume'),
        'info': ticker
      };
    }
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var params,
            response,
            currencies,
            result,
            i,
            currency,
            id,
            code,
            precision,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.next = 3;
                return this.publicGetCurrencies(params);

              case 3:
                response = _context4.sent;
                currencies = response['result'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['Currency']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  code = this.commonCurrencyCode(id);
                  precision = 8; // default precision, todo: fix "magic constants"

                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['CurrencyLong'],
                    'active': currency['IsActive'],
                    'status': 'ok',
                    'fee': currency['TxFee'],
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
                        'min': currency['TxFee'],
                        'max': Math.pow(10, precision)
                      }
                    }
                  };
                }

                return _context4.abrupt("return", result);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
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
            response,
            tickers,
            result,
            t,
            ticker,
            id,
            market,
            symbol,
            _id$split,
            _id$split2,
            quote,
            base,
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
                return this.publicGetMarketsummaries(params);

              case 6:
                response = _context5.sent;
                tickers = response['result'];
                result = {};

                for (t = 0; t < tickers.length; t++) {
                  ticker = tickers[t];
                  id = ticker['MarketName'];
                  market = undefined;
                  symbol = id;

                  if (id in this.markets_by_id) {
                    market = this.markets_by_id[id];
                    symbol = market['symbol'];
                  } else {
                    _id$split = id.split('-'), _id$split2 = _slicedToArray(_id$split, 2), quote = _id$split2[0], base = _id$split2[1];
                    base = this.commonCurrencyCode(base);
                    quote = this.commonCurrencyCode(quote);
                    symbol = base + '/' + quote;
                  }

                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context5.abrupt("return", result);

              case 11:
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
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var params,
            market,
            response,
            ticker,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context6.next = 6;
                return this.publicGetMarketsummary(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                response = _context6.sent;
                ticker = response['result'][0];
                return _context6.abrupt("return", this.parseTicker(ticker, market));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.parse8601(trade['TimeStamp']);
      var side = undefined;

      if (trade['OrderType'] == 'BUY') {
        side = 'buy';
      } else if (trade['OrderType'] == 'SELL') {
        side = 'sell';
      }

      var id = undefined;
      if ('Id' in trade) id = trade['Id'].toString();
      return {
        'id': id,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': 'limit',
        'side': side,
        'price': parseFloat(trade['Price']),
        'amount': parseFloat(trade['Quantity'])
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
                _context7.next = 8;
                return this.publicGetMarkethistory(this.extend({
                  'market': market['id']
                }, params));

              case 8:
                response = _context7.sent;

                if (!('result' in response)) {
                  _context7.next = 12;
                  break;
                }

                if (!(typeof response['result'] != 'undefined')) {
                  _context7.next = 12;
                  break;
                }

                return _context7.abrupt("return", this.parseTrades(response['result'], market, since, limit));

              case 12:
                throw new ExchangeError(this.id + ' fetchTrades() returned undefined response');

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1d';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var timestamp = this.parse8601(ohlcv['T']);
      return [timestamp, ohlcv['O'], ohlcv['H'], ohlcv['L'], ohlcv['C'], ohlcv['V']];
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
                  'tickInterval': this.timeframes[timeframe],
                  'marketName': market['id']
                };
                _context8.next = 10;
                return this.v2GetMarketGetTicks(this.extend(request, params));

              case 10:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseOHLCVs(response['result'], market, timeframe, since, limit));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchOHLCV(_x4) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            orders,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : undefined;
                since = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : undefined;
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['market'] = market['id'];
                }

                _context9.next = 11;
                return this.marketGetOpenorders(this.extend(request, params));

              case 11:
                response = _context9.sent;
                orders = this.parseOrders(response['result'], market, since, limit);
                return _context9.abrupt("return", this.filterOrdersBySymbol(orders, symbol));

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(symbol, type, side, amount) {
        var price,
            params,
            market,
            method,
            order,
            response,
            result,
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
                method = 'marketGet' + this.capitalize(side) + type;
                order = {
                  'market': market['id'],
                  'quantity': this.amountToPrecision(symbol, amount)
                };
                if (type == 'limit') order['rate'] = this.priceToPrecision(symbol, price);
                _context10.next = 10;
                return this[method](this.extend(order, params));

              case 10:
                response = _context10.sent;
                result = {
                  'info': response,
                  'id': response['result']['uuid']
                };
                return _context10.abrupt("return", result);

              case 13:
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
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11(id) {
        var symbol,
            params,
            response,
            message,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                params = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
                _context11.next = 4;
                return this.loadMarkets();

              case 4:
                response = undefined;
                _context11.prev = 5;
                _context11.next = 8;
                return this.marketGetCancel(this.extend({
                  'uuid': id
                }, params));

              case 8:
                response = _context11.sent;
                _context11.next = 20;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](5);

                if (!this.last_json_response) {
                  _context11.next = 19;
                  break;
                }

                message = this.safeString(this.last_json_response, 'message');

                if (!(message == 'ORDER_NOT_OPEN')) {
                  _context11.next = 17;
                  break;
                }

                throw new InvalidOrder(this.id + ' cancelOrder() error: ' + this.last_http_response);

              case 17:
                if (!(message == 'UUID_INVALID')) {
                  _context11.next = 19;
                  break;
                }

                throw new OrderNotFound(this.id + ' cancelOrder() error: ' + this.last_http_response);

              case 19:
                throw _context11.t0;

              case 20:
                return _context11.abrupt("return", response);

              case 21:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[5, 11]]);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = undefined;
      if ('OrderType' in order) side = order['OrderType'] == 'LIMIT_BUY' ? 'buy' : 'sell';
      if ('Type' in order) side = order['Type'] == 'LIMIT_BUY' ? 'buy' : 'sell';
      var status = 'open';

      if (order['Closed']) {
        status = 'closed';
      } else if (order['CancelInitiated']) {
        status = 'canceled';
      }

      var symbol = undefined;

      if (!market) {
        if ('Exchange' in order) if (order['Exchange'] in this.markets_by_id) market = this.markets_by_id[order['Exchange']];
      }

      if (market) symbol = market['symbol'];
      var timestamp = undefined;
      if ('Opened' in order) timestamp = this.parse8601(order['Opened']);
      if ('TimeStamp' in order) timestamp = this.parse8601(order['TimeStamp']);
      var fee = undefined;
      var commission = undefined;

      if ('Commission' in order) {
        commission = 'Commission';
      } else if ('CommissionPaid' in order) {
        commission = 'CommissionPaid';
      }

      if (commission) {
        fee = {
          'cost': parseFloat(order[commission]),
          'currency': market['quote']
        };
      }

      var price = this.safeFloat(order, 'Limit');
      var cost = this.safeFloat(order, 'Price');
      var amount = this.safeFloat(order, 'Quantity');
      var remaining = this.safeFloat(order, 'QuantityRemaining', 0.0);
      var filled = amount - remaining;

      if (!cost) {
        if (price && amount) cost = price * amount;
      }

      if (!price) {
        if (cost && filled) price = cost / filled;
      }

      var average = this.safeFloat(order, 'PricePerUnit');
      var result = {
        'info': order,
        'id': order['OrderUuid'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': 'limit',
        'side': side,
        'price': price,
        'cost': cost,
        'average': average,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': fee
      };
      return result;
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(id) {
        var symbol,
            params,
            response,
            message,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                params = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};
                _context12.next = 4;
                return this.loadMarkets();

              case 4:
                response = undefined;
                _context12.prev = 5;
                _context12.next = 8;
                return this.accountGetOrder(this.extend({
                  'uuid': id
                }, params));

              case 8:
                response = _context12.sent;
                _context12.next = 18;
                break;

              case 11:
                _context12.prev = 11;
                _context12.t0 = _context12["catch"](5);

                if (!this.last_json_response) {
                  _context12.next = 17;
                  break;
                }

                message = this.safeString(this.last_json_response, 'message');

                if (!(message == 'UUID_INVALID')) {
                  _context12.next = 17;
                  break;
                }

                throw new OrderNotFound(this.id + ' fetchOrder() error: ' + this.last_http_response);

              case 17:
                throw _context12.t0;

              case 18:
                return _context12.abrupt("return", this.parseOrder(response['result']));

              case 19:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[5, 11]]);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            orders,
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
                request = {};
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['market'] = market['id'];
                }

                _context13.next = 11;
                return this.accountGetOrderhistory(this.extend(request, params));

              case 11:
                response = _context13.sent;
                orders = this.parseOrders(response['result'], market, since, limit);
                return _context13.abrupt("return", this.filterOrdersBySymbol(orders, symbol));

              case 14:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchOrders() {
        return _fetchOrders.apply(this, arguments);
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
                return this.fetchOrders(symbol, params);

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
      _regeneratorRuntime.mark(function _callee15(currency) {
        var params,
            currencyId,
            response,
            address,
            message,
            status,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                params = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
                currencyId = this.currencyId(currency);
                _context15.next = 4;
                return this.accountGetDepositaddress(this.extend({
                  'currency': currencyId
                }, params));

              case 4:
                response = _context15.sent;
                address = this.safeString(response['result'], 'Address');
                message = this.safeString(response, 'message');
                status = 'ok';
                if (!address || message == 'ADDRESS_GENERATING') status = 'pending';
                return _context15.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': status,
                  'info': response
                });

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      _regeneratorRuntime.mark(function _callee16(currency, amount, address) {
        var params,
            currencyId,
            response,
            id,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                params = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
                currencyId = this.currencyId(currency);
                _context16.next = 4;
                return this.accountGetWithdraw(this.extend({
                  'currency': currencyId,
                  'quantity': amount,
                  'address': address
                }, params));

              case 4:
                response = _context16.sent;
                id = undefined;

                if ('result' in response) {
                  if ('uuid' in response['result']) id = response['result']['uuid'];
                }

                return _context16.abrupt("return", {
                  'info': response,
                  'id': id
                });

              case 8:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      var url = this.urls['api'][api] + '/';
      if (api != 'v2') url += this.version + '/';

      if (api == 'public') {
        url += api + '/' + method.toLowerCase() + path;
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else if (api == 'v2') {
        url += path;
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        url += api + '/';
        if (api == 'account' && path != 'withdraw' || path == 'openorders') url += method.toLowerCase();
        url += path + '?' + this.urlencode(this.extend({
          'nonce': nonce,
          'apikey': this.apiKey
        }, params));
        var signature = this.hmac(this.encode(url), this.encode(this.secret), 'sha512');
        headers = {
          'apisign': signature
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
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code >= 400) {
        if (body[0] == "{") {
          var response = JSON.parse(body);

          if ('success' in response) {
            if (!response['success']) {
              if ('message' in response) {
                if (response['message'] == 'MIN_TRADE_REQUIREMENT_NOT_MET') throw new InvalidOrder(this.id + ' ' + this.json(response));
                if (response['message'] == 'APIKEY_INVALID') throw new AuthenticationError(this.id + ' ' + this.json(response));
                if (response['message'] == 'DUST_TRADE_DISALLOWED_MIN_VALUE_50K_SAT') throw new InvalidOrder(this.id + ' order cost should be over 50k satoshi ' + this.json(response));
              }

              throw new ExchangeError(this.id + ' ' + this.json(response));
            }
          }
        }
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee17(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                api = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 'public';
                method = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : 'GET';
                params = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : {};
                headers = _args17.length > 4 && _args17[4] !== undefined ? _args17[4] : undefined;
                body = _args17.length > 5 && _args17[5] !== undefined ? _args17[5] : undefined;
                _context17.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context17.sent;

                if (!('success' in response)) {
                  _context17.next = 11;
                  break;
                }

                if (!response['success']) {
                  _context17.next = 11;
                  break;
                }

                return _context17.abrupt("return", response);

              case 11:
                if (!('message' in response)) {
                  _context17.next = 16;
                  break;
                }

                if (!(response['message'] == 'ADDRESS_GENERATING')) {
                  _context17.next = 14;
                  break;
                }

                return _context17.abrupt("return", response);

              case 14:
                if (!(response['message'] == "INSUFFICIENT_FUNDS")) {
                  _context17.next = 16;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 16:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 17:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function request(_x15) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bittrex;
}(Exchange);