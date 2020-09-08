import { LayoutInputType } from "../types/respond/layoutTypes"
import { LayoutOutputType } from "../types/respond/layoutTypes"
import modulesLister from "../lib/respond/modulesLister"
import modulesToEsm from "../lib/respond/modulesToEsm"
import clientScriptView from "../views/respond/clientScriptView"

export async function layoutView(
  input: LayoutInputType
): Promise<LayoutOutputType> {
  const { doc, output } = input
  const modules = modulesToEsm(await modulesLister(true))

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
        <link
          rel="stylesheet"
          href="/dist-css/styles/respond/basic.css"
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
