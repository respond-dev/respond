/* eslint-disable no-console */
import inquirer from "inquirer"

export async function respondTask(): Promise<void> {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what's your name?",
    },
  ])

  console.log("hi", name)
}

export default respondTask
