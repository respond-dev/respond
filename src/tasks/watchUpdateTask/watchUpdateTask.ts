import { join } from "path"
import chokidar from "chokidar"
import distJsSingleReplacer from "libs/distJsReplacer/distJsSingleReplacer"

export const rootDir = join(__dirname, "root/")
export const distCjsTsDir = join(__dirname, "dist/cjs-ts")
export const distEsmTsDir = join(__dirname, "dist/esm-ts")
export const distCjsDir = join(__dirname, "dist/cjs")
export const distEsmDir = join(__dirname, "dist/esm")

export async function watchUpdateTask(): Promise<void> {
  chokidar
    .watch([distCjsTsDir, distEsmTsDir], {
      ignoreInitial: true,
    })
    .on("add", updateDist)
    .on("change", updateDist)
}

async function updateDist(path) {
  if (path.match(/\.js$/)) {
    const isCjs = path.startsWith(distCjsDir)
    const distDir = isCjs ? distCjsDir : distEsmDir
    const distTsDir = isCjs ? distCjsTsDir : distEsmTsDir

    await distJsSingleReplacer(
      isCjs ? "cjs" : "esm",
      path,
      distDir,
      distTsDir
    )
  }
}

export default watchUpdateTask
