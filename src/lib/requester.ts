import { join, relative } from "path"
import { ModulesType } from "../lib/modulesLister"
import directoryCaller from "./directoryCaller"
import elementSerializer from "./elementSerializer"

export const requesterPhases = [
  "initializers",
  "middleware",
  "routes",
  "layouts",
]

export async function requester(
  modules: ModulesType,
  input: unknown
): Promise<string> {
  const results: Record<string, [string, any][]> = {}
  let outputs: any[]

  for (const phase of requesterPhases) {
    const result = await directoryCaller(
      modules[phase],
      input
    )

    results[phase] = result
    outputs = result.map((r) => r[1])

    if (phase === "routes") {
      const routeModules = result.map(
        (r) =>
          "/" + relative(join(__dirname, "../../"), r[0])
      )
      input = Object.assign({}, input, {
        elements: outputs,
        routeModules,
      })
    } else if (phase !== "layouts") {
      input = Object.assign({}, input, ...outputs)
    }
  }

  return elementSerializer(outputs)
}

export default requester
