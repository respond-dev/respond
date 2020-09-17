import { ReplacementInputType } from "lib/fs/fileCopier"

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
    callAttributes.push(`${name}ModelOutput`)
    calls.push(modelCall(name, modelName))
    viewCall = viewCall || modelJsonViewCall(name)
  }

  if (generators.includes("style")) {
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
    generatorViewImport(name),
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
  return 'import promiseAll from "pipelines/respond/lib/promiseAll"'
}

export function modelImport(modelName: string): string {
  return `import ${modelName}Model from "../models/${modelName}Model"`
}

export function styleInjectorImport(): string {
  return 'import styleInjector from "pipelines/respond/lib/styleInjector"'
}

export function generatorViewImport(name: string): string {
  return `import ${name}View from "./${name}View"`
}

export function viewImport(name: string): string {
  return `import ${name}View from "../views/${name}View"`
}

export function modelCall(
  name: string,
  modelName: string
): string {
  return `${name}ModelOutput: ${modelName}Model({})`
}

export function styleCall(name: string): string {
  return `${name}Style: input.css("styles/${name}Style")`
}

export function emptyViewCall(name: string): string {
  return `return ${name}View(input)`
}

export function jsonViewCall(): string {
  return "return JSON.stringify({})"
}

export function modelJsonViewCall(name: string): string {
  return `return JSON.stringify(${name}ModelOutput)`
}

export function modelViewCall(name: string): string {
  return `return ${name}View({ ...input, ${name}ModelOutput })`
}

export default controllerReplacements
