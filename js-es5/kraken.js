"use strict"; //  ---------------------------------------------------------------------------

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
    ExchangeNotAvailable = _require.ExchangeNotAvailable,
    ExchangeError = _require.ExchangeError,
    OrderNotFound = _require.OrderNotFound,
    DDoSProtection = _require.DDoSProtection,
    InvalidNonce = _require.InvalidNonce,
    InsufficientFunds = _require.InsufficientFunds,
    CancelPending = _require.CancelPending,
    InvalidOrder = _require.InvalidOrder; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(kraken, _Exchange);

  function kraken() {
    _classCallCheck(this, kraken);

    return _possibleConstructorReturn(this, (kraken.__proto__ || _Object$getPrototypeOf(kraken)).apply(this, arguments));
  }

  _createClass(kraken, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(kraken.prototype.__proto__ || _Object$getPrototypeOf(kraken.prototype), "describe", this).call(this), {
        'id': 'kraken',
        'name': 'Kraken',
        'countries': 'US',
        'version': '0',
        'rateLimit': 3000,
        'hasCORS': false,
        // obsolete metainfo interface
        'hasFetchTickers': true,
        'hasFetchOHLCV': true,
        'hasFetchOrder': true,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchMyTrades': true,
        'hasWithdraw': true,
        'hasFetchCurrencies': true,
        // new metainfo interface
        'has': {
          'fetchCurrencies': true,
          'fetchTickers': true,
          'fetchOHLCV': true,
          'fetchOrder': true,
          'fetchOpenOrders': true,
          'fetchClosedOrders': true,
          'fetchMyTrades': true,
          'withdraw': true
        },
        'marketsByAltname': {},
        'timeframes': {
          '1m': '1',
          '5m': '5',
          '15m': '15',
          '30m': '30',
          '1h': '60',
          '4h': '240',
          '1d': '1440',
          '1w': '10080',
          '2w': '21600'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766599-22709304-5ede-11e7-9de1-9f33732e1509.jpg',
          'api': 'https://api.kraken.com',
          'www': 'https://www.kraken.com',
          'doc': ['https://www.kraken.com/en-us/help/api', 'https://github.com/nothingisdead/npm-kraken-api'],
          'fees': ['https://www.kraken.com/en-us/help/fees', 'https://support.kraken.com/hc/en-us/articles/201396777-What-are-the-deposit-fees-', 'https://support.kraken.com/hc/en-us/articles/201893608-What-are-the-withdrawal-fees-']
        },
        'fees': {
          'trading': {
            'tierBased': true,
            'percentage': true,
            'taker': 0.26 / 100,
            'maker': 0.16 / 100,
            'tiers': {
              'taker': [[0, 0.26 / 100], [50000, 0.24 / 100], [100000, 0.22 / 100], [250000, 0.2 / 100], [500000, 0.18 / 100], [1000000, 0.16 / 100], [2500000, 0.14 / 100], [5000000, 0.12 / 100], [10000000, 0.1 / 100]],
              'maker': [[0, 0.16 / 100], [50000, 0.14 / 100], [100000, 0.12 / 100], [250000, 0.10 / 100], [500000, 0.8 / 100], [1000000, 0.6 / 100], [2500000, 0.4 / 100], [5000000, 0.2 / 100], [10000000, 0.0 / 100]]
            }
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.001,
              'ETH': 0.005,
              'XRP': 0.02,
              'XLM': 0.00002,
              'LTC': 0.02,
              'DOGE': 2,
              'ZEC': 0.00010,
              'ICN': 0.02,
              'REP': 0.01,
              'ETC': 0.005,
              'MLN': 0.003,
              'XMR': 0.05,
              'DASH': 0.005,
              'GNO': 0.01,
              'EOS': 0.5,
              'BCH': 0.001,
              'USD': 5,
              // if domestic wire
              'EUR': 5,
              // if domestic wire
              'CAD': 10,
              // CAD EFT Withdrawal
              'JPY': 300 // if domestic wire

            },
            'deposit': {
              'BTC': 0,
              'ETH': 0,
              'XRP': 0,
              'XLM': 0,
              'LTC': 0,
              'DOGE': 0,
              'ZEC': 0,
              'ICN': 0,
              'REP': 0,
              'ETC': 0,
              'MLN': 0,
              'XMR': 0,
              'DASH': 0,
              'GNO': 0,
              'EOS': 0,
              'BCH': 0,
              'USD': 5,
              // if domestic wire
              'EUR': 0,
              // free deposit if EUR SEPA Deposit
              'CAD': 5,
              // if domestic wire
              'JPY': 0 // Domestic Deposit (Free, ¥5,000 deposit minimum)

            }
          }
        },
        'api': {
          'public': {
            'get': ['Assets', 'AssetPairs', 'Depth', 'OHLC', 'Spread', 'Ticker', 'Time', 'Trades']
          },
          'private': {
            'post': ['AddOrder', 'Balance', 'CancelOrder', 'ClosedOrders', 'DepositAddresses', 'DepositMethods', 'DepositStatus', 'Ledgers', 'OpenOrders', 'OpenPositions', 'QueryLedgers', 'QueryOrders', 'QueryTrades', 'TradeBalance', 'TradesHistory', 'TradeVolume', 'Withdraw', 'WithdrawCancel', 'WithdrawInfo', 'WithdrawStatus']
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
      return this.truncate(parseFloat(fee), this.markets[symbol]['precision']['amount']);
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (body.indexOf('Invalid nonce') >= 0) throw new InvalidNonce(this.id + ' ' + body);
      if (body.indexOf('Insufficient funds') >= 0) throw new InsufficientFunds(this.id + ' ' + body);
      if (body.indexOf('Cancel pending') >= 0) throw new CancelPending(this.id + ' ' + body);
      if (body.indexOf('Invalid arguments:volume') >= 0) throw new InvalidOrder(this.id + ' ' + body);
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, keys, result, i, id, market, base, quote, darkpool, symbol, maker, precision, lot;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetAssetPairs();

              case 2:
                markets = _context.sent;
                keys = _Object$keys(markets['result']);
                result = [];

                for (i = 0; i < keys.length; i++) {
                  id = keys[i];
                  market = markets['result'][id];
                  base = market['base'];
                  quote = market['quote'];
                  if (base[0] == 'X' || base[0] == 'Z') base = base.slice(1);
                  if (quote[0] == 'X' || quote[0] == 'Z') quote = quote.slice(1);
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  darkpool = id.indexOf('.d') >= 0;
                  symbol = darkpool ? market['altname'] : base + '/' + quote;
                  maker = undefined;

                  if ('fees_maker' in market) {
                    maker = parseFloat(market['fees_maker'][0][1]) / 100;
                  }

                  precision = {
                    'amount': market['lot_decimals'],
                    'price': market['pair_decimals']
                  };
                  lot = Math.pow(10, -precision['amount']);
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'darkpool': darkpool,
                    'info': market,
                    'altname': market['altname'],
                    'maker': maker,
                    'taker': parseFloat(market['fees'][0][1]) / 100,
                    'lot': lot,
                    'active': true,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': lot,
                        'max': Math.pow(10, precision['amount'])
                      },
                      'price': {
                        'min': Math.pow(10, -precision['price']),
                        'max': undefined
                      },
                      'cost': {
                        'min': 0,
                        'max': undefined
                      }
                    }
                  });
                }

                result = this.appendInactiveMarkets(result);
                this.marketsByAltname = this.indexBy(result, 'altname');
                return _context.abrupt("return", result);

              case 9:
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
    key: "appendInactiveMarkets",
    value: function appendInactiveMarkets() {
      var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var precision = {
        'amount': 8,
        'price': 8
      };
      var costLimits = {
        'min': 0,
        'max': undefined
      };
      var priceLimits = {
        'min': Math.pow(10, -precision['price']),
        'max': undefined
      };
      var amountLimits = {
        'min': Math.pow(10, -precision['amount']),
        'max': Math.pow(10, precision['amount'])
      };
      var limits = {
        'amount': amountLimits,
        'price': priceLimits,
        'cost': costLimits
      };
      var defaults = {
        'darkpool': false,
        'info': undefined,
        'maker': undefined,
        'taker': undefined,
        'lot': amountLimits['min'],
        'active': false,
        'precision': precision,
        'limits': limits
      };
      var markets = [{
        'id': 'XXLMZEUR',
        'symbol': 'XLM/EUR',
        'base': 'XLM',
        'quote': 'EUR',
        'altname': 'XLMEUR'
      }];

      for (var i = 0; i < markets.length; i++) {
        result.push(this.extend(defaults, markets[i]));
      }

      return result;
    }
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            response,
            currencies,
            ids,
            result,
            i,
            id,
            currency,
            code,
            precision,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.publicGetAssets(params);

              case 3:
                response = _context2.sent;
                currencies = response['result'];
                ids = _Object$keys(currencies);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  currency = currencies[id]; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  code = this.commonCurrencyCode(currency['altname']);
                  precision = currency['decimals'];
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': code,
                    'active': true,
                    'status': 'ok',
                    'fee': undefined,
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

              case 9:
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            darkpool,
            market,
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
                darkpool = symbol.indexOf('.d') >= 0;

                if (!darkpool) {
                  _context3.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' does not provide an order book for darkpool symbol ' + symbol);

              case 6:
                market = this.market(symbol);
                _context3.next = 9;
                return this.publicGetDepth(this.extend({
                  'pair': market['id']
                }, params));

              case 9:
                response = _context3.sent;
                orderbook = response['result'][market['id']];
                return _context3.abrupt("return", this.parseOrderBook(orderbook));

              case 12:
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
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var baseVolume = parseFloat(ticker['v'][1]);
      var vwap = parseFloat(ticker['p'][1]);
      var quoteVolume = baseVolume * vwap;
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['h'][1]),
        'low': parseFloat(ticker['l'][1]),
        'bid': parseFloat(ticker['b'][0]),
        'ask': parseFloat(ticker['a'][0]),
        'vwap': vwap,
        'open': parseFloat(ticker['o']),
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['c'][0]),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': baseVolume,
        'quoteVolume': quoteVolume,
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
            pairs,
            s,
            symbol,
            market,
            filter,
            response,
            tickers,
            ids,
            result,
            i,
            id,
            _market,
            _symbol,
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
                pairs = [];

                for (s = 0; s < this.symbols.length; s++) {
                  symbol = this.symbols[s];
                  market = this.markets[symbol];
                  if (market['active']) if (!market['darkpool']) pairs.push(market['id']);
                }

                filter = pairs.join(',');
                _context4.next = 9;
                return this.publicGetTicker(this.extend({
                  'pair': filter
                }, params));

              case 9:
                response = _context4.sent;
                tickers = response['result'];
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  _market = this.markets_by_id[id];
                  _symbol = _market['symbol'];
                  ticker = tickers[id];
                  result[_symbol] = this.parseTicker(ticker, _market);
                }

                return _context4.abrupt("return", result);

              case 15:
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
            darkpool,
            market,
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
                darkpool = symbol.indexOf('.d') >= 0;

                if (!darkpool) {
                  _context5.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' does not provide a ticker for darkpool symbol ' + symbol);

              case 6:
                market = this.market(symbol);
                _context5.next = 9;
                return this.publicGetTicker(this.extend({
                  'pair': market['id']
                }, params));

              case 9:
                response = _context5.sent;
                ticker = response['result'][market['id']];
                return _context5.abrupt("return", this.parseTicker(ticker, market));

              case 12:
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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv[0] * 1000, parseFloat(ohlcv[1]), parseFloat(ohlcv[2]), parseFloat(ohlcv[3]), parseFloat(ohlcv[4]), parseFloat(ohlcv[6])];
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
            ohlcvs,
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
                  'pair': market['id'],
                  'interval': this.timeframes[timeframe]
                };
                if (since) request['since'] = parseInt(since / 1000);
                _context6.next = 11;
                return this.publicGetOHLC(this.extend(request, params));

              case 11:
                response = _context6.sent;
                ohlcvs = response['result'][market['id']];
                return _context6.abrupt("return", this.parseOHLCVs(ohlcvs, market, timeframe, since, limit));

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
      var timestamp = undefined;
      var side = undefined;
      var type = undefined;
      var price = undefined;
      var amount = undefined;
      var id = undefined;
      var order = undefined;
      var fee = undefined;
      if (!market) market = this.findMarketByAltnameOrId(trade['pair']);

      if ('ordertxid' in trade) {
        order = trade['ordertxid'];
        id = trade['id'];
        timestamp = parseInt(trade['time'] * 1000);
        side = trade['type'];
        type = trade['ordertype'];
        price = parseFloat(trade['price']);
        amount = parseFloat(trade['vol']);

        if ('fee' in trade) {
          var currency = undefined;
          if (market) currency = market['quote'];
          fee = {
            'cost': parseFloat(trade['fee']),
            'currency': currency
          };
        }
      } else {
        timestamp = parseInt(trade[2] * 1000);
        side = trade[3] == 's' ? 'sell' : 'buy';
        type = trade[4] == 'l' ? 'limit' : 'market';
        price = parseFloat(trade[0]);
        amount = parseFloat(trade[1]);
      }

      var symbol = market ? market['symbol'] : undefined;
      return {
        'id': id,
        'order': order,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': price,
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
            id,
            response,
            trades,
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
                id = market['id'];
                _context7.next = 9;
                return this.publicGetTrades(this.extend({
                  'pair': id
                }, params));

              case 9:
                response = _context7.sent;
                trades = response['result'][id];
                return _context7.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 12:
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var params,
            response,
            balances,
            result,
            currencies,
            c,
            currency,
            code,
            balance,
            account,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                _context8.next = 5;
                return this.privatePostBalance();

              case 5:
                response = _context8.sent;
                balances = response['result'];
                result = {
                  'info': balances
                };
                currencies = _Object$keys(balances);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  code = currency; // X-ISO4217-A3 standard currency codes

                  if (code[0] == 'X') {
                    code = code.slice(1);
                  } else if (code[0] == 'Z') {
                    code = code.slice(1);
                  }

                  code = this.commonCurrencyCode(code);
                  balance = parseFloat(balances[currency]);
                  account = {
                    'free': balance,
                    'used': 0.0,
                    'total': balance
                  };
                  result[code] = account;
                }

                return _context8.abrupt("return", this.parseBalance(result));

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchBalance() {
        return _fetchBalance.apply(this, arguments);
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
            order,
            response,
            length,
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
                order = {
                  'pair': market['id'],
                  'type': side,
                  'ordertype': type,
                  'volume': this.amountToPrecision(symbol, amount)
                };
                if (type == 'limit') order['price'] = this.priceToPrecision(symbol, price);
                _context9.next = 9;
                return this.privatePostAddOrder(this.extend(order, params));

              case 9:
                response = _context9.sent;
                length = response['result']['txid'].length;
                id = length > 1 ? response['result']['txid'] : response['result']['txid'][0];
                return _context9.abrupt("return", {
                  'info': response,
                  'id': id
                });

              case 13:
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
    key: "findMarketByAltnameOrId",
    value: function findMarketByAltnameOrId(id) {
      var result = undefined;

      if (id in this.marketsByAltname) {
        result = this.marketsByAltname[id];
      } else if (id in this.markets_by_id) {
        result = this.markets_by_id[id];
      }

      return result;
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var description = order['descr'];
      var side = description['type'];
      var type = description['ordertype'];
      var symbol = undefined;
      if (!market) market = this.findMarketByAltnameOrId(description['pair']);
      var timestamp = parseInt(order['opentm'] * 1000);
      var amount = parseFloat(order['vol']);
      var filled = parseFloat(order['vol_exec']);
      var remaining = amount - filled;
      var fee = undefined;
      var cost = this.safeFloat(order, 'cost');
      var price = this.safeFloat(description, 'price');
      if (!price) price = this.safeFloat(order, 'price');

      if (market) {
        symbol = market['symbol'];

        if ('fee' in order) {
          var flags = order['oflags'];
          var feeCost = this.safeFloat(order, 'fee');
          fee = {
            'cost': feeCost,
            'rate': undefined
          };

          if (flags.indexOf('fciq') >= 0) {
            fee['currency'] = market['quote'];
          } else if (flags.indexOf('fcib') >= 0) {
            fee['currency'] = market['base'];
          }
        }
      }

      return {
        'id': order['id'],
        'info': order,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'status': order['status'],
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'fee': fee // 'trades': this.parseTrades (order['trades'], market),

      };
    }
  }, {
    key: "parseOrders",
    value: function parseOrders(orders) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var since = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var result = [];

      var ids = _Object$keys(orders);

      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var order = this.extend({
          'id': id
        }, orders[id]);
        result.push(this.parseOrder(order, market));
      }

      return this.filterBySinceLimit(result, since, limit);
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(id) {
        var symbol,
            params,
            response,
            orders,
            order,
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
                return this.privatePostQueryOrders(this.extend({
                  'trades': true,
                  // whether or not to include trades in output (optional, default false)
                  'txid': id // comma delimited list of transaction ids to query info about (20 maximum)
                  // 'userref': 'optional', // restrict results to given user reference id (optional)

                }, params));

              case 6:
                response = _context10.sent;
                orders = response['result'];
                order = this.parseOrder(this.extend({
                  'id': id
                }, orders[id]));
                return _context10.abrupt("return", this.extend({
                  'info': response
                }, order));

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
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
            request,
            response,
            trades,
            ids,
            i,
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
                request = {// 'type': 'all', // any position, closed position, closing position, no position
                  // 'trades': false, // whether or not to include trades related to position in output
                  // 'start': 1234567890, // starting unix timestamp or trade tx id of results (exclusive)
                  // 'end': 1234567890, // ending unix timestamp or trade tx id of results (inclusive)
                  // 'ofs' = result offset
                };
                if (since) request['start'] = parseInt(since / 1000);
                _context11.next = 10;
                return this.privatePostTradesHistory(this.extend(request, params));

              case 10:
                response = _context11.sent;
                trades = response['result']['trades'];
                ids = _Object$keys(trades);

                for (i = 0; i < ids.length; i++) {
                  trades[ids[i]]['id'] = ids[i];
                }

                return _context11.abrupt("return", this.parseTrades(trades, undefined, since, limit));

              case 15:
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
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
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
                response = undefined;
                _context12.prev = 5;
                _context12.next = 8;
                return this.privatePostCancelOrder(this.extend({
                  'txid': id
                }, params));

              case 8:
                response = _context12.sent;
                _context12.next = 17;
                break;

              case 11:
                _context12.prev = 11;
                _context12.t0 = _context12["catch"](5);

                if (!this.last_http_response) {
                  _context12.next = 16;
                  break;
                }

                if (!(this.last_http_response.indexOf('EOrder:Unknown order') >= 0)) {
                  _context12.next = 16;
                  break;
                }

                throw new OrderNotFound(this.id + ' cancelOrder() error ' + this.last_http_response);

              case 16:
                throw _context12.t0;

              case 17:
                return _context12.abrupt("return", response);

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[5, 11]]);
      }));

      return function cancelOrder(_x10) {
        return _cancelOrder.apply(this, arguments);
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
            request,
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
                if (since) request['start'] = parseInt(since / 1000);
                _context13.next = 10;
                return this.privatePostOpenOrders(this.extend(request, params));

              case 10:
                response = _context13.sent;
                orders = this.parseOrders(response['result']['open'], undefined, since, limit);
                return _context13.abrupt("return", this.filterOrdersBySymbol(orders, symbol));

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
            request,
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
                request = {};
                if (since) request['start'] = parseInt(since / 1000);
                _context14.next = 10;
                return this.privatePostClosedOrders(this.extend(request, params));

              case 10:
                response = _context14.sent;
                orders = this.parseOrders(response['result']['closed'], undefined, since, limit);
                return _context14.abrupt("return", this.filterOrdersBySymbol(orders, symbol));

              case 13:
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
    key: "fetchDepositMethods",
    value: function () {
      var _fetchDepositMethods = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15() {
        var code,
            params,
            request,
            currency,
            response,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                code = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : undefined;
                params = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
                _context15.next = 4;
                return this.loadMarkets();

              case 4:
                request = {};

                if (code) {
                  currency = this.currency(code);
                  request['asset'] = currency['id'];
                }

                _context15.next = 8;
                return this.privatePostDepositMethods(this.extend(request, params));

              case 8:
                response = _context15.sent;
                return _context15.abrupt("return", response['result']);

              case 10:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function fetchDepositMethods() {
        return _fetchDepositMethods.apply(this, arguments);
      };
    }()
  }, {
    key: "createDepositAddress",
    value: function () {
      var _createDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(currency) {
        var params,
            request,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                params = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
                request = {
                  'new': 'true'
                };
                _context16.next = 4;
                return this.fetchDepositAddress(currency, this.extend(request, params));

              case 4:
                response = _context16.sent;
                return _context16.abrupt("return", {
                  'currency': currency,
                  'address': response['address'],
                  'status': 'ok',
                  'info': response
                });

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      _regeneratorRuntime.mark(function _callee17(code) {
        var params,
            method,
            currency,
            request,
            response,
            result,
            numResults,
            address,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                params = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};
                method = this.safeValue(params, 'method');

                if (method) {
                  _context17.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchDepositAddress() requires an extra `method` parameter');

              case 4:
                _context17.next = 6;
                return this.loadMarkets();

              case 6:
                currency = this.currency(code);
                request = {
                  'asset': currency['id'],
                  'method': method,
                  'new': 'false'
                };
                _context17.next = 10;
                return this.privatePostDepositAddresses(this.extend(request, params));

              case 10:
                response = _context17.sent;
                result = response['result'];
                numResults = result.length;

                if (!(numResults < 1)) {
                  _context17.next = 15;
                  break;
                }

                throw new ExchangeError(this.id + ' privatePostDepositAddresses() returned no addresses');

              case 15:
                address = this.safeString(result[0], 'address');
                return _context17.abrupt("return", {
                  'currency': code,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 17:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
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
      _regeneratorRuntime.mark(function _callee18(currency, amount, address) {
        var params,
            response,
            _args18 = arguments;
        return _regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                params = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : {};

                if (!('key' in params)) {
                  _context18.next = 8;
                  break;
                }

                _context18.next = 4;
                return this.loadMarkets();

              case 4:
                _context18.next = 6;
                return this.privatePostWithdraw(this.extend({
                  'asset': currency,
                  'amount': amount // 'address': address, // they don't allow withdrawals to direct addresses

                }, params));

              case 6:
                response = _context18.sent;
                return _context18.abrupt("return", {
                  'info': response,
                  'id': response['result']
                });

              case 8:
                throw new ExchangeError(this.id + " withdraw requires a 'key' parameter (withdrawal key name, as set up on your account)");

              case 9:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      return function withdraw(_x13, _x14, _x15) {
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
      var url = '/' + this.version + '/' + api + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        body = this.urlencode(this.extend({
          'nonce': nonce
        }, params));
        var auth = this.encode(nonce + body);
        var hash = this.hash(auth, 'sha256', 'binary');
        var binary = this.stringToBinary(this.encode(url));
        var binhash = this.binaryConcat(binary, hash);
        var secret = this.base64ToBinary(this.secret);
        var signature = this.hmac(binhash, secret, 'sha512', 'base64');
        headers = {
          'API-Key': this.apiKey,
          'API-Sign': this.decode(signature),
          'Content-Type': 'application/x-www-form-urlencoded'
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
    key: "nonce",
    value: function nonce() {
      return this.milliseconds();
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
            numErrors,
            i,
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
                  _context19.next = 21;
                  break;
                }

                numErrors = response['error'].length;

                if (!numErrors) {
                  _context19.next = 21;
                  break;
                }

                i = 0;

              case 12:
                if (!(i < response['error'].length)) {
                  _context19.next = 20;
                  break;
                }

                if (!(response['error'][i] == 'EService:Unavailable')) {
                  _context19.next = 15;
                  break;
                }

                throw new ExchangeNotAvailable(this.id + ' ' + this.json(response));

              case 15:
                if (!(response['error'][i] == 'EService:Busy')) {
                  _context19.next = 17;
                  break;
                }

                throw new DDoSProtection(this.id + ' ' + this.json(response));

              case 17:
                i++;
                _context19.next = 12;
                break;

              case 20:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 21:
                return _context19.abrupt("return", response);

              case 22:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      return function request(_x16) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return kraken;
}(Exchange);