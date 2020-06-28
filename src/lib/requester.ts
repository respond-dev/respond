import { join } from "path"
import directoryCaller from "./directoryCaller"

export async function requester(
  ...args: any[]
): Promise<Record<string, any>> {
  const dirPath = join(__dirname, "../initializers")
  const responses = await directoryCaller(dirPath, ...args)

  return Object.assign({}, ...responses)
}

export default requester
