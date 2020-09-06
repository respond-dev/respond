import { RouteType } from "../lib/routeSelector"

export const remoteModelRouteRegex = /\/remote\/([^\.]+).json/

export function remoteModelRoute(
  modelsPath: string
): RouteType {
  return {
    matcher: remoteModelRouteRegex,
    controller: "lib/respond/controllers/remoteModel",
    extraInput: { modelsPath },
  }
}

export default remoteModelRoute
