import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"

export class QueryClientMiddleware {
  accept({ client, url }: MiddlewareInputType): boolean {
    return client && url.href.includes("?")
  }

  respond({
    url,
  }: MiddlewareInputType): MiddlewareOutputType {
    const [queryPath] = url.href.split("#")
    const [, query] = queryPath.split("?")

    return {
      query: this.parse(query),
    }
  }

  parse(string: string): Record<string, string> {
    const query = {}
    const pairs = (string[0] === "?"
      ? string.substr(1)
      : string
    ).split("&")
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=")
      const key = decodeURIComponent(pair[0])
      const val = decodeURIComponent(pair[1] || "")

      if (query[key]) {
        if (Array.isArray(query[key])) {
          query[key].push(val)
        } else {
          query[key] = [query[key], val]
        }
      } else {
        query[key] = val
      }
    }
    return query
  }
}

export const queryClientMiddleware = new QueryClientMiddleware()
export default queryClientMiddleware
