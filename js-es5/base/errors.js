'use strict';
/*  ------------------------------------------------------------------------ */

var _Object$entries = require("@babel/runtime/core-js/object/entries");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _inherits = require("@babel/runtime/helpers/inherits");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

module.exports = subclass(
/*  Root class                  */
Error,
/*  Derived class hierarchy     */
{
  'BaseError': {
    'ExchangeError': {
      'NotSupported': {},
      'AuthenticationError': {},
      'InvalidNonce': {},
      'InsufficientFunds': {},
      'InvalidOrder': {
        'OrderNotFound': {},
        'OrderNotCached': {},
        'CancelPending': {}
      },
      'NetworkError': {
        'DDoSProtection': {},
        'RequestTimeout': {},
        'ExchangeNotAvailable': {}
      }
    }
  }
});
/*  ------------------------------------------------------------------------ */

function subclass(BaseClass, classes) {
  var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _loop = function _loop($class, subclasses) {
    var Class = _Object$assign(namespace, _defineProperty({}, $class,
    /*#__PURE__*/
    function (_BaseClass) {
      _inherits(_class, _BaseClass);

      function _class(message) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, (_class.__proto__ || _Object$getPrototypeOf(_class)).call(this, message));
        /*  A workaround to make `instanceof` work on custom Error classes in transpiled ES5.
            See my blog post for the explanation of this hack:
             https://medium.com/@xpl/javascript-deriving-from-error-properly-8d2f8f315801        */

        _this.constructor = Class;
        _this.__proto__ = Class.prototype;
        _this.message = message;
        return _this;
      }

      return _class;
    }(BaseClass)))[$class];

    subclass(Class, subclasses, namespace);
  };

  var _arr = _Object$entries(classes);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _ref = _arr[_i];

    var _ref2 = _slicedToArray(_ref, 2);

    var $class = _ref2[0];
    var subclasses = _ref2[1];

    _loop($class, subclasses);
  }

  return namespace;
}
/*  ------------------------------------------------------------------------ */