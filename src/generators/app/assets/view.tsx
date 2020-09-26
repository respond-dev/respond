import { ViewInputType } from "types/viewTypes"
import { ViewOutputType } from "types/viewTypes"
// import { ModelOutput } from "./model"

export function view(
  input: ViewInputType, // & { modelOutput: ModelOutput },
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

export default view
