import ptySpawner from "../lib/ptySpawner"
import { join } from "path"

export async function watchCjs() {
  await ptySpawner("npx", {
    args: ["tsc", "-p", "src/tsconfig.cjs.json", "-w"],
    cwd: join(__dirname, "../../"),
    stdout: true,
  })
}

export default watchCjs
