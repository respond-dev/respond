import { join } from "path"
import { ControllerInputType } from "../../framework/types/controllerTypes"
import { ControllerOutputType } from "../../framework/types/controllerTypes"

export const remoteCallerRoute = /\/remote\/([^\.]+).json/

export async function remoteCallerController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  const [, modelName] = input.url.path.match(
    remoteCallerRoute
  )

  const instance = (
    await import(join("../../app/models", modelName))
  ).default

  const output = await instance(...input.json)

  return JSON.stringify(
    !output && output !== "" ? null : output
  )
}

export default remoteCallerController
