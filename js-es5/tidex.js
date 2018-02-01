'use strict'; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var liqui = require('./liqui.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_liqui) {
  _inherits(tidex, _liqui);

  function tidex() {
    _classCallCheck(this, tidex);

    return _possibleConstructorReturn(this, (tidex.__proto__ || _Object$getPrototypeOf(tidex)).apply(this, arguments));
  }

  _createClass(tidex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(tidex.prototype.__proto__ || _Object$getPrototypeOf(tidex.prototype), "describe", this).call(this), {
        'id': 'tidex',
        'name': 'Tidex',
        'countries': 'UK',
        'rateLimit': 2000,
        'version': '3',
        'has': {
          // 'CORS': false,
          // 'fetchTickers': true
          'fetchCurrencies': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/30781780-03149dc4-a12e-11e7-82bb-313b269d24d4.jpg',
          'api': {
            'web': 'https://web.tidex.com/api',
            'public': 'https://api.tidex.com/api/3',
            'private': 'https://api.tidex.com/tapi'
          },
          'www': 'https://tidex.com',
          'doc': 'https://tidex.com/public-api',
          'fees': ['https://tidex.com/assets-spec', 'https://tidex.com/pairs-spec']
        },
        'api': {
          'web': {
            'get': ['currency', 'pairs', 'tickers', 'orders', 'ordershistory', 'trade-data', 'trade-data/{id}']
          }
        },
        'fees': {
          'trading': {
            'tierBased': false,
            'percentage': true,
            'taker': 0.1 / 100,
            'maker': 0.1 / 100
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (!this.substituteCommonCurrencyCodes) return currency;
      if (currency === 'XBT') return 'BTC';
      if (currency === 'BCC') return 'BCH';
      if (currency === 'DRK') return 'DASH'; // they misspell DASH as DSH? (may not be true)

      if (currency === 'DSH') return 'DASH'; // their MGO stands for MGO on WAVES (aka WMGO), see issue #1487

      if (currency === 'MGO') return 'WMGO'; // the MGO on ETH is called EMGO on Tidex

      if (currency === 'EMGO') return 'MGO';
      return currency;
    }
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            currencies,
            result,
            i,
            currency,
            id,
            precision,
            code,
            active,
            status,
            canWithdraw,
            canDeposit,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.webGetCurrency(params);

              case 3:
                currencies = _context.sent;
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['Symbol'];
                  precision = currency['AmountPoint'];
                  code = this.commonCurrencyCode(id);
                  active = currency['Visible'] === true;
                  status = 'ok';

                  if (!active) {
                    status = 'disabled';
                  }

                  canWithdraw = currency['WithdrawEnable'] === true;
                  canDeposit = currency['DepositEnable'] === true;

                  if (!canWithdraw || !canDeposit) {
                    active = false;
                  }

                  result[code] = {
                    'id': id,
                    'code': code,
                    'name': currency['Name'],
                    'active': active,
                    'status': status,
                    'precision': precision,
                    'funding': {
                      'withdraw': {
                        'active': canWithdraw,
                        'fee': currency['WithdrawFee']
                      },
                      'deposit': {
                        'active': canDeposit,
                        'fee': 0.0
                      }
                    },
                    'limits': {
                      'amount': {
                        'min': undefined,
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
                        'min': currency['WithdrawMinAmout'],
                        'max': undefined
                      },
                      'deposit': {
                        'min': currency['DepositMinAmount'],
                        'max': undefined
                      }
                    },
                    'info': currency
                  };
                }

                return _context.abrupt("return", result);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "getVersionString",
    value: function getVersionString() {
      return '';
    }
  }]);

  return tidex;
}(liqui);