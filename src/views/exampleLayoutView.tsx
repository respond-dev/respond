import modulesLister from "../pipeline/lib/modulesLister"
import modulesToEsm from "../lib/modulesToEsm"
import {
  LayoutInputType,
  LayoutOutputType,
} from "../types/layoutTypes"
import clientScriptView from "../views/clientScriptView"

export async function exampleLayoutView({
  output,
}: LayoutInputType): Promise<LayoutOutputType> {
  const clientModules = modulesToEsm({
    ...(await modulesLister(true)),
  })

  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
        <link rel="icon" href="data:," />
      </head>
      <body>
        {output}
        {clientScriptView(clientModules)}
      </body>
    </html>
  )
}

export default exampleLayoutView
