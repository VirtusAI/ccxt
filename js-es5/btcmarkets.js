"use strict"; //  ---------------------------------------------------------------------------

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
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(btcmarkets, _Exchange);

  function btcmarkets() {
    _classCallCheck(this, btcmarkets);

    return _possibleConstructorReturn(this, (btcmarkets.__proto__ || _Object$getPrototypeOf(btcmarkets)).apply(this, arguments));
  }

  _createClass(btcmarkets, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(btcmarkets.prototype.__proto__ || _Object$getPrototypeOf(btcmarkets.prototype), "describe", this).call(this), {
        'id': 'btcmarkets',
        'name': 'BTC Markets',
        'countries': 'AU',
        // Australia
        'rateLimit': 1000,
        // market data cached for 1 second (trades cached for 2 seconds)
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/29142911-0e1acfc2-7d5c-11e7-98c4-07d9532b29d7.jpg',
          'api': 'https://api.btcmarkets.net',
          'www': 'https://btcmarkets.net/',
          'doc': 'https://github.com/BTCMarkets/API'
        },
        'api': {
          'public': {
            'get': ['market/{id}/tick', 'market/{id}/orderbook', 'market/{id}/trades']
          },
          'private': {
            'get': ['account/balance', 'account/{id}/tradingfee'],
            'post': ['fundtransfer/withdrawCrypto', 'fundtransfer/withdrawEFT', 'order/create', 'order/cancel', 'order/history', 'order/open', 'order/trade/history', 'order/createBatch', // they promise it's coming soon...
            'order/detail']
          }
        },
        'markets': {
          'BTC/AUD': {
            'id': 'BTC/AUD',
            'symbol': 'BTC/AUD',
            'base': 'BTC',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'LTC/AUD': {
            'id': 'LTC/AUD',
            'symbol': 'LTC/AUD',
            'base': 'LTC',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'ETH/AUD': {
            'id': 'ETH/AUD',
            'symbol': 'ETH/AUD',
            'base': 'ETH',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'ETC/AUD': {
            'id': 'ETC/AUD',
            'symbol': 'ETC/AUD',
            'base': 'ETC',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'XRP/AUD': {
            'id': 'XRP/AUD',
            'symbol': 'XRP/AUD',
            'base': 'XRP',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'BCH/AUD': {
            'id': 'BCH/AUD',
            'symbol': 'BCH/AUD',
            'base': 'BCH',
            'quote': 'AUD',
            'maker': 0.0085,
            'taker': 0.0085
          },
          'LTC/BTC': {
            'id': 'LTC/BTC',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'ETH/BTC': {
            'id': 'ETH/BTC',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'ETC/BTC': {
            'id': 'ETC/BTC',
            'symbol': 'ETC/BTC',
            'base': 'ETC',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'XRP/BTC': {
            'id': 'XRP/BTC',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
          },
          'BCH/BTC': {
            'id': 'BCH/BTC',
            'symbol': 'BCH/BTC',
            'base': 'BCH',
            'quote': 'BTC',
            'maker': 0.0022,
            'taker': 0.0022
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
            balances,
            result,
            b,
            balance,
            currency,
            multiplier,
            total,
            used,
            free,
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
                return this.privateGetAccountBalance();

              case 5:
                balances = _context.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  multiplier = 100000000;
                  total = parseFloat(balance['balance'] / multiplier);
                  used = parseFloat(balance['pendingFunds'] / multiplier);
                  free = total - used;
                  account = {
                    'free': free,
                    'used': used,
                    'total': total
                  };
                  result[currency] = account;
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 9:
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
            market,
            orderbook,
            timestamp,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context2.next = 6;
                return this.publicGetMarketIdOrderbook(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                orderbook = _context2.sent;
                timestamp = orderbook['timestamp'] * 1000;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, timestamp));

              case 9:
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['timestamp'] * 1000;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': undefined,
        'low': undefined,
        'bid': parseFloat(ticker['bestBid']),
        'ask': parseFloat(ticker['bestAsk']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['lastPrice']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['volume24h']),
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
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
                return this.publicGetMarketIdTick(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                ticker = _context3.sent;
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 8:
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
      var timestamp = trade['date'] * 1000;
      return {
        'info': trade,
        'id': trade['tid'].toString(),
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
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
                _context4.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context4.next = 8;
                return this.publicGetMarketIdTrades(this.extend({
                  // 'since': 59868345231,
                  'id': market['id']
                }, params));

              case 8:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTrades(response, market, since, limit));

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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            market,
            multiplier,
            orderSide,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                _context5.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                multiplier = 100000000; // for price and volume
                // does BTC Markets support market orders at all?

                orderSide = side == 'buy' ? 'Bid' : 'Ask';
                order = this.ordered({
                  'currency': market['quote'],
                  'instrument': market['base'],
                  'price': price * multiplier,
                  'volume': amount * multiplier,
                  'orderSide': orderSide,
                  'ordertype': this.capitalize(type),
                  'clientRequestId': this.nonce().toString()
                });
                _context5.next = 10;
                return this.privatePostOrderCreate(this.extend(order, params));

              case 10:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['id'].toString()
                });

              case 12:
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
    key: "cancelOrders",
    value: function () {
      var _cancelOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(ids) {
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.loadMarkets();

              case 2:
                _context6.next = 4;
                return this.privatePostOrderCancel({
                  'order_ids': ids
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

      return function cancelOrders(_x8) {
        return _cancelOrders.apply(this, arguments);
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
                return this.loadMarkets();

              case 4:
                _context7.next = 6;
                return this.cancelOrders([id]);

              case 6:
                return _context7.abrupt("return", _context7.sent);

              case 7:
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
      var uri = '/' + this.implodeParams(path, params);
      var url = this.urls['api'] + uri;
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = uri + "\n" + nonce + "\n";
        headers = {
          'Content-Type': 'application/json',
          'apikey': this.apiKey,
          'timestamp': nonce
        };

        if (method == 'POST') {
          body = this.urlencode(query);
          auth += body;
        }

        var secret = this.base64ToBinary(this.secret);
        var signature = this.hmac(this.encode(auth), secret, 'sha512', 'base64');
        headers['signature'] = this.decode(signature);
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

                if (!(api == 'private')) {
                  _context8.next = 13;
                  break;
                }

                if (!('success' in response)) {
                  _context8.next = 12;
                  break;
                }

                if (response['success']) {
                  _context8.next = 12;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
                return _context8.abrupt("return", response);

              case 13:
                return _context8.abrupt("return", response);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return btcmarkets;
}(Exchange);