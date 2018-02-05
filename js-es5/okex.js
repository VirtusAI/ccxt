'use strict'; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var okcoinusd = require('./okcoinusd.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_okcoinusd) {
  _inherits(okex, _okcoinusd);

  function okex() {
    _classCallCheck(this, okex);

    return _possibleConstructorReturn(this, (okex.__proto__ || _Object$getPrototypeOf(okex)).apply(this, arguments));
  }

  _createClass(okex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(okex.prototype.__proto__ || _Object$getPrototypeOf(okex.prototype), "describe", this).call(this), {
        'id': 'okex',
        'name': 'OKEX',
        'countries': ['CN', 'US'],
        'has': {
          'CORS': false,
          'futures': true,
          'hasFetchTickers': true,
          'fetchTickers': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/32552768-0d6dd3c6-c4a6-11e7-90f8-c043b64756a7.jpg',
          'api': {
            'web': 'https://www.okex.com/v2',
            'public': 'https://www.okex.com/api',
            'private': 'https://www.okex.com/api'
          },
          'www': 'https://www.okex.com',
          'doc': 'https://www.okex.com/rest_getStarted.html',
          'fees': 'https://www.okex.com/fees.html'
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      var currencies = {
        'FAIR': 'FairGame'
      };
      if (currency in currencies) return currencies[currency];
      return currency;
    }
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var markets, i;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(okex.prototype.__proto__ || _Object$getPrototypeOf(okex.prototype), "fetchMarkets", this).call(this);

              case 2:
                markets = _context.sent;

                for (i = 0; i < markets.length; i++) {
                  if (markets[i]['spot']) {
                    markets[i]['maker'] = -0.001;
                    markets[i]['taker'] = 0.001;
                  }
                }

                return _context.abrupt("return", markets);

              case 5:
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
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var symbols,
            params,
            request,
            response,
            tickers,
            timestamp,
            result,
            i,
            ticker,
            market,
            marketId,
            symbol,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                symbols = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : undefined;
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 4;
                return this.loadMarkets();

              case 4:
                request = {};
                _context2.next = 7;
                return this.publicGetTickers(this.extend(request, params));

              case 7:
                response = _context2.sent;
                tickers = response['tickers'];
                timestamp = parseInt(response['date']) * 1000;
                result = {};

                for (i = 0; i < tickers.length; i++) {
                  ticker = tickers[i];
                  market = undefined;

                  if ('symbol' in ticker) {
                    marketId = ticker['symbol'];
                    if (marketId in this.markets_by_id) market = this.markets_by_id[marketId];
                  }

                  ticker = this.parseTicker(this.extend(tickers[i], {
                    'timestamp': timestamp
                  }), market);
                  symbol = ticker['symbol'];
                  result[symbol] = ticker;
                }

                return _context2.abrupt("return", result);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }]);

  return okex;
}(okcoinusd);