"use strict";
/*  ------------------------------------------------------------------------ */

var _getIterator = require("@babel/runtime/core-js/get-iterator");

var _Array$from = require("@babel/runtime/core-js/array/from");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var _Set = require("@babel/runtime/core-js/set");

var _Object$values = require("@babel/runtime/core-js/object/values");

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _require = require('./type'),
    isObject = _require.isObject,
    isNumber = _require.isNumber,
    isDictionary = _require.isDictionary,
    isArray = _require.isArray;
/*  ------------------------------------------------------------------------ */


var keys = _Object$keys,
    values = function values(x) {
  return !isArray(x) // don't copy arrays if they're already arrays!
  ? _Object$values(x) : x;
},
    index = function index(x) {
  return new _Set(values(x));
},
    extend = function extend() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _Object$assign.apply(Object, [{}].concat(args));
} // NB: side-effect free
,
    clone = function clone(x) {
  return isArray(x) ? _Array$from(x) // clones arrays
  : extend(x);
}; // clones objects

/*  ------------------------------------------------------------------------ */


module.exports = {
  keys: keys,
  values: values,
  extend: extend,
  clone: clone,
  index: index,
  ordered: function ordered(x) {
    return x;
  } // a stub to keep assoc keys in order (in JS it does nothing, it's mostly for Python)   
  ,
  unique: function unique(x) {
    return _Array$from(index(x));
  }
  /*  .............................................   */
  ,
  keysort: function keysort(x) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(keys(x).sort()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _k = _step.value;
        out[_k] = x[_k];
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

    return out;
  }
  /*  .............................................   */
  ,
  indexBy: function indexBy(x, k) {
    var out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(values(x)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _v = _step2.value;
        if (k in _v) out[_v[k]] = _v;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return out;
  }
  /*  .............................................   */
  ,
  groupBy: function groupBy(x, k) {
    var out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(values(x)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _v2 = _step3.value;

        if (k in _v2) {
          var p = _v2[k];
          out[p] = out[p] || [];
          out[p].push(_v2);
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return out;
  }
  /*  .............................................   */
  ,
  filterBy: function filterBy(x, k) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var out = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _getIterator(values(x)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _v3 = _step4.value;
        if (_v3[k] === value) out.push(_v3);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return out;
  }
  /*  .............................................   */
  ,
  sortBy: function sortBy(array, // NB: MUTATES ARRAY!
  key) {
    var descending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : descending ? -1 : 1;
    return array.sort(function (a, b) {
      return a[key] < b[key] ? -direction : a[key] > b[key] ? direction : 0;
    });
  }
  /*  .............................................   */
  ,
  flatten: function flatten(x) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(x), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _v4 = _step5.value;
        if (isArray(_v4)) flatten(_v4, out);else out.push(_v4);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    return out;
  }
  /*  .............................................   */
  ,
  pluck: function pluck(x, k) {
    return values(x).filter(function (v) {
      return k in v;
    }).map(function (v) {
      return v[k];
    });
  }
  /*  .............................................   */
  ,
  omit: function omit(x) {
    var out = clone(x);

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    for (var _i = 0; _i < args.length; _i++) {
      var k = args[_i];

      if (isArray(k)) {
        // omit (x, ['a', 'b'])
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = _getIterator(k), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _kk = _step6.value;
            delete out[_kk];
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }
      } else delete out[k]; // omit (x, 'a', 'b')

    }

    return out;
  }
  /*  .............................................   */
  ,
  sum: function sum() {
    for (var _len3 = arguments.length, xs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      xs[_key3] = arguments[_key3];
    }

    var ns = xs.filter(isNumber); // leave only numbers

    return ns.length > 0 ? ns.reduce(function (a, b) {
      return a + b;
    }, 0) : undefined;
  }
  /*  .............................................   */
  ,
  deepExtend: function deepExtend() {
    var out = undefined;

    for (var _len4 = arguments.length, xs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      xs[_key4] = arguments[_key4];
    }

    for (var _i2 = 0; _i2 < xs.length; _i2++) {
      var x = xs[_i2];

      if (isDictionary(x)) {
        if (!isObject(out)) out = {};

        for (var k in x) {
          out[k] = deepExtend(out[k], x[k]);
        }
      } else out = x;
    }

    return out;
  }
  /*  ------------------------------------------------------------------------ */

};