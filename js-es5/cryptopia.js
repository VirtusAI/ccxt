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
    InsufficientFunds = _require.InsufficientFunds,
    OrderNotFound = _require.OrderNotFound,
    OrderNotCached = _require.OrderNotCached; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(cryptopia, _Exchange);

  function cryptopia() {
    _classCallCheck(this, cryptopia);

    return _possibleConstructorReturn(this, (cryptopia.__proto__ || _Object$getPrototypeOf(cryptopia)).apply(this, arguments));
  }

  _createClass(cryptopia, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(cryptopia.prototype.__proto__ || _Object$getPrototypeOf(cryptopia.prototype), "describe", this).call(this), {
        'id': 'cryptopia',
        'name': 'Cryptopia',
        'rateLimit': 1500,
        'countries': 'NZ',
        // New Zealand
        'hasCORS': false,
        // obsolete metainfo interface
        'hasFetchTickers': true,
        'hasFetchOrder': true,
        'hasFetchOrders': true,
        'hasFetchOpenOrders': true,
        'hasFetchClosedOrders': true,
        'hasFetchMyTrades': true,
        'hasFetchCurrencies': true,
        'hasDeposit': true,
        'hasWithdraw': true,
        // new metainfo interface
        'has': {
          'fetchTickers': true,
          'fetchOrder': 'emulated',
          'fetchOrders': 'emulated',
          'fetchOpenOrders': true,
          'fetchClosedOrders': 'emulated',
          'fetchMyTrades': true,
          'fetchCurrencies': true,
          'deposit': true,
          'withdraw': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/29484394-7b4ea6e2-84c6-11e7-83e5-1fccf4b2dc81.jpg',
          'api': 'https://www.cryptopia.co.nz/api',
          'www': 'https://www.cryptopia.co.nz',
          'doc': ['https://www.cryptopia.co.nz/Forum/Category/45', 'https://www.cryptopia.co.nz/Forum/Thread/255', 'https://www.cryptopia.co.nz/Forum/Thread/256']
        },
        'api': {
          'public': {
            'get': ['GetCurrencies', 'GetTradePairs', 'GetMarkets', 'GetMarkets/{id}', 'GetMarkets/{hours}', 'GetMarkets/{id}/{hours}', 'GetMarket/{id}', 'GetMarket/{id}/{hours}', 'GetMarketHistory/{id}', 'GetMarketHistory/{id}/{hours}', 'GetMarketOrders/{id}', 'GetMarketOrders/{id}/{count}', 'GetMarketOrderGroups/{ids}/{count}']
          },
          'private': {
            'post': ['CancelTrade', 'GetBalance', 'GetDepositAddress', 'GetOpenOrders', 'GetTradeHistory', 'GetTransactions', 'SubmitTip', 'SubmitTrade', 'SubmitTransfer', 'SubmitWithdraw']
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (currency == 'CC') return 'CCX';
      if (currency == 'FCN') return 'Facilecoin';
      if (currency == 'NET') return 'NetCoin';
      if (currency == 'BTG') return 'Bitgem';
      if (currency == 'FUEL') return 'FC2'; // FuelCoin != FUEL

      if (currency == 'WRC') return 'WarCoin';
      return currency;
    }
  }, {
    key: "currencyId",
    value: function currencyId(currency) {
      if (currency == 'CCX') return 'CC';
      if (currency == 'Facilecoin') return 'FCN';
      if (currency == 'NetCoin') return 'NET';
      if (currency == 'Bitgem') return 'BTG';
      if (currency == 'FC2') return 'FUEL'; // FuelCoin != FUEL

      return currency;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var response, result, markets, i, market, id, symbol, _symbol$split, _symbol$split2, base, quote, precision, amountLimits, priceLimits, limits, active;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetTradePairs();

              case 2:
                response = _context.sent;
                result = [];
                markets = response['Data'];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['Id'];
                  symbol = market['Label'];
                  _symbol$split = symbol.split('/'), _symbol$split2 = _slicedToArray(_symbol$split, 2), base = _symbol$split2[0], quote = _symbol$split2[1];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  amountLimits = {
                    'min': market['MinimumTrade'],
                    'max': market['MaximumTrade']
                  };
                  priceLimits = {
                    'min': market['MinimumPrice'],
                    'max': market['MaximumPrice']
                  };
                  limits = {
                    'amount': amountLimits,
                    'price': priceLimits
                  };
                  active = market['Status'] == 'OK';
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'info': market,
                    'maker': market['TradeFee'] / 100,
                    'taker': market['TradeFee'] / 100,
                    'lot': amountLimits['min'],
                    'active': active,
                    'precision': precision,
                    'limits': limits
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
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            response,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.loadMarkets();

              case 3:
                _context2.next = 5;
                return this.publicGetMarketOrdersId(this.extend({
                  'id': this.marketId(symbol)
                }, params));

              case 5:
                response = _context2.sent;
                orderbook = response['Data'];
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'Buy', 'Sell', 'Price', 'Volume'));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
      return {
        'symbol': symbol,
        'info': ticker,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': parseFloat(ticker['High']),
        'low': parseFloat(ticker['Low']),
        'bid': parseFloat(ticker['BidPrice']),
        'ask': parseFloat(ticker['AskPrice']),
        'vwap': undefined,
        'open': parseFloat(ticker['Open']),
        'close': parseFloat(ticker['Close']),
        'first': undefined,
        'last': parseFloat(ticker['LastPrice']),
        'change': parseFloat(ticker['Change']),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': parseFloat(ticker['Volume']),
        'quoteVolume': parseFloat(ticker['BaseVolume'])
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
            response,
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
                return this.publicGetMarketId(this.extend({
                  'id': market['id']
                }, params));

              case 6:
                response = _context3.sent;
                ticker = response['Data'];
                return _context3.abrupt("return", this.parseTicker(ticker, market));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x2) {
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
            response,
            result,
            tickers,
            i,
            ticker,
            id,
            recognized,
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
                _context4.next = 6;
                return this.publicGetMarkets(params);

              case 6:
                response = _context4.sent;
                result = {};
                tickers = response['Data'];
                i = 0;

              case 10:
                if (!(i < tickers.length)) {
                  _context4.next = 22;
                  break;
                }

                ticker = tickers[i];
                id = ticker['TradePairId'];
                recognized = id in this.markets_by_id;

                if (recognized) {
                  _context4.next = 16;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchTickers() returned unrecognized pair id ' + id);

              case 16:
                market = this.markets_by_id[id];
                symbol = market['symbol'];
                result[symbol] = this.parseTicker(ticker, market);

              case 19:
                i++;
                _context4.next = 10;
                break;

              case 22:
                return _context4.abrupt("return", result);

              case 23:
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
    key: "parseTrade",
    value: function parseTrade(trade) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = undefined;

      if ('Timestamp' in trade) {
        timestamp = trade['Timestamp'] * 1000;
      } else if ('TimeStamp' in trade) {
        timestamp = this.parse8601(trade['TimeStamp']);
      }

      var price = this.safeFloat(trade, 'Price');
      if (!price) price = this.safeFloat(trade, 'Rate');
      var cost = this.safeFloat(trade, 'Total');
      var id = this.safeString(trade, 'TradeId');

      if (!market) {
        if ('TradePairId' in trade) if (trade['TradePairId'] in this.markets_by_id) market = this.markets_by_id[trade['TradePairId']];
      }

      var symbol = undefined;
      var fee = undefined;

      if (market) {
        symbol = market['symbol'];

        if ('Fee' in trade) {
          fee = {
            'currency': market['quote'],
            'cost': trade['Fee']
          };
        }
      }

      return {
        'id': id,
        'info': trade,
        'order': undefined,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': symbol,
        'type': 'limit',
        'side': trade['Type'].toLowerCase(),
        'price': price,
        'cost': cost,
        'amount': trade['Amount'],
        'fee': fee
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
            trades,
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
                return this.publicGetMarketHistoryIdHours(this.extend({
                  'id': market['id'],
                  'hours': 24 // default

                }, params));

              case 8:
                response = _context5.sent;
                trades = response['Data'];
                return _context5.abrupt("return", this.parseTrades(trades, market, since, limit));

              case 11:
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
    key: "fetchMyTrades",
    value: function () {
      var _fetchMyTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6() {
        var symbol,
            since,
            limit,
            params,
            request,
            market,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                symbol = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : undefined;
                since = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : undefined;
                limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                _context6.next = 6;
                return this.loadMarkets();

              case 6:
                request = {};
                market = undefined;

                if (symbol) {
                  market = this.market(symbol);
                  request['TradePairId'] = market['id'];
                }

                _context6.next = 11;
                return this.privatePostGetTradeHistory(this.extend(request, params));

              case 11:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseTrades(response['Data'], market, since, limit));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchMyTrades() {
        return _fetchMyTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7() {
        var params,
            response,
            currencies,
            result,
            i,
            currency,
            id,
            precision,
            code,
            active,
            status,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _context7.next = 3;
                return this.publicGetCurrencies(params);

              case 3:
                response = _context7.sent;
                currencies = response['Data'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['Symbol']; // todo: will need to rethink the fees
                  // to add support for multiple withdrawal/deposit methods and
                  // differentiated fees for each particular method

                  precision = 8; // default precision, todo: fix "magic constants"

                  code = this.commonCurrencyCode(id);
                  active = currency['ListingStatus'] == 'Active';
                  status = currency['Status'].toLowerCase();
                  if (status != 'ok') active = false;
                  result[code] = {
                    'id': id,
                    'code': code,
                    'info': currency,
                    'name': currency['Name'],
                    'active': active,
                    'status': status,
                    'fee': currency['WithdrawFee'],
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': currency['MinBaseTrade'],
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
                        'min': currency['MinWithdraw'],
                        'max': currency['MaxWithdraw']
                      }
                    }
                  };
                }

                return _context7.abrupt("return", result);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
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
      _regeneratorRuntime.mark(function _callee8() {
        var params,
            response,
            balances,
            result,
            i,
            balance,
            code,
            currency,
            account,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                _context8.next = 3;
                return this.loadMarkets();

              case 3:
                _context8.next = 5;
                return this.privatePostGetBalance();

              case 5:
                response = _context8.sent;
                balances = response['Data'];
                result = {
                  'info': response
                };

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];
                  code = balance['Symbol'];
                  currency = this.commonCurrencyCode(code);
                  account = {
                    'free': balance['Available'],
                    'used': 0.0,
                    'total': balance['Total']
                  };
                  account['used'] = account['total'] - account['free'];
                  result[currency] = account;
                }

                return _context8.abrupt("return", this.parseBalance(result));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
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
      _regeneratorRuntime.mark(function _callee9(symbol, type, side, amount) {
        var price,
            params,
            market,
            request,
            response,
            id,
            filled,
            filledOrders,
            filledOrdersLength,
            timestamp,
            order,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                price = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : undefined;
                params = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : {};
                _context9.next = 4;
                return this.loadMarkets();

              case 4:
                market = this.market(symbol);
                price = parseFloat(price);
                amount = parseFloat(amount);
                request = {
                  'TradePairId': market['id'],
                  'Type': this.capitalize(side),
                  'Rate': this.priceToPrecision(symbol, price),
                  'Amount': this.amountToPrecision(symbol, amount)
                };
                _context9.next = 10;
                return this.privatePostSubmitTrade(this.extend(request, params));

              case 10:
                response = _context9.sent;

                if (response) {
                  _context9.next = 13;
                  break;
                }

                throw new ExchangeError(this.id + ' createOrder returned unknown error: ' + this.json(response));

              case 13:
                id = undefined;
                filled = 0.0;

                if ('Data' in response) {
                  if ('OrderId' in response['Data']) {
                    if (response['Data']['OrderId']) {
                      id = response['Data']['OrderId'].toString();
                    }
                  }

                  if ('FilledOrders' in response['Data']) {
                    filledOrders = response['Data']['FilledOrders'];
                    filledOrdersLength = filledOrders.length;

                    if (filledOrdersLength) {
                      filled = undefined;
                    }
                  }
                }

                timestamp = this.milliseconds();
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
                  'filled': filled,
                  'fee': undefined // 'trades': this.parseTrades (order['trades'], market),

                };
                if (id) this.orders[id] = order;
                return _context9.abrupt("return", this.extend({
                  'info': response
                }, order));

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
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
      _regeneratorRuntime.mark(function _callee10(id) {
        var symbol,
            params,
            response,
            message,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                symbol = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : undefined;
                params = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : {};
                _context10.next = 4;
                return this.loadMarkets();

              case 4:
                response = undefined;
                _context10.prev = 5;
                _context10.next = 8;
                return this.privatePostCancelTrade(this.extend({
                  'Type': 'Trade',
                  'OrderId': id
                }, params));

              case 8:
                response = _context10.sent;
                if (id in this.orders) this.orders[id]['status'] = 'canceled';
                _context10.next = 20;
                break;

              case 12:
                _context10.prev = 12;
                _context10.t0 = _context10["catch"](5);

                if (!this.last_json_response) {
                  _context10.next = 19;
                  break;
                }

                message = this.safeString(this.last_json_response, 'Error');

                if (!message) {
                  _context10.next = 19;
                  break;
                }

                if (!(message.indexOf('does not exist') >= 0)) {
                  _context10.next = 19;
                  break;
                }

                throw new OrderNotFound(this.id + ' cancelOrder() error: ' + this.last_http_response);

              case 19:
                throw _context10.t0;

              case 20:
                return _context10.abrupt("return", response);

              case 21:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[5, 12]]);
      }));

      return function cancelOrder(_x8) {
        return _cancelOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrder",
    value: function parseOrder(order) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (market) {
        symbol = market['symbol'];
      } else if ('Market' in order) {
        var id = order['Market'];

        if (id in this.markets_by_id) {
          market = this.markets_by_id[id];
          symbol = market['symbol'];
        }
      }

      var timestamp = this.parse8601(order['TimeStamp']);
      var amount = this.safeFloat(order, 'Amount');
      var remaining = this.safeFloat(order, 'Remaining');
      var filled = amount - remaining;
      return {
        'id': order['OrderId'].toString(),
        'info': this.omit(order, 'status'),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'status': order['status'],
        'symbol': symbol,
        'type': 'limit',
        'side': order['Type'].toLowerCase(),
        'price': this.safeFloat(order, 'Rate'),
        'cost': this.safeFloat(order, 'Total'),
        'amount': amount,
        'filled': filled,
        'remaining': remaining,
        'fee': undefined // 'trades': this.parseTrades (order['trades'], market),

      };
    }
  }, {
    key: "fetchOrders",
    value: function () {
      var _fetchOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee11() {
        var symbol,
            since,
            limit,
            params,
            market,
            response,
            orders,
            i,
            openOrders,
            j,
            openOrdersIndexedById,
            cachedOrderIds,
            result,
            k,
            id,
            _order,
            order,
            _args11 = arguments;

        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                symbol = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : undefined;
                since = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : undefined;
                limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : undefined;
                params = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};

                if (symbol) {
                  _context11.next = 6;
                  break;
                }

                throw new ExchangeError(this.id + ' fetchOrders requires a symbol param');

              case 6:
                _context11.next = 8;
                return this.loadMarkets();

              case 8:
                market = this.market(symbol);
                _context11.next = 11;
                return this.privatePostGetOpenOrders({
                  // 'Market': market['id'],
                  'TradePairId': market['id'] // Cryptopia identifier (not required if 'Market' supplied)
                  // 'Count': 100, // default = 100

                }, params);

              case 11:
                response = _context11.sent;
                orders = [];

                for (i = 0; i < response['Data'].length; i++) {
                  orders.push(this.extend(response['Data'][i], {
                    'status': 'open'
                  }));
                }

                openOrders = this.parseOrders(orders, market);

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

                return _context11.abrupt("return", this.filterBySinceLimit(result, since, limit));

              case 21:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      return function fetchOrders() {
        return _fetchOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee12(id) {
        var symbol,
            params,
            orders,
            i,
            _args12 = arguments;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                symbol = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : undefined;
                params = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};
                id = id.toString();
                _context12.next = 5;
                return this.fetchOrders(symbol, params);

              case 5:
                orders = _context12.sent;
                i = 0;

              case 7:
                if (!(i < orders.length)) {
                  _context12.next = 13;
                  break;
                }

                if (!(orders[i]['id'] == id)) {
                  _context12.next = 10;
                  break;
                }

                return _context12.abrupt("return", orders[i]);

              case 10:
                i++;
                _context12.next = 7;
                break;

              case 13:
                throw new OrderNotCached(this.id + ' order ' + id + ' not found in cached .orders, fetchOrder requires .orders (de)serialization implemented for this method to work properly');

              case 14:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOpenOrders",
    value: function () {
      var _fetchOpenOrders = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee13() {
        var symbol,
            since,
            limit,
            params,
            orders,
            result,
            i,
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
                return this.fetchOrders(symbol, params);

              case 6:
                orders = _context13.sent;
                result = [];

                for (i = 0; i < orders.length; i++) {
                  if (orders[i]['status'] == 'open') result.push(orders[i]);
                }

                return _context13.abrupt("return", result);

              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
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
      _regeneratorRuntime.mark(function _callee14() {
        var symbol,
            since,
            limit,
            params,
            orders,
            result,
            i,
            _args14 = arguments;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                symbol = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : undefined;
                since = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : undefined;
                limit = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : undefined;
                params = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
                _context14.next = 6;
                return this.fetchOrders(symbol, params);

              case 6:
                orders = _context14.sent;
                result = [];

                for (i = 0; i < orders.length; i++) {
                  if (orders[i]['status'] == 'closed') result.push(orders[i]);
                }

                return _context14.abrupt("return", result);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function fetchClosedOrders() {
        return _fetchClosedOrders.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(currency) {
        var params,
            currencyId,
            response,
            address,
            _args15 = arguments;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                params = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
                currencyId = this.currencyId(currency);
                _context15.next = 4;
                return this.privatePostGetDepositAddress(this.extend({
                  'Currency': currencyId
                }, params));

              case 4:
                response = _context15.sent;
                address = this.safeString(response['Data'], 'BaseAddress');
                if (!address) address = this.safeString(response['Data'], 'Address');
                return _context15.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 8:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      return function fetchDepositAddress(_x10) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee16(currency, amount, address) {
        var params,
            currencyId,
            response,
            _args16 = arguments;
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                params = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
                currencyId = this.currencyId(currency);
                _context16.next = 4;
                return this.privatePostSubmitWithdraw(this.extend({
                  'Currency': currencyId,
                  'Amount': amount,
                  'Address': address // Address must exist in you AddressBook in security settings

                }, params));

              case 4:
                response = _context16.sent;
                return _context16.abrupt("return", {
                  'info': response,
                  'id': response['Data']
                });

              case 6:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
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
      var url = this.urls['api'] + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));

      if (api == 'public') {
        if (_Object$keys(query).length) url += '?' + this.urlencode(query);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        body = this.json(query);
        var hash = this.hash(this.encode(body), 'md5', 'base64');
        var secret = this.base64ToBinary(this.secret);
        var uri = this.encodeURIComponent(url);
        var lowercase = uri.toLowerCase();
        var payload = this.apiKey + method + lowercase + nonce + this.binaryToString(hash);
        var signature = this.hmac(this.encode(payload), secret, 'sha256', 'base64');
        var auth = 'amx ' + this.apiKey + ':' + this.binaryToString(signature) + ':' + nonce;
        headers = {
          'Content-Type': 'application/json',
          'Authorization': auth
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
      _regeneratorRuntime.mark(function _callee17(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args17 = arguments;
        return _regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                api = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 'public';
                method = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : 'GET';
                params = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : {};
                headers = _args17.length > 4 && _args17[4] !== undefined ? _args17[4] : undefined;
                body = _args17.length > 5 && _args17[5] !== undefined ? _args17[5] : undefined;
                _context17.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context17.sent;

                if (!response) {
                  _context17.next = 17;
                  break;
                }

                if (!('Success' in response)) {
                  _context17.next = 17;
                  break;
                }

                if (!response['Success']) {
                  _context17.next = 14;
                  break;
                }

                return _context17.abrupt("return", response);

              case 14:
                if (!('Error' in response)) {
                  _context17.next = 17;
                  break;
                }

                if (!(response['Error'] == 'Insufficient Funds.')) {
                  _context17.next = 17;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 17:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 18:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      return function request(_x14) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return cryptopia;
}(Exchange);