export function controllerBodyBuilder(
  generators: string[],
  name: string
): string {
  const imports = []
  const variables = []

  let body = ""
  let returns = "JSON.stringify({})"

  for (const generator of generators) {
    if (generator === "model") {
      variables.push(`${name}Model`)
      imports.push(
        `${name}Model: import("../models/${name}Model"),`
      )
      body += `\n  const ${name} = await ${name}Model({})\n  `
    }

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
  ${body}
  return ${returns}
  `
}

export default controllerBodyBuilder
