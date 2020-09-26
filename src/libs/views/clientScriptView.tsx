import pipelinePaths from "libs/pipelines/pipelinePaths"
import { LayoutInputType } from "types/layoutTypes"
import { ViewOutputType } from "types/viewTypes"

export async function clientScriptView(
  input: LayoutInputType,
  id = "clientScript"
): Promise<ViewOutputType> {
  return (
    <script
      id={id}
      type="module"
      crossorigin="use-credentials"
    >
      {await scriptTag()}
    </script>
  )
}

export async function scriptTag(): Promise<string> {
  const paths = await pipelinePaths("web-app", true)
  const pathsJson = JSON.stringify(paths)

  return /* js */ `
    function importMjs(path) {
      return import("/dist/esm" + path)
    }

    function importPaths(paths) {
      return Promise.all(
        Object.keys(paths).map(function(key) {
          return paths[key].map(importMjs)
        })
      )
    }

    const paths = ${pathsJson};
    
    Promise.all([
      importMjs("/libs/pipelines/pipeline.mjs"),
      importPaths(paths)
    ])
    .then(function ([{ pipeline }]) {
      (window.onpopstate = function() {
        pipeline("web-app", { paths: paths, input: { client: true } })
      })()
    })`.replace(/^[ ]{4}/gm, "")
}

export default clientScriptView
