/* eslint-disable no-console */
import inquirer from "inquirer"

export async function homeTask(): Promise<void> {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what's your name?",
    },
  ])

  console.log("hi", name)
}

export default homeTask
