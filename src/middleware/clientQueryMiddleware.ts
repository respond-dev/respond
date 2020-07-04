import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../types/middlewareTypes"

export function clientQueryMiddleware({
  url,
}: MiddlewareInputType): MiddlewareOutputType {
  if (!url.href.includes("?")) {
    return
  }

  const [queryPath] = url.href.split("#")
  const [, query] = queryPath.split("?")

  return {
    query: queryClientParse(query),
  }
}

export function queryClientParse(
  string: string
): Record<string, string> {
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

export default queryClientMiddleware
