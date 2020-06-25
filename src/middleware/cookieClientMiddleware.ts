import jsCookie from "js-cookie"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class CookieClientMiddleware {
  accept({ client }: MiddlewareInputType): boolean {
    return !!client
  }

  async respond(): Promise<MiddlewareOutputType> {
    const cookie = (await import(
      "../../node_modules/js-cookie/src/js.cookie"
    )) as typeof jsCookie

    return {
      cookies: cookie.get(),
    }
  }
}

export const cookieClientMiddleware = new CookieClientMiddleware()
export default cookieClientMiddleware
