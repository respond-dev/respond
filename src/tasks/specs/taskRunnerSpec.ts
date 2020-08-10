import expect from "../../framework/lib/expect"
import taskRunner from "../lib/taskRunner"

describe("taskRunner", () => {
  it("runs a task", async () => {
    expect(await taskRunner(["test"])).toEqual(["ok"])
  })
})
