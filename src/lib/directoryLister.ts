import { readdir, stat, Stats } from "fs"
import { extname, join } from "path"

export interface DirectoryListType {
  dirPaths: string[]
  filePaths: string[]
}

export const directoryListerCache = {}

export async function directoryLister(
  dir: string,
  matcher?: RegExp,
  ext?: string
): Promise<DirectoryListType> {
  const key = [dir, matcher, ext].join("::")

  if (directoryListerCache[key]) {
    return directoryListerCache[key]
  }

  const dirPaths = []
  const filePaths = []

  let names: string[]

  try {
    names = await new Promise<string[]>(
      (resolve, reject) => {
        readdir(dir, (err, filePaths) => {
          err ? reject(err) : resolve(filePaths)
        })
      }
    )
  } catch (e) {
    directoryListerCache[key] = { dirPaths, filePaths }
    return directoryListerCache[key]
  }

  await Promise.all(
    names.map(async (name) => {
      const isDir = (
        await new Promise<Stats>((resolve, reject) => {
          stat(join(dir, name), (err, stats) => {
            err ? reject(err) : resolve(stats)
          })
        })
      ).isDirectory()

      if (name[0] === ".") {
        // do nothing
      } else if (isDir) {
        dirPaths.push(join(dir, name))
      } else if (
        (!ext || extname(name) === ext) &&
        (!matcher || name.match(matcher))
      ) {
        filePaths.push(join(dir, name))
      }
    })
  )

  directoryListerCache[key] = { dirPaths, filePaths }
  return directoryListerCache[key]
}

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

export default directoryLister
