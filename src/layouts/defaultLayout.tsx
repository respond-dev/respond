import LayoutOutputType from "./layoutOutputType"

export interface DefaultLayoutInputType {
  elements: Element | Element[]
}

export function defaultLayout({
  elements,
}: DefaultLayoutInputType): LayoutOutputType {
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

export default defaultLayout
