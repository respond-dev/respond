import remoteModelRoute from "../../lib/respond/lib/remoteModelRoute"
import routeSelector from "../../lib/respond/lib/routeSelector"
import { RouterInputType } from "../../lib/respond/types/routerTypes"
import { RouterOutputType } from "../../lib/respond/types/routerTypes"

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
