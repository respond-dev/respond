import modulesLister from "../lib/modulesLister"
import {
  LayoutInputType,
  LayoutOutputType,
} from "../types/layoutTypes"
import bootScriptView from "../views/bootScriptView"

export async function serverLayout({
  elements,
  routeModules,
}: LayoutInputType): Promise<LayoutOutputType> {
  const clientModules = {
    ...(await modulesLister(true)),
    layouts: [],
    routes: routeModules,
  }

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
        {elements}
        {bootScriptView(clientModules)}
      </body>
    </html>
  )
}

export default serverLayout
