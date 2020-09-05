import { join } from "path"
import inquirer from "inquirer"
import copyFile from "./lib/copyFile"
import { ReplacementOutputType } from "./types/replacementTypes"
import controllerReplacements from "./lib/controllerReplacements"
import routeReplacements from "./lib/routeReplacements"
import viewReplacements from "./lib/viewReplacements"

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
  style: "styles/exampleStyle.scss",
  task: "tasks/exampleTask.ts",
  view: "views/exampleView.tsx",
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
      default: [
        "controller",
        "model",
        "route",
        "style",
        "view",
      ],
      choices: [
        "controller",
        "model",
        "route",
        "style",
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
      default: "home",
    },
    {
      type: "input",
      message: "route path",
      name: "routePath",
      default: "/",
      when: ({ generators }) =>
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

  const upperName =
    name.charAt(0).toUpperCase() + name.slice(1)

  for (const generator of generators) {
    const relPath = pathMap[generator]
    const srcPath = join(
      __dirname,
      "../../../../src/app",
      relPath
    )

    const isModel = generator === "model"

    const modelName =
      modelType === "universal"
        ? name
        : modelType + upperName

    const upperModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1)

    const destPath = srcPath.replace(
      /example/,
      isModel ? modelName : name
    )

    const replacements: ReplacementOutputType = [
      [/\"\/example\"/g, `"${routePath}"`],
      [/example/g, isModel ? modelName : name],
      [/Example/g, isModel ? upperModelName : upperName],
    ]

    const replacementInput = {
      name,
      upperName,
      generators,
      modelName,
      upperModelName,
      replacements,
      routePath,
    }

    if (generator === "controller") {
      controllerReplacements(replacementInput)
    }

    if (generator === "route") {
      routeReplacements(replacementInput)
    }

    if (generator === "view") {
      viewReplacements(replacementInput)
    }

    await copyFile(srcPath, destPath, replacements)
  }
}

export default generateTask
