import {
  RouterInputType,
  RouterOutputType,
} from "../pipeline/types/routerTypes"
import exampleController from "../controllers/exampleController"

export async function exampleRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const { client, url } = input

  let output: (Element | string)[] | Element | string

  if (url.pathname === "/") {
    output = await exampleController(input)
  }

  if (!client) {
    const { exampleLayoutView } = await import(
      "../views/exampleLayoutView"
    )
    output = await exampleLayoutView({ ...input, output })
  }

  return { output }
}

export default exampleRouter
