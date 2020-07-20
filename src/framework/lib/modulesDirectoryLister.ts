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

  const { app, pipeline } = await promiseAll({
    app: deepDirectoryLister(
      join(__dirname, "../../app", dirName),
      modulesRegExp,
      ".js"
    ),
    pipeline: deepDirectoryLister(
      join(__dirname, "../../framework", dirName),
      modulesRegExp,
      ".js"
    ),
  })

  return [...pipeline.filePaths, ...app.filePaths].map(
    (path) =>
      "/" + relative(join(__dirname, "../../../"), path)
  )
}

export default modulesDirectoryLister
