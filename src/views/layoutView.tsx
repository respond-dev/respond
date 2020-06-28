import ViewOutputType from "./viewOutputType"

export interface LayoutViewInputType {
  client: boolean
  elements: Element | Element[]
}

export function layoutView({
  client,
  elements,
}: LayoutViewInputType): ViewOutputType {
  if (client) {
    return elements
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
      <body>{elements}</body>
    </html>
  )
}

export default layoutView
