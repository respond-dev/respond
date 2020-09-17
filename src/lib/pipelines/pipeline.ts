import importLoader from "lib/loaders/importLoader"
import { pipelinePhases } from "./pipelinePaths"
import { PipelinePathsType } from "./pipelinePaths"

export const clientHref: Record<string, string> = {}

export const clientConstructorsCalled: Record<
  string,
  boolean
> = {}

export const clientInitializerObjects: Record<
  string,
  any[]
> = {}

export async function pipeline<InputType, OutputType>(
  id: string,
  paths: PipelinePathsType,
  input: InputType,
  clientMode = typeof history !== "undefined"
): Promise<OutputType> {
  for (const phase of pipelinePhases) {
    if (clientMode && phase === "constructors") {
      if (clientConstructorsCalled[id]) {
        continue
      }

      clientConstructorsCalled[id] = true
    }

    const isClientInitializer =
      clientMode && phase === "initializers"

    const routeChanged =
      isClientInitializer &&
      clientHref[id] !== window.location.href

    let objects: any[]

    if (!isClientInitializer || routeChanged) {
      objects = await importLoader(paths[phase], input)

      if (routeChanged) {
        clientHref[id] = window.location.href
        clientInitializerObjects[id] = objects
      }
    } else if (phase === "initializers") {
      objects = clientInitializerObjects[id]
    }

    input = Object.assign({}, input, ...objects)
  }

  return (input as unknown) as OutputType
}

export default pipeline
