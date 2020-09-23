import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function appRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector("app", input, [
    {
      controller: "home",
      layoutView: "layout",
      matcher: "/",
    },
  ])
}

export default appRouter
