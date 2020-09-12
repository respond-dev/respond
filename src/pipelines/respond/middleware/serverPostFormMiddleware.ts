import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { MiddlewareOutputType } from "pipelines/respond/types/middlewareTypes"
import { busboyBuilder } from "pipelines/respond/lib/busboyBuilder"

export async function serverPostFormMiddleware({
  apiGatewayProxyEvent,
  headers,
  httpIncomingMessage,
  method,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  if (
    method !== "POST" ||
    (!apiGatewayProxyEvent && !httpIncomingMessage) ||
    headers["content-type"].startsWith("application/json")
  ) {
    return
  }

  const [busboy, finished] = busboyBuilder(headers)

  if (httpIncomingMessage) {
    httpIncomingMessage.pipe(busboy)
  }

  if (apiGatewayProxyEvent) {
    busboy.write(
      apiGatewayProxyEvent.body,
      apiGatewayProxyEvent.isBase64Encoded
        ? "base64"
        : "binary"
    )
    busboy.end()
  }

  return { form: await finished }
}

export default serverPostFormMiddleware
