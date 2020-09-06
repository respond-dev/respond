import { join } from "path"
import { remoteModelRouteRegex } from "../lib/remoteModelRoute"
import { ControllerInputType } from "../types/controllerTypes"
import { ControllerOutputType } from "../types/controllerTypes"

export async function remoteModelController(
  input: ControllerInputType & { modelsPath: string }
): Promise<ControllerOutputType> {
  const [, modelName] = input.url.path.match(
    remoteModelRouteRegex
  )

  const instance = (
    await import(
      join("../../../", input.modelsPath, modelName)
    )
  ).default

  const output = await instance(...input.json)

  return JSON.stringify(
    !output && output !== "" ? null : output
  )
}

export default remoteModelController
