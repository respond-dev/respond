import promiseAllDefault from "../../lib/promiseAllDefault"
import {
  ControllerInputType,
  ControllerOutputType,
} from "../../types/controllerTypes"

export async function exampleController(
  input: ControllerInputType
): Promise<ControllerOutputType> {
  const { exampleView } = await promiseAllDefault({
    exampleView: import("../views/exampleView"),
  })

  return exampleView({})
}

export default exampleController
