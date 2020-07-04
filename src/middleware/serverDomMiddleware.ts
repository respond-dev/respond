import promiseAllDefault from "../lib/promiseAllDefault"

export async function serverDomMiddleware(): Promise<void> {
  if (global["document"]) {
    return
  }

  const { domBuilder } = await promiseAllDefault({
    domBuilder: import("../lib/domBuilder"),
  })

  const dom = domBuilder()
  global["document"] = dom as any
}

export default serverDomMiddleware
