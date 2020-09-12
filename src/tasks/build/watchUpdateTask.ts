import { join } from "path"
import chokidar from "chokidar"
import { singlePathFixer } from "../lib/pathFixer"

export const rootDir = join(__dirname, "tasks/../../")
export const distCjsDir = join(rootDir, "dist-cjs")
export const distEsmDir = join(rootDir, "dist-esm")

export async function watchUpdateTask(): Promise<void> {
  chokidar
    .watch([distCjsDir, distEsmDir], {
      ignoreInitial: true,
    })
    .on("change", async (path) => {
      if (path.match(/\.js$/)) {
        await singlePathFixer(
          path,
          path.startsWith(distCjsDir)
            ? distCjsDir
            : distEsmDir
        )
      }
    })
}

export default watchUpdateTask
