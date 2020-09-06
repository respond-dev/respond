const ogPushState = window.history.pushState

export function historyPatcher(): any {
  if (typeof window.history === "undefined") {
    return
  }

  window.history.pushState = (
    state: any,
    ...args: any[]
  ): void => {
    ogPushState.call(window.history, state, ...args)

    if (typeof window.onpopstate === "function") {
      window.onpopstate({
        state: state,
      } as PopStateEvent)
    }
  }
}

export default historyPatcher
