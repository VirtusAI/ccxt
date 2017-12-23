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
  _inherits(zaif, _Exchange);

  function zaif() {
    _classCallCheck(this, zaif);

    return _possibleConstructorReturn(this, (zaif.__proto__ || _Object$getPrototypeOf(zaif)).apply(this, arguments));
  }

  _createClass(zaif, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(zaif.prototype.__proto__ || _Object$getPrototypeOf(zaif.prototype), "describe", this).call(this), {
        'id': 'zaif',
        'name': 'Zaif',
        'countries': 'JP',
        'rateLimit': 2000,
        'version': '1',
        'hasCORS': false,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasWithdraw': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766927-39ca2ada-5eeb-11e7-972f-1b4199518ca6.jpg',
          'api': 'https://api.zaif.jp',
          'www': 'https://zaif.jp',
          'doc': ['http://techbureau-api-document.readthedocs.io/ja/latest/index.html', 'https://corp.zaif.jp/api-docs', 'https://corp.zaif.jp/api-docs/api_links', 'https://www.npmjs.com/package/zaif.jp', 'https://github.com/you21979/node-zaif']
        },
        'api': {
          'public': {
            'get': ['depth/{pair}', 'currencies/{pair}', 'currencies/all', 'currency_pairs/{pair}', 'currency_pairs/all', 'last_price/{pair}', 'ticker/{pair}', 'trades/{pair}']
          },
          'private': {
            'post': ['active_orders', 'cancel_order', 'deposit_history', 'get_id_info', 'get_info', 'get_info2', 'get_personal_info', 'trade', 'trade_history', 'withdraw', 'withdraw_history']
          },
          'ecapi': {
            'post': ['createInvoice', 'getInvoice', 'getInvoiceIdsByOrderNumber', 'cancelInvoice']
          },
          'tlapi': {
            'post': ['get_positions', 'position_history', 'active_positions', 'create_position', 'change_position', 'cancel_position']
          },
          'fapi': {
            'get': ['groups/{group_id}', 'last_price/{group_id}/{pair}', 'ticker/{group_id}/{pair}', 'trades/{group_id}/{pair}', 'depth/{group_id}/{pair}']
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
        var markets, result, p, market, id, symbol, _symbol$split, _symbol$split2, base, quote;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetCurrencyPairsAll();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['currency_pair'];
                  symbol = market['name'];
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
                  });
                }

                return _context.abrupt("return", result);

              case 6:
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
            currencies,
            c,
            currency,
            balance,
            uppercase,
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
                return this.privatePostGetInfo();

              case 5:
                response = _context2.sent;
                balances = response['return'];
                result = {
                  'info': balances
                };
                currencies = _Object$keys(balances['funds']);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  balance = balances['funds'][currency];
                  uppercase = currency.toUpperCase();
                  account = {
                    'free': balance,
                    'used': 0.0,
                    'total': balance
                  };

                  if ('deposit' in balances) {
                    if (currency in balances['deposit']) {
                      account['total'] = balances['deposit'][currency];
                      account['used'] = account['total'] - account['free'];
                    }
                  }

                  result[uppercase] = account;
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
            orderbook,
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
                return this.publicGetDepthPair(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                return _context3.abrupt("return", this.parseOrderBook(orderbook));

              case 7:
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
            ticker,
            timestamp,
            vwap,
            baseVolume,
            quoteVolume,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                _context4.next = 5;
                return this.publicGetTickerPair(this.extend({
                  'pair': this.marketId(symbol)
                }, params));

              case 5:
                ticker = _context4.sent;
                timestamp = this.milliseconds();
                vwap = ticker['vwap'];
                baseVolume = ticker['volume'];
                quoteVolume = baseVolume * vwap;
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': ticker['high'],
                  'low': ticker['low'],
                  'bid': ticker['bid'],
                  'ask': ticker['ask'],
                  'vwap': vwap,
                  'open': undefined,
                  'close': undefined,
                  'first': undefined,
                  'last': ticker['last'],
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': baseVolume,
                  'quoteVolume': quoteVolume,
                  'info': ticker
                });

              case 11:
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
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = trade['trade_type'] == 'bid' ? 'buy' : 'sell';
      var timestamp = trade['date'] * 1000;
      var id = this.safeString(trade, 'id');
      id = this.safeString(trade, 'tid', id);
      if (!market) market = this.markets_by_id[trade['currency_pair']];
      return {
        'id': id.toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': side,
        'price': trade['price'],
        'amount': trade['amount']
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                _context5.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context5.next = 8;
                return this.publicGetTradesPair(this.extend({
                  'pair': market['id']
                }, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
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
      _regeneratorRuntime.mark(function _callee6(symbol, type, side, amount) {
        var price,
            params,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                price = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                params = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};
                _context6.next = 4;
                return this.loadMarkets();

              case 4:
                if (!(type == 'market')) {
                  _context6.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 6:
                _context6.next = 8;
                return this.privatePostTrade(this.extend({
                  'currency_pair': this.marketId(symbol),
                  'action': side == 'buy' ? 'bid' : 'ask',
                  'amount': amount,
                  'price': price
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['return']['order_id'].toString()
                });

              case 10:
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
                return this.privatePostCancelOrder(this.extend({
                  'order_id': id
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
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var side = order['action'] == 'bid' ? 'buy' : 'sell';
      var timestamp = parseInt(order['timestamp']) * 1000;
      if (!market) market = this.markets_by_id[order['currency_pair']];
      var price = order['price'];
      var amount = order['amount'];
      return {
        'id': order['id'].toString(),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'status': 'open',
        'symbol': market['symbol'],
        'type': 'limit',
        'side': side,
        'price': price,
        'cost': price * amount,
        'amount': amount,
        'filled': undefined,
        'remaining': undefined,
        'trades': undefined,
        'fee': undefined
      };
    }
  }, {
    key: "parseOrders",
    value: function parseOrders(orders) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var since = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var ids = _Object$keys(orders);

      var result = [];

      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var order = orders[id];
        var extended = this.extend(order, {
          'id': id
        });
        result.push(this.parseOrder(extended, market));
      }

      return this.filterBySinceLimit(result, since, limit);
    }
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : undefined;
                since = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : undefined;
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                request = {// 'is_token': false,
                  // 'is_token_both': false,
                };

                if (symbol) {
                  market = this.market(symbol);
                  request['currency_pair'] = market['id'];
                }

                _context8.next = 11;
                return this.privatePostActiveOrders(this.extend(request, params));

              case 11:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseOrders(response['return'], market, since, limit));

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                symbol = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : undefined;
                since = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : undefined;
                limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : undefined;
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                request = {// 'from': 0,
                  // 'count': 1000,
                  // 'from_id': 0,
                  // 'end_id': 1000,
                  // 'order': 'DESC',
                  // 'since': 1503821051,
                  // 'end': 1503821051,
                  // 'is_token': false,
                };

                if (symbol) {
                  market = this.market(symbol);
                  request['currency_pair'] = market['id'];
                }

                _context9.next = 11;
                return this.privatePostTradeHistory(this.extend(request, params));

              case 11:
                response = _context9.sent;
                return _context9.abrupt("return", this.parseOrders(response['return'], market, since, limit));

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(currency, amount, address) {
        var params,
            result,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.next = 3;
                return this.loadMarkets();

              case 3:
                if (!(currency == 'JPY')) {
                  _context10.next = 5;
                  break;
                }

                throw new ExchangeError(this.id + ' does not allow ' + currency + ' withdrawals');

              case 5:
                _context10.next = 7;
                return this.privatePostWithdraw(this.extend({
                  'currency': currency,
                  'amount': amount,
                  'address': address // 'message': 'Hi!', // XEM only
                  // 'opt_fee': 0.003, // BTC and MONA only

                }, params));

              case 7:
                result = _context10.sent;
                return _context10.abrupt("return", {
                  'info': result,
                  'id': result['return']['txid'],
                  'fee': result['return']['fee']
                });

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function withdraw(_x9, _x10, _x11) {
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
      var url = this.urls['api'] + '/';

      if (api == 'public') {
        url += 'api/' + this.version + '/' + this.implodeParams(path, params);
      } else if (api == 'fapi') {
        url += 'fapi/' + this.version + '/' + this.implodeParams(path, params);
      } else {
        this.checkRequiredCredentials();

        if (api == 'ecapi') {
          url += 'ecapi';
        } else if (api == 'tlapi') {
          url += 'tlapi';
        } else {
          url += 'tapi';
        }

        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'method': path,
          'nonce': nonce
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
      _regeneratorRuntime.mark(function _callee11(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                api = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 'api';
                method = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 'GET';
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                headers = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : undefined;
                body = _args11.length > 5 && _args11[5] !== undefined ? _args11[5] : undefined;
                _context11.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context11.sent;

                if (!('error' in response)) {
                  _context11.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + response['error']);

              case 10:
                if (!('success' in response)) {
                  _context11.next = 13;
                  break;
                }

                if (response['success']) {
                  _context11.next = 13;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 13:
                return _context11.abrupt("return", response);

              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function request(_x12) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return zaif;
}(Exchange);