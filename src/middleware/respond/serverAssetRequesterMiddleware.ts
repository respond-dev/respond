import assetRequester from "../../lib/respond/assetRequester"
import { MiddlewareInputType } from "../../types/respond/middlewareTypes"
import { SettlerOutputType } from "../../types/respond/settlerTypes"

export async function serverAssetRequesterMiddleware({
  apiGatewayProxyEvent,
  httpIncomingMessage,
}: MiddlewareInputType): Promise<SettlerOutputType> {
  if (httpIncomingMessage) {
    return await assetRequester(httpIncomingMessage.url)
  } else if (apiGatewayProxyEvent) {
    return await assetRequester(
      apiGatewayProxyEvent.path,
      true
    )
  }
}

export default serverAssetRequesterMiddleware
