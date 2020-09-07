import { MiddlewareInputType } from "../../types/respond/middlewareTypes"
import { MiddlewareOutputType } from "../../types/respond/middlewareTypes"
import { busboyBuilder } from "../../lib/respond/busboyBuilder"

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
