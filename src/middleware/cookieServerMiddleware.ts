import cookie from "cookie"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export function cookieServerMiddleware({
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

export default cookieServerMiddleware
