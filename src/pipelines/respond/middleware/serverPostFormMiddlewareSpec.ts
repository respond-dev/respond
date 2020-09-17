import { IncomingMessage } from "http"
import net from "net"
import URL from "url"
import expect from "lib/specs/expect"
import serverPostFormMiddleware from "./serverPostFormMiddleware"

class FakeIncomingMessage extends IncomingMessage {
  constructor() {
    super(({} as unknown) as net.Socket)
  }
}

describe("postFormMiddleware", () => {
  it("POST urlencoded", async () => {
    const headers = {
      "content-type":
        "application/x-www-form-urlencoded; charset=utf-8",
    }

    const httpIncomingMessage = new FakeIncomingMessage()

    const promise = serverPostFormMiddleware({
      headers,
      httpIncomingMessage,
      method: "POST",
      url: URL.parse("/"),
    })

    httpIncomingMessage.emit("data", "foo=bar&baz=bla")
    httpIncomingMessage.emit("end")

    expect(await promise).toEqual({
      form: {
        files: {},
        params: {
          baz: "bla",
          foo: "bar",
        },
      },
    })
  })

  it("POST multipart", async () => {
    const headers = {
      "content-type":
        "multipart/form-data; boundary=" +
        "---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
    }

    const httpIncomingMessage = new FakeIncomingMessage()

    const promise = serverPostFormMiddleware({
      headers,
      httpIncomingMessage,
      method: "POST",
      url: URL.parse("/"),
    })

    httpIncomingMessage.emit(
      "data",
      [
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="fileName0"',
        "",
        "a file",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="fileName1"',
        "",
        "b file",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="uploadFile0"; filename="a.dat"',
        "Content-Type: application/octet-stream",
        "",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k",
        'Content-Disposition: form-data; name="uploadFile1"; filename="b.dat"',
        "Content-Type: application/octet-stream",
        "",
        "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        "-----------------------------paZqsnEHRufoShdX6fh0lUhXBP4k--",
      ].join("\r\n")
    )
    httpIncomingMessage.emit("end")

    expect(await promise).toEqual({
      form: {
        files: {
          uploadFile0: {
            encoding: "7bit",
            mimetype: "application/octet-stream",
            name: "a.dat",
            path: expect.any(String),
          },
          uploadFile1: {
            encoding: "7bit",
            mimetype: "application/octet-stream",
            name: "b.dat",
            path: expect.any(String),
          },
        },
        params: {
          fileName0: "a file",
          fileName1: "b file",
        },
      },
    })
  })
})
