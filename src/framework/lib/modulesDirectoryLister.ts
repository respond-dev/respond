import { join, relative } from "path"
import { deepDirectoryLister } from "../../framework/lib/directoryLister"
import promiseAll from "../../framework/lib/promiseAll"

export const clientRegExp = /^((?!(^|\/)(server|example|test)).)*$/
export const serverRegExp = /^((?!(^|\/)(client|example|test)).)*$/

export async function modulesDirectoryLister(
  dirName: string,
  clientMode?: boolean
): Promise<string[]> {
  const modulesRegExp = clientMode
    ? clientRegExp
    : serverRegExp

  const { app, framework } = await promiseAll({
    app: deepDirectoryLister(
      join(__dirname, "../../app", dirName),
      modulesRegExp,
      ".js"
    ),
    framework: deepDirectoryLister(
      join(__dirname, "../../framework", dirName),
      modulesRegExp,
      ".js"
    ),
  })

  return [...framework.filePaths, ...app.filePaths].map(
    (path) =>
      "/" + relative(join(__dirname, "../../../"), path)
  )
}

export default modulesDirectoryLister
