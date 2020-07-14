import {
  RouterInputType,
  RouterOutputType,
} from "../pipeline/types/routerTypes"
import homeController from "../controllers/homeController"

export async function pageWithLayoutRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const { client, url } = input

  let output: (Element | string)[] | Element | string

  if (url.pathname === "/") {
    output = await homeController(input)
  }

  if (!client) {
    const { layoutView } = await import(
      "../views/layoutView"
    )
    output = await layoutView({ ...input, output })
  }

  return { output }
}

export default pageWithLayoutRouter
