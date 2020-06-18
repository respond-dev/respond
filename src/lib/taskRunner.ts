import path from "path"
import directoryLister from "./directoryLister"

export async function taskRunner(args: string[]) {
  const { files } = await directoryLister(
    path.join(__dirname, "../tasks"),
    ".js"
  )
  const file = files.find(
    (file) => path.basename(file, ".js") === args[0]
  )

  return (await import(file)).default(args)
}

export default taskRunner
