import { RouterInputType } from "../../framework/types/routerTypes"
import { RouterOutputType } from "../../framework/types/routerTypes"
import routeSelector from "../../framework/lib/routeSelector"

export async function exampleRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [])

  return { output }
}

export default exampleRouter
