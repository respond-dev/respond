import { basename, join } from "path"
import directoryLister from "./directoryLister"

export async function taskRunner(
  args: string[]
): Promise<any[]> {
  const { filePaths } = await directoryLister(
    join(__dirname, "../tasks"),
    ".js"
  )

  const paths = filePaths.filter((path) =>
    args.includes(
      basename(path, ".js").replace(/Task$/, "")
    )
  )

  return await Promise.all(
    paths.map(async (path) =>
      (await import(path)).default(args)
    )
  )
}

export default taskRunner
