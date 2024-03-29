import { join, relative } from "path"
import deepDirectoryLister from "libs/directoryLister/deepDirectoryLister"
import mjsPathConverter from "libs/mjsPathConverter/mjsPathConverter"

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
        ? mjsPathConverter(
            "/" +
              relative(join(__dirname, "dist/cjs/"), path)
          )
        : path
    )
}

export default pipelineDirectoryPhasePaths
