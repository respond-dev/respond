export function controllerBodyBuilder(
  generators: string[],
  name: string
): string {
  const imports = []
  const variables = []
  let returns = '""'

  for (const generator of generators) {
    if (generator === "view") {
      variables.push(`${name}View`)
      imports.push(
        `${name}View: import("../views/${name}View"),`
      )
      returns = `${name}View({})`
    }
  }

  return /* typescript */ `
  const { ${variables.join(
    ", "
  )} } = await promiseAllDefault({
    ${imports.join("\n    ")}
  })

  return ${returns}
  `
}

export default controllerBodyBuilder
