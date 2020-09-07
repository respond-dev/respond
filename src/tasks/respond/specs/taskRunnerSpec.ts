import expect from "../../../lib/respond/expect"
import taskRunner from "../lib/taskRunner"

describe("taskRunner", () => {
  it("runs a task", async () => {
    expect(await taskRunner(["test"])).toEqual(["ok"])
  })
})
