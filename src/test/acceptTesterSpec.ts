import expect from "../lib/expect"
import acceptTester from "../lib/acceptTester"
import { TestRequester } from "../requesters/testRequester"
import { join } from "path"

describe("acceptTester", () => {
  it("tests acceptance", async () => {
    const testRequester = await acceptTester(
      join(__dirname, "../requesters"),
      { test: true }
    )
    expect(testRequester[0]).toBeInstanceOf(TestRequester)
  })
})
