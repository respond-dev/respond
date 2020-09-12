import assetRequester from "pipelines/respond/lib/assetRequester"
import { MiddlewareInputType } from "pipelines/respond/types/middlewareTypes"
import { SettlerOutputType } from "pipelines/respond/types/settlerTypes"

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
