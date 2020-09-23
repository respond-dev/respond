import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function router(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector("app", input, [])
}

export default router
