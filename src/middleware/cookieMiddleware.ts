import cookie from "cookie"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class CookieMiddleware {
  accept(): boolean {
    return true
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

export const cookieMiddleware = new CookieMiddleware()
export default cookieMiddleware
