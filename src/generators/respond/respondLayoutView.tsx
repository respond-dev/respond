import pipelinePaths from "lib/pipelines/pipelinePaths"
import { LayoutInputType } from "types/layoutTypes"
import { LayoutOutputType } from "types/layoutTypes"
import clientScriptView from "views/respond/clientScriptView"

export async function respondLayoutView(
  input: LayoutInputType
): Promise<LayoutOutputType> {
  const { output } = input
  const paths = await pipelinePaths("respond", true)

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
        {clientScriptView({ ...input, paths })}
      </body>
    </html>
  )
}

export default respondLayoutView
