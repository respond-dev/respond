export async function styleInjector(
  path: string
): Promise<void> {
  const doc = this as Document
  const link = doc.createElement("link")

  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")

  const promise = new Promise<void>(
    (resolve) => (link.onload = () => resolve())
  )

  link.setAttribute("href", "/dist/css/" + path + ".css")

  doc.head.appendChild(link)

  if (typeof history !== "undefined") {
    return promise
  }
}

export default styleInjector
