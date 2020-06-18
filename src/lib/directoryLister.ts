import { readdir, stat, Stats } from "fs"
import { extname, join } from "path"

export interface ListDirectoryResult {
  dirPaths: string[]
  filePaths: string[]
}

export async function directoryLister(
  dir: string,
  ext?: string
): Promise<ListDirectoryResult> {
  const names = await new Promise<string[]>(
    (resolve, reject) => {
      readdir(dir, (err, filePaths) => {
        err ? reject(err) : resolve(filePaths)
      })
    }
  )

  const dirPaths = []
  const filePaths = []

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
      } else if (!ext || extname(name) === ext) {
        filePaths.push(join(dir, name))
      }
    })
  )

  return { dirPaths, filePaths }
}

export async function deepDirectoryLister(
  dir: string,
  ext?: string,
  options: ListDirectoryResult = {
    dirPaths: [],
    filePaths: [],
  }
): Promise<ListDirectoryResult> {
  const { dirPaths, filePaths } = await directoryLister(
    dir,
    ext
  )

  options.filePaths = options.filePaths.concat(filePaths)

  await Promise.all(
    dirPaths.map(async (path) => {
      await deepDirectoryLister(path, ext, options)
    })
  )

  return options
}

export default directoryLister
