import MiddlewareInputType from "./middlewareInputType"
import promiseAllDefault from "../lib/promiseAllDefault"

export async function domServerMiddleware({
  client,
}: MiddlewareInputType): Promise<void> {
  if (client || global["document"]) {
    return
  }

  const { domBuilder } = await promiseAllDefault({
    domBuilder: import("../lib/domBuilder"),
  })

  const dom = domBuilder()
  global["document"] = dom as any
}

export default domServerMiddleware
