import { MiddlewareInputType } from "../../types/respond/middlewareTypes"
import { MiddlewareOutputType } from "../../types/respond/middlewareTypes"
import assetMatcher from "../../lib/respond/assetMatcher"
import querystring from "querystring"

export function serverQueryMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (
    !url.href.includes("?") ||
    assetMatcher(url.pathname)
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
