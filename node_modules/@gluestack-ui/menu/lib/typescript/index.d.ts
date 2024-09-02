/// <reference types="react" />
import type { IMenuComponentType } from './types';
declare const createMenu: <Root, Item, Label, Backdrop, Separator>({ Root: StyledMenu, Item: StyledMenuItem, Label: StyledItemLabel, Backdrop: StyledBackdrop, AnimatePresence, Separator: StyledSeparator, }: {
    Root: import("react").ComponentType<Root>;
    Item: import("react").ComponentType<Item>;
    Label: import("react").ComponentType<Label>;
    Backdrop: import("react").ComponentType<Backdrop>;
    AnimatePresence?: import("react").ComponentType<any> | undefined;
    Separator?: import("react").ComponentType<Separator> | undefined;
}) => IMenuComponentType<Root, Item, Label, Separator>;
export { createMenu };
//# sourceMappingURL=index.d.ts.map