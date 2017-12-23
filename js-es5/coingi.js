"use strict"; //  ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

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
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(coingi, _Exchange);

  function coingi() {
    _classCallCheck(this, coingi);

    return _possibleConstructorReturn(this, (coingi.__proto__ || _Object$getPrototypeOf(coingi)).apply(this, arguments));
  }

  _createClass(coingi, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coingi.prototype.__proto__ || _Object$getPrototypeOf(coingi.prototype), "describe", this).call(this), {
        'id': 'coingi',
        'name': 'Coingi',
        'rateLimit': 1000,
        'countries': ['PA', 'BG', 'CN', 'US'],
        // Panama, Bulgaria, China, US
        'hasFetchTickers': true,
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28619707-5c9232a8-7212-11e7-86d6-98fe5d15cc6e.jpg',
          'api': {
            'www': 'https://coingi.com',
            'current': 'https://api.coingi.com',
            'user': 'https://api.coingi.com'
          },
          'www': 'https://coingi.com',
          'doc': 'http://docs.coingi.apiary.io/'
        },
        'api': {
          'www': {
            'get': ['']
          },
          'current': {
            'get': ['order-book/{pair}/{askCount}/{bidCount}/{depth}', 'transactions/{pair}/{maxCount}', '24hour-rolling-aggregation']
          },
          'user': {
            'post': ['balance', 'add-order', 'cancel-order', 'orders', 'transactions', 'create-crypto-withdrawal']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'taker': 0.2 / 100,
            'maker': 0.2 / 100
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.001,
              'LTC': 0.01,
              'DOGE': 2,
              'PPC': 0.02,
              'VTC': 0.2,
              'NMC': 2,
              'DASH': 0.002,
              'USD': 10,
              'EUR': 10
            },
            'deposit': {
              'BTC': 0,
              'LTC': 0,
              'DOGE': 0,
              'PPC': 0,
              'VTC': 0,
              'NMC': 0,
              'DASH': 0,
              'USD': 5,
              'EUR': 1
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
        var response, parts, currencyParts, result, i, currencyPart, idParts, id, symbol, _symbol$split, _symbol$split2, base, quote, precision, lot;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.parseJsonResponse = false;
                _context.next = 3;
                return this.wwwGet();

              case 3:
                response = _context.sent;
                this.parseJsonResponse = true;
                parts = response.split('do=currencyPairSelector-selectCurrencyPair" class="active">');
                currencyParts = parts[1].split('<div class="currency-pair-label">');
                result = [];

                for (i = 1; i < currencyParts.length; i++) {
                  currencyPart = currencyParts[i];
                  idParts = currencyPart.split('</div>');
                  id = idParts[0];
                  symbol = id;
                  id = id.replace('/', '-');
                  id = id.toLowerCase();
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  lot = Math.pow(10, -precision['amount']);
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': id,
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

                return _context.abrupt("return", result);

              case 10:
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
            lowercaseCurrencies,
            currencies,
            i,
            currency,
            balances,
            result,
            b,
            balance,
            _currency,
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
                lowercaseCurrencies = [];
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercaseCurrencies.push(currency.toLowerCase());
                }

                _context2.next = 8;
                return this.userPostBalance({
                  'currencies': lowercaseCurrencies.join(',')
                });

              case 8:
                balances = _context2.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  _currency = balance['currency']['name'];
                  _currency = _currency.toUpperCase();
                  account = {
                    'free': balance['available'],
                    'used': balance['blocked'] + balance['inOrders'] + balance['withdrawing'],
                    'total': 0.0
                  };
                  account['total'] = this.sum(account['free'], account['used']);
                  result[_currency] = account;
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
                return this.currentGetOrderBookPairAskCountBidCountDepth(this.extend({
                  'pair': market['id'],
                  'askCount': 512,
                  // maximum returned number of asks 1-512
                  'bidCount': 512,
                  // maximum returned number of bids 1-512
                  'depth': 32 // maximum number of depth range steps 1-32

                }, params));

              case 6:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'baseAmount'));

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
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': ticker['high'],
        'low': ticker['low'],
        'bid': ticker['highestBid'],
        'ask': ticker['lowestAsk'],
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': undefined,
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': ticker['baseVolume'],
        'quoteVolume': ticker['counterVolume'],
        'info': ticker
      };
      return ticker;
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            response,
            result,
            t,
            ticker,
            base,
            quote,
            symbol,
            market,
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
                return this.currentGet24hourRollingAggregation(params);

              case 6:
                response = _context4.sent;
                result = {};

                for (t = 0; t < response.length; t++) {
                  ticker = response[t];
                  base = ticker['currencyPair']['base'].toUpperCase();
                  quote = ticker['currencyPair']['counter'].toUpperCase();
                  symbol = base + '/' + quote;
                  market = undefined;

                  if (symbol in this.markets) {
                    market = this.markets[symbol];
                  }

                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 10:
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
            tickers,
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
                return this.fetchTickers(undefined, params);

              case 5:
                tickers = _context5.sent;

                if (!(symbol in tickers)) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", tickers[symbol]);

              case 8:
                throw new ExchangeError(this.id + ' return did not contain ' + symbol);

              case 9:
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
      if (!market) market = this.markets_by_id[trade['currencyPair']];
      return {
        'id': trade['id'],
        'info': trade,
        'timestamp': trade['timestamp'],
        'datetime': this.iso8601(trade['timestamp']),
        'symbol': market['symbol'],
        'type': undefined,
        'side': undefined,
        // type
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
                return this.currentGetTransactionsPairMaxCount(this.extend({
                  'pair': market['id'],
                  'maxCount': 128
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
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
                order = {
                  'currencyPair': this.marketId(symbol),
                  'volume': amount,
                  'price': price,
                  'orderType': side == 'buy' ? 0 : 1
                };
                _context7.next = 7;
                return this.userPostAddOrder(this.extend(order, params));

              case 7:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['result']
                });

              case 9:
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
                return this.userPostCancelOrder({
                  'orderId': id
                });

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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'current';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'][api];

      if (api != 'www') {
        url += '/' + api + '/' + this.implodeParams(path, params);
      }

      var query = this.omit(params, this.extractParams(path));

      if (api == 'current') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else if (api == 'user') {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var request = this.extend({
          'token': this.apiKey,
          'nonce': nonce
        }, query);
        var auth = nonce.toString() + '$' + this.apiKey;
        request['signature'] = this.hmac(this.encode(auth), this.encode(this.secret));
        body = this.json(request);
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
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                api = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'current';
                method = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'GET';
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                headers = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                body = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : undefined;
                _context9.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context9.sent;

                if (!(typeof response != 'string')) {
                  _context9.next = 11;
                  break;
                }

                if (!('errors' in response)) {
                  _context9.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context9.abrupt("return", response);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return coingi;
}(Exchange);