import { ModulesType } from "../lib/modulesLister"
import {
  SettlerInputType,
  SettlerOutputType,
} from "../pipeline/types/settlerTypes"
import elementReplacer from "./elementReplacer"
import importRunner from "./importRunner"

export const requesterPhases = [
  "initializers",
  "middleware",
  "routers",
  "settlers",
]

export type RequesterOutputType = SettlerInputType &
  SettlerOutputType

export async function requester(
  modules: ModulesType,
  input: unknown
): Promise<RequesterOutputType> {
  let outputFound = false

  for (const phase of requesterPhases) {
    const result = await importRunner(modules[phase], input)
    const outputs = result.map((r) => r[1])

    let out: (Element | string)[] = []

    for (let { output } of outputs) {
      if (!output) {
        continue
      }

      outputFound = true

      if (!Array.isArray(output)) {
        output = [output]
      }

      for (const item of output) {
        if (item?.nodeType) {
          elementReplacer(item)
        }
      }

      out = out.concat(output.filter((o) => o))
    }

    input = Object.assign({}, input, ...outputs, {
      modules,
    })

    if (outputFound && phase === "middleware") {
      break
    }
  }

  return input as RequesterOutputType
}

export default requester
