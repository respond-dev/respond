import { IncomingMessage } from "http"
import net from "net"
import URL from "url"
import expect from "../lib/expect"
import postJsonMiddleware from "../middleware/postJsonMiddleware"

class FakeIncomingMessage extends IncomingMessage {
  constructor() {
    super(({} as unknown) as net.Socket)
  }
}

describe("postJsonMiddleware", () => {
  it("POST JSON", async () => {
    const headers = {
      "content-type": "application/json",
    }

    const httpIncomingMessage = new FakeIncomingMessage()

    const promise = postJsonMiddleware.respond({
      headers,
      httpIncomingMessage,
      method: "POST",
      url: URL.parse("/"),
    })

    httpIncomingMessage.emit(
      "data",
      '{ "foo": "bar", "baz": "bla" }'
    )
    httpIncomingMessage.emit("end")

    expect(await promise).toEqual({
      json: {
        baz: "bla",
        foo: "bar",
      },
    })
  })
})
