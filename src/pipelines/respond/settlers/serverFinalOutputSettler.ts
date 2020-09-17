import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import elementSerializer from "lib/respond/elementSerializer"

export function serverFinalOutputSettler({
  output,
}: SettlerInputType): SettlerOutputType {
  if (!output) {
    return
  }

  const finalOutput: string[] = []

  let elementFound = false

  for (const out of output as (string | Element)[]) {
    if (typeof out === "string") {
      finalOutput.push(out)
    } else if (out?.nodeType) {
      elementFound = true
      finalOutput.push(elementSerializer(out))
    }
  }

  return {
    finalMimeType: elementFound
      ? "text/html"
      : "application/json",
    finalOutput: finalOutput.join("\n"),
  }
}

export default serverFinalOutputSettler
