import jsCookie from "js-cookie"
import { MiddlewareOutputType } from "pipelines/respond/types/middlewareTypes"

export async function clientCookieMiddleware(): Promise<
  MiddlewareOutputType
> {
  const cookie = window.Cookies as typeof jsCookie

  return { cookies: cookie.get() }
}

export default clientCookieMiddleware
