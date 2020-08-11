import { SettlerInputType } from "../types/settlerTypes"
import { SettlerOutputType } from "../types/settlerTypes"
import elementSerializer from "../lib/elementSerializer"

export function finalOutputSettler({
  output,
}: SettlerInputType): SettlerOutputType {
  if (!output) {
    return
  }

  const finalOutput: string[] = []

  for (const out of output as (string | Element)[]) {
    if (typeof out === "string") {
      finalOutput.push(out)
    } else if (out?.nodeType) {
      finalOutput.push(elementSerializer(out))
    }
  }

  return {
    finalOutput: finalOutput.join("\n"),
  }
}

export default finalOutputSettler
