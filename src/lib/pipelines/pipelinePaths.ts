import { join } from "path"
import appYamlLoader from "lib/appYamlLoader"
import { EnvYamlType } from "lib/appYamlLoader"
import cjsToMjsPaths from "lib/paths/cjsToMjsPaths"
import pipelineDirectoryPaths from "./pipelineDirectoryPaths"
import { PipelineDirectoryPathsType } from "./pipelineDirectoryPaths"

export type PipelinePathsType = PipelineDirectoryPathsType

export const pipelinePhases = [
  "constructors",
  "initializers",
  "middleware",
  "routers",
  "settlers",
]

export async function pipelinePaths(
  pipelineId: string,
  clientMode = false
): Promise<PipelinePathsType> {
  const app = await appYamlLoader()

  const { pipelines } = app[
    process.env.STAGE || "dev"
  ] as EnvYamlType

  const pipelineDirs = pipelines[pipelineId]
  const phasePaths: PipelinePathsType = {}

  for (const pipelineDir of pipelineDirs) {
    const paths = await pipelineDirectoryPaths(
      join(__dirname, "src/", pipelineDir),
      pipelinePhases,
      clientMode
    )
    for (const phase in paths) {
      phasePaths[phase] = phasePaths[phase] || []
      phasePaths[phase] = phasePaths[phase].concat(
        paths[phase]
      )
    }
  }

  if (clientMode) {
    return cjsToMjsPaths(phasePaths)
  }

  return phasePaths
}

export default pipelinePaths