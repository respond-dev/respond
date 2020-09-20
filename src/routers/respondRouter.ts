import { remoteModelRoute } from "../controllers/respond/remoteModelController"
import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export const layoutView = "views/layout"

export async function respondRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector(input, [remoteModelRoute])
}

export default respondRouter
