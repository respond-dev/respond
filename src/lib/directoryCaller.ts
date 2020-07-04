import { deepDirectoryLister } from "./directoryLister"
import { join } from "path"

export async function directoryCaller(
  dirPath: string,
  arg: unknown,
  regex?: RegExp
): Promise<[string, any][]>

export async function directoryCaller(
  filePaths: string[],
  arg: unknown
): Promise<[string, any][]>

export async function directoryCaller(
  paths: string | string[],
  arg: unknown,
  regex?: RegExp
): Promise<[string, any][]> {
  if (typeof paths === "string") {
    const { filePaths } = await deepDirectoryLister(
      paths,
      regex,
      ".js"
    )
    paths = filePaths
  } else {
    paths = paths.map((path) =>
      join(__dirname, "../../", path)
    )
  }

  return (
    await Promise.all(
      paths.map(
        async (path): Promise<[string, any]> => {
          const { default: fn } = await import(path)

          if (typeof fn === "function") {
            return [path, await fn(arg)]
          }
        }
      )
    )
  ).filter((p) => p && p[1])
}

export default directoryCaller
