import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import cookie from "cookie"

export function serverCookieMiddleware({
  headers,
}: MiddlewareInputType): MiddlewareOutputType {
  return {
    cookies: headers.cookie
      ? cookie.parse(headers.cookie)
      : {},
  }
}

export default serverCookieMiddleware
