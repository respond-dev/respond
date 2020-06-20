import querystring from "querystring"
import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class QuerystringMiddleware {
  accept({ querystring }: MiddlewareInputType): boolean {
    return !!querystring
  }

  respond(
    input: MiddlewareInputType
  ): MiddlewareOutputType {
    return {
      query: querystring.parse(input.querystring),
    }
  }
}

export const querystringMiddleware = new QuerystringMiddleware()
export default querystringMiddleware
