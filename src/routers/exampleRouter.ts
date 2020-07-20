import routeSelector from "../lib/routeSelector"
import {
  RouterInputType,
  RouterOutputType,
} from "../framework/types/routerTypes"

export async function exampleRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [
    ["/", "example", "layout"],
  ])

  return { output }
}

export default exampleRouter
