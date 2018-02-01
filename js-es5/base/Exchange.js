"use strict";
/*  ------------------------------------------------------------------------ */

var _Promise = require("@babel/runtime/core-js/promise");

var _Object$values = require("@babel/runtime/core-js/object/values");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$entries = require("@babel/runtime/core-js/object/entries");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

var _Object$getOwnPropertyNames = require("@babel/runtime/core-js/object/get-own-property-names");

var _getIterator = require("@babel/runtime/core-js/get-iterator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var functions = require('./functions'),
    Market = require('./Market');

var isNode = functions.isNode,
    keys = functions.keys,
    values = functions.values,
    deepExtend = functions.deepExtend,
    extend = functions.extend,
    flatten = functions.flatten,
    indexBy = functions.indexBy,
    sortBy = functions.sortBy,
    groupBy = functions.groupBy,
    aggregate = functions.aggregate,
    uuid = functions.uuid,
    unCamelCase = functions.unCamelCase,
    precisionFromString = functions.precisionFromString,
    throttle = functions.throttle,
    capitalize = functions.capitalize,
    now = functions.now,
    sleep = functions.sleep,
    timeout = functions.timeout,
    TimedOut = functions.TimedOut;

var _require = require('./errors'),
    ExchangeError = _require.ExchangeError,
    NotSupported = _require.NotSupported,
    AuthenticationError = _require.AuthenticationError,
    DDoSProtection = _require.DDoSProtection,
    RequestTimeout = _require.RequestTimeout,
    ExchangeNotAvailable = _require.ExchangeNotAvailable;

var defaultFetch = isNode ? require('fetch-ponyfill')().fetch : fetch;
var journal = undefined; // isNode && require ('./journal') // stub until we get a better solution for Webpack and React

/*  ------------------------------------------------------------------------ */

module.exports =
/*#__PURE__*/
function () {
  _createClass(Exchange, [{
    key: "getMarket",
    value: function getMarket(symbol) {
      if (!this.marketClasses) this.marketClasses = {};
      var marketClass = this.marketClasses[symbol];
      if (marketClass) return marketClass;
      marketClass = new Market(this, symbol);
      this.marketClasses[symbol] = marketClass; // only one Market instance per market

      return marketClass;
    }
  }, {
    key: "describe",
    value: function describe() {
      return {
        'id': undefined,
        'name': undefined,
        'countries': undefined,
        'enableRateLimit': false,
        'rateLimit': 2000,
        // milliseconds = seconds * 1000
        'has': {
          'CORS': false,
          'publicAPI': true,
          'privateAPI': true,
          'cancelOrder': true,
          'createDepositAddress': false,
          'createOrder': true,
          'deposit': false,
          'fetchBalance': true,
          'fetchClosedOrders': false,
          'fetchCurrencies': false,
          'fetchDepositAddress': false,
          'fetchMarkets': true,
          'fetchMyTrades': false,
          'fetchOHLCV': false,
          'fetchOpenOrders': false,
          'fetchOrder': false,
          'fetchOrderBook': true,
          'fetchOrders': false,
          'fetchTicker': true,
          'fetchTickers': false,
          'fetchBidsAsks': false,
          'fetchTrades': true,
          'withdraw': false
        },
        'urls': {
          'logo': undefined,
          'api': undefined,
          'www': undefined,
          'doc': undefined,
          'fees': undefined
        },
        'api': undefined,
        'requiredCredentials': {
          'apiKey': true,
          'secret': true,
          'uid': false,
          'login': false,
          'password': false
        },
        'markets': undefined,
        // to be filled manually or by fetchMarkets
        'currencies': {},
        // to be filled manually or by fetchMarkets
        'timeframes': undefined,
        // redefine if the exchange has.fetchOHLCV
        'fees': {
          'trading': {
            'tierBased': undefined,
            'percentage': undefined,
            'taker': undefined,
            'maker': undefined
          },
          'funding': {
            'tierBased': undefined,
            'percentage': undefined,
            'withdraw': undefined,
            'deposit': undefined
          }
        },
        'parseJsonResponse': true,
        // whether a reply is required to be in JSON or not
        'skipJsonOnStatusCodes': [],
        // array of http status codes which override requirement for JSON response
        'exceptions': undefined,
        'parseBalanceFromOpenOrders': false // some exchanges return balance updates from order API endpoints
        // return

      };
    } // describe ()

  }]);

  function Exchange() {
    var _this = this;

    var userConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Exchange);

    _Object$assign(this, functions, {
      encode: function encode(string) {
        return string;
      },
      decode: function decode(string) {
        return string;
      }
    });

    if (isNode) this.nodeVersion = process.version.match(/\d+\.\d+.\d+/)[0]; // if (isNode) {
    //     this.userAgent = {
    //         'User-Agent': 'ccxt/' + Exchange.ccxtVersion +
    //             ' (+https://github.com/ccxt/ccxt)' +
    //             ' Node.js/' + this.nodeVersion + ' (JavaScript)'
    //     }
    // }

    this.options = {}; // exchange-specific options, if any

    this.userAgents = {
      'chrome': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      'chrome39': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36'
    };
    this.headers = {}; // prepended to URL, like https://proxy.com/https://exchange.com/api...

    this.proxy = '';
    this.origin = '*'; // CORS origin

    this.iso8601 = function (timestamp) {
      return new Date(timestamp).toISOString();
    };

    this.parse8601 = function (x) {
      return Date.parse(x.indexOf('+') >= 0 || x.slice(-1) === 'Z' ? x : x + 'Z');
    };

    this.milliseconds = now;

    this.microseconds = function () {
      return now() * 1000;
    }; // TODO: utilize performance.now for that purpose


    this.seconds = function () {
      return Math.floor(now() / 1000);
    };

    this.substituteCommonCurrencyCodes = true; // reserved
    // do not delete this line, it is needed for users to be able to define their own fetchImplementation

    this.fetchImplementation = defaultFetch;
    this.timeout = 10000; // milliseconds

    this.verbose = false;
    this.debug = false;
    this.journal = 'debug.json';
    this.userAgent = undefined;
    this.twofa = false; // two-factor authentication (2FA)

    this.apiKey = undefined;
    this.secret = undefined;
    this.uid = undefined;
    this.login = undefined;
    this.password = undefined;
    this.balance = {};
    this.orderbooks = {};
    this.tickers = {};
    this.orders = {};
    this.trades = {};
    this.last_http_response = undefined;
    this.last_json_response = undefined;

    this.arrayConcat = function (a, b) {
      return a.concat(b);
    };

    var unCamelCaseProperties = function unCamelCaseProperties() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this;

      if (obj !== null) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator(_Object$getOwnPropertyNames(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _k = _step.value;
            _this[unCamelCase(_k)] = _this[_k];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        unCamelCaseProperties(_Object$getPrototypeOf(obj));
      }
    };

    unCamelCaseProperties(); // merge configs

    var config = deepExtend(this.describe(), userConfig); // merge to this

    var _arr = _Object$entries(config);

    for (var _i = 0; _i < _arr.length; _i++) {
      var _ref = _arr[_i];

      var _ref2 = _slicedToArray(_ref, 2);

      var property = _ref2[0];
      var value = _ref2[1];
      this[property] = deepExtend(this[property], value);
    } // generate old metainfo interface


    for (var k in this.has) {
      this['has' + capitalize(k)] = !!this.has[k]; // converts 'emulated' to true
    }

    if (this.api) this.defineRestApi(this.api, 'request');
    this.initRestRateLimiter();
    if (this.markets) this.setMarkets(this.markets);

    if (this.debug && journal) {
      journal(function () {
        return _this.journal;
      }, this, _Object$keys(this.has));
    }
  }

  _createClass(Exchange, [{
    key: "defaults",
    value: function defaults() {
      return {
        /* override me */
      };
    }
  }, {
    key: "nonce",
    value: function nonce() {
      return this.seconds();
    }
  }, {
    key: "encodeURIComponent",
    value: function (_encodeURIComponent) {
      function encodeURIComponent() {
        return _encodeURIComponent.apply(this, arguments);
      }

      encodeURIComponent.toString = function () {
        return _encodeURIComponent.toString();
      };

      return encodeURIComponent;
    }(function () {
      return encodeURIComponent.apply(void 0, arguments);
    })
  }, {
    key: "checkRequiredCredentials",
    value: function checkRequiredCredentials() {
      var _this2 = this;

      _Object$keys(this.requiredCredentials).map(function (key) {
        if (_this2.requiredCredentials[key] && !_this2[key]) throw new AuthenticationError(_this2.id + ' requires `' + key + '`');
      });
    }
  }, {
    key: "initRestRateLimiter",
    value: function initRestRateLimiter() {
      var fetchImplementation = this.fetchImplementation;
      if (this.rateLimit === undefined) throw new Error(this.id + '.rateLimit property is not configured');
      this.tokenBucket = this.extend({
        refillRate: 1 / this.rateLimit,
        delay: 1,
        capacity: 1,
        defaultCost: 1,
        maxCapacity: 1000
      }, this.tokenBucket);
      this.throttle = throttle(this.tokenBucket);

      this.executeRestRequest = function (url) {
        var _this3 = this;

        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
        var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
        var promise = fetchImplementation(url, {
          method: method,
          headers: headers,
          body: body,
          'agent': this.tunnelAgent || null,
          timeout: this.timeout
        }).catch(function (e) {
          if (isNode) throw new ExchangeNotAvailable([_this3.id, method, url, e.type, e.message].join(' '));
          throw e; // rethrow all unknown errors
        }).then(function (response) {
          return _this3.handleRestResponse(response, url, method, headers, body);
        });
        return timeout(this.timeout, promise).catch(function (e) {
          if (e instanceof TimedOut) throw new RequestTimeout(_this3.id + ' ' + method + ' ' + url + ' request timed out (' + _this3.timeout + ' ms)');
          throw e;
        });
      };
    }
  }, {
    key: "defineRestApi",
    value: function defineRestApi(api, methodName) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _loop = function _loop(type) {
        var _arr3 = _Object$keys(api[type]);

        for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
          var httpMethod = _arr3[_i3];
          var paths = api[type][httpMethod];

          var _loop2 = function _loop2(i) {
            var path = paths[i].trim();
            var splitPath = path.split(/[^a-zA-Z0-9]/);
            var uppercaseMethod = httpMethod.toUpperCase();
            var lowercaseMethod = httpMethod.toLowerCase();

            var camelcaseMethod = _this4.capitalize(lowercaseMethod);

            var camelcaseSuffix = splitPath.map(_this4.capitalize).join('');
            var underscoreSuffix = splitPath.map(function (x) {
              return x.trim().toLowerCase();
            }).filter(function (x) {
              return x.length > 0;
            }).join('_');

            var camelcase = type + camelcaseMethod + _this4.capitalize(camelcaseSuffix);

            var underscore = type + '_' + lowercaseMethod + '_' + underscoreSuffix;

            if ('suffixes' in options) {
              if ('camelcase' in options['suffixes']) camelcase += options['suffixes']['camelcase'];
              if ('underscore' in options.suffixes) underscore += options['suffixes']['underscore'];
            }

            if ('underscore_suffix' in options) underscore += options.underscoreSuffix;
            if ('camelcase_suffix' in options) camelcase += options.camelcaseSuffix;

            var partial =
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              _regeneratorRuntime.mark(function _callee(params) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", _this4[methodName](path, type, uppercaseMethod, params || {}));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function partial(_x) {
                return _ref3.apply(this, arguments);
              };
            }();

            _this4[camelcase] = partial;
            _this4[underscore] = partial;
          };

          for (var i = 0; i < paths.length; i++) {
            _loop2(i);
          }
        }
      };

      var _arr2 = _Object$keys(api);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var type = _arr2[_i2];

        _loop(type);
      }
    }
  }, {
    key: "fetch",
    value: function fetch(url) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      if (isNode && this.userAgent) {
        if (typeof this.userAgent === 'string') headers = extend({
          'User-Agent': this.userAgent
        }, headers);else if (_typeof(this.userAgent) === 'object' && 'User-Agent' in this.userAgent) headers = extend(this.userAgent, headers);
      }

      if (typeof this.proxy === 'function') {
        url = this.proxy(url);
        if (isNode) headers = extend({
          'Origin': this.origin
        }, headers);
      } else if (typeof this.proxy === 'string') {
        if (this.proxy.length) if (isNode) headers = extend({
          'Origin': this.origin
        }, headers);
        url = this.proxy + url;
      }

      headers = extend(this.headers, headers);
      if (this.verbose) console.log("fetch:\n", this.id, method, url, "\nRequest:\n", headers, "\n", body, "\n");
      return this.executeRestRequest(url, method, headers, body);
    }
  }, {
    key: "fetch2",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(path) {
        var type,
            method,
            params,
            headers,
            body,
            request,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                type = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'public';
                method = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'GET';
                params = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
                headers = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : undefined;
                body = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : undefined;

                if (!this.enableRateLimit) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 8;
                return this.throttle();

              case 8:
                request = this.sign(path, type, method, params, headers, body);
                return _context2.abrupt("return", this.fetch(request.url, request.method, request.headers, request.body));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetch2(_x2) {
        return _fetch.apply(this, arguments);
      };
    }()
  }, {
    key: "request",
    value: function request(path) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      return this.fetch2(path, type, method, params, headers, body);
    }
  }, {
    key: "parseJson",
    value: function parseJson(responseBody, url) {
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';

      try {
        return responseBody.length > 0 ? JSON.parse(responseBody) : {}; // empty object for empty body
      } catch (e) {
        var maintenance = responseBody.match(/offline|busy|retry|wait|unavailable|maintain|maintenance|maintenancing/i);
        var ddosProtection = responseBody.match(/cloudflare|incapsula|overload/i);

        if (e instanceof SyntaxError) {
          var error = ExchangeNotAvailable;
          var details = 'not accessible from this location at the moment';
          if (maintenance) details = 'offline, on maintenance or unreachable from this location at the moment';
          if (ddosProtection) error = DDoSProtection;
          throw new error([this.id, method, url, details].join(' '));
        }

        if (this.verbose) console.log('parseJson:\n', this.id, method, url, 'error', e, "response body:\n'" + responseBody + "'\n");
        throw e;
      }
    }
  }, {
    key: "handleErrors",
    value: function handleErrors(statusCode, statusText, url, method, requestHeaders, responseBody, json) {// override me
    }
  }, {
    key: "defaultErrorHandler",
    value: function defaultErrorHandler(code, reason, url, method, responseBody) {
      if (code >= 200 && code <= 299) return;
      var error = undefined;
      var details = responseBody;
      var match = responseBody.match(/<title>([^<]+)/i);
      if (match) details = match[1].trim();

      if ([418, 429].includes(code)) {
        error = DDoSProtection;
      } else if ([404, 409, 500, 501, 502, 520, 521, 522, 525].includes(code)) {
        error = ExchangeNotAvailable;
      } else if ([400, 403, 405, 503, 530].includes(code)) {
        var ddosProtection = responseBody.match(/cloudflare|incapsula/i);

        if (ddosProtection) {
          error = DDoSProtection;
        } else {
          error = ExchangeNotAvailable;
          details += ' (possible reasons: ' + ['invalid API keys', 'bad or old nonce', 'exchange is down or offline', 'on maintenance', 'DDoS protection', 'rate-limiting'].join(', ') + ')';
        }
      } else if ([408, 504].includes(code)) {
        error = RequestTimeout;
      } else if ([401, 511].includes(code)) {
        error = AuthenticationError;
      } else {
        error = ExchangeError;
      }

      throw new error([this.id, method, url, code, reason, details].join(' '));
    }
  }, {
    key: "handleRestResponse",
    value: function handleRestResponse(response, url) {
      var _this5 = this;

      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var requestHeaders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var requestBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return response.text().then(function (responseBody) {
        var jsonRequired = _this5.parseJsonResponse && !_this5.skipJsonOnStatusCodes.includes(response.status);
        var json = jsonRequired ? _this5.parseJson(responseBody, url, method) : undefined;
        if (_this5.verbose) console.log("handleRestResponse:\n", _this5.id, method, url, response.status, response.statusText, "\nResponse:\n", requestHeaders, "\n", responseBody, "\n");
        _this5.last_http_response = responseBody; // FIXME: for those classes that haven't switched to handleErrors yet

        _this5.last_json_response = json; // FIXME: for those classes that haven't switched to handleErrors yet

        var args = [response.status, response.statusText, url, method, requestHeaders, responseBody, json];

        _this5.handleErrors.apply(_this5, args);

        _this5.defaultErrorHandler(response.status, response.statusText, url, method, responseBody);

        return jsonRequired ? json : responseBody;
      });
    }
  }, {
    key: "setMarkets",
    value: function setMarkets(markets) {
      var _this6 = this;

      var currencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var values = _Object$values(markets).map(function (market) {
        return deepExtend({
          'limits': _this6.limits,
          'precision': _this6.precision
        }, _this6.fees['trading'], market);
      });

      this.markets = deepExtend(this.markets, indexBy(values, 'symbol'));
      this.marketsById = indexBy(markets, 'id');
      this.markets_by_id = this.marketsById;
      this.symbols = _Object$keys(this.markets).sort();
      this.ids = _Object$keys(this.markets_by_id).sort();

      if (currencies) {
        this.currencies = deepExtend(currencies, this.currencies);
      } else {
        var baseCurrencies = values.filter(function (market) {
          return 'base' in market;
        }).map(function (market) {
          return {
            id: market.baseId || market.base,
            code: market.base,
            precision: market.precision ? market.precision.base || market.precision.amount : 8
          };
        });
        var quoteCurrencies = values.filter(function (market) {
          return 'quote' in market;
        }).map(function (market) {
          return {
            id: market.quoteId || market.quote,
            code: market.quote,
            precision: market.precision ? market.precision.quote || market.precision.price : 8
          };
        });
        var allCurrencies = baseCurrencies.concat(quoteCurrencies);
        var groupedCurrencies = groupBy(allCurrencies, 'code');

        var _currencies = _Object$keys(groupedCurrencies).map(function (code) {
          return groupedCurrencies[code].reduce(function (previous, current) {
            return previous.precision > current.precision ? previous : current;
          }, groupedCurrencies[code][0]);
        });

        var sortedCurrencies = sortBy(flatten(_currencies), 'code');
        this.currencies = deepExtend(indexBy(sortedCurrencies, 'code'), this.currencies);
      }

      this.currencies_by_id = indexBy(this.currencies, 'id');
      return this.markets;
    }
  }, {
    key: "loadMarkets",
    value: function () {
      var _loadMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var reload,
            markets,
            currencies,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                reload = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;

                if (!(!reload && this.markets)) {
                  _context3.next = 5;
                  break;
                }

                if (this.marketsById) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", this.setMarkets(this.markets));

              case 4:
                return _context3.abrupt("return", this.markets);

              case 5:
                _context3.next = 7;
                return this.fetchMarkets();

              case 7:
                markets = _context3.sent;
                currencies = undefined;

                if (!this.has.fetchCurrencies) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 12;
                return this.fetchCurrencies();

              case 12:
                currencies = _context3.sent;

              case 13:
                return _context3.abrupt("return", this.setMarkets(markets, currencies));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function loadMarkets() {
        return _loadMarkets.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchBidsAsks",
    value: function fetchBidsAsks() {
      var symbols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      throw new NotSupported(this.id + ' fetchBidsAsks not supported yet');
    }
  }, {
    key: "fetchTickers",
    value: function fetchTickers() {
      var symbols = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      throw new NotSupported(this.id + ' fetchTickers not supported yet');
    }
  }, {
    key: "fetchOrder",
    value: function fetchOrder(id) {
      var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      throw new NotSupported(this.id + ' fetchOrder not supported yet');
    }
  }, {
    key: "fetchOrders",
    value: function fetchOrders() {
      var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var since = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      throw new NotSupported(this.id + ' fetchOrders not supported yet');
    }
  }, {
    key: "fetchOpenOrders",
    value: function fetchOpenOrders() {
      var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var since = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      throw new NotSupported(this.id + ' fetchOpenOrders not supported yet');
    }
  }, {
    key: "fetchClosedOrders",
    value: function fetchClosedOrders() {
      var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var since = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      throw new NotSupported(this.id + ' fetchClosedOrders not supported yet');
    }
  }, {
    key: "fetchMyTrades",
    value: function fetchMyTrades() {
      var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var since = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      throw new NotSupported(this.id + ' fetchMyTrades not supported yet');
    }
  }, {
    key: "fetchCurrencies",
    value: function fetchCurrencies() {
      throw new NotSupported(this.id + ' fetchCurrencies not supported yet');
    }
  }, {
    key: "fetchMarkets",
    value: function fetchMarkets() {
      var _this7 = this;

      return new _Promise(function (resolve, reject) {
        return resolve(_this7.markets);
      });
    }
  }, {
    key: "fetchOrderStatus",
    value: function () {
      var _fetchOrderStatus = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(id) {
        var market,
            order,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                market = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : undefined;
                _context4.next = 3;
                return this.fetchOrder(id, market);

              case 3:
                order = _context4.sent;
                return _context4.abrupt("return", order['status']);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchOrderStatus(_x3) {
        return _fetchOrderStatus.apply(this, arguments);
      };
    }()
  }, {
    key: "account",
    value: function account() {
      return {
        'free': 0.0,
        'used': 0.0,
        'total': 0.0
      };
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (!this.substituteCommonCurrencyCodes) return currency;
      if (currency === 'XBT') return 'BTC';
      if (currency === 'BCC') return 'BCH';
      if (currency === 'DRK') return 'DASH';
      if (currency === 'XDG') return 'DOGE';
      return currency;
    }
  }, {
    key: "currency",
    value: function currency(code) {
      if (typeof this.currencies === 'undefined') return new ExchangeError(this.id + ' currencies not loaded');
      if (typeof code === 'string' && code in this.currencies) return this.currencies[code];
      throw new ExchangeError(this.id + ' does not have currency code ' + code);
    }
  }, {
    key: "market",
    value: function market(symbol) {
      if (typeof this.markets === 'undefined') return new ExchangeError(this.id + ' markets not loaded');
      if (typeof symbol === 'string' && symbol in this.markets) return this.markets[symbol];
      throw new ExchangeError(this.id + ' does not have market symbol ' + symbol);
    }
  }, {
    key: "marketId",
    value: function marketId(symbol) {
      return this.market(symbol).id || symbol;
    }
  }, {
    key: "marketIds",
    value: function marketIds(symbols) {
      var _this8 = this;

      return symbols.map(function (symbol) {
        return _this8.marketId(symbol);
      });
    }
  }, {
    key: "symbol",
    value: function symbol(_symbol) {
      return this.market(_symbol).symbol || _symbol;
    }
  }, {
    key: "extractParams",
    value: function extractParams(string) {
      var re = /{([\w-]+)}/g;
      var matches = [];
      var match;

      while (match = re.exec(string)) {
        matches.push(match[1]);
      }

      return matches;
    }
  }, {
    key: "implodeParams",
    value: function implodeParams(string, params) {
      for (var property in params) {
        string = string.replace('{' + property + '}', params[property]);
      }

      return string;
    }
  }, {
    key: "url",
    value: function url(path) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var result = this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));
      if (_Object$keys(query).length) result += '?' + this.urlencode(query);
      return result;
    }
  }, {
    key: "parseBidAsk",
    value: function parseBidAsk(bidask) {
      var priceKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var amountKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var price = parseFloat(bidask[priceKey]);
      var amount = parseFloat(bidask[amountKey]);
      return [price, amount];
    }
  }, {
    key: "parseBidsAsks",
    value: function parseBidsAsks(bidasks) {
      var _this9 = this;

      var priceKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var amountKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return _Object$values(bidasks || []).map(function (bidask) {
        return _this9.parseBidAsk(bidask, priceKey, amountKey);
      });
    }
  }, {
    key: "fetchL2OrderBook",
    value: function () {
      var _fetchL2OrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            orderbook,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.fetchOrderBook(symbol, params);

              case 3:
                orderbook = _context5.sent;
                return _context5.abrupt("return", extend(orderbook, {
                  'bids': sortBy(aggregate(orderbook.bids), 0, true),
                  'asks': sortBy(aggregate(orderbook.asks), 0)
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchL2OrderBook(_x4) {
        return _fetchL2OrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseOrderBook",
    value: function parseOrderBook(orderbook) {
      var timestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var bidsKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bids';
      var asksKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'asks';
      var priceKey = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var amountKey = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      timestamp = timestamp || this.milliseconds();
      return {
        'bids': sortBy(bidsKey in orderbook ? this.parseBidsAsks(orderbook[bidsKey], priceKey, amountKey) : [], 0, true),
        'asks': sortBy(asksKey in orderbook ? this.parseBidsAsks(orderbook[asksKey], priceKey, amountKey) : [], 0),
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp)
      };
    }
  }, {
    key: "getCurrencyUsedOnOpenOrders",
    value: function getCurrencyUsedOnOpenOrders(currency) {
      var _this10 = this;

      return _Object$values(this.orders).filter(function (order) {
        return order['status'] === 'open';
      }).reduce(function (total, order) {
        var symbol = order['symbol'];
        var market = _this10.markets[symbol];
        var amount = order['remaining'];

        if (currency === market['base'] && order['side'] === 'sell') {
          return total + amount;
        } else if (currency === market['quote'] && order['side'] === 'buy') {
          return total + (order['cost'] || order['price'] * amount);
        } else {
          return total;
        }
      }, 0);
    }
  }, {
    key: "parseBalance",
    value: function parseBalance(balance) {
      var _this11 = this;

      var currencies = _Object$keys(this.omit(balance, 'info'));

      currencies.forEach(function (currency) {
        if (typeof balance[currency].used === 'undefined') {
          if (_this11.parseBalanceFromOpenOrders && 'open_orders' in balance['info']) {
            var exchangeOrdersCount = balance['info']['open_orders'];

            var cachedOrdersCount = _Object$values(_this11.orders).filter(function (order) {
              return order['status'] === 'open';
            }).length;

            if (cachedOrdersCount === exchangeOrdersCount) {
              balance[currency].used = _this11.getCurrencyUsedOnOpenOrders(currency);
              balance[currency].total = balance[currency].used + balance[currency].free;
            }
          } else {
            balance[currency].used = _this11.getCurrencyUsedOnOpenOrders(currency);
            balance[currency].total = balance[currency].used + balance[currency].free;
          }
        }

        ['free', 'used', 'total'].forEach(function (account) {
          balance[account] = balance[account] || {};
          balance[account][currency] = balance[currency][account];
        });
      });
      return balance;
    }
  }, {
    key: "fetchPartialBalance",
    value: function () {
      var _fetchPartialBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(part) {
        var params,
            balance,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 3;
                return this.fetchBalance(params);

              case 3:
                balance = _context6.sent;
                return _context6.abrupt("return", balance[part]);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchPartialBalance(_x5) {
        return _fetchPartialBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchFreeBalance",
    value: function fetchFreeBalance() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.fetchPartialBalance('free', params);
    }
  }, {
    key: "fetchUsedBalance",
    value: function fetchUsedBalance() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.fetchPartialBalance('used', params);
    }
  }, {
    key: "fetchTotalBalance",
    value: function fetchTotalBalance() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.fetchPartialBalance('total', params);
    }
  }, {
    key: "filterBySinceLimit",
    value: function filterBySinceLimit(array) {
      var since = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      if (typeof since !== 'undefined') array = array.filter(function (entry) {
        return entry.timestamp > since;
      });
      if (typeof limit !== 'undefined') array = array.slice(0, limit);
      return array;
    }
  }, {
    key: "parseTrades",
    value: function parseTrades(trades) {
      var _this12 = this;

      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var since = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var result = _Object$values(trades).map(function (trade) {
        return _this12.parseTrade(trade, market);
      });

      result = sortBy(result, 'timestamp', true);
      return this.filterBySinceLimit(result, since, limit);
    }
  }, {
    key: "parseOrders",
    value: function parseOrders(orders) {
      var _this13 = this;

      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var since = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

      var result = _Object$values(orders).map(function (order) {
        return _this13.parseOrder(order, market);
      });

      return this.filterBySinceLimit(result, since, limit);
    }
  }, {
    key: "filterOrdersBySymbol",
    value: function filterOrdersBySymbol(orders) {
      var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var grouped = this.groupBy(orders, 'symbol');

      if (symbol) {
        if (symbol in grouped) return grouped[symbol];
        return [];
      }

      return orders;
    }
  }, {
    key: "parseOHLCV",
    value: function parseOHLCV(ohlcv) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      return ohlcv;
    }
  }, {
    key: "parseOHLCVs",
    value: function parseOHLCVs(ohlcvs) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timeframe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1m';
      var since = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      ohlcvs = _Object$values(ohlcvs);
      var result = [];

      for (var i = 0; i < ohlcvs.length; i++) {
        if (limit && result.length >= limit) break;
        var ohlcv = this.parseOHLCV(ohlcvs[i], market, timeframe, since, limit);
        if (since && ohlcv[0] < since) continue;
        result.push(ohlcv);
      }

      return result;
    }
  }, {
    key: "editLimitBuyOrder",
    value: function editLimitBuyOrder(id, symbol) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return this.editLimitOrder.apply(this, [id, symbol, 'buy'].concat(args));
    }
  }, {
    key: "editLimitSellOrder",
    value: function editLimitSellOrder(id, symbol) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      return this.editLimitOrder.apply(this, [id, symbol, 'sell'].concat(args));
    }
  }, {
    key: "editLimitOrder",
    value: function editLimitOrder(id, symbol) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      return this.editOrder.apply(this, [id, symbol, 'limit'].concat(args));
    }
  }, {
    key: "editOrder",
    value: function () {
      var _editOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(id, symbol) {
        var _len4,
            args,
            _key4,
            _args7 = arguments;

        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.enableRateLimit) {
                  _context7.next = 2;
                  break;
                }

                throw new ExchangeError(this.id + ' editOrder() requires enableRateLimit = true');

              case 2:
                _context7.next = 4;
                return this.cancelOrder(id, symbol);

              case 4:
                for (_len4 = _args7.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                  args[_key4 - 2] = _args7[_key4];
                }

                return _context7.abrupt("return", this.createOrder.apply(this, [symbol].concat(args)));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function editOrder(_x6, _x7) {
        return _editOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "createLimitOrder",
    value: function createLimitOrder(symbol) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return this.createOrder.apply(this, [symbol, 'limit'].concat(args));
    }
  }, {
    key: "createMarketOrder",
    value: function createMarketOrder(symbol) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      return this.createOrder.apply(this, [symbol, 'market'].concat(args));
    }
  }, {
    key: "createLimitBuyOrder",
    value: function createLimitBuyOrder(symbol) {
      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      return this.createOrder.apply(this, [symbol, 'limit', 'buy'].concat(args));
    }
  }, {
    key: "createLimitSellOrder",
    value: function createLimitSellOrder(symbol) {
      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
        args[_key8 - 1] = arguments[_key8];
      }

      return this.createOrder.apply(this, [symbol, 'limit', 'sell'].concat(args));
    }
  }, {
    key: "createMarketBuyOrder",
    value: function createMarketBuyOrder(symbol, amount) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.createOrder(symbol, 'market', 'buy', amount, undefined, params);
    }
  }, {
    key: "createMarketSellOrder",
    value: function createMarketSellOrder(symbol, amount) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.createOrder(symbol, 'market', 'sell', amount, undefined, params);
    }
  }, {
    key: "costToPrecision",
    value: function costToPrecision(symbol, cost) {
      return parseFloat(cost).toFixed(this.markets[symbol].precision.price);
    }
  }, {
    key: "priceToPrecision",
    value: function priceToPrecision(symbol, price) {
      return parseFloat(price).toFixed(this.markets[symbol].precision.price);
    }
  }, {
    key: "amountToPrecision",
    value: function amountToPrecision(symbol, amount) {
      return this.truncate(amount, this.markets[symbol].precision.amount);
    }
  }, {
    key: "amountToString",
    value: function amountToString(symbol, amount) {
      return this.truncate_to_string(amount, this.markets[symbol].precision.amount);
    }
  }, {
    key: "amountToLots",
    value: function amountToLots(symbol, amount) {
      var lot = this.markets[symbol].lot;
      return this.amountToPrecision(symbol, Math.floor(amount / lot) * lot);
    }
  }, {
    key: "feeToPrecision",
    value: function feeToPrecision(symbol, fee) {
      return parseFloat(fee).toFixed(this.markets[symbol].precision.price);
    }
  }, {
    key: "calculateFee",
    value: function calculateFee(symbol, type, side, amount, price) {
      var takerOrMaker = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'taker';
      var params = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var market = this.markets[symbol];
      var rate = market[takerOrMaker];
      var cost = parseFloat(this.costToPrecision(symbol, amount * price));
      return {
        'type': takerOrMaker,
        'currency': market['quote'],
        'rate': rate,
        'cost': parseFloat(this.feeToPrecision(symbol, rate * cost))
      };
    }
  }, {
    key: "Ymd",
    value: function Ymd(timestamp) {
      var infix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
      var date = new Date(timestamp);
      var Y = date.getUTCFullYear();
      var m = date.getUTCMonth() + 1;
      var d = date.getUTCDate();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      return Y + '-' + m + '-' + d;
    }
  }, {
    key: "YmdHMS",
    value: function YmdHMS(timestamp) {
      var infix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
      var date = new Date(timestamp);
      var Y = date.getUTCFullYear();
      var m = date.getUTCMonth() + 1;
      var d = date.getUTCDate();
      var H = date.getUTCHours();
      var M = date.getUTCMinutes();
      var S = date.getUTCSeconds();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0' + d : d;
      H = H < 10 ? '0' + H : H;
      M = M < 10 ? '0' + M : M;
      S = S < 10 ? '0' + S : S;
      return Y + '-' + m + '-' + d + infix + H + ':' + M + ':' + S;
    }
  }]);

  return Exchange;
}();