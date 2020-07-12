import ptySpawner from "../pipeline/lib/ptySpawner"
import { join } from "path"

export async function watchCjsTask(): Promise<void> {
  await ptySpawner("npx", {
    args: ["tsc", "-p", "src/tsconfig.cjs.json", "-w"],
    cwd: join(__dirname, "../../"),
    stdout: true,
  })
}

export default watchCjsTask
