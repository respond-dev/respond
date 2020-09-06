import { RouterInputType } from "../../lib/respond/types/routerTypes"
import { RouterOutputType } from "../../lib/respond/types/routerTypes"
import routeSelector from "../../lib/respond/lib/routeSelector"

export async function defaultRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [
    [/\/remote\/[^.]+.json/, "remoteCaller"],
  ])

  return { output }
}

export default defaultRouter
