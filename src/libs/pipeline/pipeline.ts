import importLoader from "libs/importLoader/importLoader"
import { PipelinePathsType } from "libs/pipelinePaths/pipelinePaths"

export const pipelinePhases = [
  "constructors",
  "initializers",
  "middleware",
  "routers",
  "settlers",
]

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

  outputProperty = outputProperty || "respond"

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
