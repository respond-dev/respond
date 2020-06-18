import { deepDirectoryLister } from "./directoryLister"

export async function acceptTester(
  dirPath: string,
  ...args: any[]
) {
  const { filePaths } = await deepDirectoryLister(
    dirPath,
    ".js"
  )

  return (
    await Promise.all(
      filePaths.map(async (path) => {
        const { default: lib } = await import(path)

        if (lib?.accept) {
          return lib.accept(...args) ? lib : undefined
        }
      })
    )
  ).filter((p) => p)
}

export default acceptTester
