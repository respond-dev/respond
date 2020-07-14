import { join } from "path"
import inquirer from "inquirer"
import { copyFile } from "../lib/copyFile"

export async function generateTask(): Promise<void> {
  const { generators, name } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "generators",
      default: [
        "controllers/exampleController.ts",
        "routers/exampleRouter.ts",
        "views/exampleView.tsx",
      ],
      choices: [
        {
          name: "controller",
          value: "controllers/exampleController.ts",
        },
        {
          name: "router",
          value: "routers/exampleRouter.ts",
        },
        {
          name: "view",
          value: "views/exampleView.tsx",
        },
        new inquirer.Separator(),
        {
          name: "constructor",
          value: "constructors/exampleConstructor.ts",
        },
        {
          name: "initializer",
          value: "initializers/exampleInitializer.ts",
        },
        {
          name: "middleware",
          value: "middleware/exampleMiddleware.ts",
        },
        {
          name: "settler",
          value: "settlers/exampleSettler.ts",
        },
        {
          name: "task",
          value: "tasks/exampleTask.ts",
        },
        {
          name: "view (layout)",
          value: "views/exampleLayoutView.tsx",
        },
        new inquirer.Separator(),
      ],
    },
    {
      type: "input",
      name: "name",
      message: "name (camelCase)",
    },
  ])

  for (const relPath of generators) {
    const srcPath = join(__dirname, "../../src", relPath)
    const destPath = srcPath.replace(/example/, name)

    await copyFile(srcPath, destPath, [
      [/example/g, name],
      [
        /Example/g,
        name.charAt(0).toUpperCase() + name.slice(1),
      ],
    ])
  }
}

export default generateTask
