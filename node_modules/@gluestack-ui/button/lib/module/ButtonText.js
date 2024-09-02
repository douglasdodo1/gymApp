function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { useButtonContext } from './Context';
export const ButtonText = StyledButtonText => /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    hover,
    focus,
    active,
    disabled,
    focusVisible
  } = useButtonContext();
  return /*#__PURE__*/React.createElement(StyledButtonText, _extends({
    ref: ref
  }, props, {
    states: {
      hover: hover,
      focus: focus,
      active: active,
      disabled: disabled,
      focusVisible: focusVisible
    },
    dataSet: {
      hover: hover,
      focus: focus,
      active: active,
      disabled: disabled,
      focusVisible: focusVisible
    }
  }), children);
});
//# sourceMappingURL=ButtonText.js.map