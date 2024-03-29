import { ReadStream } from "fs"
import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import elementSerializer from "libs/respond/elementSerializer"

export function serverSerializeElementsSettler(
  input: SettlerInputType
): SettlerOutputType {
  const { respond } = input
  const output = respond?.output
  const isString = typeof output === "string"
  const isReadStream = output instanceof ReadStream

  if (output && !isString && !isReadStream) {
    return {
      respond: {
        ...respond,
        mimeType: "text/html",
        output: elementSerializer(
          (output as unknown) as Element | Element[]
        ),
      },
    }
  }
}

export default serverSerializeElementsSettler
