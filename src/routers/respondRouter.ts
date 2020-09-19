import { remoteModelRoute } from "../controllers/respond/remoteModelController"
import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/routerTypes"
import { RouterOutputType } from "types/routerTypes"

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

export default respondRouter
