"use strict"; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
    NotSupported = _require.NotSupported,
    InvalidOrder = _require.InvalidOrder,
    OrderNotFound = _require.OrderNotFound; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitfinex, _Exchange);

  function bitfinex() {
    _classCallCheck(this, bitfinex);

    return _possibleConstructorReturn(this, (bitfinex.__proto__ || _Object$getPrototypeOf(bitfinex)).apply(this, arguments));
  }

  _createClass(bitfinex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitfinex.prototype.__proto__ || _Object$getPrototypeOf(bitfinex.prototype), "describe", this).call(this), {
        'id': 'bitfinex',
        'name': 'Bitfinex',
        'countries': 'US',
        'version': 'v1',
        'rateLimit': 1500,
        'hasCORS': false,
        // old metainfo interface
        'hasFetchOrder': true,
        'hasFetchTickers': true,
        'hasDeposit': true,
        'hasWithdraw': true,
        'hasFetchOHLCV': true,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        // new metainfo interface
        'has': {
          'fetchOHLCV': true,
          'fetchTickers': true,
          'fetchOrder': true,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true,
          'fetchMyTrades': true,
          'withdraw': true,
          'deposit': true
        },
        'timeframes': {
          '1m': '1m',
          '5m': '5m',
          '15m': '15m',
          '30m': '30m',
          '1h': '1h',
          '3h': '3h',
          '6h': '6h',
          '12h': '12h',
          '1d': '1D',
          '1w': '7D',
          '2w': '14D',
          '1M': '1M'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg',
          'api': 'https://api.bitfinex.com',
          'www': 'https://www.bitfinex.com',
          'doc': ['https://bitfinex.readme.io/v1/docs', 'https://github.com/bitfinexcom/bitfinex-api-node']
        },
        'api': {
          'v2': {
            'get': ['candles/trade:{timeframe}:{symbol}/{section}', 'candles/trade:{timeframe}:{symbol}/last', 'candles/trade:{timeframe}:{symbol}/hist']
          },
          'public': {
            'get': ['book/{symbol}', // 'candles/{symbol}',
            'lendbook/{currency}', 'lends/{currency}', 'pubticker/{symbol}', 'stats/{symbol}', 'symbols', 'symbols_details', 'tickers', 'today', 'trades/{symbol}']
          },
          'private': {
            'post': ['account_fees', 'account_infos', 'balances', 'basket_manage', 'credits', 'deposit/new', 'funding/close', 'history', 'history/movements', 'key_info', 'margin_infos', 'mytrades', 'mytrades_funding', 'offer/cancel', 'offer/new', 'offer/status', 'offers', 'offers/hist', 'order/cancel', 'order/cancel/all', 'order/cancel/multi', 'order/cancel/replace', 'order/new', 'order/new/multi', 'order/status', 'orders', 'orders/hist', 'position/claim', 'positions', 'summary', 'taken_funds', 'total_taken_funds', 'transfer', 'unused_taken_funds', 'withdraw']
          }
        },
        'fees': {
          'trading': {
            'tierBased': true,
            'percentage': true,
            'maker': 0.1 / 100,
            'taker': 0.2 / 100,
            'tiers': {
              'taker': [[0, 0.2 / 100], [500000, 0.2 / 100], [1000000, 0.2 / 100], [2500000, 0.2 / 100], [5000000, 0.2 / 100], [7500000, 0.2 / 100], [10000000, 0.18 / 100], [15000000, 0.16 / 100], [20000000, 0.14 / 100], [25000000, 0.12 / 100], [30000000, 0.1 / 100]],
              'maker': [[0, 0.1 / 100], [500000, 0.08 / 100], [1000000, 0.06 / 100], [2500000, 0.04 / 100], [5000000, 0.02 / 100], [7500000, 0], [10000000, 0], [15000000, 0], [20000000, 0], [25000000, 0], [30000000, 0]]
            }
          },
          'funding': {
            'tierBased': false,
            // true for tier-based/progressive
            'percentage': false,
            // fixed commission
            'deposit': {
              'BTC': 0.0005,
              'IOTA': 0.5,
              'ETH': 0.01,
              'BCH': 0.01,
              'LTC': 0.1,
              'EOS': 0.1,
              'XMR': 0.04,
              'SAN': 0.1,
              'DASH': 0.01,
              'ETC': 0.01,
              'XPR': 0.02,
              'YYW': 0.1,
              'NEO': 0,
              'ZEC': 0.1,
              'BTG': 0,
              'OMG': 0.1,
              'DATA': 1,
              'QASH': 1,
              'ETP': 0.01,
              'QTUM': 0.01,
              'EDO': 0.5,
              'AVT': 0.5,
              'USDT': 0
            },
            'withdraw': {
              'BTC': 0.0005,
              'IOTA': 0.5,
              'ETH': 0.01,
              'BCH': 0.01,
              'LTC': 0.1,
              'EOS': 0.1,
              'XMR': 0.04,
              'SAN': 0.1,
              'DASH': 0.01,
              'ETC': 0.01,
              'XPR': 0.02,
              'YYW': 0.1,
              'NEO': 0,
              'ZEC': 0.1,
              'BTG': 0,
              'OMG': 0.1,
              'DATA': 1,
              'QASH': 1,
              'ETP': 0.01,
              'QTUM': 0.01,
              'EDO': 0.5,
              'AVT': 0.5,
              'USDT': 5
            }
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      // issue #4 Bitfinex names Dash as DSH, instead of DASH
      if (currency == 'DSH') return 'DASH';
      if (currency == 'QTM') return 'QTUM';
      if (currency == 'BCC') return 'CST_BCC';
      if (currency == 'BCU') return 'CST_BCU'; // issue #796

      if (currency == 'IOT') return 'IOTA';
      return currency;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, result, p, market, id, baseId, quoteId, base, quote, symbol, precision;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetSymbolsDetails();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['pair'].toUpperCase();
                  baseId = id.slice(0, 3);
                  quoteId = id.slice(3, 6);
                  base = this.commonCurrencyCode(baseId);
                  quote = this.commonCurrencyCode(quoteId);
                  symbol = base + '/' + quote;
                  precision = {
                    'price': market['price_precision'],
                    'amount': market['price_precision']
                  };
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'active': true,
                    'info': market,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': parseFloat(market['minimum_order_size']),
                        'max': parseFloat(market['maximum_order_size'])
                      },
                      'price': {
                        'min': Math.pow(10, -precision['price']),
                        'max': Math.pow(10, precision['price'])
                      },
                      'cost': {
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
            balanceType,
            balances,
            result,
            i,
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
                balanceType = this.safeString(params, 'type', 'exchange');
                _context2.next = 6;
                return this.privatePostBalances();

              case 6:
                balances = _context2.sent;
                result = {
                  'info': balances
                };

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];

                  if (balance['type'] == balanceType) {
                    currency = balance['currency'];
                    uppercase = currency.toUpperCase();
                    uppercase = this.commonCurrencyCode(uppercase);
                    account = this.account();
                    account['free'] = parseFloat(balance['available']);
                    account['total'] = parseFloat(balance['amount']);
                    account['used'] = account['total'] - account['free'];
                    result[uppercase] = account;
                  }
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
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount'));

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
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            tickers,
            result,
            i,
            ticker,
            id,
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
                return this.publicGetTickers(params);

              case 6:
                tickers = _context4.sent;
                result = {};
                i = 0;

              case 9:
                if (!(i < tickers.length)) {
                  _context4.next = 26;
                  break;
                }

                ticker = tickers[i];

                if (!('pair' in ticker)) {
                  _context4.next = 22;
                  break;
                }

                id = ticker['pair'];

                if (!(id in this.markets_by_id)) {
                  _context4.next = 19;
                  break;
                }

                market = this.markets_by_id[id];
                symbol = market['symbol'];
                result[symbol] = this.parseTicker(ticker, market);
                _context4.next = 20;
                break;

              case 19:
                throw new ExchangeError(this.id + ' fetchTickers() failed to recognize symbol ' + id + ' ' + this.json(ticker));

              case 20:
                _context4.next = 23;
                break;

              case 22:
                throw new ExchangeError(this.id + ' fetchTickers() response not recognized ' + this.json(tickers));

              case 23:
                i++;
                _context4.next = 9;
                break;

              case 26:
                return _context4.abrupt("return", result);

              case 27:
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
                return this.publicGetPubtickerSymbol(this.extend({
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = parseFloat(ticker['timestamp']) * 1000;
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else if ('pair' in ticker) {
        var id = ticker['pair'];

        if (id in this.markets_by_id) {
          market = this.markets_by_id[id];
          symbol = market['symbol'];
        } else {
          throw new ExchangeError(this.id + ' unrecognized ticker symbol ' + id + ' ' + this.json(ticker));
        }
      }

      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high']),
        'low': parseFloat(ticker['low']),
        'bid': parseFloat(ticker['bid']),
        'ask': parseFloat(ticker['ask']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last_price']),
        'change': undefined,
        'percentage': undefined,
        'average': parseFloat(ticker['mid']),
        'baseVolume': parseFloat(ticker['volume']),
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = parseInt(parseFloat(trade['timestamp'])) * 1000;
      var side = trade['type'].toLowerCase();
      var orderId = this.safeString(trade, 'order_id');
      var price = parseFloat(trade['price']);
      var amount = parseFloat(trade['amount']);
      var cost = price * amount;
      return {
        'id': trade['tid'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'order': orderId,
        'side': side,
        'price': price,
        'amount': amount,
        'cost': cost,
        'fee': undefined
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
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var symbol,
            since,
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
                symbol = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : undefined;
                since = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };

                if (limit) {
                  request['limit_trades'] = limit;
                }

                if (since) {
                  request['timestamp'] = parseInt(since / 1000);
                }

                _context7.next = 12;
                return this.privatePostMytrades(this.extend(request, params));

              case 12:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseTrades(response, market, since, limit));

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
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
            orderType,
            order,
            result,
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
                orderType = type;
                if (type == 'limit' || type == 'market') orderType = 'exchange ' + type; // amount = this.amountToPrecision (symbol, amount);

                order = {
                  'symbol': this.marketId(symbol),
                  'amount': amount.toString(),
                  'side': side,
                  'type': orderType,
                  'ocoorder': false,
                  'buy_price_oco': 0,
                  'sell_price_oco': 0
                };

                if (type == 'market') {
                  order['price'] = this.nonce().toString();
                } else {
                  // price = this.priceToPrecision (symbol, price);
                  order['price'] = price.toString();
                }

                _context8.next = 10;
                return this.privatePostOrderNew(this.extend(order, params));

              case 10:
                result = _context8.sent;
                return _context8.abrupt("return", this.parseOrder(result));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
                return this.privatePostOrderCancel({
                  'order_id': parseInt(id)
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

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = order['side'];
      var open = order['is_live'];
      var canceled = order['is_cancelled'];
      var status = undefined;

      if (open) {
        status = 'open';
      } else if (canceled) {
        status = 'canceled';
      } else {
        status = 'closed';
      }

      var symbol = undefined;

      if (!market) {
        var _exchange = order['symbol'].toUpperCase();

        if (_exchange in this.markets_by_id) {
          market = this.markets_by_id[_exchange];
        }
      }

      if (market) symbol = market['symbol'];
      var orderType = order['type'];
      var exchange = orderType.indexOf('exchange ') >= 0;

      if (exchange) {
        var _order$type$split = order['type'].split(' '),
            _order$type$split2 = _slicedToArray(_order$type$split, 2),
            prefix = _order$type$split2[0],
            _orderType = _order$type$split2[1];
      }

      var timestamp = parseInt(parseFloat(order['timestamp']) * 1000);
      var result = {
        'info': order,
        'id': order['id'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': orderType,
        'side': side,
        'price': parseFloat(order['price']),
        'average': parseFloat(order['avg_execution_price']),
        'amount': parseFloat(order['original_amount']),
        'remaining': parseFloat(order['remaining_amount']),
        'filled': parseFloat(order['executed_amount']),
        'status': status,
        'fee': undefined
      };
      return result;
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
            response,
            orders,
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
                _context10.next = 8;
                return this.privatePostOrders(params);

              case 8:
                response = _context10.sent;
                orders = this.parseOrders(response, undefined, since, limit);
                if (symbol) orders = this.filterBy(orders, 'symbol', symbol);
                return _context10.abrupt("return", orders);

              case 12:
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
    key: "fetchClosedOrders",
    value: function () {
      var _fetchClosedOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            request,
            response,
            orders,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                _context11.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                if (limit) request['limit'] = limit;
                _context11.next = 10;
                return this.privatePostOrdersHist(this.extend(request, params));

              case 10:
                response = _context11.sent;
                orders = this.parseOrders(response, undefined, since, limit);
                if (symbol) orders = this.filterBy(orders, 'symbol', symbol);
                orders = this.filterBy(orders, 'status', 'closed');
                return _context11.abrupt("return", orders);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(id) {
        var symbol,
            params,
            response,
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
                _context12.next = 6;
                return this.privatePostOrderStatus(this.extend({
                  'order_id': parseInt(id)
                }, params));

              case 6:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseOrder(response));

              case 8:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv[0], ohlcv[1], ohlcv[3], ohlcv[4], ohlcv[2], ohlcv[5]];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            v2id,
            request,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                timeframe = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : '1m';
                since = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : undefined;
                limit = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : undefined;
                params = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : {};
                _context13.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                v2id = 't' + market['id'];
                request = {
                  'symbol': v2id,
                  'timeframe': this.timeframes[timeframe]
                };
                if (limit) request['limit'] = limit;
                if (since) request['start'] = since;
                request = this.extend(request, params);
                _context13.next = 14;
                return this.v2GetCandlesTradeTimeframeSymbolHist(request);

              case 14:
                response = _context13.sent;
                return _context13.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 16:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchOHLCV(_x10) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "getCurrencyName",
    value: function getCurrencyName(currency) {
      if (currency == 'BTC') {
        return 'bitcoin';
      } else if (currency == 'LTC') {
        return 'litecoin';
      } else if (currency == 'ETH') {
        return 'ethereum';
      } else if (currency == 'ETC') {
        return 'ethereumc';
      } else if (currency == 'OMNI') {
        return 'mastercoin'; // ???
      } else if (currency == 'ZEC') {
        return 'zcash';
      } else if (currency == 'XMR') {
        return 'monero';
      } else if (currency == 'USD') {
        return 'wire';
      } else if (currency == 'DASH') {
        return 'dash';
      } else if (currency == 'XRP') {
        return 'ripple';
      } else if (currency == 'EOS') {
        return 'eos';
      } else if (currency == 'BCH') {
        return 'bcash';
      } else if (currency == 'USDT') {
        return 'tetheruso';
      }

      throw new NotSupported(this.id + ' ' + currency + ' not supported for withdrawal');
    }
  }, {
    key: "createDepositAddress",
    value: function () {
      var _createDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(currency) {
        var params,
            response,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                params = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
                _context14.next = 3;
                return this.fetchDepositAddress(currency, this.extend({
                  'renew': 1
                }, params));

              case 3:
                response = _context14.sent;
                return _context14.abrupt("return", {
                  'currency': currency,
                  'address': response['address'],
                  'status': 'ok',
                  'info': response['info']
                });

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function createDepositAddress(_x11) {
        return _createDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(currency) {
        var params,
            name,
            request,
            response,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                params = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
                name = this.getCurrencyName(currency);
                request = {
                  'method': name,
                  'wallet_name': 'exchange',
                  'renew': 0 // a value of 1 will generate a new address

                };
                _context15.next = 5;
                return this.privatePostDepositNew(this.extend(request, params));

              case 5:
                response = _context15.sent;
                return _context15.abrupt("return", {
                  'currency': currency,
                  'address': response['address'],
                  'status': 'ok',
                  'info': response
                });

              case 7:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function fetchDepositAddress(_x12) {
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
            name,
            request,
            responses,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                params = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
                name = this.getCurrencyName(currency);
                request = {
                  'withdraw_type': name,
                  'walletselected': 'exchange',
                  'amount': amount.toString(),
                  'address': address
                };
                _context16.next = 5;
                return this.privatePostWithdraw(this.extend(request, params));

              case 5:
                responses = _context16.sent;
                response = responses[0];
                return _context16.abrupt("return", {
                  'info': response,
                  'id': response['withdrawal_id']
                });

              case 8:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function withdraw(_x13, _x14, _x15) {
        return _withdraw.apply(this, arguments);
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
      var request = '/' + this.implodeParams(path, params);

      if (api == 'v2') {
        request = '/' + api + request;
      } else {
        request = '/' + this.version + request;
      }

      var query = this.omit(params, this.extractParams(path));
      var url = this.urls['api'] + request;

      if (api == 'public' || path.indexOf('/hist') >= 0) {
        if (_Object$keys(query).length) {
          var suffix = '?' + this.urlencode(query);
          url += suffix;
          request += suffix;
        }
      }

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        query = this.extend({
          'nonce': nonce.toString(),
          'request': request
        }, query);
        query = this.json(query);
        query = this.encode(query);
        var payload = this.stringToBase64(query);
        var secret = this.encode(this.secret);
        var signature = this.hmac(payload, secret, 'sha384');
        headers = {
          'X-BFX-APIKEY': this.apiKey,
          'X-BFX-PAYLOAD': this.decode(payload),
          'X-BFX-SIGNATURE': signature
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
      if (code == 400) {
        if (body[0] == "{") {
          var response = JSON.parse(body);
          var message = response['message'];

          if (message.indexOf('Key price should be a decimal number') >= 0) {
            throw new InvalidOrder(this.id + ' ' + message);
          } else if (message.indexOf('Invalid order: not enough exchange balance') >= 0) {
            throw new InsufficientFunds(this.id + ' ' + message);
          } else if (message.indexOf('Invalid order') >= 0) {
            throw new InvalidOrder(this.id + ' ' + message);
          } else if (message.indexOf('Order could not be cancelled.') >= 0) {
            throw new OrderNotFound(this.id + ' ' + message);
          }
        }

        throw new ExchangeError(this.id + ' ' + body);
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

                if (!('message' in response)) {
                  _context17.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context17.abrupt("return", response);

              case 11:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function request(_x16) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bitfinex;
}(Exchange);