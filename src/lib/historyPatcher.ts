export function historyPatcher(
  fn: (state: any, ...args: any[]) => any
): any {
  window.history.pushState = (
    state: any,
    ...args: any[]
  ): void => {
    fn.call(window.history, state, ...args)

    if (typeof window.onpopstate == "function") {
      window.onpopstate({
        state: state,
      } as PopStateEvent)
    }
  }
}

export default historyPatcher
