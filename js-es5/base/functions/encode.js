"use strict";
/*  ------------------------------------------------------------------------ */

var _JSON$stringify = require("@babel/runtime/core-js/json/stringify");

var CryptoJS = require('crypto-js');

var qs = require('qs'); // querystring (TODO: get rid of that dependency)

/*  ------------------------------------------------------------------------ */


module.exports = {
  json: function json(data) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return _JSON$stringify(data);
  },
  unjson: JSON.parse,
  stringToBinary: function stringToBinary(str) {
    var arr = new Uint8Array(str.length);

    for (var i = 0; i < str.length; i++) {
      arr[i] = str.charCodeAt(i);
    }

    return CryptoJS.lib.WordArray.create(arr);
  },
  stringToBase64: function stringToBase64(string) {
    return CryptoJS.enc.Latin1.parse(string).toString(CryptoJS.enc.Base64);
  },
  utf16ToBase64: function utf16ToBase64(string) {
    return CryptoJS.enc.Utf16.parse(string).toString(CryptoJS.enc.Base64);
  },
  base64ToBinary: function base64ToBinary(string) {
    return CryptoJS.enc.Base64.parse(string);
  },
  base64ToString: function base64ToString(string) {
    return CryptoJS.enc.Base64.parse(string).toString(CryptoJS.enc.Utf8);
  },
  binaryToString: function binaryToString(string) {
    return string;
  },
  binaryConcat: function binaryConcat() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.reduce(function (a, b) {
      return a.concat(b);
    });
  },
  urlencode: function urlencode(object) {
    return qs.stringify(object);
  },
  rawencode: function rawencode(object) {
    return qs.stringify(object, {
      encode: false
    });
  } // Url-safe-base64 without equals signs, with + replaced by - and slashes replaced by underscores
  ,
  urlencodeBase64: function urlencodeBase64(base64string) {
    return base64string.replace(/[=]+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  }
  /*  ------------------------------------------------------------------------ */

};