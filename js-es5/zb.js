'use strict'; //  ---------------------------------------------------------------------------

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
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(zb, _Exchange);

  function zb() {
    _classCallCheck(this, zb);

    return _possibleConstructorReturn(this, (zb.__proto__ || _Object$getPrototypeOf(zb)).apply(this, arguments));
  }

  _createClass(zb, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(zb.prototype.__proto__ || _Object$getPrototypeOf(zb.prototype), "describe", this).call(this), {
        'id': 'zb',
        'name': 'ZB',
        'countries': 'CN',
        'rateLimit': 1000,
        'version': 'v1',
        'has': {
          'CORS': false,
          'fetchOHLCV': true,
          'fetchTickers': false,
          'fetchOrder': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': '1min',
          '3m': '3min',
          '5m': '5min',
          '15m': '15min',
          '30m': '30min',
          '1h': '1hour',
          '2h': '2hour',
          '4h': '4hour',
          '6h': '6hour',
          '12h': '12hour',
          '1d': '1day',
          '3d': '3day',
          '1w': '1week'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/32859187-cd5214f0-ca5e-11e7-967d-96568e2e2bd1.jpg',
          'api': {
            'public': 'http://api.zb.com/data',
            // no https for public API
            'private': 'https://trade.zb.com/api'
          },
          'www': 'https://trade.zb.com/api',
          'doc': 'https://www.zb.com/i/developer',
          'fees': 'https://www.zb.com/i/rate'
        },
        'api': {
          'public': {
            'get': ['markets', 'ticker', 'depth', 'trades', 'kline']
          },
          'private': {
            'post': ['order', 'cancelOrder', 'getOrder', 'getOrders', 'getOrdersNew', 'getOrdersIgnoreTradeType', 'getUnfinishedOrdersIgnoreTradeType', 'getAccountInfo', 'getUserAddress', 'getWithdrawAddress', 'getWithdrawRecord', 'getChargeRecord', 'getCnyWithdrawRecord', 'getCnyChargeRecord', 'withdraw']
          }
        },
        'fees': {
          'funding': {
            'withdraw': {
              'BTC': 0.0001,
              'BCH': 0.0006,
              'LTC': 0.005,
              'ETH': 0.01,
              'ETC': 0.01,
              'BTS': 3,
              'EOS': 1,
              'QTUM': 0.01,
              'HSR': 0.001,
              'XRP': 0.1,
              'USDT': '0.1%',
              'QCASH': 5,
              'DASH': 0.002,
              'BCD': 0,
              'UBTC': 0,
              'SBTC': 0,
              'INK': 20,
              'TV': 0.1,
              'BTH': 0,
              'BCX': 0,
              'LBTC': 0,
              'CHAT': 20,
              'bitCNY': 20,
              'HLC': 20,
              'BTP': 0,
              'BCW': 0
            }
          },
          'trading': {}
        }
      });
    }
  }, {
    key: "getTradingFeeFromBaseQuote",
    value: function getTradingFeeFromBaseQuote(base, quote) {
      // base: quote
      var fees = {
        'BTC': {
          'USDT': 0.0
        },
        'BCH': {
          'BTC': 0.001,
          'USDT': 0.001
        },
        'LTC': {
          'BTC': 0.001,
          'USDT': 0.0
        },
        'ETH': {
          'BTC': 0.001,
          'USDT': 0.0
        },
        'ETC': {
          'BTC': 0.001,
          'USDT': 0.0
        },
        'BTS': {
          'BTC': 0.001,
          'USDT': 0.001
        },
        'EOS': {
          'BTC': 0.001,
          'USDT': 0.001
        },
        'HSR': {
          'BTC': 0.001,
          'USDT': 0.001
        },
        'QTUM': {
          'BTC': 0.001,
          'USDT': 0.001
        },
        'USDT': {
          'BTC': 0.0
        }
      };

      if (base in fees) {
        var quoteFees = fees[base];
        if (quote in quoteFees) return quoteFees[quote];
      }

      return undefined;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, keys, result, i, id, market, _id$split, _id$split2, baseId, quoteId, base, quote, symbol, fee, precision, lot;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarkets();

              case 2:
                markets = _context.sent;
                keys = _Object$keys(markets);
                result = [];

                for (i = 0; i < keys.length; i++) {
                  id = keys[i];
                  market = markets[id];
                  _id$split = id.split('_'), _id$split2 = _slicedToArray(_id$split, 2), baseId = _id$split2[0], quoteId = _id$split2[1];
                  base = this.commonCurrencyCode(baseId.toUpperCase());
                  quote = this.commonCurrencyCode(quoteId.toUpperCase());
                  symbol = base + '/' + quote;
                  fee = this.getTradingFeeFromBaseQuote(base, quote);
                  precision = {
                    'amount': market['amountScale'],
                    'price': market['priceScale']
                  };
                  lot = Math.pow(10, -precision['amount']);
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'base': base,
                    'quote': quote,
                    'info': market,
                    'maker': fee,
                    'taker': fee,
                    'lot': lot,
                    'active': true,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': lot,
                        'max': undefined
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
            balances,
            result,
            i,
            balance,
            currency,
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
                _context2.next = 5;
                return this.privatePostGetAccountInfo();

              case 5:
                response = _context2.sent;
                balances = response['result']['coins'];
                result = {
                  'info': balances
                };

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];
                  currency = balance['key'];
                  if (currency in this.currencies) currency = this.currencies[currency]['code'];
                  account = this.account();
                  account['free'] = parseFloat(balance['available']);
                  account['used'] = parseFloat(balance['freez']);
                  account['total'] = this.sum(account['free'], account['used']);
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 10:
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
    key: "getMarketFieldName",
    value: function getMarketFieldName() {
      return 'market';
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
            marketFieldName,
            request,
            orderbook,
            timestamp,
            bids,
            asks,
            result,
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
                marketFieldName = this.getMarketFieldName();
                request = {};
                request[marketFieldName] = market['id'];
                _context3.next = 9;
                return this.publicGetDepth(this.extend(request, params));

              case 9:
                orderbook = _context3.sent;
                timestamp = this.milliseconds();
                bids = undefined;
                asks = undefined;
                if ('bids' in orderbook) bids = orderbook['bids'];
                if ('asks' in orderbook) asks = orderbook['asks'];
                result = {
                  'bids': bids,
                  'asks': asks,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp)
                };
                if (result['bids']) result['bids'] = this.sortBy(result['bids'], 0, true);
                if (result['asks']) result['asks'] = this.sortBy(result['asks'], 0);
                return _context3.abrupt("return", result);

              case 19:
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
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            market,
            marketFieldName,
            request,
            response,
            ticker,
            timestamp,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                marketFieldName = this.getMarketFieldName();
                request = {};
                request[marketFieldName] = market['id'];
                _context4.next = 9;
                return this.publicGetTicker(this.extend(request, params));

              case 9:
                response = _context4.sent;
                ticker = response['ticker'];
                timestamp = this.milliseconds();
                return _context4.abrupt("return", {
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
                  'baseVolume': parseFloat(ticker['vol']),
                  'quoteVolume': undefined,
                  'info': ticker
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
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
            market,
            request,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                timeframe = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '1m';
                since = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                limit = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : undefined;
                params = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                _context5.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                if (typeof limit === 'undefined') limit = 1000;
                request = {
                  'market': market['id'],
                  'type': this.timeframes[timeframe],
                  'limit': limit
                };
                if (typeof since !== 'undefined') request['since'] = since;
                _context5.next = 12;
                return this.publicGetKline(this.extend(request, params));

              case 12:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseOHLCVs(response['data'], market, timeframe, since, limit));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOHLCV(_x3) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = trade['date'] * 1000;
      var side = trade['trade_type'] === 'bid' ? 'buy' : 'sell';
      return {
        'info': trade,
        'id': trade['tid'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': side,
        'price': parseFloat(trade['price']),
        'amount': parseFloat(trade['amount'])
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
            marketFieldName,
            request,
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
                marketFieldName = this.getMarketFieldName();
                request = {};
                request[marketFieldName] = market['id'];
                _context6.next = 11;
                return this.publicGetTrades(this.extend(request, params));

              case 11:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response, market, since, limit));

              case 13:
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
            paramString,
            tradeType,
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
                paramString = '&price=' + price.toString();
                paramString += '&amount=' + amount.toString();
                tradeType = side === 'buy' ? '1' : '0';
                paramString += '&tradeType=' + tradeType;
                paramString += '&currency=' + this.marketId(symbol);
                _context7.next = 11;
                return this.privatePostOrder(paramString);

              case 11:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8(id) {
        var symbol,
            params,
            paramString,
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
                paramString = '&id=' + id.toString();
                if ('currency' in params) paramString += '&currency=' + params['currency'];
                _context8.next = 8;
                return this.privatePostCancelOrder(paramString);

              case 8:
                return _context8.abrupt("return", _context8.sent);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function cancelOrder(_x9) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            paramString,
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
                paramString = '&id=' + id.toString();
                if ('currency' in params) paramString += '&currency=' + params['currency'];
                _context9.next = 8;
                return this.privatePostGetOrder(paramString);

              case 8:
                return _context9.abrupt("return", _context9.sent);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOrder(_x10) {
        return _fetchOrder.apply(this, arguments);
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
      var url = this.urls['api'][api];

      if (api === 'public') {
        url += '/' + this.version + '/' + path;
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var auth = 'accesskey=' + this.apiKey;
        auth += '&' + 'method=' + path;
        var secret = this.hash(this.encode(this.secret), 'sha1');
        var signature = this.hmac(this.encode(auth), this.encode(secret), 'md5');
        var suffix = 'sign=' + signature + '&reqTime=' + nonce.toString();
        url += '/' + path + '?' + auth + '&' + suffix;
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(httpCode, reason, url, method, headers, body) {
      if (typeof body !== 'string') return; // fallback to default error handler

      if (body.length < 2) return; // fallback to default error handler

      if (body[0] === '{' || body[0] === '[') {
        var response = JSON.parse(body); // {"result":false,"message":}

        if ('result' in response) {
          var success = this.safeValue(response, 'result', false);

          if (typeof success === 'string') {
            if (success === 'true' || success === '1') success = true;else success = false;
          }

          if (!success) throw new ExchangeError(this.id + ' ' + this.json(response));
        }
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                api = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 'public';
                method = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 'GET';
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                headers = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : undefined;
                body = _args10.length > 5 && _args10[5] !== undefined ? _args10[5] : undefined;
                _context10.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context10.sent;

                if (!(api === 'private')) {
                  _context10.next = 11;
                  break;
                }

                if (!('code' in response)) {
                  _context10.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                return _context10.abrupt("return", response);

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function request(_x11) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return zb;
}(Exchange);