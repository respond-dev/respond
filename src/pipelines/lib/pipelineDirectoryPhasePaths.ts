import { join, relative } from "path"
import { deepDirectoryLister } from "lib/fs/directoryLister"

export const clientRegExp = /^((?!(^|\/)(server|example|test)).)*$/
export const serverRegExp = /^((?!(^|\/)(client|example|test)).)*$/

export async function pipelineDirectoryPhasePaths(
  dirPath: string,
  clientMode?: boolean
): Promise<string[]> {
  const modulesRegExp = clientMode
    ? clientRegExp
    : serverRegExp

  const { filePaths } = await deepDirectoryLister(
    dirPath,
    modulesRegExp,
    ".js"
  )

  return filePaths.map(
    (path) => "/" + relative(join(__dirname, "src/"), path)
  )
}

export default pipelineDirectoryPhasePaths
