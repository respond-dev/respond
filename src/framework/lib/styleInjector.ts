export async function stylesheet(
  path: string
): Promise<void> {
  if (typeof history === "undefined") {
    return
  }

  const link = document.createElement("link")

  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")

  const promise = new Promise<void>(
    (resolve) => (link.onload = () => resolve())
  )

  link.setAttribute("href", "/dist-css/" + path + ".css")

  document.head.appendChild(link)

  return promise
}

export default stylesheet
