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

var Exchange = require('./base/Exchange'); //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(independentreserve, _Exchange);

  function independentreserve() {
    _classCallCheck(this, independentreserve);

    return _possibleConstructorReturn(this, (independentreserve.__proto__ || _Object$getPrototypeOf(independentreserve)).apply(this, arguments));
  }

  _createClass(independentreserve, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(independentreserve.prototype.__proto__ || _Object$getPrototypeOf(independentreserve.prototype), "describe", this).call(this), {
        'id': 'independentreserve',
        'name': 'Independent Reserve',
        'countries': ['AU', 'NZ'],
        // Australia, New Zealand
        'rateLimit': 1000,
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30521662-cf3f477c-9bcb-11e7-89bc-d1ac85012eda.jpg',
          'api': {
            'public': 'https://api.independentreserve.com/Public',
            'private': 'https://api.independentreserve.com/Private'
          },
          'www': 'https://www.independentreserve.com',
          'doc': 'https://www.independentreserve.com/API'
        },
        'api': {
          'public': {
            'get': ['GetValidPrimaryCurrencyCodes', 'GetValidSecondaryCurrencyCodes', 'GetValidLimitOrderTypes', 'GetValidMarketOrderTypes', 'GetValidOrderTypes', 'GetValidTransactionTypes', 'GetMarketSummary', 'GetOrderBook', 'GetTradeHistorySummary', 'GetRecentTrades', 'GetFxRates']
          },
          'private': {
            'post': ['PlaceLimitOrder', 'PlaceMarketOrder', 'CancelOrder', 'GetOpenOrders', 'GetClosedOrders', 'GetClosedFilledOrders', 'GetOrderDetails', 'GetAccounts', 'GetTransactions', 'GetDigitalCurrencyDepositAddress', 'GetDigitalCurrencyDepositAddresses', 'SynchDigitalCurrencyDepositAddressWithBlockchain', 'WithdrawDigitalCurrency', 'RequestFiatWithdrawal', 'GetTrades']
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
        var baseCurrencies, quoteCurrencies, result, i, baseId, baseIdUppercase, base, j, quoteId, quoteIdUppercase, quote, id, symbol, taker, maker;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetValidPrimaryCurrencyCodes();

              case 2:
                baseCurrencies = _context.sent;
                _context.next = 5;
                return this.publicGetValidSecondaryCurrencyCodes();

              case 5:
                quoteCurrencies = _context.sent;
                result = [];

                for (i = 0; i < baseCurrencies.length; i++) {
                  baseId = baseCurrencies[i];
                  baseIdUppercase = baseId.toUpperCase();
                  base = this.commonCurrencyCode(baseIdUppercase);

                  for (j = 0; j < quoteCurrencies.length; j++) {
                    quoteId = quoteCurrencies[j];
                    quoteIdUppercase = quoteId.toUpperCase();
                    quote = this.commonCurrencyCode(quoteIdUppercase);
                    id = baseId + '/' + quoteId;
                    symbol = base + '/' + quote;
                    taker = 0.5 / 100;
                    maker = 0.5 / 100;
                    result.push({
                      'id': id,
                      'symbol': symbol,
                      'base': base,
                      'quote': quote,
                      'baseId': baseId,
                      'quoteId': quoteId,
                      'taker': taker,
                      'maker': maker,
                      'info': id
                    });
                  }
                }

                return _context.abrupt("return", result);

              case 9:
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
            balances,
            result,
            i,
            balance,
            currencyCode,
            uppercase,
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
                return this.privatePostGetAccounts();

              case 5:
                balances = _context2.sent;
                result = {
                  'info': balances
                };

                for (i = 0; i < balances.length; i++) {
                  balance = balances[i];
                  currencyCode = balance['CurrencyCode'];
                  uppercase = currencyCode.toUpperCase();
                  currency = this.commonCurrencyCode(uppercase);
                  account = this.account();
                  account['free'] = balance['AvailableBalance'];
                  account['total'] = balance['TotalBalance'];
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
            market,
            response,
            timestamp,
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
                return this.publicGetOrderBook(this.extend({
                  'primaryCurrencyCode': market['baseId'],
                  'secondaryCurrencyCode': market['quoteId']
                }, params));

              case 6:
                response = _context3.sent;
                timestamp = this.parse8601(response['CreatedTimestampUtc']);
                return _context3.abrupt("return", this.parseOrderBook(response, timestamp, 'BuyOrders', 'SellOrders', 'Price', 'Volume'));

              case 9:
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
      var timestamp = this.parse8601(ticker['CreatedTimestampUtc']);
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': ticker['DayHighestPrice'],
        'low': ticker['DayLowestPrice'],
        'bid': ticker['CurrentHighestBidPrice'],
        'ask': ticker['CurrentLowestOfferPrice'],
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': ticker['LastPrice'],
        'change': undefined,
        'percentage': undefined,
        'average': ticker['DayAvgPrice'],
        'baseVolume': ticker['DayVolumeXbtInSecondaryCurrrency'],
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
            response,
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
                _context4.next = 6;
                return this.publicGetMarketSummary(this.extend({
                  'primaryCurrencyCode': market['baseId'],
                  'secondaryCurrencyCode': market['quoteId']
                }, params));

              case 6:
                response = _context4.sent;
                return _context4.abrupt("return", this.parseTicker(response, market));

              case 8:
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
      var timestamp = this.parse8601(trade['TradeTimestampUtc']);
      return {
        'id': undefined,
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'order': undefined,
        'type': undefined,
        'side': undefined,
        'price': trade['SecondaryCurrencyTradePrice'],
        'amount': trade['PrimaryCurrencyAmount']
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
                return this.publicGetRecentTrades(this.extend({
                  'primaryCurrencyCode': market['baseId'],
                  'secondaryCurrencyCode': market['quoteId'],
                  'numberOfRecentTradesToRetrieve': 50 // max = 50

                }, params));

              case 8:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response['Trades'], market, since, limit));

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
            market,
            capitalizedOrderType,
            method,
            orderType,
            order,
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
                capitalizedOrderType = this.capitalize(type);
                method = 'Place' + capitalizedOrderType + 'Order';
                orderType = capitalizedOrderType;
                orderType += side == 'sell' ? 'Offer' : 'Bid';
                order = this.ordered({
                  'primaryCurrencyCode': market['baseId'],
                  'secondaryCurrencyCode': market['quoteId'],
                  'orderType': orderType
                });
                if (type == 'limit') order['price'] = price;
                order['volume'] = amount;
                _context6.next = 14;
                return this[method](this.extend(order, params));

              case 14:
                response = _context6.sent;
                return _context6.abrupt("return", {
                  'info': response,
                  'id': response['OrderGuid']
                });

              case 16:
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
                return this.loadMarkets();

              case 4:
                _context7.next = 6;
                return this.privatePostCancelOrder({
                  'orderGuid': id
                });

              case 6:
                return _context7.abrupt("return", _context7.sent);

              case 7:
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
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'][api] + '/' + path;

      if (api == 'public') {
        if (_Object$keys(params).length) url += '?' + this.urlencode(params);
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce();
        var auth = [url, 'apiKey=' + this.apiKey, 'nonce=' + nonce.toString()];
        var keysorted = this.keysort(params);

        var keys = _Object$keys(keysorted);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          auth.push(key + '=' + params[key]);
        }

        var message = auth.join(',');
        var signature = this.hmac(this.encode(message), this.encode(this.secret));
        var query = this.keysort(this.extend({
          'apiKey': this.apiKey,
          'nonce': nonce,
          'signature': signature
        }, params));
        body = this.json(query);
        headers = {
          'Content-Type': 'application/json'
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
      _regeneratorRuntime.mark(function _callee8(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                api = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 'public';
                method = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 'GET';
                params = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
                headers = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : undefined;
                body = _args8.length > 5 && _args8[5] !== undefined ? _args8[5] : undefined;
                _context8.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context8.sent;
                return _context8.abrupt("return", response);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function request(_x9) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return independentreserve;
}(Exchange);