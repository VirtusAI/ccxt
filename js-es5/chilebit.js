"use strict"; // ---------------------------------------------------------------------------

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var foxbit = require('./foxbit.js'); // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_foxbit) {
  _inherits(chilebit, _foxbit);

  function chilebit() {
    _classCallCheck(this, chilebit);

    return _possibleConstructorReturn(this, (chilebit.__proto__ || _Object$getPrototypeOf(chilebit)).apply(this, arguments));
  }

  _createClass(chilebit, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(chilebit.prototype.__proto__ || _Object$getPrototypeOf(chilebit.prototype), "describe", this).call(this), {
        'id': 'chilebit',
        'name': 'ChileBit',
        'countries': 'CL',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27991414-1298f0d8-647f-11e7-9c40-d56409266336.jpg',
          'api': {
            'public': 'https://api.blinktrade.com/api',
            'private': 'https://api.blinktrade.com/tapi'
          },
          'www': 'https://chilebit.net',
          'doc': 'https://blinktrade.com/docs'
        }
      });
    }
  }]);

  return chilebit;
}(foxbit);