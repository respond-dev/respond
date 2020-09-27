import { ConstructorInputType } from "types/respond/constructorTypes"
import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import importLoader from "libs/importLoader/importLoader"
import { PipelineDirectoryPathsType } from "libs/pipelinePaths/pipelineDirectoryPaths"
import elementReplacer from "./elementReplacer"

export const requesterPhases = [
  "constructors",
  "initializers",
  "middleware",
  "routers",
  "settlers",
]

export type RequesterOutputType = SettlerInputType &
  SettlerOutputType

export let clientHref: string
export let clientConstructorsCalled: boolean
export let clientInitializerObjects: any[]
export let clientInitializerOutputs: (string | Element)[]

export async function requester(
  modules: PipelineDirectoryPathsType,
  input: ConstructorInputType
): Promise<RequesterOutputType> {
  const { client } = input

  let outputFound = false

  for (const phase of requesterPhases) {
    if (client && phase === "constructors") {
      if (clientConstructorsCalled) {
        continue
      }

      clientConstructorsCalled = true
    }

    const isClientInitializer =
      client && phase === "initializers"

    const routeChanged =
      isClientInitializer &&
      clientHref !== window.location.href

    let objects: any[]
    let outputs: (string | Element)[]

    if (!isClientInitializer || routeChanged) {
      ;[objects, outputs] = await importLoader(
        modules[phase],
        input
      )

      if (routeChanged) {
        clientHref = window.location.href
        ;[
          clientInitializerObjects,
          clientInitializerOutputs,
        ] = [objects, outputs]
      }
    } else if (phase === "initializers") {
      ;[objects, outputs] = [
        clientInitializerObjects,
        clientInitializerOutputs,
      ]
    }

    if (phase === "middleware") {
      for (const object of objects) {
        for (const key in object) {
          if (key.match(/final[A-Z]/)) {
            outputFound = true
          }
        }
      }
    }

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
