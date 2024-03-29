import URL from "url"
import { InitializerInputType } from "types/respond/initializerTypes"
import { InitializerOutputType } from "types/respond/initializerTypes"
import { headerCleaner } from "libs/respond/headerCleaner"

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
