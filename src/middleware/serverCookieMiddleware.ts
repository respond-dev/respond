import cookie from "cookie"
import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../types/middlewareTypes"

export function serverCookieMiddleware({
  client,
  headers,
}: MiddlewareInputType): MiddlewareOutputType {
  if (client) {
    return
  }

  return {
    cookies: headers.cookie
      ? cookie.parse(headers.cookie)
      : {},
  }
}

export default serverCookieMiddleware
