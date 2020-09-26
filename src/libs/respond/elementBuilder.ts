export const browser = typeof history !== "undefined"

export const htmlProps = {
  className: true,
  id: true,
  innerHTML: true,
  nodeValue: true,
  tabIndex: true,
  textContent: true,
  value: true,
}

export const syntheticEvents = {}

export function elementBuilder(
  tagName: HTMLElement | string
): Element {
  const doc = this as Document
  const node =
    typeof tagName === "string"
      ? doc.createElement(tagName)
      : tagName

  for (let i = 1; i < arguments.length; ++i) {
    // eslint-disable-next-line prefer-rest-params
    const arg = arguments[i]
    if (!arg) {
      continue
    }
    if (!arg.constructor || arg.constructor === Object) {
      for (
        let j = 0, ks = Object.keys(arg);
        j < ks.length;
        ++j
      ) {
        const key = ks[j],
          val = arg[key]
        if (val === undefined) {
          continue
        }
        if (key === "style") {
          node.style.cssText = val
        } else if (
          typeof val !== "string" ||
          htmlProps[key]
        ) {
          node[key] = val
          //set synthetic events for onUpperCaseName
          if (
            browser &&
            key[0] === "o" &&
            key[1] === "n" &&
            key.charCodeAt(2) < 91 &&
            key.charCodeAt(2) > 64 &&
            !syntheticEvents[key]
          ) {
            doc.addEventListener(
              key.slice(2).toLowerCase(),
              function (e): any {
                let tgt: any = e.target
                do {
                  if (tgt[key]) {
                    return tgt[key](e)
                  }
                } while ((tgt = tgt.parentNode))
              }
            )
            syntheticEvents[key] = true
          }
        } else {
          node.setAttribute(key, val)
        }
      }
    } else {
      if (Array.isArray(arg)) {
        for (let k = 0; k < arg.length; ++k) {
          if (arg[k]) {
            node.appendChild(
              arg[k].nodeType
                ? arg[k]
                : doc.createTextNode(arg[k])
            )
          }
        }
      } else {
        node.appendChild(
          arg.nodeType ? arg : doc.createTextNode(arg)
        )
      }
    }
  }

  if (node.id && browser) {
    const el = document.getElementById(node.id)

    if (el?.parentNode) {
      el.parentNode.replaceChild(node, el)
    }
  }

  return node
}

export default elementBuilder
