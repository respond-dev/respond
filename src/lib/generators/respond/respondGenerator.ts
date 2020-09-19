import { join } from "path"
import inquirer from "inquirer"
import fileCopier from "lib/fs/fileCopier"
import { ReplacementOutputType } from "lib/fs/fileCopier"
import controllerReplacements from "./controllerReplacements"
import routeReplacements from "./routeReplacements"
import viewReplacements from "./viewReplacements"

const pathMap = {
  constructor: "constructors/respondConstructor.ts",
  initializer: "initializers/respondInitializer.ts",
  middleware: "middleware/respondMiddleware.ts",
  settler: "settlers/respondSettler.ts",
}

export async function respondGenerator(): Promise<void> {
  const {
    generators,
    modelType,
    name,
    routePath,
  } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "generators",
      choices: [
        "constructor",
        "initializer",
        "middleware",
        "settler",
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

  const srcDirPath = join(__dirname, "src/")
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

export default respondGenerator
