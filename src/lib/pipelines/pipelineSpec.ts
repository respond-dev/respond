import expect from "lib/specs/expect"
import pipeline from "./pipeline"
import pipelinePaths from "./pipelinePaths"
import { ConstructorInputType } from "types/respond/constructorTypes"
import { SettlerInputType } from "types/respond/settlerTypes"
import { SettlerOutputType } from "types/respond/settlerTypes"
import { DomDocument } from "lib/respond/domBuilder"

describe("pipeline", () => {
  it("runs with empty input", async () => {
    const paths = await pipelinePaths("respond")

    const output = await pipeline<
      ConstructorInputType,
      SettlerInputType & SettlerOutputType
    >("respond", paths, {})

    expect(output).toEqual({
      constructed: true,
      cookies: {},
      css: expect.any(Function),
      el: expect.any(Function),
      doc: expect.any(DomDocument),
    })
  })
})
