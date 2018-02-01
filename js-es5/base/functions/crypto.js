"use strict";
/*  ------------------------------------------------------------------------ */

var _JSON$stringify = require("@babel/runtime/core-js/json/stringify");

var CryptoJS = require('crypto-js');

var _require = require('./string'),
    capitalize = _require.capitalize;

var _require2 = require('./encode'),
    stringToBase64 = _require2.stringToBase64,
    utf16ToBase64 = _require2.utf16ToBase64,
    urlencodeBase64 = _require2.urlencodeBase64;
/*  ------------------------------------------------------------------------ */


var hash = function hash(request) {
  var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'md5';
  var digest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';
  var result = CryptoJS[hash.toUpperCase()](request);
  return digest === 'binary' ? result : result.toString(CryptoJS.enc[capitalize(digest)]);
};
/*  .............................................   */


var hmac = function hmac(request, secret) {
  var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sha256';
  var digest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'hex';
  var encoding = digest === 'binary' ? 'Latin1' : capitalize(digest);
  return CryptoJS['Hmac' + hash.toUpperCase()](request, secret).toString(CryptoJS.enc[capitalize(encoding)]);
};
/*  .............................................   */


var jwt = function JSON_web_token(request, secret) {
  var alg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'HS256';
  var hash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'sha256';
  var encodedHeader = urlencodeBase64(stringToBase64(_JSON$stringify({
    'alg': alg,
    'typ': 'JWT'
  }))),
      encodedData = urlencodeBase64(stringToBase64(_JSON$stringify(request))),
      token = [encodedHeader, encodedData].join('.'),
      signature = urlencodeBase64(utf16ToBase64(hmac(token, secret, hash, 'utf16')));
  return [token, signature].join('.');
};
/*  ------------------------------------------------------------------------ */


module.exports = {
  hash: hash,
  hmac: hmac,
  jwt: jwt
  /*  ------------------------------------------------------------------------ */

};