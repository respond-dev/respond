import URL from "url"
import { InitializerInputType } from "pipelines/respond/types/initializerTypes"
import { InitializerOutputType } from "pipelines/respond/types/initializerTypes"
import { headerCleaner } from "pipelines/respond/lib/headerCleaner"

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
