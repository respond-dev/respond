import expect from "../lib/expect"
import directoryLister from "../lib/directoryLister"

describe("directoryLister", () => {
  it("lists a directory", async () => {
    const { files } = await directoryLister(__dirname)
    expect(files).toContain(__filename)
  })
})
