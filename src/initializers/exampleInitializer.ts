import {
  InitializerInputType,
  InitializerOutputType,
} from "../pipeline/types/initializerTypes"

export async function exampleInitializer(
  input: InitializerInputType
): Promise<InitializerOutputType> {
  return {}
}

export default exampleInitializer
