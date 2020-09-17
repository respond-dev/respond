import { PipelineDirectoryPathsType } from "./pipelineDirectoryPaths"

export function modulesToEsm(
  modules: PipelineDirectoryPathsType
): Record<string, string[]> {
  const esm = {}

  for (const phase in modules) {
    esm[phase] = modules[phase].map((path: string) =>
      path
        .replace(/\/dist\/cjs\//, "/dist/esm/")
        .replace(/\.js$/, ".mjs")
    )
  }

  return esm
}

export default modulesToEsm
