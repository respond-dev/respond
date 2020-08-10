import routeSelector from "../../framework/lib/routeSelector"
import {
  RouterInputType,
  RouterOutputType,
} from "../../framework/types/routerTypes"

export async function defaultRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [
    [/\/remote\/[^.]+.json/, "remoteCaller"],
  ])

  return { output }
}

export default defaultRouter
