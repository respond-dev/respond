import { ViewOutputType } from "../types/viewTypes"
// inject imports here

export interface ExampleViewInputType {
  // inject input types here
}

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
