import { ReplacementInputType } from "../types/replacementTypes"

export function viewReplacements({
  name,
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
      viewInputType(upperModelName) + "}",
      `${viewInputType(
        upperModelName
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
