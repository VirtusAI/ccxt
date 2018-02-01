'use strict'; // ---------------------------------------------------------------------------

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
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(hitbtc, _Exchange);

  function hitbtc() {
    _classCallCheck(this, hitbtc);

    return _possibleConstructorReturn(this, (hitbtc.__proto__ || _Object$getPrototypeOf(hitbtc)).apply(this, arguments));
  }

  _createClass(hitbtc, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(hitbtc.prototype.__proto__ || _Object$getPrototypeOf(hitbtc.prototype), "describe", this).call(this), {
        'id': 'hitbtc',
        'name': 'HitBTC',
        'countries': 'UK',
        'rateLimit': 1500,
        'version': '1',
        'has': {
          'CORS': false,
          'fetchTrades': true,
          'fetchOrder': true,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true,
          'withdraw': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766555-8eaec20e-5edc-11e7-9c5b-6dc69fc42f5e.jpg',
          'api': 'http://api.hitbtc.com',
          'www': 'https://hitbtc.com',
          'doc': 'https://github.com/hitbtc-com/hitbtc-api/blob/master/APIv1.md',
          'fees': ['https://hitbtc.com/fees-and-limits', 'https://support.hitbtc.com/hc/en-us/articles/115005148605-Fees-and-limits']
        },
        'api': {
          'public': {
            'get': ['{symbol}/orderbook', '{symbol}/ticker', '{symbol}/trades', '{symbol}/trades/recent', 'symbols', 'ticker', 'time']
          },
          'trading': {
            'get': ['balance', 'orders/active', 'orders/recent', 'order', 'trades/by/order', 'trades'],
            'post': ['new_order', 'cancel_order', 'cancel_orders']
          },
          'payment': {
            'get': ['balance', 'address/{currency}', 'transactions', 'transactions/{transaction}'],
            'post': ['transfer_to_trading', 'transfer_to_main', 'address/{currency}', 'payout']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'maker': -0.01 / 100,
            'taker': 0.1 / 100
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.001,
              'BCC': 0.0018,
              'ETH': 0.00215,
              'BCH': 0.0018,
              'USDT': 100,
              'DASH': 0.03,
              'BTG': 0.0005,
              'LTC': 0.003,
              'ZEC': 0.0001,
              'XMR': 0.09,
              '1ST': 0.84,
              'ADX': 5.7,
              'AE': 6.7,
              'AEON': 0.01006,
              'AIR': 565,
              'AMP': 9,
              'ANT': 6.7,
              'ARDR': 1,
              'ARN': 18.5,
              'ART': 26,
              'ATB': 0.0004,
              'ATL': 27,
              'ATM': 504,
              'ATS': 860,
              'AVT': 1.9,
              'BAS': 113,
              'BCN': 0.1,
              'BET': 124,
              'BKB': 46,
              'BMC': 32,
              'BMT': 100,
              'BNT': 2.57,
              'BQX': 4.7,
              'BTM': 40,
              'BTX': 0.04,
              'BUS': 0.004,
              'CCT': 115,
              'CDT': 100,
              'CDX': 30,
              'CFI': 61,
              'CLD': 0.88,
              'CND': 574,
              'CNX': 0.04,
              'COSS': 65,
              'CSNO': 16,
              'CTR': 15,
              'CTX': 146,
              'CVC': 8.46,
              'DBIX': 0.0168,
              'DCN': 120000,
              'DCT': 0.02,
              'DDF': 342,
              'DENT': 6240,
              'DGB': 0.4,
              'DGD': 0.01,
              'DICE': 0.32,
              'DLT': 0.26,
              'DNT': 0.21,
              'DOGE': 2,
              'DOV': 34,
              'DRPU': 24,
              'DRT': 240,
              'DSH': 0.017,
              'EBET': 84,
              'EBTC': 20,
              'EBTCOLD': 6.6,
              'ECAT': 14,
              'EDG': 2,
              'EDO': 2.9,
              'ELE': 0.00172,
              'ELM': 0.004,
              'EMC': 0.03,
              'EMGO': 14,
              'ENJ': 163,
              'EOS': 1.5,
              'ERO': 34,
              'ETBS': 15,
              'ETC': 0.002,
              'ETP': 0.004,
              'EVX': 5.4,
              'EXN': 456,
              'FRD': 65,
              'FUEL': 123.00105,
              'FUN': 202.9598309,
              'FYN': 1.849,
              'FYP': 66.13,
              'GNO': 0.0034,
              'GUP': 4,
              'GVT': 1.2,
              'HAC': 144,
              'HDG': 7,
              'HGT': 1082,
              'HPC': 0.4,
              'HVN': 120,
              'ICN': 0.55,
              'ICO': 34,
              'ICOS': 0.35,
              'IND': 76,
              'INDI': 5913,
              'ITS': 15.0012,
              'IXT': 11,
              'KBR': 143,
              'KICK': 112,
              'LA': 41,
              'LAT': 1.44,
              'LIFE': 13000,
              'LRC': 27,
              'LSK': 0.3,
              'LUN': 0.34,
              'MAID': 5,
              'MANA': 143,
              'MCAP': 5.44,
              'MIPS': 43,
              'MNE': 1.33,
              'MSP': 121,
              'MTH': 92,
              'MYB': 3.9,
              'NDC': 165,
              'NEBL': 0.04,
              'NET': 3.96,
              'NTO': 998,
              'NXC': 13.39,
              'NXT': 3,
              'OAX': 15,
              'ODN': 0.004,
              'OMG': 2,
              'OPT': 335,
              'ORME': 2.8,
              'OTN': 0.57,
              'PAY': 3.1,
              'PIX': 96,
              'PLBT': 0.33,
              'PLR': 114,
              'PLU': 0.87,
              'POE': 784,
              'POLL': 3.5,
              'PPT': 2,
              'PRE': 32,
              'PRG': 39,
              'PRO': 41,
              'PRS': 60,
              'PTOY': 0.5,
              'QAU': 63,
              'QCN': 0.03,
              'QTUM': 0.04,
              'QVT': 64,
              'REP': 0.02,
              'RKC': 15,
              'RVT': 14,
              'SAN': 2.24,
              'SBD': 0.03,
              'SCL': 2.6,
              'SISA': 1640,
              'SKIN': 407,
              'SMART': 0.4,
              'SMS': 0.0375,
              'SNC': 36,
              'SNGLS': 4,
              'SNM': 48,
              'SNT': 233,
              'STEEM': 0.01,
              'STRAT': 0.01,
              'STU': 14,
              'STX': 11,
              'SUB': 17,
              'SUR': 3,
              'SWT': 0.51,
              'TAAS': 0.91,
              'TBT': 2.37,
              'TFL': 15,
              'TIME': 0.03,
              'TIX': 7.1,
              'TKN': 1,
              'TKR': 84,
              'TNT': 90,
              'TRST': 1.6,
              'TRX': 1395,
              'UET': 480,
              'UGT': 15,
              'VEN': 14,
              'VERI': 0.037,
              'VIB': 50,
              'VIBE': 145,
              'VOISE': 618,
              'WEALTH': 0.0168,
              'WINGS': 2.4,
              'WTC': 0.75,
              'XAUR': 3.23,
              'XDN': 0.01,
              'XEM': 15,
              'XUC': 0.9,
              'YOYOW': 140,
              'ZAP': 24,
              'ZRX': 23,
              'ZSC': 191
            },
            'deposit': {
              'BTC': 0.0006,
              'ETH': 0.003,
              'BCH': 0,
              'USDT': 0,
              'BTG': 0,
              'LTC': 0,
              'ZEC': 0,
              'XMR': 0,
              '1ST': 0,
              'ADX': 0,
              'AE': 0,
              'AEON': 0,
              'AIR': 0,
              'AMP': 0,
              'ANT': 0,
              'ARDR': 0,
              'ARN': 0,
              'ART': 0,
              'ATB': 0,
              'ATL': 0,
              'ATM': 0,
              'ATS': 0,
              'AVT': 0,
              'BAS': 0,
              'BCN': 0,
              'BET': 0,
              'BKB': 0,
              'BMC': 0,
              'BMT': 0,
              'BNT': 0,
              'BQX': 0,
              'BTM': 0,
              'BTX': 0,
              'BUS': 0,
              'CCT': 0,
              'CDT': 0,
              'CDX': 0,
              'CFI': 0,
              'CLD': 0,
              'CND': 0,
              'CNX': 0,
              'COSS': 0,
              'CSNO': 0,
              'CTR': 0,
              'CTX': 0,
              'CVC': 0,
              'DBIX': 0,
              'DCN': 0,
              'DCT': 0,
              'DDF': 0,
              'DENT': 0,
              'DGB': 0,
              'DGD': 0,
              'DICE': 0,
              'DLT': 0,
              'DNT': 0,
              'DOGE': 0,
              'DOV': 0,
              'DRPU': 0,
              'DRT': 0,
              'DSH': 0,
              'EBET': 0,
              'EBTC': 0,
              'EBTCOLD': 0,
              'ECAT': 0,
              'EDG': 0,
              'EDO': 0,
              'ELE': 0,
              'ELM': 0,
              'EMC': 0,
              'EMGO': 0,
              'ENJ': 0,
              'EOS': 0,
              'ERO': 0,
              'ETBS': 0,
              'ETC': 0,
              'ETP': 0,
              'EVX': 0,
              'EXN': 0,
              'FRD': 0,
              'FUEL': 0,
              'FUN': 0,
              'FYN': 0,
              'FYP': 0,
              'GNO': 0,
              'GUP': 0,
              'GVT': 0,
              'HAC': 0,
              'HDG': 0,
              'HGT': 0,
              'HPC': 0,
              'HVN': 0,
              'ICN': 0,
              'ICO': 0,
              'ICOS': 0,
              'IND': 0,
              'INDI': 0,
              'ITS': 0,
              'IXT': 0,
              'KBR': 0,
              'KICK': 0,
              'LA': 0,
              'LAT': 0,
              'LIFE': 0,
              'LRC': 0,
              'LSK': 0,
              'LUN': 0,
              'MAID': 0,
              'MANA': 0,
              'MCAP': 0,
              'MIPS': 0,
              'MNE': 0,
              'MSP': 0,
              'MTH': 0,
              'MYB': 0,
              'NDC': 0,
              'NEBL': 0,
              'NET': 0,
              'NTO': 0,
              'NXC': 0,
              'NXT': 0,
              'OAX': 0,
              'ODN': 0,
              'OMG': 0,
              'OPT': 0,
              'ORME': 0,
              'OTN': 0,
              'PAY': 0,
              'PIX': 0,
              'PLBT': 0,
              'PLR': 0,
              'PLU': 0,
              'POE': 0,
              'POLL': 0,
              'PPT': 0,
              'PRE': 0,
              'PRG': 0,
              'PRO': 0,
              'PRS': 0,
              'PTOY': 0,
              'QAU': 0,
              'QCN': 0,
              'QTUM': 0,
              'QVT': 0,
              'REP': 0,
              'RKC': 0,
              'RVT': 0,
              'SAN': 0,
              'SBD': 0,
              'SCL': 0,
              'SISA': 0,
              'SKIN': 0,
              'SMART': 0,
              'SMS': 0,
              'SNC': 0,
              'SNGLS': 0,
              'SNM': 0,
              'SNT': 0,
              'STEEM': 0,
              'STRAT': 0,
              'STU': 0,
              'STX': 0,
              'SUB': 0,
              'SUR': 0,
              'SWT': 0,
              'TAAS': 0,
              'TBT': 0,
              'TFL': 0,
              'TIME': 0,
              'TIX': 0,
              'TKN': 0,
              'TKR': 0,
              'TNT': 0,
              'TRST': 0,
              'TRX': 0,
              'UET': 0,
              'UGT': 0,
              'VEN': 0,
              'VERI': 0,
              'VIB': 0,
              'VIBE': 0,
              'VOISE': 0,
              'WEALTH': 0,
              'WINGS': 0,
              'WTC': 0,
              'XAUR': 0,
              'XDN': 0,
              'XEM': 0,
              'XUC': 0,
              'YOYOW': 0,
              'ZAP': 0,
              'ZRX': 0,
              'ZSC': 0
            }
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      var currencies = {
        'XBT': 'BTC',
        'DRK': 'DASH',
        'CAT': 'BitClave',
        'USD': 'USDT',
        'EMGO': 'MGO'
      };
      if (currency in currencies) return currencies[currency];
      return currency;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, result, p, market, id, baseId, quoteId, lot, step, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetSymbols();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets['symbols'].length; p++) {
                  market = markets['symbols'][p];
                  id = market['symbol'];
                  baseId = market['commodity'];
                  quoteId = market['currency'];
                  lot = parseFloat(market['lot']);
                  step = parseFloat(market['step']);
                  base = this.commonCurrencyCode(baseId);
                  quote = this.commonCurrencyCode(quoteId);
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'lot': lot,
                    'step': step,
                    'info': market,
                    'precision': {
                      'amount': this.precisionFromString(market['lot']),
                      'price': this.precisionFromString(market['step'])
                    },
                    'limits': {
                      'amount': {
                        'min': lot,
                        'max': undefined
                      },
                      'price': {
                        'min': step,
                        'max': undefined
                      },
                      'cost': {
                        'min': undefined,
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
            method,
            query,
            response,
            balances,
            result,
            b,
            balance,
            code,
            currency,
            free,
            used,
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
                method = this.safeString(params, 'type', 'trading');
                method += 'GetBalance';
                query = this.omit(params, 'type');
                _context2.next = 8;
                return this[method](query);

              case 8:
                response = _context2.sent;
                balances = response['balance'];
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  code = balance['currency_code'];
                  currency = this.commonCurrencyCode(code);
                  free = this.safeFloat(balance, 'cash', 0.0);
                  free = this.safeFloat(balance, 'balance', free);
                  used = this.safeFloat(balance, 'reserved', 0.0);
                  account = {
                    'free': free,
                    'used': used,
                    'total': this.sum(free, used)
                  };
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 13:
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
                return this.publicGetSymbolOrderbook(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook));

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
      var timestamp = ticker['timestamp'];
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'high'),
        'low': this.safeFloat(ticker, 'low'),
        'bid': this.safeFloat(ticker, 'bid'),
        'ask': this.safeFloat(ticker, 'ask'),
        'vwap': undefined,
        'open': this.safeFloat(ticker, 'open'),
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'last'),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'volume'),
        'quoteVolume': this.safeFloat(ticker, 'volume_quote'),
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
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = tickers[id];
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
                return this.publicGetSymbolTicker(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                ticker = _context5.sent;

                if (!('message' in ticker)) {
                  _context5.next = 9;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + ticker['message']);

              case 9:
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
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (Array.isArray(trade)) return this.parsePublicTrade(trade, market);
      return this.parseOrderTrade(trade, market);
    }
  }, {
    key: "parsePublicTrade",
    value: function parsePublicTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'info': trade,
        'id': trade[0].toString(),
        'timestamp': trade[3],
        'datetime': this.iso8601(trade[3]),
        'symbol': symbol,
        'type': undefined,
        'side': trade[4],
        'price': parseFloat(trade[1]),
        'amount': parseFloat(trade[2])
      };
    }
  }, {
    key: "parseOrderTrade",
    value: function parseOrderTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var amount = parseFloat(trade['execQuantity']);
      if (market) amount *= market['lot'];
      var price = parseFloat(trade['execPrice']);
      var cost = price * amount;
      var fee = {
        'cost': parseFloat(trade['fee']),
        'currency': undefined,
        'rate': undefined
      };
      var timestamp = trade['timestamp'];
      return {
        'info': trade,
        'id': trade['tradeId'],
        'order': trade['clientOrderId'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': undefined,
        'side': trade['side'],
        'price': price,
        'amount': amount,
        'cost': cost,
        'fee': fee
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
                return this.publicGetSymbolTrades(this.extend({
                  'symbol': market['id'],
                  // 'from': 0,
                  // 'till': 100,
                  // 'by': 'ts', // or by trade_id
                  // 'sort': 'desc', // or asc
                  // 'start_index': 0,
                  // 'max_results': 1000,
                  // 'format_item': 'object',
                  // 'format_price': 'number',
                  // 'format_amount': 'number',
                  // 'format_tid': 'string',
                  // 'format_timestamp': 'millisecond',
                  // 'format_wrap': false,
                  'side': 'true'
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['trades'], market, since, limit));

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
            quantity,
            wholeLots,
            difference,
            clientOrderId,
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
                market = this.market(symbol); // check if amount can be evenly divided into lots
                // they want integer quantity in lot units

                quantity = parseFloat(amount) / market['lot'];
                wholeLots = Math.round(quantity);
                difference = quantity - wholeLots;

                if (!(Math.abs(difference) > market['step'])) {
                  _context7.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' order amount should be evenly divisible by lot unit size of ' + market['lot'].toString());

              case 10:
                clientOrderId = this.milliseconds();
                order = {
                  'clientOrderId': clientOrderId.toString(),
                  'symbol': market['id'],
                  'side': side,
                  'quantity': wholeLots.toString(),
                  // quantity in integer lot units
                  'type': type
                };

                if (type === 'limit') {
                  order['price'] = this.priceToPrecision(symbol, price);
                } else {
                  order['timeInForce'] = 'FOK';
                }

                _context7.next = 15;
                return this.tradingPostNewOrder(this.extend(order, params));

              case 15:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseOrder(response['ExecutionReport'], market));

              case 17:
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
                return this.tradingPostCancelOrder(this.extend({
                  'clientOrderId': id
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
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      var statuses = {
        'new': 'open',
        'partiallyFilled': 'open',
        'filled': 'closed',
        'canceled': 'canceled',
        'rejected': 'rejected',
        'expired': 'expired'
      };
      return this.safeString(statuses, status);
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.safeInteger(order, 'lastTimestamp');
      if (typeof timestamp === 'undefined') timestamp = this.safeInteger(order, 'timestamp');
      var symbol = undefined;
      if (!market) market = this.markets_by_id[order['symbol']];
      var status = this.safeString(order, 'orderStatus');
      if (status) status = this.parseOrderStatus(status);
      var averagePrice = this.safeFloat(order, 'avgPrice', 0.0);
      var price = this.safeFloat(order, 'orderPrice');
      if (typeof price === 'undefined') price = this.safeFloat(order, 'price');
      var amount = this.safeFloat(order, 'orderQuantity');
      if (typeof amount === 'undefined') amount = this.safeFloat(order, 'quantity');
      var remaining = this.safeFloat(order, 'quantityLeaves');
      if (typeof remaining === 'undefined') remaining = this.safeFloat(order, 'leavesQuantity');
      var filled = undefined;
      var cost = undefined;
      var amountDefined = typeof amount !== 'undefined';
      var remainingDefined = typeof remaining !== 'undefined';

      if (market) {
        symbol = market['symbol'];
        if (amountDefined) amount *= market['lot'];
        if (remainingDefined) remaining *= market['lot'];
      }

      if (amountDefined) {
        if (remainingDefined) {
          filled = amount - remaining;
          cost = averagePrice * filled;
        }
      }

      return {
        'id': order['clientOrderId'].toString(),
        'info': order,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'status': status,
        'symbol': symbol,
        'type': order['type'],
        'side': order['side'],
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'fee': undefined
      };
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            response,
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
                return this.tradingGetOrder(this.extend({
                  'clientOrderId': id
                }, params));

              case 6:
                response = _context9.sent;

                if (!response['orders'][0]) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt("return", this.parseOrder(response['orders'][0]));

              case 9:
                throw new OrderNotFound(this.id + ' fetchOrder() error: ' + this.response);

              case 10:
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
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            since,
            limit,
            params,
            statuses,
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
                _context10.next = 6;
                return this.loadMarkets();

              case 6:
                statuses = ['new', 'partiallyFiiled'];
                market = undefined;
                request = {
                  'sort': 'desc',
                  'statuses': statuses.join(',')
                };

                if (symbol) {
                  market = this.market(symbol);
                  request['symbols'] = market['id'];
                }

                _context10.next = 12;
                return this.tradingGetOrdersActive(this.extend(request, params));

              case 12:
                response = _context10.sent;
                return _context10.abrupt("return", this.parseOrders(response['orders'], market, since, limit));

              case 14:
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
            market,
            statuses,
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
                market = undefined;
                statuses = ['filled', 'canceled', 'rejected', 'expired'];
                request = {
                  'sort': 'desc',
                  'statuses': statuses.join(','),
                  'max_results': 1000
                };

                if (symbol) {
                  market = this.market(symbol);
                  request['symbols'] = market['id'];
                }

                _context11.next = 12;
                return this.tradingGetOrdersRecent(this.extend(request, params));

              case 12:
                response = _context11.sent;
                return _context11.abrupt("return", this.parseOrders(response['orders'], market, since, limit));

              case 14:
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
    key: "fetchOrderTrades",
    value: function () {
      var _fetchOrderTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(id) {
        var symbol,
            since,
            limit,
            params,
            market,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                since = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                limit = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : undefined;
                params = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : {};
                _context12.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                if (typeof symbol !== 'undefined') market = this.market(symbol);
                _context12.next = 10;
                return this.tradingGetTradesByOrder(this.extend({
                  'clientOrderId': id
                }, params));

              case 10:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseTrades(response['trades'], market, since, limit));

              case 12:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchOrderTrades(_x10) {
        return _fetchOrderTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(code, amount, address) {
        var tag,
            params,
            currency,
            request,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                tag = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : undefined;
                params = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : {};
                _context13.next = 4;
                return this.loadMarkets();

              case 4:
                currency = this.currency(code);
                request = {
                  'currency_code': currency['id'],
                  'amount': amount,
                  'address': address
                };
                if (tag) request['paymentId'] = tag;
                _context13.next = 9;
                return this.paymentPostPayout(this.extend(request, params));

              case 9:
                response = _context13.sent;
                return _context13.abrupt("return", {
                  'info': response,
                  'id': response['transaction']
                });

              case 11:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function withdraw(_x11, _x12, _x13) {
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
      var url = '/' + 'api' + '/' + this.version + '/' + api + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api === 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var payload = {
          'nonce': nonce,
          'apikey': this.apiKey
        };
        query = this.extend(payload, query);
        if (method === 'GET') url += '?' + this.urlencode(query);else url += '?' + this.urlencode(payload);
        var auth = url;

        if (method === 'POST') {
          if (_Object$keys(query).length) {
            body = this.urlencode(query);
            auth += body;
          }
        }

        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Signature': this.hmac(this.encode(auth), this.encode(this.secret), 'sha512').toLowerCase()
        };
      }

      url = this.urls['api'] + url;
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
      _regeneratorRuntime.mark(function _callee14(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                api = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 'public';
                method = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 'GET';
                params = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
                headers = _args14.length > 4 && _args14[4] !== undefined ? _args14[4] : undefined;
                body = _args14.length > 5 && _args14[5] !== undefined ? _args14[5] : undefined;
                _context14.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context14.sent;

                if (!('code' in response)) {
                  _context14.next = 13;
                  break;
                }

                if (!('ExecutionReport' in response)) {
                  _context14.next = 12;
                  break;
                }

                if (!(response['ExecutionReport']['orderRejectReason'] === 'orderExceedsLimit')) {
                  _context14.next = 12;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 12:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 13:
                return _context14.abrupt("return", response);

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function request(_x14) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return hitbtc;
}(Exchange);