import url from "url"
import { busboyBuilder } from "../lib/busboyBuilder"
import { headerCleaner } from "../lib/headerCleaner"
import streamStringifier from "../lib/streamStringifier"
import RequesterInputType from "./requesterInputType"
import RequesterOutputType from "./requesterOutputType"

export class HttpRequester {
  accept({
    httpIncomingMessage,
  }: RequesterInputType): boolean {
    return !!httpIncomingMessage
  }

  async respond({
    httpIncomingMessage: req,
  }: RequesterInputType): Promise<RequesterOutputType> {
    const [path, querystring] = req.url.split("?")
    const headers = headerCleaner(req.headers)

    let params = {}
    let files = {}

    if (req.method === "POST") {
      if (headers["content-type"] === "application/json") {
        params = JSON.parse(await streamStringifier(req))
      } else {
        const [busboy, finished] = busboyBuilder(
          headers,
          files,
          params
        )

        req.pipe(busboy)
        ;({ files, params } = await finished)
      }
    }

    return {
      files,
      headers,
      method: req.method,
      params,
      path,
      querystring,
    }
  }
}

export const httpRequester = new HttpRequester()
export default httpRequester
