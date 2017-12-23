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
  _inherits(bitcoincoid, _Exchange);

  function bitcoincoid() {
    _classCallCheck(this, bitcoincoid);

    return _possibleConstructorReturn(this, (bitcoincoid.__proto__ || _Object$getPrototypeOf(bitcoincoid)).apply(this, arguments));
  }

  _createClass(bitcoincoid, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitcoincoid.prototype.__proto__ || _Object$getPrototypeOf(bitcoincoid.prototype), "describe", this).call(this), {
        'id': 'bitcoincoid',
        'name': 'Bitcoin.co.id',
        'countries': 'ID',
        // Indonesia
        'hasCORS': false,
        'version': '1.7',
        // as of 6 November 2017
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766138-043c7786-5ecf-11e7-882b-809c14f38b53.jpg',
          'api': {
            'public': 'https://vip.bitcoin.co.id/api',
            'private': 'https://vip.bitcoin.co.id/tapi'
          },
          'www': 'https://www.bitcoin.co.id',
          'doc': ['https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf', 'https://vip.bitcoin.co.id/trade_api']
        },
        'api': {
          'public': {
            'get': ['{pair}/ticker', '{pair}/trades', '{pair}/depth']
          },
          'private': {
            'post': ['getInfo', 'transHistory', 'trade', 'tradeHistory', 'openOrders', 'cancelOrder']
          }
        },
        'markets': {
          'BTC/IDR': {
            'id': 'btc_idr',
            'symbol': 'BTC/IDR',
            'base': 'BTC',
            'quote': 'IDR',
            'baseId': 'btc',
            'quoteId': 'idr'
          },
          'BCH/IDR': {
            'id': 'bch_idr',
            'symbol': 'BCH/IDR',
            'base': 'BCH',
            'quote': 'IDR',
            'baseId': 'bch',
            'quoteId': 'idr'
          },
          'BTG/IDR': {
            'id': 'btg_idr',
            'symbol': 'BTG/IDR',
            'base': 'BTG',
            'quote': 'IDR',
            'baseId': 'btg',
            'quoteId': 'idr'
          },
          'ETH/IDR': {
            'id': 'eth_idr',
            'symbol': 'ETH/IDR',
            'base': 'ETH',
            'quote': 'IDR',
            'baseId': 'eth',
            'quoteId': 'idr'
          },
          'ETC/IDR': {
            'id': 'etc_idr',
            'symbol': 'ETC/IDR',
            'base': 'ETC',
            'quote': 'IDR',
            'baseId': 'etc',
            'quoteId': 'idr'
          },
          'LTC/IDR': {
            'id': 'ltc_idr',
            'symbol': 'LTC/IDR',
            'base': 'LTC',
            'quote': 'IDR',
            'baseId': 'ltc',
            'quoteId': 'idr'
          },
          'NXT/IDR': {
            'id': 'nxt_idr',
            'symbol': 'NXT/IDR',
            'base': 'NXT',
            'quote': 'IDR',
            'baseId': 'nxt',
            'quoteId': 'idr'
          },
          'WAVES/IDR': {
            'id': 'waves_idr',
            'symbol': 'WAVES/IDR',
            'base': 'WAVES',
            'quote': 'IDR',
            'baseId': 'waves',
            'quoteId': 'idr'
          },
          'XRP/IDR': {
            'id': 'xrp_idr',
            'symbol': 'XRP/IDR',
            'base': 'XRP',
            'quote': 'IDR',
            'baseId': 'xrp',
            'quoteId': 'idr'
          },
          'XZC/IDR': {
            'id': 'xzc_idr',
            'symbol': 'XZC/IDR',
            'base': 'XZC',
            'quote': 'IDR',
            'baseId': 'xzc',
            'quoteId': 'idr'
          },
          'XLM/IDR': {
            'id': 'str_idr',
            'symbol': 'XLM/IDR',
            'base': 'XLM',
            'quote': 'IDR',
            'baseId': 'str',
            'quoteId': 'idr'
          },
          'BTS/BTC': {
            'id': 'bts_btc',
            'symbol': 'BTS/BTC',
            'base': 'BTS',
            'quote': 'BTC',
            'baseId': 'bts',
            'quoteId': 'btc'
          },
          'DASH/BTC': {
            'id': 'drk_btc',
            'symbol': 'DASH/BTC',
            'base': 'DASH',
            'quote': 'BTC',
            'baseId': 'drk',
            'quoteId': 'btc'
          },
          'DOGE/BTC': {
            'id': 'doge_btc',
            'symbol': 'DOGE/BTC',
            'base': 'DOGE',
            'quote': 'BTC',
            'baseId': 'doge',
            'quoteId': 'btc'
          },
          'ETH/BTC': {
            'id': 'eth_btc',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'baseId': 'eth',
            'quoteId': 'btc'
          },
          'LTC/BTC': {
            'id': 'ltc_btc',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'baseId': 'ltc',
            'quoteId': 'btc'
          },
          'NXT/BTC': {
            'id': 'nxt_btc',
            'symbol': 'NXT/BTC',
            'base': 'NXT',
            'quote': 'BTC',
            'baseId': 'nxt',
            'quoteId': 'btc'
          },
          'XLM/BTC': {
            'id': 'str_btc',
            'symbol': 'XLM/BTC',
            'base': 'XLM',
            'quote': 'BTC',
            'baseId': 'str',
            'quoteId': 'btc'
          },
          'XEM/BTC': {
            'id': 'nem_btc',
            'symbol': 'XEM/BTC',
            'base': 'XEM',
            'quote': 'BTC',
            'baseId': 'nem',
            'quoteId': 'btc'
          },
          'XRP/BTC': {
            'id': 'xrp_btc',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'baseId': 'xrp',
            'quoteId': 'btc'
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
            balance,
            result,
            currencies,
            i,
            currency,
            lowercase,
            account,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostGetInfo();

              case 3:
                response = _context.sent;
                balance = response['return'];
                result = {
                  'info': balance
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = this.account();
                  account['free'] = this.safeFloat(balance['balance'], lowercase, 0.0);
                  account['used'] = this.safeFloat(balance['balance_hold'], lowercase, 0.0);
                  account['total'] = this.sum(account['free'], account['used']);
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
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetPairDepth(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 3:
                orderbook = _context2.sent;
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buy', 'sell'));

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
            market,
            response,
            ticker,
            timestamp,
            baseVolume,
            quoteVolume,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                market = this.market(symbol);
                _context3.next = 4;
                return this.publicGetPairTicker(this.extend({
                  'pair': market['id']
                }, params));

              case 4:
                response = _context3.sent;
                ticker = response['ticker'];
                timestamp = parseFloat(ticker['server_time']) * 1000;
                baseVolume = 'vol_' + market['baseId'].toLowerCase();
                quoteVolume = 'vol_' + market['quoteId'].toLowerCase();
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(ticker['buy']),
                  'ask': parseFloat(ticker['sell']),
                  'vwap': undefined,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker[baseVolume]),
                  'quoteVolume': parseFloat(ticker[quoteVolume]),
                  'info': ticker
                });

              case 10:
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
      var timestamp = parseInt(trade['date']) * 1000;
      return {
        'id': trade['tid'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['type'],
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
                market = this.market(symbol);
                _context4.next = 6;
                return this.publicGetPairTrades(this.extend({
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
            market,
            order,
            base,
            result,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};
                market = this.market(symbol);
                order = {
                  'pair': market['id'],
                  'type': side,
                  'price': price
                };
                base = market['baseId'];
                order[base] = amount;
                _context5.next = 8;
                return this.privatePostTrade(this.extend(order, params));

              case 8:
                result = _context5.sent;
                return _context5.abrupt("return", {
                  'info': result,
                  'id': result['return']['order_id'].toString()
                });

              case 10:
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
                return this.privatePostCancelOrder(this.extend({
                  'order_id': id
                }, params));

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
      var url = this.urls['api'][api];

      if (api == 'public') {
        url += '/' + this.implodeParams(path, params);
      } else {
        this.checkRequiredCredentials();
        body = this.urlencode(this.extend({
          'method': path,
          'nonce': this.nonce()
        }, params));
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Key': this.apiKey,
          'Sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512')
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
      _regeneratorRuntime.mark(function _callee7(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                api = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 'public';
                method = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 'GET';
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                headers = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                body = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : undefined;
                _context7.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context7.sent;

                if (!('error' in response)) {
                  _context7.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + response['error']);

              case 10:
                return _context7.abrupt("return", response);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bitcoincoid;
}(Exchange);