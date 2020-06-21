import MiddlewareOutputType from "../middleware/middlewareOutputType"
import InitializerInputType from "../initializers/initializerInputType"
import InitializerOutputType from "../initializers/initializerOutputType"

export type RouterInputType = InitializerInputType &
  InitializerOutputType &
  MiddlewareOutputType

export default RouterInputType
