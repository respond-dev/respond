import InitializerOutputType from "./initializerOutputType"

export const PATH_REGEX = /[a-zA-Z](\/{1}[a-zA-Z]?.*)/

export async function clientInitializer(): Promise<
  InitializerOutputType
> {
  const {
    hash,
    host,
    hostname,
    href,
    pathname,
    port,
    protocol,
    search,
  } = window.location

  const pathMatch = href.match(PATH_REGEX)
  const path = pathMatch ? pathMatch[1] || "/" : "/"

  return {
    headers: {},
    method: "GET",
    url: {
      auth: null,
      hash,
      host,
      hostname,
      href,
      path,
      pathname,
      protocol,
      search,
      slashes: null,
      port,
      query: decodeURIComponent(search),
    },
  }
}

export default clientInitializer
