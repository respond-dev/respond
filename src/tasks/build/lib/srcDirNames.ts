// ⚠️ Use relative paths in this file!
//
import { basename, join } from "path"
import { directoryLister } from "../../../pipelines/respond/lib/directoryLister"

let srcDirNamesCache: string[]

export async function srcDirNames(): Promise<string[]> {
  if (srcDirNamesCache) {
    return srcDirNamesCache
  }
  const dirs = await directoryLister(
    join(__dirname, "../../../")
  )
  srcDirNamesCache = dirs.dirPaths.map((srcDir) =>
    basename(srcDir)
  )
  return srcDirNamesCache
}

export default srcDirNames
