import { MiddlewareInputType } from "types/respond/middlewareTypes"
import { MiddlewareOutputType } from "types/respond/middlewareTypes"
import extMatcher from "lib/respond/extMatcher"
import querystring from "querystring"

export function serverQueryMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (extMatcher(url?.href) || !url?.href?.includes("?")) {
    return { query: {} }
  }

  const [queryPath] = url.href.split("#")
  const [, query] = queryPath.split("?")

  return {
    query: querystring.parse(query),
  }
}

export default serverQueryMiddleware
