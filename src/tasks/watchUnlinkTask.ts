import { extname, join, relative } from "path"
import chokidar from "chokidar"
import fs from "fs-extra"

export async function watchUnlinkTask(): Promise<void> {
  const rootDir = join(__dirname, "../../")
  const srcDir = join(rootDir, "src")

  chokidar
    .watch([srcDir], { ignoreInitial: true })
    .on("unlink", async (path) => {
      const relPath = relative(srcDir, path)
      const ext = extname(path)

      if (ext) {
        const promises = []
        const noExtRelPath = relPath.replace(
          new RegExp(`${ext}$`),
          ""
        )

        let distDirs: string[]
        let rmExts: string[]

        if (ext === ".scss") {
          distDirs = [join(rootDir, "dist-css")]
          rmExts = [".css"]
        }

        if (ext === ".ts") {
          distDirs = [
            join(rootDir, "dist-cjs"),
            join(rootDir, "dist-esm"),
          ]
          rmExts = [".js", ".js.map", ".d.ts"]
        }

        for (const distDir of distDirs) {
          for (const rmExt of rmExts) {
            promises.push(
              fs.remove(join(distDir, noExtRelPath + rmExt))
            )
          }
        }

        await Promise.all(promises)
      }
    })
    .on("unlinkDir", async (path) => {
      const relPath = relative(srcDir, path)
      const distDirs = [
        join(rootDir, "dist-cjs"),
        join(rootDir, "dist-css"),
        join(rootDir, "dist-esm"),
      ]

      await Promise.all(
        distDirs.map((distDir) =>
          fs.remove(join(distDir, relPath))
        )
      )
    })
}

export default watchUnlinkTask
