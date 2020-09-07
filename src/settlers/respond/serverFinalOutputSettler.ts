import { SettlerInputType } from "../../types/respond/settlerTypes"
import { SettlerOutputType } from "../../types/respond/settlerTypes"
import elementSerializer from "../../lib/respond/elementSerializer"

export function serverFinalOutputSettler({
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

export default serverFinalOutputSettler
