import React from 'react';
export declare const ToastProvider: ({ children }: {
    children: any;
}) => React.JSX.Element;
export declare const getToastHook: (StyledAnimationWrapper: any, StyledAnimatePresence: any) => () => {
    show: (props: import("./types").InterfaceToastProps) => string;
    close: (id: string) => void;
    closeAll: () => void;
    isActive: (id: string) => boolean;
};
//# sourceMappingURL=Toast.d.ts.map