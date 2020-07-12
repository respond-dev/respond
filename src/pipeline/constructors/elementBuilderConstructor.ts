import promiseAllDefault from "../lib/promiseAllDefault"
import { ConstructorInputType } from "../types/constructorTypes"

export async function elementBuilderConstructor({
  client,
}: ConstructorInputType): Promise<void> {
  const { elementBuilder } = await promiseAllDefault({
    elementBuilder: import("../lib/elementBuilder"),
  })

  if (client) {
    window["elementBuilder"] = elementBuilder
  } else {
    global["window"] = global["window"] || ({} as any)
    global["window"]["elementBuilder"] = elementBuilder
  }
}

export default elementBuilderConstructor
