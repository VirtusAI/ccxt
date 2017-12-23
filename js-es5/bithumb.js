"use strict"; //  ---------------------------------------------------------------------------

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
    ExchangeError = _require.ExchangeError,
    NotSupported = _require.NotSupported; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bithumb, _Exchange);

  function bithumb() {
    _classCallCheck(this, bithumb);

    return _possibleConstructorReturn(this, (bithumb.__proto__ || _Object$getPrototypeOf(bithumb)).apply(this, arguments));
  }

  _createClass(bithumb, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bithumb.prototype.__proto__ || _Object$getPrototypeOf(bithumb.prototype), "describe", this).call(this), {
        'id': 'bithumb',
        'name': 'Bithumb',
        'countries': 'KR',
        // South Korea
        'rateLimit': 500,
        'hasCORS': true,
        'hasFetchTickers': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30597177-ea800172-9d5e-11e7-804c-b9d4fa9b56b0.jpg',
          'api': {
            'public': 'https://api.bithumb.com/public',
            'private': 'https://api.bithumb.com'
          },
          'www': 'https://www.bithumb.com',
          'doc': 'https://www.bithumb.com/u1/US127'
        },
        'api': {
          'public': {
            'get': ['ticker/{currency}', 'ticker/all', 'orderbook/{currency}', 'orderbook/all', 'recent_transactions/{currency}', 'recent_transactions/all']
          },
          'private': {
            'post': ['info/account', 'info/balance', 'info/wallet_address', 'info/ticker', 'info/orders', 'info/user_transactions', 'trade/place', 'info/order_detail', 'trade/cancel', 'trade/btc_withdrawal', 'trade/krw_deposit', 'trade/krw_withdrawal', 'trade/market_buy', 'trade/market_sell']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.15 / 100,
            'taker': 0.15 / 100
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
        var markets, currencies, result, i, id, market, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetTickerAll();

              case 2:
                markets = _context.sent;
                currencies = _Object$keys(markets['data']);
                result = [];

                for (i = 0; i < currencies.length; i++) {
                  id = currencies[i];

                  if (id != 'date') {
                    market = markets['data'][id];
                    base = id;
                    quote = 'KRW';
                    symbol = id + '/' + quote;
                    result.push(this.extend(this.fees['trading'], {
                      'id': id,
                      'symbol': symbol,
                      'base': base,
                      'quote': quote,
                      'info': market,
                      'lot': undefined,
                      'active': true,
                      'precision': {
                        'amount': undefined,
                        'price': undefined
                      },
                      'limits': {
                        'amount': {
                          'min': undefined,
                          'max': undefined
                        },
                        'price': {
                          'min': undefined,
                          'max': undefined
                        },
                        'cost': {
                          'min': undefined,
                          'max': undefined
                        }
                      }
                    }));
                  }
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            response,
            result,
            balances,
            currencies,
            i,
            currency,
            account,
            lowercase,
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
                return this.privatePostInfoBalance(this.extend({
                  'currency': 'ALL'
                }, params));

              case 5:
                response = _context2.sent;
                result = {
                  'info': response
                };
                balances = response['data'];
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();
                  lowercase = currency.toLowerCase();
                  account['total'] = this.safeFloat(balances, 'total_' + lowercase);
                  account['used'] = this.safeFloat(balances, 'in_use_' + lowercase);
                  account['free'] = this.safeFloat(balances, 'available_' + lowercase);
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 11:
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
            response,
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
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetOrderbookCurrency(this.extend({
                  'count': 50,
                  // max = 50
                  'currency': market['base']
                }, params));

              case 6:
                response = _context3.sent;
                orderbook = response['data'];
                timestamp = parseInt(orderbook['timestamp']);
                return _context3.abrupt("return", this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'quantity'));

              case 10:
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
      var timestamp = parseInt(ticker['date']);
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'max_price'),
        'low': this.safeFloat(ticker, 'min_price'),
        'bid': this.safeFloat(ticker, 'buy_price'),
        'ask': this.safeFloat(ticker, 'sell_price'),
        'vwap': undefined,
        'open': this.safeFloat(ticker, 'opening_price'),
        'close': this.safeFloat(ticker, 'closing_price'),
        'first': undefined,
        'last': this.safeFloat(ticker, 'last_trade'),
        'change': undefined,
        'percentage': undefined,
        'average': this.safeFloat(ticker, 'average_price'),
        'baseVolume': this.safeFloat(ticker, 'volume_1day'),
        'quoteVolume': undefined,
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
            response,
            result,
            timestamp,
            tickers,
            ids,
            i,
            id,
            symbol,
            market,
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
                return this.publicGetTickerAll(params);

              case 6:
                response = _context4.sent;
                result = {};
                timestamp = response['data']['date'];
                tickers = this.omit(response['data'], 'date');
                ids = _Object$keys(tickers);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  symbol = id;
                  market = undefined;

                  if (id in this.markets_by_id) {
                    market = this.markets_by_id[id];
                    symbol = market['symbol'];
                  }

                  ticker = tickers[id];
                  ticker['date'] = timestamp;
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 13:
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
            response,
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
                return this.publicGetTickerCurrency(this.extend({
                  'currency': market['base']
                }, params));

              case 6:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTicker(response['data'], market));

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
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      // a workaround for their bug in date format, hours are not 0-padded
      var _trade$transaction_da = trade['transaction_date'].split(' '),
          _trade$transaction_da2 = _slicedToArray(_trade$transaction_da, 2),
          transaction_date = _trade$transaction_da2[0],
          transaction_time = _trade$transaction_da2[1];

      var transaction_time_short = transaction_time.length < 8;
      if (transaction_time_short) transaction_time = '0' + transaction_time;
      var timestamp = this.parse8601(transaction_date + ' ' + transaction_time);
      var side = trade['type'] == 'ask' ? 'sell' : 'buy';
      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': undefined,
        'type': undefined,
        'side': side,
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['units_traded'])
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
                return this.publicGetRecentTransactionsCurrency(this.extend({
                  'currency': market['base'],
                  'count': 100 // max = 100

                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['data'], market, since, limit));

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
    value: function createOrder(symbol, type, side, amount) {
      var price = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      throw new NotSupported(this.id + ' private API not implemented yet'); //     let prefix = '';
      //     if (type == 'market')
      //         prefix = 'market_';
      //     let order = {
      //         'pair': this.marketId (symbol),
      //         'quantity': amount,
      //         'price': price || 0,
      //         'type': prefix + side,
      //     };
      //     let response = await this.privatePostOrderCreate (this.extend (order, params));
      //     return {
      //         'info': response,
      //         'id': response['order_id'].toString (),
      //     };
    }
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(id) {
        var symbol,
            params,
            side,
            currency,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
                side = 'side' in params;

                if (side) {
                  _context7.next = 5;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a side parameter (sell or buy)');

              case 5:
                side = side == 'buy' ? 'purchase' : 'sales';
                currency = 'currency' in params;

                if (currency) {
                  _context7.next = 9;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a currency parameter');

              case 9:
                _context7.next = 11;
                return this.privatePostTradeCancel({
                  'order_id': id,
                  'type': params['side'],
                  'currency': params['currency']
                });

              case 11:
                return _context7.abrupt("return", _context7.sent);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function cancelOrder(_x4) {
        return _cancelOrder.apply(this, arguments);
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
      var endpoint = '/' + this.implodeParams(path, params);
      var url = this.urls['api'][api] + endpoint;
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        body = this.urlencode(this.extend({
          'endpoint': endpoint
        }, query));
        var nonce = this.nonce().toString();
        var auth = endpoint + "\0" + body + "\0" + nonce;
        var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha512');
        headers = {
          'Api-Key': this.apiKey,
          'Api-Sign': this.decode(this.stringToBase64(this.encode(signature))),
          'Api-Nonce': nonce
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
      _regeneratorRuntime.mark(function _callee8(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                api = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 'public';
                method = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 'GET';
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                headers = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                body = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : undefined;
                _context8.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context8.sent;

                if (!('status' in response)) {
                  _context8.next = 12;
                  break;
                }

                if (!(response['status'] == '0000')) {
                  _context8.next = 11;
                  break;
                }

                return _context8.abrupt("return", response);

              case 11:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
                return _context8.abrupt("return", response);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x5) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bithumb;
}(Exchange);