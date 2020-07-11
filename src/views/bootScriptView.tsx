import { ModulesType } from "../lib/modulesLister"
import { ViewOutputType } from "../types/viewTypes"

export function bootScript(modules: ModulesType): string {
  const modulesJson = JSON.stringify(modules)
  const joinStr = '"),\n  import("'

  return /* js */ `
    Promise.all([
      import("/dist-esm/lib/requester.mjs"),
      import("${modules.initializers.join(joinStr)}"),
      import("${modules.middleware.join(joinStr)}"),
      import("${modules.routes.join(joinStr)}"),
      import("${modules.finalizers.join(joinStr)}")
    ])
      .then(function ([{ requester }]) {
        return requester(${modulesJson}, { client: window })
      })
  `.replace(/\n\s{4}/gm, "\n")
}

export function bootScriptView(
  modules: ModulesType,
  id = "clientScript"
): Promise<ViewOutputType> {
  return (
    <script
      id={id}
      type="module"
      crossorigin="use-credentials"
    >
      {bootScript(modules)}
    </script>
  )
}

export default bootScriptView
