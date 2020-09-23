import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function appRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector("app", input, [
    { matcher: "/", controller: "home", layout: "layout" },
  ])
}

export default appRouter
