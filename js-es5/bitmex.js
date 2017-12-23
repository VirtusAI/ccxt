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
  _inherits(bitmex, _Exchange);

  function bitmex() {
    _classCallCheck(this, bitmex);

    return _possibleConstructorReturn(this, (bitmex.__proto__ || _Object$getPrototypeOf(bitmex)).apply(this, arguments));
  }

  _createClass(bitmex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitmex.prototype.__proto__ || _Object$getPrototypeOf(bitmex.prototype), "describe", this).call(this), {
        'id': 'bitmex',
        'name': 'BitMEX',
        'countries': 'SC',
        // Seychelles
        'version': 'v1',
        'userAgent': undefined,
        'rateLimit': 1500,
        'hasCORS': false,
        'hasFetchOHLCV': true,
        'hasWithdraw': true,
        'timeframes': {
          '1m': '1m',
          '5m': '5m',
          '1h': '1h',
          '1d': '1d'
        },
        'urls': {
          'test': 'https://testnet.bitmex.com',
          'logo': 'https://user-images.githubusercontent.com/1294454/27766319-f653c6e6-5ed4-11e7-933d-f0bc3699ae8f.jpg',
          'api': 'https://www.bitmex.com',
          'www': 'https://www.bitmex.com',
          'doc': ['https://www.bitmex.com/app/apiOverview', 'https://github.com/BitMEX/api-connectors/tree/master/official-http']
        },
        'api': {
          'public': {
            'get': ['announcement', 'announcement/urgent', 'funding', 'instrument', 'instrument/active', 'instrument/activeAndIndices', 'instrument/activeIntervals', 'instrument/compositeIndex', 'instrument/indices', 'insurance', 'leaderboard', 'liquidation', 'orderBook', 'orderBook/L2', 'quote', 'quote/bucketed', 'schema', 'schema/websocketHelp', 'settlement', 'stats', 'stats/history', 'trade', 'trade/bucketed']
          },
          'private': {
            'get': ['apiKey', 'chat', 'chat/channels', 'chat/connected', 'execution', 'execution/tradeHistory', 'notification', 'order', 'position', 'user', 'user/affiliateStatus', 'user/checkReferralCode', 'user/commission', 'user/depositAddress', 'user/margin', 'user/minWithdrawalFee', 'user/wallet', 'user/walletHistory', 'user/walletSummary'],
            'post': ['apiKey', 'apiKey/disable', 'apiKey/enable', 'chat', 'order', 'order/bulk', 'order/cancelAllAfter', 'order/closePosition', 'position/isolate', 'position/leverage', 'position/riskLimit', 'position/transferMargin', 'user/cancelWithdrawal', 'user/confirmEmail', 'user/confirmEnableTFA', 'user/confirmWithdrawal', 'user/disableTFA', 'user/logout', 'user/logoutAll', 'user/preferences', 'user/requestEnableTFA', 'user/requestWithdrawal'],
            'put': ['order', 'order/bulk', 'user'],
            'delete': ['apiKey', 'order', 'order/all']
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
        var markets, result, p, market, active, id, base, quote, type, future, prediction, basequote, swap, symbol, maker, taker;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetInstrumentActiveAndIndices();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets.length; p++) {
                  market = markets[p];
                  active = market['state'] != 'Unlisted';
                  id = market['symbol'];
                  base = market['underlying'];
                  quote = market['quoteCurrency'];
                  type = undefined;
                  future = false;
                  prediction = false;
                  basequote = base + quote;
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  swap = id == basequote;
                  symbol = id;

                  if (swap) {
                    type = 'swap';
                    symbol = base + '/' + quote;
                  } else if (id.indexOf('B_') >= 0) {
                    prediction = true;
                    type = 'prediction';
                  } else {
                    future = true;
                    type = 'future';
                  }

                  maker = market['makerFee'];
                  taker = market['takerFee'];
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': active,
                    'taker': taker,
                    'maker': maker,
                    'type': type,
                    'spot': false,
                    'swap': swap,
                    'future': future,
                    'prediction': prediction,
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
            result,
            b,
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
                return this.privateGetUserMargin({
                  'currency': 'all'
                });

              case 5:
                response = _context2.sent;
                result = {
                  'info': response
                };

                for (b = 0; b < response.length; b++) {
                  balance = response[b];
                  currency = balance['currency'].toUpperCase();
                  currency = this.commonCurrencyCode(currency);
                  account = {
                    'free': balance['availableMargin'],
                    'used': 0.0,
                    'total': balance['amount']
                  };

                  if (currency == 'BTC') {
                    account['free'] = account['free'] * 0.00000001;
                    account['total'] = account['total'] * 0.00000001;
                  }

                  account['used'] = account['total'] - account['free'];
                  result[currency] = account;
                }

                return _context2.abrupt("return", this.parseBalance(result));

              case 9:
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
            timestamp,
            result,
            o,
            order,
            side,
            amount,
            price,
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
                return this.publicGetOrderBookL2(this.extend({
                  'symbol': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context3.sent;
                timestamp = this.milliseconds();
                result = {
                  'bids': [],
                  'asks': [],
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp)
                };

                for (o = 0; o < orderbook.length; o++) {
                  order = orderbook[o];
                  side = order['side'] == 'Sell' ? 'asks' : 'bids';
                  amount = order['size'];
                  price = order['price'];
                  result[side].push([price, amount]);
                }

                result['bids'] = this.sortBy(result['bids'], 0, true);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context3.abrupt("return", result);

              case 12:
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
            request,
            quotes,
            quotesLength,
            quote,
            tickers,
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

                if (market['active']) {
                  _context4.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ': symbol ' + symbol + ' is delisted');

              case 6:
                request = this.extend({
                  'symbol': market['id'],
                  'binSize': '1d',
                  'partial': true,
                  'count': 1,
                  'reverse': true
                }, params);
                _context4.next = 9;
                return this.publicGetQuoteBucketed(request);

              case 9:
                quotes = _context4.sent;
                quotesLength = quotes.length;
                quote = quotes[quotesLength - 1];
                _context4.next = 14;
                return this.publicGetTradeBucketed(request);

              case 14:
                tickers = _context4.sent;
                ticker = tickers[0];
                timestamp = this.milliseconds();
                return _context4.abrupt("return", {
                  'symbol': symbol,
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp),
                  'high': parseFloat(ticker['high']),
                  'low': parseFloat(ticker['low']),
                  'bid': parseFloat(quote['bidPrice']),
                  'ask': parseFloat(quote['askPrice']),
                  'vwap': parseFloat(ticker['vwap']),
                  'open': undefined,
                  'close': parseFloat(ticker['close']),
                  'first': undefined,
                  'last': undefined,
                  'change': undefined,
                  'percentage': undefined,
                  'average': undefined,
                  'baseVolume': parseFloat(ticker['homeNotional']),
                  'quoteVolume': parseFloat(ticker['foreignNotional']),
                  'info': ticker
                });

              case 18:
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
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var timestamp = this.parse8601(ohlcv['timestamp']);
      return [timestamp, ohlcv['open'], ohlcv['high'], ohlcv['low'], ohlcv['close'], ohlcv['volume']];
    }
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
            ymdhms,
            ymdhm,
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
                // send JSON key/value pairs, such as {"key": "value"}
                // filter by individual fields and do advanced queries on timestamps
                // let filter = { 'key': 'value' };
                // send a bare series (e.g. XBU) to nearest expiring contract in that series
                // you can also send a timeframe, e.g. XBU:monthly
                // timeframes: daily, weekly, monthly, quarterly, and biquarterly
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'binSize': this.timeframes[timeframe],
                  'partial': true // true == include yet-incomplete current bins
                  // 'filter': filter, // filter by individual fields and do advanced queries
                  // 'columns': [],    // will return all columns if omitted
                  // 'start': 0,       // starting point for results (wtf?)
                  // 'reverse': false, // true == newest first
                  // 'endTime': '',    // ending date filter for results

                };

                if (since) {
                  ymdhms = this.YmdHMS(since);
                  ymdhm = ymdhms.slice(0, 16);
                  request['startTime'] = ymdhm; // starting date filter for results
                }

                if (limit) request['count'] = limit; // default 100

                _context5.next = 12;
                return this.publicGetTradeBucketed(this.extend(request, params));

              case 12:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

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
      var timestamp = this.parse8601(trade['timestamp']);
      var symbol = undefined;

      if (!market) {
        if ('symbol' in trade) market = this.markets_by_id[trade['symbol']];
      }

      if (market) symbol = market['symbol'];
      return {
        'id': trade['trdMatchID'],
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'order': undefined,
        'type': undefined,
        'side': trade['side'].toLowerCase(),
        'price': trade['price'],
        'amount': trade['size']
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
                _context6.next = 8;
                return this.publicGetTrade(this.extend({
                  'symbol': market['id']
                }, params));

              case 8:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response, market, since, limit));

              case 10:
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
            order,
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
                order = {
                  'symbol': this.marketId(symbol),
                  'side': this.capitalize(side),
                  'orderQty': amount,
                  'ordType': this.capitalize(type)
                };
                if (type == 'limit') order['price'] = price;
                _context7.next = 8;
                return this.privatePostOrder(this.extend(order, params));

              case 8:
                response = _context7.sent;
                return _context7.abrupt("return", {
                  'info': response,
                  'id': response['orderID']
                });

              case 10:
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
                _context8.next = 6;
                return this.privateDeleteOrder({
                  'orderID': id
                });

              case 6:
                return _context8.abrupt("return", _context8.sent);

              case 7:
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
    key: "isFiat",
    value: function isFiat(currency) {
      if (currency == 'EUR') return true;
      if (currency == 'PLN') return true;
      return false;
    }
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(currency, amount, address) {
        var params,
            request,
            response,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                params = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
                _context9.next = 3;
                return this.loadMarkets();

              case 3:
                if (!(currency != 'BTC')) {
                  _context9.next = 5;
                  break;
                }

                throw new ExchangeError(this.id + ' supoprts BTC withdrawals only, other currencies coming soon...');

              case 5:
                request = {
                  'currency': 'XBt',
                  // temporarily
                  'amount': amount,
                  'address': address // 'otpToken': '123456', // requires if two-factor auth (OTP) is enabled
                  // 'fee': 0.001, // bitcoin network fee

                };
                _context9.next = 8;
                return this.privatePostUserRequestWithdrawal(this.extend(request, params));

              case 8:
                response = _context9.sent;
                return _context9.abrupt("return", {
                  'info': response,
                  'id': response['transactID']
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function withdraw(_x10, _x11, _x12) {
        return _withdraw.apply(this, arguments);
      };
    }()
  }, {
    key: "handleErrors",
    value: function handleErrors(code, reason, url, method, headers, body) {
      if (code >= 400) {
        if (body) {
          if (body[0] == "{") {
            var response = JSON.parse(body);

            if ('error' in response) {
              if ('message' in response['error']) {
                throw new ExchangeError(this.id + ' ' + this.json(response));
              }
            }
          }

          throw new ExchangeError(this.id + ' ' + body);
        }

        throw new ExchangeError(this.id + ' returned an empty response');
      }
    }
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
      var query = '/api' + '/' + this.version + '/' + path;
      if (_Object$keys(params).length) query += '?' + this.urlencode(params);
      var url = this.urls['api'] + query;

      if (api == 'private') {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        var auth = method + query + nonce;

        if (method == 'POST') {
          if (_Object$keys(params).length) {
            body = this.json(params);
            auth += body;
          }
        }

        headers = {
          'Content-Type': 'application/json',
          'api-nonce': nonce,
          'api-key': this.apiKey,
          'api-signature': this.hmac(this.encode(auth), this.encode(this.secret))
        };
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }]);

  return bitmex;
}(Exchange);