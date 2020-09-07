import { join, relative } from "path"
import { deepDirectoryLister } from "./directoryLister"
import promiseAll from "./promiseAll"

export const clientRegExp = /^((?!(^|\/)(server|example|test)).)*$/
export const serverRegExp = /^((?!(^|\/)(client|example|test)).)*$/

export async function modulesDirectoryLister(
  dirName: string,
  clientMode?: boolean
): Promise<string[]> {
  const modulesRegExp = clientMode
    ? clientRegExp
    : serverRegExp

  const { filePaths } = await deepDirectoryLister(
    join(__dirname, "../../", dirName),
    modulesRegExp,
    ".js"
  )

  return filePaths.map(
    (path) =>
      "/" + relative(join(__dirname, "../../"), path)
  )
}

export default modulesDirectoryLister
