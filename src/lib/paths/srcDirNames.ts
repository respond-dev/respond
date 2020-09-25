// ⚠️ Use relative paths in this file!
//
import { basename, join } from "path"
import { directoryLister } from "../../lib/fs/directoryLister"

let srcDirNamesCache: string[]

export const knownDirectories = [
  "generators",
  "lib",
  "pipelines",
  "tasks",
  "types",
]

export async function srcDirNames(): Promise<string[]> {
  if (srcDirNamesCache) {
    return srcDirNamesCache
  }
  const dirs = await directoryLister(
    join(__dirname, "../../")
  )
  srcDirNamesCache = dirs.dirPaths.map((srcDir) =>
    basename(srcDir)
  )
  return srcDirNamesCache
}

export async function unknownSrcDirNames(): Promise<
  string[]
> {
  return (await srcDirNames()).filter(
    (dir) => !knownDirectories.includes(dir)
  )
}

export default srcDirNames
