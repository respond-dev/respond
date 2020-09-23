import { basename, join } from "path"
import inquirer from "inquirer"
import directoryLister from "lib/fs/directoryLister"
import fileCopier from "lib/fs/fileCopier"

const outputDirectories = {
  controller: "src/controllers",
  model: "src/models",
  style: "src/styles",
  view: "src/views",
}

export async function generator(): Promise<void> {
  const { filePaths, dirPaths } = await directoryLister(
    join(__dirname, "src/generators/")
  )

  const files = filePaths.reduce((memo, path) => {
    memo["⚙️  " + path.match(/\/([^\/\.]+)\./)[1]] = path
    return memo
  }, {})

  const dirs = dirPaths.reduce((memo, path) => {
    memo["📁 " + basename(path)] = path
    return memo
  }, {})

  const { generators, name } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "generators",
      choices: [
        new inquirer.Separator(),
        ...Object.keys(files).sort(),
        new inquirer.Separator(),
        ...Object.keys(dirs).sort(),
      ],
      default: Object.keys(files),
    },
    {
      type: "input",
      name: "name",
      message: "name (camelCase)",
      default: "home",
    },
  ])

  for (const choice of generators) {
    const path = files[choice]
    const cleanChoice = choice.replace(/[\s\W]/g, "")
    await fileCopier(
      path,
      join(
        __dirname,
        outputDirectories[cleanChoice],
        basename(path).replace(
          /^[a-z]/,
          (m) => name + m.toUpperCase()
        )
      )
    )
  }
}

export default generator
