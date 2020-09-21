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
  options: {
    input: InputType
    paths: PipelinePathsType
    outputProperty?: string
  }
): Promise<OutputType> {
  const clientMode = typeof history !== "undefined"
  const { paths } = options

  let { input, outputProperty } = options

  outputProperty = outputProperty || id

  for (const phase of pipelinePhases) {
    if (input[outputProperty] && phase !== "settlers") {
      continue
    }

    if (clientMode && phase === "constructors") {
      if (clientConstructorsCalled[id]) {
        continue
      }

      clientConstructorsCalled[id] = true
    }

    const isClientInitializer =
      clientMode && phase === "initializers"

    const routeChanged =
      clientMode && clientHref[id] !== window.location.href

    let objects: any[]

    if (!isClientInitializer || routeChanged) {
      objects = await importLoader(paths[phase], input)

      if (isClientInitializer && routeChanged) {
        clientHref[id] = window.location.href
        clientInitializerObjects[id] = objects
      }
    } else if (isClientInitializer) {
      objects = clientInitializerObjects[id]
    }

    input = Object.assign({}, input, ...objects)
  }

  return (input as unknown) as OutputType
}

export default pipeline
