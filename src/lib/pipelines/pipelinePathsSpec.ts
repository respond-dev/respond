import expect from "lib/specs/expect"
import pipelinePaths from "./pipelinePaths"
import { pipelinePhases } from "./pipeline"

describe("pipelinePaths", () => {
  it("reads pipeline module paths by phase", async () => {
    const paths = await pipelinePaths("respond")

    expect(pipelinePhases.length).toBeGreaterThan(0)

    for (const phase of pipelinePhases) {
      expect(paths[phase].length).toBeGreaterThan(0)
    }
  })
})
