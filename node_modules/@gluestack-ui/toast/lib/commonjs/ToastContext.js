"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContext = void 0;
var _react = require("react");
const ToastContext = exports.ToastContext = /*#__PURE__*/(0, _react.createContext)({
  toastInfo: {},
  setToastInfo: () => {},
  setToast: () => '',
  removeToast: () => {},
  hideAll: () => {},
  isActive: () => false,
  visibleToasts: {},
  setVisibleToasts: () => {},
  hideToast: () => {},
  AnimationWrapper: {
    current: null
  },
  AnimatePresence: {
    current: null
  }
});
//# sourceMappingURL=ToastContext.js.map