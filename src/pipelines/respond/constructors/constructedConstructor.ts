import { ConstructorOutputType } from "pipelines/respond/types/constructorTypes"

export function constructedConstructor(): ConstructorOutputType {
  return { constructed: true }
}

export default constructedConstructor
