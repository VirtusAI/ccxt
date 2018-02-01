'use strict'; // ---------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var bitfinex = require('./bitfinex.js');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError,
    NotSupported = _require.NotSupported,
    InsufficientFunds = _require.InsufficientFunds; // ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_bitfinex) {
  _inherits(bitfinex2, _bitfinex);

  function bitfinex2() {
    _classCallCheck(this, bitfinex2);

    return _possibleConstructorReturn(this, (bitfinex2.__proto__ || _Object$getPrototypeOf(bitfinex2)).apply(this, arguments));
  }

  _createClass(bitfinex2, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(bitfinex2.prototype.__proto__ || _Object$getPrototypeOf(bitfinex2.prototype), "describe", this).call(this), {
        'id': 'bitfinex2',
        'name': 'Bitfinex v2',
        'countries': 'VG',
        'version': 'v2',
        // new metainfo interface
        'has': {
          'CORS': true,
          'createOrder': false,
          'fetchMyTrades': false,
          'fetchOHLCV': true,
          'fetchTickers': true,
          'fetchOrder': true,
          'fetchOpenOrders': false,
          'fetchClosedOrders': false,
          'withdraw': true,
          'deposit': false
        },
        'timeframes': {
          '1m': '1m',
          '5m': '5m',
          '15m': '15m',
          '30m': '30m',
          '1h': '1h',
          '3h': '3h',
          '6h': '6h',
          '12h': '12h',
          '1d': '1D',
          '1w': '7D',
          '2w': '14D',
          '1M': '1M'
        },
        'rateLimit': 1500,
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg',
          'api': 'https://api.bitfinex.com',
          'www': 'https://www.bitfinex.com',
          'doc': ['https://bitfinex.readme.io/v2/docs', 'https://github.com/bitfinexcom/bitfinex-api-node'],
          'fees': 'https://www.bitfinex.com/fees'
        },
        'api': {
          'public': {
            'get': ['platform/status', 'tickers', 'ticker/{symbol}', 'trades/{symbol}/hist', 'book/{symbol}/{precision}', 'book/{symbol}/P0', 'book/{symbol}/P1', 'book/{symbol}/P2', 'book/{symbol}/P3', 'book/{symbol}/R0', 'stats1/{key}:{size}:{symbol}/{side}/{section}', 'stats1/{key}:{size}:{symbol}/long/last', 'stats1/{key}:{size}:{symbol}/long/hist', 'stats1/{key}:{size}:{symbol}/short/last', 'stats1/{key}:{size}:{symbol}/short/hist', 'candles/trade:{timeframe}:{symbol}/{section}', 'candles/trade:{timeframe}:{symbol}/last', 'candles/trade:{timeframe}:{symbol}/hist'],
            'post': ['calc/trade/avg']
          },
          'private': {
            'post': ['auth/r/wallets', 'auth/r/orders/{symbol}', 'auth/r/orders/{symbol}/new', 'auth/r/orders/{symbol}/hist', 'auth/r/order/{symbol}:{id}/trades', 'auth/r/trades/{symbol}/hist', 'auth/r/positions', 'auth/r/funding/offers/{symbol}', 'auth/r/funding/offers/{symbol}/hist', 'auth/r/funding/loans/{symbol}', 'auth/r/funding/loans/{symbol}/hist', 'auth/r/funding/credits/{symbol}', 'auth/r/funding/credits/{symbol}/hist', 'auth/r/funding/trades/{symbol}/hist', 'auth/r/info/margin/{key}', 'auth/r/info/funding/{key}', 'auth/r/movements/{currency}/hist', 'auth/r/stats/perf:{timeframe}/hist', 'auth/r/alerts', 'auth/w/alert/set', 'auth/w/alert/{type}:{symbol}:{price}/del', 'auth/calc/order/avail']
          }
        },
        'markets': {
          'AVT/BTC': {
            'id': 'tAVTBTC',
            'symbol': 'AVT/BTC',
            'base': 'AVT',
            'quote': 'BTC',
            'baseId': 'tAVT',
            'quoteId': 'tBTC'
          },
          'AVT/ETH': {
            'id': 'tAVTETH',
            'symbol': 'AVT/ETH',
            'base': 'AVT',
            'quote': 'ETH',
            'baseId': 'tAVT',
            'quoteId': 'tETH'
          },
          'AVT/USD': {
            'id': 'tAVTUSD',
            'symbol': 'AVT/USD',
            'base': 'AVT',
            'quote': 'USD',
            'baseId': 'tAVT',
            'quoteId': 'zUSD'
          },
          'CST_BCC/BTC': {
            'id': 'tBCCBTC',
            'symbol': 'CST_BCC/BTC',
            'base': 'CST_BCC',
            'quote': 'BTC',
            'baseId': 'tBCC',
            'quoteId': 'tBTC'
          },
          'CST_BCC/USD': {
            'id': 'tBCCUSD',
            'symbol': 'CST_BCC/USD',
            'base': 'CST_BCC',
            'quote': 'USD',
            'baseId': 'tBCC',
            'quoteId': 'zUSD'
          },
          'BCH/BTC': {
            'id': 'tBCHBTC',
            'symbol': 'BCH/BTC',
            'base': 'BCH',
            'quote': 'BTC',
            'baseId': 'tBCH',
            'quoteId': 'tBTC'
          },
          'BCH/ETH': {
            'id': 'tBCHETH',
            'symbol': 'BCH/ETH',
            'base': 'BCH',
            'quote': 'ETH',
            'baseId': 'tBCH',
            'quoteId': 'tETH'
          },
          'BCH/USD': {
            'id': 'tBCHUSD',
            'symbol': 'BCH/USD',
            'base': 'BCH',
            'quote': 'USD',
            'baseId': 'tBCH',
            'quoteId': 'zUSD'
          },
          'CST_BCU/BTC': {
            'id': 'tBCUBTC',
            'symbol': 'CST_BCU/BTC',
            'base': 'CST_BCU',
            'quote': 'BTC',
            'baseId': 'tBCU',
            'quoteId': 'tBTC'
          },
          'CST_BCU/USD': {
            'id': 'tBCUUSD',
            'symbol': 'CST_BCU/USD',
            'base': 'CST_BCU',
            'quote': 'USD',
            'baseId': 'tBCU',
            'quoteId': 'zUSD'
          },
          'BT1/BTC': {
            'id': 'tBT1BTC',
            'symbol': 'BT1/BTC',
            'base': 'BT1',
            'quote': 'BTC',
            'baseId': 'tBT1',
            'quoteId': 'tBTC'
          },
          'BT1/USD': {
            'id': 'tBT1USD',
            'symbol': 'BT1/USD',
            'base': 'BT1',
            'quote': 'USD',
            'baseId': 'tBT1',
            'quoteId': 'zUSD'
          },
          'BT2/BTC': {
            'id': 'tBT2BTC',
            'symbol': 'BT2/BTC',
            'base': 'BT2',
            'quote': 'BTC',
            'baseId': 'tBT2',
            'quoteId': 'tBTC'
          },
          'BT2/USD': {
            'id': 'tBT2USD',
            'symbol': 'BT2/USD',
            'base': 'BT2',
            'quote': 'USD',
            'baseId': 'tBT2',
            'quoteId': 'zUSD'
          },
          'BTC/USD': {
            'id': 'tBTCUSD',
            'symbol': 'BTC/USD',
            'base': 'BTC',
            'quote': 'USD',
            'baseId': 'tBTC',
            'quoteId': 'zUSD'
          },
          'BTC/EUR': {
            'id': 'tBTCEUR',
            'symbol': 'BTC/EUR',
            'base': 'BTC',
            'quote': 'EUR',
            'baseId': 'tBTC',
            'quoteId': 'zEUR'
          },
          'BTG/BTC': {
            'id': 'tBTGBTC',
            'symbol': 'BTG/BTC',
            'base': 'BTG',
            'quote': 'BTC',
            'baseId': 'tBTG',
            'quoteId': 'tBTC'
          },
          'BTG/USD': {
            'id': 'tBTGUSD',
            'symbol': 'BTG/USD',
            'base': 'BTG',
            'quote': 'USD',
            'baseId': 'tBTG',
            'quoteId': 'zUSD'
          },
          'DASH/BTC': {
            'id': 'tDSHBTC',
            'symbol': 'DASH/BTC',
            'base': 'DASH',
            'quote': 'BTC',
            'baseId': 'tDASH',
            'quoteId': 'tBTC'
          },
          'DASH/USD': {
            'id': 'tDSHUSD',
            'symbol': 'DASH/USD',
            'base': 'DASH',
            'quote': 'USD',
            'baseId': 'tDASH',
            'quoteId': 'zUSD'
          },
          'DAT/BTC': {
            'id': 'tDATBTC',
            'symbol': 'DAT/BTC',
            'base': 'DAT',
            'quote': 'BTC',
            'baseId': 'tDAT',
            'quoteId': 'tBTC'
          },
          'DAT/ETH': {
            'id': 'tDATETH',
            'symbol': 'DAT/ETH',
            'base': 'DAT',
            'quote': 'ETH',
            'baseId': 'tDAT',
            'quoteId': 'tETH'
          },
          'DAT/USD': {
            'id': 'tDATUSD',
            'symbol': 'DAT/USD',
            'base': 'DAT',
            'quote': 'USD',
            'baseId': 'tDAT',
            'quoteId': 'zUSD'
          },
          'EDO/BTC': {
            'id': 'tEDOBTC',
            'symbol': 'EDO/BTC',
            'base': 'EDO',
            'quote': 'BTC',
            'baseId': 'tEDO',
            'quoteId': 'tBTC'
          },
          'EDO/ETH': {
            'id': 'tEDOETH',
            'symbol': 'EDO/ETH',
            'base': 'EDO',
            'quote': 'ETH',
            'baseId': 'tEDO',
            'quoteId': 'tETH'
          },
          'EDO/USD': {
            'id': 'tEDOUSD',
            'symbol': 'EDO/USD',
            'base': 'EDO',
            'quote': 'USD',
            'baseId': 'tEDO',
            'quoteId': 'zUSD'
          },
          'EOS/BTC': {
            'id': 'tEOSBTC',
            'symbol': 'EOS/BTC',
            'base': 'EOS',
            'quote': 'BTC',
            'baseId': 'tEOS',
            'quoteId': 'tBTC'
          },
          'EOS/ETH': {
            'id': 'tEOSETH',
            'symbol': 'EOS/ETH',
            'base': 'EOS',
            'quote': 'ETH',
            'baseId': 'tEOS',
            'quoteId': 'tETH'
          },
          'EOS/USD': {
            'id': 'tEOSUSD',
            'symbol': 'EOS/USD',
            'base': 'EOS',
            'quote': 'USD',
            'baseId': 'tEOS',
            'quoteId': 'zUSD'
          },
          'ETC/BTC': {
            'id': 'tETCBTC',
            'symbol': 'ETC/BTC',
            'base': 'ETC',
            'quote': 'BTC',
            'baseId': 'tETC',
            'quoteId': 'tBTC'
          },
          'ETC/USD': {
            'id': 'tETCUSD',
            'symbol': 'ETC/USD',
            'base': 'ETC',
            'quote': 'USD',
            'baseId': 'tETC',
            'quoteId': 'zUSD'
          },
          'ETH/BTC': {
            'id': 'tETHBTC',
            'symbol': 'ETH/BTC',
            'base': 'ETH',
            'quote': 'BTC',
            'baseId': 'tETH',
            'quoteId': 'tBTC'
          },
          'ETH/USD': {
            'id': 'tETHUSD',
            'symbol': 'ETH/USD',
            'base': 'ETH',
            'quote': 'USD',
            'baseId': 'tETH',
            'quoteId': 'zUSD'
          },
          'ETP/BTC': {
            'id': 'tETPBTC',
            'symbol': 'ETP/BTC',
            'base': 'ETP',
            'quote': 'BTC',
            'baseId': 'tETP',
            'quoteId': 'tBTC'
          },
          'ETP/ETH': {
            'id': 'tETPETH',
            'symbol': 'ETP/ETH',
            'base': 'ETP',
            'quote': 'ETH',
            'baseId': 'tETP',
            'quoteId': 'tETH'
          },
          'ETP/USD': {
            'id': 'tETPUSD',
            'symbol': 'ETP/USD',
            'base': 'ETP',
            'quote': 'USD',
            'baseId': 'tETP',
            'quoteId': 'zUSD'
          },
          'IOTA/BTC': {
            'id': 'tIOTBTC',
            'symbol': 'IOTA/BTC',
            'base': 'IOTA',
            'quote': 'BTC',
            'baseId': 'tIOTA',
            'quoteId': 'tBTC'
          },
          'IOTA/ETH': {
            'id': 'tIOTETH',
            'symbol': 'IOTA/ETH',
            'base': 'IOTA',
            'quote': 'ETH',
            'baseId': 'tIOTA',
            'quoteId': 'tETH'
          },
          'IOTA/USD': {
            'id': 'tIOTUSD',
            'symbol': 'IOTA/USD',
            'base': 'IOTA',
            'quote': 'USD',
            'baseId': 'tIOTA',
            'quoteId': 'zUSD'
          },
          'LTC/BTC': {
            'id': 'tLTCBTC',
            'symbol': 'LTC/BTC',
            'base': 'LTC',
            'quote': 'BTC',
            'baseId': 'tLTC',
            'quoteId': 'tBTC'
          },
          'LTC/USD': {
            'id': 'tLTCUSD',
            'symbol': 'LTC/USD',
            'base': 'LTC',
            'quote': 'USD',
            'baseId': 'tLTC',
            'quoteId': 'zUSD'
          },
          'NEO/BTC': {
            'id': 'tNEOBTC',
            'symbol': 'NEO/BTC',
            'base': 'NEO',
            'quote': 'BTC',
            'baseId': 'tNEO',
            'quoteId': 'tBTC'
          },
          'NEO/ETH': {
            'id': 'tNEOETH',
            'symbol': 'NEO/ETH',
            'base': 'NEO',
            'quote': 'ETH',
            'baseId': 'tNEO',
            'quoteId': 'tETH'
          },
          'NEO/USD': {
            'id': 'tNEOUSD',
            'symbol': 'NEO/USD',
            'base': 'NEO',
            'quote': 'USD',
            'baseId': 'tNEO',
            'quoteId': 'zUSD'
          },
          'OMG/BTC': {
            'id': 'tOMGBTC',
            'symbol': 'OMG/BTC',
            'base': 'OMG',
            'quote': 'BTC',
            'baseId': 'tOMG',
            'quoteId': 'tBTC'
          },
          'OMG/ETH': {
            'id': 'tOMGETH',
            'symbol': 'OMG/ETH',
            'base': 'OMG',
            'quote': 'ETH',
            'baseId': 'tOMG',
            'quoteId': 'tETH'
          },
          'OMG/USD': {
            'id': 'tOMGUSD',
            'symbol': 'OMG/USD',
            'base': 'OMG',
            'quote': 'USD',
            'baseId': 'tOMG',
            'quoteId': 'zUSD'
          },
          'QTUM/BTC': {
            'id': 'tQTMBTC',
            'symbol': 'QTUM/BTC',
            'base': 'QTUM',
            'quote': 'BTC',
            'baseId': 'tQTUM',
            'quoteId': 'tBTC'
          },
          'QTUM/ETH': {
            'id': 'tQTMETH',
            'symbol': 'QTUM/ETH',
            'base': 'QTUM',
            'quote': 'ETH',
            'baseId': 'tQTUM',
            'quoteId': 'tETH'
          },
          'QTUM/USD': {
            'id': 'tQTMUSD',
            'symbol': 'QTUM/USD',
            'base': 'QTUM',
            'quote': 'USD',
            'baseId': 'tQTUM',
            'quoteId': 'zUSD'
          },
          'RRT/BTC': {
            'id': 'tRRTBTC',
            'symbol': 'RRT/BTC',
            'base': 'RRT',
            'quote': 'BTC',
            'baseId': 'tRRT',
            'quoteId': 'tBTC'
          },
          'RRT/USD': {
            'id': 'tRRTUSD',
            'symbol': 'RRT/USD',
            'base': 'RRT',
            'quote': 'USD',
            'baseId': 'tRRT',
            'quoteId': 'zUSD'
          },
          'SAN/BTC': {
            'id': 'tSANBTC',
            'symbol': 'SAN/BTC',
            'base': 'SAN',
            'quote': 'BTC',
            'baseId': 'tSAN',
            'quoteId': 'tBTC'
          },
          'SAN/ETH': {
            'id': 'tSANETH',
            'symbol': 'SAN/ETH',
            'base': 'SAN',
            'quote': 'ETH',
            'baseId': 'tSAN',
            'quoteId': 'tETH'
          },
          'SAN/USD': {
            'id': 'tSANUSD',
            'symbol': 'SAN/USD',
            'base': 'SAN',
            'quote': 'USD',
            'baseId': 'tSAN',
            'quoteId': 'zUSD'
          },
          'XMR/BTC': {
            'id': 'tXMRBTC',
            'symbol': 'XMR/BTC',
            'base': 'XMR',
            'quote': 'BTC',
            'baseId': 'tXMR',
            'quoteId': 'tBTC'
          },
          'XMR/USD': {
            'id': 'tXMRUSD',
            'symbol': 'XMR/USD',
            'base': 'XMR',
            'quote': 'USD',
            'baseId': 'tXMR',
            'quoteId': 'zUSD'
          },
          'XRP/BTC': {
            'id': 'tXRPBTC',
            'symbol': 'XRP/BTC',
            'base': 'XRP',
            'quote': 'BTC',
            'baseId': 'tXRP',
            'quoteId': 'tBTC'
          },
          'XRP/USD': {
            'id': 'tXRPUSD',
            'symbol': 'XRP/USD',
            'base': 'XRP',
            'quote': 'USD',
            'baseId': 'tXRP',
            'quoteId': 'zUSD'
          },
          'ZEC/BTC': {
            'id': 'tZECBTC',
            'symbol': 'ZEC/BTC',
            'base': 'ZEC',
            'quote': 'BTC',
            'baseId': 'tZEC',
            'quoteId': 'tBTC'
          },
          'ZEC/USD': {
            'id': 'tZECUSD',
            'symbol': 'ZEC/USD',
            'base': 'ZEC',
            'quote': 'USD',
            'baseId': 'tZEC',
            'quoteId': 'zUSD'
          },
          'YYW/USD': {
            'id': 'tYYWUSD',
            'symbol': 'YYW/USD',
            'base': 'YYW',
            'quote': 'USD',
            'baseId': 'tYYW',
            'quoteId': 'zUSD'
          },
          'YYW/BTC': {
            'id': 'tYYWBTC',
            'symbol': 'YYW/BTC',
            'base': 'YYW',
            'quote': 'BTC',
            'baseId': 'tYYW',
            'quoteId': 'zBTC'
          },
          'YYW/ETH': {
            'id': 'tYYWETH',
            'symbol': 'YYW/ETH',
            'base': 'YYW',
            'quote': 'ETH',
            'baseId': 'tYYW',
            'quoteId': 'zETH'
          },
          'SNT/USD': {
            'id': 'tSNTUSD',
            'symbol': 'SNT/USD',
            'base': 'SNT',
            'quote': 'USD',
            'baseId': 'tSNT',
            'quoteId': 'zUSD'
          },
          'SNT/BTC': {
            'id': 'tSNTBTC',
            'symbol': 'SNT/BTC',
            'base': 'SNT',
            'quote': 'BTC',
            'baseId': 'tSNT',
            'quoteId': 'zBTC'
          },
          'SNT/ETH': {
            'id': 'tSNTETH',
            'symbol': 'SNT/ETH',
            'base': 'SNT',
            'quote': 'ETH',
            'baseId': 'tSNT',
            'quoteId': 'zETH'
          },
          'QASH/USD': {
            'id': 'tQASHUSD',
            'symbol': 'QASH/USD',
            'base': 'QASH',
            'quote': 'USD',
            'baseId': 'tQASH',
            'quoteId': 'zUSD'
          },
          'QASH/BTC': {
            'id': 'tQASHBTC',
            'symbol': 'QASH/BTC',
            'base': 'QASH',
            'quote': 'BTC',
            'baseId': 'tQASH',
            'quoteId': 'zBTC'
          },
          'QASH/ETH': {
            'id': 'tQASHETH',
            'symbol': 'QASH/ETH',
            'base': 'QASH',
            'quote': 'ETH',
            'baseId': 'tQASH',
            'quoteId': 'zETH'
          },
          'GNT/USD': {
            'id': 'tGNTUSD',
            'symbol': 'GNT/USD',
            'base': 'GNT',
            'quote': 'USD',
            'baseId': 'tGNT',
            'quoteId': 'zUSD'
          },
          'GNT/BTC': {
            'id': 'tGNTBTC',
            'symbol': 'GNT/BTC',
            'base': 'GNT',
            'quote': 'BTC',
            'baseId': 'tGNT',
            'quoteId': 'zBTC'
          },
          'GNT/ETH': {
            'id': 'tGNTETH',
            'symbol': 'GNT/ETH',
            'base': 'GNT',
            'quote': 'ETH',
            'baseId': 'tGNT',
            'quoteId': 'zETH'
          },
          'BAT/USD': {
            'id': 'tBATUSD',
            'symbol': 'BAT/USD',
            'base': 'BAT',
            'quote': 'USD',
            'baseId': 'tBAT',
            'quoteId': 'zUSD'
          },
          'BAT/BTC': {
            'id': 'tBATBTC',
            'symbol': 'BAT/BTC',
            'base': 'BAT',
            'quote': 'BTC',
            'baseId': 'tBAT',
            'quoteId': 'zBTC'
          },
          'BAT/ETH': {
            'id': 'tBATETH',
            'symbol': 'BAT/ETH',
            'base': 'BAT',
            'quote': 'ETH',
            'baseId': 'tBAT',
            'quoteId': 'zETH'
          },
          'SPK/USD': {
            'id': 'tSPKUSD',
            'symbol': 'SPK/USD',
            'base': 'SPK',
            'quote': 'USD',
            'baseId': 'tSPK',
            'quoteId': 'zUSD'
          },
          'SPK/BTC': {
            'id': 'tSPKBTC',
            'symbol': 'SPK/BTC',
            'base': 'SPK',
            'quote': 'BTC',
            'baseId': 'tSPK',
            'quoteId': 'zBTC'
          },
          'SPK/ETH': {
            'id': 'tSPKETH',
            'symbol': 'SPK/ETH',
            'base': 'SPK',
            'quote': 'ETH',
            'baseId': 'tSPK',
            'quoteId': 'zETH'
          },
          'TRX/USD': {
            'id': 'tTRXUSD',
            'symbol': 'TRX/USD',
            'base': 'TRX',
            'quote': 'USD',
            'baseId': 'tTRX',
            'quoteId': 'zUSD'
          },
          'TRX/BTC': {
            'id': 'tTRXBTC',
            'symbol': 'TRX/BTC',
            'base': 'TRX',
            'quote': 'BTC',
            'baseId': 'tTRX',
            'quoteId': 'zBTC'
          },
          'TRX/ETH': {
            'id': 'tTRXETH',
            'symbol': 'TRX/ETH',
            'base': 'TRX',
            'quote': 'ETH',
            'baseId': 'tTRX',
            'quoteId': 'zETH'
          },
          'ELF/USD': {
            'id': 'tELFUSD',
            'symbol': 'ELF/USD',
            'base': 'ELF',
            'quote': 'USD',
            'baseId': 'tELF',
            'quoteId': 'zUSD'
          },
          'ELF/BTC': {
            'id': 'tELFBTC',
            'symbol': 'ELF/BTC',
            'base': 'ELF',
            'quote': 'BTC',
            'baseId': 'tELF',
            'quoteId': 'zBTC'
          },
          'ELF/ETH': {
            'id': 'tELFETH',
            'symbol': 'ELF/ETH',
            'base': 'ELF',
            'quote': 'ETH',
            'baseId': 'tELF',
            'quoteId': 'zETH'
          },
          'RCN/USD': {
            'id': 'tRCNUSD',
            'symbol': 'RCN/USD',
            'base': 'RCN',
            'quote': 'USD',
            'baseId': 'tRCN',
            'quoteId': 'zUSD'
          },
          'RCN/BTC': {
            'id': 'tRCNBTC',
            'symbol': 'RCN/BTC',
            'base': 'RCN',
            'quote': 'BTC',
            'baseId': 'tRCN',
            'quoteId': 'zBTC'
          },
          'RCN/ETH': {
            'id': 'tRCNETH',
            'symbol': 'RCN/ETH',
            'base': 'RCN',
            'quote': 'ETH',
            'baseId': 'tRCN',
            'quoteId': 'zETH'
          },
          'FUN/USD': {
            'id': 'tFUNUSD',
            'symbol': 'FUN/USD',
            'base': 'FUN',
            'quote': 'USD',
            'baseId': 'tFUN',
            'quoteId': 'zUSD'
          },
          'FUN/BTC': {
            'id': 'tFUNBTC',
            'symbol': 'FUN/BTC',
            'base': 'FUN',
            'quote': 'BTC',
            'baseId': 'tFUN',
            'quoteId': 'zBTC'
          },
          'FUN/ETH': {
            'id': 'tFUNETH',
            'symbol': 'FUN/ETH',
            'base': 'FUN',
            'quote': 'ETH',
            'baseId': 'tFUN',
            'quoteId': 'zETH '
          },
          'MNA/USD': {
            'id': 'tMNAUSD',
            'symbol': 'MNA/USD',
            'base': 'MNA',
            'quote': 'USD',
            'baseId': 'tMNA',
            'quoteId': 'zUSD'
          },
          'MNA/BTC': {
            'id': 'tMNABTC',
            'symbol': 'MNA/BTC',
            'base': 'MNA',
            'quote': 'BTC',
            'baseId': 'tMNA',
            'quoteId': 'zBTC'
          },
          'MNA/ETH': {
            'id': 'tMNAETH',
            'symbol': 'MNA/ETH',
            'base': 'MNA',
            'quote': 'ETH',
            'baseId': 'tMNA',
            'quoteId': 'zETH'
          },
          'AID/USD': {
            'id': 'tAIDUSD',
            'symbol': 'AID/USD',
            'base': 'AID',
            'quote': 'USD',
            'baseId': 'tAID',
            'quoteId': 'zUSD'
          },
          'AID/BTC': {
            'id': 'tAIDBTC',
            'symbol': 'AID/BTC',
            'base': 'AID',
            'quote': 'BTC',
            'baseId': 'tAID',
            'quoteId': 'zBTC'
          },
          'AID/ETH': {
            'id': 'tAIDETH',
            'symbol': 'AID/ETH',
            'base': 'AID',
            'quote': 'ETH',
            'baseId': 'tAID',
            'quoteId': 'zETH'
          },
          'REP/USD': {
            'id': 'tREPUSD',
            'symbol': 'REP/USD',
            'base': 'REP',
            'quote': 'USD',
            'baseId': 'tREP',
            'quoteId': 'zUSD'
          },
          'REP/BTC': {
            'id': 'tREPBTC',
            'symbol': 'REP/BTC',
            'base': 'REP',
            'quote': 'BTC',
            'baseId': 'tREP',
            'quoteId': 'zBTC'
          },
          'REP/ETH': {
            'id': 'tREPETH',
            'symbol': 'REP/ETH',
            'base': 'REP',
            'quote': 'ETH',
            'baseId': 'tREP',
            'quoteId': 'zETH'
          },
          'SNG/USD': {
            'id': 'tSNGUSD',
            'symbol': 'SNG/USD',
            'base': 'SNG',
            'quote': 'USD',
            'baseId': 'tSNG',
            'quoteId': 'zUSD'
          },
          'SNG/BTC': {
            'id': 'tSNGBTC',
            'symbol': 'SNG/BTC',
            'base': 'SNG',
            'quote': 'BTC',
            'baseId': 'tSNG',
            'quoteId': 'zBTC'
          },
          'SNG/ETH': {
            'id': 'tSNGETH',
            'symbol': 'SNG/ETH',
            'base': 'SNG',
            'quote': 'ETH',
            'baseId': 'tSNG',
            'quoteId': 'zETH'
          },
          'RLC/USD': {
            'id': 'tRLCUSD',
            'symbol': 'RLC/USD',
            'base': 'RLC',
            'quote': 'USD',
            'baseId': 'tRLC',
            'quoteId': 'zUSD'
          },
          'RLC/BTC': {
            'id': 'tRLCBTC',
            'symbol': 'RLC/BTC',
            'base': 'RLC',
            'quote': 'BTC',
            'baseId': 'tRLC',
            'quoteId': 'zBTC'
          },
          'RLC/ETH': {
            'id': 'tRLCETH',
            'symbol': 'RLC/ETH',
            'base': 'RLC',
            'quote': 'ETH',
            'baseId': 'tRLC',
            'quoteId': 'zETH'
          },
          'TNB/USD': {
            'id': 'tTNBUSD',
            'symbol': 'TNB/USD',
            'base': 'TNB',
            'quote': 'USD',
            'baseId': 'tTNB',
            'quoteId': 'zUSD'
          },
          'TNB/BTC': {
            'id': 'tTNBBTC',
            'symbol': 'TNB/BTC',
            'base': 'TNB',
            'quote': 'BTC',
            'baseId': 'tTNB',
            'quoteId': 'zBTC'
          },
          'TNB/ETH': {
            'id': 'tTNBETH',
            'symbol': 'TNB/ETH',
            'base': 'TNB',
            'quote': 'ETH',
            'baseId': 'tTNB',
            'quoteId': 'zETH'
          },
          'ZRX/USD': {
            'id': 'tZRXUSD',
            'symbol': 'ZRX/USD',
            'base': 'ZRX',
            'quote': 'USD',
            'baseId': 'tZRX',
            'quoteId': 'zUSD'
          },
          'ZRX/BTC': {
            'id': 'tZRXBTC',
            'symbol': 'ZRX/BTC',
            'base': 'ZRX',
            'quote': 'BTC',
            'baseId': 'tZRX',
            'quoteId': 'zBTC'
          },
          'ZRX/ETH': {
            'id': 'tZRXETH',
            'symbol': 'ZRX/ETH',
            'base': 'ZRX',
            'quote': 'ETH',
            'baseId': 'tZRX',
            'quoteId': 'zETH'
          }
        },
        'fees': {
          'trading': {
            'maker': 0.1 / 100,
            'taker': 0.2 / 100
          },
          'funding': {
            'withdraw': {
              'BTC': 0.0005,
              'BCH': 0.0005,
              'ETH': 0.01,
              'EOS': 0.1,
              'LTC': 0.001,
              'OMG': 0.1,
              'IOT': 0.0,
              'NEO': 0.0,
              'ETC': 0.01,
              'XRP': 0.02,
              'ETP': 0.01,
              'ZEC': 0.001,
              'BTG': 0.0,
              'DASH': 0.01,
              'XMR': 0.04,
              'QTM': 0.01,
              'EDO': 0.5,
              'DAT': 1.0,
              'AVT': 0.5,
              'SAN': 0.1,
              'USDT': 5.0,
              'SPK': 9.2784,
              'BAT': 9.0883,
              'GNT': 8.2881,
              'SNT': 14.303,
              'QASH': 3.2428,
              'YYW': 18.055
            }
          }
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      var currencies = {
        'DSH': 'DASH',
        // Bitfinex names Dash as DSH, instead of DASH
        'QTM': 'QTUM',
        'BCC': 'CST_BCC',
        'BCU': 'CST_BCU',
        'IOT': 'IOTA',
        'DAT': 'DATA'
      };
      return currency in currencies ? currencies[currency] : currency;
    }
  }, {
    key: "fetchBalance",
    value: function () {
      var _fetchBalance = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            balanceType,
            result,
            b,
            balance,
            _balance,
            accountType,
            currency,
            total,
            interest,
            available,
            uppercase,
            account,
            _args = arguments;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.privatePostAuthRWallets();

              case 3:
                response = _context.sent;
                balanceType = this.safeString(params, 'type', 'exchange');
                result = {
                  'info': response
                };

                for (b = 0; b < response.length; b++) {
                  balance = response[b];
                  _balance = _slicedToArray(balance, 5), accountType = _balance[0], currency = _balance[1], total = _balance[2], interest = _balance[3], available = _balance[4];

                  if (accountType === balanceType) {
                    if (currency[0] === 't') currency = currency.slice(1);
                    uppercase = currency.toUpperCase();
                    uppercase = this.commonCurrencyCode(uppercase);
                    account = this.account();
                    account['free'] = available;
                    account['total'] = total;
                    if (account['free']) account['used'] = account['total'] - account['free'];
                    result[uppercase] = account;
                  }
                }

                return _context.abrupt("return", this.parseBalance(result));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchBalance() {
        return _fetchBalance.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(symbol) {
        var params,
            orderbook,
            timestamp,
            result,
            i,
            order,
            price,
            amount,
            side,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                _context2.next = 3;
                return this.publicGetBookSymbolPrecision(this.extend({
                  'symbol': this.marketId(symbol),
                  'precision': 'R0'
                }, params));

              case 3:
                orderbook = _context2.sent;
                timestamp = this.milliseconds();
                result = {
                  'bids': [],
                  'asks': [],
                  'timestamp': timestamp,
                  'datetime': this.iso8601(timestamp)
                };

                for (i = 0; i < orderbook.length; i++) {
                  order = orderbook[i];
                  price = order[1];
                  amount = order[2];
                  side = amount > 0 ? 'bids' : 'asks';
                  amount = Math.abs(amount);
                  result[side].push([price, amount]);
                }

                result['bids'] = this.sortBy(result['bids'], 0, true);
                result['asks'] = this.sortBy(result['asks'], 0);
                return _context2.abrupt("return", result);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchOrderBook(_x) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var timestamp = this.milliseconds();
      var symbol = undefined;
      if (market) symbol = market['symbol'];
      var length = ticker.length;
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': ticker[length - 2],
        'low': ticker[length - 1],
        'bid': ticker[length - 10],
        'ask': ticker[length - 8],
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': ticker[length - 4],
        'change': ticker[length - 6],
        'percentage': ticker[length - 5],
        'average': undefined,
        'baseVolume': ticker[length - 3],
        'quoteVolume': undefined,
        'info': ticker
      };
    }
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var symbols,
            params,
            tickers,
            result,
            i,
            ticker,
            id,
            market,
            symbol,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                symbols = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : undefined;
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 4;
                return this.publicGetTickers(this.extend({
                  'symbols': this.ids.join(',')
                }, params));

              case 4:
                tickers = _context3.sent;
                result = {};

                for (i = 0; i < tickers.length; i++) {
                  ticker = tickers[i];
                  id = ticker[0];
                  market = this.markets_by_id[id];
                  symbol = market['symbol'];
                  result[symbol] = this.parseTicker(ticker, market);
                }

                return _context3.abrupt("return", result);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(symbol) {
        var params,
            market,
            ticker,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                market = this.markets[symbol];
                _context4.next = 4;
                return this.publicGetTickerSymbol(this.extend({
                  'symbol': market['id']
                }, params));

              case 4:
                ticker = _context4.sent;
                return _context4.abrupt("return", this.parseTicker(ticker, market));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTicker(_x2) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTrade",
    value: function parseTrade(trade, market) {
      var _trade = _slicedToArray(trade, 4),
          id = _trade[0],
          timestamp = _trade[1],
          amount = _trade[2],
          price = _trade[3];

      var side = amount < 0 ? 'sell' : 'buy';

      if (amount < 0) {
        amount = -amount;
      }

      return {
        'id': id.toString(),
        'info': trade,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'symbol': market['symbol'],
        'type': undefined,
        'side': side,
        'price': price,
        'amount': amount
      };
    }
  }, {
    key: "fetchTrades",
    value: function () {
      var _fetchTrades = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var since,
            limit,
            params,
            market,
            request,
            response,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                since = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : undefined;
                limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : undefined;
                params = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                market = this.market(symbol);
                request = {
                  'symbol': market['id']
                };
                if (typeof since !== 'undefined') request['start'] = since;
                if (typeof limit !== 'undefined') request['limit'] = limit;
                _context5.next = 9;
                return this.publicGetTradesSymbolHist(this.extend(request, params));

              case 9:
                response = _context5.sent;
                return _context5.abrupt("return", this.parseTrades(response, market, since, limit));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchTrades(_x3) {
        return _fetchTrades.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOHLCV",
    value: function () {
      var _fetchOHLCV = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(symbol) {
        var timeframe,
            since,
            limit,
            params,
            market,
            request,
            response,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                timeframe = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : '1m';
                since = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : undefined;
                limit = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : undefined;
                params = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : {};
                market = this.market(symbol);
                request = {
                  'symbol': market['id'],
                  'timeframe': this.timeframes[timeframe],
                  'sort': 1
                };
                if (typeof limit !== 'undefined') request['limit'] = limit;
                if (typeof since !== 'undefined') request['start'] = since;
                request = this.extend(request, params);
                _context6.next = 11;
                return this.publicGetCandlesTradeTimeframeSymbolHist(request);

              case 11:
                response = _context6.sent;
                return _context6.abrupt("return", this.parseOHLCVs(response, market, timeframe, since, limit));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function fetchOHLCV(_x4) {
        return _fetchOHLCV.apply(this, arguments);
      };
    }()
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(symbol, type, side, amount) {
        var price,
            params,
            _args7 = arguments;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                price = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : undefined;
                params = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : {};
                throw new NotSupported(this.id + ' createOrder not implemented yet');

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function createOrder(_x5, _x6, _x7, _x8) {
        return _createOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "cancelOrder",
    value: function cancelOrder(id) {
      var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      throw new NotSupported(this.id + ' cancelOrder not implemented yet');
    }
  }, {
    key: "fetchOrder",
    value: function () {
      var _fetchOrder = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(id) {
        var symbol,
            params,
            _args8 = arguments;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                symbol = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : undefined;
                params = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
                throw new NotSupported(this.id + ' fetchOrder not implemented yet');

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function fetchOrder(_x9) {
        return _fetchOrder.apply(this, arguments);
      };
    }()
  }, {
    key: "withdraw",
    value: function () {
      var _withdraw = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(currency, amount, address) {
        var tag,
            params,
            _args9 = arguments;
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                tag = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : undefined;
                params = _args9.length > 4 && _args9[4] !== undefined ? _args9[4] : {};
                throw new NotSupported(this.id + ' withdraw not implemented yet');

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function withdraw(_x10, _x11, _x12) {
        return _withdraw.apply(this, arguments);
      };
    }()
  }, {
    key: "nonce",
    value: function nonce() {
      return this.milliseconds();
    }
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var request = this.version + '/' + this.implodeParams(path, params);
      var query = this.omit(params, this.extractParams(path));
      var url = this.urls['api'] + '/' + request;

      if (api === 'public') {
        if (_Object$keys(query).length) {
          url += '?' + this.urlencode(query);
        }
      } else {
        this.checkRequiredCredentials();
        var nonce = this.nonce().toString();
        body = this.json(query);
        var auth = '/api' + '/' + request + nonce + body;
        var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha384');
        headers = {
          'bfx-nonce': nonce,
          'bfx-apikey': this.apiKey,
          'bfx-signature': signature,
          'Content-Type': 'application/json'
        };
      }

      return {
        'url': url,
        'method': method,
        'body': body,
        'headers': headers
      };
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            _args10 = arguments;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                api = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 'public';
                method = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 'GET';
                params = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
                headers = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : undefined;
                body = _args10.length > 5 && _args10[5] !== undefined ? _args10[5] : undefined;
                _context10.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context10.sent;

                if (!response) {
                  _context10.next = 16;
                  break;
                }

                if (!('message' in response)) {
                  _context10.next = 13;
                  break;
                }

                if (!(response['message'].indexOf('not enough exchange balance') >= 0)) {
                  _context10.next = 12;
                  break;
                }

                throw new InsufficientFunds(this.id + ' ' + this.json(response));

              case 12:
                throw new ExchangeError(this.id + ' ' + this.json(response));

              case 13:
                return _context10.abrupt("return", response);

              case 16:
                if (!(response === '')) {
                  _context10.next = 18;
                  break;
                }

                throw new ExchangeError(this.id + ' returned empty response');

              case 18:
                return _context10.abrupt("return", response);

              case 19:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function request(_x13) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return bitfinex2;
}(bitfinex);