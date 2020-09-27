import routeSelector from "libs/respond/routeSelector"
import { RouterInputType } from "types/respond/routerTypes"
import { RouterOutputType } from "types/respond/routerTypes"

export async function testRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  return await routeSelector("libs/respond", input, [
    { matcher: "/", controller: "test" },
  ])
}

export default testRouter
