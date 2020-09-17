import { PipelinePathsType } from "pipelines/lib/pipelinePaths"
import { LayoutInputType } from "types/respond/layoutTypes"
import { ViewOutputType } from "types/respond/viewTypes"

export interface ClientScriptViewInput {
  paths: PipelinePathsType
}

export function clientScriptView(
  input: ClientScriptViewInput & LayoutInputType,
  id = "clientScript"
): Promise<ViewOutputType> {
  const { paths } = input
  return (
    <script
      id={id}
      type="module"
      crossorigin="use-credentials"
    >
      {scriptTag(paths)}
    </script>
  )
}

export function scriptTag(
  paths: PipelinePathsType
): string {
  const pathsJson = JSON.stringify(paths)

  return /* js */ `
    function importMjs(path) {
      return import("/dist/esm/" + path)
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
      importMjs("/pipelines/lib/pipeline.mjs"),
      importPaths(paths)
    ])
    .then(function ([{ pipeline }]) {
      (window.onpopstate = function() {
        pipeline("respond", paths, { client: true })
      })()
    })`.replace(/^[ ]{4}/gm, "")
}

export default clientScriptView
