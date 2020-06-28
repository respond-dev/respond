import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"
import { busboyBuilder } from "../lib/busboyBuilder"

export async function postFormMiddleware({
  apiGatewayProxyEvent,
  client,
  headers,
  httpIncomingMessage,
  method,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  if (
    client ||
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

export default postFormMiddleware
