import { join, relative } from "path"
import { deepDirectoryLister } from "lib/fs/directoryLister"
import cjsToMjsPath from "lib/paths/cjsToMjsPath"

export const clientRegExp =
  process.env.NODE_ENV === "test"
    ? /^((?!(^|\/)(server|example)).)*$/
    : /^((?!(^|\/)(server|example|test)).)*$/

export const serverRegExp =
  process.env.NODE_ENV === "test"
    ? /^((?!(^|\/)(client|example)).)*$/
    : /^((?!(^|\/)(client|example|test)).)*$/

export async function pipelineDirectoryPhasePaths(
  dirPath: string,
  clientMode?: boolean
): Promise<string[]> {
  const pathRegExp = clientMode
    ? clientRegExp
    : serverRegExp

  const { filePaths } = await deepDirectoryLister(
    dirPath,
    pathRegExp,
    ".js"
  )

  return filePaths
    .filter((path) => !path.match(/Spec\./))
    .map((path) =>
      clientMode
        ? cjsToMjsPath(
            "/" + relative(join(__dirname, "src/"), path)
          )
        : path
    )
}

export default pipelineDirectoryPhasePaths
