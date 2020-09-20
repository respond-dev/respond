import URL from "url"
import { InitializerInputType } from "types/respond/initializerTypes"
import { InitializerOutputType } from "types/respond/initializerTypes"

export async function serverHttpInitializer({
  testRequest: req,
}: InitializerInputType): Promise<InitializerOutputType> {
  if (!req) {
    return
  }

  const { headers, httpMethod, path } = req
  const url = URL.parse(`http://${headers.host}${path}`)

  return {
    headers,
    method: httpMethod,
    url,
  }
}

export default serverHttpInitializer
