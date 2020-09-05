import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import assetMatcher from "../lib/assetMatcher"
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
