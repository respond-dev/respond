import assetRequester from "../../lib/respond/assetRequester"
import { MiddlewareInputType } from "../../types/respond/middlewareTypes"
import { SettlerOutputType } from "../../types/respond/settlerTypes"

export async function serverAssetRequesterMiddleware({
  httpIncomingMessage,
}: MiddlewareInputType): Promise<SettlerOutputType> {
  return await assetRequester(httpIncomingMessage.url)
}

export default serverAssetRequesterMiddleware
