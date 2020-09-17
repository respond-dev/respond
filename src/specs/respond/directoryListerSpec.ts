import expect from "lib/specs/expect"
import directoryLister from "lib/fs/directoryLister"

describe("directoryLister", () => {
  it("lists a directory", async () => {
    const { filePaths } = await directoryLister(__dirname)
    expect(filePaths).toContain(__filename)
  })
})
