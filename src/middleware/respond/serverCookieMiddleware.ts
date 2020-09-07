import { MiddlewareInputType } from "../../types/respond/middlewareTypes"
import { MiddlewareOutputType } from "../../types/respond/middlewareTypes"
import assetMatcher from "../../lib/respond/assetMatcher"
import cookie from "cookie"

export function serverCookieMiddleware({
  headers,
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (assetMatcher(url.pathname)) {
    return
  }

  return {
    cookies: headers.cookie
      ? cookie.parse(headers.cookie)
      : {},
  }
}

export default serverCookieMiddleware
