import { join } from "path"
import { ControllerInputType } from "types/web-app/controllerTypes"
import { ControllerOutputType } from "types/web-app/controllerTypes"
import { remoteModelRouteRegex } from "pipelines/respond/routers/serverRemoteModelRouter"

export async function serverRemoteModelController(
  input: ControllerInputType & { modelsPath: string }
): Promise<ControllerOutputType> {
  const [, dirPath, modelName] = input.url.path.match(
    remoteModelRouteRegex
  )

  if (!modelName) {
    return JSON.stringify(null)
  }

  const instance = (
    await import(
      join(__dirname, "models/", dirPath, modelName)
    )
  ).default

  const output = await instance(...input.json)

  return JSON.stringify(
    !output && output !== "" ? null : output
  )
}

export default serverRemoteModelController
