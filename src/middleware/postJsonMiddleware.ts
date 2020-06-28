import MiddlewareInputType from "./middlewareInputType"
import MiddlewareOutputType from "./middlewareOutputType"
import streamStringifier from "../lib/streamStringifier"

export async function postJsonMiddleware({
  apiGatewayProxyEvent,
  client,
  headers,
  httpIncomingMessage,
  method,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  if (
    client ||
    method !== "POST" ||
    !headers["content-type"].startsWith("application/json")
  ) {
    return
  }

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

export default postJsonMiddleware
