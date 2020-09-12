import { basename, join } from "path"
import { deepDirectoryLister } from "pipelines/respond/lib/directoryLister"

export async function taskRunner(
  args: string[]
): Promise<any[]> {
  const tasks = await deepDirectoryLister(
    "tasks/",
    /Task\.js$/
  )

  const paths = tasks.filePaths.filter((path) =>
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
