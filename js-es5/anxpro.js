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
  _inherits(anxpro, _Exchange);

  function anxpro() {
    _classCallCheck(this, anxpro);

    return _possibleConstructorReturn(this, (anxpro.__proto__ || _Object$getPrototypeOf(anxpro)).apply(this, arguments));
  }

  _createClass(anxpro, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(anxpro.prototype.__proto__ || _Object$getPrototypeOf(anxpro.prototype), "describe", this).call(this), {
        'id': 'anxpro',
        'name': 'ANXPro',
        'countries': ['JP', 'SG', 'HK', 'NZ'],
        'version': '2',
        'rateLimit': 1500,
        'hasCORS': false,
        'hasFetchTrades': false,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27765983-fd8595da-5ec9-11e7-82e3-adb3ab8c2612.jpg',
          'api': 'https://anxpro.com/api',
          'www': 'https://anxpro.com',
          'doc': ['http://docs.anxv2.apiary.io', 'https://anxpro.com/pages/api']
        },
        'api': {
          'public': {
            'get': ['{currency_pair}/money/ticker', '{currency_pair}/money/depth/full', '{currency_pair}/money/trade/fetch']
          },
          'private': {
            'post': ['{currency_pair}/money/order/add', '{currency_pair}/money/order/cancel', '{currency_pair}/money/order/quote', '{currency_pair}/money/order/result', '{currency_pair}/money/orders', 'money/{currency}/address', 'money/{currency}/send_simple', 'money/info', 'money/trade/list', 'money/wallet/history']
          }
        },
        'markets': {
          'BTC/USD': {
            'id': 'BTCUSD',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD',
            'multiplier': 100000
          },
          'BTC/HKD': {
            'id': 'BTCHKD',
            'symbol': 'BTC/HKD',
            'base': 'BTC',
            'quote': 'HKD',
            'multiplier': 100000
          },
          'BTC/EUR': {
            'id': 'BTCEUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR',
            'multiplier': 100000
          },
          'BTC/CAD': {
            'id': 'BTCCAD',
            'symbol': 'BTC/CAD',
            'base': 'BTC',
            'quote': 'CAD',
            'multiplier': 100000
          },
          'BTC/AUD': {
            'id': 'BTCAUD',
            'symbol': 'BTC/AUD',
            'base': 'BTC',
            'quote': 'AUD',
            'multiplier': 100000
          },
          'BTC/SGD': {
            'id': 'BTCSGD',
            'symbol': 'BTC/SGD',
            'base': 'BTC',
            'quote': 'SGD',
            'multiplier': 100000
          },
          'BTC/JPY': {
            'id': 'BTCJPY',
            'symbol': 'BTC/JPY',
            'base': 'BTC',
            'quote': 'JPY',
            'multiplier': 100000
          },
          'BTC/GBP': {
            'id': 'BTCGBP',
            'symbol': 'BTC/GBP',
            'base': 'BTC',
            'quote': 'GBP',
            'multiplier': 100000
          },
          'BTC/NZD': {
            'id': 'BTCNZD',
            'symbol': 'BTC/NZD',
            'base': 'BTC',
            'quote': 'NZD',
            'multiplier': 100000
          },
          'LTC/BTC': {
            'id': 'LTCBTC',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'multiplier': 100000
          },
          'STR/BTC': {
            'id': 'STRBTC',
            'symbol': 'STR/BTC',
            'base': 'STR',
            'quote': 'BTC',
            'multiplier': 100000000
          },
          'XRP/BTC': {
            'id': 'XRPBTC',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'multiplier': 100000000
          },
          'DOGE/BTC': {
            'id': 'DOGEBTC',
            'symbol': 'DOGE/BTC',
            'base': 'DOGE',
            'quote': 'BTC',
            'multiplier': 100000000
          }
        },
        'fees': {
          'trading': {
            'maker': 0.3 / 100,
            'taker': 0.6 / 100
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
            currencies,
            result,
            c,
            currency,
            account,
            wallet,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostMoneyInfo();

              case 3:
                response = _context.sent;
                balance = response['data'];
                currencies = _Object$keys(balance['Wallets']);
                result = {
                  'info': balance
                };

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  account = this.account();

                  if (currency in balance['Wallets']) {
                    wallet = balance['Wallets'][currency];
                    account['free'] = parseFloat(wallet['Available_Balance']['value']);
                    account['total'] = parseFloat(wallet['Balance']['value']);
                    account['used'] = account['total'] - account['free'];
                  }

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
            response,
            orderbook,
            t,
            timestamp,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetCurrencyPairMoneyDepthFull(this.extend({
                  'currency_pair': this.marketId(symbol)
                }, params));

              case 3:
                response = _context2.sent;
                orderbook = response['data'];
                t = parseInt(orderbook['dataUpdateTime']);
                timestamp = parseInt(t / 1000);
                return _context2.abrupt("return", this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'amount'));

              case 8:
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
            t,
            timestamp,
            bid,
            ask,
            vwap,
            baseVolume,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.publicGetCurrencyPairMoneyTicker(this.extend({
                  'currency_pair': this.marketId(symbol)
                }, params));

              case 3:
                response = _context3.sent;
                ticker = response['data'];
                t = parseInt(ticker['dataUpdateTime']);
                timestamp = parseInt(t / 1000);
                bid = this.safeFloat(ticker['buy'], 'value');
                ask = this.safeFloat(ticker['sell'], 'value');
                ;
                vwap = parseFloat(ticker['vwap']['value']);
                baseVolume = parseFloat(ticker['vol']['value']);
                return _context3.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']['value']),
                  'low': parseFloat(ticker['low']['value']),
                  'bid': bid,
                  'ask': ask,
                  'vwap': vwap,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': parseFloat(ticker['last']['value']),
                  'change': undefined,
                  'percentage': undefined,
                  'average': parseFloat(ticker['avg']['value']),
                  'baseVolume': baseVolume,
                  'quoteVolume': baseVolume * vwap,
                  'info': ticker
                });

              case 13:
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
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var since,
            limit,
            params,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                since = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : undefined;
                params = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                throw new ExchangeError(this.id + ' switched off the trades endpoint, see their docs at http://docs.anxv2.apiary.io/reference/market-data/currencypairmoneytradefetch-disabled');

              case 5:
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
                  'currency_pair': market['id'],
                  'amount_int': parseInt(amount * 100000000) // 10^8

                };

                if (type == 'limit') {
                  order['price_int'] = parseInt(price * market['multiplier']); // 10^5 or 10^8
                }

                order['type'] = side == 'buy' ? 'bid' : 'ask';
                _context5.next = 8;
                return this.privatePostCurrencyPairMoneyOrderAdd(this.extend(order, params));

              case 8:
                result = _context5.sent;
                return _context5.abrupt("return", {
                  'info': result,
                  'id': result['data']
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
                return this.privatePostCurrencyPairMoneyOrderCancel({
                  'oid': id
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
    key: "getAmountMultiplier",
    value: function getAmountMultiplier(currency) {
      if (currency == 'BTC') {
        return 100000000;
      } else if (currency == 'LTC') {
        return 100000000;
      } else if (currency == 'STR') {
        return 100000000;
      } else if (currency == 'XRP') {
        return 100000000;
      } else if (currency == 'DOGE') {
        return 100000000;
      }

      return 100;
    }
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(currency, amount, address) {
        var params,
            multiplier,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                _context7.next = 3;
                return this.loadMarkets();

              case 3:
                multiplier = this.getAmountMultiplier(currency);
                _context7.next = 6;
                return this.privatePostMoneyCurrencySendSimple(this.extend({
                  'currency': currency,
                  'amount_int': parseInt(amount * multiplier),
                  'address': address
                }, params));

              case 6:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['data']['transactionId']
                });

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function withdraw(_x9, _x10, _x11) {
        return _withdraw.apply(this, arguments);
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
      var request = this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));
      var url = this.urls['api'] + '/' + this.version + '/' + request;

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
          'Rest-Sign': this.decode(signature)
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

                if (!('result' in response)) {
                  _context8.next = 11;
                  break;
                }

                if (!(response['result'] == 'success')) {
                  _context8.next = 11;
                  break;
                }

                return _context8.abrupt("return", response);

              case 11:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x12) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return anxpro;
}(Exchange);