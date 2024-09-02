import { createContext } from 'react';
export const ToastContext = /*#__PURE__*/createContext({
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