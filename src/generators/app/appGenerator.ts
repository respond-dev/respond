import { join } from "path"
import inquirer from "inquirer"
import fileCopier from "libs/fs/fileCopier"
import { generatorAssetReplacements } from "libs/fs/fileCopierReplacements"
import { uncommentReplacement } from "libs/fs/fileCopierReplacements"
import { removeViewReplacement } from "libs/fs/fileCopierReplacements"
import { removeCommentsReplacement } from "libs/fs/fileCopierReplacements"
import appDirNames from "libs/paths/appDirNames"

export async function appGenerator(): Promise<void> {
  const apps = await appDirNames()
  const answers = await inquirer.prompt([
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
        { name: "layoutView", value: "layoutView.tsx" },
        { name: "router", value: "router.ts" },
      ],
      default: [
        "controller.ts",
        "model.ts",
        "style.scss",
        "view.tsx",
      ],
    },
    {
      type: "list",
      name: "app",
      message: "select app directory",
      choices: apps,
      when: apps.length > 1,
    },
    {
      type: "input",
      name: "controller",
      message: "camelCase controller name",
      when: (a) => !!a.generators.includes("controller.ts"),
    },
    {
      type: "input",
      name: "model",
      message: "camelCase model name",
      default: (a) => a.controller,
      when: (a) => !!a.generators.includes("model.ts"),
    },
    {
      type: "input",
      name: "style",
      message: "camelCase style name",
      default: (a) => a.controller,
      when: (a) => !!a.generators.includes("style.scss"),
    },
    {
      type: "input",
      name: "view",
      message: "camelCase view name",
      default: (a) => a.controller,
      when: (a) => !!a.generators.includes("view.tsx"),
    },
    {
      type: "input",
      name: "layoutView",
      message: "camelCase layout view name",
      default: (a) => a.view,
      when: (a) =>
        !!a.generators.includes("layoutView.tsx"),
    },
    {
      type: "input",
      name: "router",
      message: "camelCase router name",
      default: (a) => a.controller,
      when: (a) => !!a.generators.includes("router.ts"),
    },
  ])

  const { app, generators } = answers
  let replacements = []

  const names = generators.map((base: string) => {
    const name = base.match(/[^.]+/)[0]
    const pluralName =
      (name === "layoutView" ? "view" : name) + "s"

    const replacer = (c: string) =>
      answers[name] + c.toUpperCase()

    const newName = name.replace(/^./, replacer)
    const newBase = base.replace(/^./, replacer)

    replacements = replacements.concat(
      generatorAssetReplacements(name, newName, pluralName)
    )

    return { base, name, newName, newBase, pluralName }
  })

  for (const name of names) {
    let replace = replacements

    if (name.name === "controller") {
      const viewName = names.find(
        ({ name }) => name === "view"
      )

      replace = replace.concat(
        generators.includes("model.ts")
          ? [
              uncommentReplacement,
              removeViewReplacement(viewName.newName),
            ]
          : [removeCommentsReplacement]
      )
    }

    if (name.name === "view") {
      replace = replace.concat([
        generators.includes("model.ts")
          ? uncommentReplacement
          : removeCommentsReplacement,
      ])
    }

    await fileCopier(
      join(
        __dirname,
        "src/generators/app/assets",
        name.base
      ),
      join(
        __dirname,
        "src/apps",
        app || apps[0],
        name.pluralName,
        name.newBase
      ),
      replace
    )
  }
}

export default appGenerator
