import { ReplacementInputType } from "../types/replacementTypes"

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
      )}\n  ${name}Data: ${upperModelName}ModelOutput\n}`,
    ])
  }
}

export function viewImport(): string {
  return 'import { ViewOutputType } from "../types/viewTypes"'
}

export function viewInputType(
  upperModelName: string
): string {
  return `export interface ${upperModelName}ViewInputType {`
}

export default viewReplacements
