import { LayoutInputType } from "../../framework/types/layoutTypes"
import { LayoutOutputType } from "../../framework/types/layoutTypes"
import modulesLister from "../../framework/lib/modulesLister"
import modulesToEsm from "../../framework/lib/modulesToEsm"
import clientScriptView from "../../framework/views/clientScriptView"

export async function exampleLayoutView(
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

export default exampleLayoutView
