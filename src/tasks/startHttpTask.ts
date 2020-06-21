import ptySpawner from "../lib/ptySpawner"
import { join } from "path"

export async function startHttpTask(): Promise<void> {
  await ptySpawner("node", {
    args: ["dist-cjs/servers/httpServer.js"],
    cwd: join(__dirname, "../../"),
    stdout: true,
  })
}

export default startHttpTask
