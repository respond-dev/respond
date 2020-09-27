import expect from "libs/expect/expect"
import taskRunner from "./taskRunner"

describe("taskRunner", () => {
  it("runs a task", async () => {
    expect(await taskRunner(["test"])).toEqual(["ok"])
  })
})
