import { join } from "path"
import inquirer from "inquirer"
import copyFile from "./lib/copyFile"

const pathMap = {
  constructor: "constructors/exampleConstructor.ts",
  controller: "controllers/exampleController.ts",
  initializer: "initializers/exampleInitializer.ts",
  layout: "views/exampleLayoutView.tsx",
  middleware: "middleware/exampleMiddleware.ts",
  model: "models/exampleModel.ts",
  router: "routers/exampleRouter.ts",
  route: "routers/defaultRouter.ts",
  settler: "settlers/exampleSettler.ts",
  task: "tasks/exampleTask.ts",
  view: "views/exampleView.tsx",
}

export function placeholder(str: string): string {
  return `// inject ${str} here`
}

export async function generateTask(): Promise<void> {
  const {
    generators,
    modelType,
    name,
    routePath,
  } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "generators",
      default: ["controller", "model", "route", "view"],
      choices: [
        "controller",
        "model",
        "route",
        "view",
        new inquirer.Separator(),
        "constructor",
        "initializer",
        "layout",
        "middleware",
        "router",
        "settler",
        "task",
        new inquirer.Separator(),
      ],
    },
    {
      type: "input",
      name: "name",
      message: "name (camelCase)",
    },
    {
      type: "input",
      message: "route path",
      name: "routePath",
      default: "/",
      when: ({ generators }) =>
        generators.includes("router") ||
        generators.includes("route"),
    },
    {
      type: "list",
      message: "model type",
      name: "modelType",
      choices: ["universal", "server", "client"],
      when: ({ generators }) =>
        generators.includes("model"),
    },
  ])

  const hasView = generators.includes("view")
  const upperName =
    name.charAt(0).toUpperCase() + name.slice(1)

  for (const generator of generators) {
    const relPath = pathMap[generator]
    const srcPath = join(
      __dirname,
      "../../src/app",
      relPath
    )

    const modelName =
      modelType === "universal"
        ? name
        : modelType + upperName

    const upperModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1)

    const destPath = srcPath.replace(/example/, name)

    const isModel = generator === "model"

    const replacements: [string | RegExp, string][] = [
      [/example/g, isModel ? modelName : name],
      [/Example/g, isModel ? upperModelName : upperName],
    ]

    if (
      generator === "controller" &&
      generators.includes("model")
    ) {
      replacements.push([
        placeholder("imports"),
        `import ${modelName}Model from "../models/${modelName}Model"`,
      ])
      replacements.push([
        /* js */ `return ${name}View({})`,
        /* js */ `
          const ${name} = await ${modelName}Model({})
          return ${name}View({ ${name} })
        `
          .replace(/\s{2,}/gm, "\n  ")
          .trim(),
      ])
    }

    if (generator === "route") {
      replacements.push([
        placeholder("new routes"),
        `["${routePath}", "${name}"${
          hasView ? ', "layout"' : ""
        }],\n    ${placeholder("new routes")}`,
      ])
    }

    if (
      generator === "view" &&
      generators.includes("model")
    ) {
      replacements.push([
        placeholder("imports"),
        `import { ${upperModelName}ModelOutput } from "../models/${modelName}Model"`,
      ])
      replacements.push([
        placeholder("input types"),
        `${name}: ${upperModelName}ModelOutput`,
      ])
    }

    await copyFile(srcPath, destPath, replacements)
  }
}

export default generateTask
