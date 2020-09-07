import { ReplacementInputType } from "../types/replacementTypes"

export function controllerReplacements({
  name,
  modelName,
  generators,
  replacements,
}: ReplacementInputType): void {
  const frameworkImports = [promiseAllImport()]
  const appImports = []
  const callAttributes = []
  const calls = []

  let viewCall: string

  if (
    generators.includes("model") &&
    generators.includes("view")
  ) {
    viewCall = modelViewCall(name)
  }

  if (generators.includes("model")) {
    appImports.push(modelImport(modelName))
    callAttributes.push(`${name}Data`)
    calls.push(modelCall(name, modelName))
    viewCall = viewCall || modelJsonViewCall(name)
  }

  if (generators.includes("style")) {
    frameworkImports.push(styleInjectorImport())
    calls.push(styleCall(name))
  }

  if (generators.includes("view")) {
    appImports.push(viewImport(name))
    viewCall = viewCall || emptyViewCall(name)
  }

  if (!viewCall) {
    frameworkImports.shift()
    viewCall = jsonViewCall()
  }

  replacements.push([
    viewImport(name),
    [...frameworkImports.sort(), ...appImports.sort()].join(
      "\n"
    ),
  ])

  if (calls.length) {
    const callsStr = calls.sort().join(",\n          ")

    let attrStr = ""

    if (callAttributes.length) {
      attrStr = `const { ${callAttributes.join(", ")} } = `
    }

    replacements.push([
      emptyViewCall(name),
      /* js */ `
        ${attrStr}await promiseAll({
          ${callsStr},
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
  return 'import promiseAll from "../../lib/respond/promiseAll"'
}

export function modelImport(modelName: string): string {
  return `import ${modelName}Model from "../models/${modelName}Model"`
}

export function styleInjectorImport(): string {
  return 'import styleInjector from "../../lib/respond/styleInjector"'
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
  return `${name}Style: input.css("app/styles/${name}Style")`
}

export function emptyViewCall(name: string): string {
  return `return ${name}View(input)`
}

export function jsonViewCall(): string {
  return "return JSON.stringify({})"
}

export function modelJsonViewCall(name: string): string {
  return `return JSON.stringify(${name}Data)`
}

export function modelViewCall(name: string): string {
  return `return ${name}View({ ...input, ${name}Data })`
}

export default controllerReplacements
