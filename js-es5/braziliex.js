"use strict"; //  ---------------------------------------------------------------------------

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

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
    ExchangeError = _require.ExchangeError,
    InvalidOrder = _require.InvalidOrder,
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(braziliex, _Exchange);

  function braziliex() {
    _classCallCheck(this, braziliex);

    return _possibleConstructorReturn(this, (braziliex.__proto__ || _Object$getPrototypeOf(braziliex)).apply(this, arguments));
  }

  _createClass(braziliex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(braziliex.prototype.__proto__ || _Object$getPrototypeOf(braziliex.prototype), "describe", this).call(this), {
        'id': 'braziliex',
        'name': 'Braziliex',
        'countries': 'BR',
        'rateLimit': 1000,
        'has': {
          'fetchDepositAddress': true,
          'fetchTickers': true,
          'fetchOpenOrders': true,
          'fetchMyTrades': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/34703593-c4498674-f504-11e7-8d14-ff8e44fb78c1.jpg',
          'api': 'https://braziliex.com/api/v1',
          'www': 'https://braziliex.com/',
          'doc': 'https://braziliex.com/exchange/api.php',
          'fees': 'https://braziliex.com/exchange/fees.php'
        },
        'api': {
          'public': {
            'get': ['currencies', 'ticker', 'ticker/{market}', 'orderbook/{market}', 'tradehistory/{market}']
          },
          'private': {
            'post': ['balance', 'complete_balance', 'open_orders', 'trade_history', 'deposit_address', 'sell', 'buy', 'cancel_order']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.005,
            'taker': 0.005
          }
        },
        'precision': {
          'amount': 8,
          'price': 8
        }
      });
    }
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            currencies,
            ids,
            result,
            i,
            id,
            currency,
            precision,
            uppercase,
            code,
            active,
            status,
            canWithdraw,
            canDeposit,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.publicGetCurrencies(params);

              case 3:
                currencies = _context.sent;
                ids = _Object$keys(currencies);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  currency = currencies[id];
                  precision = currency['decimal'];
                  uppercase = id.toUpperCase();
                  code = this.commonCurrencyCode(uppercase);
                  active = currency['active'] == 1;
                  status = 'ok';

                  if (currency['under_maintenance'] != 0) {
                    active = false;
                    status = 'maintenance';
                  }

                  canWithdraw = currency['is_withdrawal_active'] == 1;
                  canDeposit = currency['is_deposit_active'] == 1;
                  if (!canWithdraw || !canDeposit) active = false;
                  result[code] = {
                    'id': id,
                    'code': code,
                    'name': currency['name'],
                    'active': active,
                    'status': status,
                    'precision': precision,
                    'wallet': {
                      'address': undefined,
                      'extra': undefined,
                      'withdraw': {
                        'active': canWithdraw,
                        'fee': currency['txWithdrawalFee']
                      },
                      'deposit': {
                        'active': canDeposit,
                        'fee': currency['txDepositFee']
                      }
                    },
                    'limits': {
                      'amount': {
                        'min': currency['minAmountTrade'],
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
                        'min': currency['MinWithdrawal'],
                        'max': Math.pow(10, precision)
                      },
                      'deposit': {
                        'min': currency['minDeposit'],
                        'max': undefined
                      }
                    },
                    'info': currency
                  };
                }

                return _context.abrupt("return", result);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var markets, ids, result, i, id, market, _id$split, _id$split2, baseId, quoteId, base, quote, symbol, active, precision, lot;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.publicGetTicker();

              case 2:
                markets = _context2.sent;
                ids = _Object$keys(markets);
                result = [];

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = markets[id];
                  _id$split = id.split('_'), _id$split2 = _slicedToArray(_id$split, 2), baseId = _id$split2[0], quoteId = _id$split2[1];
                  base = baseId.toUpperCase();
                  quote = quoteId.toUpperCase();
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  active = market['active'] == 1;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  lot = Math.pow(10, -precision['amount']);
                  result.push({
                    'id': id,
                    'symbol': symbol.toUpperCase(),
                    'base': base,
                    'quote': quote,
                    'baseId': baseId,
                    'quoteId': quoteId,
                    'active': active,
                    'lot': lot,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': lot,
                        'max': Math.pow(10, precision['amount'])
                      },
                      'price': {
                        'min': Math.pow(10, -precision['price']),
                        'max': Math.pow(10, precision['price'])
                      },
                      'cost': {
                        'min': undefined,
                        'max': undefined
                      }
                    },
                    'info': market
                  });
                }

                return _context2.abrupt("return", result);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchMarkets() {
        return _fetchMarkets.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = market['symbol'];
      var timestamp = ticker['date'];
      ticker = ticker['ticker'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['highestBid24']),
        'low': parseFloat(ticker['lowestAsk24']),
        'bid': parseFloat(ticker['highestBid']),
        'ask': parseFloat(ticker['lowestAsk']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last']),
        'change': parseFloat(ticker['percentChange']),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['baseVolume24']),
        'quoteVolume': parseFloat(ticker['quoteVolume24']),
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
                return this.publicGetTickerMarket(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                ticker = _context3.sent;
                ticker = {
                  'date': this.milliseconds(),
                  'ticker': ticker
                };
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            tickers,
            result,
            timestamp,
            ids,
            i,
            id,
            market,
            symbol,
            ticker,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                symbols = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : undefined;
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                _context4.next = 6;
                return this.publicGetTicker(params);

              case 6:
                tickers = _context4.sent;
                result = {};
                timestamp = this.milliseconds();
                ids = _Object$keys(tickers);

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = {
                    'date': timestamp,
                    'ticker': tickers[id]
                  };
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            orderbook,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.publicGetOrderbookMarket(this.extend({
                  'market': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context5.sent;
                return _context5.abrupt("return", this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount'));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x2) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = undefined;

      if ('date_exec' in trade) {
        timestamp = this.parse8601(trade['date_exec']);
      } else {
        timestamp = this.parse8601(trade['date']);
      }

      var price = parseFloat(trade['price']);
      var amount = parseFloat(trade['amount']);
      var symbol = market['symbol'];
      var cost = parseFloat(trade['total']);
      var orderId = this.safeString(trade, 'order_number');
      return {
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'id': this.safeString(trade, '_id'),
        'order': orderId,
        'type': 'limit',
        'side': trade['type'],
        'price': price,
        'amount': amount,
        'cost': cost,
        'fee': undefined,
        'info': trade
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
            trades,
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
                _context6.next = 8;
                return this.publicGetTradehistoryMarket(this.extend({
                  'market': market['id']
                }, params));

              case 8:
                trades = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7() {
        var params,
            balances,
            result,
            currencies,
            i,
            id,
            balance,
            currency,
            account,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _context7.next = 3;
                return this.loadMarkets();

              case 3:
                _context7.next = 5;
                return this.privatePostCompleteBalance(params);

              case 5:
                balances = _context7.sent;
                result = {
                  'info': balances
                };
                currencies = _Object$keys(balances);

                for (i = 0; i < currencies.length; i++) {
                  id = currencies[i];
                  balance = balances[id];
                  currency = this.commonCurrencyCode(id);
                  account = {
                    'free': parseFloat(balance['available']),
                    'used': 0.0,
                    'total': parseFloat(balance['total'])
                  };
                  account['used'] = account['total'] - account['free'];
                  result[currency] = account;
                }

                return _context7.abrupt("return", this.parseBalance(result));

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchBalance() {
        return _fetchBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (!market) {
        var marketId = this.safeString(order, 'market');
        if (marketId) if (marketId in this.markets_by_id) market = this.markets_by_id[marketId];
      }

      if (market) symbol = market['symbol'];
      var timestamp = this.safeValue(order, 'timestamp');
      if (!timestamp) timestamp = this.parse8601(order['date']);
      var price = parseFloat(order['price']);
      var cost = this.safeFloat(order, 'total', 0.0);
      var amount = this.safeFloat(order, 'amount');
      var filledPercentage = this.safeFloat(order, 'progress');
      var filled = amount * filledPercentage;
      var remaining = this.amountToPrecision(symbol, amount - filled);
      var info = order;
      if ('info' in info) info = order['info'];
      return {
        'id': order['order_number'],
        'datetime': this.iso8601(timestamp),
        'timestamp': timestamp,
        'status': 'open',
        'symbol': symbol,
        'type': 'limit',
        'side': order['type'],
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'trades': undefined,
        'fee': this.safeValue(order, 'fee'),
        'info': info
      };
    }
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol, type, side, amount) {
        var price,
            params,
            market,
            method,
            response,
            success,
            parts,
            feeParts,
            order,
            id,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                price = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                params = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : {};
                _context8.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                method = 'privatePost' + this.capitalize(side);
                _context8.next = 8;
                return this[method](this.extend({
                  'market': market['id'],
                  // 'price': this.priceToPrecision (symbol, price),
                  // 'amount': this.amountToPrecision (symbol, amount),
                  'price': price,
                  'amount': amount
                }, params));

              case 8:
                response = _context8.sent;
                success = this.safeInteger(response, 'success');

                if (!(success != 1)) {
                  _context8.next = 12;
                  break;
                }

                throw new InvalidOrder(this.id + ' ' + this.json(response));

              case 12:
                parts = response['message'].split(' / ');
                parts = parts.slice(1);
                feeParts = parts[5].split(' ');
                order = this.parseOrder({
                  'timestamp': this.milliseconds(),
                  'order_number': response['order_number'],
                  'type': parts[0].toLowerCase(),
                  'market': parts[0].toLowerCase(),
                  'amount': parts[2].split(' ')[1],
                  'price': parts[3].split(' ')[1],
                  'total': parts[4].split(' ')[1],
                  'fee': {
                    'cost': parseFloat(feeParts[1]),
                    'currency': feeParts[2]
                  },
                  'progress': '0.0',
                  'info': response
                }, market);
                id = order['id'];
                this.orders[id] = order;
                return _context8.abrupt("return", order);

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            market,
            result,
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
                market = this.market(symbol);
                _context9.next = 7;
                return this.privatePostCancelOrder(this.extend({
                  'order_number': id,
                  'market': market['id']
                }, params));

              case 7:
                result = _context9.sent;
                return _context9.abrupt("return", result);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            since,
            limit,
            params,
            market,
            orders,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                _context10.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                _context10.next = 9;
                return this.privatePostOpenOrders(this.extend({
                  'market': market['id']
                }, params));

              case 9:
                orders = _context10.sent;
                return _context10.abrupt("return", this.parseOrders(orders['order_open'], market, since, limit));

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchOpenOrders() {
        return _fetchOpenOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            market,
            trades,
            _args11 = arguments;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
                _context11.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                _context11.next = 9;
                return this.privatePostTradeHistory(this.extend({
                  'market': market['id']
                }, params));

              case 9:
                trades = _context11.sent;
                return _context11.abrupt("return", this.parseTrades(trades['trade_history'], market, since, limit));

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(currencyCode) {
        var params,
            currency,
            response,
            address,
            tag,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                params = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
                _context12.next = 3;
                return this.loadMarkets();

              case 3:
                currency = this.currency(currencyCode);
                _context12.next = 6;
                return this.privatePostDepositAddress(this.extend({
                  'currency': currency['id']
                }, params));

              case 6:
                response = _context12.sent;
                address = this.safeString(response, 'deposit_address');

                if (address) {
                  _context12.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchDepositAddress failed: ' + this.last_http_response);

              case 10:
                tag = this.safeString(response, 'payment_id');
                return _context12.abrupt("return", {
                  'currency': currencyCode,
                  'address': address,
                  'tag': tag,
                  'status': 'ok',
                  'info': response
                });

              case 12:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchDepositAddress(_x9) {
        return _fetchDepositAddress.apply(this, arguments);
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
      var url = this.urls['api'] + '/' + api;
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        url += '/' + this.implodeParams(path, params);
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        query = this.extend({
          'command': path,
          'nonce': this.nonce()
        }, query);
        body = this.urlencode(query);
        var signature = this.hmac(this.encode(body), this.encode(this.secret), 'sha512');
        headers = {
          'Content-type': 'application/x-www-form-urlencoded',
          'Key': this.apiKey,
          'Sign': this.decode(signature)
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
      _regeneratorRuntime.mark(function _callee13(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            success,
            message,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                api = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 'public';
                method = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 'GET';
                params = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
                headers = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : undefined;
                body = _args13.length > 5 && _args13[5] !== undefined ? _args13[5] : undefined;
                _context13.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context13.sent;

                if (!('success' in response)) {
                  _context13.next = 15;
                  break;
                }

                success = this.safeInteger(response, 'success');

                if (!(success == 0)) {
                  _context13.next = 15;
                  break;
                }

                message = this.safeString(response, 'message');

                if (!(message == 'Invalid APIKey')) {
                  _context13.next = 14;
                  break;
                }

                throw new AuthenticationError(message);

              case 14:
                throw new ExchangeError(message);

              case 15:
                return _context13.abrupt("return", response);

              case 16:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return braziliex;
}(Exchange);