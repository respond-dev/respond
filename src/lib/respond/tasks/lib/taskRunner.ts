import { basename, join } from "path"
import directoryLister from "../../lib/directoryLister"
import promiseAll from "../../lib/promiseAll"

export async function taskRunner(
  args: string[]
): Promise<any[]> {
  const tasks = await promiseAll({
    framework: directoryLister(
      join(__dirname, "../"),
      undefined,
      ".js"
    ),
    src: directoryLister(
      join(__dirname, "../../../../tasks"),
      undefined,
      ".js"
    ),
  })

  const paths = tasks.framework.filePaths
    .concat(tasks.src.filePaths)
    .filter((path) =>
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
