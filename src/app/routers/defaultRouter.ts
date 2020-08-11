import { RouterInputType } from "../../framework/types/routerTypes"
import { RouterOutputType } from "../../framework/types/routerTypes"
import routeSelector from "../../framework/lib/routeSelector"

export async function defaultRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [
    [/\/remote\/[^.]+.json/, "remoteCaller"],
  ])

  return { output }
}

export default defaultRouter
