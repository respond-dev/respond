import URL from "url"
import { headerCleaner } from "../lib/headerCleaner"
import InitializerInputType from "./initializerInputType"
import InitializerOutputType from "./initializerOutputType"

export async function serverHttpInitializer({
  httpIncomingMessage: req,
}: InitializerInputType): Promise<InitializerOutputType> {
  if (!req) {
    return
  }

  const headers = headerCleaner(req.headers)
  const https = !!req.socket["encrypted"]
  const url = URL.parse(
    `http${https ? "s" : ""}://${headers.host}${req.url}`
  )

  return {
    headers,
    method: req.method,
    url,
  }
}

export default serverHttpInitializer
