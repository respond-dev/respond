import { join } from "path"
import directoryCaller from "./directoryCaller"

export async function requester(
  input: unknown
): Promise<Record<string, any>> {
  const phases = [
    "initializers",
    "middleware",
    "components",
  ]

  let outputs: any[]

  for (const phase of phases) {
    const path = join(__dirname, "../", phase)
    outputs = await directoryCaller(path, input)
    input = Object.assign({}, input, ...outputs)
  }

  return input
}

export default requester
