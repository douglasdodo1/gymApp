export function composeEventHandlers(...args) {
  return function handleEvent(event) {
    try {
      for (let i = 0; i < args.length; i++) {
        var _args$i;
        (_args$i = args[i]) === null || _args$i === void 0 || _args$i.call(args, event);
      }
    } catch (e) {
      //
    }
  };
}
//# sourceMappingURL=composeEventHandlers.js.map