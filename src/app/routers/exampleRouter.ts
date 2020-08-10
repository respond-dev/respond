import routeSelector from "../../framework/lib/routeSelector"
import {
  RouterInputType,
  RouterOutputType,
} from "../../framework/types/routerTypes"

export async function exampleRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [])

  return { output }
}

export default exampleRouter
