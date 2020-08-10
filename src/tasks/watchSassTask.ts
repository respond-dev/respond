import ptySpawner from "../framework/lib/ptySpawner"
import { join } from "path"

export async function watchSassTask(): Promise<void> {
  await ptySpawner("npx", {
    args: [
      "node-sass",
      "-w",
      "src",
      "-r",
      "-o",
      "dist-css",
    ],
    cwd: join(__dirname, "../../"),
    stdout: true,
  })
}

export default watchSassTask
