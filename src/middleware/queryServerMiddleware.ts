import querystring from "querystring"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class QueryServerMiddleware {
  accept({ client, url }: MiddlewareInputType): boolean {
    return !client && url.href.includes("?")
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

export const queryServerMiddleware = new QueryServerMiddleware()
export default queryServerMiddleware
