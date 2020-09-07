import { join } from "path"
import { remoteModelRouteRegex } from "../../lib/respond/remoteModelRoute"
import { ControllerInputType } from "../../types/respond/controllerTypes"
import { ControllerOutputType } from "../../types/respond/controllerTypes"

export async function remoteModelController(
  input: ControllerInputType & { modelsPath: string }
): Promise<ControllerOutputType> {
  const [, modelName] = input.url.path.match(
    remoteModelRouteRegex
  )

  const instance = (
    await import(
      join("../../", input.modelsPath, modelName)
    )
  ).default

  const output = await instance(...input.json)

  return JSON.stringify(
    !output && output !== "" ? null : output
  )
}

export default remoteModelController
