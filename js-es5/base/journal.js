"use strict";

var _Object$getOwnPropertyNames = require("@babel/runtime/core-js/object/get-own-property-names");

var _getIterator = require("@babel/runtime/core-js/get-iterator");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _JSON$stringify = require("@babel/runtime/core-js/json/stringify");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var fs = require('fs');

module.exports = function (logFileName, object, methodNames) {
  var _loop = function _loop(name) {
    if (methodNames.includes(name)) {
      var impl = object[name].bind(object); // generates a wrapper around CCXT method

      object[name] =
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var _len,
            args,
            _key,
            start,
            response,
            exception,
            error,
            end,
            log,
            fileName,
            line,
            _args = arguments;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args[_key];
                }

                start = new Date();
                response = undefined;
                exception = undefined;
                error = undefined;
                _context.prev = 5;
                _context.next = 8;
                return impl.apply(void 0, args);

              case 8:
                response = _context.sent;
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                error = _context.t0;
                exception = {
                  type: _context.t0.constructor.prototype,
                  message: _context.t0.message
                };

              case 15:
                end = new Date();
                log = {
                  start: start,
                  startDatetime: start.toISOString(),
                  end: end,
                  endDatetime: end.toISOString(),
                  id: object.id,
                  method: name,
                  args: args,
                  response: response,
                  exception: exception
                };
                fileName = typeof logFileName == 'string' ? logFileName : logFileName();
                line = _JSON$stringify(log) + '\n';
                fs.appendFileSync(fileName, line);

                if (!response) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", response);

              case 22:
                throw error;

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 11]]);
      }));
    }
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_Object$getOwnPropertyNames(object.constructor.prototype)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      _loop(name);
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
};