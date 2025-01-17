"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toastrsCache = exports["default"] = void 0;

var _utils = require("./utils.js");

var _config = _interopRequireDefault(require("./config"));

var _constants = require("./constants");

var _createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TOTO: find a better way of handling this issue
// We will cache data so we can check for duplicated before fire the add action.
var toastrsCache = [];
exports.toastrsCache = toastrsCache;
var initialState = {
  toastrs: [],
  confirm: null
};

var _default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _constants.ADD_TOASTR, function (state, toastr) {
  if (toastr.ignoreToastr) {
    return state;
  }

  var newToastr = _objectSpread({
    id: (0, _utils.guid)(),
    position: _config["default"].position
  }, toastr);

  if (!newToastr.a11yId && toastr && toastr.hasOwnProperty('id') && !toastr.hasOwnProperty('a11yId')) {
    newToastr.a11yId = toastr.id;
  }

  var newState = {};

  if (!_config["default"].newestOnTop) {
    newState = _objectSpread(_objectSpread({}, state), {}, {
      toastrs: [].concat(_toConsumableArray(state.toastrs), [newToastr])
    });
  } else {
    newState = _objectSpread(_objectSpread({}, state), {}, {
      toastrs: [newToastr].concat(_toConsumableArray(state.toastrs))
    });
  }

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.REMOVE_TOASTR, function (state, id) {
  var newState = _objectSpread(_objectSpread({}, state), {}, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.id !== id;
    })
  });

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.REMOVE_BY_TYPE, function (state, type) {
  var newState = _objectSpread(_objectSpread({}, state), {}, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.type !== type;
    })
  });

  exports.toastrsCache = toastrsCache = newState.toastrs;
  return newState;
}), _defineProperty(_createReducer, _constants.CLEAN_TOASTR, function (state) {
  exports.toastrsCache = toastrsCache = [];
  return _objectSpread(_objectSpread({}, state), {}, {
    toastrs: []
  });
}), _defineProperty(_createReducer, _constants.SHOW_CONFIRM, function (state, _ref) {
  var id = _ref.id,
      message = _ref.message,
      options = _ref.options;
  return _objectSpread(_objectSpread({}, state), {}, {
    confirm: {
      id: id || (0, _utils.guid)(),
      show: true,
      message: message,
      options: options || {}
    }
  });
}), _defineProperty(_createReducer, _constants.HIDE_CONFIRM, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    confirm: null
  });
}), _createReducer));

exports["default"] = _default;