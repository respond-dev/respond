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
  const {
    app,
    generators,
    genName,
  } = await inquirer.prompt([
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
      name: "genName",
      message: "name (camelCase)",
    },
  ])

  const replacements = []

  const names = generators.map((base: string) => {
    const name = base.match(/[^.]+/)[0]
    const pluralName = name + "s"

    const replacer = (c: string) =>
      genName + c.toUpperCase()

    const newName = name.replace(/^./, replacer)
    const newBase = base.replace(/^./, replacer)

    replacements.push([
      new RegExp(" " + name, "g"),
      " " + newName,
    ])

    replacements.push([
      new RegExp("/" + name + '"', "g"),
      "./" + pluralName + "/" + newName + '"',
    ])

    return { base, name, newName, newBase, pluralName }
  })

  for (const name of names) {
    await fileCopier(
      join(
        __dirname,
        "src/generators/app/assets",
        name.base
      ),
      join(
        __dirname,
        "src/",
        app || unknownSrcDirs[0],
        name.pluralName,
        name.newBase
      ),
      replacements
    )
  }
}

export default appGenerator
