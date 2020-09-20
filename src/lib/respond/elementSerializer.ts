import { ReadStream } from "fs"

export const selfClosingTags = [
  "AREA",
  "BASE",
  "BR",
  "COL",
  "EMBED",
  "HR",
  "IMG",
  "INPUT",
  "LINK",
  "META",
  "PARAM",
  "SOURCE",
  "TRACK",
  "WBR",
]

export function elementSerializer(
  el: Element | Element[] | string | ReadStream
): string {
  if (Array.isArray(el)) {
    return el.map(elementSerializer).join("")
  }

  if (
    el === undefined ||
    el instanceof ReadStream ||
    typeof el === "string"
  ) {
    return ""
  }

  if (el.nodeType === 3) {
    return el.nodeValue
  }

  const name = String(el.nodeName).toLowerCase()
  const hits: Record<string, boolean> = {}
  const selfClosing = selfClosingTags.includes(el.nodeName)

  let str = "<" + name
  let c: string

  for (let i = 0; i < el.attributes.length; i++) {
    hits[el.attributes[i].name] = true
    str +=
      " " +
      el.attributes[i].name +
      '="' +
      el.attributes[i].value +
      '"'
  }

  if (el.className && !hits.class) {
    str += ' class="' + el.className + '"'
  }

  if (el.id) {
    str += ' id="' + el.id + '"'
  }

  if (typeof el["style"] === "string") {
    str += ' style="' + el["style"] + '"'
  }

  if (el["style"]?.cssText) {
    str += ' style="' + el["style"].cssText + '"'
  }

  if (el["value"]) {
    str += ' value="' + el["value"] + '"'
  }

  if (selfClosing) {
    str += " />"
  } else {
    str += ">"
  }

  for (let i = 0; i < el.childNodes.length; i++) {
    c = elementSerializer(el.childNodes[i] as Element)
    if (c) {
      str += c
    }
  }

  if (selfClosing) {
    return str
  } else {
    return str + "</" + name + ">"
  }
}

export default elementSerializer
