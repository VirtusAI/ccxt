"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var Exchange = require('./base/Exchange');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound,
    DDoSProtection = _require.DDoSProtection; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(liqui, _Exchange);

  function liqui() {
    _classCallCheck(this, liqui);

    return _possibleConstructorReturn(this, (liqui.__proto__ || _Object$getPrototypeOf(liqui)).apply(this, arguments));
  }

  _createClass(liqui, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(liqui.prototype.__proto__ || _Object$getPrototypeOf(liqui.prototype), "describe", this).call(this), {
        'id': 'liqui',
        'name': 'Liqui',
        'countries': 'UA',
        'rateLimit': 2500,
        'version': '3',
        'hasCORS': false,
        // obsolete metainfo interface
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchTickers': true,
        'hasFetchMyTrades': true,
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
          'fetchOrder': true,
          'fetchOrders': 'emulated',
          'fetchOpenOrders': true,
          'fetchClosedOrders': 'emulated',
          'fetchTickers': true,
          'fetchMyTrades': true,
          'withdraw': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27982022-75aea828-63a0-11e7-9511-ca584a8edd74.jpg',
          'api': {
            'public': 'https://api.liqui.io/api',
            'private': 'https://api.liqui.io/tapi'
          },
          'www': 'https://liqui.io',
          'doc': 'https://liqui.io/api',
          'fees': 'https://liqui.io/fee'
        },
        'api': {
          'public': {
            'get': ['info', 'ticker/{pair}', 'depth/{pair}', 'trades/{pair}']
          },
          'private': {
            'post': ['getInfo', 'Trade', 'ActiveOrders', 'OrderInfo', 'CancelOrder', 'TradeHistory', 'TransHistory', 'CoinDepositAddress', 'WithdrawCoin', 'CreateCoupon', 'RedeemCoupon']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.001,
            'taker': 0.0025
          },
          'funding': 0.0
        }
      });
    }
  }, {
    key: "calculateFee",
    value: function calculateFee(symbol, type, side, amount, price) {
      var takerOrMaker = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'taker';
      var params = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var market = this.markets[symbol];
      var key = 'quote';
      var rate = market[takerOrMaker];
      var cost = parseFloat(this.costToPrecision(symbol, amount * rate));

      if (side == 'sell') {
        cost *= price;
      } else {
        key = 'base';
      }

      return {
        'type': takerOrMaker,
        'currency': market[key],
        'rate': rate,
        'cost': cost
      };
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (!this.substituteCommonCurrencyCodes) return currency;
      if (currency == 'XBT') return 'BTC';
      if (currency == 'BCC') return 'BCH';
      if (currency == 'DRK') return 'DASH'; // they misspell DASH as dsh :/

      if (currency == 'DSH') return 'DASH';
      return currency;
    }
  }, {
    key: "getBaseQuoteFromMarketId",
    value: function getBaseQuoteFromMarketId(id) {
      var uppercase = id.toUpperCase();

      var _uppercase$split = uppercase.split('_'),
          _uppercase$split2 = _slicedToArray(_uppercase$split, 2),
          base = _uppercase$split2[0],
          quote = _uppercase$split2[1];

      base = this.commonCurrencyCode(base);
      quote = this.commonCurrencyCode(quote);
      return [base, quote];
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, markets, keys, result, p, id, market, _getBaseQuoteFromMark, _getBaseQuoteFromMark2, base, quote, symbol, precision, amountLimits, priceLimits, costLimits, limits, active;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetInfo();

              case 2:
                response = _context.sent;
                markets = response['pairs'];
                keys = _Object$keys(markets);
                result = [];

                for (p = 0; p < keys.length; p++) {
                  id = keys[p];
                  market = markets[id];
                  _getBaseQuoteFromMark = this.getBaseQuoteFromMarketId(id), _getBaseQuoteFromMark2 = _slicedToArray(_getBaseQuoteFromMark, 2), base = _getBaseQuoteFromMark2[0], quote = _getBaseQuoteFromMark2[1];
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': this.safeInteger(market, 'decimal_places'),
                    'price': this.safeInteger(market, 'decimal_places')
                  };
                  amountLimits = {
                    'min': this.safeFloat(market, 'min_amount'),
                    'max': this.safeFloat(market, 'max_amount')
                  };
                  priceLimits = {
                    'min': this.safeFloat(market, 'min_price'),
                    'max': this.safeFloat(market, 'max_price')
                  };
                  costLimits = {
                    'min': this.safeFloat(market, 'min_total')
                  };
                  limits = {
                    'amount': amountLimits,
                    'price': priceLimits,
                    'cost': costLimits
                  };
                  active = market['hidden'] == 0;
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': active,
                    'taker': market['fee'] / 100,
                    'lot': amountLimits['min'],
                    'precision': precision,
                    'limits': limits,
                    'info': market
                  }));
                }

                return _context.abrupt("return", result);

              case 8:
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
            funds,
            currencies,
            c,
            currency,
            uppercase,
            total,
            used,
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
                funds = balances['funds'];
                currencies = _Object$keys(funds);

                for (c = 0; c < currencies.length; c++) {
                  currency = currencies[c];
                  uppercase = currency.toUpperCase();
                  uppercase = this.commonCurrencyCode(uppercase);
                  total = undefined;
                  used = undefined;

                  if (balances['open_orders'] == 0) {
                    total = funds[currency];
                    used = 0.0;
                  }

                  account = {
                    'free': funds[currency],
                    'used': used,
                    'total': total
                  };
                  result[uppercase] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 12:
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
            market,
            response,
            market_id_in_reponse,
            orderbook,
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
                _context3.next = 6;
                return this.publicGetDepthPair(this.extend({
                  'pair': market['id']
                }, params));

              case 6:
                response = _context3.sent;
                market_id_in_reponse = market['id'] in response;

                if (market_id_in_reponse) {
                  _context3.next = 10;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + market['symbol'] + ' order book is empty or not available');

              case 10:
                orderbook = response[market['id']];
                result = this.parseOrderBook(orderbook);
                result['bids'] = this.sortBy(result['bids'], 0, true);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context3.abrupt("return", result);

              case 15:
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
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = ticker['updated'] * 1000;
      var symbol = undefined;
      if (market) symbol = market['symbol'];
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
        'last': this.safeFloat(ticker, 'last'),
        'change': undefined,
        'percentage': undefined,
        'average': this.safeFloat(ticker, 'avg'),
        'baseVolume': this.safeFloat(ticker, 'vol_cur'),
        'quoteVolume': this.safeFloat(ticker, 'vol'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            ids,
            numIds,
            tickers,
            result,
            keys,
            k,
            id,
            ticker,
            market,
            symbol,
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
                ids = undefined;

                if (symbols) {
                  _context4.next = 12;
                  break;
                }

                numIds = this.ids.length;

                if (!(numIds > 256)) {
                  _context4.next = 9;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchTickers() requires symbols argument');

              case 9:
                ids = this.ids;
                _context4.next = 13;
                break;

              case 12:
                ids = this.marketIds(symbols);

              case 13:
                _context4.next = 15;
                return this.publicGetTickerPair(this.extend({
                  'pair': ids.join('-')
                }, params));

              case 15:
                tickers = _context4.sent;
                result = {};
                keys = _Object$keys(tickers);

                for (k = 0; k < keys.length; k++) {
                  id = keys[k];
                  ticker = tickers[id];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 20:
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
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            tickers,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.fetchTickers([symbol], params);

              case 3:
                tickers = _context5.sent;
                return _context5.abrupt("return", tickers[symbol]);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = trade['timestamp'] * 1000;
      var side = trade['type'];
      if (side == 'ask') side = 'sell';
      if (side == 'bid') side = 'buy';
      var price = this.safeFloat(trade, 'price');
      if ('rate' in trade) price = this.safeFloat(trade, 'rate');
      var id = this.safeString(trade, 'tid');
      if ('trade_id' in trade) id = this.safeString(trade, 'trade_id');
      var order = this.safeString(trade, this.getOrderIdKey());

      if ('pair' in trade) {
        var marketId = trade['pair'];
        market = this.markets_by_id[marketId];
      }

      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var amount = trade['amount'];
      var type = 'limit'; // all trades are still limit trades

      var fee = undefined; // this is filled by fetchMyTrades() only
      // is_your_order is always false :\
      // let isYourOrder = this.safeValue (trade, 'is_your_order');
      // let takerOrMaker = 'taker';
      // if (isYourOrder)
      //     takerOrMaker = 'maker';
      // let fee = this.calculateFee (symbol, type, side, amount, price, takerOrMaker);

      return {
        'id': id,
        'order': order,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': type,
        'side': side,
        'price': price,
        'amount': amount,
        'fee': fee,
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
                request = {
                  'pair': market['id']
                };
                if (limit) request['limit'] = limit;
                _context6.next = 10;
                return this.publicGetTradesPair(this.extend(request, params));

              case 10:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response[market['id']], market, since, limit));

              case 12:
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
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
            market,
            request,
            response,
            id,
            timestamp,
            order,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};

                if (!(type == 'market')) {
                  _context7.next = 4;
                  break;
                }

                throw new ExchangeError(this.id + ' allows limit orders only');

              case 4:
                _context7.next = 6;
                return this.loadMarkets();

              case 6:
                market = this.market(symbol);
                request = {
                  'pair': market['id'],
                  'type': side,
                  'amount': this.amountToPrecision(symbol, amount),
                  'rate': this.priceToPrecision(symbol, price)
                };
                _context7.next = 10;
                return this.privatePostTrade(this.extend(request, params));

              case 10:
                response = _context7.sent;
                id = this.safeString(response['return'], this.getOrderIdKey());
                if (!id) id = this.safeString(response['return'], 'init_order_id');
                timestamp = this.milliseconds();
                price = parseFloat(price);
                amount = parseFloat(amount);
                order = {
                  'id': id,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'status': 'open',
                  'symbol': symbol,
                  'type': type,
                  'side': side,
                  'price': price,
                  'cost': price * amount,
                  'amount': amount,
                  'remaining': amount,
                  'filled': 0.0,
                  'fee': undefined // 'trades': this.parseTrades (order['trades'], market),

                };
                this.orders[id] = order;
                return _context7.abrupt("return", this.extend({
                  'info': response
                }, order));

              case 19:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function createOrder(_x4, _x5, _x6, _x7) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "getOrderIdKey",
    value: function getOrderIdKey() {
      return 'order_id';
    }
  }, {
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(id) {
        var symbol,
            params,
            response,
            request,
            idKey,
            message,
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
                response = undefined;
                _context8.prev = 5;
                request = {};
                idKey = this.getOrderIdKey();
                request[idKey] = id;
                _context8.next = 11;
                return this.privatePostCancelOrder(this.extend(request, params));

              case 11:
                response = _context8.sent;
                if (id in this.orders) this.orders[id]['status'] = 'canceled';
                _context8.next = 23;
                break;

              case 15:
                _context8.prev = 15;
                _context8.t0 = _context8["catch"](5);

                if (!this.last_json_response) {
                  _context8.next = 22;
                  break;
                }

                message = this.safeString(this.last_json_response, 'error');

                if (!message) {
                  _context8.next = 22;
                  break;
                }

                if (!(message.indexOf('not found') >= 0)) {
                  _context8.next = 22;
                  break;
                }

                throw new OrderNotFound(this.id + ' cancelOrder() error: ' + this.last_http_response);

              case 22:
                throw _context8.t0;

              case 23:
                return _context8.abrupt("return", response);

              case 24:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[5, 15]]);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var id = order['id'].toString();
      var status = order['status'];

      if (status == 0) {
        status = 'open';
      } else if (status == 1) {
        status = 'closed';
      } else if (status == 2 || status == 3) {
        status = 'canceled';
      }

      var timestamp = parseInt(order['timestamp_created']) * 1000;
      var symbol = undefined;
      if (!market) market = this.markets_by_id[order['pair']];
      if (market) symbol = market['symbol'];
      var remaining = this.safeFloat(order, 'amount');
      var amount = this.safeFloat(order, 'start_amount', remaining);

      if (typeof amount == 'undefined') {
        if (id in this.orders) {
          amount = this.safeFloat(this.orders[id], 'amount');
        }
      }

      var price = this.safeFloat(order, 'rate');
      var filled = undefined;
      var cost = undefined;

      if (typeof amount != 'undefined') {
        if (typeof remaining != 'undefined') {
          filled = amount - remaining;
          cost = price * filled;
        }
      }

      var fee = undefined;
      var result = {
        'info': order,
        'id': id,
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'type': 'limit',
        'side': order['type'],
        'price': price,
        'cost': cost,
        'amount': amount,
        'remaining': remaining,
        'filled': filled,
        'status': status,
        'fee': fee
      };
      return result;
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
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(id) {
        var symbol,
            params,
            response,
            newOrder,
            oldOrder,
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
                _context9.next = 6;
                return this.privatePostOrderInfo(this.extend({
                  'order_id': parseInt(id)
                }, params));

              case 6:
                response = _context9.sent;
                id = id.toString();
                newOrder = this.parseOrder(this.extend({
                  'id': id
                }, response['return'][id]));
                oldOrder = id in this.orders ? this.orders[id] : {};
                this.orders[id] = this.extend(oldOrder, newOrder);
                return _context9.abrupt("return", this.orders[id]);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            openOrders,
            j,
            openOrdersIndexedById,
            cachedOrderIds,
            result,
            k,
            id,
            _order,
            order,
            _args10 = arguments;

        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                since = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : undefined;
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};

                if (symbol) {
                  _context10.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders requires a symbol');

              case 6:
                _context10.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                request = {
                  'pair': market['id']
                };
                _context10.next = 12;
                return this.privatePostActiveOrders(this.extend(request, params));

              case 12:
                response = _context10.sent;
                openOrders = [];
                if ('return' in response) openOrders = this.parseOrders(response['return'], market);

                for (j = 0; j < openOrders.length; j++) {
                  this.orders[openOrders[j]['id']] = openOrders[j];
                }

                openOrdersIndexedById = this.indexBy(openOrders, 'id');
                cachedOrderIds = _Object$keys(this.orders);
                result = [];

                for (k = 0; k < cachedOrderIds.length; k++) {
                  id = cachedOrderIds[k];

                  if (id in openOrdersIndexedById) {
                    this.orders[id] = this.extend(this.orders[id], openOrdersIndexedById[id]);
                  } else {
                    _order = this.orders[id];

                    if (_order['status'] == 'open') {
                      this.orders[id] = this.extend(_order, {
                        'status': 'closed',
                        'cost': _order['amount'] * _order['price'],
                        'filled': _order['amount'],
                        'remaining': 0.0
                      });
                    }
                  }

                  order = this.orders[id];
                  if (order['symbol'] == symbol) result.push(order);
                }

                return _context10.abrupt("return", this.filterBySinceLimit(result, since, limit));

              case 21:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
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
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            orders,
            result,
            i,
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
                return this.fetchOrders(symbol, since, limit, params);

              case 6:
                orders = _context11.sent;
                result = [];

                for (i = 0; i < orders.length; i++) {
                  if (orders[i]['status'] == 'open') result.push(orders[i]);
                }

                return _context11.abrupt("return", result);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
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
      _regeneratorRuntime.mark(function _callee12() {
        var symbol,
            since,
            limit,
            params,
            orders,
            result,
            i,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : undefined;
                since = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : undefined;
                params = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
                _context12.next = 6;
                return this.fetchOrders(symbol, since, limit, params);

              case 6:
                orders = _context12.sent;
                result = [];

                for (i = 0; i < orders.length; i++) {
                  if (orders[i]['status'] == 'closed') result.push(orders[i]);
                }

                return _context12.abrupt("return", result);

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13() {
        var symbol,
            since,
            limit,
            params,
            market,
            request,
            response,
            trades,
            _args13 = arguments;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                symbol = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : undefined;
                since = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : undefined;
                limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : undefined;
                params = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
                _context13.next = 6;
                return this.loadMarkets();

              case 6:
                market = undefined;
                request = {// 'from': 123456789, // trade ID, from which the display starts numerical 0
                  // 'count': 1000, // the number of trades for display numerical, default = 1000
                  // 'from_id': trade ID, from which the display starts numerical 0
                  // 'end_id': trade ID on which the display ends numerical ∞
                  // 'order': 'ASC', // sorting, default = DESC
                  // 'since': 1234567890, // UTC start time, default = 0
                  // 'end': 1234567890, // UTC end time, default = ∞
                  // 'pair': 'eth_btc', // default = all markets
                };

                if (symbol) {
                  market = this.market(symbol);
                  request['pair'] = market['id'];
                }

                if (limit) request['count'] = parseInt(limit);
                if (since) request['since'] = parseInt(since / 1000);
                _context13.next = 13;
                return this.privatePostTradeHistory(this.extend(request, params));

              case 13:
                response = _context13.sent;
                trades = [];
                if ('return' in response) trades = response['return'];
                return _context13.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 17:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee14(currency, amount, address) {
        var params,
            response,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                params = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
                _context14.next = 3;
                return this.loadMarkets();

              case 3:
                _context14.next = 5;
                return this.privatePostWithdrawCoin(this.extend({
                  'coinName': currency,
                  'amount': parseFloat(amount),
                  'address': address
                }, params));

              case 5:
                response = _context14.sent;
                return _context14.abrupt("return", {
                  'info': response,
                  'id': response['return']['tId']
                });

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function withdraw(_x10, _x11, _x12) {
        return _withdraw.apply(this, arguments);
      };
    }()
  }, {
    key: "signBodyWithSecret",
    value: function signBodyWithSecret(body) {
      return this.hmac(this.encode(body), this.encode(this.secret), 'sha512');
    }
  }, {
    key: "getVersionString",
    value: function getVersionString() {
      return '/' + this.version;
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
      var query = this.omit(params, this.extractParams(path));

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        body = this.urlencode(this.extend({
          'nonce': nonce,
          'method': path
        }, query));
        var signature = this.signBodyWithSecret(body);
        headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Key': this.apiKey,
          'Sign': signature
        };
      } else {
        url += this.getVersionString() + '/' + this.implodeParams(path, params);
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
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
                  _context15.next = 23;
                  break;
                }

                if (response['success']) {
                  _context15.next = 23;
                  break;
                }

                if (!(response['error'].indexOf('Not enougth') >= 0)) {
                  _context15.next = 14;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 14:
                if (!(response['error'] == 'Requests too often')) {
                  _context15.next = 18;
                  break;
                }

                throw new DDoSProtection(this.id + ' ' + this.json(response));

              case 18:
                if (!(response['error'] == 'not available' || response['error'] == 'external service unavailable')) {
                  _context15.next = 22;
                  break;
                }

                throw new DDoSProtection(this.id + ' ' + this.json(response));

              case 22:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 23:
                return _context15.abrupt("return", response);

              case 24:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function request(_x13) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return liqui;
}(Exchange);