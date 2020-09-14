import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { MiddlewareOutputType } from "pipelines/respond/types/middlewareTypes"
import extMatcher from "pipelines/respond/lib/extMatcher"
import querystring from "querystring"

export function serverQueryMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (extMatcher(url.href) || !url.href.includes("?")) {
    return
  }

  const [queryPath] = url.href.split("#")
  const [, query] = queryPath.split("?")

  return {
    query: querystring.parse(query),
  }
}

export default serverQueryMiddleware
