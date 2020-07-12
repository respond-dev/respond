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
    const { basicLayout } = await import(
      "../../layouts/basicLayout"
    )
    return {
      output: await basicLayout({ ...input, output }),
    }
  }

  return { output }
}

export default pageRouter
