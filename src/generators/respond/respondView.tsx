import { ViewInputType } from "pipelines/respond/types/viewTypes"
import { ViewOutputType } from "pipelines/respond/types/viewTypes"

export interface RespondViewInputType {}

export function respondView(
  input: ViewInputType & RespondViewInputType,
  id = "respond"
): ViewOutputType {
  return (
    <div id={id}>
      <h1>
        <a href="/respond">Respond</a>
      </h1>
      Rendered on{" "}
      {typeof history !== "undefined" ? "client" : "server"}
      .
    </div>
  )
}

export default respondView
