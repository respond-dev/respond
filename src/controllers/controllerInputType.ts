import MiddlewareInputType from "../middleware/middlewareInputType"
import MiddlewareOutputType from "../middleware/middlewareOutputType"

export type ControllerInputType = MiddlewareInputType &
  MiddlewareOutputType

export default ControllerInputType
