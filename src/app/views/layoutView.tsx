import { LayoutInputType } from "../../lib/respond/types/layoutTypes"
import { LayoutOutputType } from "../../lib/respond/types/layoutTypes"
import modulesLister from "../../lib/respond/lib/modulesLister"
import modulesToEsm from "../../lib/respond/lib/modulesToEsm"
import clientScriptView from "../../lib/respond/views/clientScriptView"

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
          href="/dist-css/lib/respond/styles/basic.css"
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
