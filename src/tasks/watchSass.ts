import ptySpawner from "../lib/ptySpawner"
import { join } from "path"

export async function watchSass(): Promise<void> {
  await ptySpawner("npx", {
    args: [
      "node-sass",
      "-w",
      "src/styles",
      "-r",
      "-o",
      "dist-css",
    ],
    cwd: join(__dirname, "../../"),
    stdout: true,
  })
}

export default watchSass
