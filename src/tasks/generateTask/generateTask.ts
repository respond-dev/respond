import { join } from "path"
import inquirer from "inquirer"
import srcNames from "libs/srcNames/srcNames"

export interface GenerateTaskAnswers {
  srcDirName: string
}

export async function generateTask(): Promise<void> {
  const srcs = await srcNames()

  const {
    srcDirName,
  }: GenerateTaskAnswers = await inquirer.prompt([
    {
      type: "list",
      name: "srcDirName",
      message: "source directory",
      choices: srcs,
    },
  ])

  const srcName = srcDirName.slice(0, -1)

  await (
    await import(
      join(
        __dirname,
        "generators/",
        srcName,
        `${srcName}Generator`
      )
    )
  ).default()
}

export default generateTask
