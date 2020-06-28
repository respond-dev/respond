import { deepDirectoryLister } from "./directoryLister"

export async function directoryCaller(
  dirPath: string,
  ...args: any[]
): Promise<any[]> {
  const { filePaths } = await deepDirectoryLister(
    dirPath,
    ".js"
  )

  return (
    await Promise.all(
      filePaths.map(async (path) => {
        const { default: fn } = await import(path)

        if (typeof fn === "function") {
          return fn(...args)
        }
      })
    )
  ).filter((p) => p)
}

export default directoryCaller
