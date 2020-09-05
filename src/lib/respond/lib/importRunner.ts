export async function importRunner(
  paths: string[],
  arg: unknown
): Promise<[any[], (Element | string)[]]> {
  const isBrowser = typeof history !== "undefined"

  const objects = []
  let outputs = []

  await Promise.all(
    paths.map(
      async (path): Promise<void> => {
        const importPath = isBrowser
          ? path
          : __dirname + "/../../../.." + path

        const { default: fn } = await import(importPath)

        if (typeof fn === "function") {
          const obj = await fn(arg)

          if (typeof obj === "object" && obj !== null) {
            const { output } = obj

            objects.push(obj)

            if (output) {
              outputs = outputs.concat(output)
            }
          }
        }
      }
    )
  )

  return [objects, outputs]
}

export default importRunner
