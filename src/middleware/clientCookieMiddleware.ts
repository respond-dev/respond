import jsCookie from "js-cookie"
import MiddlewareOutputType from "./middlewareOutputType"

export async function clientCookieMiddleware(): Promise<
  MiddlewareOutputType
> {
  const cookie = (await import(
    "../../node_modules/js-cookie/src/js.cookie"
  )) as typeof jsCookie

  return {
    cookies: cookie.get(),
  }
}

export default clientCookieMiddleware
