import URL from "url"
import { InitializerInputType } from "../types/initializerTypes"
import { InitializerOutputType } from "../types/initializerTypes"
import { headerCleaner } from "../lib/headerCleaner"

export async function serverLambdaInitializer({
  apiGatewayProxyEvent: req,
}: InitializerInputType): Promise<InitializerOutputType> {
  if (!req) {
    return
  }

  const headers = headerCleaner(req.headers)
  const url = URL.parse(
    `https://${headers.host}${req.path}`
  )

  return {
    headers,
    method: req.httpMethod,
    url,
  }
}

export default serverLambdaInitializer
