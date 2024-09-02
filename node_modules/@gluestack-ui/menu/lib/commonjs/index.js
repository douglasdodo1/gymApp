"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMenu = void 0;
var _Menu = require("./Menu");
var _MenuItemStately = require("./MenuItemStately");
var _MenuItemLabel = require("./MenuItemLabel");
var _Separator = require("./Separator");
// This is the main index file that will be included in build

const createMenu = ({
  Root: StyledMenu,
  Item: StyledMenuItem,
  Label: StyledItemLabel,
  Backdrop: StyledBackdrop,
  AnimatePresence,
  Separator: StyledSeparator
}) => {
  const MenuTemp = (0, _Menu.Menu)({
    StyledMenu,
    StyledMenuItem,
    StyledBackdrop,
    AnimatePresence,
    StyledSeparator
  });
  MenuTemp.Item = _MenuItemStately.MenuItem;
  MenuTemp.ItemLabel = (0, _MenuItemLabel.MenuItemLabel)(StyledItemLabel);
  MenuTemp.Separator = _Separator.Separator;
  const Menu = MenuTemp;
  return Menu;
};
exports.createMenu = createMenu;
//# sourceMappingURL=index.js.map