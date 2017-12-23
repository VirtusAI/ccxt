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
    ExchangeError = _require.ExchangeError,
    AuthenticationError = _require.AuthenticationError,
    NotSupported = _require.NotSupported,
    InvalidOrder = _require.InvalidOrder,
    OrderNotFound = _require.OrderNotFound; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(livecoin, _Exchange);

  function livecoin() {
    _classCallCheck(this, livecoin);

    return _possibleConstructorReturn(this, (livecoin.__proto__ || _Object$getPrototypeOf(livecoin)).apply(this, arguments));
  }

  _createClass(livecoin, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(livecoin.prototype.__proto__ || _Object$getPrototypeOf(livecoin.prototype), "describe", this).call(this), {
        'id': 'livecoin',
        'name': 'LiveCoin',
        'countries': ['US', 'UK', 'RU'],
        'rateLimit': 1000,
        'hasCORS': false,
        // obsolete metainfo interface
        'hasFetchTickers': true,
        'hasFetchCurrencies': true,
        // new metainfo interface
        'has': {
          'fetchTickers': true,
          'fetchCurrencies': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27980768-f22fc424-638a-11e7-89c9-6010a54ff9be.jpg',
          'api': 'https://api.livecoin.net',
          'www': 'https://www.livecoin.net',
          'doc': 'https://www.livecoin.net/api?lang=en'
        },
        'api': {
          'public': {
            'get': ['exchange/all/order_book', 'exchange/last_trades', 'exchange/maxbid_minask', 'exchange/order_book', 'exchange/restrictions', 'exchange/ticker', // omit params to get all tickers at once
            'info/coinInfo']
          },
          'private': {
            'get': ['exchange/client_orders', 'exchange/order', 'exchange/trades', 'exchange/commission', 'exchange/commissionCommonInfo', 'payment/balances', 'payment/balance', 'payment/get/address', 'payment/history/size', 'payment/history/transactions'],
            'post': ['exchange/buylimit', 'exchange/buymarket', 'exchange/cancellimit', 'exchange/selllimit', 'exchange/sellmarket', 'payment/out/capitalist', 'payment/out/card', 'payment/out/coin', 'payment/out/okpay', 'payment/out/payeer', 'payment/out/perfectmoney', 'payment/voucher/amount', 'payment/voucher/make', 'payment/voucher/redeem']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'maker': 0.18 / 100,
            'taker': 0.18 / 100
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
        var markets, restrictions, restrictionsById, result, p, market, id, symbol, _symbol$split, _symbol$split2, base, quote, coinRestrictions, precision, limits;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetExchangeTicker();

              case 2:
                markets = _context.sent;
                _context.next = 5;
                return this.publicGetExchangeRestrictions();

              case 5:
                restrictions = _context.sent;
                restrictionsById = this.indexBy(restrictions['restrictions'], 'currencyPair');
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  id = market['symbol'];
                  symbol = id;
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  coinRestrictions = this.safeValue(restrictionsById, symbol);
                  precision = {
                    'price': 5,
                    'amount': 8,
                    'cost': 8
                  };
                  limits = {
                    'amount': {
                      'min': Math.pow(10, -precision['amount']),
                      'max': Math.pow(10, precision['amount'])
                    }
                  };

                  if (coinRestrictions) {
                    precision['price'] = this.safeInteger(coinRestrictions, 'priceScale', 5);
                    limits['amount']['min'] = this.safeFloat(coinRestrictions, 'minLimitQuantity', limits['amount']['min']);
                  }

                  limits['price'] = {
                    'min': Math.pow(10, -precision['price']),
                    'max': Math.pow(10, precision['price'])
                  };
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'precision': precision,
                    'limits': limits,
                    'info': market
                  }));
                }

                return _context.abrupt("return", result);

              case 10:
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
            active,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.next = 3;
                return this.publicGetInfoCoinInfo(params);

              case 3:
                response = _context2.sent;
                currencies = response['info'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['symbol']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  code = this.commonCurrencyCode(id);
                  precision = 8; // default precision, todo: fix "magic constants"

                  active = currency['walletStatus'] == 'normal';
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['name'],
                    'active': active,
                    'status': 'ok',
                    'fee': currency['withdrawFee'],
                    // todo: redesign
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': currency['minOrderAmount'],
                        'max': Math.pow(10, precision)
                      },
                      'price': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'cost': {
                        'min': currency['minOrderAmount'],
                        'max': undefined
                      },
                      'withdraw': {
                        'min': currency['minWithdrawAmount'],
                        'max': Math.pow(10, precision)
                      },
                      'deposit': {
                        'min': currency['minDepositAmount'],
                        'max': undefined
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
            balances,
            result,
            b,
            balance,
            currency,
            account,
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
                return this.privateGetPaymentBalances();

              case 5:
                balances = _context3.sent;
                result = {
                  'info': balances
                };

                for (b = 0; b < balances.length; b++) {
                  balance = balances[b];
                  currency = balance['currency'];
                  account = undefined;
                  if (currency in result) account = result[currency];else account = this.account();
                  if (balance['type'] == 'total') account['total'] = parseFloat(balance['value']);
                  if (balance['type'] == 'available') account['free'] = parseFloat(balance['value']);
                  if (balance['type'] == 'trade') account['used'] = parseFloat(balance['value']);
                  result[currency] = account;
                }

                return _context3.abrupt("return", this.parseBalance(result));

              case 9:
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
    key: "fetchFees",
    value: function () {
      var _fetchFees = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var params,
            commissionInfo,
            commission,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                _context4.next = 5;
                return this.privateGetExchangeCommissionCommonInfo();

              case 5:
                commissionInfo = _context4.sent;
                commission = this.safeFloat(commissionInfo, 'commission');
                return _context4.abrupt("return", {
                  'info': commissionInfo,
                  'maker': commission,
                  'taker': commission,
                  'withdraw': 0.0
                });

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchFees() {
        return _fetchFees.apply(this, arguments);
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
            timestamp,
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
                return this.publicGetExchangeOrderBook(this.extend({
                  'currencyPair': this.marketId(symbol),
                  'groupByPrice': 'false',
                  'depth': 100
                }, params));

              case 5:
                orderbook = _context5.sent;
                timestamp = orderbook['timestamp'];
                return _context5.abrupt("return", this.parseOrderBook(orderbook, timestamp));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var vwap = parseFloat(ticker['vwap']);
      var baseVolume = parseFloat(ticker['volume']);
      var quoteVolume = baseVolume * vwap;
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high']),
        'low': parseFloat(ticker['low']),
        'bid': parseFloat(ticker['best_bid']),
        'ask': parseFloat(ticker['best_ask']),
        'vwap': parseFloat(ticker['vwap']),
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': parseFloat(ticker['last']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': baseVolume,
        'quoteVolume': quoteVolume,
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbols,
            params,
            response,
            tickers,
            ids,
            result,
            i,
            id,
            market,
            symbol,
            ticker,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbols = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : undefined;
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 4;
                return this.loadMarkets();

              case 4:
                _context6.next = 6;
                return this.publicGetExchangeTicker(params);

              case 6:
                response = _context6.sent;
                tickers = this.indexBy(response, 'symbol');
                ids = _Object$keys(tickers);
                result = {};

                for (i = 0; i < ids.length; i++) {
                  id = ids[i];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  ticker = tickers[id];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context6.abrupt("return", result);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
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
      _regeneratorRuntime.mark(function _callee7(symbol) {
        var params,
            market,
            ticker,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                _context7.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context7.next = 6;
                return this.publicGetExchangeTicker(this.extend({
                  'currencyPair': market['id']
                }, params));

              case 6:
                ticker = _context7.sent;
                return _context7.abrupt("return", this.parseTicker(ticker, market));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = trade['time'] * 1000;
      return {
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'id': trade['id'].toString(),
        'order': undefined,
        'type': undefined,
        'side': trade['type'].toLowerCase(),
        'price': trade['price'],
        'amount': trade['quantity']
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(symbol) {
        var since,
            limit,
            params,
            market,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                since = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : undefined;
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                _context8.next = 5;
                return this.loadMarkets();

              case 5:
                market = this.market(symbol);
                _context8.next = 8;
                return this.publicGetExchangeLastTrades(this.extend({
                  'currencyPair': market['id']
                }, params));

              case 8:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.safeInteger(order, 'lastModificationTime');
      if (!timestamp) timestamp = this.parse8601(order['lastModificationTime']);
      var trades = undefined;
      if ('trades' in order) // TODO currently not supported by livecoin
        // trades = this.parseTrades (order['trades'], market, since, limit);
        trades = undefined;
      var status = undefined;

      if (order['orderStatus'] == 'OPEN' || order['orderStatus'] == 'PARTIALLY_FILLED') {
        status = 'open';
      } else if (order['orderStatus'] == 'EXECUTED' || order['orderStatus'] == 'PARTIALLY_FILLED_AND_CANCELLED') {
        status = 'closed';
      } else {
        status = 'canceled';
      }

      var symbol = order['currencyPair'];

      var _symbol$split3 = symbol.split('/'),
          _symbol$split4 = _slicedToArray(_symbol$split3, 2),
          base = _symbol$split4[0],
          quote = _symbol$split4[1];

      var type = undefined;
      var side = undefined;

      if (order['type'].indexOf('MARKET') >= 0) {
        type = 'market';
      } else {
        type = 'limit';
      }

      if (order['type'].indexOf('SELL') >= 0) {
        side = 'sell';
      } else {
        side = 'buy';
      }

      var price = this.safeFloat(order, 'price', 0.0);
      var cost = this.safeFloat(order, 'commissionByTrade', 0.0);
      var remaining = this.safeFloat(order, 'remainingQuantity', 0.0);
      var amount = this.safeFloat(order, 'quantity', remaining);
      var filled = amount - remaining;
      return {
        'info': order,
        'id': order['id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'status': status,
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': price,
        'cost': cost,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'trades': trades,
        'fee': {
          'cost': cost,
          'currency': quote
        }
      };
    }
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9() {
        var symbol,
            since,
            limit,
            params,
            market,
            pair,
            request,
            response,
            result,
            rawOrders,
            i,
            order,
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
                if (symbol) market = this.market(symbol);
                pair = market ? market['id'] : undefined;
                request = {};
                if (pair) request['currencyPair'] = pair;
                if (since) request['issuedFrom'] = parseInt(since);
                if (limit) request['endRow'] = limit - 1;
                _context9.next = 15;
                return this.privateGetExchangeClientOrders(this.extend(request, params));

              case 15:
                response = _context9.sent;
                result = [];
                rawOrders = [];
                if (response['data']) rawOrders = response['data'];

                for (i = 0; i < rawOrders.length; i++) {
                  order = rawOrders[i];
                  result.push(this.parseOrder(order, market));
                }

                return _context9.abrupt("return", result);

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOrders() {
        return _fetchOrders.apply(this, arguments);
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
            result,
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
                return this.fetchOrders(symbol, since, limit, this.extend({
                  'openClosed': 'OPEN'
                }, params));

              case 6:
                result = _context10.sent;
                return _context10.abrupt("return", result);

              case 8:
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
    key: "fetchClosedOrders",
    value: function () {
      var _fetchClosedOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            result,
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
                return this.fetchOrders(symbol, since, limit, this.extend({
                  'openClosed': 'CLOSED'
                }, params));

              case 6:
                result = _context11.sent;
                return _context11.abrupt("return", result);

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12(symbol, type, side, amount) {
        var price,
            params,
            method,
            market,
            order,
            response,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                price = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : undefined;
                params = _args12.length > 5 && _args12[5] !== undefined ? _args12[5] : {};
                _context12.next = 4;
                return this.loadMarkets();

              case 4:
                method = 'privatePostExchange' + this.capitalize(side) + type;
                market = this.market(symbol);
                order = {
                  'quantity': this.amountToPrecision(symbol, amount),
                  'currencyPair': market['id']
                };
                if (type == 'limit') order['price'] = this.priceToPrecision(symbol, price);
                _context12.next = 10;
                return this[method](this.extend(order, params));

              case 10:
                response = _context12.sent;
                return _context12.abrupt("return", {
                  'info': response,
                  'id': response['orderId'].toString()
                });

              case 12:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
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
      _regeneratorRuntime.mark(function _callee13(id) {
        var symbol,
            params,
            market,
            currencyPair,
            response,
            message,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                symbol = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : undefined;
                params = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : {};

                if (symbol) {
                  _context13.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' cancelOrder requires a symbol argument');

              case 4:
                _context13.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                currencyPair = market['id'];
                _context13.next = 10;
                return this.privatePostExchangeCancellimit(this.extend({
                  'orderId': id,
                  'currencyPair': currencyPair
                }, params));

              case 10:
                response = _context13.sent;
                message = this.safeString(response, 'message', this.json(response));

                if (!('success' in response)) {
                  _context13.next = 23;
                  break;
                }

                if (response['success']) {
                  _context13.next = 17;
                  break;
                }

                throw new InvalidOrder(message);

              case 17:
                if (!('cancelled' in response)) {
                  _context13.next = 23;
                  break;
                }

                if (!response['cancelled']) {
                  _context13.next = 22;
                  break;
                }

                return _context13.abrupt("return", response);

              case 22:
                throw new OrderNotFound(message);

              case 23:
                throw new ExchangeError(this.id + ' cancelOrder() failed: ' + this.json(response));

              case 24:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(currency) {
        var params,
            request,
            response,
            address,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                params = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
                request = {
                  'currency': currency
                };
                _context14.next = 4;
                return this.privateGetPaymentGetAddress(this.extend(request, params));

              case 4:
                response = _context14.sent;
                address = this.safeString(response, 'wallet');
                return _context14.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
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
      var url = this.urls['api'] + '/' + path;
      var query = this.urlencode(this.keysort(params));

      if (method == 'GET') {
        if (_Object$keys(params).length) {
          url += '?' + query;
        }
      }

      if (api == 'private') {
        this.checkRequiredCredentials();
        if (method == 'POST') body = query;
        var signature = this.hmac(this.encode(query), this.encode(this.secret), 'sha256');
        headers = {
          'Api-Key': this.apiKey,
          'Sign': signature.toUpperCase(),
          'Content-Type': 'application/x-www-form-urlencoded'
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
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code >= 300) {
        if (body[0] == "{") {
          var response = JSON.parse(body);

          if ('errorCode' in response) {
            var error = response['errorCode'];

            if (error == 1) {
              throw new ExchangeError(this.id + ' ' + this.json(response));
            } else if (error == 2) {
              if ('errorMessage' in response) {
                if (response['errorMessage'] == 'User not found') throw new AuthenticationError(this.id + ' ' + response['errorMessage']);
              } else {
                throw new ExchangeError(this.id + ' ' + this.json(response));
              }
            } else if (error == 10 || error == 11 || error == 12 || error == 20 || error == 30 || error == 101 || error == 102) {
              throw new AuthenticationError(this.id + ' ' + this.json(response));
            } else if (error == 31) {
              throw new NotSupported(this.id + ' ' + this.json(response));
            } else if (error == 32) {
              throw new ExchangeError(this.id + ' ' + this.json(response));
            } else if (error == 100) {
              throw new ExchangeError(this.id + ': Invalid parameters ' + this.json(response));
            } else if (error == 103) {
              throw new InvalidOrder(this.id + ': Invalid currency ' + this.json(response));
            } else if (error == 104) {
              throw new InvalidOrder(this.id + ': Invalid amount ' + this.json(response));
            } else if (error == 105) {
              throw new InvalidOrder(this.id + ': Unable to block funds ' + this.json(response));
            } else {
              throw new ExchangeError(this.id + ' ' + this.json(response));
            }
          }
        }

        throw new ExchangeError(this.id + ' ' + body);
      }
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                api = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 'public';
                method = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : 'GET';
                params = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
                headers = _args15.length > 4 && _args15[4] !== undefined ? _args15[4] : undefined;
                body = _args15.length > 5 && _args15[5] !== undefined ? _args15[5] : undefined;
                _context15.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context15.sent;

                if (!('success' in response)) {
                  _context15.next = 11;
                  break;
                }

                if (response['success']) {
                  _context15.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' error: ' + this.json(response));

              case 11:
                return _context15.abrupt("return", response);

              case 12:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function request(_x10) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return livecoin;
}(Exchange);