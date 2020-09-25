import { join } from "path"
import inquirer from "inquirer"
import { deepDirectoryLister } from "lib/fs/directoryLister"

const generatorRegex = /([a-zA-Z]+)Generator\.js$/

export async function generator(): Promise<void> {
  const { filePaths } = await deepDirectoryLister(
    join(__dirname, "dist/cjs/generators/"),
    generatorRegex
  )

  const files = filePaths.reduce((memo, path) => {
    const name = path.match(generatorRegex)[1]
    memo[name] = path
    return memo
  }, {})

  const { generator } = await inquirer.prompt([
    {
      type: "list",
      name: "generator",
      message: "pick a generator",
      choices: Object.keys(files).sort(),
    },
  ])

  await (await import(files[generator])).default()
}

export default generator
