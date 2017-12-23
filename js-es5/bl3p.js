"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var Exchange = require('./base/Exchange'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bl3p, _Exchange);

  function bl3p() {
    _classCallCheck(this, bl3p);

    return _possibleConstructorReturn(this, (bl3p.__proto__ || _Object$getPrototypeOf(bl3p)).apply(this, arguments));
  }

  _createClass(bl3p, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bl3p.prototype.__proto__ || _Object$getPrototypeOf(bl3p.prototype), "describe", this).call(this), {
        'id': 'bl3p',
        'name': 'BL3P',
        'countries': ['NL', 'EU'],
        // Netherlands, EU
        'rateLimit': 1000,
        'version': '1',
        'comment': 'An exchange market by BitonicNL',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28501752-60c21b82-6feb-11e7-818b-055ee6d0e754.jpg',
          'api': 'https://api.bl3p.eu',
          'www': ['https://bl3p.eu', 'https://bitonic.nl'],
          'doc': ['https://github.com/BitonicNL/bl3p-api/tree/master/docs', 'https://bl3p.eu/api', 'https://bitonic.nl/en/api']
        },
        'api': {
          'public': {
            'get': ['{market}/ticker', '{market}/orderbook', '{market}/trades']
          },
          'private': {
            'post': ['{market}/money/depth/full', '{market}/money/order/add', '{market}/money/order/cancel', '{market}/money/order/result', '{market}/money/orders', '{market}/money/orders/history', '{market}/money/trades/fetch', 'GENMKT/money/info', 'GENMKT/money/deposit_address', 'GENMKT/money/new_deposit_address', 'GENMKT/money/wallet/history', 'GENMKT/money/withdraw']
          }
        },
        'markets': {
          'BTC/EUR': {
            'id': 'BTCEUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR',
            'maker': 0.0025,
            'taker': 0.0025
          } // 'LTC/EUR': { 'id': 'LTCEUR', 'symbol': 'LTC/EUR', 'base': 'LTC', 'quote': 'EUR' },

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
                return this.privatePostGENMKTMoneyInfo();

              case 3:
                response = _context.sent;
                data = response['data'];
                balance = data['wallets'];
                result = {
                  'info': data
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();

                  if (currency in balance) {
                    if ('available' in balance[currency]) {
                      account['free'] = parseFloat(balance[currency]['available']['value']);
                    }
                  }

                  if (currency in balance) {
                    if ('balance' in balance[currency]) {
                      account['total'] = parseFloat(balance[currency]['balance']['value']);
                    }
                  }

                  if (account['total']) {
                    if (account['free']) {
                      account['used'] = account['total'] - account['free'];
                    }
                  }

                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 10:
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
    key: "parseBidAsk",
    value: function parseBidAsk(bidask) {
      var priceKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var amountKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return [bidask['price_int'] / 100000.0, bidask['amount_int'] / 100000000.0];
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
            response,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                _context2.next = 4;
                return this.publicGetMarketOrderbook(this.extend({
                  'market': market['id']
                }, params));

              case 4:
                response = _context2.sent;
                orderbook = response['data'];
                return _context2.abrupt("return", this.parseOrderBook(orderbook));

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
            ticker,
            timestamp,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetMarketTicker(this.extend({
                  'market': this.marketId(symbol)
                }, params));

              case 3:
                ticker = _context3.sent;
                timestamp = ticker['timestamp'] * 1000;
                return _context3.abrupt("return", {
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
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker['volume']['24h']),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 6:
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
      return {
        'id': trade['trade_id'],
        'info': trade,
        'timestamp': trade['date'],
        'datetime': this.iso8601(trade['date']),
        'symbol': market['symbol'],
        'type': undefined,
        'side': undefined,
        'price': trade['price_int'] / 100000.0,
        'amount': trade['amount_int'] / 100000000.0
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
            result,
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
                return this.publicGetMarketTrades(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                response = _context4.sent;
                result = this.parseTrades(response['data']['trades'], market, since, limit);
                return _context4.abrupt("return", result);

              case 9:
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            market,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                market = this.market(symbol);
                order = {
                  'market': market['id'],
                  'amount_int': amount,
                  'fee_currency': market['quote'],
                  'type': side == 'buy' ? 'bid' : 'ask'
                };
                if (type == 'limit') order['price_int'] = price;
                _context5.next = 7;
                return this.privatePostMarketMoneyOrderAdd(this.extend(order, params));

              case 7:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['order_id'].toString()
                });

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(id) {
        var symbol,
            params,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                _context6.next = 4;
                return this.privatePostMarketMoneyOrderCancel({
                  'order_id': id
                });

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      var request = this.implodeParams(path, params);
      var url = this.urls['api'] + '/' + this.version + '/' + request;
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'nonce': nonce
        }, query));
        var secret = this.base64ToBinary(this.secret);
        var auth = request + "\0" + body;
        var signature = this.hmac(this.encode(auth), secret, 'sha512', 'base64');
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Rest-Key': this.apiKey,
          'Rest-Sign': signature
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

  return bl3p;
}(Exchange);