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

var hitbtc = require('./hitbtc');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    OrderNotFound = _require.OrderNotFound,
    InsufficientFunds = _require.InsufficientFunds; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_hitbtc) {
  _inherits(hitbtc2, _hitbtc);

  function hitbtc2() {
    _classCallCheck(this, hitbtc2);

    return _possibleConstructorReturn(this, (hitbtc2.__proto__ || _Object$getPrototypeOf(hitbtc2)).apply(this, arguments));
  }

  _createClass(hitbtc2, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(hitbtc2.prototype.__proto__ || _Object$getPrototypeOf(hitbtc2.prototype), "describe", this).call(this), {
        'id': 'hitbtc2',
        'name': 'HitBTC v2',
        'countries': 'HK',
        // Hong Kong
        'rateLimit': 1500,
        'version': '2',
        'hasCORS': true,
        // older metainfo interface
        'hasFetchOHLCV': true,
        'hasFetchTickers': true,
        'hasFetchOrder': true,
        'hasFetchOrders': false,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchMyTrades': true,
        'hasWithdraw': true,
        'hasFetchCurrencies': true,
        // new metainfo interface
        'has': {
          'fetchCurrencies': true,
          'fetchOHLCV': true,
          'fetchTickers': true,
          'fetchOrder': true,
          'fetchOrders': false,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true,
          'fetchMyTrades': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': 'M1',
          '3m': 'M3',
          '5m': 'M5',
          '15m': 'M15',
          '30m': 'M30',
          // default
          '1h': 'H1',
          '4h': 'H4',
          '1d': 'D1',
          '1w': 'D7',
          '1M': '1M'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766555-8eaec20e-5edc-11e7-9c5b-6dc69fc42f5e.jpg',
          'api': 'https://api.hitbtc.com',
          'www': 'https://hitbtc.com',
          'doc': 'https://api.hitbtc.com'
        },
        'api': {
          'public': {
            'get': ['symbol', // Available Currency Symbols
            'symbol/{symbol}', // Get symbol info
            'currency', // Available Currencies
            'currency/{currency}', // Get currency info
            'ticker', // Ticker list for all symbols
            'ticker/{symbol}', // Ticker for symbol
            'trades/{symbol}', // Trades
            'orderbook/{symbol}', // Orderbook
            'candles/{symbol}']
          },
          'private': {
            'get': ['order', // List your current open orders
            'order/{clientOrderId}', // Get a single order by clientOrderId
            'trading/balance', // Get trading balance
            'trading/fee/{symbol}', // Get trading fee rate
            'history/trades', // Get historical trades
            'history/order', // Get historical orders
            'history/order/{id}/trades', // Get historical trades by specified order
            'account/balance', // Get main acccount balance
            'account/transactions', // Get account transactions
            'account/transactions/{id}', // Get account transaction by id
            'account/crypto/address/{currency}'],
            'post': ['order', // Create new order
            'account/crypto/withdraw', // Withdraw crypro
            'account/crypto/address/{currency}', // Create new deposit crypro address
            'account/transfer'],
            'put': ['order/{clientOrderId}', // Create new order
            'account/crypto/withdraw/{id}'],
            'delete': ['order', // Cancel all open orders
            'order/{clientOrderId}', // Cancel order
            'account/crypto/withdraw/{id}'],
            'patch': ['order/{clientOrderId}']
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
              'BTC': 0.0007,
              'ETH': 0.00958,
              'BCH': 0.0018,
              'USDT': 5,
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
              'ARDR': 2,
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
              'BTC': 0,
              'ETH': 0,
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
      if (currency == 'CAT') return 'BitClave';
      return currency;
    }
  }, {
    key: "currencyId",
    value: function currencyId(currency) {
      if (currency == 'BitClave') return 'CAT';
      return currency;
    }
  }, {
    key: "feeToPrecision",
    value: function feeToPrecision(symbol, fee) {
      return this.truncate(fee, 8);
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, result, i, market, id, base, quote, symbol, lot, step, precision, taker, maker;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetSymbol();

              case 2:
                markets = _context.sent;
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['id'];
                  base = market['baseCurrency'];
                  quote = market['quoteCurrency'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  lot = parseFloat(market['quantityIncrement']);
                  step = parseFloat(market['tickSize']);
                  precision = {
                    'price': this.precisionFromString(market['tickSize']),
                    'amount': this.precisionFromString(market['quantityIncrement'])
                  };
                  taker = parseFloat(market['takeLiquidityRate']);
                  maker = parseFloat(market['provideLiquidityRate']);
                  result.push(this.extend(this.fees['trading'], {
                    'info': market,
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': true,
                    'lot': lot,
                    'step': step,
                    'taker': taker,
                    'maker': maker,
                    'precision': precision,
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
                        'min': lot * step,
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
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            currencies,
            result,
            i,
            currency,
            id,
            precision,
            code,
            payin,
            payout,
            transfer,
            active,
            status,
            type,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.publicGetCurrency(params);

              case 3:
                currencies = _context2.sent;
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['id']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  precision = 8; // default precision, todo: fix "magic constants"

                  code = this.commonCurrencyCode(id);
                  payin = currency['payinEnabled'];
                  payout = currency['payoutEnabled'];
                  transfer = currency['transferEnabled'];
                  active = payin && payout && transfer;
                  status = 'ok';
                  if ('disabled' in currency) if (currency['disabled']) status = 'disabled';
                  type = currency['crypto'] ? 'crypto' : 'fiat';
                  result[code] = {
                    'id': id,
                    'code': code,
                    'type': type,
                    'payin': payin,
                    'payout': payout,
                    'transfer': transfer,
                    'info': currency,
                    'name': currency['fullName'],
                    'active': active,
                    'status': status,
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
                        'max': Math.pow(10, precision)
                      }
                    }
                  };
                }

                return _context2.abrupt("return", result);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var params,
            type,
            method,
            balances,
            result,
            b,
            balance,
            code,
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
                type = this.safeString(params, 'type', 'trading');
                method = 'privateGet' + this.capitalize(type) + 'Balance';
                _context3.next = 7;
                return this[method]();

              case 7:
                balances = _context3.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  code = balance['currency'];
                  currency = this.commonCurrencyCode(code);
                  account = {
                    'free': parseFloat(balance['available']),
                    'used': parseFloat(balance['reserved']),
                    'total': 0.0
                  };
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context3.abrupt("return", this.parseBalance(result));

              case 11:
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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1d';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var timestamp = this.parse8601(ohlcv['timestamp']);
      return [timestamp, parseFloat(ohlcv['open']), parseFloat(ohlcv['max']), parseFloat(ohlcv['min']), parseFloat(ohlcv['close']), parseFloat(ohlcv['volumeQuote'])];
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
            request,
            response,
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
                request = {
                  'symbol': market['id'],
                  'period': this.timeframes[timeframe]
                };
                if (limit) request['limit'] = limit;
                _context4.next = 11;
                return this.publicGetCandlesSymbol(this.extend(request, params));

              case 11:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOHLCV(_x) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            orderbook,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.publicGetOrderbookSymbol(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context5.sent;
                return _context5.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bid', 'ask', 'price', 'size'));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x2) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.parse8601(ticker['timestamp']);
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
        'close': this.safeFloat(ticker, 'close'),
        'first': undefined,
        'last': this.safeFloat(ticker, 'last'),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'volume'),
        'quoteVolume': this.safeFloat(ticker, 'volumeQuote'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbols,
            params,
            tickers,
            result,
            i,
            ticker,
            id,
            market,
            symbol,
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
                return this.publicGetTicker(params);

              case 6:
                tickers = _context6.sent;
                result = {};

                for (i = 0; i < tickers.length; i++) {
                  ticker = tickers[i];
                  id = ticker['symbol'];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context6.abrupt("return", result);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var params,
            market,
            ticker,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                _context7.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context7.next = 6;
                return this.publicGetTickerSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                ticker = _context7.sent;

                if (!('message' in ticker)) {
                  _context7.next = 9;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + ticker['message']);

              case 9:
                return _context7.abrupt("return", this.parseTicker(ticker, market));

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchTicker(_x3) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.parse8601(trade['timestamp']);
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        var id = trade['symbol'];

        if (id in this.markets_by_id) {
          market = this.markets_by_id[id];
          symbol = market['symbol'];
        } else {
          symbol = id;
        }
      }

      var fee = undefined;

      if ('fee' in trade) {
        var currency = market ? market['quote'] : undefined;
        fee = {
          'cost': parseFloat(trade['fee']),
          'currency': currency
        };
      }

      var orderId = undefined;
      if ('clientOrderId' in trade) orderId = trade['clientOrderId'];
      var price = parseFloat(trade['price']);
      var amount = parseFloat(trade['quantity']);
      var cost = price * amount;
      return {
        'info': trade,
        'id': trade['id'].toString(),
        'order': orderId,
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
      _regeneratorRuntime.mark(function _callee8(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                since = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : undefined;
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context8.next = 8;
                return this.publicGetTradesSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(symbol, type, side, amount) {
        var price,
            params,
            market,
            clientOrderId,
            request,
            response,
            order,
            id,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                price = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                params = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : {};
                _context9.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                clientOrderId = this.uuid(); // their max accepted length is 32 characters

                clientOrderId = clientOrderId.replace('-', '');
                clientOrderId = clientOrderId.slice(0, 32);
                amount = parseFloat(amount);
                request = {
                  'clientOrderId': clientOrderId,
                  'symbol': market['id'],
                  'side': side,
                  'quantity': this.amountToPrecision(symbol, amount),
                  'type': type
                };

                if (type == 'limit') {
                  request['price'] = this.priceToPrecision(symbol, price);
                } else {
                  request['timeInForce'] = 'FOK';
                }

                _context9.next = 13;
                return this.privatePostOrder(this.extend(request, params));

              case 13:
                response = _context9.sent;
                order = this.parseOrder(response);
                id = order['id'];
                this.orders[id] = order;
                return _context9.abrupt("return", order);

              case 18:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10(id) {
        var symbol,
            params,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                params = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : {};
                _context10.next = 4;
                return this.loadMarkets();

              case 4:
                _context10.next = 6;
                return this.privateDeleteOrderClientOrderId(this.extend({
                  'clientOrderId': id
                }, params));

              case 6:
                return _context10.abrupt("return", _context10.sent);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var created = undefined;
      if ('createdAt' in order) created = this.parse8601(order['createdAt']);
      var updated = undefined;
      if ('updatedAt' in order) updated = this.parse8601(order['updatedAt']);
      if (!market) market = this.markets_by_id[order['symbol']];
      var symbol = market['symbol'];
      var amount = this.safeFloat(order, 'quantity');
      var filled = this.safeFloat(order, 'cumQuantity');
      var status = order['status'];

      if (status == 'new') {
        status = 'open';
      } else if (status == 'suspended') {
        status = 'open';
      } else if (status == 'partiallyFilled') {
        status = 'open';
      } else if (status == 'filled') {
        status = 'closed';
      }

      var id = order['clientOrderId'].toString();
      var price = this.safeFloat(order, 'price');

      if (typeof price == 'undefined') {
        if (id in this.orders) price = this.orders[id]['price'];
      }

      var remaining = undefined;
      var cost = undefined;

      if (typeof amount != 'undefined') {
        if (typeof filled != 'undefined') {
          remaining = amount - filled;

          if (typeof price != 'undefined') {
            cost = filled * price;
          }
        }
      }

      return {
        'id': id,
        'timestamp': created,
        'datetime': this.iso8601(created),
        'created': created,
        'updated': updated,
        'status': status,
        'symbol': symbol,
        'type': order['type'],
        'side': order['side'],
        'price': price,
        'amount': amount,
        'cost': cost,
        'filled': filled,
        'remaining': remaining,
        'fee': undefined,
        'info': order
      };
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11(id) {
        var symbol,
            params,
            response,
            numOrders,
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
                return this.privateGetHistoryOrder(this.extend({
                  'clientOrderId': id
                }, params));

              case 6:
                response = _context11.sent;
                numOrders = response.length;

                if (!(numOrders > 0)) {
                  _context11.next = 10;
                  break;
                }

                return _context11.abrupt("return", this.parseOrder(response[0]));

              case 10:
                throw new OrderNotFound(this.id + ' order ' + id + ' not found');

              case 11:
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
    key: "fetchActiveOrder",
    value: function () {
      var _fetchActiveOrder = _asyncToGenerator(
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
                return this.privateGetOrderClientOrderId(this.extend({
                  'clientOrderId': id
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

      return function fetchActiveOrder(_x11) {
        return _fetchActiveOrder.apply(this, arguments);
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

                if (symbol) {
                  market = this.market(symbol);
                  request['symbol'] = market['id'];
                }

                _context13.next = 11;
                return this.privateGetOrder(this.extend(request, params));

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
            market,
            request,
            response,
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
                market = undefined;
                request = {};

                if (symbol) {
                  market = this.market(symbol);
                  request['symbol'] = market['id'];
                }

                if (limit) request['limit'] = limit;

                if (since) {
                  request['from'] = this.iso8601(since);
                }

                _context14.next = 13;
                return this.privateGetHistoryOrder(this.extend(request, params));

              case 13:
                response = _context14.sent;
                return _context14.abrupt("return", this.parseOrders(response, market, since, limit));

              case 15:
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
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
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
                request = {// 'symbol': 'BTC/USD', // optional
                  // 'sort': 'DESC', // or 'ASC'
                  // 'by': 'timestamp', // or 'id'	String	timestamp by default, or id
                  // 'from':	'Datetime or Number', // ISO 8601
                  // 'till':	'Datetime or Number',
                  // 'limit': 100,
                  // 'offset': 0,
                };
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['symbol'] = market['id'];
                }

                if (since) request['from'] = this.iso8601(since);
                if (limit) request['limit'] = limit;
                _context15.next = 13;
                return this.privateGetHistoryTrades(this.extend(request, params));

              case 13:
                response = _context15.sent;
                return _context15.abrupt("return", this.parseTrades(response, market, since, limit));

              case 15:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "createDepositAddress",
    value: function () {
      var _createDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(currency) {
        var params,
            currencyId,
            response,
            address,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                params = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
                currencyId = this.currencyId(currency);
                _context16.next = 4;
                return this.privatePostAccountCryptoAddressCurrency({
                  'currency': currencyId
                });

              case 4:
                response = _context16.sent;
                address = response['address'];
                return _context16.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      return function createDepositAddress(_x12) {
        return _createDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee17(currency) {
        var params,
            currencyId,
            response,
            address,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                params = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};
                currencyId = this.currencyId(currency);
                _context17.next = 4;
                return this.privateGetAccountCryptoAddressCurrency({
                  'currency': currencyId
                });

              case 4:
                response = _context17.sent;
                address = response['address'];
                return _context17.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 7:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function fetchDepositAddress(_x13) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee18(currency, amount, address) {
        var params,
            currencyId,
            response,
            _args18 = arguments;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                params = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : {};
                currencyId = this.currencyId(currency);
                amount = parseFloat(amount);
                _context18.next = 5;
                return this.privatePostAccountCryptoWithdraw(this.extend({
                  'currency': currencyId,
                  'amount': amount,
                  'address': address
                }, params));

              case 5:
                response = _context18.sent;
                return _context18.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 7:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function withdraw(_x14, _x15, _x16) {
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
      var url = '/api' + '/' + this.version + '/';
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        url += api + '/' + this.implodeParams(path, params);
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        url += this.implodeParams(path, params);

        if (method == 'GET') {
          if (_Object$keys(query).length) url += '?' + this.urlencode(query);
        } else {
          if (_Object$keys(query).length) body = this.json(query);
        }

        var payload = this.encode(this.apiKey + ':' + this.secret);
        var auth = this.stringToBase64(payload);
        headers = {
          'Authorization': "Basic " + this.decode(auth),
          'Content-Type': 'application/json'
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
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code == 400) {
        if (body[0] == "{") {
          var response = JSON.parse(body);

          if ('error' in response) {
            if ('message' in response['error']) {
              var message = response['error']['message'];

              if (message == 'Order not found') {
                throw new OrderNotFound(this.id + ' order not found in active orders');
              } else if (message == 'Insufficient funds') {
                throw new InsufficientFunds(this.id + ' ' + message);
              }
            }
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
      _regeneratorRuntime.mark(function _callee19(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args19 = arguments;
        return _regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                api = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : 'public';
                method = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : 'GET';
                params = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : {};
                headers = _args19.length > 4 && _args19[4] !== undefined ? _args19[4] : undefined;
                body = _args19.length > 5 && _args19[5] !== undefined ? _args19[5] : undefined;
                _context19.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context19.sent;

                if (!('error' in response)) {
                  _context19.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context19.abrupt("return", response);

              case 11:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      return function request(_x17) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return hitbtc2;
}(hitbtc);