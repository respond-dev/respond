import { SettlerInputType } from "pipelines/respond/types/settlerTypes"
import { SettlerOutputType } from "pipelines/respond/types/settlerTypes"
import elementSerializer from "pipelines/respond/lib/elementSerializer"

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
