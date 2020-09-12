import { join } from "path"
import ptySpawner from "pipelines/respond/lib/ptySpawner"

export async function watchCjsTask(): Promise<void> {
  await ptySpawner("npx", {
    args: ["tsc", "-p", "tsconfig.cjs.json", "-w"],
    cwd: join(__dirname, "tasks/../../"),
    stdout: true,
  })
}

export default watchCjsTask
