"use strict"; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var bter = require('./bter.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_bter) {
  _inherits(gateio, _bter);

  function gateio() {
    _classCallCheck(this, gateio);

    return _possibleConstructorReturn(this, (gateio.__proto__ || _Object$getPrototypeOf(gateio)).apply(this, arguments));
  }

  _createClass(gateio, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(gateio.prototype.__proto__ || _Object$getPrototypeOf(gateio.prototype), "describe", this).call(this), {
        'id': 'gateio',
        'name': 'Gate.io',
        'countries': 'CN',
        'rateLimit': 1000,
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/31784029-0313c702-b509-11e7-9ccc-bc0da6a0e435.jpg',
          'api': {
            'public': 'https://data.gate.io/api',
            'private': 'https://data.gate.io/api'
          },
          'www': 'https://gate.io/',
          'doc': 'https://gate.io/api2'
        }
      });
    }
  }]);

  return gateio;
}(bter);