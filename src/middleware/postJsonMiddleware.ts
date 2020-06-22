import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"
import streamStringifier from "../lib/streamStringifier"

export class PostJsonMiddleware {
  accept({
    client,
    headers,
    method,
  }: MiddlewareInputType): boolean {
    return (
      !client &&
      method === "POST" &&
      headers["content-type"].startsWith("application/json")
    )
  }

  async respond({
    apiGatewayProxyEvent,
    httpIncomingMessage,
  }: MiddlewareInputType): Promise<MiddlewareOutputType> {
    let json: any

    if (httpIncomingMessage) {
      json = JSON.parse(
        await streamStringifier(httpIncomingMessage)
      )
    }

    if (apiGatewayProxyEvent) {
      json = JSON.parse(apiGatewayProxyEvent.body)
    }

    return { json }
  }
}

export const postJsonMiddleware = new PostJsonMiddleware()
export default postJsonMiddleware
