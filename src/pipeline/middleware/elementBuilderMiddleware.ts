import promiseAllDefault from "../../lib/promiseAllDefault"
import { MiddlewareInputType } from "../types/middlewareTypes"

export async function elementMiddleware({
  client,
}: MiddlewareInputType): Promise<void> {
  const { elementBuilder } = await promiseAllDefault({
    elementBuilder: import("../../lib/elementBuilder"),
  })

  if (client) {
    window["elementBuilder"] = elementBuilder
  } else {
    global["window"] = global["window"] || ({} as any)
    global["window"]["elementBuilder"] = elementBuilder
  }
}

export default elementMiddleware
