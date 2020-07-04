import { ModulesType } from "../lib/modulesLister"
import ViewOutputType from "./viewOutputType"

export function bootScript(modules: ModulesType): string {
  const modulesJson = JSON.stringify(modules)

  return /* js */ `
    import("/dist-esm/lib/requester.mjs")
      .then(function (requester) {
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
