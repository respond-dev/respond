import modulesLister from "pipelines/respond/lib/modulesLister"
import modulesToEsm from "pipelines/respond/lib/modulesToEsm"
import { LayoutInputType } from "pipelines/respond/types/layoutTypes"
import { LayoutOutputType } from "pipelines/respond/types/layoutTypes"
import clientScriptView from "views/respond/clientScriptView"

export async function respondLayoutView(
  input: LayoutInputType
): Promise<LayoutOutputType> {
  const { output } = input
  const modules = modulesToEsm({
    ...(await modulesLister(true)),
  })

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content={[
            "user-scalable=0",
            "initial-scale=1",
            "minimum-scale=1",
            "width=device-width",
            "height=device-height",
          ].join(",")}
        />
        <link rel="icon" href="data:," />
      </head>
      <body>
        {output}
        {clientScriptView({ ...input, modules })}
      </body>
    </html>
  )
}

export default respondLayoutView
