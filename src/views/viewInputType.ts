import ControllerInputType from "../controllers/controllerInputType"
import ControllerOutputType from "../controllers/controllerOutputType"

export type ViewInputType = ControllerInputType &
  ControllerOutputType

export default ViewInputType
