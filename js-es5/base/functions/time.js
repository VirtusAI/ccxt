'use strict';
/*  ------------------------------------------------------------------------ */

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Promise = require("@babel/runtime/core-js/promise");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _inherits = require("@babel/runtime/helpers/inherits");

var now = Date.now; // TODO: figure out how to utilize performance.now () properly – it's not as easy as it does not return a unix timestamp...

/*  ------------------------------------------------------------------------ */

var setTimeout_original = setTimeout;

var setTimeout_safe = function setTimeout_safe(done, ms) {
  var setTimeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : setTimeout_original;
  var targetTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : now() + ms;

  /*  The built-in setTimeout function can fire its callback earlier than specified, so we
      need to ensure that it does not happen: sleep recursively until `targetTime` is reached...   */
  var clearInnerTimeout = function clearInnerTimeout() {};

  var active = true;
  var id = setTimeout(function () {
    active = true;
    var rest = targetTime - now();

    if (rest > 0) {
      clearInnerTimeout = setTimeout_safe(done, rest, setTimeout, targetTime); // try sleep more
    } else {
      done();
    }
  }, ms);
  return function clear() {
    if (active) {
      active = false; // dunno if IDs are unique on various platforms, so it's better to rely on this flag to exclude the possible cancellation of the wrong timer (if called after completion)

      clearTimeout(id);
    }

    clearInnerTimeout();
  };
};
/*  ------------------------------------------------------------------------ */


var TimedOut =
/*#__PURE__*/
function (_Error) {
  _inherits(TimedOut, _Error);

  function TimedOut() {
    var _this;

    _classCallCheck(this, TimedOut);

    var message = 'timed out';
    _this = _possibleConstructorReturn(this, (TimedOut.__proto__ || _Object$getPrototypeOf(TimedOut)).call(this, message));
    _this.constructor = TimedOut;
    _this.__proto__ = TimedOut.prototype;
    _this.message = message;
    return _this;
  }

  return TimedOut;
}(Error);
/*  ------------------------------------------------------------------------ */


module.exports = {
  now: now,
  setTimeout_safe: setTimeout_safe,
  sleep: function sleep(ms) {
    return new _Promise(function (resolve) {
      return setTimeout_safe(resolve, ms);
    });
  },
  TimedOut: TimedOut,
  timeout: function () {
    var _timeout = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(ms, promise) {
      var clear, expires;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              clear = function clear() {};

              expires = new _Promise(function (resolve) {
                return clear = setTimeout_safe(resolve, ms);
              });
              _context.prev = 2;
              _context.next = 5;
              return _Promise.race([promise, expires.then(function () {
                throw new TimedOut();
              })]);

            case 5:
              return _context.abrupt("return", _context.sent);

            case 6:
              _context.prev = 6;
              clear(); // fixes https://github.com/ccxt/ccxt/issues/749

              return _context.finish(6);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2,, 6, 9]]);
    }));

    return function timeout(_x, _x2) {
      return _timeout.apply(this, arguments);
    };
  }()
  /*  ------------------------------------------------------------------------ */

};