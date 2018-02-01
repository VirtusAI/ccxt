'use strict'; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var _1btcxe = require('./_1btcxe.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_btcxe) {
  _inherits(getbtc, _btcxe);

  function getbtc() {
    _classCallCheck(this, getbtc);

    return _possibleConstructorReturn(this, (getbtc.__proto__ || _Object$getPrototypeOf(getbtc)).apply(this, arguments));
  }

  _createClass(getbtc, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(getbtc.prototype.__proto__ || _Object$getPrototypeOf(getbtc.prototype), "describe", this).call(this), {
        'id': 'getbtc',
        'name': 'GetBTC',
        'countries': ['VC', 'RU'],
        // Saint Vincent and the Grenadines, Russia, CIS
        'rateLimit': 1000,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/33801902-03c43462-dd7b-11e7-992e-077e4cd015b9.jpg',
          'api': 'https://getbtc.org/api',
          'www': 'https://getbtc.org',
          'doc': 'https://getbtc.org/api-docs.php'
        },
        'fees': {
          'trading': {
            'taker': 0.20 / 100,
            'maker': 0.20 / 100
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
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", [{
                  'id': 'EUR',
                  'symbol': 'BTC/EUR',
                  'base': 'BTC',
                  'quote': 'EUR',
                  'precision': {
                    'amount': 8,
                    'price': 8
                  },
                  'lot': 0.00000001,
                  'limits': {
                    'amount': {
                      'min': 0.00000001,
                      'max': undefined
                    },
                    'price': {
                      'min': 0.00000001,
                      'max': undefined
                    }
                  }
                }, {
                  'id': 'RUB',
                  'symbol': 'BTC/RUB',
                  'base': 'BTC',
                  'quote': 'RUB',
                  'precision': {
                    'amount': 8,
                    'price': 8
                  },
                  'lot': 0.00000001,
                  'limits': {
                    'amount': {
                      'min': 0.00000001,
                      'max': undefined
                    },
                    'price': {
                      'min': 0.00000001,
                      'max': undefined
                    }
                  }
                }, {
                  'id': 'USD',
                  'symbol': 'BTC/USD',
                  'base': 'BTC',
                  'quote': 'USD',
                  'precision': {
                    'amount': 8,
                    'price': 8
                  },
                  'lot': 0.00000001,
                  'limits': {
                    'amount': {
                      'min': 0.00000001,
                      'max': undefined
                    },
                    'price': {
                      'min': 0.00000001,
                      'max': undefined
                    }
                  }
                }]);

              case 1:
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
  }]);

  return getbtc;
}(_1btcxe);