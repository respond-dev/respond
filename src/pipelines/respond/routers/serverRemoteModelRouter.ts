import routeSelector from "libs/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export const remoteModelRouteRegex = /\/remote\/([a-zA-Z\/]*)(server[a-zA-Z]+).json/

export async function serverRemoteModelRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector("libs/respond", input, [
    {
      matcher: remoteModelRouteRegex,
      controller: "respond/remoteModel",
    },
  ])
}

export default serverRemoteModelRouter
