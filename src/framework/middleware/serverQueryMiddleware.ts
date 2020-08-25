import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import { assetRegex } from "../lib/assetRequester"
import querystring from "querystring"

export function serverQueryMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (
    !url.href.includes("?") ||
    url.pathname.match(assetRegex)
  ) {
    return
  }

  const [queryPath] = url.href.split("#")
  const [, query] = queryPath.split("?")

  return {
    query: querystring.parse(query),
  }
}

export default serverQueryMiddleware
