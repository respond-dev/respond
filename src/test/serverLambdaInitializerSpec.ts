import URL from "url"
import { APIGatewayProxyEvent } from "aws-lambda"
import expect from "../lib/expect"
import serverLambdaInitializer from "../initializers/serverLambdaInitializer"

class FakeGatewayProxyEvent {
  constructor(
    public httpMethod: string,
    public path: string,
    public body: string,
    public headers: Record<string, string> = {},
    public isBase64Encoded = false
  ) {}
}

describe("lambdaRequester", () => {
  it("GET empty", async () => {
    const headers = { host: "localhost" }
    const proxyEvent = new FakeGatewayProxyEvent(
      "GET",
      "/",
      "",
      headers
    )
    expect(
      await serverLambdaInitializer({
        apiGatewayProxyEvent: (proxyEvent as unknown) as APIGatewayProxyEvent,
      })
    ).toEqual({
      headers,
      method: "GET",
      url: URL.parse("https://localhost"),
    })
  })
})
