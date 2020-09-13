import URL from "url"
import { InitializerInputType } from "pipelines/respond/types/initializerTypes"
import { InitializerOutputType } from "pipelines/respond/types/initializerTypes"
import { headerCleaner } from "pipelines/respond/lib/headerCleaner"

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