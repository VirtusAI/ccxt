'use strict'; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var bittrex = require('./bittrex.js');

var _require = require('./base/errors'),
    AuthenticationError = _require.AuthenticationError,
    InvalidOrder = _require.InvalidOrder,
    InsufficientFunds = _require.InsufficientFunds,
    DDoSProtection = _require.DDoSProtection; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_bittrex) {
  _inherits(bleutrade, _bittrex);

  function bleutrade() {
    _classCallCheck(this, bleutrade);

    return _possibleConstructorReturn(this, (bleutrade.__proto__ || _Object$getPrototypeOf(bleutrade)).apply(this, arguments));
  }

  _createClass(bleutrade, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bleutrade.prototype.__proto__ || _Object$getPrototypeOf(bleutrade.prototype), "describe", this).call(this), {
        'id': 'bleutrade',
        'name': 'Bleutrade',
        'countries': 'BR',
        // Brazil
        'rateLimit': 1000,
        'version': 'v2',
        'has': {
          'CORS': true,
          'fetchTickers': true,
          'fetchOHLCV': false
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30303000-b602dbe6-976d-11e7-956d-36c5049c01e7.jpg',
          'api': {
            'public': 'https://bleutrade.com/api',
            'account': 'https://bleutrade.com/api',
            'market': 'https://bleutrade.com/api'
          },
          'www': 'https://bleutrade.com',
          'doc': 'https://bleutrade.com/help/API',
          'fees': 'https://bleutrade.com/help/fees_and_deadlines'
        },
        'fees': {
          'funding': {
            'withdraw': {
              'ADC': 0.1,
              'BTA': 0.1,
              'BITB': 0.1,
              'BTC': 0.001,
              'BCC': 0.001,
              'BTCD': 0.001,
              'BTG': 0.001,
              'BLK': 0.1,
              'CDN': 0.1,
              'CLAM': 0.01,
              'DASH': 0.001,
              'DCR': 0.05,
              'DGC': 0.1,
              'DP': 0.1,
              'DPC': 0.1,
              'DOGE': 10.0,
              'EFL': 0.1,
              'ETH': 0.01,
              'EXP': 0.1,
              'FJC': 0.1,
              'BSTY': 0.001,
              'GB': 0.1,
              'NLG': 0.1,
              'HTML': 1.0,
              'LTC': 0.001,
              'MONA': 0.01,
              'MOON': 1.0,
              'NMC': 0.015,
              'NEOS': 0.1,
              'NVC': 0.05,
              'OK': 0.1,
              'PPC': 0.1,
              'POT': 0.1,
              'XPM': 0.001,
              'QTUM': 0.1,
              'RDD': 0.1,
              'SLR': 0.1,
              'START': 0.1,
              'SLG': 0.1,
              'TROLL': 0.1,
              'UNO': 0.01,
              'VRC': 0.1,
              'VTC': 0.1,
              'XVP': 0.1,
              'WDC': 0.001,
              'ZET': 0.1
            }
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
        var markets, result, p, market, id, base, quote, symbol, precision, active;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.publicGetMarkets();

              case 2:
                markets = _context.sent;
                result = [];

                for (p = 0; p < markets['result'].length; p++) {
                  market = markets['result'][p];
                  id = market['MarketName'];
                  base = market['MarketCurrency'];
                  quote = market['BaseCurrency'];
                  base = this.commonCurrencyCode(base);
                  quote = this.commonCurrencyCode(quote);
                  symbol = base + '/' + quote;
                  precision = {
                    'amount': 8,
                    'price': 8
                  };
                  active = market['IsActive'];
                  result.push(this.extend(this.fees['trading'], {
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'active': active,
                    'info': market,
                    'lot': Math.pow(10, -precision['amount']),
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': market['MinTradeSize'],
                        'max': undefined
                      },
                      'price': {
                        'min': undefined,
                        'max': undefined
                      },
                      'cost': {
                        'min': 0,
                        'max': undefined
                      }
                    }
                  }));
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
    key: "getOrderIdField",
    value: function getOrderIdField() {
      return 'orderid';
    }
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var limit,
            params,
            request,
            response,
            orderbook,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                limit = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : undefined;
                params = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return this.loadMarkets();

              case 4:
                request = {
                  'market': this.marketId(symbol),
                  'type': 'ALL'
                };
                if (typeof limit !== 'undefined') request['depth'] = limit; // 50

                _context2.next = 8;
                return this.publicGetOrderbook(this.extend(request, params));

              case 8:
                response = _context2.sent;
                orderbook = response['result'];
                return _context2.abrupt("return", this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'Rate', 'Quantity'));

              case 11:
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
    key: "throwExceptionOnError",
    value: function throwExceptionOnError(response) {
      if ('message' in response) {
        if (response['message'] === 'Insufficient funds!') throw new InsufficientFunds(this.id + ' ' + this.json(response));
        if (response['message'] === 'MIN_TRADE_REQUIREMENT_NOT_MET') throw new InvalidOrder(this.id + ' ' + this.json(response));

        if (response['message'] === 'APIKEY_INVALID') {
          if (this.hasAlreadyAuthenticatedSuccessfully) {
            throw new DDoSProtection(this.id + ' ' + this.json(response));
          } else {
            throw new AuthenticationError(this.id + ' ' + this.json(response));
          }
        }

        if (response['message'] === 'DUST_TRADE_DISALLOWED_MIN_VALUE_50K_SAT') throw new InvalidOrder(this.id + ' order cost should be over 50k satoshi ' + this.json(response));
      }
    }
  }]);

  return bleutrade;
}(bittrex);