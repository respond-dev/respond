import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { MiddlewareOutputType } from "pipelines/respond/types/middlewareTypes"
import streamStringifier from "pipelines/respond/lib/streamStringifier"

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