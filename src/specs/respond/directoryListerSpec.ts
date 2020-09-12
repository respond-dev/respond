import expect from "pipelines/respond/lib/expect"
import directoryLister from "pipelines/respond/lib/directoryLister"

describe("directoryLister", () => {
  it("lists a directory", async () => {
    const { filePaths } = await directoryLister(__dirname)
    expect(filePaths).toContain(__filename)
  })
})
