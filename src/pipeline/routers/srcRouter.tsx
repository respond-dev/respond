import {
  RouterInputType,
  RouterOutputType,
} from "../types/routerTypes"
import importRunner from "../lib/importRunner"
import modulesDirectoryLister from "../lib/modulesDirectoryLister"

export async function srcRouter(
  input: RouterInputType
): Promise<RouterOutputType> {
  const { client } = input
  const paths = await modulesDirectoryLister(
    "routers",
    !!client
  )

  const [, outputs] = await importRunner(paths, input)

  return { output: outputs }
}

export default srcRouter
