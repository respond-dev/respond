import routeSelector from "../lib/routeSelector"
import {
  RouterInputType,
  RouterOutputType,
} from "../../framework/types/routerTypes"

export async function defaultRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const output = await routeSelector(input, [
    [/\/rpc\/[^\.]+.json/, "remoteCaller"],
    // inject new routes here
  ])

  return { output }
}

export default defaultRouter
