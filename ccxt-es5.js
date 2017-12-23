"use strict";
/*

MIT License

Copyright (c) 2017 Igor Kroitor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

"use strict"; //-----------------------------------------------------------------------------

var _Object$keys = require("@babel/runtime/core-js/object/keys");

var _Object$assign = require("@babel/runtime/core-js/object/assign");

var Exchange = require('./js-es5/base/Exchange');

var functions = require('./js-es5/base/functions');

var errors = require('./js-es5/base/errors'); //-----------------------------------------------------------------------------
// this is updated by vss.js when building


var version = '1.10.456';
Exchange.ccxtVersion = version; //-----------------------------------------------------------------------------

var exchanges = {
  '_1broker': require('./js-es5/_1broker.js'),
  '_1btcxe': require('./js-es5/_1btcxe.js'),
  'acx': require('./js-es5/acx.js'),
  'allcoin': require('./js-es5/allcoin.js'),
  'anxpro': require('./js-es5/anxpro.js'),
  'binance': require('./js-es5/binance.js'),
  'bit2c': require('./js-es5/bit2c.js'),
  'bitbay': require('./js-es5/bitbay.js'),
  'bitcoincoid': require('./js-es5/bitcoincoid.js'),
  'bitfinex': require('./js-es5/bitfinex.js'),
  'bitfinex2': require('./js-es5/bitfinex2.js'),
  'bitflyer': require('./js-es5/bitflyer.js'),
  'bithumb': require('./js-es5/bithumb.js'),
  'bitlish': require('./js-es5/bitlish.js'),
  'bitmarket': require('./js-es5/bitmarket.js'),
  'bitmex': require('./js-es5/bitmex.js'),
  'bitso': require('./js-es5/bitso.js'),
  'bitstamp': require('./js-es5/bitstamp.js'),
  'bitstamp1': require('./js-es5/bitstamp1.js'),
  'bittrex': require('./js-es5/bittrex.js'),
  'bl3p': require('./js-es5/bl3p.js'),
  'bleutrade': require('./js-es5/bleutrade.js'),
  'btcbox': require('./js-es5/btcbox.js'),
  'btcchina': require('./js-es5/btcchina.js'),
  'btcexchange': require('./js-es5/btcexchange.js'),
  'btcmarkets': require('./js-es5/btcmarkets.js'),
  'btctradeua': require('./js-es5/btctradeua.js'),
  'btcturk': require('./js-es5/btcturk.js'),
  'btcx': require('./js-es5/btcx.js'),
  'bter': require('./js-es5/bter.js'),
  'bxinth': require('./js-es5/bxinth.js'),
  'ccex': require('./js-es5/ccex.js'),
  'cex': require('./js-es5/cex.js'),
  'chbtc': require('./js-es5/chbtc.js'),
  'chilebit': require('./js-es5/chilebit.js'),
  'coincheck': require('./js-es5/coincheck.js'),
  'coinfloor': require('./js-es5/coinfloor.js'),
  'coingi': require('./js-es5/coingi.js'),
  'coinmarketcap': require('./js-es5/coinmarketcap.js'),
  'coinmate': require('./js-es5/coinmate.js'),
  'coinsecure': require('./js-es5/coinsecure.js'),
  'coinspot': require('./js-es5/coinspot.js'),
  'cryptopia': require('./js-es5/cryptopia.js'),
  'dsx': require('./js-es5/dsx.js'),
  'exmo': require('./js-es5/exmo.js'),
  'flowbtc': require('./js-es5/flowbtc.js'),
  'foxbit': require('./js-es5/foxbit.js'),
  'fybse': require('./js-es5/fybse.js'),
  'fybsg': require('./js-es5/fybsg.js'),
  'gatecoin': require('./js-es5/gatecoin.js'),
  'gateio': require('./js-es5/gateio.js'),
  'gdax': require('./js-es5/gdax.js'),
  'gemini': require('./js-es5/gemini.js'),
  'getbtc': require('./js-es5/getbtc.js'),
  'hitbtc': require('./js-es5/hitbtc.js'),
  'hitbtc2': require('./js-es5/hitbtc2.js'),
  'huobi': require('./js-es5/huobi.js'),
  'huobicny': require('./js-es5/huobicny.js'),
  'huobipro': require('./js-es5/huobipro.js'),
  'independentreserve': require('./js-es5/independentreserve.js'),
  'itbit': require('./js-es5/itbit.js'),
  'jubi': require('./js-es5/jubi.js'),
  'kraken': require('./js-es5/kraken.js'),
  'kucoin': require('./js-es5/kucoin.js'),
  'kuna': require('./js-es5/kuna.js'),
  'lakebtc': require('./js-es5/lakebtc.js'),
  'liqui': require('./js-es5/liqui.js'),
  'livecoin': require('./js-es5/livecoin.js'),
  'luno': require('./js-es5/luno.js'),
  'mercado': require('./js-es5/mercado.js'),
  'mixcoins': require('./js-es5/mixcoins.js'),
  'nova': require('./js-es5/nova.js'),
  'okcoincny': require('./js-es5/okcoincny.js'),
  'okcoinusd': require('./js-es5/okcoinusd.js'),
  'okex': require('./js-es5/okex.js'),
  'paymium': require('./js-es5/paymium.js'),
  'poloniex': require('./js-es5/poloniex.js'),
  'qryptos': require('./js-es5/qryptos.js'),
  'quadrigacx': require('./js-es5/quadrigacx.js'),
  'quoine': require('./js-es5/quoine.js'),
  'southxchange': require('./js-es5/southxchange.js'),
  'surbitcoin': require('./js-es5/surbitcoin.js'),
  'therock': require('./js-es5/therock.js'),
  'tidex': require('./js-es5/tidex.js'),
  'urdubit': require('./js-es5/urdubit.js'),
  'vaultoro': require('./js-es5/vaultoro.js'),
  'vbtc': require('./js-es5/vbtc.js'),
  'virwox': require('./js-es5/virwox.js'),
  'wex': require('./js-es5/wex.js'),
  'xbtce': require('./js-es5/xbtce.js'),
  'yobit': require('./js-es5/yobit.js'),
  'yunbi': require('./js-es5/yunbi.js'),
  'zaif': require('./js-es5/zaif.js'),
  'zb': require('./js-es5/zb.js') //-----------------------------------------------------------------------------

};
module.exports = _Object$assign({
  version: version,
  Exchange: Exchange,
  exchanges: _Object$keys(exchanges)
}, exchanges, functions, errors); //-----------------------------------------------------------------------------
