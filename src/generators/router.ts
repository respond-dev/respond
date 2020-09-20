import { remoteModelRoute } from "controllers/respond/remoteModelController"
import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function router(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector(input, [remoteModelRoute])
}

export default router