import { join } from "path"
import directoryCaller from "./directoryCaller"
import elementSerializer from "./elementSerializer"

export async function requester(
  input: unknown
): Promise<string> {
  const phases = [
    "initializers",
    "middleware",
    "components",
  ]

  let outputs: any[]

  for (const phase of phases) {
    const path = join(__dirname, "../", phase)
    outputs = await directoryCaller(path, input)

    if (phase !== "components") {
      input = Object.assign({}, input, ...outputs)
    }
  }

  return elementSerializer(outputs)
}

export default requester
