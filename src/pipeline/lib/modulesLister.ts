import modulesDirectoryLister from "./modulesDirectoryLister"
import promiseAll from "../../lib/promiseAll"

export interface ModulesType {
  constructors?: string[]
  initializers?: string[]
  middleware?: string[]
  routers?: string[]
  settlers?: string[]
}

export async function modulesLister(
  clientMode?: boolean
): Promise<ModulesType> {
  return await promiseAll({
    constructors: modulesDirectoryLister(
      "pipeline/constructors",
      clientMode
    ),
    initializers: modulesDirectoryLister(
      "pipeline/initializers",
      clientMode
    ),
    middleware: modulesDirectoryLister(
      "pipeline/middleware",
      clientMode
    ),
    routers: modulesDirectoryLister("routers", clientMode),
    settlers: modulesDirectoryLister(
      "pipeline/settlers",
      clientMode
    ),
  })
}

export default modulesLister
