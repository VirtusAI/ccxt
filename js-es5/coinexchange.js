'use strict'; //  ---------------------------------------------------------------------------

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _get = require("@babel/runtime/helpers/get");

var _inherits = require("@babel/runtime/helpers/inherits");

var Exchange = require('./base/Exchange');

var _require = require('./base/errors'),
    ExchangeError = _require.ExchangeError; //  ---------------------------------------------------------------------------


module.exports =
/*#__PURE__*/
function (_Exchange) {
  _inherits(coinexchange, _Exchange);

  function coinexchange() {
    _classCallCheck(this, coinexchange);

    return _possibleConstructorReturn(this, (coinexchange.__proto__ || _Object$getPrototypeOf(coinexchange)).apply(this, arguments));
  }

  _createClass(coinexchange, [{
    key: "describe",
    value: function describe() {
      return this.deepExtend(_get(coinexchange.prototype.__proto__ || _Object$getPrototypeOf(coinexchange.prototype), "describe", this).call(this), {
        'id': 'coinexchange',
        'name': 'CoinExchange',
        'countries': ['IN', 'JP', 'KR', 'VN', 'US'],
        'rateLimit': 1000,
        // new metainfo interface
        'has': {
          'privateAPI': false,
          'fetchTrades': false,
          'fetchCurrencies': true,
          'fetchTickers': true
        },
        'urls': {
          'logo': 'https://user-images.githubusercontent.com/1294454/34842303-29c99fca-f71c-11e7-83c1-09d900cb2334.jpg',
          'api': 'https://www.coinexchange.io/api/v1',
          'www': 'https://www.coinexchange.io',
          'doc': 'https://coinexchangeio.github.io/slate/',
          'fees': 'https://www.coinexchange.io/fees'
        },
        'api': {
          'public': {
            'get': ['getcurrency', 'getcurrencies', 'getmarkets', 'getmarketsummaries', 'getmarketsummary', 'getorderbook']
          }
        },
        'fees': {
          'trading': {
            'maker': 0.0015,
            'taker': 0.0015
          },
          'funding': {
            'withdraw': {
              '1337': 0.01,
              '420G': 0.01,
              '611': 0.1,
              'ACC': 0.01,
              'ACES': 0.01,
              'ACO': 0.01,
              'ACP': 0.01,
              'ADCN': 500.0,
              'ADST': 1.0,
              'ADZ': 0.1,
              'AGRI': 0.01,
              'AI': 1.0,
              'AKY': 0.01,
              'ALIS': 1.0,
              'ALL': 0.2,
              'AMC': 0.1,
              'AMMO': 0.01,
              'AMS': 0.01,
              'ANTX': 0.01,
              'ANY': 1.0,
              'ARG': 0.1,
              'ARGUS': 0.01,
              'ARGUSOLD': 0.01,
              'ASN': 0.01,
              'ATOM': 0.01,
              'ATX': 0.01,
              'AU': 0.01,
              'B2B': 1.0,
              'B3': 0.01,
              'BAKED': 0.01,
              'BCC': 0.01,
              'BCH': 0.001,
              'BCM': 0.01,
              'BDL': 0.01,
              'BEER': 0.01,
              'BELA': 0.01,
              'BENJI': 0.05,
              'BET': 0.01,
              'BFI': 1.0,
              'BIGUP': 1.0,
              'BIRDS': 0.01,
              'BITB': 0.1,
              'BIXC': 0.01,
              'BIZ': 0.01,
              'BLAS': 0.1,
              'BLAZR': 0.2,
              'BLK': 0.01,
              'BLN': 1.0,
              'BLUE': 1.0,
              'BOAT': 1.0,
              'BON': 0.01,
              'BONPAY': 1.0,
              'BOPS': 0.01,
              'BPOK': 0.1,
              'BQ': 1.0,
              'BRAT': 0.01,
              'BRC': 1.0,
              'BRIT': 0.01,
              'BSN': 1.0,
              'BSR': 0.01,
              'BTBc': 0.01,
              'BTC': 0.001,
              'BTCRED': 1.0,
              'BTCRF': 0.01,
              'BTDX': 0.1,
              'BTE': 1.0,
              'BTPL': 0.01,
              'BULLS': 0.01,
              'BUZZ': 0.01,
              'BXT': 0.01,
              'C47': 1.0,
              'CACH': 0.2,
              'CALC': 0.01,
              'CANN': 0.01,
              'CBANK': 1.0,
              'CDX': 1.0,
              'CHEAP': 0.01,
              'CHESS': 0.01,
              'CHILI': 0.01,
              'CHIPS': 0.1,
              'CJ': 0.1,
              'CLT': 0.1,
              'CMPCO': 0.2,
              'CMX': 0.01,
              'CNNC': 0.02,
              'CNT': 0.01,
              'CO2': 1.0,
              'COOC': 0.01,
              'COUPE': 0.01,
              'CQST': 0.1,
              'CRACKERS': 0.01,
              'CRDNC': 0.01,
              'CREA': 0.02,
              'CREAK': 0.01,
              'CREVA2': 0.01,
              'CRMSN': 0.01,
              'CRN': 0.01,
              'CRW': 0.01,
              'CTIC2': 0.01,
              'CUBE': 0.01,
              'CXT': 0.01,
              'CYCLONE': 0.01,
              'CYDER': 0.01,
              'DAG': 0.01,
              'DALC': 1.0,
              'DARI': 0.01,
              'DASH': 0.01,
              'DAV': 0.01,
              'DBIC': 0.1,
              'DCN': 1.0,
              'DEM': 0.01,
              'DFS': 0.01,
              'DGB': 0.1,
              'DGC': 0.1,
              'DIME': 0.01,
              'DMB': 0.01,
              'DMC': 0.1,
              'DNCV2': 0.01,
              'DNE': 1.0,
              'DNR': 0.01,
              'DOGE': 2.0,
              'DOGEJ': 1.0,
              'DP': 0.01,
              'DRGN': 1.0,
              'DRS': 0.1,
              'DSE': 0.01,
              'DSR': 0.01,
              'DTCT': 1.0,
              'DUTCH': 0.01,
              'EBC': 0.01,
              'EBT': 0.01,
              'ECC': 0.1,
              'ECN': 0.01,
              'EDRC': 0.01,
              'EECN': 0.01,
              'EGC': 0.1,
              'ELCO': 0.1,
              'ELIX': 1.0,
              'ELS': 0.01,
              'ELT': 1.0,
              'EMC': 0.01,
              'EMIRG': 0.01,
              'ENTRC': 1.0,
              'ENZO': 0.1,
              'EQL': 1.0,
              'EQT': 0.1,
              'ERSO': 0.01,
              'ERT': 1.0,
              'ERY': 0.01,
              'ESP': 0.1,
              'ETBS': 1.0,
              'ETC': 0.1,
              'ETG': 1.0,
              'ETH': 0.01,
              'ETHD': 0.01,
              'ETHOS': 1.0,
              'ETN': 2.0,
              'EUROP': 0.1,
              'EXCL': 0.1,
              'EXTN': 0.01,
              'FAIR': 0.01,
              'FAP': 1.0,
              'FAZZ': 0.01,
              'FCH': 0.01,
              'FGZ': 0.1,
              'FLASH': 0.01,
              'FLIK': 1.0,
              'FRT': 0.1,
              'FSX': 0.1,
              'FTC': 0.01,
              'FXE': 2.0,
              'GAIN': 1.0,
              'GB': 0.1,
              'GBX': 0.01,
              'GDC': 1.0,
              'GEERT': 0.01,
              'GET': 0.01,
              'GFC': 1.0,
              'GLS': 0.01,
              'GLT': 0.01,
              'GLTC': 0.01,
              'GMB': 0.01,
              'GMX': 0.01,
              'GOKUOLD': 0.1,
              'GOLD': 0.01,
              'GOLF': 0.1,
              'GOOD': 2.0,
              'GP': 0.01,
              'GRE': 0.01,
              'GREENF': 0.01,
              'GRMD': 1.0,
              'GRS': 0.01,
              'GRX': 1.0,
              'GTC': 0.01,
              'GWC': 0.2,
              'HALLO': 0.01,
              'HBC': 0.01,
              'HC': 0.01,
              'HEALTHY': 0.01,
              'HIGH': 0.01,
              'HMC': 0.01,
              'HNC': 0.01,
              'HOC': 0.01,
              'HODL': 0.01,
              'HOLLY': 1.0,
              'HONEY': 0.01,
              'HOPE': 0.01,
              'HPC': 0.01,
              'HUB': 1.0,
              'HYP': 0.01,
              'HYPER': 0.01,
              'IBC': 1.0,
              'ICE': 1.0,
              'ICOT': 1.0,
              'IFT': 1.0,
              'ILC': 0.01,
              'IMX': 0.01,
              'INDIA': 0.01,
              'INFO': 0.01,
              'INSN': 0.01,
              'INXT': 1.0,
              'IOE': 0.01,
              'IQT': 1.0,
              'IXC': 0.01,
              'JAPAN': 0.01,
              'JEDI': 0.01,
              'JET': 1.0,
              'JIN': 0.2,
              'KAYI': 0.01,
              'KB3': 0.01,
              'KGB': 0.01,
              'KLC': 0.1,
              'KMD': 0.01,
              'KOBO': 1.0,
              'KOI': 0.01,
              'KORUNA': 0.1,
              'KRA': 0.01,
              'KUBO': 0.01,
              'KURT': 0.01,
              'LA': 1.0,
              'LAMBO': 0.01,
              'LCT': 1.0,
              'LDC': 0.01,
              'LEVO': 0.1,
              'LIFE': 1.0,
              'LINDA': 0.01,
              'LINX': 0.01,
              'LIZ': 0.01,
              'LMC': 0.1,
              'LNK': 0.05,
              'LRC': 1.0,
              'LTC': 0.01,
              'LTG': 1.0,
              'LUCK': 0.01,
              'LUNA': 0.01,
              'LVPS': 0.01,
              'MAC': 2.0,
              'MAG': 0.01,
              'MALC': 0.01,
              'MARS': 0.01,
              'MARS2': 0.01,
              'MAXI': 0.01,
              'MAY': 0.01,
              'MBC': 0.01,
              'MBIT': 0.01,
              'MCB': 1.0,
              'MEC': 0.1,
              'MENTAL': 0.1,
              'MER': 0.1,
              'MET': 0.01,
              'MGM': 0.01,
              'MGT': 0.01,
              'MILO': 0.5,
              'MINEX': 1.0,
              'MINT': 1.0,
              'MIPS': 1.0,
              'MNX': 0.01,
              'MOIN': 0.1,
              'MOON': 0.1,
              'MSCN': 0.01,
              'MSP': 1.0,
              'MST': 0.1,
              'MTH': 1.0,
              'MUE': 0.1,
              'MUX': 1.0,
              'MXC': 0.01,
              'MXT': 0.1,
              'MYB': 1.0,
              'NBIT': 0.1,
              'NBX': 0.01,
              'NEOG': 1.0,
              'NEON': 0.01,
              'NLC2': 0.01,
              'NLG': 0.1,
              'NRN': 0.01,
              'NRO': 0.01,
              'NTC': 1.0,
              'NTO': 1.0,
              'NUA': 1.0,
              'NUMUS': 0.01,
              'OC': 0.01,
              'OGN': 0.01,
              'ORO': 0.01,
              'PARIS': 0.01,
              'PAYU': 0.1,
              'PCN': 1.0,
              'PCS': 0.01,
              'PDG': 0.01,
              'PEC': 0.01,
              'PGL': 1.0,
              'PHN': 1.0,
              'PICO': 0.1,
              'PIE': 0.01,
              'PIGGY': 0.1,
              'PIVX': 0.2,
              'PIX': 1.0,
              'PKT': 1.0,
              'PLACO': 0.01,
              'PLX': 1.0,
              'POL': 0.01,
              'POLOB': 0.1,
              'POS': 1.0,
              'POST': 1.0,
              'POSW': 0.01,
              'POT': 0.1,
              'PRE': 1.0,
              'PRIMU': 0.01,
              'PRL': 1.0,
              'PRN': 1.0,
              'PRX': 0.01,
              'PT': 1.0,
              'PTS': 1.0,
              'PURA': 1.0,
              'PURE': 0.01,
              'PUT': 0.1,
              'PWC': 0.01,
              'PWR': 0.1,
              'QTUM': 0.01,
              'QUANT': 0.01,
              'RAIN': 0.5,
              'RBL': 0.01,
              'RDC': 0.01,
              'REC': 0.01,
              'REGA': 0.1,
              'REX': 1.0,
              'RHO': 0.1,
              'RIYA': 1.0,
              'RMC': 2.0,
              'RNS': 0.01,
              'ROC': 0.0,
              'ROOFS': 0.01,
              'RUB': 0.01,
              'RUNE': 0.01,
              'RUNNERS': 0.01,
              'RUP': 0.01,
              'SBIT': 0.01,
              'SCL': 1.0,
              'SCORE': 0.01,
              'SCOREOLD': 0.01,
              'SDASH': 0.01,
              'SFC': 0.01,
              'SFE': 0.01,
              'SGR': 1.0,
              'SHIT': 0.1,
              'SHM': 0.1,
              'SHND': 0.1,
              'SHOT': 0.1,
              'SIC': 0.1,
              'SILK2': 0.01,
              'SIMP': 0.001,
              'SISA': 1.0,
              'SKOIN': 0.01,
              'SKULL': 0.01,
              'SLEVIN': 0.01,
              'SLR': 0.01,
              'SMART': 0.01,
              'SMS': 0.002,
              'SNOW': 0.01,
              'SOLAR': 0.01,
              'SPRTS': 1.0,
              'SRC': 0.01,
              'SST': 0.1,
              'STARS': 0.01,
              'STN': 0.01,
              'STO': 0.01,
              'STX': 1.0,
              'SUPER': 0.01,
              'SUPERMAN': 0.01,
              'SURGE': 0.01,
              'SWC': 0.1,
              'SYNQ': 0.01,
              'SYNX': 0.01,
              'TAAS': 2.0,
              'TBS': 0.01,
              'TCOIN': 0.01,
              'TELL': 0.1,
              'TER': 0.005,
              'TGT': 1.0,
              'TIGER': 0.01,
              'TIPS': 0.01,
              'TLE': 0.01,
              'TOPAZ': 0.01,
              'TOR': 0.01,
              'TPC': 0.01,
              'TPG': 0.01,
              'TPI': 1.0,
              'TRANCE': 0.01,
              'TRC': 0.01,
              'TRUX': 0.01,
              'TSE': 0.1,
              'TSTR': 0.01,
              'TURBO': 0.01,
              'UFO': 0.01,
              'UK': 0.01,
              'ULA': 0.01,
              'UNIFY': 0.0,
              'UNIT': 0.1,
              'UNO': 0.001,
              'UP': 0.01,
              'UQC': 1.0,
              'USA': 0.01,
              'VC': 0.01,
              'VGS': 0.01,
              'VIDZ': 0.01,
              'VISIO': 0.05,
              'VLTC': 0.1,
              'VOISE': 1.0,
              'VONE': 0.01,
              'VOX': 0.01,
              'VSX': 0.01,
              'VULCANO': 0.01,
              'WASH': 0.1,
              'WCL': 1.0,
              'WINK': 0.01,
              'WOMEN': 0.01,
              'WORM': 0.01,
              'WOW': 0.1,
              'WRP': 0.01,
              'WYV': 0.01,
              'XBC': 0.01,
              'XBL': 1.0,
              'XBU': 1.0,
              'XCHE': 0.1,
              'XCS': 0.01,
              'XCT': 0.01,
              'XCXT': 0.01,
              'XDE2': 0.01,
              'XEV': 0.1,
              'XGOX': 0.01,
              'XGTC': 0.01,
              'XLR': 0.1,
              'XMCC': 0.01,
              'XP': 1.0,
              'XPASC': 0.01,
              'XQN': 0.01,
              'XSA': 0.1,
              'XSTC': 2.0,
              'XTD': 0.01,
              'XVS': 0.01,
              'XXX': 0.1,
              'XYOC': 1.0,
              'XYZ': 0.01,
              'XZC': 0.1,
              'XZCD': 0.01,
              'YHC': 0.01,
              'ZCC': 0.01,
              'ZCG': 1.0,
              'ZCL': 0.001,
              'ZEC': 0.001,
              'ZEIT': 0.1,
              'ZENI': 0.01,
              'ZERO': 0.01,
              'ZMC': 0.1,
              'ZOI': 0.01,
              'ZSE': 0.01,
              'ZURMO': 0.1,
              'ZZC': 0.01
            }
          }
        },
        'precision': {
          'amount': 8,
          'price': 8
        }
      });
    }
  }, {
    key: "commonCurrencyCode",
    value: function commonCurrencyCode(currency) {
      if (currency === 'HNC') return 'Huncoin';
      return currency;
    }
  }, {
    key: "fetchCurrencies",
    value: function () {
      var _fetchCurrencies = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var params,
            response,
            currencies,
            precision,
            result,
            i,
            currency,
            id,
            code,
            active,
            status,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.next = 3;
                return this.publicGetGetcurrencies(params);

              case 3:
                response = _context.sent;
                currencies = response['result'];
                precision = this.precision['amount'];
                result = {};

                for (i = 0; i < currencies.length; i++) {
                  currency = currencies[i];
                  id = currency['CurrencyID'];
                  code = this.commonCurrencyCode(currency['TickerCode']);
                  active = currency['WalletStatus'] === 'online';
                  status = 'ok';
                  if (!active) status = 'disabled';
                  result[code] = {
                    'id': id,
                    'code': code,
                    'name': currency['Name'],
                    'active': active,
                    'status': status,
                    'precision': precision,
                    'limits': {
                      'amount': {
                        'min': undefined,
                        'max': Math.pow(10, precision)
                      },
                      'price': {
                        'min': Math.pow(10, -precision),
                        'max': Math.pow(10, precision)
                      },
                      'cost': {
                        'min': undefined,
                        'max': undefined
                      },
                      'withdraw': {
                        'min': undefined,
                        'max': Math.pow(10, precision)
                      }
                    },
                    'info': currency
                  };
                }

                return _context.abrupt("return", result);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchCurrencies() {
        return _fetchCurrencies.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchMarkets",
    value: function () {
      var _fetchMarkets = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var response, markets, result, i, market, id, base, quote, symbol;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.publicGetGetmarkets();

              case 2:
                response = _context2.sent;
                markets = response['result'];
                result = [];

                for (i = 0; i < markets.length; i++) {
                  market = markets[i];
                  id = market['MarketID'];
                  base = this.commonCurrencyCode(market['MarketAssetCode']);
                  quote = this.commonCurrencyCode(market['BaseCurrencyCode']);
                  symbol = base + '/' + quote;
                  result.push({
                    'id': id,
                    'symbol': symbol,
                    'base': base,
                    'quote': quote,
                    'baseId': market['MarketAssetID'],
                    'quoteId': market['BaseCurrencyID'],
                    'active': market['Active'],
                    'lot': undefined,
                    'info': market
                  });
                }

                return _context2.abrupt("return", result);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function fetchMarkets() {
        return _fetchMarkets.apply(this, arguments);
      };
    }()
  }, {
    key: "parseTicker",
    value: function parseTicker(ticker) {
      var market = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var symbol = undefined;

      if (!market) {
        var marketId = ticker['MarketID'];
        if (marketId in this.markets_by_id) market = this.marketsById[marketId];else symbol = marketId;
      }

      if (market) symbol = market['symbol'];
      var timestamp = this.milliseconds();
      return {
        'symbol': symbol,
        'timestamp': timestamp,
        'datetime': this.iso8601(timestamp),
        'high': this.safeFloat(ticker, 'HighPrice'),
        'low': this.safeFloat(ticker, 'LowPrice'),
        'bid': this.safeFloat(ticker, 'BidPrice'),
        'ask': this.safeFloat(ticker, 'AskPrice'),
        'vwap': undefined,
        'open': undefined,
        'close': undefined,
        'first': undefined,
        'last': this.safeFloat(ticker, 'LastPrice'),
        'change': this.safeFloat(ticker, 'Change'),
        'percentage': undefined,
        'average': undefined,
        'baseVolume': undefined,
        'quoteVolume': this.safeFloat(ticker, 'Volume'),
        'info': ticker
      };
    }
  }, {
    key: "fetchTicker",
    value: function () {
      var _fetchTicker = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(symbol) {
        var params,
            market,
            ticker,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _context3.next = 3;
                return this.loadMarkets();

              case 3:
                market = this.market(symbol);
                _context3.next = 6;
                return this.publicGetGetmarketsummary(this.extend({
                  'market_id': market['id']
                }, params));

              case 6:
                ticker = _context3.sent;
                return _context3.abrupt("return", this.parseTicker(ticker['result'], market));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function fetchTicker(_x) {
        return _fetchTicker.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchTickers",
    value: function () {
      var _fetchTickers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        var symbols,
            params,
            response,
            tickers,
            result,
            i,
            ticker,
            symbol,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                symbols = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : undefined;
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                _context4.next = 4;
                return this.loadMarkets();

              case 4:
                _context4.next = 6;
                return this.publicGetGetmarketsummaries(params);

              case 6:
                response = _context4.sent;
                tickers = response['result'];
                result = {};

                for (i = 0; i < tickers.length; i++) {
                  ticker = this.parseTicker(tickers[i]);
                  symbol = ticker['symbol'];
                  result[symbol] = ticker;
                }

                return _context4.abrupt("return", result);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fetchTickers() {
        return _fetchTickers.apply(this, arguments);
      };
    }()
  }, {
    key: "fetchOrderBook",
    value: function () {
      var _fetchOrderBook = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(symbol) {
        var params,
            orderbook,
            _args5 = arguments;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _context5.next = 3;
                return this.loadMarkets();

              case 3:
                _context5.next = 5;
                return this.publicGetGetorderbook(this.extend({
                  'market_id': this.marketId(symbol)
                }, params));

              case 5:
                orderbook = _context5.sent;
                return _context5.abrupt("return", this.parseOrderBook(orderbook['result'], undefined, 'BuyOrders', 'SellOrders', 'Price', 'Quantity'));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function fetchOrderBook(_x2) {
        return _fetchOrderBook.apply(this, arguments);
      };
    }()
  }, {
    key: "sign",
    value: function sign(path) {
      var api = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'public';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var body = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      var url = this.urls['api'] + '/' + path;

      if (api === 'public') {
        params = this.urlencode(params);
        if (params.length) url += '?' + params;
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
      _regeneratorRuntime.mark(function _callee6(path) {
        var api,
            method,
            params,
            headers,
            body,
            response,
            success,
            message,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                api = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 'public';
                method = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 'GET';
                params = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                headers = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : undefined;
                body = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : undefined;
                _context6.next = 7;
                return this.fetch2(path, api, method, params, headers, body);

              case 7:
                response = _context6.sent;
                success = this.safeInteger(response, 'success');

                if (!(success !== 1)) {
                  _context6.next = 12;
                  break;
                }

                message = this.safeString(response, 'message', 'Error');
                throw new ExchangeError(message);

              case 12:
                return _context6.abrupt("return", response);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function request(_x3) {
        return _request.apply(this, arguments);
      };
    }()
  }]);

  return coinexchange;
}(Exchange);