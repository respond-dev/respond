import { extname, join, relative } from "path"
import chokidar from "chokidar"
import fs from "fs-extra"

export const unlinkExtConfig = {
  ".scss": {
    dirs: [join(__dirname, "dist/css")],
    exts: [".css"],
  },
  ".ts": {
    dirs: [
      join(__dirname, "dist/cjs-ts"),
      join(__dirname, "dist/esm-ts"),
      join(__dirname, "dist/cjs"),
      join(__dirname, "dist/esm"),
    ],
    exts: [".js", ".js.map", ".d.ts"],
  },
}

export async function watchUnlinkTask(): Promise<void> {
  const srcDir = join(__dirname, "root/src/")

  chokidar
    .watch([srcDir], { ignoreInitial: true })
    .on("unlink", async (path) => {
      const relPath = relative(srcDir, path)
      const ext = extname(path)

      if (unlinkExtConfig[ext]) {
        const promises = []
        const { dirs, exts } = unlinkExtConfig[ext]
        const noExtRelPath = relPath.replace(
          new RegExp(`${ext}$`),
          ""
        )

        for (const distDir of dirs) {
          for (const rmExt of exts) {
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
        ...unlinkExtConfig[".scss"].dirs,
        ...unlinkExtConfig[".ts"].dirs,
      ]

      await Promise.all(
        distDirs.map((distDir) =>
          fs.remove(join(distDir, relPath))
        )
      )
    })
}

export default watchUnlinkTask
