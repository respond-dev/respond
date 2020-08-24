import { ControllerInputType } from "../../app/types/controllerTypes"

export async function styleInjector(
  input: ControllerInputType,
  path: string
): Promise<void> {
  const { doc } = input
  const link = doc.createElement("link")

  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")

  const promise = new Promise<void>(
    (resolve) => (link.onload = () => resolve())
  )

  link.setAttribute("href", "/dist-css/" + path + ".css")

  doc.head.appendChild(link)

  if (typeof history !== "undefined") {
    return promise
  }
}

export default styleInjector
