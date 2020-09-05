export function elementReplacer(element: Element): void {
  const isBrowser = typeof history !== "undefined"

  if (isBrowser && element.id) {
    const el = document.getElementById(element.id)

    if (el?.parentNode) {
      el.parentNode.replaceChild(element, el)
    }
  }
}

export default elementReplacer
