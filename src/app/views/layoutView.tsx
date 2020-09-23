import { LayoutInputType } from "types/layoutTypes"
import { LayoutOutputType } from "types/layoutTypes"
import clientScriptView from "lib/views/clientScriptView"

export async function layoutView(
  input: LayoutInputType
): Promise<LayoutOutputType> {
  const { body, doc } = input

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
          href="/dist/css/lib/styles/layoutStyle.css"
          type="text/css"
        />
        {doc.head.childNodes}
      </head>
      <body>
        <main>
          {body}
          {await clientScriptView(input)}
        </main>
      </body>
    </html>
  )
}

export default layoutView
