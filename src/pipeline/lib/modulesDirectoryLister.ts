import { join, relative } from "path"
import { deepDirectoryLister } from "../lib/directoryLister"

export const clientRegExp = /^((?!(^|\/)(server|test)).)*$/
export const serverRegExp = /^((?!(^|\/)(client|test)).)*$/

export async function modulesDirectoryLister(
  dirName: string,
  clientMode?: boolean
): Promise<string[]> {
  const modulesRegExp = clientMode
    ? clientRegExp
    : serverRegExp

  const { filePaths } = await deepDirectoryLister(
    join(__dirname, "../../pipeline", dirName),
    modulesRegExp,
    ".js"
  )

  return filePaths.map(
    (path) =>
      "/" + relative(join(__dirname, "../../../"), path)
  )
}

export default modulesDirectoryLister
