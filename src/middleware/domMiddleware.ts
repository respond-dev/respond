import domBuilder from "../lib/domBuilder"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export function domMiddleware({
  client,
}: MiddlewareInputType): MiddlewareOutputType {
  if (client) {
    return
  }

  return { dom: domBuilder() }
}

export default domMiddleware
