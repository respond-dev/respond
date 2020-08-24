import assetRequester from "../lib/assetRequester"
import { MiddlewareInputType } from "../types/middlewareTypes"
import { SettlerOutputType } from "../types/settlerTypes"

export async function serverAssetRequesterMiddleware({
  httpIncomingMessage,
}: MiddlewareInputType): Promise<SettlerOutputType> {
  return await assetRequester(httpIncomingMessage.url)
}

export default serverAssetRequesterMiddleware
