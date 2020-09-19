import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"

export function serverRespondSettler({
  respond,
}: SettlerInputType): SettlerOutputType {
  if (!respond) {
    return { respond: { httpCode: 404 } }
  }
}

export default serverRespondSettler
