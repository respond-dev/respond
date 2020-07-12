import { ModulesType } from "../lib/modulesLister"
import { ViewOutputType } from "../types/viewTypes"

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
      {scriptTag(modules)}
    </script>
  )
}

export function scriptTag(modules: ModulesType): string {
  const modulesJson = JSON.stringify(modules)

  return /* js */ `
    Promise.all([
      ${importCalls([
        "/dist-esm/lib/requester.mjs",
        ...modules.initializers,
        ...modules.middleware,
        ...modules.routers,
        ...modules.settlers,
      ])}
    ])
      .then(function ([{ requester }]) {
        return requester(${modulesJson}, { client: window })
      })
  `.replace(/\n\s{4}/gm, "\n")
}

export function importCalls(paths: string[]): string {
  return paths.map((path) => `import("${path}")`).join(", ")
}

export default bootScriptView
