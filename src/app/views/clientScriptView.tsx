import { ModulesType } from "../../framework/lib/modulesLister"
import { ViewOutputType } from "../types/viewTypes"

export function clientScriptView(
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
        "/dist-esm/framework/lib/requester.mjs",
        "/dist-esm/framework/lib/remoteCaller.mjs",
        ...modules.constructors,
        ...modules.initializers,
        ...modules.middleware,
        ...modules.routers,
        ...modules.settlers,
      ])}
    ])
      .then(function ([{ requester }]) {
        const modules = ${modulesJson};
        window.onpopstate = function() {
          requester(modules, { client: window })
        }
        return requester(modules, { client: window })
      })
  `.replace(/\n\s{4}/gm, "\n")
}

export function importCalls(paths: string[]): string {
  return paths.map((path) => `import("${path}")`).join(", ")
}

export default clientScriptView
