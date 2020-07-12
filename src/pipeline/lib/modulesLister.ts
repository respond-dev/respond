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
      "constructors",
      clientMode
    ),
    initializers: modulesDirectoryLister(
      "initializers",
      clientMode
    ),
    middleware: modulesDirectoryLister(
      "middleware",
      clientMode
    ),
    routers: modulesDirectoryLister("routers", clientMode),
    settlers: modulesDirectoryLister(
      "settlers",
      clientMode
    ),
  })
}

export default modulesLister
