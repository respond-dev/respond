import { join } from "path"
import { ControllerInputType } from "pipelines/respond/types/controllerTypes"
import { ControllerOutputType } from "pipelines/respond/types/controllerTypes"

export const remoteModelRouteRegex = /\/remote\/([a-zA-Z\/]*)(server[a-zA-Z]+).json/

export const remoteModelRoute = {
  matcher: remoteModelRouteRegex,
  controller: "respond/remoteModel",
  extraInput: { modelsPath: "models" },
}

export async function remoteModelController(
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
      join("../../", input.modelsPath, dirPath, modelName)
    )
  ).default

  const output = await instance(...input.json)

  return JSON.stringify(
    !output && output !== "" ? null : output
  )
}

export default remoteModelController
