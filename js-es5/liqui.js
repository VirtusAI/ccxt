'use strict';

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
    DDoSProtection = _require.DDoSProtection,
    InvalidOrder = _require.InvalidOrder,
    AuthenticationError = _require.AuthenticationError;

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
        'rateLimit': 3000,
        'version': '3',
        'userAgent': this.userAgents['chrome'],
        'has': {
          'CORS': false,
          'createMarketOrder': false,
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
            'post': ['getInfo', 'Trade', 'ActiveOrders', 'OrderInfo', 'CancelOrder', 'TradeHistory', 'CoinDepositAddress', 'WithdrawCoin', 'CreateCoupon', 'RedeemCoupon']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.001,
            'taker': 0.0025
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': undefined,
            'deposit': undefined
          }
        },
        'exceptions': {
          '803': InvalidOrder,
          // "Count could not be less than 0.001." (selling below minAmount)
          '804': InvalidOrder,
          // "Count could not be more than 10000." (buying above maxAmount)
          '805': InvalidOrder,
          // "price could not be less than X." (minPrice violation on buy & sell)
          '806': InvalidOrder,
          // "price could not be more than X." (maxPrice violation on buy & sell)
          '807': InvalidOrder,
          // "cost could not be less than X." (minCost violation on buy & sell)
          '831': InsufficientFunds,
          // "Not enougth X to create buy order." (buying with balance.quote < order.cost)
          '832': InsufficientFunds,
          // "Not enougth X to create sell order." (selling with balance.base < order.amount)
          '833': OrderNotFound // "Order with id X was not found." (cancelling non-existent, closed and cancelled order)

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

      if (side === 'sell') {
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
      if (currency === 'XBT') return 'BTC';
      if (currency === 'BCC') return 'BCH';
      if (currency === 'DRK') return 'DASH'; // they misspell DASH as dsh :/

      if (currency === 'DSH') return 'DASH';
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
        var response, markets, keys, result, p, id, market, _getBaseQuoteFromMark, _getBaseQuoteFromMark2, base, quote, symbol, precision, amountLimits, priceLimits, costLimits, limits, hidden, active;

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
                  hidden = this.safeInteger(market, 'hidden');
                  active = hidden === 0;
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

                  if (balances['open_orders'] === 0) {
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
                  'pair': market['id'] // 'limit': 150, // default = 150, max = 2000

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
            symbol,
            market,
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

                // let numIds = this.ids.length;
                // if (numIds > 256)
                //     throw new ExchangeError (this.id + ' fetchTickers() requires symbols argument');
                ids = this.ids.join('-');

                if (!(ids.length > 2083)) {
                  _context4.next = 10;
                  break;
                }

                numIds = this.ids.length;
                throw new ExchangeError(this.id + ' has ' + numIds.toString() + ' symbols exceeding max URL length, you are required to specify a list of symbols in the first argument to fetchTickers');

              case 10:
                _context4.next = 14;
                break;

              case 12:
                ids = this.marketIds(symbols);
                ids = ids.join('-');

              case 14:
                _context4.next = 16;
                return this.publicGetTickerPair(this.extend({
                  'pair': ids
                }, params));

              case 16:
                tickers = _context4.sent;
                result = {};
                keys = _Object$keys(tickers);

                for (k = 0; k < keys.length; k++) {
                  id = keys[k];
                  ticker = tickers[id];
                  symbol = id;
                  market = undefined;

                  if (id in this.markets_by_id) {
                    market = this.markets_by_id[id];
                    symbol = market['symbol'];
                  }

                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context4.abrupt("return", result);

              case 21:
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
      var timestamp = parseInt(trade['timestamp']) * 1000;
      var side = trade['type'];
      if (side === 'ask') side = 'sell';
      if (side === 'bid') side = 'buy';
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

      var isYourOrder = this.safeValue(trade, 'is_your_order');
      var takerOrMaker = 'taker';
      if (typeof isYourOrder !== 'undefined') if (isYourOrder) takerOrMaker = 'maker';
      var fee = this.calculateFee(symbol, type, side, amount, price, takerOrMaker);
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
                if (typeof limit !== 'undefined') request['limit'] = limit;
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
            status,
            filled,
            remaining,
            order,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};

                if (!(type === 'market')) {
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
                timestamp = this.milliseconds();
                price = parseFloat(price);
                amount = parseFloat(amount);
                status = 'open';

                if (id === '0') {
                  id = this.safeString(response['return'], 'init_order_id');
                  status = 'closed';
                }

                filled = this.safeFloat(response['return'], 'received', 0.0);
                remaining = this.safeFloat(response['return'], 'remains', amount);
                order = {
                  'id': id,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'status': status,
                  'symbol': symbol,
                  'type': type,
                  'side': side,
                  'price': price,
                  'cost': price * filled,
                  'amount': amount,
                  'remaining': remaining,
                  'filled': filled,
                  'fee': undefined // 'trades': this.parseTrades (order['trades'], market),

                };
                this.orders[id] = order;
                return _context7.abrupt("return", this.extend({
                  'info': response
                }, order));

              case 22:
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
                request = {};
                idKey = this.getOrderIdKey();
                request[idKey] = id;
                _context8.next = 10;
                return this.privatePostCancelOrder(this.extend(request, params));

              case 10:
                response = _context8.sent;
                if (id in this.orders) this.orders[id]['status'] = 'canceled';
                return _context8.abrupt("return", response);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      var status = this.safeInteger(order, 'status');

      if (status === 0) {
        status = 'open';
      } else if (status === 1) {
        status = 'closed';
      } else if (status === 2 || status === 3) {
        status = 'canceled';
      }

      var timestamp = parseInt(order['timestamp_created']) * 1000;
      var symbol = undefined;
      if (!market) market = this.markets_by_id[order['pair']];
      if (market) symbol = market['symbol'];
      var remaining = undefined;
      var amount = undefined;
      var price = this.safeFloat(order, 'rate');
      var filled = undefined;
      var cost = undefined;

      if ('start_amount' in order) {
        amount = this.safeFloat(order, 'start_amount');
        remaining = this.safeFloat(order, 'amount');
      } else {
        remaining = this.safeFloat(order, 'amount');
        if (id in this.orders) amount = this.orders[id]['amount'];
      }

      if (typeof amount !== 'undefined') {
        if (typeof remaining !== 'undefined') {
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
            request,
            market,
            _market,
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
                _context10.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                market = undefined;

                if (symbol) {
                  _market = this.market(symbol);
                  request['pair'] = _market['id'];
                }

                _context10.next = 11;
                return this.privatePostActiveOrders(this.extend(request, params));

              case 11:
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

                    if (_order['status'] === 'open') {
                      this.orders[id] = this.extend(_order, {
                        'status': 'closed',
                        'cost': _order['amount'] * _order['price'],
                        'filled': _order['amount'],
                        'remaining': 0.0
                      });
                    }
                  }

                  order = this.orders[id];

                  if (symbol) {
                    if (order['symbol'] === symbol) result.push(order);
                  } else {
                    result.push(order);
                  }
                }

                return _context10.abrupt("return", this.filterBySinceLimit(result, since, limit));

              case 20:
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
                  if (orders[i]['status'] === 'open') result.push(orders[i]);
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
                  if (orders[i]['status'] === 'closed') result.push(orders[i]);
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

                if (typeof symbol !== 'undefined') {
                  market = this.market(symbol);
                  request['pair'] = market['id'];
                }

                if (typeof limit !== 'undefined') request['count'] = parseInt(limit);
                if (typeof since !== 'undefined') request['since'] = parseInt(since / 1000);
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
        var tag,
            params,
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
                _context14.next = 6;
                return this.privatePostWithdrawCoin(this.extend({
                  'coinName': currency,
                  'amount': parseFloat(amount),
                  'address': address
                }, params));

              case 6:
                response = _context14.sent;
                return _context14.abrupt("return", {
                  'info': response,
                  'id': response['return']['tId']
                });

              case 8:
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

      if (api === 'private') {
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
    key: "handleErrors",
    value: function handleErrors(httpCode, reason, url, method, headers, body) {
      if (typeof body !== 'string') return; // fallback to default error handler

      if (body.length < 2) return; // fallback to default error handler

      if (body[0] === '{' || body[0] === '[') {
        var response = JSON.parse(body);

        if ('success' in response) {
          //
          // 1 - Liqui only returns the integer 'success' key from their private API
          //
          //     { "success": 1, ... } httpCode === 200
          //     { "success": 0, ... } httpCode === 200
          //
          // 2 - However, exchanges derived from Liqui, can return non-integers
          //
          //     It can be a numeric string
          //     { "sucesss": "1", ... }
          //     { "sucesss": "0", ... }, httpCode >= 200 (can be 403, 502, etc)
          //
          //     Or just a string
          //     { "success": "true", ... }
          //     { "success": "false", ... }, httpCode >= 200
          //
          //     Or a boolean
          //     { "success": true, ... }
          //     { "success": false, ... }, httpCode >= 200
          //
          // 3 - Oversimplified, Python PEP8 forbids comparison operator (===) of different types
          //
          // 4 - We do not want to copy-paste and duplicate the code of this handler to other exchanges derived from Liqui
          //
          // To cover points 1, 2, 3 and 4 combined this handler should work like this:
          //
          var success = this.safeValue(response, 'success', false);

          if (typeof success === 'string') {
            if (success === 'true' || success === '1') success = true;else success = false;
          }

          if (!success) {
            var code = this.safeString(response, 'code');
            var message = this.safeString(response, 'error');
            var feedback = this.id + ' ' + this.json(response);
            var exceptions = this.exceptions;

            if (code in exceptions) {
              throw new exceptions[code](feedback);
            } // need a second error map for these messages, apparently...
            // in fact, we can use the same .exceptions with string-keys to save some loc here


            if (message === 'invalid api key') {
              throw new AuthenticationError(feedback);
            } else if (message === 'api key dont have trade permission') {
              throw new AuthenticationError(feedback);
            } else if (message.indexOf('invalid parameter') >= 0) {
              // errorCode 0, returned on buy(symbol, 0, 0)
              throw new InvalidOrder(feedback);
            } else if (message === 'Requests too often') {
              throw new DDoSProtection(feedback);
            } else if (message === 'not available') {
              throw new DDoSProtection(feedback);
            } else if (message === 'external service unavailable') {
              throw new DDoSProtection(feedback);
            } else {
              throw new ExchangeError(this.id + ' unknown "error" value: ' + this.json(response));
            }
          }
        }
      }
    }
  }]);

  return liqui;
}(Exchange);