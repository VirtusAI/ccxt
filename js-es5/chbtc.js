"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var zb = require('./zb.js');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    ExchangeNotAvailable = _require.ExchangeNotAvailable; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_zb) {
  _inherits(chbtc, _zb);

  function chbtc() {
    _classCallCheck(this, chbtc);

    return _possibleConstructorReturn(this, (chbtc.__proto__ || _Object$getPrototypeOf(chbtc)).apply(this, arguments));
  }

  _createClass(chbtc, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(chbtc.prototype.__proto__ || _Object$getPrototypeOf(chbtc.prototype), "describe", this).call(this), {
        'id': 'chbtc',
        'name': 'CHBTC',
        'countries': 'CN',
        'rateLimit': 1000,
        'version': 'v1',
        'hasCORS': false,
        'hasFetchOrder': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/28555659-f0040dc2-7109-11e7-9d99-688a438bf9f4.jpg',
          'api': {
            'public': 'http://api.chbtc.com/data',
            // no https for public API
            'private': 'https://trade.chbtc.com/api'
          },
          'www': 'https://trade.chbtc.com/api',
          'doc': 'https://www.chbtc.com/i/developer'
        }
      });
    }
  }, {
    key: "getMarketFieldName",
    value: function getMarketFieldName() {
      return 'currency';
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
                return _context.abrupt("return", {
                  'BTC/CNY': {
                    'id': 'btc_cny',
                    'symbol': 'BTC/CNY',
                    'base': 'BTC',
                    'quote': 'CNY'
                  },
                  'LTC/CNY': {
                    'id': 'ltc_cny',
                    'symbol': 'LTC/CNY',
                    'base': 'LTC',
                    'quote': 'CNY'
                  },
                  'ETH/CNY': {
                    'id': 'eth_cny',
                    'symbol': 'ETH/CNY',
                    'base': 'ETH',
                    'quote': 'CNY'
                  },
                  'ETC/CNY': {
                    'id': 'etc_cny',
                    'symbol': 'ETC/CNY',
                    'base': 'ETC',
                    'quote': 'CNY'
                  },
                  'BTS/CNY': {
                    'id': 'bts_cny',
                    'symbol': 'BTS/CNY',
                    'base': 'BTS',
                    'quote': 'CNY'
                  },
                  // 'EOS/CNY': { 'id': 'eos_cny', 'symbol': 'EOS/CNY', 'base': 'EOS', 'quote': 'CNY' },
                  'BCH/CNY': {
                    'id': 'bcc_cny',
                    'symbol': 'BCH/CNY',
                    'base': 'BCH',
                    'quote': 'CNY'
                  },
                  'HSR/CNY': {
                    'id': 'hsr_cny',
                    'symbol': 'HSR/CNY',
                    'base': 'HSR',
                    'quote': 'CNY'
                  },
                  'QTUM/CNY': {
                    'id': 'qtum_cny',
                    'symbol': 'QTUM/CNY',
                    'base': 'QTUM',
                    'quote': 'CNY'
                  }
                });

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
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                api = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'public';
                method = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'GET';
                params = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
                headers = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : undefined;
                body = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : undefined;
                _context2.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context2.sent;

                if (!(api == 'private')) {
                  _context2.next = 11;
                  break;
                }

                if (!('code' in response)) {
                  _context2.next = 11;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 11:
                if (!('result' in response)) {
                  _context2.next = 14;
                  break;
                }

                if (response['result']) {
                  _context2.next = 14;
                  break;
                }

                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 14:
                return _context2.abrupt("return", response);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function request(_x) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return chbtc;
}(zb);