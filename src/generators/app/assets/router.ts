import routeSelector from "libs/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function router(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector("apps/web", input, [
    // { matcher: "/", controller: "controller", layout: "layoutView" },
  ])
}

export default router
