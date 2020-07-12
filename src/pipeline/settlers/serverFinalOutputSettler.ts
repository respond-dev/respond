import elementSerializer from "../lib/elementSerializer"
import {
  SettlerInputType,
  SettlerOutputType,
} from "../types/settlerTypes"

export function finalOutputSettler({
  output,
}: SettlerInputType): SettlerOutputType {
  if (!output) {
    return
  }

  const finalOutput: string[] = []

  if (Array.isArray(output)) {
    for (const out of output) {
      if (typeof out === "string") {
        finalOutput.push(out)
      } else if (out?.nodeType) {
        finalOutput.push(elementSerializer(out))
      }
    }
  } else if (typeof output === "string") {
    finalOutput.push(output)
  } else if (output?.nodeType) {
    finalOutput.push(elementSerializer(output))
  }

  return {
    finalOutput: finalOutput.join("\n"),
  }
}

export default finalOutputSettler
