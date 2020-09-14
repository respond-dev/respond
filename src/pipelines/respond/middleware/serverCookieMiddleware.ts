import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { MiddlewareOutputType } from "pipelines/respond/types/middlewareTypes"
import extMatcher from "pipelines/respond/lib/extMatcher"
import cookie from "cookie"

export function serverCookieMiddleware({
  headers,
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (extMatcher(url.pathname)) {
    return
  }

  return {
    cookies: headers.cookie
      ? cookie.parse(headers.cookie)
      : {},
  }
}

export default serverCookieMiddleware
