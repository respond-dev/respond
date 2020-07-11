import cookie from "cookie"
import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../types/middlewareTypes"

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
