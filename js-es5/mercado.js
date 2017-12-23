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
  _inherits(mercado, _Exchange);

  function mercado() {
    _classCallCheck(this, mercado);

    return _possibleConstructorReturn(this, (mercado.__proto__ || _Object$getPrototypeOf(mercado)).apply(this, arguments));
  }

  _createClass(mercado, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(mercado.prototype.__proto__ || _Object$getPrototypeOf(mercado.prototype), "describe", this).call(this), {
        'id': 'mercado',
        'name': 'Mercado Bitcoin',
        'countries': 'BR',
        // Brazil
        'rateLimit': 1000,
        'version': 'v3',
        'hasCORS': true,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27837060-e7c58714-60ea-11e7-9192-f05e86adb83f.jpg',
          'api': {
            'public': 'https://www.mercadobitcoin.net/api',
            'private': 'https://www.mercadobitcoin.net/tapi'
          },
          'www': 'https://www.mercadobitcoin.com.br',
          'doc': ['https://www.mercadobitcoin.com.br/api-doc', 'https://www.mercadobitcoin.com.br/trade-api']
        },
        'api': {
          'public': {
            'get': ['{coin}/orderbook/', // last slash critical
            '{coin}/ticker/', '{coin}/trades/', '{coin}/trades/{from}/', '{coin}/trades/{from}/{to}', '{coin}/day-summary/{year}/{month}/{day}/']
          },
          'private': {
            'post': ['cancel_order', 'get_account_info', 'get_order', 'get_withdrawal', 'list_system_messages', 'list_orders', 'list_orderbook', 'place_buy_order', 'place_sell_order', 'withdraw_coin']
          }
        },
        'markets': {
          'BTC/BRL': {
            'id': 'BRLBTC',
            'symbol': 'BTC/BRL',
            'base': 'BTC',
            'quote': 'BRL',
            'suffix': 'Bitcoin'
          },
          'LTC/BRL': {
            'id': 'BRLLTC',
            'symbol': 'LTC/BRL',
            'base': 'LTC',
            'quote': 'BRL',
            'suffix': 'Litecoin'
          },
          'BCH/BRL': {
            'id': 'BRLBCH',
            'symbol': 'BCH/BRL',
            'base': 'BCH',
            'quote': 'BRL',
            'suffix': 'BCash'
          }
        },
        'fees': {
          'trading': {
            'maker': 0.3 / 100,
            'taker': 0.7 / 100
          }
        }
      });
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(symbol) {
        var params,
            market,
            orderbook,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                market = this.market(symbol);
                _context.next = 4;
                return this.publicGetCoinOrderbook(this.extend({
                  'coin': market['base']
                }, params));

              case 4:
                orderbook = _context.sent;
                return _context.abrupt("return", this.parseOrderBook(orderbook));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            market,
            response,
            ticker,
            timestamp,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                market = this.market(symbol);
                _context2.next = 4;
                return this.publicGetCoinTicker(this.extend({
                  'coin': market['base']
                }, params));

              case 4:
                response = _context2.sent;
                ticker = response['ticker'];
                timestamp = parseInt(ticker['date']) * 1000;
                return _context2.abrupt("return", {
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

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': trade['tid'].toString(),
        'order': undefined,
        'type': undefined,
        'side': trade['type'],
        'price': trade['price'],
        'amount': trade['amount']
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                since = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : undefined;
                limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : undefined;
                params = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetCoinTrades(this.extend({
                  'coin': market['base']
                }, params));

              case 6:
                response = _context3.sent;
                return _context3.abrupt("return", this.parseTrades(response, market, since, limit));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
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
      _regeneratorRuntime.mark(function _callee4() {
        var params,
            response,
            balances,
            result,
            currencies,
            i,
            currency,
            lowercase,
            account,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.next = 3;
                return this.privatePostGetAccountInfo();

              case 3:
                response = _context4.sent;
                balances = response['response_data']['balance'];
                result = {
                  'info': response
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = this.account();

                  if (lowercase in balances) {
                    account['free'] = parseFloat(balances[lowercase]['available']);
                    account['total'] = parseFloat(balances[lowercase]['total']);
                    account['used'] = account['total'] - account['free'];
                  }

                  result[currency] = account;
                }

                return _context4.abrupt("return", this.parseBalance(result));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
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
      _regeneratorRuntime.mark(function _callee5(symbol, type, side, amount) {
        var price,
            params,
            method,
            order,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                params = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : {};

                if (!(type == 'market')) {
                  _context5.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                method = 'privatePostPlace' + this.capitalize(side) + 'Order';
                order = {
                  'coin_pair': this.marketId(symbol),
                  'quantity': amount,
                  'limit_price': price
                };
                _context5.next = 8;
                return this[method](this.extend(order, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", {
                  'info': response,
                  'id': response['response_data']['order']['order_id'].toString()
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
            market,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};

                if (symbol) {
                  _context6.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');

              case 4:
                _context6.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                _context6.next = 9;
                return this.privatePostCancelOrder(this.extend({
                  'coin_pair': market['id'],
                  'order_id': id
                }, params));

              case 9:
                return _context6.abrupt("return", _context6.sent);

              case 10:
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = undefined;
      if ('order_type' in order) side = order['order_type'] == 1 ? 'buy' : 'sell';
      var status = order['status'];
      var symbol = undefined;

      if (!market) {
        if ('coin_pair' in order) if (order['coin_pair'] in this.markets_by_id) market = this.markets_by_id[order['coin_pair']];
      }

      if (market) symbol = market['symbol'];
      var timestamp = undefined;
      if ('created_timestamp' in order) timestamp = parseInt(order['created_timestamp']) * 1000;
      if ('updated_timestamp' in order) timestamp = parseInt(order['updated_timestamp']) * 1000;
      var fee = {
        'cost': parseFloat(order['fee']),
        'currency': market['quote']
      };
      var price = this.safeFloat(order, 'limit_price'); // price = this.safeFloat (order, 'executed_price_avg', price);

      var average = this.safeFloat(order, 'executed_price_avg');
      var amount = this.safeFloat(order, 'quantity');
      var filled = this.safeFloat(order, 'executed_quantity');
      var remaining = amount - filled;
      var cost = amount * average;
      var result = {
        'info': order,
        'id': order['order_id'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': 'limit',
        'side': side,
        'price': price,
        'cost': cost,
        'average': average,
        'amount': amount,
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
      _regeneratorRuntime.mark(function _callee7(id) {
        var symbol,
            params,
            market,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};

                if (symbol) {
                  _context7.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');

              case 4:
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                response = undefined;
                _context7.next = 10;
                return this.privatePostGetOrder(this.extend({
                  'coin_pair': market['id'],
                  'order_id': parseInt(id)
                }, params));

              case 10:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseOrder(response['response_data']['order']));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(currency, amount, address) {
        var params,
            request,
            account_ref,
            tx_fee,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                request = {
                  'coin': currency,
                  'quantity': amount.toFixed(10),
                  'address': address
                };

                if (!(currency == 'BRL')) {
                  _context8.next = 10;
                  break;
                }

                account_ref = 'account_ref' in params;

                if (account_ref) {
                  _context8.next = 8;
                  break;
                }

                throw new ExchangeError(this.id + ' requires account_ref parameter to withdraw ' + currency);

              case 8:
                _context8.next = 14;
                break;

              case 10:
                if (!(currency != 'LTC')) {
                  _context8.next = 14;
                  break;
                }

                tx_fee = 'tx_fee' in params;

                if (tx_fee) {
                  _context8.next = 14;
                  break;
                }

                throw new ExchangeError(this.id + ' requires tx_fee parameter to withdraw ' + currency);

              case 14:
                _context8.next = 16;
                return this.privatePostWithdrawCoin(this.extend(request, params));

              case 16:
                response = _context8.sent;
                return _context8.abrupt("return", {
                  'info': response,
                  'id': response['response_data']['withdrawal']['id']
                });

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function withdraw(_x10, _x11, _x12) {
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
      var url = this.urls['api'][api] + '/';

      if (api == 'public') {
        url += this.implodeParams(path, params);
      } else {
        this.checkRequiredCredentials();
        url += this.version + '/';
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'tapi_method': path,
          'tapi_nonce': nonce
        }, params));
        var auth = '/tapi/' + this.version + '/' + '?' + body;
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'TAPI-ID': this.apiKey,
          'TAPI-MAC': this.hmac(this.encode(auth), this.encode(this.secret), 'sha512')
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
                api = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'public';
                method = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'GET';
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                headers = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                body = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : undefined;
                _context9.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context9.sent;

                if (!('error_message' in response)) {
                  _context9.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 10:
                return _context9.abrupt("return", response);

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function request(_x13) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return mercado;
}(Exchange);