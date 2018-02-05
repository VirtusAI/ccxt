'use strict'; //  ---------------------------------------------------------------------------

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
    NotImplemented = _require.NotImplemented,
    DDoSProtection = _require.DDoSProtection,
    AuthenticationError = _require.AuthenticationError,
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
        'countries': 'VG',
        'version': 'v1',
        'rateLimit': 1500,
        // new metainfo interface
        'has': {
          'CORS': false,
          'createDepositAddress': true,
          'deposit': true,
          'fetchClosedOrders': true,
          'fetchDepositAddress': true,
          'fetchFundingFees': true,
          'fetchMyTrades': true,
          'fetchOHLCV': true,
          'fetchOpenOrders': true,
          'fetchOrder': true,
          'fetchTickers': true,
          'withdraw': true
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
              'XRP': 0.02,
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
              'BTC': 0.0008,
              'IOTA': 0.5,
              'ETH': 0.01,
              'ETC': 0.01,
              'BCH': 0.0001,
              'LTC': 0.001,
              'EOS': 0.8609,
              'XMR': 0.04,
              'SAN': 3.2779,
              'DASH': 0.01,
              'XRP': 0.02,
              'YYW': 40.543,
              'NEO': 0,
              'ZEC': 0.001,
              'BTG': 0,
              'OMG': 0.5897,
              'DATA': 52.405,
              'FUN': 90.402,
              'GNT': 15.435,
              'MNA': 76.821,
              'BAT': 17.223,
              'SPK': 24.708,
              'QASH': 6.1629,
              'ETP': 0.01,
              'QTUM': 0.01,
              'EDO': 2.5238,
              'AVT': 3.2495,
              'USDT': 20.0,
              'ZRX': 5.6442,
              'TNB': 87.511,
              'SNT': 32.736,
              'QSH': undefined,
              'TRX': undefined,
              'RCN': undefined,
              'RLC': undefined,
              'AID': undefined,
              'SNG': undefined,
              'REP': undefined,
              'ELF': undefined
            }
          }
        },
        'exceptions': {
          'exact': {
            'Order could not be cancelled.': OrderNotFound,
            // non-existent order
            'No such order found.': OrderNotFound,
            // ?
            'Order price must be positive.': InvalidOrder,
            // on price <= 0
            'Could not find a key matching the given X-BFX-APIKEY.': AuthenticationError,
            'This API key does not have permission for this action': AuthenticationError,
            // authenticated but not authorized
            'Key price should be a decimal number, e.g. "123.456"': InvalidOrder,
            // on isNaN (price)
            'Key amount should be a decimal number, e.g. "123.456"': InvalidOrder,
            // on isNaN (amount)
            'ERR_RATE_LIMIT': DDoSProtection
          },
          'broad': {
            'Invalid order: not enough exchange balance for ': InsufficientFunds,
            // when buy, cost > quote currency
            'Invalid order: minimum size for ': InvalidOrder,
            // when amount below limits.amount.min
            'Invalid order': InvalidOrder // ?

          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      var currencies = {
        'DSH': 'DASH',
        // Bitfinex names Dash as DSH, instead of DASH
        'QTM': 'QTUM',
        'BCC': 'CST_BCC',
        'BCU': 'CST_BCU',
        'IOT': 'IOTA',
        'DAT': 'DATA'
      };
      return currency in currencies ? currencies[currency] : currency;
    }
  }, {
    key: "fetchFundingFees",
    value: function () {
      var _fetchFundingFees = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, fees, withdraw, ids, i, id, code, currency;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.privatePostAccountFees();

              case 2:
                response = _context.sent;
                fees = response['withdraw'];
                withdraw = {};
                ids = _Object$keys(fees);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  code = id;

                  if (id in this.currencies_by_id) {
                    currency = this.currencies_by_id[id];
                    code = currency['code'];
                  }

                  withdraw[code] = this.safeFloat(fees, id);
                }

                return _context.abrupt("return", {
                  'info': response,
                  'withdraw': withdraw,
                  'deposit': withdraw // only for deposits of less than $1000

                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchFundingFees() {
        return _fetchFundingFees.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTradingFees",
    value: function () {
      var _fetchTradingFees = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var response;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.privatePostSummary();

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", {
                  'info': response,
                  'maker': this.safeFloat(response, 'maker_fee'),
                  'taker': this.safeFloat(response, 'taker_fee')
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchTradingFees() {
        return _fetchTradingFees.apply(this, arguments);
      };
    }()
  }, {
    key: "loadFees",
    value: function () {
      var _loadFees = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new NotImplemented(this.id + ' loadFees() not implemented yet');

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function loadFees() {
        return _loadFees.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchFees",
    value: function () {
      var _fetchFees = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var fundingFees, tradingFees;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.fetchFundingFees();

              case 2:
                fundingFees = _context4.sent;
                _context4.next = 5;
                return this.fetchTradingFees();

              case 5:
                tradingFees = _context4.sent;
                return _context4.abrupt("return", this.deepExtend(fundingFees, tradingFees));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchFees() {
        return _fetchFees.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var markets, result, p, market, id, baseId, quoteId, base, quote, symbol, precision, limits;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.publicGetSymbolsDetails();

              case 2:
                markets = _context5.sent;
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
                  limits = {
                    'amount': {
                      'min': parseFloat(market['minimum_order_size']),
                      'max': parseFloat(market['maximum_order_size'])
                    },
                    'price': {
                      'min': Math.pow(10, -precision['price']),
                      'max': Math.pow(10, precision['price'])
                    }
                  };
                  limits['cost'] = {
                    'min': limits['amount']['min'] * limits['price']['min'],
                    'max': undefined
                  };
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'active': true,
                    'precision': precision,
                    'limits': limits,
                    'lot': Math.pow(10, -precision['amount']),
                    'info': market
                  });
                }

                return _context5.abrupt("return", result);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6() {
        var params,
            balanceType,
            balances,
            result,
            i,
            balance,
            currency,
            uppercase,
            account,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                _context6.next = 3;
                return this.loadMarkets();

              case 3:
                balanceType = this.safeString(params, 'type', 'exchange');
                _context6.next = 6;
                return this.privatePostBalances();

              case 6:
                balances = _context6.sent;
                result = {
                  'info': balances
                };

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];

                  if (balance['type'] === balanceType) {
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

                return _context6.abrupt("return", this.parseBalance(result));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var limit,
            params,
            orderbook,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                limit = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                _context7.next = 6;
                return this.publicGetBookSymbol(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 6:
                orderbook = _context7.sent;
                return _context7.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount'));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8() {
        var symbols,
            params,
            tickers,
            result,
            i,
            ticker,
            id,
            market,
            symbol,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbols = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : undefined;
                params = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                _context8.next = 4;
                return this.loadMarkets();

              case 4:
                _context8.next = 6;
                return this.publicGetTickers(params);

              case 6:
                tickers = _context8.sent;
                result = {};
                i = 0;

              case 9:
                if (!(i < tickers.length)) {
                  _context8.next = 26;
                  break;
                }

                ticker = tickers[i];

                if (!('pair' in ticker)) {
                  _context8.next = 22;
                  break;
                }

                id = ticker['pair'];

                if (!(id in this.markets_by_id)) {
                  _context8.next = 19;
                  break;
                }

                market = this.markets_by_id[id];
                symbol = market['symbol'];
                result[symbol] = this.parseTicker(ticker, market);
                _context8.next = 20;
                break;

              case 19:
                throw new ExchangeError(this.id + ' fetchTickers() failed to recognize symbol ' + id + ' ' + this.json(ticker));

              case 20:
                _context8.next = 23;
                break;

              case 22:
                throw new ExchangeError(this.id + ' fetchTickers() response not recognized ' + this.json(tickers));

              case 23:
                i++;
                _context8.next = 9;
                break;

              case 26:
                return _context8.abrupt("return", result);

              case 27:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(symbol) {
        var params,
            market,
            ticker,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
                _context9.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context9.next = 6;
                return this.publicGetPubtickerSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                ticker = _context9.sent;
                return _context9.abrupt("return", this.parseTicker(ticker, market));

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context10.next = 8;
                return this.publicGetTradesSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context10.sent;
                return _context10.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
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
                _context11.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (typeof limit !== 'undefined') request['limit_trades'] = limit;
                if (typeof since !== 'undefined') request['timestamp'] = parseInt(since / 1000);
                _context11.next = 12;
                return this.privatePostMytrades(this.extend(request, params));

              case 12:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseTrades(response, market, since, limit));

              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12(symbol, type, side, amount) {
        var price,
            params,
            orderType,
            order,
            result,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                price = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : undefined;
                params = _args12.length > 5 && _args12[5] !== undefined ? _args12[5] : {};
                _context12.next = 4;
                return this.loadMarkets();

              case 4:
                orderType = type;
                if (type === 'limit' || type === 'market') orderType = 'exchange ' + type; // amount = this.amountToPrecision (symbol, amount);

                order = {
                  'symbol': this.marketId(symbol),
                  'amount': amount.toString(),
                  'side': side,
                  'type': orderType,
                  'ocoorder': false,
                  'buy_price_oco': 0,
                  'sell_price_oco': 0
                };

                if (type === 'market') {
                  order['price'] = this.nonce().toString();
                } else {
                  // price = this.priceToPrecision (symbol, price);
                  order['price'] = price.toString();
                }

                _context12.next = 10;
                return this.privatePostOrderNew(this.extend(order, params));

              case 10:
                result = _context12.sent;
                return _context12.abrupt("return", this.parseOrder(result));

              case 12:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
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
      _regeneratorRuntime.mark(function _callee13(id) {
        var symbol,
            params,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                symbol = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : undefined;
                params = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : {};
                _context13.next = 4;
                return this.loadMarkets();

              case 4:
                _context13.next = 6;
                return this.privatePostOrderCancel({
                  'order_id': parseInt(id)
                });

              case 6:
                return _context13.abrupt("return", _context13.sent);

              case 7:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
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
        var parts = order['type'].split(' ');
        orderType = parts[1];
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
        'price': this.safeFloat(order, 'price'),
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
      _regeneratorRuntime.mark(function _callee14() {
        var symbol,
            since,
            limit,
            params,
            response,
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
                return this.loadMarkets();

              case 6:
                _context14.next = 8;
                return this.privatePostOrders(params);

              case 8:
                response = _context14.sent;
                orders = this.parseOrders(response, undefined, since, limit);
                if (symbol) orders = this.filterBy(orders, 'symbol', symbol);
                return _context14.abrupt("return", orders);

              case 12:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
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
      _regeneratorRuntime.mark(function _callee15() {
        var symbol,
            since,
            limit,
            params,
            request,
            response,
            orders,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                symbol = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : undefined;
                since = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : undefined;
                limit = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : undefined;
                params = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
                _context15.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                if (typeof limit !== 'undefined') request['limit'] = limit;
                _context15.next = 10;
                return this.privatePostOrdersHist(this.extend(request, params));

              case 10:
                response = _context15.sent;
                orders = this.parseOrders(response, undefined, since, limit);
                if (typeof symbol !== 'undefined') orders = this.filterBy(orders, 'symbol', symbol);
                orders = this.filterBy(orders, 'status', 'closed');
                return _context15.abrupt("return", orders);

              case 15:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
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
      _regeneratorRuntime.mark(function _callee16(id) {
        var symbol,
            params,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                symbol = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : undefined;
                params = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : {};
                _context16.next = 4;
                return this.loadMarkets();

              case 4:
                _context16.next = 6;
                return this.privatePostOrderStatus(this.extend({
                  'order_id': parseInt(id)
                }, params));

              case 6:
                response = _context16.sent;
                return _context16.abrupt("return", this.parseOrder(response));

              case 8:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      _regeneratorRuntime.mark(function _callee17(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            v2id,
            request,
            response,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                timeframe = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : '1m';
                since = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : undefined;
                limit = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : undefined;
                params = _args17.length > 4 && _args17[4] !== undefined ? _args17[4] : {};
                _context17.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                v2id = 't' + market['id'];
                request = {
                  'symbol': v2id,
                  'timeframe': this.timeframes[timeframe],
                  'sort': 1
                };
                if (typeof limit !== 'undefined') request['limit'] = limit;
                if (typeof since !== 'undefined') request['start'] = since;
                request = this.extend(request, params);
                _context17.next = 14;
                return this.v2GetCandlesTradeTimeframeSymbolHist(request);

              case 14:
                response = _context17.sent;
                return _context17.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 16:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function fetchOHLCV(_x10) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "getCurrencyName",
    value: function getCurrencyName(currency) {
      var names = {
        'BTC': 'bitcoin',
        'LTC': 'litecoin',
        'ETH': 'ethereum',
        'ETC': 'ethereumc',
        'OMNI': 'mastercoin',
        // left by previous author, now throws {"message":"Unknown method"}
        'ZEC': 'zcash',
        'XMR': 'monero',
        'USD': 'wire',
        // left by previous author, now throws {"message":"Unknown method"}
        'DASH': 'dash',
        'XRP': 'ripple',
        'EOS': 'eos',
        'BCH': 'bcash',
        'USDT': 'tetheruso'
      };
      if (currency in names) return names[currency];
      throw new NotSupported(this.id + ' ' + currency + ' not supported for withdrawal');
    }
  }, {
    key: "createDepositAddress",
    value: function () {
      var _createDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee18(currency) {
        var params,
            response,
            _args18 = arguments;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                params = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
                _context18.next = 3;
                return this.fetchDepositAddress(currency, this.extend({
                  'renew': 1
                }, params));

              case 3:
                response = _context18.sent;
                return _context18.abrupt("return", {
                  'currency': currency,
                  'address': response['address'],
                  'status': 'ok',
                  'info': response['info']
                });

              case 5:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
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
      _regeneratorRuntime.mark(function _callee19(currency) {
        var params,
            name,
            request,
            response,
            address,
            tag,
            _args19 = arguments;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                params = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : {};
                name = this.getCurrencyName(currency);
                request = {
                  'method': name,
                  'wallet_name': 'exchange',
                  'renew': 0 // a value of 1 will generate a new address

                };
                _context19.next = 5;
                return this.privatePostDepositNew(this.extend(request, params));

              case 5:
                response = _context19.sent;
                address = response['address'];
                tag = undefined;

                if ('address_pool' in response) {
                  tag = address;
                  address = response['address_pool'];
                }

                return _context19.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'tag': tag,
                  'status': 'ok',
                  'info': response
                });

              case 10:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
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
      _regeneratorRuntime.mark(function _callee20(currency, amount, address) {
        var tag,
            params,
            name,
            request,
            responses,
            response,
            _args20 = arguments;
        return _regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                tag = _args20.length > 3 && _args20[3] !== undefined ? _args20[3] : undefined;
                params = _args20.length > 4 && _args20[4] !== undefined ? _args20[4] : {};
                name = this.getCurrencyName(currency);
                request = {
                  'withdraw_type': name,
                  'walletselected': 'exchange',
                  'amount': amount.toString(),
                  'address': address
                };
                if (tag) request['payment_id'] = tag;
                _context20.next = 7;
                return this.privatePostWithdraw(this.extend(request, params));

              case 7:
                responses = _context20.sent;
                response = responses[0];
                return _context20.abrupt("return", {
                  'info': response,
                  'id': response['withdrawal_id']
                });

              case 10:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
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

      if (api === 'v2') {
        request = '/' + api + request;
      } else {
        request = '/' + this.version + request;
      }

      var query = this.omit(params, this.extractParams(path));
      var url = this.urls['api'] + request;

      if (api === 'public' || path.indexOf('/hist') >= 0) {
        if (_Object$keys(query).length) {
          var suffix = '?' + this.urlencode(query);
          url += suffix;
          request += suffix;
        }
      }

      if (api === 'private') {
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
    key: "findBroadlyMatchedKey",
    value: function findBroadlyMatchedKey(map, broadString) {
      var partialKeys = _Object$keys(map);

      for (var i = 0; i < partialKeys.length; i++) {
        var partialKey = partialKeys[i];
        if (broadString.indexOf(partialKey) >= 0) return partialKey;
      }

      return undefined;
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (body.length < 2) return;

      if (code >= 400) {
        if (body[0] === '{') {
          var response = JSON.parse(body);
          var feedback = this.id + ' ' + this.json(response);
          var message = undefined;
          if ('message' in response) message = response['message'];else if ('error' in response) message = response['error'];else throw new ExchangeError(feedback); // malformed (to our knowledge) response

          var exact = this.exceptions['exact'];
          if (message in exact) throw new exact[message](feedback);
          var broad = this.exceptions['broad'];
          var broadKey = this.findBroadlyMatchedKey(broad, message);
          if (typeof broadKey !== 'undefined') throw new broad[broadKey](feedback);
          throw new ExchangeError(feedback); // unknown message
        }
      }
    }
  }]);

  return bitfinex;
}(Exchange);