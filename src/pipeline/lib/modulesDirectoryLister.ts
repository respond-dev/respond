import { join, relative } from "path"
import { deepDirectoryLister } from "../../lib/directoryLister"
import promiseAll from "../../lib/promiseAll"

export const clientRegExp = /^((?!(^|\/)(server|example|test)).)*$/
export const serverRegExp = /^((?!(^|\/)(client|example|test)).)*$/

export async function modulesDirectoryLister(
  dirName: string,
  clientMode?: boolean
): Promise<string[]> {
  const modulesRegExp = clientMode
    ? clientRegExp
    : serverRegExp

  const { pipeline, user } = await promiseAll({
    pipeline: deepDirectoryLister(
      join(__dirname, "../../pipeline", dirName),
      modulesRegExp,
      ".js"
    ),
    user: deepDirectoryLister(
      join(__dirname, "../../", dirName),
      modulesRegExp,
      ".js"
    ),
  })

  return [...pipeline.filePaths, ...user.filePaths].map(
    (path) =>
      "/" + relative(join(__dirname, "../../../"), path)
  )
}

export default modulesDirectoryLister
