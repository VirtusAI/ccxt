"use strict"; // ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var liqui = require('./liqui.js');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    InsufficientFunds = _require.InsufficientFunds,
    DDoSProtection = _require.DDoSProtection; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_liqui) {
  _inherits(yobit, _liqui);

  function yobit() {
    _classCallCheck(this, yobit);

    return _possibleConstructorReturn(this, (yobit.__proto__ || _Object$getPrototypeOf(yobit)).apply(this, arguments));
  }

  _createClass(yobit, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(yobit.prototype.__proto__ || _Object$getPrototypeOf(yobit.prototype), "describe", this).call(this), {
        'id': 'yobit',
        'name': 'YoBit',
        'countries': 'RU',
        'rateLimit': 3000,
        // responses are cached every 2 seconds
        'version': '3',
        'hasCORS': false,
        'hasWithdraw': true,
        'hasFetchTickers': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766910-cdcbfdae-5eea-11e7-9859-03fea873272d.jpg',
          'api': {
            'public': 'https://yobit.net/api',
            'private': 'https://yobit.net/tapi'
          },
          'www': 'https://www.yobit.net',
          'doc': 'https://www.yobit.net/en/api/'
        },
        'api': {
          'public': {
            'get': ['depth/{pair}', 'info', 'ticker/{pair}', 'trades/{pair}']
          },
          'private': {
            'post': ['ActiveOrders', 'CancelOrder', 'GetDepositAddress', 'getInfo', 'OrderInfo', 'Trade', 'TradeHistory', 'WithdrawCoinsToAddress']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.002,
            'taker': 0.002
          },
          'funding': 0.0
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      var substitutions = {
        'AIR': 'AirCoin',
        'ANI': 'ANICoin',
        'ANT': 'AntsCoin',
        'ATM': 'Autumncoin',
        'BCC': 'BCH',
        'BTS': 'Bitshares2',
        'DCT': 'Discount',
        'DGD': 'DarkGoldCoin',
        'ICN': 'iCoin',
        'LIZI': 'LiZi',
        'LUN': 'LunarCoin',
        'NAV': 'NavajoCoin',
        'OMG': 'OMGame',
        'PAY': 'EPAY',
        'REP': 'Republicoin'
      };
      if (currency in substitutions) return substitutions[currency];
      return currency;
    }
  }, {
    key: "currencyId",
    value: function currencyId(commonCode) {
      var substitutions = {
        'AirCoin': 'AIR',
        'ANICoin': 'ANI',
        'AntsCoin': 'ANT',
        'Autumncoin': 'ATM',
        'BCH': 'BCC',
        'Bitshares2': 'BTS',
        'Discount': 'DCT',
        'DarkGoldCoin': 'DGD',
        'iCoin': 'ICN',
        'LiZi': 'LIZI',
        'LunarCoin': 'LUN',
        'NavajoCoin': 'NAV',
        'OMGame': 'OMG',
        'EPAY': 'PAY',
        'Republicoin': 'REP'
      };
      if (commonCode in substitutions) return substitutions[commonCode];
      return commonCode;
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            balances,
            result,
            sides,
            keys,
            i,
            key,
            side,
            currencies,
            j,
            lowercase,
            uppercase,
            currency,
            account,
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
                return this.privatePostGetInfo();

              case 5:
                response = _context.sent;
                balances = response['return'];
                result = {
                  'info': balances
                };
                sides = {
                  'free': 'funds',
                  'total': 'funds_incl_orders'
                };
                keys = _Object$keys(sides);

                for (i = 0; i < keys.length; i++) {
                  key = keys[i];
                  side = sides[key];

                  if (side in balances) {
                    currencies = _Object$keys(balances[side]);

                    for (j = 0; j < currencies.length; j++) {
                      lowercase = currencies[j];
                      uppercase = lowercase.toUpperCase();
                      currency = this.commonCurrencyCode(uppercase);
                      account = undefined;

                      if (currency in result) {
                        account = result[currency];
                      } else {
                        account = this.account();
                      }

                      account[key] = balances[side][lowercase];
                      if (account['total'] && account['free']) account['used'] = account['total'] - account['free'];
                      result[currency] = account;
                    }
                  }
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 12:
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
    key: "createDepositAddress",
    value: function () {
      var _createDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(currency) {
        var params,
            response,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.fetchDepositAddress(currency, this.extend({
                  'need_new': 1
                }, params));

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", {
                  'currency': currency,
                  'address': response['address'],
                  'status': 'ok',
                  'info': response['info']
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function createDepositAddress(_x) {
        return _createDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchDepositAddress",
    value: function () {
      var _fetchDepositAddress = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(currency) {
        var params,
            currencyId,
            request,
            response,
            address,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                currencyId = this.currencyId(currency);
                request = {
                  'coinName': currencyId,
                  'need_new': 0
                };
                _context3.next = 5;
                return this.privatePostGetDepositAddress(this.extend(request, params));

              case 5:
                response = _context3.sent;
                address = this.safeString(response['return'], 'address');
                return _context3.abrupt("return", {
                  'currency': currency,
                  'address': address,
                  'status': 'ok',
                  'info': response
                });

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchDepositAddress(_x2) {
        return _fetchDepositAddress.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(currency, amount, address) {
        var params,
            response,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                _context4.next = 3;
                return this.loadMarkets();

              case 3:
                _context4.next = 5;
                return this.privatePostWithdrawCoinsToAddress(this.extend({
                  'coinName': currency,
                  'amount': amount,
                  'address': address
                }, params));

              case 5:
                response = _context4.sent;
                return _context4.abrupt("return", {
                  'info': response,
                  'id': undefined
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function withdraw(_x3, _x4, _x5) {
        return _withdraw.apply(this, arguments);
      };
    }()
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                api = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 'public';
                method = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 'GET';
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                headers = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : undefined;
                body = _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : undefined;
                _context5.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context5.sent;

                if (!('success' in response)) {
                  _context5.next = 23;
                  break;
                }

                if (response['success']) {
                  _context5.next = 23;
                  break;
                }

                if (!(response['error'].indexOf('Insufficient funds') >= 0)) {
                  _context5.next = 14;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 14:
                if (!(response['error'] == 'Requests too often')) {
                  _context5.next = 18;
                  break;
                }

                throw new DDoSProtection(this.id + ' ' + this.json(response));

              case 18:
                if (!(response['error'] == 'not available' || response['error'] == 'external service unavailable')) {
                  _context5.next = 22;
                  break;
                }

                throw new DDoSProtection(this.id + ' ' + this.json(response));

              case 22:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 23:
                return _context5.abrupt("return", response);

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function request(_x6) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return yobit;
}(liqui);