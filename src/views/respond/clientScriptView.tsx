import { ModulesType } from "pipelines/respond/lib/modulesLister"
import { LayoutInputType } from "pipelines/respond/types/layoutTypes"
import { ViewOutputType } from "pipelines/respond/types/viewTypes"

export interface ClientScriptViewInput {
  modules: ModulesType
}

export function clientScriptView(
  input: ClientScriptViewInput & LayoutInputType,
  id = "clientScript"
): Promise<ViewOutputType> {
  const { modules } = input
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
    const modules = ${modulesJson};

    function importPaths(paths) {
      return Promise.all(paths.map(function(path) {
        return import("/dist/esm/" + path)
      }))
    }
    
    Promise.all([
      importPaths([
        "/lib/respond/requester.mjs",
        "/lib/respond/remoteModelRequester.mjs"
      ]),
      importPaths(modules.constructors),
      importPaths(modules.initializers),
      importPaths(modules.middleware),
      importPaths(modules.routers),
      importPaths(modules.settlers),
    ])
    .then(function ([[{ requester }]]) {
      (window.onpopstate = function() {
        requester(modules, { client: true })
      })()
    })`.replace(/^[ ]{4}/gm, "")
}

export default clientScriptView
