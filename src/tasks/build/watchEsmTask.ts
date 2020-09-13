import { join } from "path"
import ptySpawner from "pipelines/respond/lib/ptySpawner"
export async function watchEsmTask(): Promise<void> {
  await ptySpawner("npx", {
    args: ["tsc", "-p", "tsconfig.esm.json", "-w"],
    cwd: join(__dirname, "root/"),
    stdout: true,
  })
}

export default watchEsmTask