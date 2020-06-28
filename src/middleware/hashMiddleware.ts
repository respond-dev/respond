import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export function hashMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (!url.href.includes("#")) {
    return
  }

  const [, hash] = url.href.split("#")
  return { hash }
}

export default hashMiddleware
