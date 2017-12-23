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
    AuthenticationError = _require.AuthenticationError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(btcchina, _Exchange);

  function btcchina() {
    _classCallCheck(this, btcchina);

    return _possibleConstructorReturn(this, (btcchina.__proto__ || _Object$getPrototypeOf(btcchina)).apply(this, arguments));
  }

  _createClass(btcchina, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(btcchina.prototype.__proto__ || _Object$getPrototypeOf(btcchina.prototype), "describe", this).call(this), {
        'id': 'btcchina',
        'name': 'BTCChina',
        'countries': 'CN',
        'rateLimit': 1500,
        'version': 'v1',
        'hasCORS': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766368-465b3286-5ed6-11e7-9a11-0f6467e1d82b.jpg',
          'api': {
            'plus': 'https://plus-api.btcchina.com/market',
            'public': 'https://data.btcchina.com/data',
            'private': 'https://api.btcchina.com/api_trade_v1.php'
          },
          'www': 'https://www.btcchina.com',
          'doc': 'https://www.btcchina.com/apidocs'
        },
        'api': {
          'plus': {
            'get': ['orderbook', 'ticker', 'trade']
          },
          'public': {
            'get': ['historydata', 'orderbook', 'ticker', 'trades']
          },
          'private': {
            'post': ['BuyIcebergOrder', 'BuyOrder', 'BuyOrder2', 'BuyStopOrder', 'CancelIcebergOrder', 'CancelOrder', 'CancelStopOrder', 'GetAccountInfo', 'getArchivedOrder', 'getArchivedOrders', 'GetDeposits', 'GetIcebergOrder', 'GetIcebergOrders', 'GetMarketDepth', 'GetMarketDepth2', 'GetOrder', 'GetOrders', 'GetStopOrder', 'GetStopOrders', 'GetTransactions', 'GetWithdrawal', 'GetWithdrawals', 'RequestWithdrawal', 'SellIcebergOrder', 'SellOrder', 'SellOrder2', 'SellStopOrder']
          }
        },
        'markets': {
          'BTC/CNY': {
            'id': 'btccny',
            'symbol': 'BTC/CNY',
            'base': 'BTC',
            'quote': 'CNY',
            'api': 'public',
            'plus': false
          },
          'LTC/CNY': {
            'id': 'ltccny',
            'symbol': 'LTC/CNY',
            'base': 'LTC',
            'quote': 'CNY',
            'api': 'public',
            'plus': false
          },
          'LTC/BTC': {
            'id': 'ltcbtc',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'api': 'public',
            'plus': false
          },
          'BCH/CNY': {
            'id': 'bcccny',
            'symbol': 'BCH/CNY',
            'base': 'BCH',
            'quote': 'CNY',
            'api': 'plus',
            'plus': true
          },
          'ETH/CNY': {
            'id': 'ethcny',
            'symbol': 'ETH/CNY',
            'base': 'ETH',
            'quote': 'CNY',
            'api': 'plus',
            'plus': true
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
        var markets, result, keys, p, key, market, parts, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetTicker({
                  'market': 'all'
                });

              case 2:
                markets = _context.sent;
                result = [];
                keys = _Object$keys(markets);

                for (p = 0; p < keys.length; p++) {
                  key = keys[p];
                  market = markets[key];
                  parts = key.split('_');
                  id = parts[1];
                  base = id.slice(0, 3);
                  quote = id.slice(3, 6);
                  base = base.toUpperCase();
                  quote = quote.toUpperCase();
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market
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
            currencies,
            i,
            currency,
            lowercase,
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
                balances = response['result'];
                result = {
                  'info': balances
                };
                currencies = _Object$keys(this.currencies);

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  lowercase = currency.toLowerCase();
                  account = this.account();
                  if (lowercase in balances['balance']) account['total'] = parseFloat(balances['balance'][lowercase]['amount']);
                  if (lowercase in balances['frozen']) account['used'] = parseFloat(balances['frozen'][lowercase]['amount']);
                  account['free'] = account['total'] - account['used'];
                  result[currency] = account;
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
    key: "createMarketRequest",
    value: function createMarketRequest(market) {
      var request = {};
      var field = market['plus'] ? 'symbol' : 'market';
      request[field] = market['id'];
      return request;
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
            method,
            request,
            orderbook,
            timestamp,
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
                method = market['api'] + 'GetOrderbook';
                request = this.createMarketRequest(market);
                _context3.next = 8;
                return this[method](this.extend(request, params));

              case 8:
                orderbook = _context3.sent;
                timestamp = orderbook['date'] * 1000;
                result = this.parseOrderBook(orderbook, timestamp);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context3.abrupt("return", result);

              case 13:
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
    value: function parseTicker(ticker, market) {
      var timestamp = ticker['date'] * 1000;
      return {
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['high']),
        'low': parseFloat(ticker['low']),
        'bid': parseFloat(ticker['buy']),
        'ask': parseFloat(ticker['sell']),
        'vwap': parseFloat(ticker['vwap']),
        'open': parseFloat(ticker['open']),
        'close': parseFloat(ticker['prev_close']),
        'first': undefined,
        'last': parseFloat(ticker['last']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['vol']),
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "parseTickerPlus",
    value: function parseTickerPlus(ticker, market) {
      var timestamp = ticker['Timestamp'];
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['High']),
        'low': parseFloat(ticker['Low']),
        'bid': parseFloat(ticker['BidPrice']),
        'ask': parseFloat(ticker['AskPrice']),
        'vwap': undefined,
        'open': parseFloat(ticker['Open']),
        'close': parseFloat(ticker['PrevCls']),
        'first': undefined,
        'last': parseFloat(ticker['Last']),
        'change': undefined,
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['Volume24H']),
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            market,
            method,
            request,
            tickers,
            ticker,
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
                method = market['api'] + 'GetTicker';
                request = this.createMarketRequest(market);
                _context4.next = 8;
                return this[method](this.extend(request, params));

              case 8:
                tickers = _context4.sent;
                ticker = tickers['ticker'];

                if (!market['plus']) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", this.parseTickerPlus(ticker, market));

              case 12:
                return _context4.abrupt("return", this.parseTicker(ticker, market));

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
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var timestamp = parseInt(trade['date']) * 1000;
      return {
        'id': trade['tid'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': undefined,
        'price': trade['price'],
        'amount': trade['amount']
      };
    }
  }, {
    key: "parseTradePlus",
    value: function parseTradePlus(trade, market) {
      var timestamp = this.parse8601(trade['timestamp']);
      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': trade['side'].toLowerCase(),
        'price': trade['price'],
        'amount': trade['size']
      };
    }
  }, {
    key: "parseTradesPlus",
    value: function parseTradesPlus(trades) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var result = [];

      for (var i = 0; i < trades.length; i++) {
        result.push(this.parseTradePlus(trades[i], market));
      }

      return result;
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
            method,
            request,
            now,
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
                method = market['api'] + 'GetTrade';
                request = this.createMarketRequest(market);

                if (market['plus']) {
                  now = this.milliseconds();
                  request['start_time'] = now - 86400 * 1000;
                  request['end_time'] = now;
                } else {
                  method += 's'; // trades vs trade
                }

                _context5.next = 11;
                return this[method](this.extend(request, params));

              case 11:
                response = _context5.sent;

                if (!market['plus']) {
                  _context5.next = 14;
                  break;
                }

                return _context5.abrupt("return", this.parseTradesPlus(response['trades'], market));

              case 14:
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 15:
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
            market,
            method,
            order,
            id,
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
                market = this.market(symbol);
                method = 'privatePost' + this.capitalize(side) + 'Order2';
                order = {};
                id = market['id'].toUpperCase();

                if (type == 'market') {
                  order['params'] = [undefined, amount, id];
                } else {
                  order['params'] = [price, amount, id];
                }

                _context6.next = 11;
                return this[method](this.extend(order, params));

              case 11:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['id']
                });

              case 13:
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
            market,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                symbol = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : undefined;
                params = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
                _context7.next = 4;
                return this.loadMarkets();

              case 4:
                market = params['market']; // TODO fixme

                _context7.next = 7;
                return this.privatePostCancelOrder(this.extend({
                  'params': [id, market]
                }, params));

              case 7:
                return _context7.abrupt("return", _context7.sent);

              case 8:
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
    key: "nonce",
    value: function nonce() {
      return this.microseconds();
    }
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'][api] + '/' + path;

      if (api == 'private') {
        this.checkRequiredCredentials();
        var p = [];
        if ('params' in params) p = params['params'];
        var nonce = this.nonce();
        var request = {
          'method': path,
          'id': nonce,
          'params': p
        };
        p = p.join(',');
        body = this.json(request);
        var query = 'tonce=' + nonce + '&accesskey=' + this.apiKey + '&requestmethod=' + method.toLowerCase() + '&id=' + nonce + '&method=' + path + '&params=' + p;
        var signature = this.hmac(this.encode(query), this.encode(this.secret), 'sha1');
        var auth = this.encode(this.apiKey + ':' + signature);
        headers = {
          'Authorization': 'Basic ' + this.stringToBase64(auth),
          'Json-Rpc-Tonce': nonce
        };
      } else {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }]);

  return btcchina;
}(Exchange);