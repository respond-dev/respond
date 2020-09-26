import { basename, join } from "path"
import { directoryLister } from "libs/fs/directoryLister"

let appDirNamesCache: string[]

export async function appDirNames(): Promise<string[]> {
  if (appDirNamesCache) {
    return appDirNamesCache
  }
  const dirs = await directoryLister(
    join(__dirname, "../../apps")
  )
  appDirNamesCache = dirs.dirPaths.map((appDir) =>
    basename(appDir)
  )
  return appDirNamesCache
}

export default appDirNames
