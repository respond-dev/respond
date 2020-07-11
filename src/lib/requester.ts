import { ModulesType } from "../lib/modulesLister"
import {
  FinalizerInputType,
  FinalizerOutputType,
} from "../types/finalizerTypes"
import elementReplacer from "./elementReplacer"
import importRunner from "./importRunner"

export const requesterPhases = [
  "initializers",
  "middleware",
  "routes",
  "layouts",
  "finalizers",
]

export interface RequesterAdditionsType {
  elements?: Element[]
  moduleMatches?: Record<string, string[]>
  strings?: string[]
}

export type RequesterOutputType = FinalizerInputType &
  FinalizerOutputType &
  RequesterAdditionsType

export async function requester(
  modules: ModulesType,
  input: unknown
): Promise<RequesterOutputType> {
  let moduleMatches: Record<string, string[]> = {}

  for (const phase of requesterPhases) {
    const result = await importRunner(modules[phase], input)

    let elements: Element[] = []
    let strings: string[] = []
    let outputs = result.map((r) => r[1])

    outputs = outputs.filter((output) => {
      if (Array.isArray(output)) {
        if (typeof output[0] === "string") {
          strings = strings.concat(output)
        } else if (output[0]?.nodeType) {
          elementReplacer(output)
          elements = elements.concat(output)
        }
      } else if (typeof output === "string") {
        strings = strings.concat(output)
      } else if (output?.nodeType) {
        elementReplacer([output])
        elements = elements.concat(output)
      } else {
        return true
      }
    })

    if (
      phase === "layouts" &&
      !(elements.length || strings.length)
    ) {
      break
    }

    moduleMatches = {
      ...moduleMatches,
      [phase]: result.map((r) => r[0]),
    }

    input = Object.assign({}, input, ...outputs, {
      elements,
      modules,
      moduleMatches,
    })

    if (
      (elements.length || strings.length) &&
      !["routes", "layouts"].includes(phase)
    ) {
      break
    }
  }

  return input as RequesterOutputType
}

export default requester
