import { join } from "path"
import appYamlLoader from "libs/appYamlLoader"
import { EnvYamlType } from "libs/appYamlLoader"
import { pipelinePhases } from "./pipeline"
import pipelineDirectoryPaths from "./pipelineDirectoryPaths"
import { PipelineDirectoryPathsType } from "./pipelineDirectoryPaths"

export type PipelinePathsType = PipelineDirectoryPathsType

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
      join(__dirname, "dist/cjs/", pipelineDir),
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

  return phasePaths
}

export default pipelinePaths
