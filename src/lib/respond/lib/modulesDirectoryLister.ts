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

  const { app, framework } = await promiseAll({
    app: deepDirectoryLister(
      join(__dirname, "../../../app", dirName),
      modulesRegExp,
      ".js"
    ),
    framework: deepDirectoryLister(
      join(__dirname, "../../../lib/respond", dirName),
      modulesRegExp,
      ".js"
    ),
  })

  return [...framework.filePaths, ...app.filePaths].map(
    (path) =>
      "/" + relative(join(__dirname, "../../../../"), path)
  )
}

export default modulesDirectoryLister
