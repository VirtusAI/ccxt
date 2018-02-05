'use strict'; //  ---------------------------------------------------------------------------

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
    ExchangeError = _require.ExchangeError,
    InvalidNonce = _require.InvalidNonce,
    InvalidOrder = _require.InvalidOrder,
    AuthenticationError = _require.AuthenticationError,
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(kucoin, _Exchange);

  function kucoin() {
    _classCallCheck(this, kucoin);

    return _possibleConstructorReturn(this, (kucoin.__proto__ || _Object$getPrototypeOf(kucoin)).apply(this, arguments));
  }

  _createClass(kucoin, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(kucoin.prototype.__proto__ || _Object$getPrototypeOf(kucoin.prototype), "describe", this).call(this), {
        'id': 'kucoin',
        'name': 'Kucoin',
        'countries': 'HK',
        // Hong Kong
        'version': 'v1',
        'rateLimit': 2000,
        'userAgent': this.userAgents['chrome'],
        'has': {
          'CORS': false,
          'createMarketOrder': false,
          'fetchTickers': true,
          'fetchOHLCV': true,
          // see the method implementation below
          'fetchOrder': true,
          'fetchOrders': false,
          'fetchClosedOrders': true,
          'fetchOpenOrders': true,
          'fetchMyTrades': false,
          'fetchCurrencies': true,
          'withdraw': true
        },
        'timeframes': {
          '1m': 1,
          '5m': 5,
          '15m': 15,
          '30m': 30,
          '1h': 60,
          '8h': 480,
          '1d': 'D',
          '1w': 'W'
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/33795655-b3c46e48-dcf6-11e7-8abe-dc4588ba7901.jpg',
          'api': {
            'public': 'https://api.kucoin.com',
            'private': 'https://api.kucoin.com',
            'kitchen': 'https://kitchen.kucoin.com'
          },
          'www': 'https://kucoin.com',
          'doc': 'https://kucoinapidocs.docs.apiary.io',
          'fees': 'https://news.kucoin.com/en/fee'
        },
        'api': {
          'kitchen': {
            'get': ['open/chart/history']
          },
          'public': {
            'get': ['open/chart/config', 'open/chart/history', 'open/chart/symbol', 'open/currencies', 'open/deal-orders', 'open/kline', 'open/lang-list', 'open/orders', 'open/orders-buy', 'open/orders-sell', 'open/tick', 'market/open/coin-info', 'market/open/coins', 'market/open/coins-trending', 'market/open/symbols']
          },
          'private': {
            'get': ['account/balance', 'account/{coin}/wallet/address', 'account/{coin}/wallet/records', 'account/{coin}/balance', 'account/promotion/info', 'account/promotion/sum', 'deal-orders', 'order/active', 'order/active-map', 'order/dealt', 'order/detail', 'referrer/descendant/count', 'user/info'],
            'post': ['account/{coin}/withdraw/apply', 'account/{coin}/withdraw/cancel', 'cancel-order', 'order', 'user/change-lang']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.0010,
            'taker': 0.0010
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'KCS': 2.0,
              'BTC': 0.0005,
              'USDT': 10.0,
              'ETH': 0.01,
              'LTC': 0.001,
              'NEO': 0.0,
              'GAS': 0.0,
              'KNC': 0.5,
              'BTM': 5.0,
              'QTUM': 0.1,
              'EOS': 0.5,
              'CVC': 3.0,
              'OMG': 0.1,
              'PAY': 0.5,
              'SNT': 20.0,
              'BHC': 1.0,
              'HSR': 0.01,
              'WTC': 0.1,
              'VEN': 2.0,
              'MTH': 10.0,
              'RPX': 1.0,
              'REQ': 20.0,
              'EVX': 0.5,
              'MOD': 0.5,
              'NEBL': 0.1,
              'DGB': 0.5,
              'CAG': 2.0,
              'CFD': 0.5,
              'RDN': 0.5,
              'UKG': 5.0,
              'BCPT': 5.0,
              'PPT': 0.1,
              'BCH': 0.0005,
              'STX': 2.0,
              'NULS': 1.0,
              'GVT': 0.1,
              'HST': 2.0,
              'PURA': 0.5,
              'SUB': 2.0,
              'QSP': 5.0,
              'POWR': 1.0,
              'FLIXX': 10.0,
              'LEND': 20.0,
              'AMB': 3.0,
              'RHOC': 2.0,
              'R': 2.0,
              'DENT': 50.0,
              'DRGN': 1.0,
              'ACT': 0.1
            },
            'deposit': 0.00
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
        var response, markets, result, i, market, id, base, quote, symbol, precision, active;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarketOpenSymbols();

              case 2:
                response = _context.sent;
                markets = response['data'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['symbol'];
                  base = market['coinType'];
                  quote = market['coinTypePair'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  active = market['trading'];
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': active,
                    'info': market,
                    'lot': Math.pow(10, -precision['amount']),
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': Math.pow(10, -precision['amount']),
                        'max': undefined
                      },
                      'price': {
                        'min': undefined,
                        'max': undefined
                      }
                    }
                  }));
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
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var params,
            response,
            currencies,
            result,
            i,
            currency,
            id,
            code,
            precision,
            deposit,
            withdraw,
            active,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.publicGetMarketOpenCoins(params);

              case 3:
                response = _context2.sent;
                currencies = response['data'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['coin']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  code = this.commonCurrencyCode(id);
                  precision = currency['tradePrecision'];
                  deposit = currency['enableDeposit'];
                  withdraw = currency['enableWithdraw'];
                  active = deposit && withdraw;
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['name'],
                    'active': active,
                    'status': 'ok',
                    'fee': currency['withdrawFeeRate'],
                    // todo: redesign
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'price': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'cost': {
                        'min': undefined,
                        'max': undefined
                      },
                      'withdraw': {
                        'min': currency['withdrawMinAmount'],
                        'max': Math.pow(10, precision)
                      }
                    }
                  };
                }

                return _context2.abrupt("return", result);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var params,
            response,
            balances,
            result,
            indexed,
            keys,
            i,
            id,
            currency,
            account,
            balance,
            used,
            free,
            total,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                _context3.next = 5;
                return this.privateGetAccountBalance(this.extend({
                  'limit': 20,
                  // default 12, max 20
                  'page': 1
                }, params));

              case 5:
                response = _context3.sent;
                balances = response['data'];
                result = {
                  'info': balances
                };
                indexed = this.indexBy(balances, 'coinType');
                keys = _Object$keys(indexed);

                for (i = 0; i < keys.length; i++) {
                  id = keys[i];
                  currency = this.commonCurrencyCode(id);
                  account = this.account();
                  balance = indexed[id];
                  used = parseFloat(balance['freezeBalance']);
                  free = parseFloat(balance['balance']);
                  total = this.sum(free, used);
                  account['free'] = free;
                  account['used'] = used;
                  account['total'] = total;
                  result[currency] = account;
                }

                return _context3.abrupt("return", this.parseBalance(result));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var limit,
            params,
            market,
            response,
            orderbook,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                limit = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                _context4.next = 7;
                return this.publicGetOpenOrders(this.extend({
                  'symbol': market['id']
                }, params));

              case 7:
                response = _context4.sent;
                orderbook = response['data'];
                return _context4.abrupt("return", this.parseOrderBook(orderbook, undefined, 'BUY', 'SELL'));

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        symbol = order['coinType'] + '/' + order['coinTypePair'];
      }

      var timestamp = this.safeValue(order, 'createdAt');
      var price = this.safeValue(order, 'price');
      if (typeof price === 'undefined') price = this.safeValue(order, 'dealPrice');
      if (typeof price === 'undefined') price = this.safeValue(order, 'dealPriceAverage');
      var remaining = this.safeFloat(order, 'pendingAmount');
      var status = this.safeValue(order, 'status');
      var filled = this.safeFloat(order, 'dealAmount');

      if (typeof status === 'undefined') {
        if (typeof remaining !== 'undefined') if (remaining > 0) status = 'open';else status = 'closed';
      }

      if (typeof status !== 'undefined') {
        if (status === 'closed') filled = this.safeFloat(order, 'amount');
      }

      var amount = this.safeFloat(order, 'amount');
      var cost = this.safeFloat(order, 'dealValue');

      if (typeof filled !== 'undefined') {
        if (typeof price !== 'undefined') {
          if (typeof cost === 'undefined') cost = price * filled;
        }

        if (typeof amount === 'undefined') {
          if (typeof remaining !== 'undefined') amount = this.sum(filled, remaining);
        } else if (typeof remaining === 'undefined') {
          remaining = amount - filled;
        }
      }

      var side = this.safeValue(order, 'direction');
      if (typeof side === 'undefined') side = order['type'].toLowerCase();
      var fee = undefined;

      if ('feeTotal' in order) {
        fee = {
          'cost': this.safeValue(order, 'feeTotal'),
          'rate': undefined,
          'currency': undefined
        };
        if (market) fee['currency'] = market['base'];
      } // todo: parse order trades and fill fees from 'datas'
      // do not confuse trades with orders


      var orderId = this.safeString(order, 'orderOid');
      if (typeof orderId === 'undefined') orderId = this.safeString(order, 'oid');
      var result = {
        'info': order,
        'id': orderId,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': 'limit',
        'side': side,
        'price': price,
        'amount': amount,
        'cost': cost,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': fee
      };
      return result;
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(id) {
        var symbol,
            params,
            orderType,
            market,
            request,
            response,
            order,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                symbol = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};

                if (!(typeof symbol === 'undefined')) {
                  _context5.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrder requires a symbol');

              case 4:
                orderType = this.safeValue(params, 'type');

                if (!(typeof orderType === 'undefined')) {
                  _context5.next = 7;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrder requires parameter type=["BUY"|"SELL"]');

              case 7:
                _context5.next = 9;
                return this.loadMarkets();

              case 9:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'type': orderType,
                  'orderOid': id
                };
                _context5.next = 13;
                return this.privateGetOrderDetail(this.extend(request, params));

              case 13:
                response = _context5.sent;
                order = response['data'];

                if (order) {
                  _context5.next = 17;
                  break;
                }

                throw new OrderNotFound(this.id + ' ' + this.json(response));

              case 17:
                return _context5.abrupt("return", this.parseOrder(response['data'], market));

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrder(_x2) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            orders,
            result,
            i,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : undefined;
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};

                if (symbol) {
                  _context6.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol');

              case 6:
                _context6.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                _context6.next = 12;
                return this.privateGetOrderActiveMap(this.extend(request, params));

              case 12:
                response = _context6.sent;
                orders = this.arrayConcat(response['data']['SELL'], response['data']['BUY']);
                result = [];

                for (i = 0; i < orders.length; i++) {
                  result.push(this.extend(orders[i], {
                    'status': 'open'
                  }));
                }

                return _context6.abrupt("return", this.parseOrders(result, market, since, limit));

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchClosedOrders",
    value: function () {
      var _fetchClosedOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            orders,
            result,
            i,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : undefined;
                since = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                request = {};
                _context7.next = 7;
                return this.loadMarkets();

              case 7:
                market = undefined;

                if (typeof symbol !== 'undefined') {
                  market = this.market(symbol);
                  request['symbol'] = market['id'];
                }

                if (typeof since !== 'undefined') request['since'] = since;
                if (typeof limit !== 'undefined') request['limit'] = limit;
                _context7.next = 13;
                return this.privateGetOrderDealt(this.extend(request, params));

              case 13:
                response = _context7.sent;
                orders = response['data']['datas'];
                result = [];

                for (i = 0; i < orders.length; i++) {
                  result.push(this.extend(orders[i], {
                    'status': 'closed'
                  }));
                }

                return _context7.abrupt("return", this.parseOrders(result, market, since, limit));

              case 18:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
            market,
            base,
            order,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                price = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                params = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : {};

                if (!(type !== 'limit')) {
                  _context8.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                _context8.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                base = market['base'];
                order = {
                  'symbol': market['id'],
                  'type': side.toUpperCase(),
                  'price': this.priceToPrecision(symbol, price),
                  'amount': this.truncate(amount, this.currencies[base]['precision'])
                };
                _context8.next = 11;
                return this.privatePostOrder(this.extend(order, params));

              case 11:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': this.safeString(response['data'], 'orderOid')
                });

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function createOrder(_x3, _x4, _x5, _x6) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            market,
            request,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                params = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};

                if (symbol) {
                  _context9.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a symbol');

              case 4:
                _context9.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'orderOid': id
                };

                if (!('type' in params)) {
                  _context9.next = 12;
                  break;
                }

                request['type'] = params['type'].toUpperCase();
                _context9.next = 13;
                break;

              case 12:
                throw new ExchangeError(this.id + ' cancelOrder requires parameter type=["BUY"|"SELL"]');

              case 13:
                _context9.next = 15;
                return this.privatePostCancelOrder(this.extend(request, params));

              case 15:
                response = _context9.sent;
                return _context9.abrupt("return", response);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function cancelOrder(_x7) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['datetime'];
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else {
        symbol = ticker['coinType'] + '/' + ticker['coinTypePair'];
      } // TNC coin doesn't have changerate for some reason


      var change = this.safeFloat(ticker, 'changeRate');
      if (typeof change !== 'undefined') change *= 100;
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'high'),
        'low': this.safeFloat(ticker, 'low'),
        'bid': this.safeFloat(ticker, 'buy'),
        'ask': this.safeFloat(ticker, 'sell'),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'lastDealPrice'),
        'change': change,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': this.safeFloat(ticker, 'vol'),
        'quoteVolume': this.safeFloat(ticker, 'volValue'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbols,
            params,
            response,
            tickers,
            result,
            t,
            ticker,
            symbol,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbols = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                params = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
                _context10.next = 4;
                return this.publicGetMarketOpenSymbols(params);

              case 4:
                response = _context10.sent;
                tickers = response['data'];
                result = {};

                for (t = 0; t < tickers.length; t++) {
                  ticker = this.parseTicker(tickers[t]);
                  symbol = ticker['symbol'];
                  result[symbol] = ticker;
                }

                return _context10.abrupt("return", result);

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      _regeneratorRuntime.mark(function _callee11(symbol) {
        var params,
            market,
            response,
            ticker,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                params = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
                _context11.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context11.next = 6;
                return this.publicGetOpenTick(this.extend({
                  'symbol': market['id']
                }, params));

              case 6:
                response = _context11.sent;
                ticker = response['data'];
                return _context11.abrupt("return", this.parseTicker(ticker, market));

              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchTicker(_x8) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = trade[0];
      var side = undefined;

      if (trade[1] === 'BUY') {
        side = 'buy';
      } else if (trade[1] === 'SELL') {
        side = 'sell';
      }

      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': 'limit',
        'side': side,
        'price': trade[2],
        'amount': trade[3]
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                since = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
                _context12.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context12.next = 8;
                return this.publicGetOpenDealOrders(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context12.sent;
                return _context12.abrupt("return", this.parseTrades(response['data'], market, since, limit));

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchTrades(_x9) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTradingViewOHLCVs",
    value: function parseTradingViewOHLCVs(ohlcvs) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var result = [];

      for (var i = 0; i < ohlcvs['t'].length; i++) {
        result.push([ohlcvs['t'][i] * 1000, ohlcvs['o'][i], ohlcvs['h'][i], ohlcvs['l'][i], ohlcvs['c'][i], ohlcvs['v'][i]]);
      }

      return this.parseOHLCVs(result, market, timeframe, since, limit);
    }
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            end,
            resolution,
            minutes,
            start,
            request,
            response,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                timeframe = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : '1m';
                since = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : undefined;
                limit = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : undefined;
                params = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : {};
                _context13.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                end = this.seconds();
                resolution = this.timeframes[timeframe]; // convert 'resolution' to minutes in order to calculate 'from' later

                minutes = resolution;

                if (minutes === 'D') {
                  if (typeof limit === 'undefined') limit = 30; // 30 days, 1 month

                  minutes = 1440;
                } else if (minutes === 'W') {
                  if (typeof limit === 'undefined') limit = 52; // 52 weeks, 1 year

                  minutes = 10080;
                } else if (typeof limit === 'undefined') {
                  limit = 1440;
                  minutes = 1440;
                  resolution = 'D';
                }

                start = end - minutes * 60 * limit;

                if (typeof since !== 'undefined') {
                  start = parseInt(since / 1000);
                  end = this.sum(start, minutes * 60 * limit);
                }

                request = {
                  'symbol': market['id'],
                  'type': this.timeframes[timeframe],
                  'resolution': resolution,
                  'from': start,
                  'to': end
                };
                _context13.next = 16;
                return this.kitchenGetOpenChartHistory(this.extend(request, params));

              case 16:
                response = _context13.sent;
                return _context13.abrupt("return", this.parseTradingViewOHLCVs(response, market, timeframe, since, limit));

              case 18:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchOHLCV(_x10) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(code, amount, address) {
        var tag,
            params,
            currency,
            response,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                tag = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : undefined;
                params = _args14.length > 4 && _args14[4] !== undefined ? _args14[4] : {};
                _context14.next = 4;
                return this.loadMarkets();

              case 4:
                currency = this.currency(code);
                _context14.next = 7;
                return this.privatePostAccountCoinWithdrawApply(this.extend({
                  'coin': currency['id'],
                  'amount': amount,
                  'address': address
                }, params));

              case 7:
                response = _context14.sent;
                return _context14.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 9:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function withdraw(_x11, _x12, _x13) {
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
      var endpoint = '/' + this.version + '/' + this.implodeParams(path, params);
      var url = this.urls['api'][api] + endpoint;
      var query = this.omit(params, this.extractParams(path));

      if (api === 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials(); // their nonce is always a calibrated synched milliseconds-timestamp

        var nonce = this.milliseconds();
        var queryString = '';
        nonce = nonce.toString();

        if (_Object$keys(query).length) {
          queryString = this.rawencode(this.keysort(query));
          url += '?' + queryString;

          if (method !== 'GET') {
            body = queryString;
          }
        }

        var auth = endpoint + '/' + nonce + '/' + queryString;
        var payload = this.stringToBase64(this.encode(auth)); // payload should be "encoded" as returned from stringToBase64

        var signature = this.hmac(payload, this.encode(this.secret), 'sha256');
        headers = {
          'KC-API-KEY': this.apiKey,
          'KC-API-NONCE': nonce,
          'KC-API-SIGNATURE': signature
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
    key: "throwExceptionOnError",
    value: function throwExceptionOnError(response) {
      // { success: false, code: "ERROR", msg: "Min price:100.0" }
      // { success: true,  code: "OK",    msg: "Operation succeeded." }
      if (!('success' in response)) throw new ExchangeError(this.id + ': malformed response: ' + this.json(response));
      if (response['success'] === true) return; // not an error

      if (!('code' in response) || !('msg' in response)) throw new ExchangeError(this.id + ': malformed response: ' + this.json(response));
      var code = this.safeString(response, 'code');
      var message = this.safeString(response, 'msg');
      var feedback = this.id + ' ' + this.json(response);

      if (code === 'UNAUTH') {
        if (message === 'Invalid nonce') throw new InvalidNonce(feedback);
        throw new AuthenticationError(feedback);
      } else if (code === 'ERROR') {
        if (message.indexOf('The precision of amount') >= 0) throw new InvalidOrder(feedback); // amount violates precision.amount

        if (message.indexOf('Min amount each order') >= 0) throw new InvalidOrder(feedback); // amount < limits.amount.min

        if (message.indexOf('Min price:') >= 0) throw new InvalidOrder(feedback); // price < limits.price.min

        if (message.indexOf('The precision of price') >= 0) throw new InvalidOrder(feedback); // price violates precision.price
      } else if (code === 'NO_BALANCE') {
        if (message.indexOf('Insufficient balance') >= 0) throw new InsufficientFunds(feedback);
      }

      throw new ExchangeError(this.id + ': unknown response: ' + this.json(response));
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      var response = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;

      if (typeof response !== 'undefined') {
        // JS callchain parses body beforehand
        this.throwExceptionOnError(response);
      } else if (body && body[0] === '{') {
        // Python/PHP callchains don't have json available at this step
        this.throwExceptionOnError(JSON.parse(body));
      }
    }
  }]);

  return kucoin;
}(Exchange);