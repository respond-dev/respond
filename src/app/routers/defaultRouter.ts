import routeSelector from "../../lib/routeSelector"
import {
  RouterInputType,
  RouterOutputType,
} from "../../framework/types/routerTypes"

export async function defaultRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [
    // injection placeholder (don't delete)
  ])

  return { output }
}

export default defaultRouter
