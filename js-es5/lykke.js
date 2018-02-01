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

var Exchange = require('./base/Exchange'); //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(lykke, _Exchange);

  function lykke() {
    _classCallCheck(this, lykke);

    return _possibleConstructorReturn(this, (lykke.__proto__ || _Object$getPrototypeOf(lykke)).apply(this, arguments));
  }

  _createClass(lykke, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(lykke.prototype.__proto__ || _Object$getPrototypeOf(lykke.prototype), "describe", this).call(this), {
        'id': 'lykke',
        'name': 'Lykke',
        'countries': 'CH',
        'version': 'v1',
        'rateLimit': 200,
        'has': {
          'CORS': false,
          'fetchOHLCV': false,
          'fetchTrades': false
        },
        'requiredCredentials': {
          'apiKey': true,
          'secret': false
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/34487620-3139a7b0-efe6-11e7-90f5-e520cef74451.jpg',
          'api': {
            'mobile': 'https://api.lykkex.com/api',
            'public': 'https://hft-api.lykke.com/api',
            'private': 'https://hft-api.lykke.com/api',
            'test': {
              'mobile': 'https://api.lykkex.com/api',
              'public': 'https://hft-service-dev.lykkex.net/api',
              'private': 'https://hft-service-dev.lykkex.net/api'
            }
          },
          'www': 'https://www.lykke.com',
          'doc': ['https://hft-api.lykke.com/swagger/ui/', 'https://www.lykke.com/lykke_api'],
          'fees': 'https://www.lykke.com/trading-conditions'
        },
        'api': {
          'mobile': {
            'get': ['AllAssetPairRates/{market}']
          },
          'public': {
            'get': ['AssetPairs', 'AssetPairs/{id}', 'IsAlive', 'OrderBooks', 'OrderBooks/{AssetPairId}']
          },
          'private': {
            'get': ['Orders', 'Orders/{id}', 'Wallets'],
            'post': ['Orders/limit', 'Orders/market', 'Orders/{id}/Cancel']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'maker': 0.0010,
            'taker': 0.0019
          },
          'funding': {
            'tierBased': false,
            'percentage': false,
            'withdraw': {
              'BTC': 0.001
            },
            'deposit': {
              'BTC': 0
            }
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
            balances,
            result,
            i,
            balance,
            currency,
            total,
            used,
            free,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.loadMarkets();

              case 3:
                _context.next = 5;
                return this.privateGetWallets();

              case 5:
                balances = _context.sent;
                result = {
                  'info': balances
                };

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];
                  currency = balance['AssetId'];
                  total = balance['Balance'];
                  used = balance['Reserved'];
                  free = total - used;
                  result[currency] = {
                    'free': free,
                    'used': used,
                    'total': total
                  };
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
    key: "cancelOrder",
    value: function () {
      var _cancelOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(id) {
        var symbol,
            params,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                symbol = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : undefined;
                params = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return this.privatePostOrdersIdCancel({
                  'id': id
                });

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function cancelOrder(_x) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol, type, side, amount) {
        var price,
            params,
            market,
            query,
            method,
            result,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                price = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : undefined;
                params = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : {};
                _context3.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                query = {
                  'AssetPairId': market['id'],
                  'OrderAction': this.capitalize(side),
                  'Volume': amount
                };

                if (type === 'market') {
                  query['Asset'] = side === 'buy' ? market['base'] : market['quote'];
                } else if (type === 'limit') {
                  query['Price'] = price;
                }

                method = 'privatePostOrders' + this.capitalize(type);
                _context3.next = 10;
                return this[method](this.extend(query, params));

              case 10:
                result = _context3.sent;
                return _context3.abrupt("return", {
                  'id': undefined,
                  'info': result
                });

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function createOrder(_x2, _x3, _x4, _x5) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var markets, result, i, market, id, base, quote, symbol, precision;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.publicGetAssetPairs();

              case 2:
                markets = _context4.sent;
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['Id'];
                  base = market['BaseAssetId'];
                  quote = market['QuotingAssetId'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = market['Name'];
                  precision = {
                    'amount': market['Accuracy'],
                    'price': market['InvertedAccuracy']
                  };
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': true,
                    'info': market,
                    'lot': Math.pow(10, -precision['amount']),
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': Math.pow(10, -precision['amount']),
                        'max': Math.pow(10, precision['amount'])
                      },
                      'price': {
                        'min': Math.pow(10, -precision['price']),
                        'max': Math.pow(10, precision['price'])
                      }
                    }
                  }));
                }

                return _context4.abrupt("return", result);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchMarkets() {
        return _fetchMarkets.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      ticker = ticker['Result'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': undefined,
        'low': undefined,
        'bid': parseFloat(ticker['Rate']['Bid']),
        'ask': parseFloat(ticker['Rate']['Ask']),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': undefined,
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': undefined,
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            market,
            ticker,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context5.next = 6;
                return this.mobileGetAllAssetPairRatesMarket(this.extend({
                  'market': market['id']
                }, params));

              case 6:
                ticker = _context5.sent;
                return _context5.abrupt("return", this.parseTicker(ticker, market));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchTicker(_x6) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderStatus",
    value: function parseOrderStatus(status) {
      if (status === 'Pending') {
        return 'open';
      } else if (status === 'InOrderBook') {
        return 'open';
      } else if (status === 'Processing') {
        return 'open';
      } else if (status === 'Matched') {
        return 'closed';
      } else if (status === 'Cancelled') {
        return 'canceled';
      } else if (status === 'NotEnoughFunds') {
        return 'NotEnoughFunds';
      } else if (status === 'NoLiquidity') {
        return 'NoLiquidity';
      } else if (status === 'UnknownAsset') {
        return 'UnknownAsset';
      } else if (status === 'LeadToNegativeSpread') {
        return 'LeadToNegativeSpread';
      }

      return status;
    }
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var status = this.parseOrderStatus(order['Status']);
      var symbol = undefined;

      if (!market) {
        if ('AssetPairId' in order) if (order['AssetPairId'] in this.markets_by_id) market = this.markets_by_id[order['AssetPairId']];
      }

      if (market) symbol = market['symbol'];
      var timestamp = undefined;

      if ('LastMatchTime' in order) {
        timestamp = this.parse8601(order['LastMatchTime']);
      } else if ('Registered' in order) {
        timestamp = this.parse8601(order['Registered']);
      } else if ('CreatedAt' in order) {
        timestamp = this.parse8601(order['CreatedAt']);
      }

      var price = this.safeFloat(order, 'Price');
      var amount = this.safeFloat(order, 'Volume');
      var remaining = this.safeFloat(order, 'RemainingVolume');
      var filled = amount - remaining;
      var cost = filled * price;
      var result = {
        'info': order,
        'id': order['Id'],
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': undefined,
        'side': undefined,
        'price': price,
        'cost': cost,
        'average': undefined,
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'status': status,
        'fee': undefined
      };
      return result;
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(id) {
        var symbol,
            params,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                _context6.next = 4;
                return this.privateGetOrdersId(this.extend({
                  'id': id
                }, params));

              case 4:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseOrder(response));

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchOrder(_x7) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var symbol,
            since,
            limit,
            params,
            response,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : undefined;
                since = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : undefined;
                params = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
                _context7.next = 6;
                return this.privateGetOrders();

              case 6:
                response = _context7.sent;
                return _context7.abrupt("return", this.parseOrders(response, undefined, since, limit));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8() {
        var symbol,
            since,
            limit,
            params,
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
                return this.privateGetOrders(this.extend({
                  'status': 'InOrderBook'
                }, params));

              case 6:
                response = _context8.sent;
                return _context8.abrupt("return", this.parseOrders(response, undefined, since, limit));

              case 8:
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
                return this.privateGetOrders(this.extend({
                  'status': 'Matched'
                }, params));

              case 6:
                response = _context9.sent;
                return _context9.abrupt("return", this.parseOrders(response, undefined, since, limit));

              case 8:
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10() {
        var symbol,
            params,
            response,
            orderbook,
            timestamp,
            i,
            side,
            _timestamp,
            _args10 = arguments;

        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : undefined;
                params = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
                _context10.next = 4;
                return this.loadMarkets();

              case 4:
                _context10.next = 6;
                return this.publicGetOrderBooksAssetPairId(this.extend({
                  'AssetPairId': this.marketId(symbol)
                }, params));

              case 6:
                response = _context10.sent;
                orderbook = {
                  'timestamp': undefined,
                  'bids': [],
                  'asks': []
                };
                timestamp = undefined;

                for (i = 0; i < response.length; i++) {
                  side = response[i];

                  if (side['IsBuy']) {
                    orderbook['bids'] = this.arrayConcat(orderbook['bids'], side['Prices']);
                  } else {
                    orderbook['asks'] = this.arrayConcat(orderbook['asks'], side['Prices']);
                  }

                  _timestamp = this.parse8601(side['Timestamp']);

                  if (!orderbook['timestamp']) {
                    orderbook['timestamp'] = _timestamp;
                  } else {
                    orderbook['timestamp'] = Math.max(orderbook['timestamp'], _timestamp);
                  }
                }

                if (!timestamp) timestamp = this.milliseconds();
                return _context10.abrupt("return", this.parseOrderBook(orderbook, orderbook['timestamp'], 'bids', 'asks', 'Price', 'Volume'));

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function fetchOrderBook() {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseBidAsk",
    value: function parseBidAsk(bidask) {
      var priceKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var amountKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var price = parseFloat(bidask[priceKey]);
      var amount = parseFloat(bidask[amountKey]);
      if (amount < 0) amount = -amount;
      return [price, amount];
    }
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'][api] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api === 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else if (api === 'private') {
        if (method === 'GET') if (_Object$keys(query).length) url += '?' + this.urlencode(query);
        this.checkRequiredCredentials();
        headers = {
          'api-key': this.apiKey,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        if (method === 'POST') if (_Object$keys(params).length) body = this.json(params);
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }]);

  return lykke;
}(Exchange);