import { extname, join, relative } from "path"
import chokidar from "chokidar"
import ptySpawner from "../framework/lib/ptySpawner"

export async function watchUnlinkTask(): Promise<void> {
  const rootDir = join(__dirname, "../../")
  const anyDistDir = join(rootDir, "dist-*")
  const srcDir = join(rootDir, "src")

  chokidar
    .watch([srcDir], { ignoreInitial: true })
    .on("unlink", async (path) => {
      const relPath = relative(srcDir, path)
      const ext = extname(path)

      if (ext) {
        const noExtRelPath = relPath.replace(
          new RegExp(`${ext}$`),
          ""
        )

        await ptySpawner("sh", {
          args: [
            "-c",
            `rm ${join(anyDistDir, noExtRelPath + ".*")}`,
          ],
          stdout: true,
        })
      }
    })
    .on("unlinkDir", async (path) => {
      const relPath = relative(srcDir, path)

      await ptySpawner("sh", {
        args: ["-c", `rm -rf ${join(anyDistDir, relPath)}`],
        stdout: true,
      })
    })
}

export default watchUnlinkTask
