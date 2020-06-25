import MiddlewareInputType from "../middleware/middlewareInputType"
import MiddlewareOutputType from "../middleware/middlewareOutputType"

export type RouterInputType = MiddlewareInputType &
  MiddlewareOutputType

export default RouterInputType
