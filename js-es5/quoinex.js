'use strict'; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var qryptos = require('./qryptos.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_qryptos) {
  _inherits(quoinex, _qryptos);

  function quoinex() {
    _classCallCheck(this, quoinex);

    return _possibleConstructorReturn(this, (quoinex.__proto__ || _Object$getPrototypeOf(quoinex)).apply(this, arguments));
  }

  _createClass(quoinex, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(quoinex.prototype.__proto__ || _Object$getPrototypeOf(quoinex.prototype), "describe", this).call(this), {
        'id': 'quoinex',
        'name': 'QUOINEX',
        'countries': ['JP', 'SG', 'VN'],
        'version': '2',
        'rateLimit': 1000,
        'has': {
          'CORS': false,
          'fetchTickers': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/35047114-0e24ad4a-fbaa-11e7-96a9-69c1a756083b.jpg',
          'api': 'https://api.quoine.com',
          'www': 'https://quoinex.com/',
          'doc': ['https://developers.quoine.com', 'https://developers.quoine.com/v2'],
          'fees': 'https://quoine.zendesk.com/hc/en-us/articles/115011281488-Fees'
        }
      });
    }
  }]);

  return quoinex;
}(qryptos);