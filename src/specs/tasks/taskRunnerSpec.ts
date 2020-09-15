import expect from "lib/specs/expect"
import taskRunner from "tasks/lib/taskRunner"

describe("taskRunner", () => {
  it("runs a task", async () => {
    expect(await taskRunner(["test"])).toEqual(["ok"])
  })
})
