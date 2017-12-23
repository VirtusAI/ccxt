var _Object$getPrototypeOf = require("@babel/runtime/core-js/object/get-prototype-of");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _inherits = require("@babel/runtime/helpers/inherits");

var BaseError =
/*#__PURE__*/
function (_Error) {
  _inherits(BaseError, _Error);

  function BaseError(message) {
    var _this;

    _classCallCheck(this, BaseError);

    _this = _possibleConstructorReturn(this, (BaseError.__proto__ || _Object$getPrototypeOf(BaseError)).call(this, message)); // a workaround to make `instanceof BaseError` work in ES5

    _this.constructor = BaseError;
    _this.__proto__ = BaseError.prototype;
    _this.message = message;
    return _this;
  }

  return BaseError;
}(Error);

var ExchangeError =
/*#__PURE__*/
function (_BaseError) {
  _inherits(ExchangeError, _BaseError);

  function ExchangeError(message) {
    var _this2;

    _classCallCheck(this, ExchangeError);

    _this2 = _possibleConstructorReturn(this, (ExchangeError.__proto__ || _Object$getPrototypeOf(ExchangeError)).call(this, message));
    _this2.constructor = ExchangeError;
    _this2.__proto__ = ExchangeError.prototype;
    _this2.message = message;
    return _this2;
  }

  return ExchangeError;
}(BaseError);

var NotSupported =
/*#__PURE__*/
function (_ExchangeError) {
  _inherits(NotSupported, _ExchangeError);

  function NotSupported(message) {
    var _this3;

    _classCallCheck(this, NotSupported);

    _this3 = _possibleConstructorReturn(this, (NotSupported.__proto__ || _Object$getPrototypeOf(NotSupported)).call(this, message));
    _this3.constructor = NotSupported;
    _this3.__proto__ = NotSupported.prototype;
    _this3.message = message;
    return _this3;
  }

  return NotSupported;
}(ExchangeError);

var AuthenticationError =
/*#__PURE__*/
function (_ExchangeError2) {
  _inherits(AuthenticationError, _ExchangeError2);

  function AuthenticationError(message) {
    var _this4;

    _classCallCheck(this, AuthenticationError);

    _this4 = _possibleConstructorReturn(this, (AuthenticationError.__proto__ || _Object$getPrototypeOf(AuthenticationError)).call(this, message));
    _this4.constructor = AuthenticationError;
    _this4.__proto__ = AuthenticationError.prototype;
    _this4.message = message;
    return _this4;
  }

  return AuthenticationError;
}(ExchangeError);

var InvalidNonce =
/*#__PURE__*/
function (_ExchangeError3) {
  _inherits(InvalidNonce, _ExchangeError3);

  function InvalidNonce(message) {
    var _this5;

    _classCallCheck(this, InvalidNonce);

    _this5 = _possibleConstructorReturn(this, (InvalidNonce.__proto__ || _Object$getPrototypeOf(InvalidNonce)).call(this, message));
    _this5.constructor = InvalidNonce;
    _this5.__proto__ = InvalidNonce.prototype;
    _this5.message = message;
    return _this5;
  }

  return InvalidNonce;
}(ExchangeError);

var InsufficientFunds =
/*#__PURE__*/
function (_ExchangeError4) {
  _inherits(InsufficientFunds, _ExchangeError4);

  function InsufficientFunds(message) {
    var _this6;

    _classCallCheck(this, InsufficientFunds);

    _this6 = _possibleConstructorReturn(this, (InsufficientFunds.__proto__ || _Object$getPrototypeOf(InsufficientFunds)).call(this, message));
    _this6.constructor = InsufficientFunds;
    _this6.__proto__ = InsufficientFunds.prototype;
    _this6.message = message;
    return _this6;
  }

  return InsufficientFunds;
}(ExchangeError);

var InvalidOrder =
/*#__PURE__*/
function (_ExchangeError5) {
  _inherits(InvalidOrder, _ExchangeError5);

  function InvalidOrder(message) {
    var _this7;

    _classCallCheck(this, InvalidOrder);

    _this7 = _possibleConstructorReturn(this, (InvalidOrder.__proto__ || _Object$getPrototypeOf(InvalidOrder)).call(this, message));
    _this7.constructor = InvalidOrder;
    _this7.__proto__ = InvalidOrder.prototype;
    _this7.message = message;
    return _this7;
  }

  return InvalidOrder;
}(ExchangeError);

var OrderNotFound =
/*#__PURE__*/
function (_InvalidOrder) {
  _inherits(OrderNotFound, _InvalidOrder);

  function OrderNotFound(message) {
    var _this8;

    _classCallCheck(this, OrderNotFound);

    _this8 = _possibleConstructorReturn(this, (OrderNotFound.__proto__ || _Object$getPrototypeOf(OrderNotFound)).call(this, message));
    _this8.constructor = OrderNotFound;
    _this8.__proto__ = OrderNotFound.prototype;
    _this8.message = message;
    return _this8;
  }

  return OrderNotFound;
}(InvalidOrder);

var OrderNotCached =
/*#__PURE__*/
function (_InvalidOrder2) {
  _inherits(OrderNotCached, _InvalidOrder2);

  function OrderNotCached(message) {
    var _this9;

    _classCallCheck(this, OrderNotCached);

    _this9 = _possibleConstructorReturn(this, (OrderNotCached.__proto__ || _Object$getPrototypeOf(OrderNotCached)).call(this, message));
    _this9.constructor = OrderNotCached;
    _this9.__proto__ = OrderNotCached.prototype;
    _this9.message = message;
    return _this9;
  }

  return OrderNotCached;
}(InvalidOrder);

var CancelPending =
/*#__PURE__*/
function (_InvalidOrder3) {
  _inherits(CancelPending, _InvalidOrder3);

  function CancelPending(message) {
    var _this10;

    _classCallCheck(this, CancelPending);

    _this10 = _possibleConstructorReturn(this, (CancelPending.__proto__ || _Object$getPrototypeOf(CancelPending)).call(this, message));
    _this10.constructor = CancelPending;
    _this10.__proto__ = CancelPending.prototype;
    _this10.message = message;
    return _this10;
  }

  return CancelPending;
}(InvalidOrder);

var NetworkError =
/*#__PURE__*/
function (_BaseError2) {
  _inherits(NetworkError, _BaseError2);

  function NetworkError(message) {
    var _this11;

    _classCallCheck(this, NetworkError);

    _this11 = _possibleConstructorReturn(this, (NetworkError.__proto__ || _Object$getPrototypeOf(NetworkError)).call(this, message));
    _this11.constructor = NetworkError;
    _this11.__proto__ = NetworkError.prototype;
    _this11.message = message;
    return _this11;
  }

  return NetworkError;
}(BaseError);

var DDoSProtection =
/*#__PURE__*/
function (_NetworkError) {
  _inherits(DDoSProtection, _NetworkError);

  function DDoSProtection(message) {
    var _this12;

    _classCallCheck(this, DDoSProtection);

    _this12 = _possibleConstructorReturn(this, (DDoSProtection.__proto__ || _Object$getPrototypeOf(DDoSProtection)).call(this, message));
    _this12.constructor = DDoSProtection;
    _this12.__proto__ = DDoSProtection.prototype;
    _this12.message = message;
    return _this12;
  }

  return DDoSProtection;
}(NetworkError);

var RequestTimeout =
/*#__PURE__*/
function (_NetworkError2) {
  _inherits(RequestTimeout, _NetworkError2);

  function RequestTimeout(message) {
    var _this13;

    _classCallCheck(this, RequestTimeout);

    _this13 = _possibleConstructorReturn(this, (RequestTimeout.__proto__ || _Object$getPrototypeOf(RequestTimeout)).call(this, message));
    _this13.constructor = RequestTimeout;
    _this13.__proto__ = RequestTimeout.prototype;
    _this13.message = message;
    return _this13;
  }

  return RequestTimeout;
}(NetworkError);

var ExchangeNotAvailable =
/*#__PURE__*/
function (_NetworkError3) {
  _inherits(ExchangeNotAvailable, _NetworkError3);

  function ExchangeNotAvailable(message) {
    var _this14;

    _classCallCheck(this, ExchangeNotAvailable);

    _this14 = _possibleConstructorReturn(this, (ExchangeNotAvailable.__proto__ || _Object$getPrototypeOf(ExchangeNotAvailable)).call(this, message));
    _this14.constructor = ExchangeNotAvailable;
    _this14.__proto__ = ExchangeNotAvailable.prototype;
    _this14.message = message;
    return _this14;
  }

  return ExchangeNotAvailable;
}(NetworkError);

module.exports = {
  BaseError: BaseError,
  ExchangeError: ExchangeError,
  NotSupported: NotSupported,
  AuthenticationError: AuthenticationError,
  InvalidNonce: InvalidNonce,
  InsufficientFunds: InsufficientFunds,
  InvalidOrder: InvalidOrder,
  OrderNotFound: OrderNotFound,
  OrderNotCached: OrderNotCached,
  CancelPending: CancelPending,
  NetworkError: NetworkError,
  DDoSProtection: DDoSProtection,
  RequestTimeout: RequestTimeout,
  ExchangeNotAvailable: ExchangeNotAvailable
};