import historyPatcher from "../lib/historyPatcher"

if (typeof history !== undefined) {
  historyPatcher(window.history.pushState)
}
