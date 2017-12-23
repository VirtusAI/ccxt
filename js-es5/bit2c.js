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

var Exchange = require('./base/Exchange'); //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(bit2c, _Exchange);

  function bit2c() {
    _classCallCheck(this, bit2c);

    return _possibleConstructorReturn(this, (bit2c.__proto__ || _Object$getPrototypeOf(bit2c)).apply(this, arguments));
  }

  _createClass(bit2c, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bit2c.prototype.__proto__ || _Object$getPrototypeOf(bit2c.prototype), "describe", this).call(this), {
        'id': 'bit2c',
        'name': 'Bit2C',
        'countries': 'IL',
        // Israel
        'rateLimit': 3000,
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766119-3593220e-5ece-11e7-8b3a-5a041f6bcc3f.jpg',
          'api': 'https://www.bit2c.co.il',
          'www': 'https://www.bit2c.co.il',
          'doc': ['https://www.bit2c.co.il/home/api', 'https://github.com/OferE/bit2c']
        },
        'api': {
          'public': {
            'get': ['Exchanges/{pair}/Ticker', 'Exchanges/{pair}/orderbook', 'Exchanges/{pair}/trades']
          },
          'private': {
            'post': ['Account/Balance', 'Account/Balance/v2', 'Merchant/CreateCheckout', 'Order/AccountHistory', 'Order/AddCoinFundsRequest', 'Order/AddFund', 'Order/AddOrder', 'Order/AddOrderMarketPriceBuy', 'Order/AddOrderMarketPriceSell', 'Order/CancelOrder', 'Order/MyOrders', 'Payment/GetMyId', 'Payment/Send']
          }
        },
        'markets': {
          'BTC/NIS': {
            'id': 'BtcNis',
            'symbol': 'BTC/NIS',
            'base': 'BTC',
            'quote': 'NIS'
          },
          'BCH/NIS': {
            'id': 'BchNis',
            'symbol': 'BCH/NIS',
            'base': 'BCH',
            'quote': 'NIS'
          },
          'LTC/NIS': {
            'id': 'LtcNis',
            'symbol': 'LTC/NIS',
            'base': 'LTC',
            'quote': 'NIS'
          },
          'BTG/NIS': {
            'id': 'BtgNis',
            'symbol': 'BTG/NIS',
            'base': 'BTG',
            'quote': 'NIS'
          }
        },
        'fees': {
          'trading': {
            'maker': 0.5 / 100,
            'taker': 0.5 / 100
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
            balance,
            result,
            currencies,
            i,
            currency,
            account,
            available,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostAccountBalanceV2();

              case 3:
                balance = _context.sent;
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  account = this.account();

                  if (currency in balance) {
                    available = 'AVAILABLE_' + currency;
                    account['free'] = balance[available];
                    account['total'] = balance[currency];
                    account['used'] = account['total'] - account['free'];
                  }

                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 8:
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
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetExchangesPairOrderbook(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 3:
                orderbook = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(orderbook));

              case 5:
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
            averagePrice,
            baseVolume,
            quoteVolume,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetExchangesPairTicker(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 3:
                ticker = _context3.sent;
                timestamp = this.milliseconds();
                averagePrice = parseFloat(ticker['av']);
                baseVolume = parseFloat(ticker['a']);
                quoteVolume = baseVolume * averagePrice;
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': undefined,
                  'low': undefined,
                  'bid': parseFloat(ticker['h']),
                  'ask': parseFloat(ticker['l']),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['ll']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': averagePrice,
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
      var timestamp = parseInt(trade['date']) * 1000;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'id': trade['tid'].toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'order': undefined,
        'type': undefined,
        'side': undefined,
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
                return this.publicGetExchangesPairTrades(this.extend({
                  'pair': market['id']
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            method,
            order,
            result,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                method = 'privatePostOrderAddOrder';
                order = {
                  'Amount': amount,
                  'Pair': this.marketId(symbol)
                };

                if (type == 'market') {
                  method += 'MarketPrice' + this.capitalize(side);
                } else {
                  order['Price'] = price;
                  order['Total'] = amount * price;
                  order['IsBid'] = side == 'buy';
                }

                _context5.next = 7;
                return this[method](this.extend(order, params));

              case 7:
                result = _context5.sent;
                return _context5.abrupt("return", {
                  'info': result,
                  'id': result['NewOrder']['id']
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
                return this.privatePostOrderCancelOrder({
                  'id': id
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
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);

      if (api == 'public') {
        url += '.json';
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var query = this.extend({
          'nonce': nonce
        }, params);
        body = this.urlencode(query);
        var signature = this.hmac(this.encode(body), this.encode(this.secret), 'sha512', 'base64');
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'key': this.apiKey,
          'sign': this.decode(signature)
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

  return bit2c;
}(Exchange);