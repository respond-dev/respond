import querystring from "querystring"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class QuerystringMiddleware {
  accept({ url }: MiddlewareInputType): boolean {
    return url.href.includes("?")
  }

  respond({
    url,
  }: MiddlewareInputType): MiddlewareOutputType {
    const [queryPath] = url.href.split("#")
    const [, query] = queryPath.split("?")

    return {
      query: querystring.parse(query),
    }
  }
}

export const querystringMiddleware = new QuerystringMiddleware()
export default querystringMiddleware
