"use strict"; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Math$log = require("@babel/runtime/core-js/math/log10");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
  _inherits(cex, _Exchange);

  function cex() {
    _classCallCheck(this, cex);

    return _possibleConstructorReturn(this, (cex.__proto__ || _Object$getPrototypeOf(cex)).apply(this, arguments));
  }

  _createClass(cex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(cex.prototype.__proto__ || _Object$getPrototypeOf(cex.prototype), "describe", this).call(this), {
        'id': 'cex',
        'name': 'CEX.IO',
        'countries': ['GB', 'EU', 'CY', 'RU'],
        'rateLimit': 1500,
        'hasCORS': true,
        'hasFetchTickers': true,
        'hasFetchOHLCV': true,
        'hasFetchOpenOrders': true,
        'timeframes': {
          '1m': '1m'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766442-8ddc33b0-5ed8-11e7-8b98-f786aef0f3c9.jpg',
          'api': 'https://cex.io/api',
          'www': 'https://cex.io',
          'doc': 'https://cex.io/cex-api'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': true
        },
        'api': {
          'public': {
            'get': ['currency_limits/', 'last_price/{pair}/', 'last_prices/{currencies}/', 'ohlcv/hd/{yyyymmdd}/{pair}', 'order_book/{pair}/', 'ticker/{pair}/', 'tickers/{currencies}/', 'trade_history/{pair}/'],
            'post': ['convert/{pair}', 'price_stats/{pair}']
          },
          'private': {
            'post': ['active_orders_status/', 'archived_orders/{pair}/', 'balance/', 'cancel_order/', 'cancel_orders/{pair}/', 'cancel_replace_order/{pair}/', 'close_position/{pair}/', 'get_address/', 'get_myfee/', 'get_order/', 'get_order_tx/', 'open_orders/{pair}/', 'open_orders/', 'open_position/{pair}/', 'open_positions/{pair}/', 'place_order/{pair}/']
          }
        },
        'fees': {
          'trading': {
            'maker': 0,
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
        var markets, result, p, market, id, symbol, _symbol$split, _symbol$split2, base, quote;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetCurrencyLimits();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets['data']['pairs'].length; p++) {
                  market = markets['data']['pairs'][p];
                  id = market['symbol1'] + '/' + market['symbol2'];
                  symbol = id;
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  result.push({
                    'id': id,
                    'info': market,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'precision': {
                      'price': this.precisionFromString(market['minPrice']),
                      'amount': -1 * _Math$log(market['minLotSize'])
                    },
                    'limits': {
                      'amount': {
                        'min': market['minLotSize'],
                        'max': market['maxLotSize']
                      },
                      'price': {
                        'min': parseFloat(market['minPrice']),
                        'max': parseFloat(market['maxPrice'])
                      },
                      'cost': {
                        'min': market['minLotSizeS2'],
                        'max': undefined
                      }
                    }
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
            response,
            result,
            ommited,
            balances,
            currencies,
            i,
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
                return this.privatePostBalance();

              case 5:
                response = _context2.sent;
                result = {
                  'info': response
                };
                ommited = ['username', 'timestamp'];
                balances = this.omit(response, ommited);
                currencies = _Object$keys(balances);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];

                  if (currency in balances) {
                    account = {
                      'free': this.safeFloat(balances[currency], 'available', 0.0),
                      'used': this.safeFloat(balances[currency], 'orders', 0.0),
                      'total': 0.0
                    };
                    account['total'] = this.sum(account['free'], account['used']);
                    result[currency] = account;
                  }
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
                _context3.next = 5;
                return this.publicGetOrderBookPair(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                timestamp = orderbook['timestamp'] * 1000;
                return _context3.abrupt("return", this.parseOrderBook(orderbook, timestamp));

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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv[0] * 1000, ohlcv[1], ohlcv[2], ohlcv[3], ohlcv[4], ohlcv[5]];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            ymd,
            request,
            response,
            key,
            ohlcvs,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                timeframe = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : '1m';
                since = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : undefined;
                limit = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : undefined;
                params = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : {};
                _context4.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                if (!since) since = this.milliseconds() - 86400000; // yesterday

                ymd = this.Ymd(since);
                ymd = ymd.split('-');
                ymd = ymd.join('');
                request = {
                  'pair': market['id'],
                  'yyyymmdd': ymd
                };
                _context4.next = 14;
                return this.publicGetOhlcvHdYyyymmddPair(this.extend(request, params));

              case 14:
                response = _context4.sent;
                key = 'data' + this.timeframes[timeframe];
                ohlcvs = JSON.parse(response[key]);
                return _context4.abrupt("return", this.parseOHLCVs(ohlcvs, market, timeframe, since, limit));

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOHLCV(_x2) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = undefined;
      var iso8601 = undefined;

      if ('timestamp' in ticker) {
        timestamp = parseInt(ticker['timestamp']) * 1000;
        iso8601 = this.iso8601(timestamp);
      }

      var volume = this.safeFloat(ticker, 'volume');
      var high = this.safeFloat(ticker, 'high');
      var low = this.safeFloat(ticker, 'low');
      var bid = this.safeFloat(ticker, 'bid');
      var ask = this.safeFloat(ticker, 'ask');
      var last = this.safeFloat(ticker, 'last');
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': iso8601,
        'high': high,
        'low': low,
        'bid': bid,
        'ask': ask,
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': last,
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': volume,
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var symbols,
            params,
            currencies,
            response,
            tickers,
            result,
            t,
            ticker,
            symbol,
            market,
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
                currencies = _Object$keys(this.currencies);
                _context5.next = 7;
                return this.publicGetTickersCurrencies(this.extend({
                  'currencies': currencies.join('/')
                }, params));

              case 7:
                response = _context5.sent;
                tickers = response['data'];
                result = {};

                for (t = 0; t < tickers.length; t++) {
                  ticker = tickers[t];
                  symbol = ticker['pair'].replace(':', '/');
                  market = this.markets[symbol];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context5.abrupt("return", result);

              case 12:
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
                return this.publicGetTickerPair(this.extend({
                  'pair': market['id']
                }, params));

              case 6:
                ticker = _context6.sent;
                return _context6.abrupt("return", this.parseTicker(ticker, market));

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchTicker(_x3) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = parseInt(trade['date']) * 1000;
      return {
        'info': trade,
        'id': trade['tid'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['type'],
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['amount'])
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
                return this.publicGetTradeHistoryPair(this.extend({
                  'pair': market['id']
                }, params));

              case 8:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
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
                order = {
                  'pair': this.marketId(symbol),
                  'type': side,
                  'amount': amount
                };

                if (!(type == 'limit')) {
                  _context8.next = 9;
                  break;
                }

                order['price'] = price;
                _context8.next = 14;
                break;

              case 9:
                if (!(side == 'buy')) {
                  _context8.next = 13;
                  break;
                }

                if (price) {
                  _context8.next = 12;
                  break;
                }

                throw new InvalidOrder('For market buy orders ' + this.id + " requires the amount of quote currency to spend, to calculate proper costs call createOrder (symbol, 'market', 'buy', amount, price)");

              case 12:
                order['amount'] = amount * price;

              case 13:
                order['order_type'] = type;

              case 14:
                _context8.next = 16;
                return this.privatePostPlaceOrderPair(this.extend(order, params));

              case 16:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 18:
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
                return this.loadMarkets();

              case 4:
                _context9.next = 6;
                return this.privatePostCancelOrder({
                  'id': id
                });

              case 6:
                return _context9.abrupt("return", _context9.sent);

              case 7:
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = parseInt(order['time']);
      var symbol = undefined;

      if (!market) {
        var _symbol = order['symbol1'] + '/' + order['symbol2'];

        if (_symbol in this.markets) market = this.market(_symbol);
      }

      var status = order['status'];

      if (status == 'a') {
        status = 'open'; // the unified status
      } else if (status == 'cd') {
        status = 'canceled';
      } else if (status == 'c') {
        status = 'canceled';
      } else if (status == 'd') {
        status = 'closed';
      }

      var price = this.safeFloat(order, 'price');
      var amount = this.safeFloat(order, 'amount');
      var remaining = this.safeFloat(order, 'pending');
      if (!remaining) remaining = this.safeFloat(order, 'remains');
      var filled = amount - remaining;
      var fee = undefined;
      var cost = undefined;

      if (market) {
        symbol = market['symbol'];
        cost = this.safeFloat(order, 'ta:' + market['quote']);
        var baseFee = 'fa:' + market['base'];
        var quoteFee = 'fa:' + market['quote'];
        var feeRate = this.safeFloat(order, 'tradingFeeMaker');
        if (!feeRate) feeRate = this.safeFloat(order, 'tradingFeeTaker', feeRate);
        if (feeRate) feeRate /= 100.0; // convert to mathematically-correct percentage coefficients: 1.0 = 100%

        if (baseFee in order) {
          fee = {
            'currency': market['base'],
            'rate': feeRate,
            'cost': this.safeFloat(order, baseFee)
          };
        } else if (quoteFee in order) {
          fee = {
            'currency': market['quote'],
            'rate': feeRate,
            'cost': this.safeFloat(order, quoteFee)
          };
        }
      }

      if (!cost) cost = price * filled;
      return {
        'id': order['id'],
        'datetime': this.iso8601(timestamp),
        'timestamp': timestamp,
        'status': status,
        'symbol': symbol,
        'type': undefined,
        'side': order['type'],
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'trades': undefined,
        'fee': fee,
        'info': order
      };
    }
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            since,
            limit,
            params,
            request,
            method,
            market,
            orders,
            i,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                method = 'privatePostOpenOrders';
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['pair'] = market['id'];
                  method += 'Pair';
                }

                _context10.next = 12;
                return this[method](this.extend(request, params));

              case 12:
                orders = _context10.sent;

                for (i = 0; i < orders.length; i++) {
                  orders[i] = this.extend(orders[i], {
                    'status': 'open'
                  });
                }

                return _context10.abrupt("return", this.parseOrders(orders, market, since, limit));

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
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
            response,
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
                _context11.next = 6;
                return this.privatePostGetOrder(this.extend({
                  'id': id.toString()
                }, params));

              case 6:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrder(response));

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
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
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = nonce + this.uid + this.apiKey;
        var signature = this.hmac(this.encode(auth), this.encode(this.secret));
        body = this.urlencode(this.extend({
          'key': this.apiKey,
          'signature': signature.toUpperCase(),
          'nonce': nonce
        }, query));
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
      _regeneratorRuntime.mark(function _callee12(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                api = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 'public';
                method = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 'GET';
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
                headers = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : undefined;
                body = _args12.length > 5 && _args12[5] !== undefined ? _args12[5] : undefined;
                _context12.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context12.sent;

                if (response) {
                  _context12.next = 12;
                  break;
                }

                throw new ExchangeError(this.id + ' returned ' + this.json(response));

              case 12:
                if (!(response == true)) {
                  _context12.next = 16;
                  break;
                }

                return _context12.abrupt("return", response);

              case 16:
                if (!('e' in response)) {
                  _context12.next = 23;
                  break;
                }

                if (!('ok' in response)) {
                  _context12.next = 20;
                  break;
                }

                if (!(response['ok'] == 'ok')) {
                  _context12.next = 20;
                  break;
                }

                return _context12.abrupt("return", response);

              case 20:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 23:
                if (!('error' in response)) {
                  _context12.next = 26;
                  break;
                }

                if (!response['error']) {
                  _context12.next = 26;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 26:
                return _context12.abrupt("return", response);

              case 27:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function request(_x11) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return cex;
}(Exchange);