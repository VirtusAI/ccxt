'use strict';
/*  ------------------------------------------------------------------------ */

var _getIterator = require("@babel/runtime/core-js/get-iterator");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

module.exports = {
  aggregate: function aggregate(bidasks) {
    var result = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(bidasks), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref3 = _step.value;

        var _ref2 = _slicedToArray(_ref3, 2);

        var _price = _ref2[0];
        var _volume = _ref2[1];
        if (_volume > 0) result[_price] = (result[_price] || 0) + _volume;
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

    return _Object$keys(result).map(function (price) {
      return [parseFloat(price), parseFloat(result[price])];
    });
  }
};
/*  ------------------------------------------------------------------------ */