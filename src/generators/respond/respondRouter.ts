import remoteModelRoute from "../../lib/respond/remoteModelRoute"
import routeSelector from "../../lib/respond/routeSelector"
import { RouterInputType } from "../../types/respond/routerTypes"
import { RouterOutputType } from "../../types/respond/routerTypes"

export async function respondRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(
    input,
    remoteModelRoute("app/models")
  )

  return { output }
}

export default respondRouter