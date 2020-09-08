import { join } from "path"
import inquirer from "inquirer"
import copyFile from "./copyFile"
import controllerReplacements from "./controllerReplacements"
import routeReplacements from "./routeReplacements"
import viewReplacements from "./viewReplacements"
import { ReplacementOutputType } from "../types/replacementTypes"

const pathMap = {
  constructor: "constructors/respondConstructor.ts",
  controller: "controllers/respondController.ts",
  initializer: "initializers/respondInitializer.ts",
  layout: "views/respondLayoutView.tsx",
  middleware: "middleware/respondMiddleware.ts",
  model: "models/respondModel.ts",
  router: "routers/respondRouter.ts",
  route: "routers/router.ts",
  settler: "settlers/respondSettler.ts",
  style: "styles/respondStyle.scss",
  task: "tasks/respondTask.ts",
  view: "views/respondView.tsx",
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
    const srcPath = join(__dirname, "../../", relPath)

    const isModel = generator === "model"

    const modelName =
      modelType === "universal"
        ? name
        : modelType + upperName

    const upperModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1)

    const destPath = srcPath.replace(
      /respond/,
      isModel ? modelName : name
    )

    const replacements: ReplacementOutputType = [
      [/\"\/respond\"/g, `"${routePath}"`],
      [/respond/g, isModel ? modelName : name],
      [/Respond/g, isModel ? upperModelName : upperName],
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
