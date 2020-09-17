import { join, relative } from "path"
import { deepDirectoryLister } from "lib/fs/directoryLister"

export const clientRegExp = /^((?!(^|\/)(server|example|test)).)*$/
export const serverRegExp = /^((?!(^|\/)(client|example|test)).)*$/

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
    .map(
      (path) =>
        "/" + relative(join(__dirname, "src/"), path)
    )
}

export default pipelineDirectoryPhasePaths
