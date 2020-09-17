import { PipelineDirectoryPathsType } from "lib/pipelines/pipelineDirectoryPaths"

export function cjsToMjsPaths(
  phasePaths: PipelineDirectoryPathsType
): Record<string, string[]> {
  const esm = {}

  for (const phase in phasePaths) {
    esm[phase] = phasePaths[phase].map((path: string) =>
      path
        .replace(/\/dist\/cjs\//, "/dist/esm/")
        .replace(/\.js$/, ".mjs")
    )
  }

  return esm
}

export default cjsToMjsPaths
