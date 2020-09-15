import { join } from "path"
import chokidar from "chokidar"
import { distJsSingleUpdater } from "./lib/distJsUpdater"

export const rootDir = join(__dirname, "root/")
export const distCjsTsDir = join(rootDir, "dist/cjs-ts")
export const distEsmTsDir = join(rootDir, "dist/esm-ts")
export const distCjsDir = join(rootDir, "dist/cjs")
export const distEsmDir = join(rootDir, "dist/esm")

export async function watchUpdateTask(): Promise<void> {
  chokidar
    .watch([distCjsTsDir, distEsmTsDir], {
      ignoreInitial: true,
    })
    .on("change", async (path) => {
      if (path.match(/\.js$/)) {
        const isCjs = path.startsWith(distCjsDir)
        const distDir = isCjs ? distCjsDir : distEsmDir
        const distTsDir = isCjs
          ? distCjsTsDir
          : distEsmTsDir

        await distJsSingleUpdater(
          isCjs ? "cjs" : "esm",
          path,
          distDir,
          distTsDir
        )
      }
    })
}

export default watchUpdateTask
