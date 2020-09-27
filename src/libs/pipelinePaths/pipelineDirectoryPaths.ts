import { join } from "path"
import promiseAll from "libs/promiseAll/promiseAll"
import pipelineDirectoryPhasePaths from "./pipelineDirectoryPhasePaths"

export interface PipelineDirectoryPathsType {
  constructors?: string[]
  initializers?: string[]
  middleware?: string[]
  routers?: string[]
  settlers?: string[]
}

export async function pipelineDirectoryPaths(
  dirPath: string,
  pipelinePhases: string[],
  clientMode?: boolean
): Promise<PipelineDirectoryPathsType> {
  const promises = {}

  for (const phase of pipelinePhases) {
    promises[phase] = pipelineDirectoryPhasePaths(
      join(dirPath, phase),
      clientMode
    )
  }

  return await promiseAll(promises)
}

export default pipelineDirectoryPaths
