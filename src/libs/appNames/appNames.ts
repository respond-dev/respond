import { basename, join } from "path"
import directoryLister from "libs/directoryLister/directoryLister"

export async function appNames(): Promise<string[]> {
  const dirs = await directoryLister(
    join(__dirname, "apps/")
  )
  return dirs.dirPaths.map((appDir) => basename(appDir))
}

export default appNames
