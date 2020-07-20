import { join } from "path"
import inquirer from "inquirer"
import controllerBodyBuilder from "./lib/controllerBodyBuilder"
import copyFile from "../lib/copyFile"

const injectionPlaceholder =
  "// injection placeholder (don't delete)"

const pathMap = {
  constructor: "constructors/exampleConstructor.ts",
  controller: "controllers/exampleController.ts",
  initializer: "initializers/exampleInitializer.ts",
  "layout view": "views/exampleLayoutView.tsx",
  middleware: "middleware/exampleMiddleware.ts",
  model: "models/exampleModel.ts",
  router: "routers/exampleRouter.ts",
  "router entry": "routers/defaultRouter.ts",
  settler: "settlers/exampleSettler.ts",
  task: "tasks/exampleTask.ts",
  view: "views/exampleView.tsx",
}

export async function generateTask(): Promise<void> {
  const { generators, name } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "generators",
      default: [
        "controller",
        "model",
        "router entry",
        "view",
      ],
      choices: [
        { name: "controller" },
        { name: "model" },
        { name: "router entry" },
        { name: "view" },
        new inquirer.Separator(),
        { name: "constructor" },
        { name: "initializer" },
        { name: "layout view" },
        { name: "middleware" },
        { name: "router" },
        { name: "settler" },
        { name: "task" },
        new inquirer.Separator(),
      ],
    },
    {
      type: "input",
      name: "name",
      message: "name (camelCase)",
    },
  ])

  const hasView = generators.includes("view")

  for (const generator of generators) {
    const relPath = pathMap[generator]
    const srcPath = join(__dirname, "../../src", relPath)
    const destPath = srcPath.replace(/example/, name)

    const replacements: [string | RegExp, string][] = [
      [/example/g, name],
      [
        /Example/g,
        name.charAt(0).toUpperCase() + name.slice(1),
      ],
    ]

    if (generator === "controller") {
      replacements.push([
        /  const (.*\n){5}/gm,
        controllerBodyBuilder(generators, name),
      ])
    }

    if (generator === "router entry") {
      replacements.push([
        injectionPlaceholder,
        `["/", "${name}"${
          hasView ? ', "layout"' : ""
        }],\n    ${injectionPlaceholder}`,
      ])
    }

    await copyFile(srcPath, destPath, replacements)
  }
}

export default generateTask
