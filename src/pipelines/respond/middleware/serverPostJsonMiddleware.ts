import { MiddlewareInputType } from "types/respond/middlewareTypes"
import { MiddlewareOutputType } from "types/respond/middlewareTypes"
import streamStringifier from "lib/respond/streamStringifier"

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
