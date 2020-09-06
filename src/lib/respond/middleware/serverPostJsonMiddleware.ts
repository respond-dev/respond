import { MiddlewareInputType } from "../types/middlewareTypes"
import { MiddlewareOutputType } from "../types/middlewareTypes"
import streamStringifier from "../lib/streamStringifier"

export async function serverPostJsonMiddleware({
  apiGatewayProxyEvent,
  headers,
  httpIncomingMessage,
  method,
}: MiddlewareInputType): Promise<MiddlewareOutputType> {
  if (
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

export default serverPostJsonMiddleware