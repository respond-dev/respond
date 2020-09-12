import ptySpawner from "pipelines/respond/lib/ptySpawner"
import { join } from "path"

export async function watchEsmTask(): Promise<void> {
  await ptySpawner("npx", {
    args: ["tsc", "-p", "src/tsconfig.esm.json", "-w"],
    cwd: join(__dirname, "../../../"),
    stdout: true,
  })
}

export default watchEsmTask
