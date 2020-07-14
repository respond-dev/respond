import {
  MiddlewareInputType,
  MiddlewareOutputType,
} from "../pipeline/types/middlewareTypes"

export async function exampleMiddleware(
  input: MiddlewareInputType
): Promise<MiddlewareOutputType> {
  return {}
}

export default exampleMiddleware
