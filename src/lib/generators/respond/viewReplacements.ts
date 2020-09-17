import { ReplacementInputType } from "lib/fs/fileCopier"

export function viewReplacements({
  name,
  upperName,
  generators,
  modelName,
  upperModelName,
  replacements,
}: ReplacementInputType): void {
  if (generators.includes("model")) {
    replacements.push([
      viewImport(),
      [
        viewImport(),
        `import { ${upperModelName}ModelOutput } from "../models/${modelName}Model"`,
      ].join("\n"),
    ])

    replacements.push([
      viewInputType(upperName) + "}",
      `${viewInputType(
        upperName
      )}\n  ${name}ModelOutput: ${upperModelName}ModelOutput\n}`,
    ])
  }
}

export function viewImport(): string {
  return 'import { ViewOutputType } from "../types/respond/viewTypes"'
}

export function viewInputType(
  upperModelName: string
): string {
  return `export interface ${upperModelName}ViewInputType {`
}

export default viewReplacements
