import InitializerInputType from "../initializers/initializerInputType"
import InitializerOutputType from "../initializers/initializerOutputType"

export type MiddlewareInputType = InitializerInputType &
  InitializerOutputType

export default MiddlewareInputType
