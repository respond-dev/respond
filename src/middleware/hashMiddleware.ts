import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../types/middlewareTypes"

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
