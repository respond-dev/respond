import expect from "../../lib/respond/expect"
import directoryLister from "../../lib/respond/directoryLister"

describe("directoryLister", () => {
  it("lists a directory", async () => {
    const { filePaths } = await directoryLister(__dirname)
    expect(filePaths).toContain(__filename)
  })
})
