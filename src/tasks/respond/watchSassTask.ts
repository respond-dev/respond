import { extname, join, relative } from "path"
import chokidar from "chokidar"
import ptySpawner from "pipelines/respond/lib/ptySpawner"

export async function watchSassTask(): Promise<void> {
  const rootDir = "tasks/../../"
  const srcDir = "tasks/../"

  chokidar
    .watch([join(srcDir, "**/*.scss")], {
      ignoreInitial: true,
    })
    .on("all", async (e, path) => {
      if (e !== "unlink") {
        const ext = extname(path)
        const relPath = relative(srcDir, path)

        await ptySpawner("npx", {
          args: [
            "node-sass",
            join("src", relPath),
            join(
              "dist-css",
              relPath.replace(ext, "") + ".css"
            ),
          ],
          cwd: rootDir,
          stdout: true,
        })
      }
    })
}

export default watchSassTask
