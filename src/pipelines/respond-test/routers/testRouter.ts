import routeSelector from "lib/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function respondRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector(input, [
    { matcher: "/", controller: "respond/test" },
  ])
}

export default respondRouter
