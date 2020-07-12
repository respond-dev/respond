import jsCookie from "js-cookie"
import { MiddlewareOutputType } from "../types/middlewareTypes"

export async function clientCookieMiddleware(): Promise<
  MiddlewareOutputType
> {
  await import(
    "../../../node_modules/js-cookie/src/js.cookie"
  )

  const cookie = window.Cookies as typeof jsCookie

  return {
    cookies: cookie.get(),
  }
}

export default clientCookieMiddleware
