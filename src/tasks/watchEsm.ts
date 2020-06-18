import ptySpawner from "../lib/ptySpawner"
import { join } from "path"

export async function watchEsm() {
  await ptySpawner("npx", {
    args: ["tsc", "-p", "src/tsconfig.esm.json", "-w"],
    cwd: join(__dirname, "../../"),
    stdout: true,
  })
}

export default watchEsm
