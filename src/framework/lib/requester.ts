import { ModulesType } from "../lib/modulesLister"
import {
  SettlerInputType,
  SettlerOutputType,
} from "../types/settlerTypes"
import elementReplacer from "./elementReplacer"
import importRunner from "./importRunner"

export const requesterPhases = [
  "constructors",
  "initializers",
  "middleware",
  "routers",
  "settlers",
]

export type RequesterOutputType = SettlerInputType &
  SettlerOutputType

export let constructorsCalled = false

export async function requester(
  modules: ModulesType,
  input: unknown
): Promise<RequesterOutputType> {
  let outputFound = false

  for (const phase of requesterPhases) {
    if (constructorsCalled && phase === "constructors") {
      continue
    }

    constructorsCalled = true

    const [objects, outputs] = await importRunner(
      modules[phase],
      input
    )

    for (const el of outputs) {
      outputFound = true

      if (typeof el !== "string" && el.nodeType) {
        elementReplacer(el)
      }
    }

    input = Object.assign({}, input, ...objects, {
      output: outputs,
    })

    if (outputFound && phase === "middleware") {
      break
    }
  }

  return input as RequesterOutputType
}

export default requester
