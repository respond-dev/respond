export function elementReplacer(elements: Element[]): void {
  const isBrowser = typeof history !== "undefined"

  for (const element of elements) {
    if (isBrowser && element.id) {
      const el = document.getElementById(element.id)

      if (el?.parentNode) {
        el.parentNode.replaceChild(element, el)
      }
    }
  }
}

export default elementReplacer
