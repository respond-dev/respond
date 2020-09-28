import { join } from "path"
import ptySpawner from "libs/ptySpawner/ptySpawner"

export async function watchCjsTask(): Promise<void> {
  await ptySpawner("npx", {
    args: [
      "tsc",
      "-p",
      "tsconfig.json",
      "-w",
      "--preserveWatchOutput",
    ],
    cwd: join(__dirname, "root/"),
    stdout: true,
  })
}

export default watchCjsTask
