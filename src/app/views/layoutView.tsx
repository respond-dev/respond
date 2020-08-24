import { LayoutInputType } from "../types/layoutTypes"
import { LayoutOutputType } from "../types/layoutTypes"
import modulesLister from "../../framework/lib/modulesLister"
import modulesToEsm from "../../framework/lib/modulesToEsm"
import clientScriptView from "../views/clientScriptView"

export async function layoutView(
  input: LayoutInputType
): Promise<LayoutOutputType> {
  const { doc, output } = input
  const modules = modulesToEsm({
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
        <link
          rel="stylesheet"
          href="/dist-css/framework/styles/basic.css"
          type="text/css"
        />
        {doc.head.childNodes}
      </head>
      <body>
        <main>
          {output}
          {clientScriptView({ ...input, modules })}
        </main>
      </body>
    </html>
  )
}

export default layoutView
