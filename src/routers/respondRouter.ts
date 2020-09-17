import { remoteModelRoute } from "../controllers/respond/remoteModelController"
import routeSelector from "pipelines/respond/lib/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export const layoutView = "views/layout"

export async function respondRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(
    input,
    remoteModelRoute
  )

  if (output) {
    return { output }
  }
}

export default router
