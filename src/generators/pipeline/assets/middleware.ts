import { MiddlewareInputType } from "types/respond/middlewareTypes"
import { MiddlewareOutputType } from "types/respond/middlewareTypes"

export async function middleware(
  input: MiddlewareInputType
): Promise<MiddlewareOutputType> {
  return {}
}

export default middleware
