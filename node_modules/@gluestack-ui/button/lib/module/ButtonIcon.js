function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { useButtonContext } from './Context';
export const ButtonIcon = StyledButtonIcon => /*#__PURE__*/forwardRef((props, ref) => {
  const {
    hover,
    focus,
    active,
    disabled,
    focusVisible
  } = useButtonContext();
  return /*#__PURE__*/React.createElement(StyledButtonIcon, _extends({
    states: {
      hover: hover,
      focus: focus,
      active: active,
      disabled: disabled,
      focusVisible: focusVisible
    }
  }, props, {
    ref: ref
  }));
});
//# sourceMappingURL=ButtonIcon.js.map