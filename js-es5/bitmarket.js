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
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bitmarket, _Exchange);

  function bitmarket() {
    _classCallCheck(this, bitmarket);

    return _possibleConstructorReturn(this, (bitmarket.__proto__ || _Object$getPrototypeOf(bitmarket)).apply(this, arguments));
  }

  _createClass(bitmarket, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitmarket.prototype.__proto__ || _Object$getPrototypeOf(bitmarket.prototype), "describe", this).call(this), {
        'id': 'bitmarket',
        'name': 'BitMarket',
        'countries': ['PL', 'EU'],
        'rateLimit': 1500,
        'hasCORS': false,
        'hasFetchOHLCV': true,
        'hasWithdraw': true,
        'timeframes': {
          '90m': '90m',
          '6h': '6h',
          '1d': '1d',
          '1w': '7d',
          '1M': '1m',
          '3M': '3m',
          '6M': '6m',
          '1y': '1y'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27767256-a8555200-5ef9-11e7-96fd-469a65e2b0bd.jpg',
          'api': {
            'public': 'https://www.bitmarket.net',
            'private': 'https://www.bitmarket.pl/api2/' // last slash is critical

          },
          'www': ['https://www.bitmarket.pl', 'https://www.bitmarket.net'],
          'doc': ['https://www.bitmarket.net/docs.php?file=api_public.html', 'https://www.bitmarket.net/docs.php?file=api_private.html', 'https://github.com/bitmarket-net/api']
        },
        'api': {
          'public': {
            'get': ['json/{market}/ticker', 'json/{market}/orderbook', 'json/{market}/trades', 'json/ctransfer', 'graphs/{market}/90m', 'graphs/{market}/6h', 'graphs/{market}/1d', 'graphs/{market}/7d', 'graphs/{market}/1m', 'graphs/{market}/3m', 'graphs/{market}/6m', 'graphs/{market}/1y']
          },
          'private': {
            'post': ['info', 'trade', 'cancel', 'orders', 'trades', 'history', 'withdrawals', 'tradingdesk', 'tradingdeskStatus', 'tradingdeskConfirm', 'cryptotradingdesk', 'cryptotradingdeskStatus', 'cryptotradingdeskConfirm', 'withdraw', 'withdrawFiat', 'withdrawPLNPP', 'withdrawFiatFast', 'deposit', 'transfer', 'transfers', 'marginList', 'marginOpen', 'marginClose', 'marginCancel', 'marginModify', 'marginBalanceAdd', 'marginBalanceRemove', 'swapList', 'swapOpen', 'swapClose']
          }
        },
        'markets': {
          'BCH/PLN': {
            'id': 'BCCPLN',
            'symbol': 'BCH/PLN',
            'base': 'BCH',
            'quote': 'PLN'
          },
          'BTG/PLN': {
            'id': 'BTGPLN',
            'symbol': 'BTG/PLN',
            'base': 'BTG',
            'quote': 'PLN'
          },
          'BTC/PLN': {
            'id': 'BTCPLN',
            'symbol': 'BTC/PLN',
            'base': 'BTC',
            'quote': 'PLN'
          },
          'BTC/EUR': {
            'id': 'BTCEUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR'
          },
          'LTC/PLN': {
            'id': 'LTCPLN',
            'symbol': 'LTC/PLN',
            'base': 'LTC',
            'quote': 'PLN'
          },
          'LTC/BTC': {
            'id': 'LTCBTC',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC'
          },
          'LiteMineX/BTC': {
            'id': 'LiteMineXBTC',
            'symbol': 'LiteMineX/BTC',
            'base': 'LiteMineX',
            'quote': 'BTC'
          }
        },
        'fees': {
          'trading': {
            'tierBased': true,
            'percentage': true,
            'taker': 0.45 / 100,
            'maker': 0.15 / 100,
            'tiers': {
              'taker': [[0, 0.45 / 100], [99.99, 0.44 / 100], [299.99, 0.43 / 100], [499.99, 0.42 / 100], [999.99, 0.41 / 100], [1999.99, 0.40 / 100], [2999.99, 0.39 / 100], [4999.99, 0.38 / 100], [9999.99, 0.37 / 100], [19999.99, 0.36 / 100], [29999.99, 0.35 / 100], [49999.99, 0.34 / 100], [99999.99, 0.33 / 100], [199999.99, 0.32 / 100], [299999.99, 0.31 / 100], [499999.99, 0.0 / 100]],
              'maker': [[0, 0.15 / 100], [99.99, 0.14 / 100], [299.99, 0.13 / 100], [499.99, 0.12 / 100], [999.99, 0.11 / 100], [1999.99, 0.10 / 100], [2999.99, 0.9 / 100], [4999.99, 0.8 / 100], [9999.99, 0.7 / 100], [19999.99, 0.6 / 100], [29999.99, 0.5 / 100], [49999.99, 0.4 / 100], [99999.99, 0.3 / 100], [199999.99, 0.2 / 100], [299999.99, 0.1 / 100], [499999.99, 0.0 / 100]]
            }
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.0008,
              'LTC': 0.005,
              'BCH': 0.0008,
              'BTG': 0.0008,
              'DOGE': 1,
              'EUR': 2,
              'PLN': 2
            },
            'deposit': {
              'BTC': 0,
              'LTC': 0,
              'BCH': 0,
              'BTG': 0,
              'DOGE': 25,
              'EUR': 2,
              // SEPA. Transfer INT (SHA): 5 EUR
              'PLN': 0
            }
          }
        }
      });
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            data,
            balance,
            result,
            currencies,
            i,
            currency,
            account,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.loadMarkets();

              case 3:
                _context.next = 5;
                return this.privatePostInfo();

              case 5:
                response = _context.sent;
                data = response['data'];
                balance = data['balances'];
                result = {
                  'info': data
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();
                  if (currency in balance['available']) account['free'] = balance['available'][currency];
                  if (currency in balance['blocked']) account['used'] = balance['blocked'][currency];
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            orderbook,
            timestamp,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetJsonMarketOrderbook(this.extend({
                  'market': this.marketId(symbol)
                }, params));

              case 3:
                orderbook = _context2.sent;
                timestamp = this.milliseconds();
                return _context2.abrupt("return", {
                  'bids': orderbook['bids'],
                  'asks': orderbook['asks'],
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp)
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            ticker,
            timestamp,
            vwap,
            baseVolume,
            quoteVolume,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetJsonMarketTicker(this.extend({
                  'market': this.marketId(symbol)
                }, params));

              case 3:
                ticker = _context3.sent;
                timestamp = this.milliseconds();
                vwap = parseFloat(ticker['vwap']);
                baseVolume = parseFloat(ticker['volume']);
                quoteVolume = baseVolume * vwap;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(ticker['bid']),
                  'ask': parseFloat(ticker['ask']),
                  'vwap': vwap,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': baseVolume,
                  'quoteVolume': quoteVolume,
                  'info': ticker
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = trade['type'] == 'bid' ? 'buy' : 'sell';
      var timestamp = trade['date'] * 1000;
      return {
        'id': trade['tid'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                since = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : undefined;
                params = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetJsonMarketTrades(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response, market, since, limit));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '90m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return [ohlcv['time'] * 1000, parseFloat(ohlcv['open']), parseFloat(ohlcv['high']), parseFloat(ohlcv['low']), parseFloat(ohlcv['close']), parseFloat(ohlcv['vol'])];
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var timeframe,
            since,
            limit,
            params,
            method,
            market,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                timeframe = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '90m';
                since = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                limit = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : undefined;
                params = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                _context5.next = 6;
                return this.loadMarkets();

              case 6:
                method = 'publicGetGraphsMarket' + this.timeframes[timeframe];
                market = this.market(symbol);
                _context5.next = 10;
                return this[method](this.extend({
                  'market': market['id']
                }, params));

              case 10:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOHLCV(_x4) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            response,
            result,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                price = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                params = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};
                _context6.next = 4;
                return this.privatePostTrade(this.extend({
                  'market': this.marketId(symbol),
                  'type': side,
                  'amount': amount,
                  'rate': price
                }, params));

              case 4:
                response = _context6.sent;
                result = {
                  'info': response
                };
                if ('id' in response['order']) result['id'] = response['id'];
                return _context6.abrupt("return", result);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(id) {
        var symbol,
            params,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
                _context7.next = 4;
                return this.privatePostCancel({
                  'id': id
                });

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "isFiat",
    value: function isFiat(currency) {
      if (currency == 'EUR') return true;
      if (currency == 'PLN') return true;
      return false;
    }
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(currency, amount, address) {
        var params,
            method,
            request,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                method = undefined;
                request = {
                  'currency': currency,
                  'quantity': amount
                };

                if (!this.isFiat(currency)) {
                  _context8.next = 26;
                  break;
                }

                method = 'privatePostWithdrawFiat';

                if (!('account' in params)) {
                  _context8.next = 11;
                  break;
                }

                request['account'] = params['account']; // bank account code for withdrawal

                _context8.next = 12;
                break;

              case 11:
                throw new ExchangeError(this.id + ' requires account parameter to withdraw fiat currency');

              case 12:
                if (!('account2' in params)) {
                  _context8.next = 16;
                  break;
                }

                request['account2'] = params['account2']; // bank SWIFT code (EUR only)

                _context8.next = 18;
                break;

              case 16:
                if (!(currency == 'EUR')) {
                  _context8.next = 18;
                  break;
                }

                throw new ExchangeError(this.id + ' requires account2 parameter to withdraw EUR');

              case 18:
                if (!('withdrawal_note' in params)) {
                  _context8.next = 22;
                  break;
                }

                request['withdrawal_note'] = params['withdrawal_note']; // a 10-character user-specified withdrawal note (PLN only)

                _context8.next = 24;
                break;

              case 22:
                if (!(currency == 'PLN')) {
                  _context8.next = 24;
                  break;
                }

                throw new ExchangeError(this.id + ' requires withdrawal_note parameter to withdraw PLN');

              case 24:
                _context8.next = 28;
                break;

              case 26:
                method = 'privatePostWithdraw';
                request['address'] = address;

              case 28:
                _context8.next = 30;
                return this[method](this.extend(request, params));

              case 30:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response
                });

              case 32:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      var url = this.urls['api'][api];

      if (api == 'public') {
        url += '/' + this.implodeParams(path + '.json', params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var query = this.extend({
          'tonce': nonce,
          'method': path
        }, params);
        body = this.urlencode(query);
        headers = {
          'API-Key': this.apiKey,
          'API-Hash': this.hmac(this.encode(body), this.encode(this.secret), 'sha512')
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

  return bitmarket;
}(Exchange);