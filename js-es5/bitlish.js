"use strict"; //  ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
    NotSupported = _require.NotSupported; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitlish, _Exchange);

  function bitlish() {
    _classCallCheck(this, bitlish);

    return _possibleConstructorReturn(this, (bitlish.__proto__ || _Object$getPrototypeOf(bitlish)).apply(this, arguments));
  }

  _createClass(bitlish, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitlish.prototype.__proto__ || _Object$getPrototypeOf(bitlish.prototype), "describe", this).call(this), {
        'id': 'bitlish',
        'name': 'Bitlish',
        'countries': ['GB', 'EU', 'RU'],
        'rateLimit': 1500,
        'version': 'v1',
        'hasCORS': false,
        'hasFetchTickers': true,
        'hasFetchOHLCV': true,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766275-dcfc6c30-5ed3-11e7-839d-00a846385d0b.jpg',
          'api': 'https://bitlish.com/api',
          'www': 'https://bitlish.com',
          'doc': 'https://bitlish.com/api'
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': false
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'taker': 0.3 / 100,
            // anonymous 0.3%, verified 0.2%
            'maker': 0
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.001,
              'LTC': 0.001,
              'DOGE': 0.001,
              'ETH': 0.001,
              'XMR': 0,
              'ZEC': 0.001,
              'DASH': 0.0001,
              'EUR': 50
            },
            'deposit': {
              'BTC': 0,
              'LTC': 0,
              'DOGE': 0,
              'ETH': 0,
              'XMR': 0,
              'ZEC': 0,
              'DASH': 0,
              'EUR': 0
            }
          }
        },
        'api': {
          'public': {
            'get': ['instruments', 'ohlcv', 'pairs', 'tickers', 'trades_depth', 'trades_history'],
            'post': ['instruments', 'ohlcv', 'pairs', 'tickers', 'trades_depth', 'trades_history']
          },
          'private': {
            'post': ['accounts_operations', 'balance', 'cancel_trade', 'cancel_trades_by_ids', 'cancel_all_trades', 'create_bcode', 'create_template_wallet', 'create_trade', 'deposit', 'list_accounts_operations_from_ts', 'list_active_trades', 'list_bcodes', 'list_my_matches_from_ts', 'list_my_trades', 'list_my_trads_from_ts', 'list_payment_methods', 'list_payments', 'redeem_code', 'resign', 'signin', 'signout', 'trade_details', 'trade_options', 'withdraw', 'withdraw_by_id']
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (!this.substituteCommonCurrencyCodes) return currency;
      if (currency == 'XBT') return 'BTC';
      if (currency == 'BCC') return 'BCH';
      if (currency == 'DRK') return 'DASH';
      if (currency == 'DSH') currency = 'DASH';
      if (currency == 'XDG') currency = 'DOGE';
      return currency;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, result, keys, p, market, id, symbol, _symbol$split, _symbol$split2, base, quote;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetPairs();

              case 2:
                markets = _context.sent;
                result = [];
                keys = _Object$keys(markets);

                for (p = 0; p < keys.length; p++) {
                  market = markets[keys[p]];
                  id = market['id'];
                  symbol = market['name'];
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
                  });
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
    key: "parseTicker",
    value: function parseTicker(ticker, market) {
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'high': this.safeFloat(ticker, 'max'),
        'low': this.safeFloat(ticker, 'min'),
        'bid': undefined,
        'ask': undefined,
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': this.safeFloat(ticker, 'first'),
        'last': this.safeFloat(ticker, 'last'),
        'change': undefined,
        'percentage': this.safeFloat(ticker, 'prc'),
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'sum'),
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
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
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                symbols = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : undefined;
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 4;
                return this.loadMarkets();

              case 4:
                _context2.next = 6;
                return this.publicGetTickers(params);

              case 6:
                tickers = _context2.sent;
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = tickers[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context2.abrupt("return", result);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
            tickers,
            ticker,
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
                return this.publicGetTickers(params);

              case 6:
                tickers = _context3.sent;
                ticker = tickers[market['id']];
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
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
            now,
            start,
            interval,
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
                // let market = this.market (symbol);
                now = this.seconds();
                start = now - 86400 * 30; // last 30 days

                interval = [start.toString(), undefined];
                _context4.next = 11;
                return this.publicPostOhlcv(this.extend({
                  'time_range': interval
                }, params));

              case 11:
                return _context4.abrupt("return", _context4.sent);

              case 12:
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            orderbook,
            timestamp,
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
                return this.publicGetTradesDepth(this.extend({
                  'pair_id': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context5.sent;
                timestamp = parseInt(parseInt(orderbook['last']) / 1000);
                return _context5.abrupt("return", this.parseOrderBook(orderbook, timestamp, 'bid', 'ask', 'price', 'volume'));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x3) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = trade['dir'] == 'bid' ? 'buy' : 'sell';
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var timestamp = parseInt(trade['created'] / 1000);
      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'order': undefined,
        'type': undefined,
        'side': side,
        'price': trade['price'],
        'amount': trade['amount']
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
                return this.publicGetTradesHistory(this.extend({
                  'pair_id': market['id']
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['list'], market, since, limit));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7() {
        var params,
            response,
            result,
            currencies,
            balance,
            c,
            currency,
            account,
            i,
            _currency,
            _account,
            _args7 = arguments;

        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _context7.next = 3;
                return this.loadMarkets();

              case 3:
                _context7.next = 5;
                return this.privatePostBalance();

              case 5:
                response = _context7.sent;
                result = {
                  'info': response
                };
                currencies = _Object$keys(response);
                balance = {};

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  account = response[currency];
                  currency = currency.toUpperCase(); // issue #4 bitlish names Dash as DSH, instead of DASH

                  if (currency == 'DSH') currency = 'DASH';
                  if (currency == 'XDG') currency = 'DOGE';
                  balance[currency] = account;
                }

                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  _currency = currencies[i];
                  _account = this.account();

                  if (_currency in balance) {
                    _account['free'] = parseFloat(balance[_currency]['funds']);
                    _account['used'] = parseFloat(balance[_currency]['holded']);
                    _account['total'] = this.sum(_account['free'], _account['used']);
                  }

                  result[_currency] = _account;
                }

                return _context7.abrupt("return", this.parseBalance(result));

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchBalance() {
        return _fetchBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "signIn",
    value: function signIn() {
      return this.privatePostSignin({
        'login': this.login,
        'passwd': this.password
      });
    }
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
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
                order = {
                  'pair_id': this.marketId(symbol),
                  'dir': side == 'buy' ? 'bid' : 'ask',
                  'amount': amount
                };
                if (type == 'limit') order['price'] = price;
                _context8.next = 8;
                return this.privatePostCreateTrade(this.extend(order, params));

              case 8:
                result = _context8.sent;
                return _context8.abrupt("return", {
                  'info': result,
                  'id': result['id']
                });

              case 10:
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
                return this.privatePostCancelTrade({
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
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(currency, amount, address) {
        var params,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.next = 3;
                return this.loadMarkets();

              case 3:
                if (!(currency != 'BTC')) {
                  _context10.next = 5;
                  break;
                }

                throw new NotSupported(this.id + ' currently supports BTC withdrawals only, until they document other currencies...');

              case 5:
                _context10.next = 7;
                return this.privatePostWithdraw(this.extend({
                  'currency': currency.toLowerCase(),
                  'amount': parseFloat(amount),
                  'account': address,
                  'payment_method': 'bitcoin' // they did not document other types...

                }, params));

              case 7:
                response = _context10.sent;
                return _context10.abrupt("return", {
                  'info': response,
                  'id': response['message_id']
                });

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function withdraw(_x10, _x11, _x12) {
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
      var url = this.urls['api'] + '/' + this.version + '/' + path;

      if (api == 'public') {
        if (method == 'GET') {
          if (_Object$keys(params).length) url += '?' + this.urlencode(params);
        } else {
          body = this.json(params);
          headers = {
            'Content-Type': 'application/json'
          };
        }
      } else {
        this.checkRequiredCredentials();
        body = this.json(this.extend({
          'token': this.apiKey
        }, params));
        headers = {
          'Content-Type': 'application/json'
        };
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }]);

  return bitlish;
}(Exchange);