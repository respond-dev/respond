import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import elementSerializer from "lib/respond/elementSerializer"

export function serverSerializeElementsSettler({
  respond,
}: SettlerInputType): SettlerOutputType {
  if (respond) {
    return {
      respond: {
        ...respond,
        output: elementSerializer(respond.output),
      },
    }
  }
}

export default serverSerializeElementsSettler
