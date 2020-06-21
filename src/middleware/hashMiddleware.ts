import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class HashMiddleware {
  accept({ url }: MiddlewareInputType): boolean {
    return url.href.includes("#")
  }

  respond({
    url,
  }: MiddlewareInputType): MiddlewareOutputType {
    const [, hash] = url.href.split("#")
    return { hash }
  }
}

export const hashMiddleware = new HashMiddleware()
export default hashMiddleware
