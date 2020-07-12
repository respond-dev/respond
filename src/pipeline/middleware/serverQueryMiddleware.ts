import querystring from "querystring"
import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../types/middlewareTypes"

export function serverQueryMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (!url.href.includes("?")) {
    return
  }

  const [queryPath] = url.href.split("#")
  const [, query] = queryPath.split("?")

  return {
    query: querystring.parse(query),
  }
}

export default serverQueryMiddleware