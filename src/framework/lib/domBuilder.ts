import {
  createAttributeFilter,
  findWhere,
  splice,
  toLower,
} from "./domHelpers"

export function isElement(node: DomNode): boolean {
  return node.nodeType === 1
}

export class DomNode {
  childNodes: DomNode[] = []
  parentNode: DomNode

  constructor(
    public nodeType: number,
    public nodeName: string
  ) {}

  get nextSibling(): DomNode {
    const p = this.parentNode
    if (p) {
      return p.childNodes[
        findWhere(p.childNodes, this, true, true) + 1
      ]
    }
  }

  get previousSibling(): DomNode {
    const p = this.parentNode
    if (p) {
      return p.childNodes[
        findWhere(p.childNodes, this, true, true) - 1
      ]
    }
  }

  get firstChild(): DomNode {
    return this.childNodes[0]
  }

  get lastChild(): DomNode {
    return this.childNodes[this.childNodes.length - 1]
  }

  appendChild(child: DomNode): DomNode {
    this.insertBefore(child)
    return child
  }

  insertBefore(child: DomNode, ref?: DomNode): DomNode {
    child.remove()
    child.parentNode = this
    if (ref) {
      splice(this.childNodes, ref, child, true)
    } else {
      this.childNodes.push(child)
    }
    return child
  }

  replaceChild(child: DomNode, ref: DomNode): DomNode {
    if (ref.parentNode === this) {
      this.insertBefore(child, ref)
      ref.remove()
      return ref
    }
  }

  removeChild(child: DomNode): DomNode {
    splice(this.childNodes, child, false, true)
    return child
  }

  remove(): void {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
  }
}

export class DomText extends DomNode {
  nodeValue: string

  constructor(text: string) {
    super(3, "#text") // TEXT_NODE
    this.nodeValue = text
  }

  set textContent(text: string) {
    this.nodeValue = text
  }

  get textContent(): string {
    return this.nodeValue
  }
}

export class DomElement extends DomNode {
  __handlers: Record<string, ((e: DomEvent) => any)[]> = {}
  attributes: Record<string, any>[] = []
  namespace: string
  style: Record<string, any> = {}

  constructor(nodeType: number, nodeName: string) {
    super(nodeType || 1, nodeName) // ELEMENT_NODE
  }

  get className(): string {
    return this.getAttribute("class")
  }

  set className(val: string) {
    this.setAttribute("class", val)
  }

  get cssText(): string {
    return this.getAttribute("style")
  }

  set cssText(val: string) {
    this.setAttribute("style", val)
  }

  get children(): DomNode[] {
    return this.childNodes.filter(isElement)
  }

  setAttribute(key: string, value: string): void {
    this.setAttributeNS(null, key, value)
  }

  getAttribute(key: string): string {
    return this.getAttributeNS(null, key)
  }

  removeAttribute(key: string): void {
    this.removeAttributeNS(null, key)
  }

  setAttributeNS(
    ns: string,
    name: string,
    value: string
  ): void {
    let attr = findWhere(
      this.attributes,
      createAttributeFilter(ns, name),
      false,
      false
    )
    if (!attr) {
      this.attributes.push((attr = { ns, name }))
    }
    attr.value = String(value)
  }

  getAttributeNS(ns: string, name: string): string {
    const attr = findWhere(
      this.attributes,
      createAttributeFilter(ns, name),
      false,
      false
    )
    return attr && attr.value
  }

  removeAttributeNS(ns: string, name: string): void {
    splice(
      this.attributes,
      createAttributeFilter(ns, name),
      false,
      false
    )
  }

  addEventListener(
    type: string,
    handler: (e: DomEvent) => any
  ): void {
    ;(
      this.__handlers[toLower(type)] ||
      (this.__handlers[toLower(type)] = [])
    ).push(handler)
  }

  removeEventListener(
    type: string,
    handler: (e: DomEvent) => any
  ): void {
    splice(
      this.__handlers[toLower(type)],
      handler,
      false,
      true
    )
  }

  dispatchEvent(event: DomEvent): boolean {
    const c = event.cancelable

    let t: DomElement = (event.target = this)
    let l
    let i

    do {
      event.currentTarget = t

      l = t.__handlers && t.__handlers[toLower(event.type)]

      if (l) {
        for (i = l.length; i--; ) {
          if (
            (l[i].call(t, event) === false || event._end) &&
            c
          ) {
            event.defaultPrevented = true
          }
        }
      }
    } while (
      event.bubbles &&
      !(c && event._stop) &&
      (t = t.parentNode as DomElement)
    )
    return l != null
  }
}

export class DomEventOptions {
  bubbles: boolean
  cancelable: boolean
  defaultPrevented: boolean
}

export class DomEvent extends DomEventOptions {
  _end: boolean
  _stop: boolean

  target: DomElement
  currentTarget: DomElement

  constructor(
    public type: string,
    public opts: DomEventOptions
  ) {
    super()
    this.bubbles = !!(opts && opts.bubbles)
    this.cancelable = !!(opts && opts.cancelable)
  }

  stopPropagation(): void {
    this._stop = true
  }

  stopImmediatePropagation(): void {
    this._end = this._stop = true
  }

  preventDefault(): void {
    this.defaultPrevented = true
  }
}

export class DomDocument extends DomElement {
  defaultView: {
    document: DomDocument
    Document: typeof DomDocument
    Node: typeof DomNode
    Text: typeof DomText
    Element: typeof DomElement
    SVGElement: typeof DomElement
    Event: typeof DomEvent
  }

  documentElement: DomElement
  body: DomElement
  head: DomElement

  constructor() {
    super(9, "#document") // DOCUMENT_NODE
  }

  createElement(type: string): DomElement {
    return new DomElement(null, String(type).toUpperCase())
  }

  createElementNS(ns: string, type: string): DomElement {
    const element = this.createElement(type)
    element.namespace = ns
    return element
  }

  createTextNode(text: string): DomText {
    return new DomText(text)
  }
}

export function domBuilder(): DomDocument {
  const document = new DomDocument()

  Object.assign(
    document,
    (document.defaultView = {
      document,
      Document: DomDocument,
      Node: DomNode,
      Text: DomText,
      Element: DomElement,
      SVGElement: DomElement,
      Event: DomEvent,
    })
  )

  document.appendChild(
    (document.documentElement = document.createElement(
      "html"
    ))
  )

  document.documentElement.appendChild(
    (document.head = document.createElement("head"))
  )

  document.documentElement.appendChild(
    (document.body = document.createElement("body"))
  )

  return document
}

export default domBuilder
