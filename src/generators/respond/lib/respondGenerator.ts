import { join } from "path"
import inquirer from "inquirer"
import fileCopier from "generators/lib/fileCopier"
import { ReplacementOutputType } from "generators/lib/fileCopier"
import controllerReplacements from "./controllerReplacements"
import routeReplacements from "./routeReplacements"
import viewReplacements from "./viewReplacements"

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

  const srcDirPath = join(__dirname, "generators/../")
  const routerPath = join(srcDirPath, "routers/router.ts")
  const generatorsPath = join(
    srcDirPath,
    "generators/respond"
  )

  for (const generator of generators) {
    const relPath = pathMap[generator]
    const basename = relPath.split("/")[1]

    const isController = generator === "controller"
    const isModel = generator === "model"
    const isRoute = generator === "route"
    const isTask = generator === "task"
    const isView = generator === "view"

    const srcPath = isRoute
      ? routerPath
      : join(generatorsPath, basename)

    const modelName =
      modelType === "universal"
        ? name
        : modelType + upperName

    const upperModelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1)

    const destPath = join(
      srcDirPath,
      relPath.replace(/respond/, isModel ? modelName : name)
    )

    const replacements: ReplacementOutputType = [
      [/\.\.\/\.\.\//g, "../"],
      [/\"\/respond\"/g, `"${routePath}"`],
      [/respond/g, isModel ? modelName : name],
      [
        new RegExp(
          "/" + (isModel ? modelName : name) + "/",
          "g"
        ),
        "/respond/",
      ],
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

    if (isController) {
      controllerReplacements(replacementInput)
    }

    if (isRoute) {
      routeReplacements(replacementInput)
    }

    if (isTask) {
      // eslint-disable-next-line no-console
      console.log(
        `🍏 Run \`./bin/task ${name}\` to try your new task.`
      )
    }

    if (isView) {
      viewReplacements(replacementInput)
    }

    await fileCopier(srcPath, destPath, replacements)
  }
}

export default generateTask
