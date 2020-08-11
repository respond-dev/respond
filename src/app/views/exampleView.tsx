import { ViewOutputType } from "../types/viewTypes"

export interface ExampleViewInputType {}

export function exampleView(
  input: ExampleViewInputType,
  id = "example"
): ViewOutputType {
  return (
    <div id={id}>
      <h1>
        <a href="/example">Example</a>
      </h1>
      Rendered on{" "}
      {typeof history !== "undefined" ? "client" : "server"}
      .
    </div>
  )
}

export default exampleView
