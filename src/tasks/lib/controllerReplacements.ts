import { ReplacementInputType } from "../types/replacementTypes"

export function controllerReplacements({
  name,
  modelName,
  generators,
  replacements,
}: ReplacementInputType): void {
  const imports = [promiseAllImport()]
  const callAttributes = []
  const calls = []

  let viewCall = jsonViewCall()

  if (generators.includes("model")) {
    imports.push(modelImport(modelName))
    callAttributes.push(`${name}Data`)
    calls.push(modelCall(name, modelName))
    viewCall = modelViewCall(name)
  }

  if (generators.includes("style")) {
    imports.push(styleInjectorImport())
    calls.push(styleCall(name))
  }

  if (generators.includes("view")) {
    imports.push(viewImport(name))
    viewCall = viewCall || emptyViewCall(name)
  }

  replacements.push([
    viewImport(name),
    imports.sort().join("\n"),
  ])

  if (calls.length) {
    replacements.push([
      emptyViewCall(name),
      /* js */ `
        const { ${name}Data } = await promiseAll({
          ${calls.sort().join(",\n          ")},
        })
        ${viewCall}
      `
        .replace(/\n\s{6}/gm, "\n")
        .trim(),
    ])
  } else {
    replacements.push([emptyViewCall(name), viewCall])
  }
}

export function promiseAllImport(): string {
  return 'import promiseAll from "../../framework/lib/promiseAll"'
}

export function modelImport(modelName: string): string {
  return `import ${modelName}Model from "../models/${modelName}Model"`
}

export function styleInjectorImport(): string {
  return 'import styleInjector from "../../framework/lib/styleInjector"'
}

export function viewImport(name: string): string {
  return `import ${name}View from "../views/${name}View"`
}

export function modelCall(
  name: string,
  modelName: string
): string {
  return `${name}Data: ${modelName}Model({})`
}

export function styleCall(name: string): string {
  return `${name}Style: styleInjector("app/styles/${name}Style")`
}

export function emptyViewCall(name: string): string {
  return `return ${name}View({})`
}

export function jsonViewCall(): string {
  return "return JSON.stringify({})"
}

export function modelViewCall(name: string): string {
  return `return ${name}View({ ${name}Data })`
}

export default controllerReplacements
