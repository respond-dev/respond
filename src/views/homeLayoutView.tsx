import { LayoutInputType } from "../types/respond/layoutTypes"
import { LayoutOutputType } from "../types/respond/layoutTypes"
import modulesLister from "../lib/respond/modulesLister"
import modulesToEsm from "../lib/respond/modulesToEsm"
import clientScriptView from "../views/respond/clientScriptView"

export async function homeLayoutView(
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

export default homeLayoutView
