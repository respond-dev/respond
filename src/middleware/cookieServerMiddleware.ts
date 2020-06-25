import cookie from "cookie"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class CookieServerMiddleware {
  accept({ client }: MiddlewareInputType): boolean {
    return !client
  }

  respond({
    headers,
  }: MiddlewareInputType): MiddlewareOutputType {
    return {
      cookies: headers.cookie
        ? cookie.parse(headers.cookie)
        : {},
    }
  }
}

export const cookieServerMiddleware = new CookieServerMiddleware()
export default cookieServerMiddleware
