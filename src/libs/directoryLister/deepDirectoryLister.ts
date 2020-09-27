import directoryLister from "./directoryLister"
import { DirectoryListType } from "./directoryLister"

export async function deepDirectoryLister(
  dir: string,
  matcher?: RegExp,
  ext?: string,
  options: DirectoryListType = {
    dirPaths: [],
    filePaths: [],
  }
): Promise<DirectoryListType> {
  const { dirPaths, filePaths } = await directoryLister(
    dir,
    matcher,
    ext
  )

  options.filePaths = options.filePaths.concat(filePaths)

  await Promise.all(
    dirPaths.map(async (path) => {
      await deepDirectoryLister(path, matcher, ext, options)
    })
  )

  return options
}

export default deepDirectoryLister
