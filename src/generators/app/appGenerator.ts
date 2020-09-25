import { join } from "path"
import inquirer from "inquirer"
import fileCopier from "lib/fs/fileCopier"
import { unknownSrcDirNames } from "lib/paths/srcDirNames"

export const defaultChoices = [
  "controller.ts",
  "model.ts",
  "style.scss",
  "view.tsx",
]

export async function appGenerator(): Promise<void> {
  const unknownSrcDirs = await unknownSrcDirNames()
  const { app, generators, name } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "generators",
      message: "select app generators",
      choices: [
        { name: "controller", value: "controller.ts" },
        { name: "model", value: "model.ts" },
        { name: "style", value: "style.scss" },
        { name: "view", value: "view.tsx" },
        new inquirer.Separator(),
        { name: "layout", value: "layoutView.tsx" },
        { name: "router", value: "router.ts" },
      ],
      default: defaultChoices,
    },
    {
      type: "list",
      name: "app",
      message: "select app directory",
      choices: unknownSrcDirs,
      when: unknownSrcDirs.length > 1,
    },
    {
      type: "input",
      name: "name",
      message: "name (camelCase)",
    },
  ])

  for (const generatorBase of generators) {
    const generatorName = generatorBase.match(/[^.]+/)[0]
    const destDir = generatorName + "s"
    const newGeneratorBase = generatorBase.replace(
      /^./,
      (c: string) => name + c.toUpperCase()
    )

    await fileCopier(
      join(
        __dirname,
        "src/generators/app/assets",
        generatorBase
      ),
      join(
        __dirname,
        "src/",
        app || unknownSrcDirs[0],
        destDir,
        newGeneratorBase
      ),
      [[` ${generatorName}`, newGeneratorBase]]
    )
  }
}

export default appGenerator
