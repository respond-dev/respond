import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"
import { busboyBuilder } from "../lib/busboyBuilder"

export class PostFormMiddleware {
  accept({
    headers,
    method,
  }: MiddlewareInputType): boolean {
    return (
      method === "POST" &&
      !headers["content-type"].startsWith(
        "application/json"
      )
    )
  }

  async respond({
    apiGatewayProxyEvent,
    headers,
    httpIncomingMessage,
  }: MiddlewareInputType): Promise<MiddlewareOutputType> {
    if (!apiGatewayProxyEvent && !httpIncomingMessage) {
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
}

export const postFormMiddleware = new PostFormMiddleware()
export default postFormMiddleware
