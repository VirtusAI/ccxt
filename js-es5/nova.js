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
  _inherits(nova, _Exchange);

  function nova() {
    _classCallCheck(this, nova);

    return _possibleConstructorReturn(this, (nova.__proto__ || _Object$getPrototypeOf(nova)).apply(this, arguments));
  }

  _createClass(nova, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(nova.prototype.__proto__ || _Object$getPrototypeOf(nova.prototype), "describe", this).call(this), {
        'id': 'nova',
        'name': 'Novaexchange',
        'countries': 'TZ',
        // Tanzania
        'rateLimit': 2000,
        'version': 'v2',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30518571-78ca0bca-9b8a-11e7-8840-64b83a4a94b2.jpg',
          'api': 'https://novaexchange.com/remote',
          'www': 'https://novaexchange.com',
          'doc': 'https://novaexchange.com/remote/faq'
        },
        'api': {
          'public': {
            'get': ['markets/', 'markets/{basecurrency}/', 'market/info/{pair}/', 'market/orderhistory/{pair}/', 'market/openorders/{pair}/buy/', 'market/openorders/{pair}/sell/', 'market/openorders/{pair}/both/', 'market/openorders/{pair}/{ordertype}/']
          },
          'private': {
            'post': ['getbalances/', 'getbalance/{currency}/', 'getdeposits/', 'getwithdrawals/', 'getnewdepositaddress/{currency}/', 'getdepositaddress/{currency}/', 'myopenorders/', 'myopenorders_market/{pair}/', 'cancelorder/{orderid}/', 'withdraw/{currency}/', 'trade/{pair}/', 'tradehistory/', 'getdeposithistory/', 'getwithdrawalhistory/', 'walletstatus/', 'walletstatus/{currency}/']
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
        var response, markets, result, i, market, id, _id$split, _id$split2, quote, base, symbol;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarkets();

              case 2:
                response = _context.sent;
                markets = response['markets'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];

                  if (!market['disabled']) {
                    id = market['marketname'];
                    _id$split = id.split('_'), _id$split2 = _slicedToArray(_id$split, 2), quote = _id$split2[0], base = _id$split2[1];
                    symbol = base + '/' + quote;
                    result.push({
                      'id': id,
                      'symbol': symbol,
                      'base': base,
                      'quote': quote,
                      'info': market
                    });
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.loadMarkets();

              case 3:
                _context2.next = 5;
                return this.publicGetMarketOpenordersPairBoth(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buyorders', 'sellorders', 'price', 'amount'));

              case 7:
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
            response,
            ticker,
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
                return this.publicGetMarketInfoPair(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                response = _context3.sent;
                ticker = response['markets'][0];
                timestamp = this.milliseconds();
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high24h']),
                  'low': parseFloat(ticker['low24h']),
                  'bid': this.safeFloat(ticker, 'bid'),
                  'ask': this.safeFloat(ticker, 'ask'),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last_price']),
                  'change': parseFloat(ticker['change24h']),
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': undefined,
                  'quoteVolume': parseFloat(ticker['volume24h']),
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
    value: function parseTrade(trade, market) {
      var timestamp = trade['unix_t_datestamp'] * 1000;
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': undefined,
        'order': undefined,
        'type': undefined,
        'side': trade['tradetype'].toLowerCase(),
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['amount'])
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
                _context4.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context4.next = 8;
                return this.publicGetMarketOrderhistoryPair(this.extend({
                  'pair': market['id']
                }, params));

              case 8:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response['items'], market, since, limit));

              case 10:
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
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5() {
        var params,
            response,
            balances,
            result,
            b,
            balance,
            currency,
            lockbox,
            trades,
            account,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.privatePostGetbalances();

              case 5:
                response = _context5.sent;
                balances = response['balances'];
                result = {
                  'info': response
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  lockbox = parseFloat(balance['amount_lockbox']);
                  trades = parseFloat(balance['amount_trades']);
                  account = {
                    'free': parseFloat(balance['amount']),
                    'used': this.sum(lockbox, trades),
                    'total': parseFloat(balance['amount_total'])
                  };
                  result[currency] = account;
                }

                return _context5.abrupt("return", this.parseBalance(result));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            market,
            order,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                price = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                params = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};

                if (!(type == 'market')) {
                  _context6.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                _context6.next = 6;
                return this.loadMarkets();

              case 6:
                amount = amount.toString();
                price = price.toString();
                market = this.market(symbol);
                order = {
                  'tradetype': side.toUpperCase(),
                  'tradeamount': amount,
                  'tradeprice': price,
                  'tradebase': 1,
                  'pair': market['id']
                };
                _context6.next = 12;
                return this.privatePostTradePair(this.extend(order, params));

              case 12:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
                return this.privatePostCancelorder(this.extend({
                  'orderid': id
                }, params));

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
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
      var url = this.urls['api'] + '/' + this.version + '/';
      if (api == 'private') url += api + '/';
      url += this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        url += '?' + this.urlencode({
          'nonce': nonce
        });
        var signature = this.hmac(this.encode(url), this.encode(this.secret), 'sha512', 'base64');
        body = this.urlencode(this.extend({
          'apikey': this.apiKey,
          'signature': signature
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
                  _context8.next = 11;
                  break;
                }

                if (!(response['status'] != 'success')) {
                  _context8.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context8.abrupt("return", response);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return nova;
}(Exchange);