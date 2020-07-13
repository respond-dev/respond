import {
  RouterInputType,
  RouterOutputType,
} from "../types/routerTypes"
import homeController from "../../controllers/homeController"

export async function pageRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const { client, url } = input

  let output: (Element | string)[] | Element | string

  if (url.pathname === "/") {
    output = await homeController(input)
  }

  if (!client) {
    const { layoutView } = await import(
      "../../views/layoutView"
    )
    return {
      output: await layoutView({ ...input, output }),
    }
  }

  return { output }
}

export default pageRouter
