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
  _inherits(urdubit, _foxbit);

  function urdubit() {
    _classCallCheck(this, urdubit);

    return _possibleConstructorReturn(this, (urdubit.__proto__ || _Object$getPrototypeOf(urdubit)).apply(this, arguments));
  }

  _createClass(urdubit, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(urdubit.prototype.__proto__ || _Object$getPrototypeOf(urdubit.prototype), "describe", this).call(this), {
        'id': 'urdubit',
        'name': 'UrduBit',
        'countries': 'PK',
        'hasCORS': false,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27991453-156bf3ae-6480-11e7-82eb-7295fe1b5bb4.jpg',
          'api': {
            'public': 'https://api.blinktrade.com/api',
            'private': 'https://api.blinktrade.com/tapi'
          },
          'www': 'https://urdubit.com',
          'doc': 'https://blinktrade.com/docs'
        }
      });
    }
  }]);

  return urdubit;
}(foxbit);