import modulesDirectoryLister from "./modulesDirectoryLister"
import promiseAll from "./promiseAll"

export interface ModulesType {
  initializers?: string[]
  middleware?: string[]
  routers?: string[]
  settlers?: string[]
}

export async function modulesLister(
  clientMode?: boolean
): Promise<ModulesType> {
  return await promiseAll({
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
