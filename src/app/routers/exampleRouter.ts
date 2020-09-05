import { RouterInputType } from "../../lib/respond/types/routerTypes"
import { RouterOutputType } from "../../lib/respond/types/routerTypes"
import routeSelector from "../../lib/respond/lib/routeSelector"

export async function exampleRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [])

  return { output }
}

export default exampleRouter
