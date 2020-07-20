import { ViewOutputType } from "../../types/viewTypes"

export interface ExampleViewInputType {}

export function exampleView(
  input: ExampleViewInputType,
  id = "example"
): ViewOutputType {
  return (
    <div id={id}>
      {typeof history !== "undefined" ? "client" : "server"}
    </div>
  )
}

export default exampleView
