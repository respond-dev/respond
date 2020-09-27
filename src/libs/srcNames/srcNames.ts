// ⚠️ Use relative paths in this file!
//
import { basename, join } from "path"
import directoryLister from "../../libs/directoryLister/directoryLister"

export async function srcNames(): Promise<string[]> {
  const dirs = await directoryLister(
    join(__dirname, "../../")
  )
  return dirs.dirPaths.map((srcDir) => basename(srcDir))
}

export default srcNames
