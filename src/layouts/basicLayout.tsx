import modulesLister from "../lib/modulesLister"
import modulesToEsm from "../lib/modulesToEsm"
import {
  LayoutInputType,
  LayoutOutputType,
} from "../types/layoutTypes"
import bootScriptView from "../views/bootScriptView"

export async function basicLayout({
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
        {bootScriptView(clientModules)}
      </body>
    </html>
  )
}

export default basicLayout
