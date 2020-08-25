import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import { assetRegex } from "../lib/assetRequester"
import cookie from "cookie"

export function serverCookieMiddleware({
  headers,
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (url.pathname.match(assetRegex)) {
    return
  }

  return {
    cookies: headers.cookie
      ? cookie.parse(headers.cookie)
      : {},
  }
}

export default serverCookieMiddleware
