import { ReplacementInputType } from "../types/replacementTypes"
import placeholder from "./placeholder"

export function viewReplacements({
  name,
  generators,
  modelName,
  upperModelName,
  replacements,
}: ReplacementInputType): void {
  if (generators.includes("model")) {
    replacements.push([
      placeholder("imports"),
      `import { ${upperModelName}ModelOutput } from "../models/${modelName}Model"`,
    ])
    replacements.push([
      placeholder("input types"),
      `${name}Data: ${upperModelName}ModelOutput`,
    ])
  }
}

export default viewReplacements
