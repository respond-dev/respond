import modulesDirectoryLister from "./modulesDirectoryLister"
import promiseAll from "./promiseAll"

export interface ModulesType {
  initializers?: string[]
  middleware?: string[]
  routes?: string[]
  layouts?: string[]
  finalizers?: string[]
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
    routes: modulesDirectoryLister("routes", clientMode),
    layouts: modulesDirectoryLister("layouts", clientMode),
    finalizers: modulesDirectoryLister(
      "finalizers",
      clientMode
    ),
  })
}

export default modulesLister
