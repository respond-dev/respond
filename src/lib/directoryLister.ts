import { readdir, stat, Stats } from "fs"
import { extname, join } from "path"

export interface ListDirectoryResult {
  dirs: string[]
  files: string[]
}

export async function directoryLister(
  dir: string,
  ext?: string
): Promise<ListDirectoryResult> {
  const names = await new Promise<string[]>(
    (resolve, reject) => {
      readdir(dir, (err, files) => {
        err ? reject(err) : resolve(files)
      })
    }
  )

  const dirs = []
  const files = []

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
        dirs.push(join(dir, name))
      } else if (!ext || extname(name) === ext) {
        files.push(join(dir, name))
      }
    })
  )

  return { dirs, files }
}

export async function deepDirectoryLister(
  dir: string,
  ext?: string,
  options: ListDirectoryResult = { dirs: [], files: [] }
): Promise<ListDirectoryResult> {
  const { dirs, files } = await directoryLister(dir, ext)

  options.files = options.files.concat(files)

  await Promise.all(
    dirs.map(async (path) => {
      await deepDirectoryLister(path, ext, options)
    })
  )

  return options
}

export default directoryLister
