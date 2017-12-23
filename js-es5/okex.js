"use strict"; // ---------------------------------------------------------------------------

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
        'hasCORS': false,
        'hasFutureMarkets': true,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/32552768-0d6dd3c6-c4a6-11e7-90f8-c043b64756a7.jpg',
          'api': {
            'web': 'https://www.okex.com/v2',
            'public': 'https://www.okex.com/api',
            'private': 'https://www.okex.com/api'
          },
          'www': 'https://www.okex.com',
          'doc': 'https://www.okex.com/rest_getStarted.html'
        }
      });
    }
  }]);

  return okex;
}(okcoinusd);