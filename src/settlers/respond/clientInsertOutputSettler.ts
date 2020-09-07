import { SettlerInputType } from "../../types/respond/settlerTypes"
import { SettlerOutputType } from "../../types/respond/settlerTypes"

export function clientInsertOutputSettler({
  constructed,
  output,
}: SettlerInputType): SettlerOutputType {
  if (constructed || !output) {
    return
  }

  let append = false

  for (const out of output as (string | Element)[]) {
    if (typeof out === "string") {
      if (append) {
        document.body.firstElementChild.insertAdjacentHTML(
          "beforeend",
          out
        )
      } else {
        document.body.firstElementChild.innerHTML = out
      }
      append = true
    } else if (out?.nodeType) {
      if (!append) {
        document.body.firstElementChild.innerHTML = ""
      }
      document.body.firstElementChild.append(out)
      append = true
    }
  }
}

export default clientInsertOutputSettler
