import jsCookie from "js-cookie"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export async function cookieClientMiddleware({
  client,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  if (!client) {
    return
  }

  const cookie = (await import(
    "../../node_modules/js-cookie/src/js.cookie"
  )) as typeof jsCookie

  return {
    cookies: cookie.get(),
  }
}

export default cookieClientMiddleware
