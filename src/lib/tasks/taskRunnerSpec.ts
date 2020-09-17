import expect from "lib/specs/expect"
import taskRunner from "./taskRunner"

describe("taskRunner", () => {
  it("runs a task", async () => {
    expect(await taskRunner(["test"])).toEqual(["ok"])
  })
})
